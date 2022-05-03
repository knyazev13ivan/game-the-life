import { Canvas } from './Components/Canvas'
import { RandomFill } from './Components/RandomFill'
import './style/style.scss'

export { }

const body = new Canvas(document.querySelector('body')!)
onload = () => {
  body
}

const start: HTMLButtonElement = document.querySelector('.start')!
start.addEventListener('click', () => {
  if (body.isRun) {
    body.isRun = false
    start.textContent = "start"
    
    body.loop.stop()
  } else {
    body.isRun = true
    start.textContent = "stop"
    body.loop.req = requestAnimationFrame(stampTime => body.loop.animate(stampTime))

  }
})

const randomFill: HTMLButtonElement = document.querySelector('.random')!
randomFill.addEventListener('click', () => {
  body.matrix = RandomFill(body.matrix, body.wSize, body.hSize, 0.8)
  body.update(40)
  body.display()
})

const step: HTMLButtonElement = document.querySelector('.step')!
step.addEventListener('click', () => {
  body.update(40)
  body.display()
})

const clear: HTMLButtonElement = document.querySelector('.clear')!
clear.addEventListener('click', () => {
  body.matrix = new Array(body.wSize).fill(new Array(body.hSize).fill(0))
})

const edit: HTMLButtonElement = document.querySelector('.edit')!
edit.addEventListener('click', () => {
  body.edit()
  if (body.isEdit) {
    edit.textContent = 'stop editing'
    
    start.style.color= '#999999'
    start.disabled = true
  } else {
    edit.textContent = 'edit'

    start.style.color= '#8855aa'
    start.disabled = false
  }
})