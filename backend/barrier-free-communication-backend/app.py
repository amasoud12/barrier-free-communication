# Importing all required libraries
import os
import base64
import tempfile
from flask import Flask, request, jsonify
from flask_socketio import SocketIO
from flask_cors import CORS
import speech_recognition as sr

# Initializing Flask and WebSockets
app = Flask(__name__)
CORS(app)

# Enabling WebSockets
socketio = SocketIO(app, cors_allowed_origins="*")

# Creating a temp dir for storing audio
tempDir = "temp_audio"
# Adding flag for error handling in case the dir already exists
os.makedirs(tempDir, exist_ok=True)

# For transcription
# Initializing the recognizer - needed to convert audible words to text
recognizer = sr.Recognizer()

# Creating a function to process the audio file at the specified file path and returning the transcribed text
def audio_transcribe(filePath):
    try:
        # Opening the audio file
        with sr.AudioFile(filePath) as source:
            # Reads the audio file and converts it to an appropriate format for speech recognition
            audioData = recognizer.record(source)

            # Sends audio data to Google's speech-to-text API
            transcript = recognizer.recognize_google(audioData)
            # Returns the transcribed text
            return transcript

    # Error handling
    except sr.UnknownValueError:
        return "Unable to understand audio"
    
    # Google API down
    except sr.RequestError:
        return "Service unavailable"
    
    # Catch-all for other errors - returning the exact error message
    except Exception as e:
        return str(e)

# API route to allow the uploading of audio files
@app.route("/upload", methods=["POST"])  # POST as it supports file uploads
def audio_upload():
    try:
        # Extracting the file from the request and retrieving the uploaded file
        file = request.files["file"]

        # Ensuring only .wav files are allowed
        if not file.filename.endswith(".wav"):
            return jsonify({"error": "You must upload your audio file as a WAV file."}), 400
        
        # Creating a full file path as Flask needs an actual file path
        tempFilePath = os.path.join(tempDir, file.filename)
        
        # Saving the file before processing as speech-to-text transcription requires a file path
        file.save(tempFilePath)

        # Calling the transcription function to create a transcript
        transcript = audio_transcribe(tempFilePath)

        # Deleting the temp file
        os.remove(tempFilePath)

        # To ensure that the transcript is compatible with our JavaScript front end
        return jsonify({"text": transcript})
    
    # Error handling - returning the exact error message
    except Exception as e:
        return jsonify({"error": str(e)})

# Handling live audio as input
# Setting up the listener for an "audio chunk" event - triggered when live audio data is sent from the client
@socketio.on("audio chunk")
def audio_chunk_handling(data):
    try:
        # Decoding base64 string into binary audio data
        audioData = base64.b64decode(data)
        # A new temp file path is created to store audio temporarily
        tempFilePath = os.path.join(tempDir, "live_audio.wav")

        # Allows audio data to be saved in an appropriate format for transcription
        with open(tempFilePath, "wb") as tempFile:
            tempFile.write(audioData)

        # Calling the transcription function to create a transcript
        transcript = audio_transcribe(tempFilePath)

        # Transcribed text is emitted back to the client through the transcription event
        socketio.emit("transcription", {"text": transcript})

    # Error handling - returning the exact error message
    except Exception as e:
        socketio.emit("error", {"error": str(e)})

# Main function to run the app
if __name__ == '__main__':
    socketio.run(app, debug=True, host="0.0.0.0", port=5000)
