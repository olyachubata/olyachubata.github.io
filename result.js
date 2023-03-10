const order = {
	1: 54321,
	2: 12345,
	3: 12345,
	4: 12345,
	5: 54321,
	6: 54321,
	7: 54321,
	8: 54321,
	9: 12345,
	10: 12345,
	11: 12345,
	12: 54321,
	13: 54321,
	14: 12345,
	15: 54321,
	16: 54321,
	17: 12345,
	18: 12345,
	19: 12345,
	20: 12345,
	21: 54321,
	22: 12345,
	23: 12345,
	24: 54321,
	25: 12345,
	26: 12345,
	27: 54321,
	28: 12345,
	29: 12345,
	30: 54321,
	31: 12345,
	32: 12345,
	33: 54321,
	34: 54321,
	35: 54321,
	36: 12345,
	37: 12345,
	38: 12345,
	39: 12345,
	40: 12345,
	41: 12345,
	42: 12345,
	43: 54321,
	44: 12345,
	45: 12345,
	46: 12345,
	47: 12345,
	48: 54321,
	49: 54321,
	50: 54321,
	51: 12345,
	52: 54321,
	53: 12345,
	54: 12345,
	55: 12345,
	56: 12345,
	57: 12345,
	58: 54321,
	59: 54321,
	60: 12345,
	61: 12345,
	62: 12345,
	63: 12345,
	64: 54321,
	65: 12345,
	66: 54321,
	67: 54321,
	68: 54321,
	69: 12345,
	70: 54321,
	71: 54321,
	72: 54321,
	73: 54321,
	74: 54321,
	75: 12345
}

const ranges = [
  [1, 1.6],
  [1.7, 3.2],
  [3.3, 5],
]

function osean_get_result(q) {
	for (var n = 1; n <= 75; n ++ ) {
		if (order[n] == 54321) {
			q[n] = 6 - q[n]
		}
	}
	
	var res = {
		1:(q[4]+q[5]+q[7]+q[10]+q[11]+q[18]+q[21]+q[28]+q[31]+q[35]+q[38]+q[44]+q[54]+q[61]+q[74])/15,
		2:(q[13]+q[16]+q[17]+q[19]+q[20]+q[27]+q[33]+q[39]+q[41]+q[43]+q[49]+q[55]+q[57]+q[58]+q[66])/15,
		3:(q[3]+q[15]+q[26]+q[29]+q[30]+q[40]+q[46]+q[48]+q[53]+q[56]+q[65]+q[69]+q[70]+q[73]+q[75])/15,
		4:(q[2]+q[8]+q[23]+q[24]+q[25]+q[32]+q[42]+q[50]+q[52]+q[59]+q[60]+q[63]+q[67]+q[68]+q[72])/15,
		5:(q[1]+q[6]+q[9]+q[12]+q[14]+q[22]+q[34]+q[36]+q[37]+q[45]+q[47]+q[51]+q[62]+q[64]+q[71])/15,
	}
	var summary = {}
	
	for (var n = 1; n <= 5; n ++) {
		res[n] = Math.round(res[n]*10)/10
		for (var m = 0; m <= 2; m ++) {
			if (res[n] >= ranges[m][0] && res[n] <= ranges[m][1]) {
				summary[n] = m
				break
			}
		}
	} 
	
	return {res: res, summary: summary}
}