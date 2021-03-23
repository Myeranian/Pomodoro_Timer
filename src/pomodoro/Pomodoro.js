import React, { useState } from "react";
import classNames from "../utils/class-names";
import useInterval from "../utils/useInterval";
import Duration from "./Duration";
import Session from "./Session";

function Pomodoro() {
  const initialFocusDuration = 25;
  const initialBreakDuration = 5;
  const initialDurationType = "Focusing";
  const initialIsBreak = "false";
  const initialDurationLength = 25;
  const initialDisableStop = true;
  const initialDisableDuration = false;
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [focusDuration, setFocusDuration] = useState(initialFocusDuration);
  const [breakDuration, setBreakDuration] = useState(initialBreakDuration);
  const [count, setCount] = useState(initialFocusDuration * 60);
  const [isSession, setIsSession] = useState(false);
  const [isBreak, setIsBreak] = useState(initialIsBreak);
  const [durationType, setDurationType] = useState(initialDurationType);
  const [durationLength, setDurationLength] = useState(initialDurationLength);
  const [disableStop, setDisableStop] = useState(initialDisableStop);
  const [disableDuration, setDisableDuration] = useState(initialDisableDuration);
 
  useInterval(
    () => {
      if (count === 0) {
        new Audio(`https://bigsoundbank.com/UPLOAD/mp3/1482.mp3`).play();
        setIsBreak((prevState) => !prevState);
        if (isBreak === false) {
          setDurationType((durationType) => durationType = "Focusing");
          setDurationLength((durationLength) => durationLength = focusDuration);
          setCount((count) => count = (focusDuration * 60));
        }
        else {
          setDurationType((durationType) => durationType = "On Break");
          setDurationLength((durationLength) => durationLength = breakDuration);
          setCount((count) => count = (breakDuration * 60));
        }
      } 
      
      setCount((count) => count - 1);
    },
    isTimerRunning ? 1000 : null
  );

  
  function playPause() {
    setIsTimerRunning((prevState) => !prevState);
    setIsSession((isSession) => isSession = true);
    setDisableStop((disableStop) => disableStop = false);
    setDisableDuration((disableDuration) => disableDuration = true);
  };

  function stopSession() {
    setDisableStop(initialDisableStop);
    setDisableDuration(initialDisableDuration);
    setIsTimerRunning((isTimerRunning) => isTimerRunning = false);
    setIsSession((isSession) => isSession = false);
    setFocusDuration(initialFocusDuration);
    setBreakDuration(initialBreakDuration);
    setCount(initialFocusDuration * 60);
    setIsBreak(initialIsBreak);
    setDurationType(initialDurationType);
    setDurationLength(initialDurationLength);
  }

  const incrementFocus = ({ target }) => {
    const incrementChoice = target.value;
    if (isTimerRunning === false) {
      if (incrementChoice === "increase" && focusDuration < 60) {
        setFocusDuration((focusDuration) => focusDuration + 5);
      }
      if (incrementChoice === "decrease" && focusDuration > 5) {
        setFocusDuration((focusDuration) => focusDuration - 5);
      }
      setDurationLength((durationLength) => durationLength = focusDuration);
      setCount((count) => count = focusDuration * 60);
    }
  };

  const incrementBreak = ({ target }) => {
    const incrementChoice = target.value;
    if (isTimerRunning === false) {
      if (incrementChoice === "increase" && breakDuration < 15) {
        setBreakDuration((breakDuration) => breakDuration + 1);
      }
      if (incrementChoice === "decrease" && breakDuration > 1) {
        setBreakDuration((breakDuration) => breakDuration - 1);
      }
    }
  };

  return (
    <div className="pomodoro">
      <div className="row">
        <div className="col">
          <Duration label="Focus" duration={focusDuration} durationChange={incrementFocus} disableDuration={disableDuration}  />
        </div>
        <div className="col">
          <div className="float-right">
            <Duration label="Break" duration={breakDuration} durationChange={incrementBreak} disableDuration={disableDuration}  />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div
            className="btn-group btn-group-lg mb-2"
            role="group"
            aria-label="Timer controls"
          >
            <button
              type="button"
              className="btn btn-primary"
              data-testid="play-pause"
              title="Start or pause timer"
              onClick={playPause}
            >
              <span
                className={classNames({
                  oi: true,
                  "oi-media-play": !isTimerRunning,
                  "oi-media-pause": isTimerRunning,
                })}
              />
            </button>
            {/* TODO: Implement stopping the current focus or break session and disable when there is no active session */}
            <button
              type="button"
              className="btn btn-secondary"
              title="Stop the session"
              onClick={stopSession}
              disabled={disableStop}
            >
              <span className="oi oi-media-stop" />
            </button>
          </div>
        </div>
      </div>
      <Session count={count} isSession={isSession} durationType={durationType} durationLength={durationLength} />
    </div>
  );
}

export default Pomodoro;