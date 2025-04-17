import React, { useState, useRef, useEffect } from 'react';
import './ASL.css';
import axios from "axios";
import { io } from 'socket.io-client';
import { Box, Container, Stack, Typography } from "@mui/material";
import AudiotoASL from '/assets/AudiotoASL.png';
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
import jsPDF from 'jspdf';
import html2canvas from "html2canvas";
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../context/LanguageContext';
import Joyride from 'react-joyride';

const ASL = ({ theme }) => {
    const { t } = useTranslation();
    const { language } = useLanguage();
    const { fontStyle, fontSize } = useTheme();
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
    const [isLoading, setIsLoading] = useState(false);
    const [ffmpeg] = useState(() => new FFmpeg());
    const [ffmpegLoaded, setFfmpegLoaded] = useState(false);
    const [runTutorial, setRunTutorial] = useState(true);
    const [run, setRun] = useState(true); // Start tutorial on load
    const [steps, setSteps] = useState([
        {
            target: '.record-audio',
            content: 'Click here to record a live message. Note: this will turn your microphone on.',
            placement: 'bottom',
        },
        {
            target: '.audio-upload',
            content: 'Click here to upload a .WAV audio file.',
            placement: 'bottom',
        },
        {
            target: '.select-translation',
            content: 'Choose the language you want to translate the text into.',
            placement: 'bottom',
        },
        {
            target: '.view-asl',
            content: 'Click to view the ASL translation for the text.',
            placement: 'bottom',
        },
        {
            target: '.view-translation',
            content: 'Click here to view the translation of the audio.',
            placement: 'bottom',
        },
    ]);
    
    const handleJoyrideCallback = (data) => {
        const { status, type } = data;
    
        // Stop tutorial if finished or skipped
        if ([status.FINISHED, status.SKIPPED].includes(status)) {
          setRun(false); 
        }
      };

    // Synchronize the transcription language with the app language
    useEffect(() => {
        // Map the language code to the language name used in the dropdown
        const languageMap = {
            'en': 'English',
            'ar': 'Arabic',
            'hi': 'Hindi'
        };
        
        if (languageMap[language]) {
            setSelectedOption(languageMap[language]);
        }
    }, [language]);

    useEffect(() => {
        // Connect to backend WebSocket for live transcription
        socket.current = io('https://steady-pocket-production.up.railway.app/');

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

    useEffect(() => {
        // Load FFmpeg
        const loadFFmpeg = async () => {
            try {
                await ffmpeg.load();
                setFfmpegLoaded(true);
                console.log('FFmpeg loaded successfully');
            } catch (error) {
                console.error('Error loading FFmpeg:', error);
            }
        };

        loadFFmpeg();
    }, [ffmpeg]);

    
    const handleviewTranscript = (event) => {
        setTranscriptionFlag(1);
    };

    const handleDownloadTranscript = async () => {
        if (!transcribe) {
            alert("No text available to download!");
            return;
        }
    
        const tempDiv = document.createElement("div");
        tempDiv.style.fontFamily = "'Arial', sans-serif";
        tempDiv.style.fontSize = "16px";
        tempDiv.style.color = "black";
        tempDiv.style.backgroundColor = "white";
        tempDiv.style.padding = "20px";
        tempDiv.style.width = "500px";
        tempDiv.style.textAlign = "right"; 
        tempDiv.style.direction = /[\u0600-\u06FF]/.test(transcribe) ? "rtl" : "ltr"; 
        tempDiv.innerText = transcribe;
        
        document.body.appendChild(tempDiv);
    
        html2canvas(tempDiv, { scale: 2 }).then((canvas) => {
            const imgData = canvas.toDataURL("image/png");
            
            const doc = new jsPDF();
            doc.addImage(imgData, "PNG", 10, 10, 180, 0); 
            
            doc.save("translated_transcript.pdf");
            document.body.removeChild(tempDiv); 
        });
    };

    const handleDownloadASL = async () => {
        if (!wordArray.length) {
            alert('No ASL content to download');
            return;
        }

        if (!ffmpegLoaded) {
            alert('FFmpeg is still loading. Please wait...');
            return;
        }
        
        setIsLoading(true);
        try {
            const videoNames = wordArray.map(word => `${word}.mp4`);
            console.log('Videos to merge:', videoNames);
            
            // Create a text file with the list of videos
            let concatText = '';
            for (let i = 0; i < videoNames.length; i++) {
                const response = await fetch(`/assets/${videoNames[i]}`);
                const videoBlob = await response.blob();
                await ffmpeg.writeFile(`video${i}.mp4`, await fetchFile(videoBlob));
                concatText += `file video${i}.mp4\n`;
            }
            
            await ffmpeg.writeFile('concat.txt', concatText);

            // Merge videos using FFmpeg
            await ffmpeg.exec([
                '-f', 'concat',
                '-safe', '0',
                '-i', 'concat.txt',
                '-c', 'copy',
                'output.mp4'
            ]);

            // Read the output file
            const data = await ffmpeg.readFile('output.mp4');
            const blob = new Blob([data.buffer], { type: 'video/mp4' });
            const url = URL.createObjectURL(blob);
            
            const link = document.createElement('a');
            link.href = url;
            link.download = 'asl_video.mp4';
            document.body.appendChild(link);
            link.click();
            
            setTimeout(() => {
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
            }, 100);

        } catch (error) {
            console.error('Error merging videos:', error);
            alert('An error occurred while creating the ASL video: ' + error.message);
        } finally {
            setIsLoading(false);
        }
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
            setTranscript(event.results[0][0].transcript);
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

    const toTitleCase = (str) => {
        return str.toLowerCase().split(' ').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
    }
    

    const fetchData = () => {
        try {
            setDownloadASLFlag(1);
            setDownloadTranslationFlag(0);
            setSaveTranscriptionFlag(0);
            setTranscriptionFlag(0);
            setASLFlag(1);
            const iValue = toTitleCase(inputValue);
            const words = iValue.split(' ');
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
            const response = await axios.post('https://steady-pocket-production.up.railway.app/upload', formData);
            setTranscript(response.data.text);
            setInputValue(response.data.text); // Set transcription to input
            setASLFlag(0); // Reset ASL flag
            setDownloadASLFlag(0); // Reset download flag
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

          const response = await fetch('https://steady-pocket-production.up.railway.app/transcribe', {
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
        <div className={`asl-container ${theme}`}>
            {/* Trigger the Joyride tutorial */}
            {runTutorial && (
                <Joyride
                    steps={steps}
                    run={run}
                    callback={handleJoyrideCallback}
                    showSkipButton
                    showProgress
                    continuous
                    styles={{
                        options: {
                            zIndex: 10000,
                            primaryColor: '#1976d2',
                        },
                    }}
                />
            )}
        
            <div className="content-wrapper">
                <h1 style={{ textAlign: "center", marginTop: "20px", marginBottom:"20px", color: theme === 'dark' ? '#fff' : '#000' }}>
                    {t('audio_to_asl')}<i class="fa-solid fa-hands-asl-interpreting"></i>
                </h1>
                        <div sx={{ margin: "10px" }}>
                            <Typography>Choose the audio input mode</Typography>
                        </div>
                            
                            <MicNoneOutlinedIcon className="record-audio" color="black" fontSize="large" style={{ marginTop: "10px", marginRight:"10px", cursor: "pointer" }} onClick={handleRecordClick} />
                            <FileUploadOutlinedIcon className="audio-upload" color="black" fontSize="large" style={{ cursor: "pointer" }} onClick={handleUploadClick} />
                          
                        <div sx={{ margin: "2px" }}>
                            {fileUpload ? (
                                <div className="audio-upload">
                                    <input type="file" accept=".wav" onChange={handleFileChange} />
                                    <button className="card-button custom-button" onClick={handleUpload}>{t('upload')}</button>
                                </div>) : null}
        
                            <div>
                                <h3>{t('transcription')}</h3>
                                <div>
                                    <p>{transcript}</p>
                                </div>
                            </div>
                            <div className="button-row">
                                <div>
                                <h3>{t('translate_to')}</h3>
                                </div>
                                <div>
                                <select className="select-translation" value={selectedOption} onChange={handleChange}>
                                    <option value="Select Option">{t('select_one')}</option>
                                    <option value="English">English</option>
                                    <option value="Hindi">हिन्दी</option>
                                    <option value="Arabic">العربية</option>
                                </select>
                                </div>
                                </div>
        
                              
                        </div>

                        
                        <div>
                        <div className="button-row">
    <div>
        <button className="card-button custom-button view-asl" onClick={fetchData}>
            {t('view_asl')}
        </button>
    </div>
    <div>
        <button className="card-button custom-button view-translation" onClick={fetchTranslatedData}>
            {t('view_translation')}
        </button>
    </div>
</div>
                        </div>
                        {ASLflag ?
                            <div sx={{ margin: "2px" }}>
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
                                {downloadASLFlag && wordArray.length > 0 && (
                                    <div>
                                        <button className="card-button custom-button save-asl" onClick={handleDownloadASL} disabled={isLoading}>
                                            {isLoading ? t('downloading') : t('save_asl')}
                                        </button>
                                    </div>
                                )}
                            </div> : null}
        
                        {transcriptionFlag && downloadTranslationFlag ?
                            <div>
                                <div>{transcribe}</div>
                                <button className="card-button custom-button save-translation" onClick={handleDownloadTranscript}>
                                    {t('save_translation')}
                                </button>
                            </div> : null}
                    
            </div>
        </div>
    );
};

export default ASL;