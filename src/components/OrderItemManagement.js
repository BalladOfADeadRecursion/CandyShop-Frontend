import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, TextField, Button, List, ListItem, ListItemText, Typography, Paper, Grid, FormControlLabel, Checkbox } from '@mui/material';

const OrderItemManagement = () => {
    const [orderItems, setOrderItems] = useState([]);
    const [orderId, setOrderId] = useState('');
    const [candyId, setCandyId] = useState(''); // Updated from shoeId to candyId
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState(''); // Added price field
    const [isPickedUp, setIsPickedUp] = useState(false);
    const [updateOrderItemId, setUpdateOrderItemId] = useState(null);
    const [updateOrderId, setUpdateOrderId] = useState('');
    const [updateCandyId, setUpdateCandyId] = useState(''); // Updated from shoeId to candyId
    const [updateQuantity, setUpdateQuantity] = useState('');
    const [updatePrice, setUpdatePrice] = useState(''); // Added price field
    const [updateIsPickedUp, setUpdateIsPickedUp] = useState(false);

    const API_URL = 'http://localhost:5198/api/OrderItem';

    useEffect(() => {
        fetchOrderItems();
    }, []);

    const fetchOrderItems = async () => {
        try {
            const response = await axios.get(`${API_URL}/GetOrderItems`);
            setOrderItems(response.data);
        } catch (error) {
            console.error('Ошибка получения заказовых позиций:', error);
        }
    };

    const addOrderItem = async () => {
        try {
            const response = await axios.post(`${API_URL}/AddOrderItem`, null, {
                params: { orderId, candyId, quantity, price, isPickedUp }
            });
            alert(response.data);
            fetchOrderItems();
            setOrderId('');
            setCandyId('');
            setQuantity('');
            setPrice('');
            setIsPickedUp(false);
        } catch (error) {
            console.error('Ошибка добавления заказовой позиции:', error);
        }
    };

    const updateOrderItem = async () => {
        try {
            const response = await axios.put(`${API_URL}/UpdateOrderItem`, null, {
                params: { orderItemId: updateOrderItemId, orderId: updateOrderId, candyId: updateCandyId, quantity: updateQuantity, price: updatePrice, isPickedUp: updateIsPickedUp }
            });
            alert(response.data);
            fetchOrderItems();
            setUpdateOrderItemId(null);
            setUpdateOrderId('');
            setUpdateCandyId('');
            setUpdateQuantity('');
            setUpdatePrice('');
            setUpdateIsPickedUp(false);
        } catch (error) {
            console.error('Ошибка обновления заказовой позиции:', error);
        }
    };

    const deleteOrderItem = async (id) => {
        try {
            const response = await axios.delete(`${API_URL}/DeleteOrderItem`, {
                params: { id }
            });
            alert(response.data);
            fetchOrderItems();
        } catch (error) {
            console.error('Ошибка удаления заказовой позиции:', error);
        }
    };

    return (
        <Container>
            <Typography variant="h3" gutterBottom>
                <center>Управление заказовыми позициями</center>
            </Typography>
            <Paper elevation={3} style={{ padding: '16px', marginBottom: '16px' }}>
                <Typography variant="h5">Добавление заказовой позиции</Typography>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={3}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="ID заказа"
                            type="number"
                            value={orderId}
                            onChange={(e) => setOrderId(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="ID конфеты" // Updated label
                            type="number"
                            value={candyId} // Updated from shoeId to candyId
                            onChange={(e) => setCandyId(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Количество"
                            type="number"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Цена" // Added price field
                            type="number"
                            value={price} // Price field
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <FormControlLabel
                            control={<Checkbox checked={isPickedUp} onChange={(e) => setIsPickedUp(e.target.checked)} />}
                            label="Выдано"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" color="primary" onClick={addOrderItem} fullWidth>
                            Добавить заказовую позицию
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
            <Paper elevation={3} style={{ padding: '16px', marginBottom: '16px' }}>
                <Typography variant="h5">Обновление заказовой позиции</Typography>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={3}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="ID заказовой позиции"
                            type="number"
                            value={updateOrderItemId}
                            onChange={(e) => setUpdateOrderItemId(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="ID заказа"
                            type="number"
                            value={updateOrderId}
                            onChange={(e) => setUpdateOrderId(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="ID конфеты" // Updated label
                            type="number"
                            value={updateCandyId} // Updated from shoeId to candyId
                            onChange={(e) => setUpdateCandyId(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Количество"
                            type="number"
                            value={updateQuantity}
                            onChange={(e) => setUpdateQuantity(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Цена" // Added price field
                            type="number"
                            value={updatePrice} // Price field
                            onChange={(e) => setUpdatePrice(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <FormControlLabel
                            control={<Checkbox checked={updateIsPickedUp} onChange={(e) => setUpdateIsPickedUp(e.target.checked)} />}
                            label="Выдано"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" color="secondary" onClick={updateOrderItem} fullWidth>
                            Обновить заказовую позицию
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
            <Paper elevation={3} style={{ padding: '16px', marginBottom: '16px' }}>
                <Typography variant="h5">Список заказовых позиций</Typography>
                <List>
                    {orderItems.map((orderItem) => (
                        <ListItem key={orderItem.id} button>
                            <ListItemText primary={`ID: ${orderItem.id}  ID заказа: ${orderItem.orderId}  ID конфеты: ${orderItem.candyId}  Количество: ${orderItem.quantity}  Цена: ${orderItem.price}  Выдано: ${orderItem.isPickedUp ? 'Да' : 'Нет'}`} />
                            <Button variant="outlined" color="error" onClick={() => deleteOrderItem(orderItem.id)}>
                                Удалить
                            </Button>
                        </ListItem>
                    ))}
                </List>
            </Paper>
        </Container>
    );
};

export default OrderItemManagement;
