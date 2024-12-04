import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, TextField, Button, List, ListItem, ListItemText, Typography, Paper, Grid } from '@mui/material';

const OrderManagement = () => {
    const [orders, setOrders] = useState([]);
    const [clientId, setClientId] = useState('');
    const [orderDate, setOrderDate] = useState('');
    const [pickupPointId, setPickupPointId] = useState('');
    const [updateOrderId, setUpdateOrderId] = useState(null);
    const [updateClientId, setUpdateClientId] = useState('');
    const [updateOrderDate, setUpdateOrderDate] = useState('');
    const [updatePickupPointId, setUpdatePickupPointId] = useState('');

    const API_URL = 'http://localhost:5198/api/Order';

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await axios.get(`${API_URL}/GetOrders`);
            setOrders(response.data);
        } catch (error) {
            console.error('Ошибка получения заказов:', error);
        }
    };

    const addOrder = async () => {
        try {
            const response = await axios.post(`${API_URL}/AddOrder`, null, {
                params: { clientId: clientId, orderDate: orderDate, pickupPointId: pickupPointId }
            });
            alert(response.data);
            fetchOrders();
            setClientId('');
            setOrderDate('');
            setPickupPointId('');
        } catch (error) {
            console.error('Ошибка добавления заказа:', error);
        }
    };

    const updateOrder = async () => {
        try {
            const response = await axios.put(`${API_URL}/UpdateOrder`, null, {
                params: { orderId: updateOrderId, clientId: updateClientId, orderDate: updateOrderDate, pickupPointId: updatePickupPointId }
            });
            alert(response.data);
            fetchOrders();
            setUpdateOrderId(null);
            setUpdateClientId('');
            setUpdateOrderDate('');
            setUpdatePickupPointId('');
        } catch (error) {
            console.error('Ошибка обновления заказа:', error);
        }
    };

    const deleteOrder = async (id) => {
        try {
            const response = await axios.delete(`${API_URL}/DeleteOrder`, {
                params: { id }
            });
            alert(response.data);
            fetchOrders();
        } catch (error) {
            console.error('Ошибка удаления заказа:', error);
        }
    };

    return (
        <Container>
            <Typography variant="h3" gutterBottom>
                <center>Управление заказами</center>
            </Typography>
            <Paper elevation={3} style={{ padding: '16px', marginBottom: '16px' }}>
                <Typography variant="h5">Добавление заказа</Typography>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={4}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="ID клиента"
                            value={clientId}
                            onChange={(e) => setClientId(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Дата заказа (гггг-мм-дд)"
                            value={orderDate}
                            onChange={(e) => setOrderDate(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="ID пункта выдачи"
                            value={pickupPointId}
                            onChange={(e) => setPickupPointId(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" color="primary" onClick={addOrder} fullWidth>
                            Добавить заказ
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
            <Paper elevation={3} style={{ padding: '16px', marginBottom: '16px' }}>
                <Typography variant="h5">Обновление заказа</Typography>
                <Grid container spacing={2} alignItems="center">
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
                            label="ID клиента"
                            value={updateClientId}
                            onChange={(e) => setUpdateClientId(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Дата заказа (гггг-мм-дд)"
                            value={updateOrderDate}
                            onChange={(e) => setUpdateOrderDate(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="ID пункта выдачи"
                            value={updatePickupPointId}
                            onChange={(e) => setUpdatePickupPointId(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" color="secondary" onClick={updateOrder} fullWidth>
                            Обновить заказ
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
            <Paper elevation={3} style={{ padding: '16px', marginBottom: '16px' }}>
                <Typography variant="h5">Список заказов</Typography>
                <List>
                    {orders.map((order) => (
                        <ListItem key={order.id} button>
                            <ListItemText primary={`ID: ${order.id}  Клиент ID: ${order.clientId}  Дата заказа: ${order.orderDate}  Пункт выдачи ID: ${order.pickupPointId}`} />
                            <Button variant="outlined" color="error" onClick={() => deleteOrder(order.id)}>
                                Удалить
                            </Button>
                        </ListItem>
                    ))}
                </List>
            </Paper>
        </Container>
    );
};

export default OrderManagement;
