// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function Clear(container: any): void {
  container.matrix = new Array(container.hSize).fill(new Array(container.wSize).fill(0)).map(e => new Array(container.wSize).fill(0))
  
  container.display()
}