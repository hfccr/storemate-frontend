import React from "react";
import { useNftPortNfts } from "../hooks/useNftPort";
import { useAccount, useProvider, useSigner } from "wagmi";
import Loader from "../components/Loader";
import Alert from '@mui/material/Alert';
import Container from '@mui/material/Container';
import Nfts from "../components/Nfts";

const View = () => {
    const { address, isConnected } = useAccount();
    return <Container sx={{ marginTop: 4 }}>
        {!isConnected && <Alert severity="warning">Connect Wallet To Continue</Alert>}
        {isConnected && <Nfts address={address} />}
    </Container>;
};

export default View;