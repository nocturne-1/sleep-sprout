import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import logo from '../assets/logo.png';
import '../Login.css';

const Login = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");

    const onInput= (e) => {
        setName(e.target.value);
    }
    const onFormSubmit = (e) => {
        e.preventDefault()
        console.log(name)
        navigate("/welcome", { state: { name } });
    }

    return (
        <div style={{ maxWidth: '700px', margin: '50px auto', padding: '20px' }}>
            <div id="loginLogo">
                <img src={logo} alt="Logo image" />
            </div>
            <div id="logotext">Sleep Sprout</div>
            <div style={{ textAlign: 'center' }}>
                <Form>
                    <Form.Group className="mb-3" controlId="plantName">
                        <Form.Label></Form.Label>
                        <Form.Control 
                        type="text"
                        size="lg" 
                        placeholder="Name your sleep sprout!"
                        onChange ={onInput}
                        value={name} />
                    </Form.Group>
                <Button
                    type="submit" 
                    id="submit-btn" 
                    onClick={onFormSubmit}
                    value>Submit
                </Button>
                </Form>
                </div>
        </div>
    );
};

export default Login;
