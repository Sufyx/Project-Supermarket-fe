/**
 * 
 */

import { useState, useEffect } from 'react';
import { Card } from 'antd';
import { Product } from '../contexts/Types';
import CardModal from './CardModal';

const { Meta } = Card;

export default function ProductCard(props: { product: Product }) {

    const [modalOpen, setModalOpen] = useState<boolean>(false);

    // function cardClick() {
    //     console.log("Product: ", props.product);
    // }


    return (
        <div className="productCard">
            <Card
                onClick={() => setModalOpen((prev) => !prev)}
                style={{
                    boxShadow: "0 0 3px 3px #8eb1b0",
                    width: "150px",
                }}
                hoverable
                // className="productCard"
                cover={<img alt={props.product.name}
                    src="https://media.istockphoto.com/id/1271880340/vector/lost-items-line-vector-icon-unidentified-items-outline-isolated-icon.jpg?s=612x612&w=0&k=20&c=d2kHGEmowThp_UrqIPfhxibstH6Sq5yDZJ41NetzVaA=" />}
            >
                <Meta
                    style={{
                        whiteSpace: "normal"
                    }}
                    title={props.product.name}
                    description={props.product.brand}
                // description={props.product.description} 
                />
            </Card>
            <CardModal product={props.product} 
                        modalOpen={modalOpen} setModalOpen={setModalOpen} />
        </div>
    )
}
