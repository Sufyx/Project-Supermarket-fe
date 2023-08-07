/**
 * 
 */


import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Modal } from 'antd';
import { Product } from '../contexts/Types';


export default function CardModal(
    props: {
        product: Product,
        modalOpen: boolean,
        setModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
    }) {
    const baseUrl = process.env.REACT_APP_SERVER_URL;

    const [modal2Open, setModal2Open] = useState<boolean>(props.modalOpen);
    const [productData, setProductData] = useState<Product>();


    useEffect(() => {
        setModal2Open(props.modalOpen);
    }, [props.modalOpen])

    function closeModal() {
        props.setModalOpen(false);
        setModal2Open(false);
    }


    return (
        <div>
            <Modal
                title="Vertically centered modal dialog"
                centered
                open={modal2Open}
                onOk={closeModal}
                onCancel={closeModal}
            >
                <p>{props.product.name}</p>
                <p>{props.product.brand}</p>
                <p>{props.product.description}</p>
                <p>{props.product.price}$</p>
                <p>{(props.product.tags).join(" , ")}</p>
            </Modal>
        </div>
    )
}