import React, { useState } from "react";

const SortingFilter: React.FC<{ onChange: (value: string) => void }> = ({
  onChange,
}) => {
  const [sortValue, setSortValue] = useState<string>("popularity");

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    setSortValue(value);
    onChange(value);
  };

  return (
    <div>
      <select
        id="sorting-dropdown"
        value={sortValue}
        onChange={handleSortChange}
      >
        <option value="view">Подреди по популарност</option>
        <option value="lowest-price">Подреди по најниска цена</option>
        <option value="highest-price">Подреди по највисока цена</option>
      </select>
    </div>
  );
};

export default SortingFilter;
