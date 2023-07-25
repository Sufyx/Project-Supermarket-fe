/**
 * 
 */


import ProductCard from './ProductCard';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import uuid from 'react-uuid';
import {
    Col, Divider, Row
} from 'antd';


export default function ProductGrid() {
    const baseUrl = process.env.REACT_APP_SERVER_URL;

    const [productList, setProductList] = useState<any[]>([]);

    useEffect(() => {
        fetchProducts();
    }, [])

    async function fetchProducts() {
        try {
            const res = await axios.get(`${baseUrl}/products/getProducts`);
            setProductList([...res.data.products]);
        } catch (error) {
            if (error instanceof Error)
                console.log("Error at fetchProducts: ", error.message);
            console.error(error);
        }
    }



    return (
        <div>
            <div className='productGrid'>
            {productList.map(product => {
                return <div className="gridItem" key={uuid()}>
                            <ProductCard product={product} />
                            {/* <div>{product.name}</div> */}
                        </div>
                
            })}
            </div>
        </div>
    )
}
