import { Flex, Tag, Select, Space, Result, Typography, DatePicker, Divider, Button, Form, Input, InputNumber } from 'antd'; 
import { useState, useRef } from 'react';
import { useCrypto } from './layout/AppHeader';
import CoinInfo from './layout/CoinInfo';

export default function AddAssetForm() {
    const [form] = Form.useForm();
    const { crypto, addAsset } = useCrypto();
    const [coin, setCoin] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const assetRef = useRef();


    const onClose = () => {
        setSubmitted(false);
        form.resetFields(); 
    };

    if (submitted) {
        return (
            <Result
                status="success"
                title="New Asset added"
                subTitle={`Added ${assetRef.current.amount} of ${coin?.name} by price ${assetRef.current.price}.`}
                extra={[
                    <Button type="primary" key="console" onClick={onClose}>
                        Go Console
                    </Button>,
                    <Button key="buy" onClick={onClose}>
                        Add Another
                    </Button>,
                ]}
            />
        );
    }

    const validateMessages = {
        required: '${label} is required.',
        types: {
            number: '${label} is not valid.',
        },
        number: {
            range: '${label} must be between ${min} and ${max}',
        },
    };

    if (!coin) {
        return (
            <Select
                style={{ width: '100%' }}
                onSelect={(v) => setCoin(crypto.find((c) => c.id === v))}
                placeholder="Select coin"
                options={crypto.map((coin) => ({
                    label: coin.name,
                    value: coin.id,
                    icon: coin.icon,
                }))}
                optionRender={(option) => (
                    <Space>
                        <img style={{ width: 20 }} src={option.data.icon} alt={option.data.label} />
                        {option.data.label}
                    </Space>
                )}
            />
        );
    }

    function onFinish(values) {
        const newAsset = {
            id: coin.id,
            amount: values.amount,
            price: values.price,
            date: values.date?.$d ?? new Date(),
        }
        assetRef.current = newAsset
        setSubmitted(true);
        addAsset(newAsset)
    }

    function handleAmountChange(value) {
        const price = form.getFieldValue('price');
        form.setFieldsValue({
            total: +(value * price).toFixed(4),
        });
    }

    function handlePriceChange(value) {
        const amount = form.getFieldValue('amount');
        form.setFieldsValue({
            total: +(amount * value).toFixed(4),
        });
    }

    return (
        <Form
            form={form}
            name="basic"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 10 }}
            style={{ maxWidth: 600 }}
            initialValues={{
                price: coin.price.toFixed(2),
                total: 0,
            }}
            onFinish={onFinish}
            validateMessages={validateMessages}
        >
            <CoinInfo coin={coin} />
            <Divider />
            <Form.Item
                label="Amount"
                name="amount"
                rules={[
                    {
                        required: true,
                        type: 'number',
                        min: 0,
                        max: 100000,
                    },
                ]}
            >
                <InputNumber placeholder="Enter amount" onChange={handleAmountChange} style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item label="Price" name="price">
                <InputNumber onChange={handlePriceChange} style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item label="Date & Time" name="dateandtime">
                <DatePicker showTime style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item label="Total" name="total">
                <InputNumber style={{ width: '100%' }} disabled />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Add Asset
                </Button>
            </Form.Item>
        </Form>
    );
}
