import { useState, useEffect } from "react";
import axios from "axios";

const NFTPORT_BASE_URL = "https://api.nftport.xyz";
const chain = "goerli";
const apiKey = process.env.NEXT_PUBLIC_NFT_PORT_API_KEY;

export const useNftPortTransactions = (address) => {
    const [nftTransactions, setNftTransactions] = useState({
        loading: false,
        success: false,
        error: false,
    });
    useEffect(() => {
        const loadTransactions = async () => {
            setNftTransactions({
                loading: true,
                success: false,
                error: false,
            });
            try {
                const queryUrl = `${NFTPORT_BASE_URL}/v0/transactions/accounts/${address}`;
                const { data: transactions, status } = await axios.get(queryUrl, {
                    params: { chain, type: "all" },
                    headers: {
                        Authorization: apiKey,
                    },
                });
                if (status !== 200) {
                    throw new Error("Invalid response status");
                }
                setNftTransactions({
                    loading: false,
                    success: true,
                    error: false,
                    data: transactions,
                });
            } catch (e) {
                setNftTransactions({
                    loading: false,
                    success: false,
                    error: true,
                });
            }
        };
        if (address && apiKey) {
            loadTransactions();
        }
    }, [address, apiKey]);
    return nftTransactions;
};

export const useNftPortContracts = (address) => {
    const [contracts, setContracts] = useState({
        loading: false,
        success: false,
        error: false,
    });
    useEffect(() => {
        const loadContracts = async () => {
            setContracts({
                loading: true,
                success: false,
                error: false,
            });
            try {
                const queryUrl = `${NFTPORT_BASE_URL}/v0/accounts/contracts/${address}`;
                const { data: transactions, status } = await axios.get(queryUrl, {
                    params: { chain, type: "owns_contracts" },
                    headers: {
                        Authorization: apiKey,
                    },
                });
                if (status !== 200) {
                    throw new Error("Invalid response status");
                }
                setContracts({
                    loading: false,
                    success: true,
                    error: false,
                    data: transactions,
                });
            } catch (e) {
                setContracts({
                    loading: false,
                    success: false,
                    error: true,
                });
            }
        };
        if (address && apiKey) {
            loadContracts();
        }
    }, [address, apiKey]);
    return contracts;
};

export const useNftPortNfts = (address) => {
    // address = '0x942878558bC523777fE11e6d725AF93c86458050';
    // address = '0x599aa2feaeec1c4caa33da6b7fbd0e6578953c96';
    // address = '0x51688cd36c18891167e8036bde2a8fb10ec80c43';
    const [contracts, setContracts] = useState({
        loading: false,
        success: false,
        error: false,
    });
    useEffect(() => {
        const loadContracts = async () => {
            setContracts({
                loading: true,
                success: false,
                error: false,
            });
            try {
                const queryUrl = `${NFTPORT_BASE_URL}/v0/accounts/${address}`;
                const { data: transactions, status } = await axios.get(queryUrl, {
                    params: { chain, include: ['metadata', 'file_information', 'contract_information'] },
                    headers: {
                        Authorization: apiKey,
                    },
                });
                if (status !== 200) {
                    throw new Error("Invalid response status");
                }
                setContracts({
                    loading: false,
                    success: true,
                    error: false,
                    data: transactions,
                });
            } catch (e) {
                setContracts({
                    loading: false,
                    success: false,
                    error: true,
                });
            }
        };
        if (address && apiKey) {
            loadContracts();
        }
    }, [address, apiKey]);
    return contracts;
};