let btnNumbers
let btnOperators
let btnActions
let btnClearHistory
let value
let operator
let firstLine
let secondLine
let operatorUsed = false

const main = () => {
	prepareDOMElement()
	prepareDOMEvents()
}

const prepareDOMElement = () => {
	btnNumbers = document.querySelectorAll('.number')
	btnOperators = document.querySelectorAll('.opr')
	btnActions = document.querySelectorAll('.action')
	firstLine = document.querySelector('.first-line')
	secondLine = document.querySelector('.second-line')
	btnClearHistory = document.querySelector('.btn-clear-history')
	historyList = document.querySelector('.history')
}

const prepareDOMEvents = () => {
	for (button of btnNumbers) {
		button.addEventListener('click', getButtonValue)
	}

	for (button of btnOperators) {
		button.addEventListener('click', getOperator)
	}

	for (button of btnActions) {
		button.addEventListener('click', action)
	}

	btnClearHistory.addEventListener('click', clearHistory)
}

const getButtonValue = e => {
	value = e.target.innerText
	screen(value)
}

const getOperator = e => {
	if (e.target.classList.contains('plus')) {
		operator = '+'
	} else if (e.target.classList.contains('minus')) {
		operator = '-'
	} else if (e.target.classList.contains('multpn')) {
		operator = '*'
	} else if (e.target.classList.contains('divide')) {
		operator = '/'
	} else if (e.target.classList.contains('eql')) {
		operator = '='
	} else {
		operator = '.'
	}
	screen(operator)
}

const action = e => {
	if (e.target.classList.contains('C')) {
		console.log('a')
		btnActions.forEach(button => (button.disabled = false))
		btnOperators.forEach(button => (button.disabled = false))
		btnNumbers.forEach(button => (button.disabled = false))
		secondLine.innerText = '0'
		firstLine.innerText = ''
		operatorUsed = false
	} else if (e.target.classList.contains('CE')) {
		secondLine.innerText = '0'
	} else if (e.target.classList.contains('delete')) {
		let target = secondLine.innerText
		target = target.slice(0, -1)
		secondLine.innerText = target
		if (secondLine.innerText === '') {
			secondLine.innerText = '0'
		}
	}
}

const screen = arg => {
	const value = arg
	const operators = ['+', '-', '÷', '*']

	let txtFirstLine = firstLine.innerText
	let txtSecondLine = secondLine.innerText
	let txtSecondLineFirstChar = txtSecondLine.charAt(0)
	let txtFirstLineFirstChar = txtFirstLine.charAt(0)
	let txtSecondLineLastChar = txtSecondLine.slice(-1)

	switch (value) {
		case '+':
		case '*':
			if (txtFirstLine !== '' && !txtFirstLine.includes('=')) {
				resultByOperator(txtFirstLine, txtSecondLine, value)
			} else if (operators.includes(txtFirstLineFirstChar)) {
				secondLine.innerText = secondLine.innerText.slice(0, -1)
				firstLine.innerText = secondLine.innerText + value
			} else if (txtSecondLine.length > 0 && txtSecondLineLastChar !== value) {
				firstLine.innerText = secondLine.innerText + value
			}
			operatorUsed = true
			break
		case '-':
			if (txtFirstLine !== '' && !txtFirstLine.includes('=')) {
				resultByOperator(txtFirstLine, txtSecondLine, value)
			} else if (secondLine.innerText === '0') {
				secondLine.innerText = '-'
			} else if (txtSecondLine.length > 0 && txtSecondLineLastChar !== '-') {
				firstLine.innerText = secondLine.innerText + '-'
			}
			operatorUsed = true
			break
		case '/':
			if (txtFirstLine !== '' && !txtFirstLine.includes('=')) {
				resultByOperator(txtFirstLine, txtSecondLine, value)
			} else if (operators.includes(txtFirstLineFirstChar)) {
				secondLine.innerText = secondLine.innerText.slice(0, -1)
				firstLine.innerText = secondLine.innerText + '÷'
			} else if (txtSecondLine.length > 0 && txtSecondLineLastChar !== '÷') {
				firstLine.innerText = secondLine.innerText + '÷'
			}
			operatorUsed = true
			break
		case '.':
			if (txtFirstLine.includes('=')) {
				secondLine.innerText = '0.'
				firstLine.innerText = ''
			}
			const isDot = isAdded(secondLine.innerText, '.')
			if (!isDot) {
				secondLine.innerText = secondLine.innerText + '.'
			}
			break
		case '=':
			resultByEql(txtFirstLine, txtSecondLine, value)
			break
	}

	switch (value) {
		case '1':
		case '2':
		case '3':
		case '4':
		case '5':
		case '6':
		case '7':
		case '8':
		case '9':
			if (operatorUsed) {
				secondLine.innerText = ''
				secondLine.innerText = secondLine.innerText + value
				operatorUsed = false
			} else if (txtFirstLine.includes('=')) {
				firstLine.innerText = ''
				secondLine.innerText = value
			} else if (txtSecondLine.length === 1 && txtSecondLineFirstChar === '0') {
				secondLine.innerText = ''
				secondLine.innerText = secondLine.innerText + value
			} else if (txtSecondLine.length >= 1) {
				secondLine.innerText = secondLine.innerText + value
			} else if (txtFirstLine !== '') {
				secondLine.innerText = ''
				secondLine.innerText = secondLine.innerText + value
			}
			break
		case '0':
			if (operatorUsed) {
				secondLine.innerText = ''
				secondLine.innerText = secondLine.innerText + value
				operatorUsed = false
			} else if (txtSecondLine.length === 1 && txtSecondLineFirstChar === '0') {
				secondLine.innerText = ''
				secondLine.innerText = secondLine.innerText + 0
			} else if (txtSecondLine.length >= 1) {
				secondLine.innerText = secondLine.innerText + 0
			}
			break
	}
}

const isAdded = (str, operator) => {
	for (let i = 0; i < str.length; i++) {
		if (str[i] === operator) {
			return true
			break
		}
	}
}

const resultByOperator = (arg1, arg2, val) => {
	if (arg1.includes('÷')) {
		arg1 = arg1.replace('÷', '/')
	}
	let result = arg1 + arg2

	if (arg1.slice(-1) === '/' && arg2 === '0') {
		divideByZero(arg1, arg2)
	} else {
		result = eval(result)

		if (result % 1 !== 0) {
			result = result.toFixed(2)
			if (result.slice(-1) === '0') {
				result = result.slice(0, -1)
			}
		}

		result = result.toString()

		if (val.includes('/')) {
			val = val.replace('/', '÷')
		}

		firstLine.innerText = result + val
	}
}

const resultByEql = (arg1, arg2, val) => {
	if (arg1.includes('÷')) {
		arg1 = arg1.replace('÷', '/')
	}
	let result = arg1 + arg2
	if (arg1.slice(-1) === '/' && arg2 === '0') {
		divideByZero(arg1, arg2)
	} else {
		result = eval(result)

		if (result % 1 !== 0) {
			result = result.toFixed(2)
			if (result.slice(-1) === '0') {
				result = result.slice(0, -1)
			}
		}

		result = result.toString()

		if (arg1.includes('/')) {
			arg1 = arg1.replace('/', '÷')
		}
		console.log(arg1)
		console.log(arg2)

		firstLine.innerText = arg1 + arg2 + val
		secondLine.innerText = result

		addToHistory(arg1, arg2, val, result)
	}
}

const divideByZero = (arg1, arg2) => {
	if (arg1.slice(-1) === '/' && arg2 === '0') {
		btnActions.forEach(button => {
			if (!button.classList.contains('C')) {
				button.disabled = true
			}
		})
		btnOperators.forEach(button => (button.disabled = true))
		btnNumbers.forEach(button => (button.disabled = true))

		firstLine.innerText = ''
		secondLine.innerText = 'ERROR'
	}
}

const addToHistory = (arg1, arg2, val, result) => {
	let historyResult 
	historyResult = `${arg1}${arg2}${val}${result}`
	console.log(historyResult);
	const liItem = document.createElement('li')
	liItem.textContent = historyResult
	historyList.appendChild(liItem)
	btnClearHistory.classList.add('active')
}

const clearHistory = () =>{
	btnClearHistory.classList.remove('active')
	historyList.innerHTML = ''
}

document.addEventListener('DOMContentLoaded', main)
