/**
 * 
 */

import React, { useState, useEffect } from 'react';
import {
    Modal, Button, Cascader, Checkbox, DatePicker,
    Form, Input, InputNumber, Radio, Select, Slider,
    Switch, TreeSelect, Upload,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const { RangePicker } = DatePicker;
const { TextArea } = Input;

const normFile = (e: any) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};

export default function FormModal(
    props: {
        formOpen: boolean,
        setFormOpen: React.Dispatch<React.SetStateAction<boolean>>
    }) {

    // const [componentDisabled, setComponentDisabled] = useState<boolean>(true);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    useEffect(() => {
        setIsModalOpen(props.formOpen);
    }, [props.formOpen])

    const showModal = () => {
        setIsModalOpen(true);
        props.setFormOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
        props.setFormOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        props.setFormOpen(false);
    };

    return (
        <>
            {/* <Button type="primary" onClick={showModal}>
                Open Modal
            </Button> */}
            <Modal title="Basic Modal" open={isModalOpen}
                onOk={handleOk} onCancel={handleCancel}>

                <>
                    {/* <Checkbox
                        checked={componentDisabled}
                        onChange={(e) => setComponentDisabled(e.target.checked)}
                    >
                        Form disabled
                    </Checkbox> */}
                    <Form
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 14 }}
                        layout="horizontal"
                        // disabled={componentDisabled}
                        style={{ maxWidth: 600 }}
                    >
                        <Form.Item label="Checkbox" name="disabled" valuePropName="checked">
                            <Checkbox>Checkbox</Checkbox>
                        </Form.Item>
                        <Form.Item label="Radio">
                            <Radio.Group>
                                <Radio value="apple"> Apple </Radio>
                                <Radio value="pear"> Pear </Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item label="Input">
                            <Input />
                        </Form.Item>
                        <Form.Item label="Select">
                            <Select>
                                <Select.Option value="demo">Demo</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label="TreeSelect">
                            <TreeSelect
                                treeData={[
                                    { title: 'Light', value: 'light', children: [{ title: 'Bamboo', value: 'bamboo' }] },
                                ]}
                            />
                        </Form.Item>
                        <Form.Item label="Cascader">
                            <Cascader
                                options={[
                                    {
                                        value: 'zhejiang',
                                        label: 'Zhejiang',
                                        children: [
                                            {
                                                value: 'hangzhou',
                                                label: 'Hangzhou',
                                            },
                                        ],
                                    },
                                ]}
                            />
                        </Form.Item>
                        <Form.Item label="DatePicker">
                            <DatePicker />
                        </Form.Item>
                        <Form.Item label="RangePicker">
                            <RangePicker />
                        </Form.Item>
                        <Form.Item label="InputNumber">
                            <InputNumber />
                        </Form.Item>
                        <Form.Item label="TextArea">
                            <TextArea rows={4} />
                        </Form.Item>
                        <Form.Item label="Switch" valuePropName="checked">
                            <Switch />
                        </Form.Item>
                        <Form.Item label="Upload" valuePropName="fileList" getValueFromEvent={normFile}>
                            <Upload action="/upload.do" listType="picture-card">
                                <div>
                                    <PlusOutlined />
                                    <div style={{ marginTop: 8 }}>Upload</div>
                                </div>
                            </Upload>
                        </Form.Item>
                        <Form.Item label="Button">
                            <Button>Button</Button>
                        </Form.Item>
                        <Form.Item label="Slider">
                            <Slider />
                        </Form.Item>
                    </Form>
                </>

            </Modal>
        </>
    );
}

