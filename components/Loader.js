import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';

export default function Loader() {
    return (
        <Container sx={{ display: 'flex', marginTop: 4, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
            <CircularProgress color="secondary" />
        </Container>
    );
}