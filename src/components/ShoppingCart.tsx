/* eslint-disable react-hooks/exhaustive-deps */
/**
 * 
 */

import { useState, useEffect } from 'react';
import { Avatar, List } from 'antd';
import { Product } from '../contexts/Types';
import { useProductContext } from '../contexts/ProductContext';
// import { useUserContext } from '../contexts/UserContext';



export default function ShoppingCart() {

  interface CartItem {
    _id: string;
    name: string;
    price: number;
    barcode: number;
    addedByUser: number;
    images: string[];
  }


  const { addedProduct } = useProductContext();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);


  useEffect(() => {
    if (addedProduct)
      addToCart(addedProduct);
      updateTotalCost();
  }, [addedProduct]);

  // useEffect(() => {
  //   updateTotalCost();
  // }, [cart]);


  function addToCart(product: Product) {
    if (!product.addedByUser)
      product["addedByUser"] = 1;

    const cartItem: CartItem = {
      _id: product._id,
      name: product.name,
      price: product.price,
      barcode: product.barcode,
      addedByUser: product.addedByUser,
      images: [...product.images],
    }

    const updatedCart = [...cart];
    const index = cart.findIndex((item) => item._id === cartItem._id);
    if (index === -1)
      updatedCart.push(cartItem)
    else
      updatedCart[index].addedByUser++;
    setCart([...updatedCart]);
  }

  function updateTotalCost() {
    let total = 0;
    cart.forEach(item => total += (item.price));
    setTotalPrice(Number(total.toFixed(2)));
  }


  return (
    <div className="cartContainer">
      <List
        itemLayout="horizontal"
        // bordered
        dataSource={cart}
        footer={
          <div style={{
            margin: "0 10%",
            fontSize: 20,
            fontWeight: 600,
            color: "rgb(11, 97, 89)",
            textShadow: "0 0 1.5px red",
            textDecoration: "underline"
          }}>
            Total: {totalPrice}
          </div>
        }
        renderItem={(item, index) => (
          <List.Item
            extra={
              <img
              style={{
                width: 50,
                marginRight: 10
              }}
                alt={item.name}
                src={item.images[0]}
              />
            }
          >

            <List.Item.Meta
              style={{
                padding: "0 5px"
              }}
              // avatar={<Avatar src={item.images[0]} />}
              title={item.name}
              description={`Amount: ${item.addedByUser} 
                | Price: ${item.price} 
                | Total: ${(item.addedByUser * item.price).toFixed(2)}`}
            />

            {/* <div style={{marginRight: 10}}>
                {item.addedByUser}
              </div> */}
          </List.Item>
        )}
      />
    </div>
  )
}
