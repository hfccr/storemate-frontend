
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

export const getIpfsLinks = (nft) => {
    const { file_url: fileUrl, metadata_url: metadataUrl } = nft;
    const fileUrlIpfs = getIpfsLink(fileUrl);
    const metadataUrlIpfs = getIpfsLink(metadataUrl);
    return {
        fileUrlIpfs,
        metadataUrlIpfs
    };
};
