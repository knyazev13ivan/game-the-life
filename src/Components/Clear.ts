// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function Clear(container: any): void {
  container.matrix = new Array(container.wSize).fill(new Array(container.hSize).fill(0)).map(e => new Array(container.hSize).fill(0))
  
  container.display()
}