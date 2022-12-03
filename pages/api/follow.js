import * as PushAPI from '@pushprotocol/restapi';
import * as ethers from 'ethers';

const PK = process.env.PUSH_CHANNEL_OWNER_PK;
const Pkey = `0x${PK}`;
const signer = new ethers.Wallet(Pkey);

const sendNotification = async () => {
    try {
        const apiResponse = await PushAPI.payloads.sendNotification({
            signer,
            type: 3,
            identityType: 2,
            notification: {
                title: 'Storemates Notice',
                body: 'Storemates has detected new ',
            },
            payload: {
                title: '',
                body: '',
                cta: '',
                img: ''
            },
            recepients: '',
            channel: 'eip155:5:staging.push.org/#/channels?channel=0xA5D41F48Ce0acD8dE2da87b83EcC5392D34C75bc',
            env: 'staging'
        });
    } catch (e) { }
};
const addresses = [];

export default function handler(req, res) {
    const { query } = req;
    const { address } = query;
    if (req.method === 'GET') {
        return { address };
    } else if (req.method === 'POST') {
        if (addresses.indexOf(address) < 0) {
            addresses.push(address);
        }
        // Send Push Notification
        console.log('Push ');
        return { addresses };
    } else if (req.method === 'DELETE') {
        addresses = addresses.filter(address => currentAddress !== address);
        return { addresses };
    }
}