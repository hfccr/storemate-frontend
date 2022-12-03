import Image from "next/image";
import { useAccount, useConnect, useEnsName, useDisconnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import toast from "react-hot-toast";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SvgIcon from '@mui/material/SvgIcon';
import Link from 'next/link'

const Navbar = () => {
    const { address, isConnected } = useAccount();

    // TODO: Wallaby does not support ENS. Need a separate Ethereu provider to useEnsName
    // const { data: ensName } = useEnsName({ address });
    const { disconnect } = useDisconnect({
        onSuccess() {
            toast("Account disconnected!", {
                style: {
                    border: "2px solid #000",
                },
            });
        },
        onError() {
            toast.error("Failed to disconnect account!", {
                style: {
                    border: "2px solid #000",
                },
            });
        },
    });
    const { connect } = useConnect({
        chainId: 31415,
        connector: new InjectedConnector(),
        onSuccess() {
            toast.success("Account connected!", {
                style: {
                    border: "2px solid #000",
                },
            });
        },
        onError() {
            toast.error("Error connecting account!", {
                style: {
                    border: "2px solid #000",
                },
            });
        },
    });


    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ backgroundColor: 'white', boxShadow: 'none' }}>
                <Toolbar>
                    <div className="navbar-start">
                        <Link passHref legacyBehavior href="/">
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                sx={{ mr: 2, height: 48, width: 48 }}
                            >
                                <Image src="/icon.png" alt="Storemate" layout="fill" />
                            </IconButton>
                        </Link>
                    </div>
                    <Box className="navbar-end" sx={{ marginLeft: 'auto' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginLeft: 'auto' }}>
                            <Link
                                href="/view"
                                passHref
                                legacyBehavior
                            >
                                <Typography
                                    id="view"
                                    className=""
                                    color="black"
                                    sx={{ mr: 3, color: 'black', cursor: 'pointer' }}
                                >

                                    View Assets
                                </Typography>
                            </Link>
                            <Link
                                href="/follow"
                                passHref
                                legacyBehavior
                            >
                                <Typography
                                    id="follow"
                                    className=""
                                    color="black"
                                    sx={{ mr: 3, color: 'black', cursor: 'pointer' }}
                                >
                                    Follow Changes
                                </Typography>
                            </Link>
                            <Link
                                href="/assign"
                                passHref
                                legacyBehavior
                            >
                                <Typography
                                    id="create"
                                    className=""
                                    color="black"
                                    sx={{ mr: 3, color: 'black', cursor: 'pointer' }}
                                >
                                    Assign
                                </Typography>
                            </Link>
                            <Link
                                href="/claim"
                                passHref
                                legacyBehavior
                            >
                                <Typography
                                    id="create"
                                    className=""
                                    color="black"
                                    sx={{ mr: 3, color: 'black', cursor: 'pointer' }}
                                >
                                    Claim
                                </Typography>
                            </Link>
                            <Button
                                onClick={() => {
                                    if (isConnected) {
                                        disconnect();
                                    } else {
                                        connect();
                                    }
                                }}
                                className="relative inline-block px-4 py-2 font-medium group "
                                variant="outlined"
                            >
                                <span className="absolute rounded-lg inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-[#bff22d] border-[2px] border-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
                                <span className="absolute rounded-lg inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-[#bff22d]"></span>
                                {address ? (
                                    <span className="relative text-black">
                                        {address.slice(0, 6) + "..." + address.slice(-4)}
                                    </span>
                                ) : (
                                    <span className="relative text-black">Connect Wallet</span>
                                )}
                            </Button>
                        </Box>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Navbar;
