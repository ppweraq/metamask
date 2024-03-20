"use client";

import { Button } from "@mui/material";
import "./Wallet.css";
import React, { useEffect, useState } from "react";
import Web3 from "web3";
import NetworkUtils from "./NetworkUtils";
import { spaceMono } from "@/app/layout";
import AnimatedTypingText from "./AnimationTyping";

const Wallet: React.FC = () => {
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [address, setAddress] = useState<string>("");
  const [network, setNetwork] = useState<string>("");
  const [balance, setBalance] = useState<string>("");
  const [destinationAddress, setDestinationAddress] = useState<string>("");

  const connectToMetamask = async () => {
    if (
      typeof window !== "undefined" &&
      typeof window.ethereum !== "undefined"
    ) {
      try {
        const ethereum = window.ethereum;
        await ethereum.request({ method: "eth_requestAccounts" });
        const web3Instance = new Web3(ethereum);
        console.log(web3Instance);
        setWeb3(web3Instance);
        const accounts = await web3Instance.eth.getAccounts();
        console.log(accounts);
        setAddress(accounts[0]);
        const networkId = Number(await web3Instance.eth.net.getId());
        const networkName = NetworkUtils(networkId);
        setNetwork(networkName);

        const balanceHandler = await web3Instance.eth.getBalance(address);
        const balanceNet = parseFloat(
          web3Instance.utils.fromWei(balanceHandler, "ether")
        );
        setBalance(balanceNet.toString());
      } catch (error) {
        console.error("Ошибка при подключении MetaMask", error);
      }
    } else {
      alert("Установите расширение Metamask");
    }
  };

  const handleDestinationChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDestinationAddress(event.target.value);
  };

  const handleSendTransaction = () => {
    
  };

  return (
    <div className="m-20">
      <header className="flex justify-between">
        <p className="text-xl">Test App</p>
        <nav>
          <Button
            className={`${spaceMono.className} btn-connect`}
            variant="outlined"
            onClick={connectToMetamask}
          >
            Connect Wallet
          </Button>
        </nav>
      </header>
      {web3 && address && (
        <div>
          <div className="container">
            <p className="flex">
              Network: <AnimatedTypingText text={network} />
            </p>
            <p className="flex">
              Address:
              <AnimatedTypingText text={address} />
            </p>
            <p className="flex">
              Balance:
              <AnimatedTypingText text={balance} />
            </p>
          </div>
          <div className="flex gap-2 my-8">
            <input
              className="border rounded-lg text-black outline-none"
              type="text"
              placeholder="Destination Address"
              value={destinationAddress}
              onChange={handleDestinationChange}
            />
            <Button
              className={`${spaceMono.className} btn-connect`}
              variant="contained"
              onClick={handleSendTransaction}
            >
              Send Transaction
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Wallet;
