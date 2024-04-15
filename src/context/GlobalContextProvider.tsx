import { ReactNode, useEffect, useState } from "react";
import { GlobalContext } from "./GlobalContext";
import axios from "axios";
import {
  GlobalDataInterface,
  Product,
  SearchKeywordsData,
  GoogleAds,
} from "../interfaces/interfaces";

export const GlobalContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [data, setData] = useState<Product[] | undefined>([]);
  const [isFavoritesModalOpen, setIsFavoritesModalOpen] = useState(false);
  const [searchKeywords, setSearchKeywords] = useState<
    SearchKeywordsData[] | undefined
  >(undefined);
  const [adImage, setAdImage] = useState<GoogleAds[] | undefined>(undefined);
  const [isLogin, setIsLogin] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const toggleFavoritesModal = () => {
    setIsFavoritesModalOpen((prevState) => !prevState);
  };

  const toggleLoginModal = () => {
    setIsLoginModalOpen((prevState) => !prevState);
  };

  const toggleUserLogin = () => {
    setIsLogin((prevState) => !prevState);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsResponse = await axios.get<Product[]>(
          "http://localhost:5001/products"
        );
        setData(productsResponse.data);

        const keywordsResponse = await axios.get<SearchKeywordsData[]>(
          "http://localhost:5001/searchKeywords"
        );
        setSearchKeywords(keywordsResponse.data);
        const adsResponse = await axios.get<GoogleAds[]>(
          "http://localhost:5001/googleAds"
        ); // Adjust URL as needed
        setAdImage(adsResponse.data);
      } catch (error) {
        console.error("There was an error!", error);
      }
    };

    fetchData();
  }, []);

  const toggleFavorite = async (id: string): Promise<void> => {
    try {
      const updatedData = data?.map((product: any) => {
        if (product.id === id) {
          const updatedProduct = {
            ...product,
            isFavorite: !product.isFavorite,
          };

          setData((prevData) =>
            prevData?.map((prevProduct) =>
              prevProduct.id === id ? updatedProduct : prevProduct
            )
          );
          return updatedProduct;
        }
        return product;
      });

      const updatedProduct = updatedData?.find(
        (product: any) => product.id === id
      );
      if (updatedProduct) {
        await axios.put(`http://localhost:5001/products/${id}`, updatedProduct);
      }
    } catch (error) {
      console.error("Failed to update favorite status", error);
    }
  };

  const toggleNotifications = async (id: string): Promise<void> => {
    try {
      const updatedData = data?.map((product: any) => {
        if (product.id === id) {
          const updatedProduct = {
            ...product,
            notifications: !product.notifications,
          };

          setData((prevData) =>
            prevData?.map((prevProduct: any) =>
              prevProduct.id === id ? updatedProduct : prevProduct
            )
          );
          return updatedProduct;
        }
        return product;
      });

      const updatedProduct = updatedData?.find(
        (product: any) => product.id === id
      );
      if (updatedProduct) {
        await axios.patch(`http://localhost:5001/products/${id}`, {
          notifications: updatedProduct.notifications,
        });
      }
    } catch (error) {
      console.error("Failed to update notifications status", error);
    }
  };
  const GlobalData: GlobalDataInterface = {
    data: data,
    toggleFavorite: toggleFavorite,
    toggleNotifications: toggleNotifications,
    isFavoritesModalOpen: isFavoritesModalOpen,
    toggleFavoritesModal: toggleFavoritesModal,
    searchKeywords: searchKeywords,
    adImage: adImage,
    toggleLoginModal: toggleLoginModal,
    isLoginModalOpen: isLoginModalOpen,
    toggleUserLogin: toggleUserLogin,
    isLogin: isLogin,
  };
  return (
    <GlobalContext.Provider value={GlobalData}>
      {children}
    </GlobalContext.Provider>
  );
};
