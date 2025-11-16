import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
        <div style={{ maxWidth: '700px', margin: '50px auto', padding: '20px' }}>
            <div id="loginLogo">
                <img src={logo} alt="Logo image" />
            </div>
            <div id="logotext">Sleep Sprout</div>
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