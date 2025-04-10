import React from 'react';
import { Flex, Layout } from 'antd';

const { Header, Footer, Sider, Content } = Layout;

import './App.css'
import AppHeader from './components/layout/AppHeader';
import AppSider from './components/layout/AppSider';
import AppContent from './components/layout/AppContent';
import CryptoContextProvider from './context/crypto-context';

function App() {

  return (
    <CryptoContextProvider>
      <Layout>
      <AppHeader/>
        <Layout>
          <AppSider/>
          <AppContent/>
        </Layout>
      </Layout>
    </CryptoContextProvider>
  )
}

export default App;
