import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, TextField, Button, List, ListItem, ListItemText, Typography, Paper, Grid } from '@mui/material';

const CartManagement = () => {
    const [carts, setCarts] = useState([]);
    const [clientId, setClientId] = useState('');
    const [updateCartId, setUpdateCartId] = useState(null);
    const [updateClientId, setUpdateClientId] = useState('');

    const API_URL = 'http://localhost:5198/api/Cart';

    useEffect(() => {
        fetchCarts();
    }, []);

    const fetchCarts = async () => {
        try {
            const response = await axios.get(`${API_URL}/GetCarts`);
            setCarts(response.data);
        } catch (error) {
            console.error('Ошибка получения корзины:', error);
        }
    };

    const addCart = async () => {
        try {
            const response = await axios.post(`${API_URL}/AddCart`, null, {
                params: { clientId: clientId }
            });
            alert(response.data);
            fetchCarts();
            setClientId('');
        } catch (error) {
            console.error('Ошибка добавления корзины:', error);
        }
    };

    const updateCart = async () => {
        try {
            const response = await axios.put(`${API_URL}/UpdateCart`, null, {
                params: { cartId: updateCartId, clientId: updateClientId }
            });
            alert(response.data);
            fetchCarts();
            setUpdateCartId(null);
            setUpdateClientId('');
        } catch (error) {
            console.error('Ошибка обновления корзины:', error);
        }
    };

    const deleteCart = async (id) => {
        try {
            const response = await axios.delete(`${API_URL}/DeleteCart`, {
                params: { id }
            });
            alert(response.data);
            fetchCarts();
        } catch (error) {
            console.error('Ошибка удаления корзины:', error);
        }
    };

    return (
        <Container>
            <Typography variant="h3" gutterBottom>
                <center>Управление корзинами</center>
            </Typography>

            {/* Add Cart */}
            <Paper elevation={3} style={{ padding: '16px', marginBottom: '16px' }}>
                <Typography variant="h5">Добавление корзины</Typography>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={8}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="ID клиента"
                            value={clientId}
                            onChange={(e) => setClientId(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <Button variant="contained" color="primary" onClick={addCart} fullWidth>
                            Добавить корзину
                        </Button>
                    </Grid>
                </Grid>
            </Paper>

            {/* Update Cart */}
            <Paper elevation={3} style={{ padding: '16px', marginBottom: '16px' }}>
                <Typography variant="h5">Обновить корзину</Typography>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={4}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="ID корзины"
                            type="number"
                            value={updateCartId}
                            onChange={(e) => setUpdateCartId(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="ID клиента"
                            value={updateClientId}
                            onChange={(e) => setUpdateClientId(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <Button variant="contained" color="secondary" onClick={updateCart} fullWidth>
                            Обновить корзину
                        </Button>
                    </Grid>
                </Grid>
            </Paper>

            {/* List of Carts */}
            <Paper elevation={3} style={{ padding: '16px', marginBottom: '16px' }}>
                <Typography variant="h5">Список корзин</Typography>
                <List>
                    {carts.map((cart) => (
                        <ListItem key={cart.id} button>
                            <ListItemText primary={`ID: ${cart.id}  Client ID: ${cart.clientId}`} />
                            <Button variant="outlined" color="error" onClick={() => deleteCart(cart.id)}>
                                Удалить
                            </Button>
                        </ListItem>
                    ))}
                </List>
            </Paper>
        </Container>
    );
};

export default CartManagement;
