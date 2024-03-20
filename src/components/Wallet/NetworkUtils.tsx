import React from 'react';

// Определение функции для получения названия сети по идентификатору
const NetworkUtils = (networkId: number): string => {
    switch (networkId) {
        case 1:
            return "Ethereum Mainnet";
        case 56:
            return "Binance Smart Chain Mainnet";
        case 97:
            return "Binance Smart Chain Testnet (BSC Testnet)";
        default:
            return "Unknown Network";
    }
}


export default NetworkUtils;