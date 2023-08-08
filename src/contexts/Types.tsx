/**
 * 
 */

export interface User {
    id: number;
    name: string;
    password: string;
    passwordConfirm: string;
    email: string;
    phone: string;
    role: string;
    birthDate: Date;
    orders: string[];
    favorites: string[];
    creditCards: string[];
    // token: string;
  }

  export interface Product {
    name: string;
    brand: string;
    description: string;
    supplier: string;
    price: number;
    barcode: number;
    quantity: number;
    lastUpdate: Date;
    tags: string[];
    categories: string[];
    images: string[];
  }
  