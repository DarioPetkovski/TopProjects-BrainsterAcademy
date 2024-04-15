import React, { useState } from "react";

const DiscountFilter: React.FC<{ onChange: (value: string) => void }> = ({
  onChange,
}) => {
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
    onChange(event.target.value);
  };

  return (
    <div className="discountFilter">
      <h5>Попуст</h5>
      <div className="filter-items">
        <label>
          <input
            type="radio"
            value="20"
            checked={selectedOption === "20"}
            onChange={handleOptionChange}
          />
          20% или повеќе
        </label>
        <label>
          <input
            type="radio"
            value="10"
            checked={selectedOption === "10"}
            onChange={handleOptionChange}
          />
          10% или повеќе
        </label>
        <label>
          <input
            type="radio"
            value="5"
            checked={selectedOption === "5"}
            onChange={handleOptionChange}
          />
          5% или повеќе
        </label>
      </div>
    </div>
  );
};

export default DiscountFilter;
