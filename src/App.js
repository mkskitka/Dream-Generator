import logo from './logo.svg';
import './App.css';
import {Button} from "semantic-ui-react";
import Dictaphone from "./Components/Dictaphone";
import {useState, useEffect} from "react";
import $ from 'jquery';
import {PROMPTS} from './constants.js';

function App() {
    const [page, setPage] = useState(0)

    function startDream() {
        $(".page" +page).fadeOut(1000, function (){
            $(".page" +(page+1)).fadeIn(1000);
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
                <div id={"prompt"}>{PROMPTS[page]}</div>
                <div id={"dictaphone"}>
                    <Dictaphone nextPage={startDream}/>
                </div>
            </div>
    </div>
  );
}

export default App;
