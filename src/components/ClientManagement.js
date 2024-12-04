import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, TextField, Button, List, ListItem, ListItemText, Typography, Paper, Grid } from '@mui/material';

const ClientManagement = () => {
    const [clients, setClients] = useState([]);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [roleId, setRoleId] = useState('');
    const [updateId, setUpdateId] = useState('');
    const [updateFirstName, setUpdateFirstName] = useState('');
    const [updateLastName, setUpdateLastName] = useState('');
    const [updateUsername, setUpdateUsername] = useState('');
    const [updatePassword, setUpdatePassword] = useState('');
    const [updateEmail, setUpdateEmail] = useState('');
    const [updatePhone, setUpdatePhone] = useState('');
    const [updateRoleId, setUpdateRoleId] = useState('');

    const API_URL = 'http://localhost:5198/api/Client';

    useEffect(() => {
        fetchClients();
    }, []);

    const fetchClients = async () => {
        try {
            const response = await axios.get(`${API_URL}/GetClients`);
            setClients(response.data);
        } catch (error) {
            console.error('Ошибка получения клиентов:', error);
        }
    };

    const addClient = async () => {
        try {
            const response = await axios.post(`${API_URL}/AddClient`, null, {
                params: { firstName, lastName, username, password, email, phone, roleId }
            });
            alert(response.data);
            fetchClients();
            setFirstName('');
            setLastName('');
            setUsername('');
            setPassword('');
            setEmail('');
            setPhone('');
            setRoleId('');
        } catch (error) {
            console.error('Ошибка добавления клиента:', error);
        }
    };

    const updateClient = async () => {
        try {
            const response = await axios.put(`${API_URL}/UpdateClient`, null, {
                params: { clientId: updateId, firstName: updateFirstName, lastName: updateLastName, username: updateUsername, password: updatePassword, email: updateEmail, phone: updatePhone, roleId: updateRoleId }
            });
            alert(response.data);
            fetchClients();
            setUpdateId('');
            setUpdateFirstName('');
            setUpdateLastName('');
            setUpdateUsername('');
            setUpdatePassword('');
            setUpdateEmail('');
            setUpdatePhone('');
            setUpdateRoleId('');
        } catch (error) {
            console.error('Ошибка обновления клиента:', error);
        }
    };

    const deleteClient = async (id) => {
        try {
            const response = await axios.delete(`${API_URL}/DeleteClient`, {
                params: { id }
            });
            alert(response.data);
            fetchClients();
        } catch (error) {
            console.error('Ошибка удаления клиента:', error);
        }
    };

    return (
        <Container>
            <Typography variant="h3" gutterBottom>
                <center>Управление клиентами</center>
            </Typography>
            {/* Add Client */}
            <Paper elevation={3} style={{ padding: '16px', marginBottom: '16px' }}>
                <Typography variant="h5">Добавление клиента</Typography>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={3}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Имя"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Фамилия"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Имя пользователя"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Пароль"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Телефон"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="RoleId"
                            value={roleId}
                            onChange={(e) => setRoleId(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" color="primary" onClick={addClient} fullWidth>
                            Добавить клиента
                        </Button>
                    </Grid>
                </Grid>
            </Paper>

            {/* Update Client */}
            <Paper elevation={3} style={{ padding: '16px', marginBottom: '16px' }}>
                <Typography variant="h5">Обновление клиента</Typography>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={1}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="ID"
                            value={updateId}
                            onChange={(e) => setUpdateId(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Имя"
                            value={updateFirstName}
                            onChange={(e) => setUpdateFirstName(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Фамилия"
                            value={updateLastName}
                            onChange={(e) => setUpdateLastName(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Имя пользователя"
                            value={updateUsername}
                            onChange={(e) => setUpdateUsername(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Пароль"
                            value={updatePassword}
                            onChange={(e) => setUpdatePassword(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Email"
                            value={updateEmail}
                            onChange={(e) => setUpdateEmail(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Телефон"
                            value={updatePhone}
                            onChange={(e) => setUpdatePhone(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="RoleId"
                            value={updateRoleId}
                            onChange={(e) => setUpdateRoleId(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" color="secondary" onClick={updateClient} fullWidth>
                            Обновить клиента
                        </Button>
                    </Grid>
                </Grid>
            </Paper>

            {/* List of Clients */}
            <Paper elevation={3} style={{ padding: '16px', marginBottom: '16px' }}>
                <Typography variant="h5">Список клиентов</Typography>
                <List>
                    {clients.map((client) => (
                        <ListItem key={client.id} button>
                            <ListItemText primary={`ID: ${client.id}, Имя: ${client.firstName}, Фамилия: ${client.lastName}, Имя пользователя: ${client.username}, Email: ${client.email}, Телефон: ${client.phone}, RoleId: ${client.roleId}`} />
                            <Button variant="outlined" color="error" onClick={() => deleteClient(client.id)}>
                                Удалить
                            </Button>
                        </ListItem>
                    ))}
                </List>
            </Paper>
        </Container>
    );
};

export default ClientManagement;
