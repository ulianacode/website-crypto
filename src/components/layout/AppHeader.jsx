import { Layout, Select,  Space, Button, Flex,  Modal, Drawer } from 'antd';
import CryptoContext from '../../context/crypto-context';
import React, { useContext, useEffect, useState } from 'react';
import CoinInfoModal from '../CoinInfoModal';
import AddAssetForm from '../AddAssetForm';

const headerStyle = {
    width: '100%',
    textAlign: 'center',
    height: 60,
    padding: '1rem',
    display: 'flex',
    aligmItems: 'center',
  };

function AppHeader() {
    const { crypto } = useCrypto();
    const [select, setSelected] = useState(false);
    const [modal, setModal] = useState(false);
    const [drawer, setDrawer] = useState(false);
    const [coin, setCoin] = useState(null);
    const handleOk = () => setModal(false);
    const handleCancel = () => setModal(false);
  
    useEffect(() => {
      const keypress = (event) => {
        if (event.key === '/') {
          setSelected(true)
        }
      }
      document.addEventListener('keypress', keypress)
      return () =>  document.addEventListener('keypress', keypress)
    }, [])

    function handleSelect (value) {
      setCoin(crypto.find(c => c.id === value))
      setModal(true);
    }

    return (
        <Layout.Header style={headerStyle}>
           <Select
              style={{ width: 250}}
              open={select}
              onSelect={handleSelect}
              onClick={() => setSelected((prev) => !prev)}
              value={"press / to open"}
              options={crypto.map(coin => ({
                label: coin.name,
                value: coin.id,
                icon: coin.icon,
              }))}
              optionRender={option => (
                <Space>
                 <img style={{width:20}} src={option.data.icon} alt={option.data.label} /> {option.data.label}
                </Space>
              )}
            />
              <Button type="primary" onClick={() => setDrawer(true)}>Add Asset</Button>
              <Modal   open={modal}
                  onOk={handleOk} 
                  onCancel={handleCancel} 
                  footer={null}>
                  <CoinInfoModal coin={coin}/>
            </Modal>

            <Drawer 
                  width={600}
                  title="Add Asset" 
                  onClose={() => setDrawer(false)} 
                  open={drawer}
                  destroyOnClose
             >
                <AddAssetForm onClose={() => setDrawer(false)}/>
          </Drawer>

        </Layout.Header>
    )
  }
  
  export default AppHeader;

export function useCrypto() {
  return useContext(CryptoContext)
}