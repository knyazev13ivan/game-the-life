import { CalcStepForLife } from './CalcStepForLife'
import { DrawForLife } from './DrawForLife'
import { Layer } from './Layer'
import { Loop } from './Loop'
import { RandomFill } from './RandomFill'
// import { Glider } from './Models/Glider'
// import { RandomColor } from './RandomColor'

export class Canvas {
  layer: Layer
  matrix: Array<Array<0 | 1>>
  cellSize: number
  wSize: number
  hSize: number
  loop: Loop
  isRun = true
  isEdit = false
  container: HTMLElement
  // handler: (event: MouseEvent) => void

  constructor(container: HTMLElement) {
    this.layer = new Layer(container)
    this.container = container

    this.cellSize = 2
    this.wSize = Math.floor(this.layer.w / (this.cellSize + 1))
    this.hSize = Math.floor(this.layer.h / (this.cellSize + 1))
    this.matrix = new Array(this.wSize).fill(new Array(this.hSize).fill(0))

    this.matrix = RandomFill(this.matrix, this.wSize, this.hSize, 0.8)

    this.loop = new Loop(this.update.bind(this), this.display.bind(this))
    this.handler = this.handler.bind(this)
  }
  update(correction: number): void {
    this.matrix = CalcStepForLife(this.matrix)
  }
  display(): void {
    this.layer.context.clearRect(0, 0, this.layer.w, this.layer.h);

    DrawForLife(this.matrix, this.cellSize, this.layer, '#aa77cc')
  }
  edit(): void {
    if (this.isRun) {
      this.loop.stop()
    }

    if (this.isEdit) {
      this.isEdit = !this.isEdit
      console.log('stop');

      this.container.removeEventListener('click', this.handler, true)

      this.loop.req = requestAnimationFrame(stampTime => this.loop.animate(stampTime))
    } else {
      this.isEdit = !this.isEdit
      console.log('editing...');

      this.container.addEventListener('click', this.handler, true)
    }
  }
  handler(event: MouseEvent): void {
    // if (event.target === document.querySelector('body')) {
    console.log('click');
    const x = Math.floor((event.clientX - this.layer.canvas.offsetLeft) / (this.cellSize + 1))
    const y = Math.floor((event.clientY - this.layer.canvas.offsetTop) / (this.cellSize + 1))

    this.matrix[x][y] = this.matrix[x][y] ? 0 : 1;

    this.display()
    // }
  }
}