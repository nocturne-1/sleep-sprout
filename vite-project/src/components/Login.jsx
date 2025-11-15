import React, { useState } from 'react';
import { auth } from "../configuration";
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword  } from 'firebase/auth';
import { Form, Button } from 'react-bootstrap';
import logo from '../assets/logo.png';
import '../Login.css';

const Login = () => {
    const navigate = useNavigate();

    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const onSubmit = async (e) => {
      e.preventDefault();
      setError('');

      try {
            if (isLogin) {
                await signInWithEmailAndPassword(auth, email, password);
                console.log('Login successful');
                navigate("/welcomeli");
            } else {
                await createUserWithEmailAndPassword(auth, email, password);
                console.log("Signup successful!");
                navigate("/welcome");
            }
        } catch (error) {
            setError(error.message);
            console.log(error.code, error.message);
        }
    };

    return (
        <div style={{ maxWidth: '500px', margin: '50px auto', padding: '20px' }}>
            <div id="loginLogo">
                <img src={logo} alt="Logo image" />
            </div>
            <div id="loginForm">
            <div id="li-or-su">{isLogin ? 'Log In' : 'Sign Up'}</div>
            
            <Form onSubmit={onSubmit}>
                <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        size="lg"
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        size="lg"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </Form.Group>

                {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
                <Button variant="primary" type="submit" className="w-100 mb-3" id="submitButton" size="lg">
                    {isLogin ? 'Log In' : 'Sign Up'}
                </Button>

                <div style={{ textAlign: 'center' }} id="li-su-btn">
                    <Button 
                        variant="link" 
                        onClick={() => {
                            setIsLogin(!isLogin);
                            setError('');
                        }}
                    >
                        {isLogin 
                            ? "Don't have an account? Sign up" 
                            : "Already have an account? Login"}
                    </Button>
                </div>
            </Form>
        </div>
    </div>
    );
};

export default Login;