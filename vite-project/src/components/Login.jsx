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

    if (isLogin) {
        navigate("/welcome");
    };

    return (
        <div style={{ maxWidth: '500px', margin: '50px auto', padding: '20px' }}>
            <div id="loginLogo">
                <img src={logo} alt="Logo image" />
            </div>
            <div id="logotext" style={{ textAlign: 'center'}}>Sleep Sprout</div>
            <div style={{ textAlign: 'center' }} id="li-su-btn">
                <Button 
                    id="last-btn" 
                    onClick={() => {
                        setIsLogin(!isLogin);
                        }}>Click here to start!
                    </Button>
                </div>
        </div>
    );
};

export default Login;