import logo from './logo.svg';
import './App.css';
import {Button} from "semantic-ui-react";
import Dictaphone from "./Components/Dictaphone";
import {useState, useEffect} from "react";
import $ from 'jquery';
import {PROMPTS, DESCRIPTION} from './constants.js';
import {typeWriter, cancelType} from "./Components/TypeWriter";
import {clear} from "@testing-library/user-event/dist/clear";
// import 'semantic-ui-css/semantic.min.css';
// import './semantic.css';

function App() {
    const [page, setPage] = useState(0);
    const [story, setStory] = useState("");
    const [promptFinished, setPromptFinished] = useState(false);
    const [helpPageOpen, setHelpPageOpen] = useState(false)


    function nextPage() {
        let classN = (page===0) ? ".page0" : ".page";
        $(classN).fadeOut(1000, function (){
            $(".page").fadeIn(1000);
            setPromptFinished(false)
            document.getElementById("prompt").innerHTML = "";
            if(page + 1 === PROMPTS.length) {
                document.getElementById("story").innerHTML = story;
                $("#full-story").fadeIn(1000);
            }
            else {

                typeWriter("prompt", PROMPTS[page + 1], () => setPromptFinished(true))
                setPage(page + 1);

            }
        });
    }
    useEffect(function (){
        $(".page").fadeOut(0);
        $("#full-story").fadeOut(0);
    }, [])

    useEffect(function (){
        console.log("help page is now ", helpPageOpen)
        if(helpPageOpen) {
            typeWriter("description", DESCRIPTION)
        }
    }, [helpPageOpen])

    // Execute a function when the user presses a key on the keyboard
    window.addEventListener("keypress", function(event) {
        // If the user presses the "Enter" key on the keyboard
        //event.preventDefault();
        if (event.key === "Enter" && !promptFinished) {
            cancelType()
        }
    });

    function restart() {
        setStory("");
        setPage(0)
        $(".page").fadeOut(0);
        $("#full-story").fadeOut(0);
        $(".page0").fadeIn(1000);
    }


    return (
    <div className="App">
        <div onClick={() => setHelpPageOpen(!helpPageOpen)} id={"help-button"}>?</div>
        <img id="cloud-img" src={"wispy2.png"}/>
            {/*/***********************************************************************************************************/}
            {/*                                                                                                           */}
            {/*                                                Start Page                                                 */}
            {/*                                                                                                           */}
            {/* ********************************************************************************************************* */}
            <div className={"page0"}>
                {/*<img id="day-img" src={"day.png"}/>*/}
                <img id={"dream-generator-logo"} style={{opacity: ".8"}} src={"title.png"}/>
                <div className={"centered"} >
                <Button className={"pronounced-button"} id={"start-button"} onClick={nextPage} inverted={true} size={"massive"} content='START' basic />
                </div>
            </div>
            {/*/***********************************************************************************************************/}
            {/*                                                                                                           */}
            {/*                                                Prompt Pages                                               */}
            {/*                                                                                                           */}
            {/* ********************************************************************************************************* */}
            <div className={"page"}>
                <div id={"prompt"}></div>
                <div id={"dictaphone"}>
                    <Dictaphone nextPage={nextPage} promptFinished={promptFinished} story={story} setStory={setStory}/>
                </div>
            </div>

        {/*/***********************************************************************************************************/}
        {/*                                                                                                           */}
        {/*                                                Final Page                                                 */}
        {/*                                                                                                           */}
        {/* ********************************************************************************************************* */}
        <div id={"full-story"}>
            <div className={"medium"} id={"story"}></div>
            <Button id={"save-button"} className={"pronounced-button"}  inverted={true} size={"massive"} content='SAVE' basic />
            <Button id={"save-button"} onClick={restart} className={"pronounced-button"}  inverted={true} size={"massive"} content='RESTART' basic />

        </div>
            {/*/***********************************************************************************************************/}
            {/*                                                                                                           */}
            {/*                                                   Help                                                    */}
            {/*                                                                                                           */}
            {/* ********************************************************************************************************* */}
            {helpPageOpen &&
            <div id={"help-page"}>
                <img id="cloud-img" src={"wispy2.png"}/>
                <div onClick={() => setHelpPageOpen(!helpPageOpen)} className={"medium right close"}>X</div>
                <div className={"linebreak"}></div>
                <div id="description" className={"medium description"}></div>
                <div className={"linebreak"}></div>
                <div className={"medium commands"}>verbal commands</div>
                <div className={"linebreak"}></div>
                <div id={"command-container"}>
                    <div className={"medium left half"}>Save  </div><div className={"medium right half"}>Saves Response</div>
                    <div className={"medium left half"}>Clear  </div><div className={"medium right half"}>Clears Response</div>
                    <div className={"medium left half"}>Restart </div><div className={"medium right half"}>Restarts Prompt</div>
                </div>

            </div>}
    </div>
  );
}

export default App;
