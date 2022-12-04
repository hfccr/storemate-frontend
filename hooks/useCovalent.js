import { useState, useEffect } from "react";
import axios from "axios";

const COVALENT_BASE_URL = "https://api.covalenthq.com";
const apiKey = process.env.NEXT_PUBLIC_COVALENT_API_KEY;
const CHAIN_ID = "5";

export const useCovalentTokenBalances = (address, tokenId) => {
  const [balances, setBalances] = useState({
    loading: false,
    success: false,
    error: false,
  });
  const userName = apiKey;
  const password = "";
  const usernamePasswordBuffer = Buffer.from(userName + ":" + password);
  const base64Data = usernamePasswordBuffer.toString("base64");
  useEffect(() => {
    const loadBalances = async () => {
      setBalances({
        loading: true,
        success: false,
        error: false,
      });
      try {
        const queryUrl = `${COVALENT_BASE_URL}/v1/${CHAIN_ID}/tokens/${address}/nft_transactions/${tokenId}/?quote-currency=USD&format=JSON`;
        const { data: balances, status } = await axios.get(queryUrl, {
          headers: {
            Authorization: `Basic ${base64Data}`,
          },
        });
        if (status !== 200) {
          throw new Error("Invalid response status");
        }
        setBalances({
          loading: false,
          success: true,
          error: false,
          data: balances,
        });
      } catch (e) {
        console.log(e);
        setBalances({
          loading: false,
          success: false,
          error: true,
        });
      }
    };
    if (address && apiKey) {
      loadBalances();
    }
  }, [address, apiKey]);
  return balances;
};
