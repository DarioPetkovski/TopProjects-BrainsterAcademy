import React, { useState } from "react";

const BrandFilter: React.FC<{ onChange: (value: string) => void }> = ({
  onChange,
}) => {
  const [selectedBrand, setSelectedBrand] = useState<string>("all");

  const handleBrandChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newBrand = event.target.value;
    setSelectedBrand(newBrand);
    onChange(newBrand);
  };

  return (
    <div className="brandFilter">
      <h5>Бренд</h5>
      <div className="filter-items">
        <label>
          <input
            type="radio"
            name="brand"
            value="all"
            checked={selectedBrand === "all"}
            onChange={handleBrandChange}
          />
          All
        </label>
        <label>
          <input
            type="radio"
            name="brand"
            value="Apple"
            checked={selectedBrand === "Apple"}
            onChange={handleBrandChange}
          />
          Apple
        </label>
        <label>
          <input
            type="radio"
            name="brand"
            value="Sony"
            checked={selectedBrand === "Sony"}
            onChange={handleBrandChange}
          />
          Sony
        </label>
        <label>
          <input
            type="radio"
            name="brand"
            value="Samsung"
            checked={selectedBrand === "Samsung"}
            onChange={handleBrandChange}
          />
          Samsung
        </label>
        <label>
          <input
            type="radio"
            name="brand"
            value="Microsoft"
            checked={selectedBrand === "Microsoft"}
            onChange={handleBrandChange}
          />
          Microsoft
        </label>
        <label>
          <input
            type="radio"
            name="brand"
            value="Adidas"
            checked={selectedBrand === "Adidas"}
            onChange={handleBrandChange}
          />
          Adidas
        </label>
        <label>
          <input
            type="radio"
            name="brand"
            value="Nike"
            checked={selectedBrand === "Nike"}
            onChange={handleBrandChange}
          />
          Nike
        </label>
      </div>
    </div>
  );
};

export default BrandFilter;
