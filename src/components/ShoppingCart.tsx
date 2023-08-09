/**
 * 
 */

import { useState, useEffect } from 'react';
import { Avatar, List } from 'antd';
import { Product } from '../contexts/Types';
// import { useProductContext } from '../contexts/ProductContext';
import { useUserContext } from '../contexts/UserContext';



export default function ShoppingCart() {

  interface CartItem {
    _id: string;
    name: string;
    price: number;
    barcode: number;
    addedByUser: number;
    images: string[];
  }

  const { addedProduct } = useUserContext();
  // const { addedProduct } = useProductContext();

  // const [cart, setCart] = useState<{ [itemId: string]: CartItem }>({});
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    // console.log("cart updated: ", addedProduct);
    if (addedProduct)
      addToCart(addedProduct);
  }, [addedProduct])


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


  return (
    <div className="cartContainer">
      <List
        itemLayout="horizontal"
        // bordered
        dataSource={cart}
        footer={
          <div>Total:</div>
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
                |Total: ${(item.addedByUser * item.price).toFixed(2)}`}
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
