import logo from './logo.svg';
import './App.css';
import {Button} from "semantic-ui-react";
import Dictaphone from "./Components/Dictaphone";
import {useState, useEffect} from "react";
import $ from 'jquery';
import {PROMPTS, DESCRIPTION} from './constants.js';
import {typeWriter} from "./Components/TypeWriter";
import {clear} from "@testing-library/user-event/dist/clear";
// import 'semantic-ui-css/semantic.min.css';
// import './semantic.css';

function App() {
    const [page, setPage] = useState(0)
    const [promptFinished, setPromptFinished] = useState(false);
    const [helpPageOpen, setHelpPageOpen] = useState(false)


    function startDream() {
        $(".page" +page).fadeOut(1000, function (){
            $(".page" +(page+1)).fadeIn(1000);
            setPromptFinished(false)
            document.getElementById("prompt").innerHTML = "";
            typeWriter("prompt", PROMPTS[page+1], () => setPromptFinished(true))
            setPage(page+1);
        });
    }
    useEffect(function (){
        $(".page1").fadeOut(0);
        $(".page2").fadeOut(0);
        $(".page3").fadeOut(0);
    }, [])

    useEffect(function (){
        console.log("help page is now ", helpPageOpen)
        if(helpPageOpen) {
            typeWriter("description", DESCRIPTION)
        }
    }, [helpPageOpen])


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
                <div className={"centered"} id={"start-button"}>
                <Button id={"start-button"} onClick={startDream} inverted={true} size={"massive"} content='START' basic />
                </div>
            </div>
            {/*/***********************************************************************************************************/}
            {/*                                                                                                           */}
            {/*                                                Prompt Pages                                               */}
            {/*                                                                                                           */}
            {/* ********************************************************************************************************* */}
            <div className={"page1 page2 page3"}>
                <div id={"prompt"}></div>
                <div id={"dictaphone"}>
                    <Dictaphone nextPage={startDream} promptFinished={promptFinished}/>
                </div>
            </div>
            {/*/***********************************************************************************************************/}
            {/*                                                                                                           */}
            {/*                                                   Help                                                    */}
            {/*                                                                                                           */}
            {/* ********************************************************************************************************* */}
            {helpPageOpen &&
            <div id={"help-page"}>
                <img id="cloud-img" src={"wispy2.png"}/>
                <div onClick={() => setHelpPageOpen(!helpPageOpen)} className={"big right close"}>X</div>
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
