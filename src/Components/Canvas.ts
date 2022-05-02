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

  constructor(container: HTMLElement) {
    this.layer = new Layer(container)

    this.cellSize = 3
    this.wSize = Math.floor(this.layer.w / (this.cellSize + 1))
    this.hSize = Math.floor(this.layer.h / (this.cellSize + 1))
    this.matrix = new Array(this.wSize).fill(new Array(this.hSize).fill(0))
    
    this.matrix = RandomFill(this.matrix, this.wSize, this.hSize, 0.8)    

    new Loop(this.update.bind(this), this.display.bind(this))
  }
  update(correction: number): void {
    this.matrix = CalcStepForLife(this.matrix)
  }
  display(): void {
    this.layer.context.clearRect(0, 0, this.layer.w, this.layer.h);

    DrawForLife(this.matrix, this.cellSize, this.layer, '#aa77cc')
  }
}