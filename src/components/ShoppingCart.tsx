/* eslint-disable react-hooks/exhaustive-deps */
/**
 * 
 */

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Divider, List } from 'antd';
import { Product } from '../contexts/Types';
import { useProductContext } from '../contexts/ProductContext';
import { useUserContext } from '../contexts/UserContext';



export default function ShoppingCart() {

  const baseUrl = process.env.REACT_APP_SERVER_URL;
  const fallbackImage = "https://media.istockphoto.com/id/1271880340/vector/lost-items-line-vector-icon-unidentified-items-outline-isolated-icon.jpg?s=612x612&w=0&k=20&c=d2kHGEmowThp_UrqIPfhxibstH6Sq5yDZJ41NetzVaA=";

  interface CartItem {
    _id: string;
    name: string;
    price: number;
    barcode: number;
    addedByUser: number;
    images: string[];
  }


  const { addedProduct } = useProductContext();
  const { loggedUser } = useUserContext();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);


  useEffect(() => {
    if (loggedUser && loggedUser.cart)
      fillCart();
    else
      setCart([]);
      setTotalPrice(0);
  }, [loggedUser]);

  useEffect(() => {
    if (addedProduct)
      addToCart(addedProduct);
  }, [addedProduct]);


  async function fillCart() {
    if (!loggedUser) return;
    const token = localStorage.getItem('loggedUser');
    const res = await axios.get(`${baseUrl}/users/getUserCart`,
      { headers: { Authorization: `Bearer ${token}` } });
    const items = [...res.data.cart];
    let total = 0;
    items.forEach((item, i) => {
      item["addedByUser"] = loggedUser.cart[i].productAmount;
      total += (item.price * Number(loggedUser.cart[i].productAmount));
    });
    setTotalPrice(total);
    setCart([...items]);
  }


  async function addToCart(product: Product) {
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
    const amount = ((index === -1) ? 1 : updatedCart[index].addedByUser);

    const token = localStorage.getItem('loggedUser');
    const res = await axios.post(`${baseUrl}/users/addProductToCart?productId=${cartItem._id}&productAmount=${amount}`,
      null,
      { headers: { Authorization: `Bearer ${token}` } });
    // console.log("addToCart res.data: ", res.data);

    setCart([...updatedCart]);
    setTotalPrice(prevTotal => Number((prevTotal + cartItem.price).toFixed(2)));
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
            <Divider />
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
                src={item.images[0] ? item.images[0] : fallbackImage}
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
