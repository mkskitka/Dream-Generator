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
        // {
        //     command: 'I would like to order *',
        //     callback: (food) => setMessage(`Your order is for: ${food}`)
        // },
        // {
        //     command: 'The weather is :condition today',
        //     callback: (condition) => setMessage(`Today, the weather is ${condition}`)
        // },
        // {
        //     command: 'My top sports are * and *',
        //     callback: (sport1, sport2) => setMessage(`#1: ${sport1}, #2: ${sport2}`)
        // },
        // {
        //     command: 'Pass the salt (please)',
        //     callback: () => setMessage('My pleasure')
        // },
        // {
        //     command: ['Hello', 'Hi'],
        //     callback: ({ command }) => setMessage(`Hi there! You said: "${command}"`),
        //     matchInterim: true
        // },
        // {
        //     command: 'Beijing',
        //     callback: (command, spokenPhrase, similarityRatio) => setMessage(`${command} and ${spokenPhrase} are ${similarityRatio * 100}% similar`),
        //     // If the spokenPhrase is "Benji", the message would be "Beijing and Benji are 40% similar"
        //     isFuzzyMatch: true,
        //     fuzzyMatchingThreshold: 0.2
        // },
        // {
        //     command: ['eat', 'sleep', 'leave'],
        //     callback: (command) => setMessage(`Best matching command: ${command}`),
        //     isFuzzyMatch: true,
        //     fuzzyMatchingThreshold: 0.2,
        //     bestMatchOnly: true
        // },
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
                {/*<Button  inverted={true} size={"large"} content='STOP' basic*/}
                {/*         onClick={SpeechRecognition.stopListening}/>*/}
                {/*<Button  inverted={true} size={"large"} content='CLEAR' basic*/}
                {/*         onClick={resetTranscript}/>*/}
            </div>
            <p className={"transcript"}>{message}</p>
            <p className={"transcript"}>{transcript}</p>
        </div>
    );
};
export default Dictaphone;