// import './style/style.css'

let field = document.querySelector('.game-field')
let width = +/\d+/.exec(window.getComputedStyle(field).width)[0]
let height = +/\d+/.exec(window.getComputedStyle(field).height)[0]

let sell = document.querySelector('.sell')
let sellSize = +/\d+/.exec(window.getComputedStyle(sell).width)[0]

let btnRandom = document.querySelector('.control__random')
let btnStart = document.querySelector('.control__start')
let btnPlusOne = document.querySelector('.control__plus-one')
let btnSpeed = document.querySelector('.control__speed')

let matrix = new Array(width / sellSize)
  .fill(0)
  .map((str, indexStr) => new Array(height / sellSize)
    .fill(0)
    .map((e, indexE) => {
      let newSell = document.createElement('div')
      newSell.classList.add('sell')
      newSell.style.top = `${(indexE) * sellSize}px`
      newSell.style.left = `${(indexStr) * sellSize}px`
      newSell.style.display = 'none'

      field.appendChild(newSell)

      return {
        sell: newSell,
        state: false
      };
    }))

let renderRandomFilling = (matrix) => {
  matrix.forEach(str => str.forEach(e => {
    if (Math.random() < 0.3) {
      e.sell.style.display = 'block'
      e.state = true
    } else {
      e.sell.style.display = 'none'
      e.state = false
    }
  }))
}

let stateMatrix = new Array(width / sellSize)
.fill(new Array(height / sellSize)
.fill(false))

let ruleB3S23 = {
  b: [3],
  s: [2, 3]
}

let step = (rule) => {

  matrix.forEach((str, indexStr) => str.forEach((e, indexE) => {
    let count = 0
    
    
    
    if (e.state == true && (count == 2 || count == 3)) {
      e.state = true
    } else {
      e.state = false
    }
    if (e.state == false && count == rule.b[0]) {
      e.state = true
    } else {
      e.state = false
    }
  }))

  matrix.forEach((str, indexStr) => str.forEach((e, indexE) => {
    e.sell.style.display = e.state ? 'block' : 'none'
  }))
}

btnRandom.addEventListener('click', () => {renderRandomFilling(matrix)
  console.log(matrix[0])
})
btnPlusOne.addEventListener('click', () => step(ruleB3S23))
