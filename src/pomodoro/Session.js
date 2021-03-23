import React, { useState } from "react";
import { minutesToDuration, secondsToDuration } from "../utils/duration";

function Session(props) {
const {count, isSession, durationType, durationLength} = props;

const width = WidthAriaMaker(count, durationLength);
const aria = WidthAriaMaker(count, durationLength);

function WidthAriaMaker(count, durationLength) {
  let durationInSeconds = durationLength*60;
  return ((durationInSeconds - count) / durationInSeconds)*100;
}

if (isSession === true) {
    return (
        <div>
            {/* TODO: This area should show only when a focus or break session is running or pauses */}
            <div className="row mb-2">
              <div className="col">
                {/* TODO: Update message below to include current session (Focusing or On Break) and total duration */}
                <h2 data-testid="session-title">{durationType} for {minutesToDuration(durationLength)} minutes</h2>
                {/* TODO: Update message below to include time remaining in the current session */}
                <p className="lead" data-testid="session-sub-title">
                  {secondsToDuration(count)} remaining 
                </p>
              </div>
            </div>
            <div className="row mb-2">
              <div className="col">
                <div className="progress" style={{ height: "20px" }}>
                  <div
                    id="progressBar"
                    className="progress-bar"
                    role="progressbar"
                    aria-valuemin="0"
                    aria-valuemax="100"
                    aria-valuenow={aria} // TODO: Increase aria-valuenow as elapsed time increases
                    style={{ width: `${width}%` }} // TODO: Increase width % as elapsed time increases
                  />
                </div>
              </div>
            </div>
          </div>
    );
}
else {
    return null;
}
};

export default Session;
