import { useState, useEffect } from "react";
import { Box, TextField, Button, Rating, Typography, Card, CardContent, Avatar, Grid, Divider } from "@mui/material";
import emailjs from '@emailjs/browser';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../context/LanguageContext';
import './Feedback.css';

// Initialize EmailJS with your public key
emailjs.init('5PI6GrT3XLTB3-n0M');

const Feedback = ({ theme }) => {
    const [rating, setRating] = useState(0);
    const [feedback, setFeedback] = useState("");
    const [email, setEmail] = useState("");
    const [sending, setSending] = useState(false);
    const [feedbacks, setFeedbacks] = useState([]);
    const { fontStyle, fontSize } = useTheme();
    const { t } = useTranslation();
    const { language } = useLanguage();
    
    // Set text direction based on language
    const isRTL = language === 'ar';
    const textDirection = isRTL ? 'rtl' : 'ltr';

    useEffect(() => {
        // Fetch existing feedbacks when component mounts
        fetchFeedbacks();
    }, []);

    const fetchFeedbacks = async () => {
        try {
            const response = await fetch('http://localhost:5000/get-feedbacks');
            if (!response.ok) {
                throw new Error('Failed to fetch feedbacks');
            }
            const data = await response.json();
            setFeedbacks(data);
        } catch (error) {
            console.error('Error fetching feedbacks:', error);
        }
    };

    const handleSubmit = async () => {
        setSending(true);
        try {
            // Send feedback to backend
            const response = await fetch('http://localhost:5000/send-feedback', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    feedback,
                    rating
                })
            });

            if (!response.ok) {
                throw new Error('Failed to send feedback');
            }

            // Send email using EmailJS
            try {
                await emailjs.send(
                    'service_4q6568t',
                    'template_66g1srd',
                    {
                        feedback_text: feedback,
                        rating: rating,
                        date: new Date().toLocaleString(),
                        user_email: email
                    },
                    '5PI6GrT3XLTB3-n0M'
                );
            } catch (emailError) {
                console.error('Error sending email:', emailError);
                // Don't throw error here to keep the main functionality working
            }

            const data = await response.json();
            
            // Update feedbacks list with the new feedback
            await fetchFeedbacks();
            
            alert("Feedback submitted successfully!");
            setFeedback("");
            setRating(0);
            setEmail("");
        } catch (error) {
            console.error('Error sending feedback:', error);
            alert("Failed to send feedback. Please try again.");
        }
        setSending(false);
    };

    return (
        <Box maxWidth="800px" mx="auto" p={3} sx={{ 
            fontFamily: fontStyle,
            direction: textDirection 
        }} className={`feedback-container ${theme === 'dark' ? 'dark' : ''}`}>
            <Card variant="outlined" sx={{ mb: 4 }} className="feedback-card">
                <CardContent className="feedback-form">
                    <Typography variant="h6" gutterBottom sx={{ 
                        fontSize: `${parseInt(fontSize) + 4}px`,
                        textAlign: isRTL ? 'right' : 'left'
                    }}>
                        {t('have_feedback')}
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                type="email"
                                variant="outlined"
                                placeholder={t('enter_email')}
                                name="user_email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                sx={{ 
                                    mb: 2,
                                    '& .MuiInputBase-input': {
                                        fontFamily: fontStyle,
                                        fontSize: `${fontSize}px`,
                                        textAlign: isRTL ? 'right' : 'left',
                                        direction: textDirection
                                    }
                                }}
                                InputProps={{
                                    style: { direction: textDirection }
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                multiline
                                rows={2}
                                variant="outlined"
                                placeholder={t('share_feedback')}
                                name="feedback_text"
                                value={feedback}
                                onChange={(e) => setFeedback(e.target.value)}
                                sx={{
                                    '& .MuiInputBase-input': {
                                        fontFamily: fontStyle,
                                        fontSize: `${fontSize}px`,
                                        textAlign: isRTL ? 'right' : 'left',
                                        direction: textDirection
                                    }
                                }}
                                InputProps={{
                                    style: { direction: textDirection }
                                }}
                            />
                        </Grid>
                    </Grid>

                    <Box mt={2} display="flex" alignItems="center" justifyContent={isRTL ? 'flex-end' : 'flex-start'}>
                        <Rating
                            name="rating"
                            value={rating}
                            onChange={(event, newValue) => {
                                setRating(newValue);
                            }}
                            sx={{ 
                                '& .MuiRating-icon': {
                                    fontSize: `${parseInt(fontSize) + 4}px`
                                }
                            }}
                        />
                        <Button
                            variant="contained"
                            className="feedback-button"
                            sx={{ 
                                ml: isRTL ? 0 : 2,
                                mr: isRTL ? 2 : 0,
                                fontFamily: fontStyle,
                                fontSize: `${fontSize}px`
                            }}
                            onClick={handleSubmit}
                            disabled={!feedback || !rating || !email || sending}
                        >
                            {sending ? t('sending') : t('submit')}
                        </Button>
                    </Box>
                </CardContent>
            </Card>

            <Box display="flex" alignItems="center" mb={2}>
                <Divider sx={{ flexGrow: 1, mr: isRTL ? 0 : 2, ml: isRTL ? 2 : 0 }} />
                <Typography variant="body2" color="textSecondary" sx={{ 
                    fontSize: `${fontSize}px`, 
                    fontFamily: fontStyle,
                    mx: 2
                }}>
                    {t('recent_feedback')}
                </Typography>
                <Divider sx={{ flexGrow: 1, ml: isRTL ? 0 : 2, mr: isRTL ? 2 : 0 }} />
            </Box>

            <Grid container spacing={2} direction={isRTL ? 'row-reverse' : 'row'}>
                {feedbacks.slice(0, 2).map((fb, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                        <Card variant="outlined">
                            <CardContent>
                                <Box display="flex" alignItems="center" mb={1} flexDirection={isRTL ? 'row-reverse' : 'row'}>
                                    <Avatar sx={{ 
                                        bgcolor: 'primary.main', 
                                        mr: isRTL ? 0 : 2,
                                        ml: isRTL ? 2 : 0
                                    }}>
                                        {fb.name ? fb.name[0] : 'A'}
                                    </Avatar>
                                    <Box sx={{ textAlign: isRTL ? 'right' : 'left' }}>
                                        <Typography variant="subtitle1" sx={{ fontSize: `${fontSize}px`, fontFamily: fontStyle }}>
                                            {fb.name || t('anonymous_user')}
                                        </Typography>
                                        <Typography variant="caption" color="textSecondary" sx={{ fontSize: `${parseInt(fontSize) - 2}px`, fontFamily: fontStyle }}>
                                            {fb.date}
                                        </Typography>
                                    </Box>
                                </Box>
                                <Typography sx={{ 
                                    fontSize: `${fontSize}px`, 
                                    fontFamily: fontStyle,
                                    textAlign: isRTL ? 'right' : 'left'
                                }}>
                                    {fb.comment}
                                </Typography>
                                <Box sx={{ display: 'flex', justifyContent: isRTL ? 'flex-end' : 'flex-start' }}>
                                    <Rating value={fb.rating} readOnly sx={{ 
                                        mt: 1,
                                        '& .MuiRating-icon': {
                                            fontSize: `${parseInt(fontSize) + 2}px`
                                        }
                                    }} />
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default Feedback;