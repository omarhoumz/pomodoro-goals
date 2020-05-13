function getMiliseconds({ hours = 0, minutes = 0, seconds = 0 }) {
  const hoursToMs = (hours ?? 0) * 60 * 60 * 1000
  const minutesToMs = (minutes ?? 0) * 60 * 1000
  const secondsToMs = (seconds ?? 0) * 1000

  return hoursToMs + minutesToMs + secondsToMs
}

function padWithZero(arg) {
  return String(arg).padStart(2, '0')
}

function getTime(miliseconds) {
  const hours = padWithZero(Math.floor(miliseconds / (60 * 60 * 1000)) % 60)
  const minutes = padWithZero(Math.floor(miliseconds / (60 * 1000)) % 60)
  const seconds = padWithZero(Math.floor(miliseconds / 1000) % 60)

  return {
    hours,
    minutes,
    seconds,
  }
}

function useTimer({ config: { time, autoStart = false }, onStep, onComplete }) {
  const miliseconds = getMiliseconds(time)

  console.log(miliseconds)
}

function createTimer(time, oncomplete, onStep) {
  let startTime = null
  let timer = null
  let delay = getMiliseconds(time)
  let isPaused = true

  let resume = function () {
    if (isPaused) {
      startTime = Date.now()
      // adjust this number to affect granularity
      // lower numbers are more accurate, but more CPU-expensive
      const granularity = 250
      timer = setInterval(step, granularity)
      isPaused = false

      const now = delay - (Date.now() - startTime)
      const timeObject = getTime(now)

      if (typeof onStep === 'function') {
        onStep(Object.values(timeObject).join(':'), timeObject)
      }
    }
  }

  const pause = function () {
    if (isPaused) {
      return
    }
    delay -= Date.now() - startTime
    isPaused = true
    clearInterval(timer)
  }

  const step = function () {
    const now = delay - (Date.now() - startTime)
    const timeObject = getTime(now)

    if (typeof onStep === 'function') {
      onStep(Object.values(timeObject).join(':'), timeObject)
    }

    if (now <= 0) {
      clearInterval(timer)
      resume = function () {}
      isPaused = true
      if (oncomplete) oncomplete()
    }
  }

  const start = function () {
    resume()
  }

  const stop = function () {
    delay = 0
    isPaused = true
    clearInterval(timer)
  }

  return {
    start,
    resume,
    pause,
    stop,
  }
}

export default createTimer

export { useTimer }
