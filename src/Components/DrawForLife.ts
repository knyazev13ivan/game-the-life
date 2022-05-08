export function DrawForLife(matrix: Array<Array<0 | 1>>, cellSize: number, layer: {context: CanvasRenderingContext2D}, color: string): void {
  matrix.forEach((str, strIndex) => str.forEach((cell, cellIndex) => {
    if (cell) {
      const x = cellIndex * (cellSize + 1)
      const y = strIndex * (cellSize + 1)

      layer.context.fillStyle = color
      layer.context.fillRect(x, y, cellSize, cellSize)
    }
  }))
}