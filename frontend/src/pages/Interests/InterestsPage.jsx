import * as React from "react";
import "./InterestsPageStyle.css";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { Fab } from "@material-ui/core";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { CardActionArea, Container } from '@material-ui/core';



let interests = [
    {
        InterestName: "Technology",
        InterestImage: "https://cdn-icons.flaticon.com/png/512/4365/premium/4365271.png?token=exp=1649655256~hmac=7b55893d58520ddea02e5632d9ec4a48"
    },
    {
        InterestName: "UX/UI",
        InterestImage: "https://cdn-icons.flaticon.com/png/512/1367/premium/1367672.png?token=exp=1649667176~hmac=ff499f00476b20b001d4fd429dc58f86"
    },
    {
        InterestName: "Game Design",
        InterestImage: "https://cdn-icons-png.flaticon.com/512/141/141073.png"
    },
    {
        InterestName: "Music",
        InterestImage: "https://cdn-icons-png.flaticon.com/512/4472/4472592.png"
    },
    {
        InterestName: "Cooking",
        InterestImage: "https://cdn-icons-png.flaticon.com/512/1689/1689198.png"
    },
    {
        InterestName: "Web Development",
        InterestImage: "https://cdn-icons.flaticon.com/png/512/2828/premium/2828990.png?token=exp=1649667287~hmac=c2dcf80fb43923c3c9c0f5e267c38889"
    },
    {
        InterestName: "Theatre",
        InterestImage: "https://cdn-icons.flaticon.com/png/512/1655/premium/1655698.png?token=exp=1649745314~hmac=db134a3b1eb2a37f00855c331572df38"
    }
    ,
    {
        InterestName: "Fitness",
        InterestImage: "https://cdn-icons.flaticon.com/png/512/2974/premium/2974977.png?token=exp=1649745383~hmac=817fb495b17e293307faf741e820dc4b"
    }
]

function InterestCard(props) {
    const { name, image, add, remove } = props

    const [isSelected, setIsSelected] = React.useState(false)

    function test() {

        if (isSelected) {
            setIsSelected(false)
            remove(name)
        }
        else {
            setIsSelected(true)
            add(name)
        }
    }

    return (
        <Card onClick={test} style={{ height: 240, margin: 5, width: 200, backgroundColor: isSelected ? "green" : '#F1F3F4' }} variant="outlined">
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="180"
                    image={image}
                />
                <CardContent
                    height="50"
                >
                    <p style={{ textAlign: 'center' }}>{name}</p>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

function DisplayAllCards() {
    let userInterests = []

    function addInterest(name) {
        userInterests.push(name)
        console.log(userInterests);

    }

    function removeInterest(name) {
        userInterests = userInterests.filter(e => e !== name);
        console.log(userInterests);
    }


    return (
        interests.map(element => {
            return (
                <InterestCard name={element.InterestName} image={element.InterestImage} add={addInterest} remove={removeInterest} />
            )
        }

        )
    );
}

const nextButtonStyle = {
    borderRadius: 50,
    padding :25,
    margin: 30,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed',
};


function NextButton() {

    const navigate = useNavigate();

    const redirect = () => {
    navigate('/Home/HomePage.jsx')
    }

    return (
        <Fab className="nextButton" 
            size="large"
            color="primary"
            variant="contained"
            style={nextButtonStyle}
            onClick={redirect}
            >
            Next
        </Fab>
    );
};

export default function InterestsPage() {
    return (
        <nav>
            <div className="h2container">
                <h1 className="InterestPageHeading"> Choose your interests</h1>
            </div>
            <div className="CardsContainer">
                <DisplayAllCards />
            </div>
            <NextButton/>
        </nav>

    );
}