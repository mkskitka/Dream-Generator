import React, {useEffect, useState} from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import {Button} from "semantic-ui-react";
import "./Dictaphone.css"

var speed = 50; /* The speed/duration of the effect in milliseconds */
var i = 0;

const Dictaphone = (props) => {

    const {nextPage, promptFinished} = props;
    const [message, setMessage] = useState('')
    const commands = [
        {
            command: 'restart',
            callback: ({ resetTranscript }) => resetTranscript()
        },
        {
            command: 'clear',
            callback: ({ resetTranscript }) => resetTranscript()
        },
        {
            command: 'save',
            callback: () => nextPage()
        }
    ]
    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition,
        isMicrophoneAvailable
    } = useSpeechRecognition({commands});

    if (!isMicrophoneAvailable) {
        alert("microphone not avail")
        // Render some fallback content
    }
    if (!browserSupportsSpeechRecognition) {
        alert("Browser Does not Support Speech recognition")
    }

    function saveTranscript(){

    }

    function clearMessage(){
        setMessage("")
        document.getElementById("mic-button").style.animation = "none";
    }

    useEffect(function () {
        if (promptFinished) {
            document.getElementById("mic-button").style.visibility = "visible";
            if (!listening) {
                setMessage("click to start recording your response");
                document.getElementById("mic-button").style.animation = "pulse12 1s infinite";
            }
        }
        if(!promptFinished) {
            document.getElementById("mic-button").style.visibility = "hidden";
            saveTranscript();
            resetTranscript();
        }
    }, [promptFinished])


    return (
        <div>
            {/*<p>Microphone: {listening ? 'on' : 'off'}</p>*/}
            <div className={"centered"}>
                <Button id={"mic-button"} inverted={true} size={"large"}  icon={(!listening) ? "microphone" : "microphone slash"} basic
                         onClick={(listening) ? SpeechRecognition.stopListening :
                                                () => {SpeechRecognition.startListening({ continuous: true }); clearMessage();}}/>
            </div>
            <p className={"transcript"}>{message}</p>
            <p className={"transcript"}>{transcript}</p>
        </div>
    );
};
export default Dictaphone;