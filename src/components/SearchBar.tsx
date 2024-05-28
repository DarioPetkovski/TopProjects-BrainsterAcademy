import React from "react";

function SearchBar({
  search,
  handleSearchChange,
}: {
  search: string;
  handleSearchChange: (e: any) => void;
}) {
  return (
    <div className="w-100 d-flex justify-content-center">
      <div className="position-relative mt-5" style={{ width: "30%" }}>
        <img
          style={{
            width: "20px",
            height: "20px",
            left: "10px",
            top: "50%",
            transform: "translateY(-50%)",
          }}
          src="/assets/images/searchGlass.png"
          alt=""
          className="position-absolute"
        />
        <input
          onChange={handleSearchChange}
          value={search}
          type="text"
          placeholder="search"
        />
      </div>
    </div>
  );
}

export default SearchBar;
