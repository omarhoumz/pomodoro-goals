import React, { memo, useState, useMemo } from 'react'

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
    <>
      <label htmlFor={name}>{name}</label>
      <input
        type='number'
        min={min}
        max={max}
        value={value}
        name={name}
        id={name}
        onChange={onChange}
      />
    </>
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
  const [goal, setGoal] = useState('')
  const [timerState, setTimerState] = useState('IDLE')
  const [timerSettings, setTimerSettings] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  const isTimerSettingsNonZero = useMemo(
    () => !Object.values(timerSettings).some((setting) => setting !== 0),
    [timerSettings]
  )

  function handleStart() {
    setTimeFormatted('00:00:00')
    if (isTimerSettingsNonZero) {
      return null
    }
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

  function handleStop() {
    timer.stop()
    setTimer(null)
    setTimerState('IDLE')
  }

  function handleSettingsChange(e) {
    const value = e.currentTarget.value
    const name = e.currentTarget.name

    setTimerSettings((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <div className={styles.timerComponentWrapper}>
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

      <div className={styles.timerWrapper}>
        {timerState === 'IDLE' ? (
          <div className={styles.timerSettings}>
            {['hours', 'minutes', 'seconds'].map((thing, index) => {
              return (
                <>
                  <SettingInput
                    value={timerSettings[thing]}
                    name={thing}
                    onChange={handleSettingsChange}
                  />
                  {index < 2 && <span className={styles.colon}>:</span>}
                </>
              )
            })}
          </div>
        ) : (
          <div className={styles.timerCount}>{timeFormatted}</div>
        )}
      </div>

      <div className={styles.actionsWrapper}>
        {timerState === 'IDLE' ? (
          <button
            type='button'
            onClick={handleStart}
            disabled={isTimerSettingsNonZero}
          >
            Start
          </button>
        ) : (
          <>
            <button
              type='button'
              onClick={timerState === 'PAUSED' ? handleResume : handlePause}
            >
              {timerState === 'PAUSED' ? 'Resume' : 'Pause'}
            </button>
            <button type='button' onClick={handleStop}>
              Stop
            </button>
          </>
        )}
      </div>
    </div>
  )
})

export default Timer
