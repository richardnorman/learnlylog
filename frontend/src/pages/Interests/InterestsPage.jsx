import * as React from "react";
import "./InterestsPageStyle.css";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
//from '@material-ui/icons';
//import Typography from '@material-ui/core/Typography';
import { CardActionArea, Container } from '@material-ui/core';
//import PropTypes from 'prop-types';
//import LinearProgress from '@material-ui/core/LinearProgress';
//import Box from '@material-ui/core/Box';
//import Fab from '@material-ui/core/Fab';


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
    }
]

function DisplayAllCards() {
    return (
        interests.map(element => {
            return (
                <Card style={{ height: 240, margin: 5, width: 200, backgroundColor: '#F1F3F4' }} variant="outlined">
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            height="180"
                            image={element.InterestImage}
                        />
                        <CardContent
                            height="50"
                        >
                            <p style={{ textAlign: 'center' }}>{element.InterestName}</p>
                        </CardContent>
                    </CardActionArea>
                </Card>
            )
        }

        )
    );
}



export default function InterestsPage() {
    return (
        <nav>
            <div className="h2container">
                <h1 className="InterestPageHeading"> Choose your interests</h1>
            </div>
            <div className="CardsContainer">
                <DisplayAllCards />
            </div>
        </nav>

    );
}