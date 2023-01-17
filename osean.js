const par = document.createElement("div")
par.innerHTML = txt

const questions_count = 75
const answers_count = 5

function _(i) {
	const em = par.getElementsByTagName(i)[0]
	if (em) { return em.innerHTML.trim().replaceAll('\n', '<br>') }
}

const app = new Vue({
  data: {
  	choosed: '',
    answers: [],
    state: 'description',
    question_title: '',
    question_num: 0,
    questions_count: questions_count,
    choosed_answers: {},
    result: {res: {1:2,2:2,3:2,4:2,5:2},summary: {1:2,2:2,3:2,4:2,5:2}},
    error: '',
    editable: {firstname: '', lastname: '', email: '', phone: ''},
  },
  methods: {
  	_ (v) {
  		return _(v)
  	},
    async set_question(num, rev=false) {
      if (this.state == 'questions') { await this.animate_out(rev) }
      this.error = ''
      window.scrollTo(0, 0)
      document.activeElement.blur()
    	this.state = 'questions'
    	this.question_num = num
    	this.question_title = _(`q${num}`)
    	this.choosed = this.choosed_answers[this.question_num]
      await this.animate_in(rev)
      if (location.hash == '#aa1') {
          this.choosed = 1
          setTimeout(this.next, 5)
      }
    },
    prev() {
      this.question_num --
    	if (this.question_num <= 0) {
    		this.state = 'description'
    	} else {
    		this.set_question(this.question_num, true)
    	}
    },
    next() {
    	if (this.state == 'questions' && !this.choosed) {
    		this.error = 'Оберіть відповідь'
        return
    	}
    	this.choosed_answers[this.question_num] = this.choosed
    	if (this.question_num >= questions_count) {
    		this.get_result()
    	} else {
    		this.set_question(this.question_num + 1)
    	}
    },
    change() {
      
    	setTimeout(this.next, 200)
    },
    get_result() {
      var all = ''
      for (var qn = 1; qn <= questions_count; qn ++) {
        all += `
        ${qn}) ${_('q'+qn)}<br>${_('a'+this.choosed_answers[qn])}<br>`
      }

    	this.result = osean_get_result(this.choosed_answers)
    	this.state = 'result'

      var subject = `Результати тесту ${this.editable.firstname} ${this.editable.lastname}`
      var message = `<!DOCTYPE html>
        <html lang="uk">
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
        </head>
        <body>
          <h2>${subject}</h2><br>
          Email: ${this.editable.email}<br>
          Телефон: ${this.editable.phone}<br>
          <br>
          ${ _('abr')[1] } ${ this.result.res[1] } ${ _('rh1'+this.result.summary[1]) }<br>
          ${ _('abr')[2] } ${ this.result.res[2] } ${ _('rh2'+this.result.summary[2]) }<br>
          ${ _('abr')[3] } ${ this.result.res[3] } ${ _('rh3'+this.result.summary[3]) }<br>
          ${ _('abr')[4] } ${ this.result.res[4] } ${ _('rh4'+this.result.summary[4]) }<br>
          ${ _('abr')[5] } ${ this.result.res[5] } ${ _('rh5'+this.result.summary[5]) }<br>
          <br>
          <br>
          ${all}

        </body>
        </html>`

        send_email_admin(subject, message)
    },
    onSubmit() {
      //sessionStorage['osean'] = JSON.stringify(this.editable)
      this.next()
    },
    async animate_out(rev=false) {
      var em = document.getElementsByClassName('Cardlayout-inner')[0]
      var height = em.getBoundingClientRect().height
      var h = 0
      while (h < height) {
        em.style.setProperty('margin-top', (rev?'':'-')+h+'px')
        await sleep(5)
        h += 30
      }
    },
    async animate_in(rev=false) {
      var em = document.getElementsByClassName('Cardlayout-inner')[0]
      var height = em.getBoundingClientRect().height
      var h = height
      while (h > 0) {
        em.style.setProperty('margin-top', (rev?'-':'')+h+'px')
        await sleep(5)
        h -= 30
        if (h < 0) {
          h = 0
          em.style.setProperty('margin-top', (rev?'-':'')+h+'px')
        }

      }
    },
  },
  mounted() {
  	for (var an = 1; an <= answers_count; an ++) {
  		this.answers.push({title: _(`a${an}`), value: an})
  	}
  	
  	document.getElementById('app').style.display = 'block'

    //try {
    //  this.editable = JSON.parse(sessionStorage['osean'])
    //} catch {
    //
    //}
  }
}).$mount('#app')


function send_email_admin(subject, message) {
  const MAILER_ID = 'osean'
  fetch('https://homserv.net/a/mailer/send', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({mailer_id: MAILER_ID, subject: subject, message: message})
  })
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}