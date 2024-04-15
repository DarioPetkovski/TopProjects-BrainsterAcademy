import React, { useState } from "react";

const CategoryFilter: React.FC<{ onChange: (value: string) => void }> = ({
  onChange,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedCategory(event.target.value);
    onChange(event.target.value);
  };

  return (
    <div className="categoryFilter">
      <h5>Категорија</h5>
      <div className="filter-items">
        <label>
          <input
            type="radio"
            value="all"
            checked={selectedCategory === "all"}
            onChange={handleCategoryChange}
          />
          Сите
        </label>
        <label>
          <input
            type="radio"
            value="footwear"
            checked={selectedCategory === "footwear"}
            onChange={handleCategoryChange}
          />
          Обувки
        </label>
        <label>
          <input
            type="radio"
            value="appliances"
            checked={selectedCategory === "appliances"}
            onChange={handleCategoryChange}
          />
          Appliances
        </label>
      </div>
    </div>
  );
};

export default CategoryFilter;
