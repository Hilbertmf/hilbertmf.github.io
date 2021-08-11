// get elements
const setAlarmBtn = document.querySelector('#set-btn')
const playAlarmBtn = document.querySelector('#play-btn')
const sound = document.querySelector('#sound')
let inputMinutes = Number(document.querySelector('#minutes').value)
let inputSeconds = Number(document.querySelector('#seconds').value)
let totalTimeInSeconds = inputMinutes*60 + inputSeconds
let isPlaying = false

playAlarmBtn.addEventListener('click', () => {
  if (isPlaying) {
    sound.pause()
    isPlaying = false
    return
  }

  setTimeout(() => {
    sound.play()
    sound.loop = true
    isPlaying = true
  }, totalTimeInSeconds*1000);
})

setAlarmBtn.addEventListener('click', () => {
  //time = document.querySelector('#time').value
  inputMinutes = Number(document.querySelector('#minutes').value)
  inputSeconds = Number(document.querySelector('#seconds').value)
  totalTimeInSeconds = inputMinutes*60 + inputSeconds
  console.log(totalTimeInSeconds)
})