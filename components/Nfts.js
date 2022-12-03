import React from "react";
import { useNftPortNfts } from "../hooks/useNftPort";
import Loader from "./Loader";
import { Alert } from "@mui/material";
import { getIpfsLinks } from "../utils/nft";
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Nft from "./Nft";

const Nfts = ({ address }) => {
    const apiKey = process.env.NEXT_PUBLIC_NFT_PORT_API_KEY;
    const { loading, error, success, data } = useNftPortNfts(address, apiKey);
    let nftsWithIpfs = [];
    if (success) {
        if (data.response === 'OK') {
            nftsWithIpfs = data.nfts.map(nft => {
                const { fileUrlIpfs, metadataUrlIpfs } = getIpfsLinks(nft);
                return { ...nft, fileUrlIpfs, metadataUrlIpfs };
            }).filter(nft => { return typeof nft.fileUrlIpfs === 'string' || typeof nft.metadataUrlIpfs === 'string' });
        }
    }
    return (
        <div>
            {loading && <Loader />}
            {error && <Alert severity="error">Could not fetch NFTs</Alert>}
            {success && nftsWithIpfs.length === 0 && <Alert severity="info">None Of Your NFTs Use IPFS</Alert>}
            {success && nftsWithIpfs.length > 0 && (
                <Box sx={{ width: '100%' }}>
                    <Typography variant="h4" gutterBottom sx={{ marginBottom: 8, marginTop: 4 }}>
                        Your NFTs With IPFS Resources
                    </Typography>

                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        {nftsWithIpfs.map((nft, index) => {
                            return (
                                <Grid item xs={3} key={index}>
                                    <Nft nft={nft} />
                                </Grid>
                            );
                        })}
                    </Grid>
                </Box>
            )}
        </div>
    );
};

export default Nfts;