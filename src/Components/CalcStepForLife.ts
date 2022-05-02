export function CalcStepForLife(matrix: Array<Array<0 | 1>>): Array<Array<0 | 1>> {
  let count: number = 0
  let nextMatrix: Array<Array<0 | 1>> = matrix.slice(0).map((e, i) => matrix[i].slice(0))

  for (let str = 0; str < matrix.length; str++) {
    for (let i = 0; i < matrix[0].length; i++) {
      count = 0

      if (matrix[str - 1] && matrix[str - 1][i - 1]) count++
      if (matrix[str - 1] && matrix[str - 1][i]) count++
      if (matrix[str - 1] && matrix[str - 1][i + 1]) count++

      if (matrix[str] && matrix[str][i - 1]) count++
      if (matrix[str] && matrix[str][i + 1]) count++

      if (matrix[str + 1] && matrix[str + 1][i - 1]) count++
      if (matrix[str + 1] && matrix[str + 1][i]) count++
      if (matrix[str + 1] && matrix[str + 1][i + 1]) count++

      if (count === 2 || count === 3) {
        nextMatrix[str][i] = matrix[str][i]
        if (count === 3) nextMatrix[str][i] = 1
      } else {
        nextMatrix[str][i] = 0
      }

    }
  }

  return nextMatrix
}