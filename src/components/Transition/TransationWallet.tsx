"use client";

import { space_Mono } from "@/app/Fonts";
import { Button, MenuItem, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import Web3 from "web3";
import { toWei, fromWei } from "web3-utils";

interface TransationWalletProps {
  address: string;
  web3: Web3;
}

const TransationWallet: React.FC<TransationWalletProps> = ({ address, web3 }) => {
  const [amount, setAmount] = useState<string>("");
  const [destinationAddress, setDestinationAddress] = useState<string>("");
  const [gasPrice, setGasPrice] = useState<bigint>(BigInt(0));
  const [transactionCost, setTransactionCost] = useState<string>("0");
  const [totalCost, setTotalCost] = useState<string>("0");
  const [expectedFee, setExpectedFee] = useState<string>("");
  const [weiAmount, setWeiAmount] = useState<string>("")

const gasLimit = 21000;

useEffect(() => {
  const fetchGasPrice = async () => {
    if (web3) {
      const price = await web3.eth.getGasPrice();
      setGasPrice(price);
    }
  };

  fetchGasPrice();
}, [web3]);

const calculateTransactionCost = (amount: string, gasPrice: bigint, gasLimit: number) => {
  const gasFee = Number(gasPrice) * gasLimit;
  const weiAmount = toWei(amount, "ether");
  setWeiAmount(weiAmount)
  const totalCost = Number(fromWei(weiAmount, "ether")) + Number(fromWei(String(gasFee), "ether"));
  setTransactionCost(fromWei(String(gasFee), "ether"));
  setTotalCost(String(totalCost));

};


  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAmount = e.target.value
    setAmount(newAmount)
    calculateTransactionCost(newAmount, gasPrice, gasLimit)
    }
  

  const handleSendTransaction = async () => {
    if (!web3 || !destinationAddress || !amount || Number(amount) <= 0) {
      console.error("Invalid transaction parameters");
      return;
    }

    try {

      const tx = {
        from: address,
        to: destinationAddress,
        value: weiAmount,
        gas: gasLimit,
        gasPrice: gasPrice,
      };

      const receipt = await web3.eth.sendTransaction(tx);

      console.log("Transaction sent:", receipt.transactionHash);

      console.log("Coins sent successfully! Total cost:", totalCost);
    } catch (error) {
      console.error("Error sending coins:", error);
    }
  };

  return (
    <div>
      <div className="m-4 md:m-20">
        <h2 className="text-lg md:text-2xl">Transaction Details</h2>
        <div className="mt-4 md:mt-8">
          <TextField
            className="w-full mb-4"
            label="Destination Address"
            value={destinationAddress}
            onChange={(e) => setDestinationAddress(e.target.value)}
          />
          <TextField
            className="w-full mb-4"
            label="Amount"
            value={amount}
            onChange={handleAmountChange}
          />
          <div>
            <p>Fee: {transactionCost} ETH</p>
            <p>Total Cost: {totalCost} ETH</p>
          </div>
          <Button
            variant="outlined"
            onClick={handleSendTransaction}
            className={`${space_Mono.className} btn-connect w-full`}
          >
            Send Transaction
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TransationWallet;
