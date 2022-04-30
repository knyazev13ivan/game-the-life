import './style/style.scss'

let field: Element = document.querySelector('.game-field')!
let width: number = +/\d+/.exec(window.getComputedStyle(field).width)![0]
let height: number = +/\d+/.exec(window.getComputedStyle(field).height)![0]

let cell: Element = document.querySelector('.cell')!
let cellSize = +/\d+/.exec(window.getComputedStyle(cell).width)![0]

let btnRandom = document.querySelector('.control__random')
let btnClear = document.querySelector('.control__clear')
let btnStart = document.querySelector('.control__start')
let btnPlusOne = document.querySelector('.control__plus-one')
let btnSpeed = document.querySelector('.control__speed')

let color = 'rgb(255, 128, 0)'

let matrix = new Array(width / cellSize)
  .fill(0)
  .map((str, iStr) => new Array(height / cellSize)
    .fill(0)
    .map((e, iE) => {
      let newSell = document.createElement('div')
      newSell.classList.add('cell')
      newSell.style.top = `${(iE) * cellSize}px`
      newSell.style.left = `${(iStr) * cellSize}px`
      newSell.style.background = 'transparent'

      field.appendChild(newSell)

      return {
        cell: newSell,
        state: false
      };
    }))

let renderRandomFilling = (matrix: any) => {
  matrix.forEach((str: any) => str.forEach((e: any) => {

    e.cell.addEventListener('click', () => {
      console.log(e.cell.style.background)

      if (e.cell.style.background == color) {
        e.cell.style.background = 'transparent'
      } else {
        e.cell.style.background = color
      }
    })

    if (Math.random() < 0.15) {
      e.cell.style.background = color
      e.state = true
    } else {
      e.cell.style.background = 'transparent'
      e.state = false
    }
  }))
}

let ruleB3S23 = {
  b: [3],
  s: [2, 3]
}

let step = (rule: any) => {

  matrix.forEach((str, iStr, m) => str.forEach((e, iE) => {

    let count = 0

    if (m[iStr - 1] && m[iStr - 1][iE - 1] && m[iStr - 1][iE - 1].cell.style.background == color) count++
    if (m[iStr - 1] && m[iStr - 1][iE] && m[iStr - 1][iE].cell.style.background == color) count++
    if (m[iStr - 1] && m[iStr - 1][iE + 1] && m[iStr - 1][iE + 1].cell.style.background == color) count++
    if (m[iStr][iE - 1] && m[iStr][iE - 1].cell.style.background == color) count++
    if (m[iStr][iE + 1] && m[iStr][iE + 1].cell.style.background == color) count++
    if (m[iStr + 1] && m[iStr + 1][iE - 1] && m[iStr + 1][iE - 1].cell.style.background == color) count++
    if (m[iStr + 1] && m[iStr + 1][iE] && m[iStr + 1][iE].cell.style.background == color) count++
    if (m[iStr + 1] && m[iStr + 1][iE + 1] && m[iStr + 1][iE + 1].cell.style.background == color) count++

    if (e.cell.style.background == 'transparent' && count == 3) {
      e.state = true
    } else {
      e.state = false
    }
    if (e.cell.style.background == color && (count == 2 || count == 3)) {
      e.state = true
    }
  }))

  matrix.forEach((str) => str.forEach((e) => {
    e.cell.style.background = e.state ? color : 'transparent'
  }))
}

let running = false
let stopRunning: any

async function start() {
  let speedInput: HTMLInputElement = document.querySelector('.control__speed')!
  let speed: number = +speedInput.value || 100

  if (running) {
    clearInterval(stopRunning)
    running = false

    btnStart!.innerHTML = 'start'

    return
  }

  running = true

  stopRunning = setInterval(() => {
    step(ruleB3S23)
  }, speed)

  btnStart!.innerHTML = 'stop'
}

renderRandomFilling(matrix)

let clear = () => {
  matrix.forEach(str => str.forEach(e => e.cell.style.background = 'transparent'))
}

btnRandom?.addEventListener('click', () => renderRandomFilling(matrix))
btnClear?.addEventListener('click', clear)
btnStart?.addEventListener('click', start)
btnPlusOne?.addEventListener('click', () => step(ruleB3S23))