import React, { useState, useEffect } from "react";

const PriceRangeFilter: React.FC<{
  onChange: (value: [number, number]) => void;
}> = ({ onChange }) => {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [activeThumb, setActiveThumb] = useState<"min" | "max">("max");

  const handleMinChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const minValue = Math.min(
      parseInt(event.target.value, 10),
      priceRange[1] - 1
    );
    setPriceRange([minValue, priceRange[1]]);
    setActiveThumb("min");
  };

  const handleMaxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const maxValue = Math.max(
      parseInt(event.target.value, 10),
      priceRange[0] + 1
    );
    setPriceRange([priceRange[0], maxValue]);
    setActiveThumb("max");
  };

  const handleMinInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const minValue = Math.max(0, parseInt(event.target.value, 10) || 0);
    setPriceRange([minValue, priceRange[1]]);
  };

  const handleMaxInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const maxValue = Math.min(500, parseInt(event.target.value, 10) || 500);
    setPriceRange([priceRange[0], maxValue]);
  };

  useEffect(() => {
    onChange(priceRange);
  }, [priceRange, onChange]);

  return (
    <div className="priceFilter">
      <h5>Цена</h5>
      <div className="range-slider">
        <input
          type="range"
          className={`range-min ${activeThumb === "min" ? "active" : ""}`}
          min="0"
          max="500"
          value={priceRange[0]}
          onChange={handleMinChange}
        />
        <input
          type="range"
          className={`range-max ${activeThumb === "max" ? "active" : ""}`}
          min="0"
          max="500"
          value={priceRange[1]}
          onChange={handleMaxChange}
        />
      </div>
      <div className="priceInputs">
        <input
          type="number"
          id="minPrice"
          value={priceRange[0]}
          onChange={handleMinInputChange}
          min="0"
          max={priceRange[1]}
        />

        <input
          type="number"
          id="maxPrice"
          value={priceRange[1]}
          onChange={handleMaxInputChange}
          min={priceRange[0]}
          max="500"
        />
      </div>
    </div>
  );
};

export default PriceRangeFilter;
