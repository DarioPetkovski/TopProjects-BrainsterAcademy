// Интерфејс за секој продукт
export interface Product {
  name: string;
  category: string;
  image: string;
  desc: string;
  price: number;
  rating: string;
  discount: string;
  isFavorite: boolean;
  notifications: boolean;
  icon: string;
  reviews: [];
  store: string;
  id: string;
  brand: string;
  views: number;
}
export interface SearchKeywordsData {
  Keywords: string[];
}

export interface GoogleAds {
  adurl: any;
  adImage: string;
}

export interface GlobalDataInterface {
  data: Product[] | undefined;
  isFavoritesModalOpen: boolean;
  toggleFavorite: (id: string) => void;
  toggleNotifications: (id: string) => void;
  toggleFavoritesModal: () => void;
  isLoginModalOpen: boolean;
  toggleLoginModal: () => void;
  isLogin: boolean;
  toggleUserLogin: () => void;

  searchKeywords: SearchKeywordsData[] | undefined;
  adImage: GoogleAds[] | undefined;
}

export interface Test {
  name: string;
  category?: string;
  image: string;
  desc?: string;
  price: number;
  rating: string;
  discount: string;
  isFavorite?: boolean;
  notifications?: boolean;
  icon?: string;
  reviews?: [];
  store?: string;
  id: string;
}

export interface ProductItem {
  name: string;
  category: string;
  image: string;
  desc: string;
  price?: number;
  rating?: string;
  discount?: string;
  isFavorite?: boolean;
  notifications?: boolean;
  icon?: string;
  reviews?: [];
  store?: string;
  id: string;
}

export interface Review {
  id: number | undefined;
  name: string;
  comment: string;
  rating: number;
  img: string;
}
