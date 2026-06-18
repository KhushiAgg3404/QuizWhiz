import React from "react";
import { Clock3 } from "lucide-react";
import { useSelector } from "react-redux";

function Timer() {
  const { timeLeft } = useSelector((state) => state.quiz);

  const getTimerColor = () => {
    if (timeLeft > 120) return "text-green-600";
    if (timeLeft > 60) return "text-amber-500";
    return "text-red-500";
  };

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const secs = seconds % 60;

    return `${String(min).padStart(2, "0")}:${String(secs).padStart(
      2,
      "0"
    )}`;
  };

  return (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
        <Clock3 size={18} className={getTimerColor()} />
      </div>

      <div>
        <p className="text-xs text-gray-500 uppercase tracking-wide">
          Timer
        </p>

        <p
          className={`font-mono text-2xl font-bold tracking-tight ${getTimerColor()}`}
        >
          {formatTime(timeLeft)}
        </p>
      </div>
    </div>
  );
}

export default Timer;