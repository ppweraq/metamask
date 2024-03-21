"use client";

import { Button } from "@mui/material";
import "./Wallet.css";
import React, { useState } from "react";
import Web3 from "web3";
import NetworkUtils from "./NetworkUtils";
import AnimatedTypingText from "./AnimationTyping";
import { space_Mono } from "@/app/Fonts";

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
            className={`${space_Mono.className} btn-connect`}
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
          <p className="text-sm md:text-base">
            Network: <AnimatedTypingText text={network} />
          </p>
          <p className="text-sm md:text-base">
            Address: <AnimatedTypingText text={address} />
          </p>
          <p className="text-sm md:text-base">
            Balance: <AnimatedTypingText text={balance} />
          </p>
        </div>
        <div className="flex flex-col gap-2 md:flex-row md:gap-4 my-4 md:my-8">
          <input
            className="border rounded-lg text-sm md:text-base text-black outline-none px-2 py-1 md:px-4 md:py-2"
            type="text"
            placeholder="Destination Address"
            value={destinationAddress}
            onChange={handleDestinationChange}
          />
          <Button
            className={`${space_Mono.className} btn-connect text-sm md:text-base`}
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
