import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
function SignUp() {
    const [form, setForm] = useState({ name: '', email: '', password: '' });
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: '' }); // Clear error as user types
    };

    const navigation = useNavigate()

    useEffect(() => {
        const auth = localStorage.getItem("user")
        if (auth) {
            navigation("/")
        }
    }, [])
    const validate = () => {
        const newErrors = {};
        if (!form.name.trim()) newErrors.name = 'Name is required';
        if (!form.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(form.email)) {
            newErrors.email = 'Invalid email format';
        }
        if (!form.password) {
            newErrors.password = 'Password is required';
        } else if (form.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        var validationErrors = validate();
        if (Object.keys(validationErrors).length === 0) {
            // alert('Registration successful!');
            // Submit data here
            fetch("http://localhost:5000/register", {
                method: "post",
                body: JSON.stringify({
                    "name": form.name,
                    "email": form.email,
                    "password": form.password
                }),
                headers: { "Content-Type": "application/json" }
            })
                .then((response) => response.json())
                .then((result) => {
                    console.log(result);
                    if (result) {
                        localStorage.setItem("user", JSON.stringify(result.result))
                        localStorage.setItem("U_Token", JSON.stringify(result.auth))
                        navigate('/')
                    }
                })
                .catch((error) => console.error(error));

        } else {
            setErrors(validationErrors);
        }
    };

    return (
        <div style={containerStyle}>
            <h1>Registration</h1>
            <form onSubmit={handleSubmit} noValidate>
                <div>
                    <input
                        style={inputStyle}
                        type="text"
                        name="name"
                        placeholder="Enter Name"
                        value={form.name}
                        onChange={handleChange}
                    />
                    {errors.name && <div style={errorStyle}>{errors.name}</div>}
                </div>
                <div>
                    <input
                        style={inputStyle}
                        type="text"
                        name="email"
                        placeholder="Enter Email"
                        value={form.email}
                        onChange={handleChange}
                    />
                    {errors.email && <div style={errorStyle}>{errors.email}</div>}
                </div>
                <div>
                    <input
                        style={inputStyle}
                        type="password"
                        name="password"
                        placeholder="Enter Password"
                        value={form.password}
                        onChange={handleChange}
                    />
                    {errors.password && <div style={errorStyle}>{errors.password}</div>}
                </div>
                <button
                    type="submit"
                    style={{
                        ...inputStyle,
                        backgroundColor: '#007bff',
                        color: '#fff',
                        cursor: 'pointer',
                        border: 'none'
                    }}
                >
                    Sign Up
                </button>
            </form>
        </div>
    );
}

const inputStyle = {
    padding: '10px',
    margin: '10px 0',
    width: '100%',
    maxWidth: '300px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '16px'
};

const errorStyle = {
    color: 'red',
    fontSize: '14px',
    marginBottom: '10px'
};

const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '40px',
    fontFamily: 'Arial, sans-serif'
};


export default SignUp;
