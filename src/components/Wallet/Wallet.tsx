"use client";

import { Button } from "@mui/material";
import "./Wallet.css";
import React, { useEffect, useState } from "react";
import Web3 from "web3";
import NetworkUtils from "./NetworkUtils";
import AnimatedTypingText from "./AnimationTyping";
import { space_Mono } from "@/app/Fonts";
import TransationWallet from "../Transition/TransationWallet";

const Wallet: React.FC = () => {
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [address, setAddress] = useState<string>("");
  const [network, setNetwork] = useState<string>("");
  const [balance, setBalance] = useState<string>("");

  const connectToMetamask = async () => {
    const ethereum = (window as any).ethereum;

    if (typeof window !== "undefined" && typeof ethereum !== "undefined") {
      try {
        await ethereum.request({ method: "eth_requestAccounts" });

        const web3Instance = new Web3(ethereum);
        setWeb3(web3Instance);

        const accounts = await web3Instance.eth.getAccounts();
        setAddress(accounts[0]);

        const networkId = Number(await web3Instance.eth.net.getId());
        const networkName = NetworkUtils(networkId);
        setNetwork(networkName);

        const balanceOne = web3Instance.utils.fromWei(
          await web3Instance.eth.getBalance(accounts[0]),
          "ether"
        );
        const balanceNet = parseFloat(balanceOne);
        setBalance(balanceNet.toString());

        

      } catch (error) {
        console.error("Ошибка при подключении MetaMask", error);
      }
    } else {
      alert("Установите расширение Metamask");
    }
  };

  return (
    <div className="m-20">
      <header className="flex justify-between">
        <h1 className="text-xl">Test App</h1>
        <div>
          <Button
            className={`${space_Mono.className} btn-connect`}
            variant="outlined"
            onClick={connectToMetamask}
          >
            Connect Wallet
          </Button>
        </div>
      </header>
      {web3 && address && (
        <div>
          <div className="container mt-10">
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
          <TransationWallet address={address} web3={web3}/>
        </div>
      )}
    </div>
  );
};

export default Wallet;
