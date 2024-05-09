import React from 'react';

const ProgressBar = ({ progress }) => {
  return (
    <div className="progress-bar-container">
      <div className="progress-bar">
        <div
          className="progress"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <span className="progress-label">{`${progress}%`}</span>
    </div>
  );
};

export default ProgressBar;
