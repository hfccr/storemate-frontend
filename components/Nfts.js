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
    const { loading, error, success, data } = useNftPortNfts(address);
    let nftsWithIpfs = [];
    if (success) {
        if (data.response === 'OK') {
            nftsWithIpfs = data.nfts.map(nft => {
                const { fileUrlIpfs, metadataUrlIpfs } = getIpfsLinks(nft);
                return { ...nft, fileUrlIpfs, metadataUrlIpfs };
            }).filter(nft => { return typeof nft.fileUrlIpfs === 'string' || typeof nft.metadataUrlIpfs === 'string' });
        }
        nftsWithIpfs.push({
            "contract_address": "0x40b9cb43e46b46fee4f81757decc49b836c1b94c",
            "token_id": "1",
            "name": "Access Pass SBT",
            "description": "This Access Pass is a soulbound token - meaning it can not be traded, sold nor transferred. It is intended as a token to indicate OG status in MV3. A snapshot was taken right before the MV3 character reveal to determine what wallets were airdropped an SBT.",
            "file_url": "ipfs://QmQVGjiYenu7ArLhBRiHe5TdrYHkxMDv6GJjb6BjqQz1Zd",
            "animation_url": null,
            "cached_file_url": "https://storage.googleapis.com/sentinel-nft/raw-assets/f7ecf176e581d9749096a423bf60c1ab6c827d71d26f4a9186aff8d48a60acd4.gif",
            "cached_animation_url": null,
            "creator_address": "0xfd44be061efb17c000d7233f0dec1a0c814b994e",
            "metadata": {
                "description": "This Access Pass is a soulbound token - meaning it can not be traded, sold nor transferred. It is intended as a token to indicate OG status in MV3. A snapshot was taken right before the MV3 character reveal to determine what wallets were airdropped an SBT.",
                "image": "ipfs://QmQVGjiYenu7ArLhBRiHe5TdrYHkxMDv6GJjb6BjqQz1Zd",
                "name": "Access Pass SBT"
            },
            "metadata_url": "ipfs://QmbEgx6nP8LbyJvWejE1tqDVPmEENh83MbKt8juuutHcLv",
            "fileUrlIpfs": "QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR",
            "metadataUrlIpfs": "QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR"
        });
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