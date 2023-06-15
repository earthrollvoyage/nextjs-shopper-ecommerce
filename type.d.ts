export interface Product {
  _id: number
  title: string
  des: string
  oldPrice: number
  price: number
  brand: string
  image: string
  isNew: boolean
  category: string
}[]

export interface ProductItem {
  _id: number
  title: string
  des: string
  oldPrice: number
  price: number
  brand: string
  image: string
  isNew: boolean
  category: string
}

export interface StoreProduct {
  _id: number;
  title: string;
  des: string;
  image: string;
  price: number;
  brand: string;
  category: string;
  quantity: number;
  oldPrice: number;
}

export interface UserInfo {
  _id: string;
  name: string;
  email: string
}