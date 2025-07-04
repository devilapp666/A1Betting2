import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
const API_URL = process.env.REACT_APP_API_URL || '/api';
const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            if (!email || !password)
                throw new Error('Email and password required');
            const res = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams({ username: email, password }),
            });
            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.detail || 'Login failed');
            }
            const data = await res.json();
            // Store JWT in localStorage (or use context/Zustand for real app)
            localStorage.setItem('access_token', data.access_token);
            alert('Login successful!');
            // Redirect or set auth state here
        }
        catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            }
            else {
                setError('Unknown error');
            }
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsx("div", { className: "flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900", children: _jsxs("form", { onSubmit: handleLogin, className: "bg-white dark:bg-gray-800 p-8 rounded shadow-md w-full max-w-sm", children: [_jsx("h2", { className: "text-2xl font-bold mb-6 text-center", children: "Login" }), _jsx("input", { type: "email", placeholder: "Email", value: email, onChange: e => setEmail(e.target.value), className: "w-full p-2 mb-4 border rounded", required: true }), _jsx("input", { type: "password", placeholder: "Password", value: password, onChange: e => setPassword(e.target.value), className: "w-full p-2 mb-4 border rounded", required: true }), error && _jsx("div", { className: "text-red-500 mb-2", children: error }), _jsx("button", { type: "submit", className: "w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50", disabled: loading, children: loading ? 'Logging in...' : 'Login' })] }) }));
};
export default LoginPage;
