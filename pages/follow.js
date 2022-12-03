import React from "react";
import { useNftPortNfts } from "../hooks/useNftPort";
import { useAccount, useProvider, useSigner } from "wagmi";
import Loader from "../components/Loader";
import Alert from '@mui/material/Alert';
import Container from '@mui/material/Container';
import FollowInner from "../components/Follow";

const Follow = () => {
    const { address, isConnected } = useAccount();
    return <Container sx={{ marginTop: 4 }}>
        {!isConnected && <Alert severity="warning">Connect Wallet To Continue</Alert>}
        {isConnected && <FollowInner address={address} />}
    </Container>;
};

export default Follow;
