export const abi = [
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "cid",
                "type": "string"
            },
            {
                "internalType": "uint64",
                "name": "dealId",
                "type": "uint64"
            }
        ],
        "name": "claimBounty",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "cid",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "startAfter",
                "type": "uint256"
            }
        ],
        "name": "createBounty",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "addressOracle",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "marketAPI",
                "type": "address"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [],
        "name": "getClaimedBounties",
        "outputs": [
            {
                "internalType": "string[]",
                "name": "",
                "type": "string[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];

export const address = '0xC1F93b7Ddfa33352dA5e625AbAC53870141990D5';