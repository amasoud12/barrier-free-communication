import { useState, useEffect } from "react";
import { Box, TextField, Button, Rating, Typography, Card, CardContent, Avatar, Grid, Divider } from "@mui/material";
import emailjs from '@emailjs/browser';

// Initialize EmailJS with your public key
emailjs.init('5PI6GrT3XLTB3-n0M');

const Feedback = () => {
    const [rating, setRating] = useState(0);
    const [feedback, setFeedback] = useState("");
    const [email, setEmail] = useState("");
    const [sending, setSending] = useState(false);
    const [feedbacks, setFeedbacks] = useState([]);

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
        <Box maxWidth="800px" mx="auto" p={3}>
            <Card variant="outlined" sx={{ mb: 4 }}>
                <CardContent>
                    <Typography variant="h6" gutterBottom>
                        Have a Feedback?
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                type="email"
                                variant="outlined"
                                placeholder="Enter your email"
                                name="user_email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                sx={{ mb: 2 }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                multiline
                                rows={2}
                                variant="outlined"
                                placeholder="Please share your feedback here!"
                                name="feedback_text"
                                value={feedback}
                                onChange={(e) => setFeedback(e.target.value)}
                            />
                        </Grid>
                    </Grid>

                    <Box mt={2} display="flex" alignItems="center">
                        <Rating
                            name="rating"
                            value={rating}
                            onChange={(event, newValue) => {
                                setRating(newValue);
                            }}
                        />
                        <Button
                            variant="contained"
                            sx={{ ml: 2 }}
                            onClick={handleSubmit}
                            disabled={!feedback || !rating || !email || sending}
                        >
                            {sending ? 'Sending...' : 'Submit'}
                        </Button>
                    </Box>
                </CardContent>
            </Card>

            <Box display="flex" alignItems="center" mb={2}>
                <Divider sx={{ flexGrow: 1, mr: 2 }} />
                <Typography variant="body2" color="textSecondary" sx={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
                    Recent Feedback
                </Typography>
                <Divider sx={{ flexGrow: 1, ml: 2 }} />
            </Box>

            <Grid container spacing={2}>
                {feedbacks.slice(0, 2).map((fb, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                        <Card variant="outlined">
                            <CardContent>
                                <Rating value={fb.rating} readOnly />
                                <Typography variant="body1" mt={1}>
                                    {fb.comment}
                                </Typography>
                                <Box display="flex" alignItems="center" mt={2}>
                                    <Avatar>{fb.name[0]}</Avatar>
                                    <Box ml={2}>
                                        <Typography variant="subtitle2">{fb.name}</Typography>
                                        <Typography variant="caption" color="textSecondary">
                                            {fb.date}
                                        </Typography>
                                    </Box>
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