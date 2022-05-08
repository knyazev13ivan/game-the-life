export function AddPresetToLayer(preset: Array<Array<0 | 1>>, matrix: Array<Array<0 | 1>>): void{
  let x: number = Math.floor((matrix[0].length - preset[0].length) / 2)
  let y: number = Math.floor(matrix.length - preset.length)

  if (x < 0) x = 0
  if (y < 0) y = 0

  console.log(preset[0]);
  
  console.log('preset x: ', preset[0].length, 'preset y: ', preset.length);
  console.log('matrix x: ', matrix[0].length, 'matrix y: ', matrix.length);
  
  
  for (let str = 0; str < preset.length; str++) {
    for (let i = 0; i < preset[0].length; i++) {
      matrix[str + y][i + x] = preset[str][i]
    }
  }
}