import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import Blockies from 'react-blockies';
import { useDeals } from '../hooks/useDeals';
import PushPinIcon from '@mui/icons-material/PushPin';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { CircularProgress } from '@mui/material';
import { useCovalentTokenBalances } from '../hooks/useCovalent';

export default function Nft({ nft }) {
    const { description, name, token_id: tokenId, contract, metadata, fileUrlIpfs, metadataUrlIpfs, contract_address: contractAddress } = nft;
    let contractName, contractSymbol, image;
    if (typeof contract === 'object') {
        contractName = contract.name;
        contractSymbol = contract.symbol;
    }
    if (typeof metadata === 'object' && typeof metadata.image === 'string') {
        if (metadata.image.indexOf('ipfs') >= 0) {
            image = `https://ipfs.io/ipfs/${fileUrlIpfs}`;
        }
    }
    const { loading: fileLoading, success: fileSuccess, error: fileError, data: fileUrlIpfsDeals } = useDeals(fileUrlIpfs);
    const { loading: metadataLoading, success: metadataSuccess, error: metadataError, data: metadataUrlIpfsDeals } = useDeals(metadataUrlIpfs);
    const { loading: txLoading, success: txSuccess, error: txError, data: txData } = useCovalentTokenBalances(contractAddress, tokenId);
    let value;
    let receivedAt;
    if (txSuccess) {
        console.log(txData, 'txd');
        try {
            value = txData.data.items[0].nft_transactions[0].value;
        } catch (e) {
        }
    }
    let filePins, filePinsInactive, metadataPins, metadataPinsInactive, fileActiveDeals, fileInactiveDeals, metadataActiveDeals, metadataInactiveDeals;
    if (fileSuccess) {
        const pins = fileUrlIpfsDeals.pins;
        const deals = fileUrlIpfsDeals.deals;
        filePins = pins.filter(deal => deal.status === 'Pinned').length;
        filePinsInactive = pins.filter(deal => deal.status === 'Unpinned').length;
        fileActiveDeals = deals.filter(deal => deal.status === 'Active').length;
        fileInactiveDeals = deals.filter(deal => deal.status !== "Active").length;
    }
    if (metadataSuccess) {
        const pins = metadataUrlIpfsDeals.pins;
        const deals = metadataUrlIpfsDeals.deals;
        metadataPins = pins.filter(deal => deal.status === 'Pinned').length;
        metadataPinsInactive = pins.filter(deal => deal.status === 'Unpinned').length;
        metadataActiveDeals = deals.filter(deal => deal.status === 'Active').length;
        metadataInactiveDeals = deals.filter(deal => deal.status !== "Active").length;
    }
    return (
        <Card sx={{ minWidth: 275 }}>
            {!image && <CardMedia
                component="img"
                height="140"
                image={image}
                alt={name}
            />}
            {image && (<Box sx={{ justifyContent: 'center', alignItems: 'center', display: 'flex', height: 140, overflow: 'hidden' }}>
                <Blockies
                    seed={contractAddress}
                    size={140}
                    scale={3}
                    color="#dfe"
                    bgColor="#ffe"
                    spotColor="#abc"
                    className="identicon"
                />
            </Box>
            )
            }
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {typeof value !== 'undefined' && <>{`$${value}`}</>}
                </Typography>
                <Stack direction="row" alignItems="flex-end" sx={{ marginBottom: 2 }}>
                    <Typography variant="h5" component="div">
                        {name}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {tokenId}
                    </Typography>

                </Stack>
                {(fileLoading || metadataLoading) && <Box sx={{ textAlign: 'center' }}><CircularProgress /></Box>}
                {fileError && <div>File IPFS not available</div>}
                {metadataError && <div>Metadata IPFS not available</div>}
                {fileSuccess && (<Typography variant="body2">
                    <Stack direction="row" spacing={2} alignItems="center" justifyContent="center" sx={{ margin: 2 }}>
                        <Typography sx={{ flexGrow: 1 }}>File</Typography>
                        <Chip icon={<PushPinIcon />} label={`${filePins}/${filePins + filePinsInactive}`} size="small" />
                        <Chip icon={<AssignmentIcon />} label={`${fileActiveDeals}/${fileActiveDeals + fileInactiveDeals}`} size="small" />
                    </Stack>
                </Typography>)}
                {metadataSuccess && <Typography variant="body2">
                    <Stack direction="row" spacing={2} alignItems="center" justifyContent="center" sx={{ margin: 2 }}>
                        <Typography sx={{ flexGrow: 1 }}>Metadata</Typography>
                        <Chip icon={<PushPinIcon />} label={`${metadataPins}/${metadataPins + metadataPinsInactive}`} size="small" />
                        <Chip icon={<AssignmentIcon />} label={`${metadataActiveDeals}/${metadataActiveDeals + metadataInactiveDeals}`} size="small" />
                    </Stack>
                </Typography>}

            </CardContent>
            <CardActions>
                <Button size="small">Create Bounty</Button>
            </CardActions>
        </Card>
    );
}