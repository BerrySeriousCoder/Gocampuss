
import { useState, useEffect } from "react";

interface FilterOption {
  label: string;
  value: string; // Can represent numbers as strings for consistency in this structure
}

interface FilterPanelProps {
  gender?: string | null;
  category?: string | null;
  quota?: string | null;
  round?: number | null; // Added round
  onFilterChange: (filterType: string, value: string | null) => void;
  categoryOptions: FilterOption[];
  quotaOptions: FilterOption[];
  roundOptions: FilterOption[]; // Added roundOptions
}

const FilterPanel = ({
  gender,
  category,
  quota,
  round, // Added round
  onFilterChange,
  categoryOptions,
  quotaOptions,
  roundOptions, // Added roundOptions
}) => {
  return (
    <div className="bg-surface glass border border-surface-border rounded-lg p-4 space-y-4">
      <h2 className="font-semibold text-lg">Filters</h2>
      
      {/* Gender Filter */}
      <div>
        <h3 className="text-sm font-medium mb-2">Gender</h3>
        <div className="flex flex-wrap gap-2">
          <button
            className={`pill ${!gender ? "bg-gradient-to-r from-purple-primary to-purple-light text-white" : ""}`}
            onClick={() => onFilterChange("gender", null)}
          >
            All
          </button>
          <button
            className={`pill ${gender === "male" ? "bg-gradient-to-r from-purple-primary to-purple-light text-white" : ""}`}
            onClick={() => onFilterChange("gender", "male")}
          >
            Male
          </button>
          <button
            className={`pill ${gender === "female" ? "bg-gradient-to-r from-purple-primary to-purple-light text-white" : ""}`}
            onClick={() => onFilterChange("gender", "female")}
          >
            Female
          </button>
        </div>
      </div>
      
      {/* Category Filter */}
      <div>
        <h3 className="text-sm font-medium mb-2">Category</h3>
        <div className="flex flex-wrap gap-2">
          <button
            className={`pill ${!category ? "bg-gradient-to-r from-purple-primary to-purple-light text-white" : ""}`}
            onClick={() => onFilterChange("category", null)}
          >
            All
          </button>
          {categoryOptions.map((opt) => (
            <button
              key={opt.value}
              className={`pill ${category === opt.value ? "bg-gradient-to-r from-purple-primary to-purple-light text-white" : ""}`}
              onClick={() => onFilterChange("category", opt.value)}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
      
      {/* Quota Filter */}
      <div>
        <h3 className="text-sm font-medium mb-2">Quota</h3>
        <div className="flex flex-wrap gap-2">
          <button
            className={`pill ${!quota ? "bg-gradient-to-r from-purple-primary to-purple-light text-white" : ""}`}
            onClick={() => onFilterChange("quota", null)}
          >
            All
          </button>
          {quotaOptions.map((opt) => (
            <button
              key={opt.value}
              className={`pill ${quota === opt.value ? "bg-gradient-to-r from-purple-primary to-purple-light text-white" : ""}`}
              onClick={() => onFilterChange("quota", opt.value)}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
      
      {/* Round Filter */}
      <div>
        <h3 className="text-sm font-medium mb-2">Round</h3>
        <div className="flex flex-wrap gap-2">
          <button
            className={`pill ${round === null ? "bg-gradient-to-r from-purple-primary to-purple-light text-white" : ""}`}
            onClick={() => onFilterChange("round", null)}
          >
            All
          </button>
          {roundOptions.map((opt) => (
            <button
              key={opt.value}
              className={`pill ${round === parseInt(opt.value) ? "bg-gradient-to-r from-purple-primary to-purple-light text-white" : ""}`}
              onClick={() => onFilterChange("round", opt.value)}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
