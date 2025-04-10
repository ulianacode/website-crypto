import React from 'react';
import { Layout } from 'antd';
import './App.css';
import AppHeader from './components/layout/AppHeader';
import AppSider from './components/layout/AppSider';
import AppContent from './components/layout/AppContent';
import {CryptoContextProvider} from './context/crypto-context';

const { Header, Footer, Sider, Content } = Layout;

function App() {
    return (
        <CryptoContextProvider>
            <Layout>
                <AppHeader />
                <Layout>
                    <AppSider />
                    <AppContent />
                </Layout>
            </Layout>
        </CryptoContextProvider>
    );
}

export default App;
