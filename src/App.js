import logo from './logo.svg';
import './App.css';
import {Button} from "semantic-ui-react";
import Dictaphone from "./Components/Dictaphone";
import {useState, useEffect} from "react";
import $ from 'jquery';
import {PROMPTS} from './constants.js';
import {clear} from "@testing-library/user-event/dist/clear";
// import 'semantic-ui-css/semantic.min.css';
// import './semantic.css';
const speed = 50;
var i =0;
function App() {
    const [page, setPage] = useState(0)
    const [promptFinished, setPromptFinished] = useState(false)

    function typeWriter(id, txt) {
        if (i < txt.length) {
            if(txt.charAt(i) === '*') {
                i++;
                let seconds = parseInt(txt.charAt(i));
                let ms = seconds * 1000;
                i++;
                addChar(id, txt, ms);
            }
            else if(txt.charAt(i) === '.' || txt.charAt(i) === '?') {
                addChar(id, txt, 2000);
            }
            else if(txt.charAt(i) === ',') {
                addChar(id, txt, 200);
            }
            else if(txt.charAt(i) === '$') {
                clearTxt(id, txt)
            }
            else {
                addChar(id, txt);
            }
        }
        else {
            setPromptFinished(true)
        }
    }

    function clearTxt(id, txt) {
        document.getElementById(id).innerHTML = "";
        i++;
        setTimeout(() => typeWriter(id, txt), speed);
    }
    function addChar(id, txt, s=speed) {
        document.getElementById(id).innerHTML += txt.charAt(i);
        i++;
        setTimeout(() => typeWriter(id, txt), s);
    }

    function startDream() {
        $(".page" +page).fadeOut(1000, function (){
            $(".page" +(page+1)).fadeIn(1000);
            setPromptFinished(false)
            document.getElementById("prompt").innerHTML = "";
            i = 0;
            typeWriter("prompt", PROMPTS[page+1])
            setPage(page+1);
        });
    }
    useEffect(function (){
        $(".page1").fadeOut(0);
        $(".page2").fadeOut(0);
        $(".page3").fadeOut(0);
    }, [])
    return (
    <div className="App">
        <div id={"help"}>?</div>
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
    </div>
  );
}

export default App;
