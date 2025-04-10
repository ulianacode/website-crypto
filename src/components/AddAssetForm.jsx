import {Flex, Tag, Select, Space, Typography, DatePicker, Divider, Button, Form, Input, InputNumber} from 'antd';
import { useState } from 'react';
import { useCrypto } from './layout/AppHeader';

export default function AddAssetForm() {
    const {crypto} = useCrypto();
    const [coin, setCoin] = useState(null)

    const validateMessages = {
        required: '${label} is required.',
        types: {
            number: '${label} is not valid.',
        },
        number: {
            range: '${label} must been between ${min} and ${max}',
        },
    }

    if (!coin) {
        return (          
             <Select
            style={{ width: '100%'}}
            onSelect={(v) => setCoin(crypto.find(c => c.id === v))}
            placeholder={"Select coin"}
            options={crypto.map(coin => ({
              label: coin.name,
              value: coin.id,
              icon: coin.icon,
            }))}
            optionRender={(option) => (
              <Space>
               <img style={{width:20}} src={option.data.icon} alt={option.data.label} /> {option.data.label}
              </Space>
            )}
          />)
    }

    function onFinish(values) {
        console.log('finish', values)
    }

    function handleAmountChange(values) {

    }
    return (<Form
                name="basic"
                labelCol={{ span: 4, }}
                wrapperCol={{ span: 10, }}
                style={{ maxWidth: 600, }}
                initialValues={{
                    price: coin.price.toFixed(2),
                }}
                onFinish={onFinish}
                validateMessages={validateMessages}
            >
        <Flex align='center'>
            <img src={coin.icon} alt={coin.name} style={{ width: 40, marginRight: 10 }} />
            <Typography.Title level={2} style={{ margin: 0 }}>
                ({coin.symbol}) {coin.name}
            </Typography.Title>
        <Typography.Title level={2} style={{margin: 0}}>
            {coin.name}
        </Typography.Title>
        </Flex>
        <Divider/>
            <Form.Item
            label="Amount"
            name="Amount"
            rules={[{
                 required: true,
                 min: 0,
                 max: 100000,
            }]}
            >
            <InputNumber placeholder='Enter amount' onChange={handleAmountChange} style={{width: '100%'}}/>
            </Form.Item>

            <Form.Item
            label="Price"
            name="price"
            >
            <InputNumber style={{width: '100%'}}/>
            </Form.Item>
            
            <Form.Item
            label="Date & Time"
            name="dateandtime"
            >
                <DatePicker showTime style={{width: '100%'}}/>
            </Form.Item>
            <Form.Item
            label="Total"
            name="total"
            >
            <InputNumber style={{width: '100%'}}/>
            </Form.Item>

            <Form.Item >
                <Button type="primary" htmlType="submit">
                    Add Asset
                </Button>
            </Form.Item>
        </Form>
)}