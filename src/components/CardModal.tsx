/**
 * 
 */


import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Modal, Image, Divider, Tooltip } from 'antd';
import {
    PlusOutlined, MinusOutlined
} from "@ant-design/icons";
import { Product } from '../contexts/Types';
import { useProductContext } from '../contexts/ProductContext';



export default function CardModal(
    props: {
        product: Product,
        modalOpen: boolean,
        setModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
    }) {

    const { productList, setProductList } = useProductContext();
    // const [localProductList, setLocalProductList] = useState<Product[]>([]);

    useEffect(() => {
        console.log("*** CardModal rendered : ", productList);
    }, [productList])
    

    async function addProduct() {
        // post request /addProductToCart/:productId
        props.product.addedByUser++;
        const productArr = [...productList, props.product];
        // productArr.push(props.product);
        setProductList([...productArr]);
        console.log("localList updated : ", productList);
    }


    return (
        <div>
            <Modal
                className='cardModal'
                centered
                open={props.modalOpen}
                onCancel={() => props.setModalOpen(false)}
                style={{
                    fontFamily: "'Lora', serif",
                    background: "#838db3"
                }}
                footer={[
                    <Button key="back" onClick={() => props.setModalOpen(false)}>
                        Close
                    </Button>
                ]}>
                <p style={{
                    fontSize: 20,
                    fontWeight: '800'
                }}>
                    {props.product.name}
                </p>
                <Divider />
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    // fontSize: 60
                }}>
                    <Tooltip title="Add">
                        <Button size="large" type="primary" shape="circle"
                            icon={<PlusOutlined />}
                            onClick={addProduct}
                        />
                    </Tooltip>
                    <Image.PreviewGroup
                        items={[...props.product.images]}>
                        <Image
                            width={200}
                            src={props.product.images[0]}
                        />
                    </Image.PreviewGroup>
                    <Tooltip title="Remove">
                        <Button size="large" type="primary" shape="circle"
                            icon={<MinusOutlined />} />
                    </Tooltip>
                </div>
                <Divider />
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                }}>
                    <p>By {props.product.brand}</p>
                    <p style={{
                        fontSize: 20,
                        fontWeight: '800'
                    }}>
                        ₪&nbsp;{props.product.price}
                    </p>
                </div>
                <Divider />
                <p style={{
                    fontSize: 15,
                    fontWeight: '600'
                }}>
                    {props.product.description}
                </p>
                <Divider />
            </Modal>
        </div>
    )
}
