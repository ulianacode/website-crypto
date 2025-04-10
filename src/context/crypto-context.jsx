import React, { createContext, useState, useEffect } from 'react';
import { fetchAssets, fetchCrypto } from '../api';
import { percentDiff } from '../utils';

const CryptoContext = createContext();

export function CryptoContextProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [crypto, setCrypto] = useState([]);
  const [assets, setAssets] = useState([]);

  function mapAssets(assets, result){
    return assets.map(asset => {
      const coin = result.find((c) => c.id === asset.id);
          return {
            grow: asset.price < coin.price,
            growPercent: percentDiff(asset.price, coin.price),
            totalAmount: asset.amount * coin.price,
            totalProfit: asset.amount * coin.price - asset.amount * asset.price,
            name: coin.name,
            ...asset,
          };
    })
  }

  useEffect(() => {
    async function preload() {
      setLoading(true);
      const { result } = await fetchCrypto();
      const assets = await fetchAssets();

      setAssets(mapAssets(assets, result))
      setCrypto(result);
      setLoading(false);
    }
    preload();
  }, []);

  function addAsset(newAsset) {
    setAssets((prev) => mapAssets([...prev, newAsset], crypto))
  }
  return (
    <CryptoContext.Provider value={{ loading, crypto, assets, addAsset}}>
      {children}
    </CryptoContext.Provider>
  );
}

export default CryptoContext;
