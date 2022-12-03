import { Alert, Box, Button, Paper, Stack, Typography } from '@mui/material';
import { Container } from '@mui/system';
import React, { useEffect } from 'react';
import { useFollowStatus } from '../hooks/useFollowStatus';
import Loader from './Loader';
import { useState } from 'react';
import LaunchIcon from '@mui/icons-material/Launch';
import NotificationsIcon from '@mui/icons-material/Notifications';

const Follow = ({ address }) => {
    const [action, setAction] = useState('get');
    const { loading, error, success, data } = useFollowStatus(address, action, setAction);
    let hasFollow = false;
    if (success) {
        const { addresses } = data;
        hasFollow = addresses.indexOf(address) >= 0;
    }
    const join = () => {
        // Call API to add to addresses
        setAction('post');
    };
    const remove = () => {
        // Call API to remove from addresses
        setAction('delete');
    };
    return (
        <Container sx={{ margin: 4 }}>
            {loading && <Loader />}
            {error && <Alert severity='error'>Failed To Get Follow Status</Alert>}
            {success && !hasFollow && (
                <Box>
                    <Typography variant="h4" gutterBottom sx={{ marginBottom: 8, marginTop: 4 }}>
                        Subscribe To Get Real Time Push Updates
                    </Typography>
                    <Container maxWidth="md">
                        <Stack direction="column" justifyContent="center" alignItems="center" spacing={4}>
                            <Paper sx={{ margin: 4, textAlign: 'center', width: 'md', padding: 4 }}>
                                <Typography sx={{ textAlign: 'center', margin: 2 }}>Before you can start receiving PUSH notifications in your inbox, you need to subscribe to Storemates channel on PUSH dApp</Typography>
                                <Button variant="contained" color="secondary" onClick={join} startIcon={<NotificationsIcon />} endIcon={<LaunchIcon />}>
                                    Visit PUSH
                                </Button>
                            </Paper>
                            <Paper sx={{ margin: 4, textAlign: 'center', width: 'md', padding: 4 }}>
                                <Typography sx={{ textAlign: 'center', margin: 2 }}>Once you subscribe to Storemate notifications, we will notify you whenever any of your IPFS based assets are in risk of going offline.</Typography>
                                <Button variant="contained" color="success" onClick={join}>
                                    Receive Notifications
                                </Button>
                            </Paper>
                        </Stack>

                    </Container>
                </Box>
            )}
            {success && hasFollow && (
                <Box>
                    <Typography variant="h4" gutterBottom sx={{ marginBottom: 8, marginTop: 4 }}>
                        You Are Subscribed To Get Real Time Push Updates!
                    </Typography>
                    <Stack direction="row" justifyContent="center" alignItems="center">
                        <Paper sx={{ margin: 4, textAlign: 'center', width: 'md', padding: 4 }}>
                            <Typography sx={{ textAlign: 'center', margin: 2 }}>If you unsubscribe, we will stop sending you notifications. Your IPFS assets will be at a higher risk.</Typography>
                            <Button variant="contained" color="error" onClick={remove}>
                                Unsubscribe
                            </Button>
                        </Paper>
                    </Stack>
                </Box>
            )}
        </Container>
    );
}
export default Follow;