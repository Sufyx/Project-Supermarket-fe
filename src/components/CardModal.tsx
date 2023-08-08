/**
 * 
 */


import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Modal, Image } from 'antd';
import { Product } from '../contexts/Types';


export default function CardModal(
    props: {
        product: Product,
        modalOpen: boolean,
        setModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
    }) {

    // const baseUrl = process.env.REACT_APP_SERVER_URL;
    // const [modal2Open, setModal2Open] = useState<boolean>(props.modalOpen);
    // const [productData, setProductData] = useState<Product>();


    // useEffect(() => {

    // }, [])



    return (
        <div>
            <Modal
                title={props.product.name}
                centered
                open={props.modalOpen}
                footer={[
                    <Button key="back" onClick={() => props.setModalOpen(false)}>
                        Close
                    </Button>
                ]}
            >
                <Image.PreviewGroup
                    items={[
                        props.product.images[0],
                        props.product.images[1],
                        props.product.images[2],
                    ]}>
                    <Image
                        width={200}
                        src={props.product.images[0]}
                    />
                </Image.PreviewGroup>
                <p>{props.product.brand}</p>
                <p>{props.product.description}</p>
                <p>{props.product.price}$</p>
                <p>{(props.product.tags).join(" , ")}</p>
            </Modal>
        </div>
    )
}
