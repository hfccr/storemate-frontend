import { useState, useEffect } from "react";
import axios from "axios";

export const useFollowStatus = (address, action, setAction) => {
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
                const queryUrl = `/api/follow?address=${address}`;
                let follows, status;
                if (action === 'get') {
                    ({ data: follows, status } = await axios.get(queryUrl, {}));
                } else if (action === 'post') {
                    ({ data: follows, status } = await axios.post(queryUrl, {}));
                } else if (action === 'delete') {
                    ({ data: follows, status } = await axios.delete(queryUrl, {}));
                }
                if (status !== 200) {
                    throw new Error("Invalid response status");
                }
                setFollowStatus({
                    loading: false,
                    success: true,
                    error: false,
                    data: follows,
                });
                setAction('get');
            } catch (e) {
                setFollowStatus({
                    loading: false,
                    success: false,
                    error: true,
                });
            }
        };
        if (address && action) {
            loadFollowStatus();
        }
    }, [address, action, setAction]);
    return followStatus;
};
