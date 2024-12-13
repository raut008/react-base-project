import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import { AuthGuard } from './components/AuthGuard/AuthGuard';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

const root = document.getElementById('root');

const routes = [
  {
    path: '/',
    element: <Navigate to="/dashboard" replace />,
    isProtected: true,
  },
  { path: '/about', element: <About />, isProtected: false },
  { path: '/login', element: <Login />, isProtected: false },
  { path: '/register', element: <Register />, isProtected: false },
  { path: '/dashboard', element: <Dashboard />, isProtected: true }, // Example of a protected route
];

ReactDOM.createRoot(root).render(
  <ErrorBoundary>
    <BrowserRouter>
      <Routes>
        {routes.map(({ path, element, isProtected }) => (
          <Route
            key={path}
            path={path}
            element={<AuthGuard element={element} isProtected={isProtected} />}
          />
        ))}
      </Routes>
    </BrowserRouter>
  </ErrorBoundary>
);
