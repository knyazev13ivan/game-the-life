// import './style/style.css'

let field = document.querySelector('.game-field')
let width = +/\d+/.exec(window.getComputedStyle(field).width)[0]
let height = +/\d+/.exec(window.getComputedStyle(field).height)[0]

let cell = document.querySelector('.cell')
let cellSize = +/\d+/.exec(window.getComputedStyle(cell).width)[0]

let btnRandom = document.querySelector('.control__random')
let btnStart = document.querySelector('.control__start')
let btnPlusOne = document.querySelector('.control__plus-one')
let btnSpeed = document.querySelector('.control__speed')

let matrix = new Array(width / cellSize)
  .fill(0)
  .map((str, iStr) => new Array(height / cellSize)
    .fill(0)
    .map((e, iE) => {
      let newSell = document.createElement('div')
      newSell.classList.add('cell')
      newSell.style.top = `${(iE) * cellSize}px`
      newSell.style.left = `${(iStr) * cellSize}px`
      newSell.style.display = 'none'

      field.appendChild(newSell)

      return {
        cell: newSell,
        state: false
      };
    }))

let renderRandomFilling = (matrix) => {
  matrix.forEach(str => str.forEach(e => {
    if (Math.random() < 0.3) {
      e.cell.style.display = 'block'
      e.state = true
    } else {
      e.cell.style.display = 'none'
      e.state = false
    }
  }))
}

let ruleB3S23 = {
  b: [3],
  s: [2, 3]
}


let step = (rule) => {

  matrix.forEach((str, iStr, m) => str.forEach((e, iE) => {
    let count = 0

    if (m[iStr - 1] && m[iStr - 1][iE - 1] && m[iStr - 1][iE - 1].cell.style.display == 'block') count++
    if (m[iStr - 1] && m[iStr - 1][iE] && m[iStr - 1][iE].cell.style.display == 'block') count++
    if (m[iStr - 1] && m[iStr - 1][iE + 1] && m[iStr - 1][iE + 1].cell.style.display == 'block') count++
    if (m[iStr][iE - 1] && m[iStr][iE - 1].cell.style.display == 'block') count++
    if (m[iStr][iE + 1] && m[iStr][iE + 1].cell.style.display == 'block') count++
    if (m[iStr + 1] && m[iStr + 1][iE - 1] && m[iStr + 1][iE - 1].cell.style.display == 'block') count++
    if (m[iStr + 1] && m[iStr + 1][iE] && m[iStr + 1][iE].cell.style.display == 'block') count++
    if (m[iStr + 1] && m[iStr + 1][iE + 1] && m[iStr + 1][iE + 1].cell.style.display == 'block') count++

    if (e.cell.style.display == 'none' && count == 3) {
      e.state = true
    } else {
      e.state = false
    }
    if (e.cell.style.display == 'block' && (count == 2 || count == 3)) {
      e.state = true
    }
  }))

  matrix.forEach((str, iStr) => str.forEach((e, iE) => {
    e.cell.style.display = e.state ? 'block' : 'none'
  }))
}

async function start() {
  let speed = +document.querySelector('.control__speed').value || 100
  console.log(speed);

  let running = 0

  let living = setInterval(() => {
    step(ruleB3S23)
  }, speed)

  await living
}

btnStart.addEventListener('click', () => start())
btnRandom.addEventListener('click', () => renderRandomFilling(matrix))
btnPlusOne.addEventListener('click', () => step(ruleB3S23))