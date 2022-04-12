import * as React from "react";
import ReactDOM from "react-dom"
import { AppBar, Toolbar, Button, Typography, IconButton, ButtonBase, Fab } from "@material-ui/core";
import { AccountCircle, CalendarToday, ExitToApp, Chat } from '@material-ui/icons';
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import "./ModulePage.css";

let moduleData = {
    "title": "Module",
    "properties": {
        "_id": {
            "bsonType": "objectId"
        },
        "courseId": {
            "bsonType": "objectId"
        },
        "description": {
            "bsonType": "This is module's description"
        },
        "name": {
            "bsonType": "Module Name"
        },
        "content": {
            "bsonType": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
        }
    }
}

let moduleName = moduleData.properties.name.bsonType
let moduleDescription = moduleData.properties.description.bsonType
let moduleContent = moduleData.properties.content.bsonType

console.log(moduleName);

function ModulePageHead(){
    return(
        <div className="modulePageHeadStyle">
            <h1>{moduleName}</h1>
        </div>
        
    );
};

function ModulePageDescription(){
    return(
        <h3>{moduleDescription}</h3>
    );
};

function ModulePageContent(){
    return(
        <p>{moduleContent}</p>
    );
};



const takeQuizButtonStyle = {
    borderRadius: 50,
    padding :25,
    margin: 30,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed',
};


function TakeQuizButton() {

    const navigate = useNavigate();

    const redirect = () => {
    navigate('/ModuleQuiz/ModuleQuizPage.jsx')
    }

    return (
        <Fab className="takeQuizButton" 
            size="large"
            color="primary"
            variant="contained"
            style={takeQuizButtonStyle}
            onClick={redirect}
            >
            Take Quiz
        </Fab>
    );
};


export default function ModulePage() {
    return (
        <nav>
            <ModulePageHead />
            <ModulePageDescription />
            <ModulePageContent />
            <TakeQuizButton />
        </nav>
    );
}

