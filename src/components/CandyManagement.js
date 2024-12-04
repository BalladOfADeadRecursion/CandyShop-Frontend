import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, TextField, Button, List, ListItem, ListItemText, Typography, Paper, Grid } from '@mui/material';

const CandyManagement = () => {
    const [candies, setCandies] = useState([]);
    const [candyDetails, setCandyDetails] = useState({
        name: '',
        price: 0,
        size: 0,
        quantity: 0,
        categoryId: 0,
    });
    const [updateCandyId, setUpdateCandyId] = useState(null);
    const [updateCandyDetails, setUpdateCandyDetails] = useState({
        name: '',
        price: 0,
        size: 0,
        quantity: 0,
        categoryId: 0,
    });

    const API_URL = 'http://localhost:5198/api/Candy';

    useEffect(() => {
        fetchCandies();
    }, []);

    const fetchCandies = async () => {
        try {
            const response = await axios.get(`${API_URL}/GetCandys`);
            setCandies(response.data);
        } catch (error) {
            console.error('Ошибка получения конфет:', error);
        }
    };

    const addCandy = async () => {
        try {
            const response = await axios.post(`${API_URL}/AddCandy`, null, {
                params: candyDetails
            });
            alert(response.data);
            fetchCandies();
            setCandyDetails({
                name: '',
                price: 0,
                size: 0,
                quantity: 0,
                categoryId: 0,
            });
        } catch (error) {
            console.error('Ошибка добавления конфеты:', error);
        }
    };

    const updateCandy = async () => {
        try {
            const response = await axios.put(`${API_URL}/UpdateCandy`, null, {
                params: { candyId: updateCandyId, ...updateCandyDetails }
            });
            alert(response.data);
            fetchCandies();
            setUpdateCandyId(null);
            setUpdateCandyDetails({
                name: '',
                price: 0,
                size: 0,
                quantity: 0,
                categoryId: 0,
            });
        } catch (error) {
            console.error('Ошибка обновления конфеты:', error);
        }
    };

    const deleteCandy = async (id) => {
        try {
            const response = await axios.delete(`${API_URL}/DeleteCandy`, {
                params: { id }
            });
            alert(response.data);
            fetchCandies();
        } catch (error) {
            console.error('Ошибка удаления конфеты:', error);
        }
    };

    return (
        <Container>
            <Typography variant="h3" gutterBottom>
                <center>Управление конфетами</center>
            </Typography>
            <Paper elevation={3} style={{ padding: '16px', marginBottom: '16px' }}>
                <Typography variant="h5">Добавление конфеты</Typography>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={4}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Имя"
                            value={candyDetails.name}
                            onChange={(e) => setCandyDetails({ ...candyDetails, name: e.target.value })}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Цена"
                            type="number"
                            value={candyDetails.price}
                            onChange={(e) => setCandyDetails({ ...candyDetails, price: e.target.value })}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Размер"
                            type="number"
                            value={candyDetails.size}
                            onChange={(e) => setCandyDetails({ ...candyDetails, size: e.target.value })}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Количество"
                            type="number"
                            value={candyDetails.quantity}
                            onChange={(e) => setCandyDetails({ ...candyDetails, quantity: e.target.value })}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="ID категории"
                            type="number"
                            value={candyDetails.categoryId}
                            onChange={(e) => setCandyDetails({ ...candyDetails, categoryId: e.target.value })}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <Button variant="contained" color="primary" onClick={addCandy} fullWidth>
                            Добавить конфету
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
            <Paper elevation={3} style={{ padding: '16px', marginBottom: '16px' }}>
                <Typography variant="h5">Обновить конфету</Typography>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={4}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="CandyId"
                            type="number"
                            value={updateCandyId}
                            onChange={(e) => setUpdateCandyId(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Имя"
                            value={updateCandyDetails.name}
                            onChange={(e) => setUpdateCandyDetails({ ...updateCandyDetails, name: e.target.value })}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Цена"
                            type="number"
                            value={updateCandyDetails.price}
                            onChange={(e) => setUpdateCandyDetails({ ...updateCandyDetails, price: e.target.value })}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Размер"
                            type="number"
                            value={updateCandyDetails.size}
                            onChange={(e) => setUpdateCandyDetails({ ...updateCandyDetails, size: e.target.value })}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Количество"
                            type="number"
                            value={updateCandyDetails.quantity}
                            onChange={(e) => setUpdateCandyDetails({ ...updateCandyDetails, quantity: e.target.value })}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="ID категории"
                            type="number"
                            value={updateCandyDetails.categoryId}
                            onChange={(e) => setUpdateCandyDetails({ ...updateCandyDetails, categoryId: e.target.value })}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <Button variant="contained" color="secondary" onClick={updateCandy} fullWidth>
                            Обновить конфету
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
            <Paper elevation={3} style={{ padding: '16px', marginBottom: '16px' }}>
                <Typography variant="h5">Список конфет</Typography>
                <List>
                    {candies.map((candy) => (
                        <ListItem key={candy.id} button>
                            <ListItemText
                                primary={`ID: ${candy.id}`}
                                secondary={
                                    <>
                                        <Typography component="span">Имя: {candy.name}</Typography>
                                        <Typography component="span"> Цена: {candy.price}</Typography>
                                        <Typography component="span"> Размер: {candy.size}</Typography>
                                        <Typography component="span"> Количество: {candy.quantity}</Typography>
                                        <Typography component="span"> Id категории: {candy.categoryId}</Typography>
                                    </>
                                }
                            />
                            <Button variant="outlined" color="error" onClick={() => deleteCandy(candy.id)}>
                                Удалить
                            </Button>
                        </ListItem>
                    ))}
                </List>
            </Paper>
        </Container>
    );
};

export default CandyManagement;

