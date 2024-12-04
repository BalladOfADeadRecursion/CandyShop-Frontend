import logo from './logo.svg';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container, CssBaseline } from '@mui/material';
import RoleManagement from './components/RoleManagement'; // Import RoleManagement
import CategoryManagement from './components/CategoryManagement'; // Import CategoryManagement
import ClientManagement from './components/ClientManagement'; // Import ClientManagement
import CandyManagement from './components/CandyManagement'; // Import CandyManagement
import CartManagement from './components/CartManagement'; // Import CartManagement
import CartItemManagement from './components/CartItemManagement'; // Import CartItemManagement
import OrderManagement from './components/OrderManagement'; // Import OrderManagement
import OrderItemManagement from './components/OrderItemManagement'; // Import OrderItemManagement
import './App.css';

function App() {
  return (
      <Router>
        <CssBaseline />
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" style={{ flexGrow: 0 }}>
            </Typography>
            <Button color="inherit" component={Link} to="/roles">Роли</Button>
            <Button color="inherit" component={Link} to="/categories">Категории</Button>
            <Button color="inherit" component={Link} to="/clients">Клиенты</Button>
            <Button color="inherit" component={Link} to="/candys">Конфеты</Button>
            <Button color="inherit" component={Link} to="/carts">Корзины</Button>
            <Button color="inherit" component={Link} to="/cartItems">Объекты коризны</Button>
            <Button color="inherit" component={Link} to="/orders">Заказы</Button>
            <Button color="inherit" component={Link} to="/orderItems">Объекты заказа</Button>
          </Toolbar>
        </AppBar>
        <Container style={{ marginTop: '10px' }}>
          <Routes>
            <Route path="/roles" element={<RoleManagement />} />
            <Route path="/categories" element={<CategoryManagement />} />
            <Route path="/clients" element={<ClientManagement />} />
            <Route path="/candys" element={<CandyManagement />} />
            <Route path="/carts" element={<CartManagement />} />
            <Route path="/cartItems" element={<CartItemManagement />} />
            <Route path="/orders" element={<OrderManagement />} />
            <Route path="/orderItems" element={<OrderItemManagement />} />
          </Routes>
        </Container>
      </Router>
  );
}

export default App;
