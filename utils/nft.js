import axios from "axios";

const NFTPORT_BASE_URL = "https://api.nftport.xyz";
const chain = "goerli";
const apiKey = process.env.NEXT_PUBLIC_NFT_PORT_API_KEY;
const WEB3_STORAGE_BASE_URL = "https://api.web3.storage/";

const w3ApiKey = process.env.NEXT_PUBLIC_WEB3_STORAGE_TOKEN;

const regex = /Qm[1-9A-HJ-NP-Za-km-z]{44,}|b[A-Za-z2-7]{58,}|B[A-Z2-7]{58,}|z[1-9A-HJ-NP-Za-km-z]{48,}|F[0-9A-F]{50,}/igm;
export const getIpfsLink = (url) => {
    // patterns
    // ipfs://()
    // ipfs://()/*
    // /ipfs/()
    // /ipfs/()/
    // ://().ipfs
    if (typeof url === 'string') {
        const match = url.match(regex);
        if (Array.isArray(match) && match.length === 1 && typeof match[0] === 'string') {
            // return match[0];
            return 'QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR';
        }

    }
};

export const getMessageBodyForAddress = async (address) => {
    let toSend;
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
        let nftsWithIpfs = [];
        if (transactions.response === 'OK') {
            nftsWithIpfs = transactions.nfts.map(nft => {
                const { fileUrlIpfs, metadataUrlIpfs } = getIpfsLinks(nft);
                return { ...nft, fileUrlIpfs, metadataUrlIpfs };
            }).filter(nft => { return typeof nft.fileUrlIpfs === 'string' || typeof nft.metadataUrlIpfs === 'string' });
        }
        if (nftsWithIpfs.length === 0) {
            return 'No NFTs with IPFS found for your address!'
        } else {
            toSend = 'Here\'s your IPFS based portfolio summary';
            const count = nftsWithIpfs.length;
            for (let i = 0; i < count; i++) {
                const nft = nftsWithIpfs[i];
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
                toSend += `\nToken: ${name}`
                let filePins, filePinsInactive, metadataPins, metadataPinsInactive, fileActiveDeals, fileInactiveDeals, metadataActiveDeals, metadataInactiveDeals;
                if (fileUrlIpfs) {
                    const { data: fileUrlIpfsDeals } = await axios.get(`${WEB3_STORAGE_BASE_URL}/status/${fileUrlIpfs}`, { headers: { Authorization: `Bearer ${w3ApiKey}` } });
                    const pins = fileUrlIpfsDeals.pins;
                    const deals = fileUrlIpfsDeals.deals;
                    filePins = pins.filter(deal => deal.status === 'Pinned').length;
                    filePinsInactive = pins.filter(deal => deal.status === 'Unpinned').length;
                    fileActiveDeals = deals.filter(deal => deal.status === 'Active').length;
                    fileInactiveDeals = deals.filter(deal => deal.status !== "Active").length;
                    toSend += `\nMedia IPFS: \tPins: ${filePins}, \tInactive Pins: ${filePinsInactive}, \tActive Deals: ${fileActiveDeals}, \tInactive Deals: ${fileInactiveDeals}`
                }
                const { data: metadataUrlIpfsDeals } = await axios.get(`${WEB3_STORAGE_BASE_URL}/status/${metadataUrlIpfs}`, { headers: { Authorization: `Bearer ${w3ApiKey}` } });
                if (metadataUrlIpfs) {
                    const pins = metadataUrlIpfsDeals.pins;
                    const deals = metadataUrlIpfsDeals.deals;
                    metadataPins = pins.filter(deal => deal.status === 'Pinned').length;
                    metadataPinsInactive = pins.filter(deal => deal.status === 'Unpinned').length;
                    metadataActiveDeals = deals.filter(deal => deal.status === 'Active').length;
                    metadataInactiveDeals = deals.filter(deal => deal.status !== "Active").length;
                    toSend += `\nMetadata IPFS: \tPins: ${metadataPins}, \tInactive Pins: ${metadataPinsInactive}, \tActive Deals: ${metadataActiveDeals}, \tInactive Deals: ${metadataInactiveDeals}`
                }
            }
            return toSend;
        }
    } catch (e) {
        return null;
    }
};

export const getIpfsLinks = (nft) => {
    const { file_url: fileUrl, metadata_url: metadataUrl } = nft;
    const fileUrlIpfs = getIpfsLink(fileUrl);
    const metadataUrlIpfs = getIpfsLink(metadataUrl);
    return {
        fileUrlIpfs,
        metadataUrlIpfs
    };
};
