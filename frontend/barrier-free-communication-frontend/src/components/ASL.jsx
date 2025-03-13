import React, { useState, useRef } from 'react';
import './ASL.css';

const ASL = () => {
    const [inputValue, setInputValue] = useState('');
    const [videoSrc, setVideoSrc] = useState('/assets/A.mp4');
    const videoRef = useRef(null);
    const [currIndex, setCurrIndex] = useState(0); // Use state for currIndex
    const [wordArray, setWordArray] = useState([]);
    const [maxIndex, setMaxIndex] = useState(0);

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleVideoEnd = () => {
        setCurrIndex((prevIndex) => { // Use functional update
            const newIndex = prevIndex + 1;
            if (newIndex <= maxIndex) {
                setVideoSrc(`/assets/${wordArray[newIndex]}.mp4`);
                if (videoRef.current) {
                    videoRef.current.load();
                }
            } else {
                console.log('completed');
            }
            return newIndex; // Return the updated index
        });
    };

    const handleLoadedData = () => {
        if (videoRef.current) {
            videoRef.current.play();
        }
    };

    const fetchData = () => {
        try {
            const words = inputValue.split(' ');
            setWordArray(words);
            setMaxIndex(words.length - 1);
            setCurrIndex(0); // Reset index
            setVideoSrc(`/assets/${words[0]}.mp4`);
            if (videoRef.current) {
                videoRef.current.load();
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h3 className="audioASLText">AUDIO to ASL</h3>

            <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Enter text here"
            />
            <p>You entered: {inputValue}</p>

            <button className="card-button" onClick={fetchData}>
                View ASL
            </button>

            <h1>My Local Video</h1>
            <video
                ref={videoRef}
                width="600"
                onEnded={handleVideoEnd}
                onLoadedData={handleLoadedData}
                autoPlay
            >
                <source src={videoSrc} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    );
};

export default ASL;