import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, TextField, Button, List, ListItem, ListItemText, Typography, Paper, Grid } from '@mui/material';

const CategoryManagement = () => {
    const [categories, setCategories] = useState([]);
    const [categoryName, setCategoryName] = useState('');
    const [updateCategoryId, setUpdateCategoryId] = useState(null);
    const [updateCategoryName, setUpdateCategoryName] = useState('');

    const API_URL = 'http://localhost:5198/api/Category';

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await axios.get(`${API_URL}/GetCategories`);
            setCategories(response.data);
        } catch (error) {
            console.error('Ошибка получения категорий:', error);
        }
    };

    const addCategory = async () => {
        try {
            const response = await axios.post(`${API_URL}/AddCategory`, null, {
                params: { name: categoryName }
            });
            alert(response.data);
            fetchCategories();
            setCategoryName('');
        } catch (error) {
            console.error('Ошибка добавления категории:', error);
        }
    };

    const updateCategory = async () => {
        try {
            const response = await axios.put(`${API_URL}/UpdateCategory`, null, {
                params: { categoryId: updateCategoryId, name: updateCategoryName }
            });
            alert(response.data);
            fetchCategories();
            setUpdateCategoryId(null);
            setUpdateCategoryName('');
        } catch (error) {
            console.error('Ошибка обновления категории:', error);
        }
    };

    const deleteCategory = async (id) => {
        try {
            const response = await axios.delete(`${API_URL}/DeleteCategory`, {
                params: { id }
            });
            alert(response.data);
            fetchCategories();
        } catch (error) {
            console.error('Ошибка удаления категории:', error);
        }
    };

    return (
        <Container>
            <Typography variant="h3" gutterBottom>
                <center>Управление категориями</center>
            </Typography>

            {/* Add Category */}
            <Paper elevation={3} style={{ padding: '16px', marginBottom: '16px' }}>
                <Typography variant="h5">Добавление категории</Typography>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={8}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Имя категории"
                            value={categoryName}
                            onChange={(e) => setCategoryName(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <Button variant="contained" color="primary" onClick={addCategory} fullWidth>
                            Добавить категорию
                        </Button>
                    </Grid>
                </Grid>
            </Paper>

            {/* Update Category */}
            <Paper elevation={3} style={{ padding: '16px', marginBottom: '16px' }}>
                <Typography variant="h5">Обновить категорию</Typography>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={4}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="CategoryId"
                            type="number"
                            value={updateCategoryId}
                            onChange={(e) => setUpdateCategoryId(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Имя категории"
                            value={updateCategoryName}
                            onChange={(e) => setUpdateCategoryName(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <Button variant="contained" color="secondary" onClick={updateCategory} fullWidth>
                            Обновить категорию
                        </Button>
                    </Grid>
                </Grid>
            </Paper>

            {/* List of Categories */}
            <Paper elevation={3} style={{ padding: '16px', marginBottom: '16px' }}>
                <Typography variant="h5">Список категорий</Typography>
                <List>
                    {categories.map((category) => (
                        <ListItem key={category.id} button>
                            <ListItemText primary={`ID: ${category.id}  Name: ${category.name}`} />
                            <Button variant="outlined" color="error" onClick={() => deleteCategory(category.id)}>
                                Удалить
                            </Button>
                        </ListItem>
                    ))}
                </List>
            </Paper>
        </Container>
    );
};

export default CategoryManagement;
