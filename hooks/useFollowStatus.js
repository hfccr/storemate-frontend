import { useState, useEffect } from "react";
import axios from "axios";

export const useFollowStatus = (address) => {
    const [followStatus, setFollowStatus] = useState({
        loading: false,
        success: false,
        error: false,
    });
    useEffect(() => {
        const loadFollowStatus = async () => {
            setFollowStatus({
                loading: true,
                success: false,
                error: false,
            });
            try {
                const queryUrl = `//status/${cid}`;
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
        }
    }, [cid, apiKey]);
    return deals;
};
