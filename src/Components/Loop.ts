export class Loop {
  update: (correction: number) => void
  display: () => void
  deltaTime: number
  lastUpdate: number
  maxInterval: number
  minInterval: number
  //game/animation loop
  constructor(update: (correction: number) => void, display: () => void) {
    this.update = update
    this.display = display

    this.deltaTime = 0
    this.lastUpdate = 0
    this.maxInterval = 40
    this.minInterval = 100

    requestAnimationFrame(stampTime => this.animate(stampTime))
  }
  animate(currentTime: number): void {
    requestAnimationFrame(stampTime => this.animate(stampTime))

    this.deltaTime = currentTime - this.lastUpdate
    
    // if (this.deltaTime > this.minInterval) {
    if (this.deltaTime < this.maxInterval) {
      this.update(this.deltaTime / 1000)
      this.display()
    }
    this.lastUpdate = currentTime
    
  }
}