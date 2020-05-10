import React, { memo, useState } from 'react'

import createTimer from './create-timer'
import styles from './timer.module.css'

const SettingInput = memo(function SettingInput({
  onChange,
  value,
  name,
  min = 0,
  max = 99,
}) {
  return (
    <input
      type='number'
      min={min}
      max={max}
      value={value}
      name={name}
      onChange={onChange}
    />
  )
})

const initialTimerSettings = {
  hours: 0,
  minutes: 0,
  seconds: 0,
}

const Timer = memo(function Timer() {
  const [timer, setTimer] = useState(null)
  const [timeFormatted, setTimeFormatted] = useState('00:00:00')
  const [goal, setGoal] = useState('This is a goal')
  const [timerState, setTimerState] = useState('IDLE')
  const [timerSettings, setTimerSettings] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  function handleStart() {
    setTimeFormatted('00:00:00')
    const timer = createTimer(
      timerSettings,
      function () {
        setGoal('')
        setTimer(null)
        setTimerState('IDLE')
        setTimerSettings(initialTimerSettings)
      },
      function (timeFormatted) {
        setTimeFormatted(timeFormatted)
      }
    )
    setTimer(timer)
    timer.start()
    setTimerState('RUNNING')
  }

  function handlePause() {
    timer.pause()
    setTimerState('PAUSED')
  }

  function handleResume() {
    timer.resume()
    setTimerState('RUNNING')
  }

  function handleSettingsChange(e) {
    const value = e.currentTarget.value
    const name = e.currentTarget.name

    setTimerSettings((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <div className={styles.timerWrapper}>
      <h1>Timer</h1>

      <label htmlFor='goal'>
        <div>My goal:</div>
        <input
          type='text'
          id='goal'
          value={goal}
          onChange={(e) => setGoal(e.currentTarget.value)}
          readOnly={timerState !== 'IDLE'}
          className={styles.goalInput}
        />
      </label>

      {timerState === 'IDLE' ? (
        <div className={styles.timerSettings}>
          {['hours', 'minutes', 'seconds'].map((thing) => {
            return (
              <SettingInput
                value={timerSettings[thing]}
                name={thing}
                onChange={handleSettingsChange}
              />
            )
          })}
        </div>
      ) : (
        <div className={styles.timerCount}>{timeFormatted}</div>
      )}

      <div className='actionsWrapper'>
        {timerState === 'IDLE' ? (
          <button type='button' onClick={handleStart}>
            Start
          </button>
        ) : (
          <>
            <button
              type='button'
              onClick={handlePause}
              disabled={timerState === 'PAUSED'}
            >
              Pause
            </button>
            <button
              type='button'
              onClick={handleResume}
              disabled={timerState === 'RUNNING'}
            >
              Resume
            </button>
          </>
        )}
      </div>
    </div>
  )
})

export default Timer
