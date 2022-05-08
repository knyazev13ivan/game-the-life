export function RandomFill(matrix: Array<Array<0 | 1>>, w: number, h: number, modifier = 0.8): Array<Array<0 | 1>> {
  return new Array(h).fill(new Array(w).fill(0))
    .map(str => str.map((cell: 0 | 1) => Math.round(Math.random() * 2 * modifier)))
}