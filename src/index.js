// import './style/style.css'

let field = document.querySelector('.game-field')
let width = +/\d+/.exec(window.getComputedStyle(field).width)[0]
let height = +/\d+/.exec(window.getComputedStyle(field).height)[0]

let elem = document.querySelector('.elem')
let elemSize = +/\d+/.exec(window.getComputedStyle(elem).width)[0]

let btnRandom = document.querySelector('.control__random')
let btnStart = document.querySelector('.control__start')
let btnPlusOne = document.querySelector('.control__plus-one')
let btnSpeed = document.querySelector('.control__speed')

let matrix = new Array(width/elemSize).fill(new Array(height/elemSize))




console.log(matrix)