import logo from './logo.svg';
import './App.css';
import {Button} from "semantic-ui-react";
import Dictaphone from "./Components/Dictaphone";
import {useState} from "react";

function App() {
    const [page, setPage] = useState(1)
    function startDream() {

        setPage(page+1)
    }
    return (
    <div className="App">
        {/*<div id={"dictaphone"}>*/}
        {/*    <Dictaphone/>*/}
        {/*</div>*/}
        <img id="cloud-img" src={"wispy2.png"}/>
        { page === 1 &&
            <div id={"page1"}>
                <div id={"help"}>?</div>
                {/*<img id="day-img" src={"day.png"}/>*/}
                <img id={"dream-generator-logo"} style={{opacity: ".8"}} src={"title.png"}/>
                <div className={"centered"} id={"start-button"}>
                <Button id={"start-button"} onClick={startDream} inverted={true} size={"massive"} content='START' basic />
                </div>
            </div>
        }
    </div>
  );
}

export default App;
