import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, TextField, Button, List, ListItem, ListItemText, Typography, Paper, Grid } from '@mui/material';

const RoleManagement = () => {
    const [roles, setRoles] = useState([]);
    const [roleName, setRoleName] = useState('');
    const [updateRoleId, setUpdateRoleId] = useState(null);
    const [updateRoleName, setUpdateRoleName] = useState('');

    const API_URL = 'http://localhost:5198/api/Role';

    useEffect(() => {
        fetchRoles();
    }, []);

    const fetchRoles = async () => {
        try {
            const response = await axios.get(`${API_URL}/GetRoles`);
            setRoles(response.data);
        } catch (error) {
            console.error('Ошибка получения ролей:', error);
        }
    };

    const addRole = async () => {
        try {
            const response = await axios.post(`${API_URL}/AddRole`, null, {
                params: { name: roleName }
            });
            alert(response.data);
            fetchRoles();
            setRoleName('');
        } catch (error) {
            console.error('Ошибка добавления роли:', error);
        }
    };

    const updateRole = async () => {
        try {
            const response = await axios.put(`${API_URL}/UpdateRole`, null, {
                params: { roleId: updateRoleId, name: updateRoleName }
            });
            alert(response.data);
            fetchRoles();
            setUpdateRoleId(null);
            setUpdateRoleName('');
        } catch (error) {
            console.error('Ошибка обновления роли:', error);
        }
    };

    const deleteRole = async (id) => {
        try {
            const response = await axios.delete(`${API_URL}/DeleteRole`, {
                params: { id }
            });
            alert(response.data);
            fetchRoles();
        } catch (error) {
            console.error('Ошибка удаления роли:', error);
        }
    };

    return (
        <Container>
            <Typography variant="h3" gutterBottom>
                <center>Управление ролями</center>
            </Typography>
            <Paper elevation={3} style={{ padding: '16px', marginBottom: '16px' }}>
                <Typography variant="h5">Добавление роли</Typography>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={8}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Имя роли"
                            value={roleName}
                            onChange={(e) => setRoleName(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <Button variant="contained" color="primary" onClick={addRole} fullWidth>
                            Добавить роль
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
            <Paper elevation={3} style={{ padding: '16px', marginBottom: '16px' }}>
                <Typography variant="h5">Обновить роль</Typography>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={4}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="ID роли"
                            type="number"
                            value={updateRoleId}
                            onChange={(e) => setUpdateRoleId(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Имя роли"
                            value={updateRoleName}
                            onChange={(e) => setUpdateRoleName(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <Button variant="contained" color="secondary" onClick={updateRole} fullWidth>
                            Обновить роль
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
            <Paper elevation={3} style={{ padding: '16px', marginBottom: '16px' }}>
                <Typography variant="h5">Список ролей</Typography>
                <List>
                    {roles.map((role) => (
                        <ListItem key={role.id} button>
                            <ListItemText primary={`ID: ${role.id}  Название: ${role.name}`} />
                            <Button variant="outlined" color="error" onClick={() => deleteRole(role.id)}>
                                Удалить
                            </Button>
                        </ListItem>
                    ))}
                </List>
            </Paper>
        </Container>
    );
};

export default RoleManagement;
