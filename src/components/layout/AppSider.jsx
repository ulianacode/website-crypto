import React, { useContext } from 'react';
import { Layout, Card, Statistic, Spin, List, Typography, Tag } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { capitilize } from '../../utils';
import CryptoContext from '../../context/crypto-context';

const siderStyle = {
  padding: '1rem',
};

function AppSider() {
  const { loading, assets } = useContext(CryptoContext);

  if (loading) {
    return <Spin fullscreen />;
  }

  if (!assets || assets.length === 0) {
    return <div>No assets available.</div>;
  }

  return (
    <Layout.Sider width="25%" style={siderStyle}>
      {assets.map((asset) => (
        <Card key={asset.id} style={{ marginBottom: '1em' }}>
          <Statistic
            title={capitilize(asset.id)}
            value={asset.totalAmount}
            precision={2}
            valueStyle={{ color: asset.grow ? '#3f8600' : '#cf1322' }}
            prefix={asset.grow ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
            suffix="$"
          />
          <List
            size="small"
            bordered
            dataSource={[
              { title: 'Total Profit', value: asset.totalProfit, withTag: true },
              { title: 'Asset Amount', value: asset.amount, isPlain: true },
            ]}
            renderItem={(item) => (
              <List.Item style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>{item.title}</span>
                <span>
                  {item.withTag && (
                    <Tag color={asset.grow ? 'green' : 'red'}>{asset.growPercent}%</Tag>
                  )}
                  {item.isPlain && item.value}
                  {!item.isPlain && (
                    <Typography.Text type={asset.grow ? 'success' : 'danger'}>
                      {item.value.toFixed(2)}$
                    </Typography.Text>
                  )}
                </span>
              </List.Item>
            )}
          />
        </Card>
      ))}
    </Layout.Sider>
  );
}

export default AppSider;

