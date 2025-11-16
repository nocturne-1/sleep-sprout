import React, { useEffect, useState } from 'react';
import cong from "../configuration";
import { getDatabase, ref, onValue } from "firebase/database";
import { auth } from "../configuration";
import { Button, Card, Row, Col, Container } from 'react-bootstrap';
import { signOut } from 'firebase/auth';
import {motion} from 'framer-motion';
import '../Home.css';
import level1 from '../assets/level1.gif';
import level3 from '../assets/level3.gif';
import level4 from '../assets/level4.gif';
import backgroundimg from '../assets/backgroundimg.png';

function Home() {
    const [data, setData] = useState([]);
    const [showTypewriter, setShowTypewriter] = useState(false);
    const [plantImage, setPlantImage] = useState("../assets/plantimg.png");
    const [text, setText] = useState("")

    const sleepScore = 4;
    useEffect(() => {

    const database = getDatabase(cong); 
    
    const collectionRef = ref(database, "/CPXData");

    const fetchData = () => {
      onValue(collectionRef, (snapshot) => {
        const dataItem = snapshot.val();

        if (dataItem) {
          const displayItem = Object.values(dataItem);
          setData(displayItem);
        }
      });
    };

    fetchData();
  }, []);

  const onLogout = async () => {
    try {
            await signOut(auth);
            console.log('User logged out successfully');
        } catch (error) {
            console.error('Logout error:', error.message);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
        setShowTypewriter(true);
        }, 2000); 
  
          return () => clearTimeout(timer);
      }, []);  

  useEffect(() => {
    if (sleepScore === 1) {
        setPlantImage(level1);
        setText("Hi! Your plant is dead.");
    } else if (sleepScore === 2) {
        setPlantImage(logo);
        setText("Hi! Your plant is dead.")
    } else if (sleepScore === 3) {
        setPlantImage(level3);
        setText("Your plant is sprouting! You have been getting a fairly good amount of rest and quality of rest, based on your time spent in REM sleep, snores, movement, and overall sleep time. Good job!")
    } else {
        setPlantImage(level4);
        setText("Your plant is blooming! You have been getting a great amount of rest and quality of rest, based on your time spent in REM sleep, snores, movement, and overall sleep time. Great job!");
    }
    }, [sleepScore]);

  return (
    <div>
        <Container fluid className="dashboard-container">
        <Row className="gt-3 justify-start">
            <Col xs={12} md={12}>
                <Card id="card1" border="success" className="w-100 h-100">
                    <Card.Body>
                        <Card.Title id="c1title">Hello!</Card.Title>
                        <Card.Text>Welcome to your personalized sleep analytics dashboard, where you can see your sleep data mapped into measurable progress.</Card.Text>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
        <Row className="g-3 mt-2 justify-start">
            <Col xs={12} md={4}>
                <Card id="card2" border="success" className="w-100 h-100">
                    <Card.Body>
                        <Card.Title>Sleep Duration</Card.Title>
                        <Card.Text>Your overall sleep duration last night was...</Card.Text>
                    </Card.Body>
                </Card>
            </Col>
            <Col xs={12} md={4}>
                <Card id="card3" border="success" className="w-100 h-100">
                    <Card.Body>
                        <Card.Title>REM Sleep</Card.Title>
                        <Card.Text>Based on our data, we estimate that you spent __ hours, or ___ minutes, in REM sleep.</Card.Text>
                    </Card.Body>
                </Card>
            </Col>
            <Col xs={12} md={4}>
                <Card id="card4" border="success" className="w-100 h-100">
                    <Card.Body>
                        <Card.Title>Snores</Card.Title>
                        <Card.Text>You snored ___ times last night.</Card.Text>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
        <Row className="mt-4">
            <Col xs={12} md={8}>
                <Card className="main-image-card" id="plant-card">
                    <Card.Body className="d-flex justify-content-center align-items-center">
                        <img  
                        src={plantImage} 
                        className="plant-image"
                        />
                    </Card.Body>
                </Card>
            </Col>
            <Col xs={12} md={4}>
                <Card id="card4" border="success" className="w-100 h-100">
                    <Card.Body>
                        <Card.Title>Sleep Score</Card.Title>
                        <Card.Text>Your sleep score last night was {sleepScore}</Card.Text>
                    </Card.Body>
                </Card>
            </Col>
        </Row> 
        </Container>

        {showTypewriter && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    style={{
                        maxWidth: '1500px',
                        padding: '50px',
                        backgroundColor: 'white',
                        borderRadius: '10px',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                        fontSize: '21px',
                        lineHeight: '1.6',
                        textAlign: 'center',
                        marginTop: '20px'
                    }}
                >
                    <Typewriter 
                        text={text}
                        typingSpeed={50}
                    />
                </motion.div>
        )}

        <Row>
            <Button onClick={onLogout} id="logOutBtn">Logout</Button>
        </Row>
    </div>
  );
}

const Typewriter = ({ text, typingSpeed = 100 }) => {
    const [displayedText, setDisplayedText] = useState("");
    const [charIndex, setCharIndex] = useState(0);

    useEffect(() => {
        if (charIndex < text.length) {
            const timeoutId = setTimeout(() => {
                setDisplayedText((prev) => prev + text.charAt(charIndex));
                setCharIndex((prev) => prev + 1);
            }, typingSpeed);

            return () => clearTimeout(timeoutId);
        }
    }, [charIndex, text, typingSpeed]);

    return <span>{displayedText}</span>;
};

export default Home;