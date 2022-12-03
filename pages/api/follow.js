import * as PushAPI from '@pushprotocol/restapi';
import * as ethers from 'ethers';
import { arrayify } from 'ethers/lib/utils.js';

const PK = process.env.PUSH_CHANNEL_OWNER_PK;
const Pkey = `0x${PK}`;
const signer = new ethers.Wallet(Pkey);
const addresses = [];

const sendNotification = async (address) => {
    try {
        const apiResponse = await PushAPI.payloads.sendNotification({
            signer,
            type: 3, // target
            identityType: 2, // direct payload
            notification: {
                title: `Storemate IPFS Stats`,
                body: `[sdk-test] notification BODY`
            },
            payload: {
                title: `Storemate IPFS Stats`,
                body: `sample msg body`,
                cta: 'https://storemate-frontend.vercel.app/',
                img: 'https://icons8.com/icon/N6r8hCwyLGfA/disk'
            },
            recipients: 'eip155:5:0x11Fd1972033B8F7b5d0e7a0d23E04A4fE0CEF17F', // recipient address
            channel: 'eip155:5:0xA5D41F48Ce0acD8dE2da87b83EcC5392D34C75bc', // your channel address
            env: 'staging'
        });
        console.log('API repsonse: ', apiResponse?.status);
    } catch (err) {
        console.error('Error: ', err);
    }
};

export default function handler(req, res) {
    const { query } = req;
    const { address } = query;
    if (req.method === 'GET') {
        res.status(200).json({ addresses });
    } else if (req.method === 'POST') {
        if (addresses.indexOf(address) < 0) {
            addresses.push(address);
        }
        // Send Push Notification
        sendNotification(address);
        res.status(200).json({ addresses });
    } else if (req.method === 'DELETE') {
        const index = addresses.indexOf(address);
        if (index >= 0) {
            addresses.splice(index, 1);
        }
        res.status(200).json({ addresses });
    }
}