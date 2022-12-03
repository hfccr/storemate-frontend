import { useState, useEffect } from "react";
import axios from "axios";

const WEB3_STORAGE_BASE_URL = "https://api.web3.storage/";

const apiKey = process.env.NEXT_PUBLIC_WEB3_STORAGE_TOKEN;

export const useDeals = (cid) => {
    const [deals, setDeals] = useState({
        loading: false,
        success: false,
        error: false,
    });
    useEffect(() => {
        const loadTransactions = async () => {
            setDeals({
                loading: true,
                success: false,
                error: false,
            });
            try {
                const queryUrl = `${WEB3_STORAGE_BASE_URL}/status/${cid}`;
                const { data: deals, status } = await axios.get(queryUrl, {
                    headers: {
                        Authorization: `Bearer ${apiKey}`,
                    },
                });
                if (status !== 200) {
                    throw new Error("Invalid response status");
                }
                setDeals({
                    loading: false,
                    success: true,
                    error: false,
                    data: deals,
                });
                console.log(deals);
            } catch (e) {
                console.log('Error in getting ');
                console.log(e);
                setDeals({
                    loading: false,
                    success: false,
                    error: true,
                });
            }
        };
        if (cid && apiKey) {
            loadTransactions();
        } else {
            setDeals({
                loading: false,
                success: false,
                error: true
            })
        }
    }, [cid, apiKey]);
    return deals;
};
