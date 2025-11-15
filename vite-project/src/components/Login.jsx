import React, { useState } from 'react';
import { auth } from "../configuration";
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword  } from 'firebase/auth';
import { Form, Button } from 'react-bootstrap';

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
                // Login existing user
                await signInWithEmailAndPassword(auth, email, password);
                console.log('Login successful');
                navigate("/home");
            } else {
                // Create new user
                await createUserWithEmailAndPassword(auth, email, password);
                console.log("Signup successful!");
                navigate("/home");
            }
        } catch (error) {
            setError(error.message);
            console.log(error.code, error.message);
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px' }}>
            <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
            
            <Form onSubmit={onSubmit}>
                <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
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
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </Form.Group>

                {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}

                <Button variant="primary" type="submit" className="w-100 mb-3">
                    {isLogin ? 'Login' : 'Sign Up'}
                </Button>

                <div style={{ textAlign: 'center' }}>
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
    );
};

export default Login;