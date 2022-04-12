import * as React from "react";
import "./InterestsPageStyle.css";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { Fab } from "@material-ui/core";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { CardActionArea, Container, Grid, Typography } from '@material-ui/core';
import { purple } from '@material-ui/core/colors';




let interests = [
    {
        InterestName: "Technology",
        InterestImage: "https://cdn-icons-png.flaticon.com/512/490/490498.png"
    },
    {
        InterestName: "UX/UI",
        InterestImage: "https://cdn-icons-png.flaticon.com/512/1055/1055666.png"
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
        InterestImage: "https://cdn-icons-png.flaticon.com/512/977/977597.png"
    },
    {
        InterestName: "Theatre",
        InterestImage: "https://cdn-icons-png.flaticon.com/512/1778/1778557.png"
    }
    ,
    {
        InterestName: "Fitness",
        InterestImage: "https://cdn-icons-png.flaticon.com/512/1719/1719714.png"
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
        <Grid item key={props.name} xs={12} sm={4} md={3}>                          
            <Card onClick={test} style={{ backgroundColor: isSelected ? purple[200] : '#F1F3F4' }} variant="outlined">
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
        </Grid>
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
    padding: 25,
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
        navigate("/")
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
        <Container className="main-container" maxWidth="md">
            <div style={{ textAlign: "center"}}>
                <Typography variant="h3" gutterBottom component="div">
                    Choose your interests
                </Typography>
            </div>
            <Grid container spacing={3}>
                <DisplayAllCards />
            </Grid>
            <NextButton />
        </Container>

    );
}