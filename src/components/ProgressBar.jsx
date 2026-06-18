import React from "react";

function ProgressBar({ current, total, className = "" }) {
  const percentage = Math.round((current / total) * 100);

  return (
    <div className={`w-full ${className}`}>
      <div className="flex justify-between items-center mb-3">
        <div>
          <p className="text-sm text-gray-500">
            Progress
          </p>

          <p className="font-semibold text-gray-900">
            Question {current} of {total}
          </p>
        </div>

        <div className="text-right">
          <p className="text-2xl font-bold text-gray-900">
            {percentage}%
          </p>
        </div>
      </div>

      <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
        <div
          className="h-full bg-black rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

export default ProgressBar;