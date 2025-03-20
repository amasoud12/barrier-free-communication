import React, { useState, useRef } from 'react';
import './ASL.css';
import axios from "axios";
import { io } from 'socket.io-client';
import { Box, Container, Stack, Typography } from "@mui/material";
import AudiotoASL from '../assets/AudiotoASL.png';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import MicIcon from '@mui/icons-material/Mic';
import MicNoneOutlinedIcon from '@mui/icons-material/MicNoneOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import UploadIcon from '@mui/icons-material/Upload';
import Button from '@mui/material/Button';
import { useEffect } from "react";
import jsPDF from 'jspdf';


const ASL = () => {
    const [inputValue, setInputValue] = useState('');
    const [transcribe, setTranscribeValue] = useState('');
    const [videoSrc, setVideoSrc] = useState('/assets/A.mp4');
    const videoRef = useRef(null);
    const [currIndex, setCurrIndex] = useState(0); // Use state for currIndex
    const [wordArray, setWordArray] = useState([]);
    const [maxIndex, setMaxIndex] = useState(0);
    const [ASLflag, setASLFlag] = useState(0);
    const [transcriptionFlag, setTranscriptionFlag] = useState(0);
    const [saveTranscriptionFlag, setSaveTranscriptionFlag] = useState(0);
    const [downloadASLFlag, setDownloadASLFlag] = useState(0);
    const [downloadTranslationFlag, setDownloadTranslationFlag] = useState(0);
    const [file, setFile] = useState(null);
    const [transcript, setTranscript] = useState('');
    const [recording, setRecording] = useState(false);
    const [liveTranscript, setLiveTranscript] = useState('');
    const [fileUpload, setFileUpload] = useState(0);
    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);
    const socket = useRef(null);
    const audioStreamRef = useRef(null);
    const [selectedOption, setSelectedOption] = useState('');

    useEffect(() => {
        // Connect to backend WebSocket for live transcription
        socket.current = io('http://localhost:5000');

        socket.current.on('transcription', (data) => {
        setLiveTranscript((prev) => prev + ' ' + data.text);
        setInputValue((prev) => prev + ' ' + data.text);  // Set transcription to input
        });

        socket.current.on('error', (data) => {
        console.error('Error from server:', data.error);
        });

        return () => {
        socket.current.disconnect();
        };
    }, []);


    
    const handleviewTranscript = (event) => {
        setTranscriptionFlag(1);
    };

    const handleDownloadTranscript = async() => {

        if(!transcribe) return;
    
        const doc = new jsPDF();
        doc.setFontSize(14);
 
        doc.text(`${transcribe}`, 20, 30);
        doc.save("transcript.pdf");
    }

    const handleDownloadASL = async () => {
        if (!videoSrc) return;
        
        const link = document.createElement("a");
        link.href = videoSrc;
        link.download = "asl_translation.mp4";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleRecordClick = () => {
        setDownloadASLFlag(0);
        setDownloadTranslationFlag(1);
        setSaveTranscriptionFlag(1);
        setRecording(true);
        setFileUpload(false);
        const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.lang = 'en-US';
        recognition.start();
        
        recognition.onresult = (event) => {
            setInputValue(event.results[0][0].transcript);
        };
    
        recognition.onerror = (event) => {
            console.error("Speech recognition error", event.error);
        };
    };

    const handleUploadClick = () => {
        setDownloadTranslationFlag(0);
        setDownloadASLFlag(0);
        setSaveTranscriptionFlag(0);
        setFileUpload(1);
    };

    const fetchTranslatedData = () => {
        setDownloadTranslationFlag(1);
        setSaveTranscriptionFlag(0);
        setDownloadASLFlag(0);
        setDownloadTranslationFlag(1);
        setSaveTranscriptionFlag(0);
        setASLFlag(0);
        setTranscriptionFlag(1);
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
            setDownloadASLFlag(1);
            setDownloadTranslationFlag(0);
            setSaveTranscriptionFlag(0);
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
    // Handle audio file upload
    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) {
        alert('Please select a .wav file to upload.');
        return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
        const response = await axios.post('http://localhost:5000/upload', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        setTranscript(response.data.text);
        setInputValue(response.data.text); // Set transcription to input
        fetchData(); // Convert transcription to ASL
        } catch (error) {
        console.error('Error uploading file:', error);
        setTranscript('Error processing file.');
        }
    };

    
    // Stop recording live audio
    const stopRecording = () => {
        if (mediaRecorderRef.current) {
        mediaRecorderRef.current.stop();
        setRecording(false);

        if (audioStreamRef.current) {
            audioStreamRef.current.getTracks().forEach((track) => track.stop());
        }
        }
    };

    // Send audio chunk to backend for transcription
    const sendAudioToBackend = async (audioChunk) => {
        const reader = new FileReader();
        reader.readAsDataURL(audioChunk);
        reader.onloadend = () => {
        const base64Data = reader.result.split(',')[1];
        socket.current.emit('audio chunk', base64Data); // Ensure this event matches backend
        };
    };

    const handleChange = async(event) => {
        setSelectedOption(event.target.value);

        const userData = {
            text: inputValue,
            target: event.target.value
          };

          const response = await fetch('http://localhost:5000/transcribe', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',  // Specify that we're sending JSON
            },
            body: JSON.stringify(userData),  // Convert the JS object to a JSON string
          });
      
          const data = await response.json();  // Parse the JSON response from Flask

          
          setTranscribeValue(data.message);

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
                            <MicNoneOutlinedIcon color="black" fontSize="large" style={{marginTop: "10px", marginLeft: "50px", marginRight: "15px", cursor: "pointer" }} onClick={handleRecordClick}/>
                            <FileUploadOutlinedIcon color="black" fontSize="large" style={{cursor: "pointer"}} onClick={handleUploadClick}/>    
                        </div>
                            {}
                        <div>
                            {fileUpload ? (
                                <div className="audio-upload">
                                    <input type="file" accept=".wav" onChange={handleFileChange} />
                                    <button onClick={handleUpload}>Upload</button>
                                    <h3>Transcription:</h3>
                                    <div>
                                        <p>{transcript}</p>

                                        <h3>Which Language to Transcribe into:</h3>
                                            <select value={selectedOption} onChange={handleChange}>
                                                <option value="Select Option">Select One</option>
                                                <option value="English">English</option>
                                                <option value="Hindi">Hindi</option>
                                                <option value="Arabic">Arabic</option>
                                            </select>

                                                <p>Selected Option: {selectedOption}</p>


                                    </div>
                                    
                                </div>) : <div></div>


                            }
                        </div>

                        <div>
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
                    <Box sx={{ padding: 1, flex: 0.3}}>
                        {inputValue && saveTranscriptionFlag ? 
                            <div>
                                <div>
                                    <Typography variant='h6'>Transcription of the recorded audio</Typography>
                                </div>
                                <div>{transcribe}</div>
                                <div>
                                <button className="card-button" onClick={handleDownloadTranscript}>
                                    Save Transcription
                                </button>
                            </div>
                            </div> : 
                            <div></div>
                        }
                        {ASLflag && downloadASLFlag ? 
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

              

                        { transcriptionFlag && downloadTranslationFlag ? 
                            <div>
                                <div>{transcribe}</div>
                                <button className="card-button" onClick={handleDownloadTranscript}>
                                    Save Translation
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