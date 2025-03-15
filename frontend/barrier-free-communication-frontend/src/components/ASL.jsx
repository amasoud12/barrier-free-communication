import React, { useState, useRef } from 'react';
import './ASL.css';
import { Box, Container, Stack, Typography } from "@mui/material";
import AudiotoASL from '../assets/AudiotoASL.png';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import MicIcon from '@mui/icons-material/Mic';
import UploadIcon from '@mui/icons-material/Upload';
import Button from '@mui/material/Button';
import jsPDF from 'jspdf';


const ASL = () => {
    const [inputValue, setInputValue] = useState('');
    const [videoSrc, setVideoSrc] = useState('/assets/A.mp4');
    const videoRef = useRef(null);
    const [currIndex, setCurrIndex] = useState(0); // Use state for currIndex
    const [wordArray, setWordArray] = useState([]);
    const [maxIndex, setMaxIndex] = useState(0);
    const [ASLflag, setASLFlag] = useState(0);
    const [transcriptionFlag, setTranscriptionFlag] = useState(0);
    

    const handleviewTranscript = (event) => {
        setTranscriptionFlag(1);
    };

    const handleDownloadTranscript = () => {
        if(!inputValue) return;
    
        const doc = new jsPDF();
        doc.setFontSize(14);
        doc.text(`${inputValue}`, 20, 30);
        doc.save("transcript.pdf");
    }

    const handleDownloadASL = async () => {
        
    };

    const handleRecordClick = () => {

    };

    const handleUploadClick = () => {

    };

    const fetchTranslatedData = () => {
        setASLFlag(0);
        setTranscriptionFlag(1);
    };

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
            setTranscriptionFlag(0);
            setASLFlag(1);
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
            <h1 style={{ textAlign: "center", marginTop: "20px" }}>Audio to ASL</h1>
            <div>
                <Stack direction="row" spacing={1} justifyContent="center" margin={2}>
                    <Box sx={{ padding: 1, flex: 0.3 }}>
                        <img src={AudiotoASL} alt='no image' style={{ height: "300px", width: "400px" }}/>
                    </Box>
                    <Box sx={{ padding: 1, flex: 0.3 }}>
                        <div>
                            <FormControl>
                                <FormControlLabel value="consent" control={<Radio defaultChecked />} label="Allow the app to record audio?" />
                            </FormControl>
                        </div>
                        <div sx={{margin: "2px"}}>
                            <MicIcon color="black" fontSize="large" style={{marginTop: "10px", marginLeft: "50px", marginRight: "15px", cursor: "pointer" }} onClick={handleRecordClick}/>
                            <UploadIcon color="black" fontSize="large" style={{cursor: "pointer"}} onClick={handleUploadClick}/>
                        </div>
                        
                        <input
                            type="text"
                            value={inputValue}
                            onChange={handleInputChange}
                            placeholder="Enter text here"
                        />
                        <div>
                            <p>You entered: {inputValue}</p>
                            <button className="card-button" onClick={fetchData}>
                                View ASL
                            </button>
                        </div>
                        <div>
                            <button className="card-button" onClick={fetchTranslatedData}>
                                View Translation
                            </button>
                        </div>
                    </Box>
                    <Box sx={{ flex: 0.3}}>
                        {ASLflag ? 
                            <div sx={{margin: "2px"}}>
                                <div>
                                    <video
                                        ref={videoRef}
                                        width="400"
                                        height="250"
                                        onEnded={handleVideoEnd}
                                        onLoadedData={handleLoadedData}
                                        autoPlay
                                    >
                                        <source src={videoSrc} type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                </div>
                                <div>
                                    <button className="card-button" onClick={handleDownloadASL}>
                                        Save ASL
                                    </button>
                                </div>
                            </div> :
                            <div></div>
                        }
                        { transcriptionFlag ? 
                            <div>
                                <button className="card-button" onClick={handleDownloadTranscript}>
                                    Save Transcription
                                </button>
                            </div> :
                            <div></div>
                        }
                    </Box>
                </Stack>
            </div>                          
        </div>
    );
};

export default ASL;