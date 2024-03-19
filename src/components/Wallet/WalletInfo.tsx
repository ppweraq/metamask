"use client";

import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { roboto } from "@/app/layout";

const WalletInfo = () => {
  const [address, setAddress] = useState<string>("");
  const [ethBalance, setEthBalance] = useState<string>("");
  const [bnbBalance, setBnbBalance] = useState<string>("");
  const [destinationAddress, setDestinationAddress] = useState<string>("");

  useEffect(() => {
    // Асинхронная функция, вызываемая для подключения к MetaMask и получения информации о кошельке
    const connectToMetamask = async () => {
      try {
        if (typeof window.ethereum !== "undefined") {
          const ethereum = window.ethereum;
          console.log(ethereum);
          await ethereum.request({ method: "eth_requestAccounts" });
          const accounts = await ethereum.request({ method: "eth_accounts" });
          setAddress(accounts[0]);
          const ethBalance = await ethereum.request({
            method: "eth_getBalance",
            params: [accounts[0], "latest"],
          });
          setEthBalance(ethBalance);
          setBnbBalance(bnbBalance);
          // You can add similar logic to get BNB balance
        } else {
          console.error("MetaMask not found");
        }
      } catch (error) {
        console.error("Error detecting MetaMask:", error);
      }
    };

    connectToMetamask();
  }, []);

  const handleDestinationChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDestinationAddress(event.target.value);
  };

  const handleSendTransaction = () => {
    // Add logic to send transaction
  };

  return (
    <div className="flex flex-col items-start">
      <div className="p-5 rounded-lg shadow-xl bg-white w-auto my-20 mx-auto">
        <p className="font-bold border-b-2 border-solid border-blue-800">
          Wallet
        </p>
        <p className="mt-5">
          <span className="font-bold">Address</span>: {address}
        </p>
        <p>
          <img src="./eth.png" alt="eth" className="inline-block h-4 w-4 mr-2"/>
          <span className="font-bold">ETH Balance:</span> {ethBalance}
        </p>
        <p>
          <img src="./bnb.png" alt="eth" className="inline-block h-4 w-4 mr-2"/>
          <span className="font-bold">BNB Balance:</span> {bnbBalance}
        </p>
        <div className="flex gap-2 my-8">
          <input
            className="border rounded-lg bg-gray-100"
            type="text"
            placeholder="Destination Address"
            value={destinationAddress}
            onChange={handleDestinationChange}
          />
          <Button
            className={`${roboto.className} bg-blue-800 text-white`}
            variant="contained"
            onClick={handleSendTransaction}
          >
            Send Transaction
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WalletInfo;
