import React, { useState, useEffect } from 'react';
import {motion} from 'framer-motion';
import plantimg from '../assets/plantimg.gif';
import { useNavigate } from 'react-router-dom'; 

const Welcome = () => {
    const navigate = useNavigate(); 
    const [showTypewriter, setShowTypewriter] = useState(false);
    const [isClicked, setIsClicked] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowTypewriter(true);
        }, 2000); 

        return () => clearTimeout(timer);
    }, []);

    if (isClicked) {
        navigate("/home"); 
    }

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            padding: '20px',
        }}>
            <div className="animationContainer" style={{ marginBottom: '30px' }}>
                <motion.img 
                    src={plantimg}
                    onClick={() => setIsClicked(!isClicked)}
                    animate={{ x: -100, y: -50, scale: 1 }}
                    initial={{ x: -300, y: 300, scale: 0 }}
                    transition={{ duration: 2, type: "spring" }}
                />
            </div>

            {showTypewriter && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    style={{
                        maxWidth: '600px',
                        padding: '50px',
                        backgroundColor: 'white',
                        borderRadius: '10px',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                        fontSize: '21px',
                        lineHeight: '1.6',
                        textAlign: 'center',
                        marginBottom: '100px'
                    }}
                >
                    <Typewriter 
                        text="Hi, I'm Mr. Sprout, your personal sleep plant! Good sleep habits help me grow and bad habits... well, you'll see. After analyzing your sleep, I'll show you how you can keep me (and yourself!) healthy. Click me to see how I analyze it!"
                        typingSpeed={30}
                    />
                </motion.div>
            )}
        </div>
    );
};

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

export default Welcome;

