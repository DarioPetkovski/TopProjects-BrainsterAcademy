import React, { useState, useEffect } from "react";
import { useGlobalContext } from "../../context/GlobalContext";
import DiscountFilter from "./DiscountFilter";
import CategoryFilter from "./CategoryFilter";
import PriceRangeFilter from "./PriceRangeFilter";
import SortingFilter from "./SortingFilter";
import BrandFilter from "./BrandFilter";
import { ProductCard } from "../ProductCard/ProducCard";
import "./ProductListing.css";
import { GoogleAds } from "../../interfaces/interfaces";

const ProductListing: React.FC = () => {
  const { data: products, searchKeywords, adImage } = useGlobalContext();
  const [randomAds, setRandomAds] = useState<GoogleAds[]>([]);
  // Function to get three random, unique ads
  const getRandomAds = (ads: GoogleAds[]): GoogleAds[] => {
    let result: GoogleAds[] = [];
    let indices = new Set<number>();
    while (indices.size < 3 && ads.length > indices.size) {
      let randomIndex = Math.floor(Math.random() * ads.length);
      if (!indices.has(randomIndex)) {
        indices.add(randomIndex);
        result.push(ads[randomIndex]);
      }
    }
    return result;
  };

  const [filteredProducts, setFilteredProducts] = useState(products || []);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedDiscount, setSelectedDiscount] = useState<string>("");
  const [selectedBrand, setSelectedBrand] = useState<string>("all");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);

  useEffect(() => {
    if (adImage && adImage.length >= 3) {
      setRandomAds(getRandomAds(adImage));
    }
  }, [adImage]);

  useEffect(() => {
    if (!products) return;
    setFilteredProducts(products);
  }, [products]);

  useEffect(() => {
    filterProducts();
  }, [selectedCategory, selectedBrand, selectedDiscount, priceRange]);

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
  };

  const handleDiscountChange = (value: string) => {
    setSelectedDiscount(value);
  };

  const handleBrandChange = (value: string) => {
    setSelectedBrand(value);
  };

  const handlePriceRangeChange = (value: [number, number]) => {
    setPriceRange(value);
  };

  const handleSort = (sortValue: string) => {
    const sortedProducts = [...filteredProducts].sort((a, b) => {
      if (sortValue === "lowest-price") {
        return a.price - b.price;
      } else if (sortValue === "highest-price") {
        return b.price - a.price;
      } else if (sortValue === "view") {
        return b.views - a.views;
      }
      return 0;
    });
    setFilteredProducts(sortedProducts);
  };

  const filterProducts = () => {
    let filtered =
      products?.filter((product) => {
        const productDiscount = parseInt(product.discount);
        const minimumDiscount = parseInt(selectedDiscount);
        return (
          (selectedCategory === "all" ||
            product.category === selectedCategory) &&
          (selectedBrand === "all" || product.brand === selectedBrand) &&
          (isNaN(minimumDiscount) || productDiscount >= minimumDiscount) &&
          product.price >= priceRange[0] &&
          product.price <= priceRange[1]
        );
      }) || [];
    setFilteredProducts(filtered);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="product-listing">
      <h1>Сите Продукти</h1>
      <div className="container-product mainSorting">
        <div className="sorting">
          <SortingFilter onChange={handleSort} />
        </div>
      </div>
      <div className="container-product">
        <div className="filters">
          <h2>Филтри</h2>
          <div className="leftline"></div>
          <CategoryFilter onChange={handleCategoryChange} />
          <DiscountFilter onChange={handleDiscountChange} />
          <PriceRangeFilter onChange={handlePriceRangeChange} />

          <BrandFilter onChange={handleBrandChange} />
        </div>
        <div className="w-100">
          <div className="product-grid">
            {filteredProducts.map((product) => (
              <div key={product.id} className="mb-3">
                <ProductCard {...product} />
              </div>
            ))}
          </div>
          <div className="search-keywords-container">
            <h3>Популарни Пребарувања</h3>
            {searchKeywords &&
              searchKeywords[0] &&
              searchKeywords[0].Keywords.map((keyword, index) => (
                <span key={index} className="search-keyword">
                  {keyword}
                </span>
              ))}
          </div>
        </div>
      </div>
      <div className="ad-images-container">
        {randomAds.map((ad, index) => (
          <img
            key={index}
            src={require(`../../assets/images/${ad.adurl}`)}
            alt={`Ad ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductListing;
