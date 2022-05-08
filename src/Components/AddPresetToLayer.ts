export function AddPresetToLayer(preset: Array<Array<0 | 1>>, matrix: Array<Array<0 | 1>>): void{
  let x: number = Math.floor((matrix[0].length - preset[0].length) / 2)
  let y: number = Math.floor(matrix.length - preset.length)

  if (x < 0) x = 0
  if (y < 0) y = 0

  const strLength = Math.min(matrix.length, preset.length)
  const iLength = Math.min(matrix[0].length, preset[0].length)
  
  for (let str = 0; str < strLength; str++) {
    for (let i = 0; i < iLength; i++) {
      matrix[str + y][i + x] = preset[str][i]
    }
  }
}