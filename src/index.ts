import { AddPresetToLayer } from './Components/AddPresetToLayer'
import { Canvas } from './Components/Canvas'
import { Clear } from './Components/Clear'
import { RandomFill } from './Components/RandomFill'
import { Saves } from './Components/Saves'
import './style/style.scss'

export { }

const saves = new Saves()

const body = new Canvas(document.querySelector('body')!)

onload = () => {
  body
  saves.renderPresets(saves.presets)
}

const $presetsElements: HTMLUListElement = document.querySelector('.game-presets-list')!
$presetsElements?.addEventListener('click', (event) => {
  // @ts-expect-error: event.target is LI Element
  const $preset: HTMLLIElement | null = event.target!

  if ($preset?.classList.contains('game-presets-list__item')) {
    body.isRun = false
    $start.textContent = "start"

    body.loop.stop()

    body.isRun = false
    $start.textContent = "start"
    $start.style.color = '#409900'
    
    const name: string | null = $preset.textContent
    Clear(body)
    
    saves.presets.forEach(e => {
      if (e[0] === name) AddPresetToLayer(e[1], body.matrix)
      body.display()
    })
  }
})

const $start: HTMLButtonElement = document.querySelector('.game-control__start')!
$start.addEventListener('click', () => {
  if (body.isRun) {
    body.isRun = false
    $start.textContent = "start"
    $start.style.color = '#409900'
    
    body.loop.stop()
  } else {
    body.isRun = true
    $start.textContent = "stop"
    $start.style.color = '#8855aa'
    body.loop.req = requestAnimationFrame(stampTime => body.loop.animate(stampTime))

  }
})

const $randomFill: HTMLButtonElement = document.querySelector('.game-control__random')!
$randomFill.addEventListener('click', () => {
  body.matrix = RandomFill(body.matrix, body.wSize, body.hSize, 0.8)
  body.update(40)
  body.display()
})

const $step: HTMLButtonElement = document.querySelector('.game-control__step')!
$step.addEventListener('click', () => {
  body.update(40)
  body.display()
})

const $clear: HTMLButtonElement = document.querySelector('.game-control__clear')!
$clear.addEventListener('click', () => Clear(body))

const $edit: HTMLButtonElement = document.querySelector('.game-control__edit')!
$edit.addEventListener('click', () => {
  body.edit()
  if (body.isEdit) {
    $edit.textContent = 'stop editing'
    $edit.style.color = '#409900'

    $start.style.color = '#999999'
    $start.disabled = true
  } else {
    $edit.textContent = 'edit'
    $edit.style.color = '#8855aa'

    $start.style.color = '#8855aa'
    $start.disabled = false
  }
})

const $save: HTMLButtonElement = document.querySelector('.game-presets__save')!
$save.addEventListener('click', () => {
  body.loop.stop()

  saves.showModal()
})

const $ok: HTMLButtonElement = document.querySelector('.modal-to-save-preset-control__ok')!
const $name: HTMLInputElement = document.querySelector('.modal-to-save-preset__name')!
$ok.addEventListener('click', () => {
  saves.ok($name.value, body.matrix)
})

const $cancel: HTMLButtonElement = document.querySelector('.modal-to-save-preset-control__cancel')!
$cancel.addEventListener('click', () => {
  saves.cancel()
})