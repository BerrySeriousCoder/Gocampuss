
import React from "react";

type Board = "aktu";

interface BoardToggleProps {
  value: Board;
  onChange: (value: "aktu") => void;
}

const BoardToggle = ({ value, onChange }: BoardToggleProps) => {
  return (
    <div className="flex rounded-full p-1 bg-surface border border-purple-primary">
      <button
        type="button"
        className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
          value === "aktu"
            ? "bg-gradient-to-r from-purple-primary to-purple-light text-white"
            : "text-muted-foreground hover:text-foreground"
        }`}
        onClick={() => onChange("aktu")}
      >
        AKTU
      </button>
    </div>
  );
};

export default BoardToggle;
