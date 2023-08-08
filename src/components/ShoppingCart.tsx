/**
 * 
 */

import { useState, useEffect } from 'react';
import { Avatar, List } from 'antd';
import { Product } from '../contexts/Types';
import { useProductContext } from '../contexts/ProductContext';



export default function ShoppingCart() {

  const { productList } = useProductContext();
  const [cart, setCart] = useState<Product[]>([])

  useEffect(() => {
    console.log("cart updated: ", productList);
    setCart([...productList]);
  }, [productList])
  ////


  return (
    <div className="cartContainer">
      <List
        itemLayout="horizontal"
        dataSource={cart}
        renderItem={(item, index) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={item.images[0]} />}
              title={item.name}
              description={item.description}
            />
          </List.Item>
        )}
      />
    </div>
  )
}
