/**
 * 
 */

import React, { useState, useEffect } from 'react';
import { Card } from 'antd';

const { Meta } = Card;

export default function ProductCard(props: {product: any}) {
    return (
        <Card
            hoverable
            style={{ 
                boxShadow: "0 0 3px 3px #8eb1b0",
                height: "35vw"
            }}
            cover={<img alt={props.product.name} 
            src="https://media.istockphoto.com/id/1271880340/vector/lost-items-line-vector-icon-unidentified-items-outline-isolated-icon.jpg?s=612x612&w=0&k=20&c=d2kHGEmowThp_UrqIPfhxibstH6Sq5yDZJ41NetzVaA=" />}
        >
            <Meta 
                title={props.product.name} 
                description={props.product.description} 
                style={{height: "10vh" }} 
                />
        </Card>
    )
}
