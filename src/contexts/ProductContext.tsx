/**
 * 
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from './Types';

interface ProductContextValue {
    // productList: Product[];
    // setProductList: (productList: Product[]) => void;
    productList: Product[];
    setProductList: React.Dispatch<React.SetStateAction<Product[]>>;
}

const ProductContext = createContext<ProductContextValue>({
    productList: [],
    setProductList: () => { },
});

export function useProductContext() {
    return useContext(ProductContext);
}

interface ProductProviderProps {
    children: React.ReactNode;
}


export const ProductProvider: React.FC<ProductProviderProps> = ({ children }) => {

    const [productList, setProductList] = useState<Product[]>([]);

    // useEffect(() => {
    //   // get cart from user db
    // }, [])
    

    return (
        <ProductContext.Provider value={{ productList, setProductList }}>
            {children}
        </ProductContext.Provider>
    );

};
