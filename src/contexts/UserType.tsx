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
  