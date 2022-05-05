import React, {useEffect, useState} from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import {Button} from "semantic-ui-react";
import "./Dictaphone.css"
import {SPEAK} from "../constants";
import {useDispatch, useSelector} from "react-redux";

let preventSkip = false;
const Dictaphone = (props) => {

    const {nextPage, promptFinished} = props;
    const [message, setMessage] = useState("")
    const story = useSelector((state) => state.dreamStory)
    const dispatch = useDispatch();

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
            command: 'done',
            callback: () => done(),
            isFuzzyMatch: true,
            fuzzyMatchingThreshold: .8
        }
    ]

    function done() {
        setMessage("");
        saveTranscript();
    }
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

    // Execute a function when the user presses a key on the keyboard
    window.addEventListener("keypress", function(event) {
        // If the user presses the "Enter" key on the keyboard
        //event.preventDefault();
        if (event.key === "Enter" && promptFinished && listening && !preventSkip) {
            // setMessage("");
            // saveTranscript();
            // nextPage();
            // preventSkip = true;
            // setTimeout(function () {preventSkip = false;}, 1000)
        }
    });
    function removeLastWord(str) {
        const lastIndexOfSpace = str.lastIndexOf(' ');

        if (lastIndexOfSpace === -1) {
            return str;
        }

        return str.substring(0, lastIndexOfSpace);
    }
    function saveTranscript(){
        let updatedStory = story + removeLastWord(transcript) + " ";
        console.log("updated story: ", updatedStory)
        dispatch({type:"updateDreamStory", story: updatedStory});
    }

    function randomIntFromInterval(min, max) { // min and max included
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    function clearMessage(){
        setMessage("")
        document.getElementById("mic-button").style.animation = "none";
    }

    useEffect(function () {
        if (promptFinished) {
            resetTranscript();
            document.getElementById("mic-button").style.visibility = "visible";
            if (!listening) {
                document.getElementById("mic-button").style.animation = "pulse12 1s infinite";
                setMessage("Awaken the dream whisperer!");
            }
            else {
                let i = randomIntFromInterval(0, SPEAK.length-1);
                setMessage(SPEAK[i]);
            }
        }
        if(!promptFinished) {
            document.getElementById("mic-button").style.visibility = "hidden";
            resetTranscript();


        }
    }, [promptFinished])

    useEffect(function () {
        if (listening) {
            setMessage("Ok, Now I'm listening!");
        }
        else {
            if(promptFinished) {
                setMessage("I need to hear you to help 8)");
            }
        }
    }, [listening])


    return (
        <div>
            {/*<p>Microphone: {listening ? 'on' : 'off'}</p>*/}
            <div className={"centered"}>
                <Button id={"mic-button"} inverted={true} size={"large"}  icon={(!listening) ? "microphone" : "circle red"} basic
                        style={ (listening) ? {color: "red !important"} : {}}
                         onClick={(listening) ? SpeechRecognition.stopListening :
                             () => {SpeechRecognition.startListening({ continuous: true }); clearMessage();}}></Button>
            </div>
            <p className={"transcript"}>{message}</p>
            {promptFinished && <p className={"transcript"}>{transcript}</p> }
        </div>
    );
};
export default Dictaphone;