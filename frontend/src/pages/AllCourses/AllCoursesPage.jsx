import React, { useState, useEffect } from "react";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { CardActionArea, Container } from '@material-ui/core';
import { Link } from "react-router-dom";
import IconButton, { IconButtonProps } from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import SearchBar from "material-ui-search-bar";
import { useCourses } from "../../hooks/useCourses";


const ListOfCourses = props => {

    return props.courses.map(course => {
        return (
            <Link to={`/course-modules/${course._id}`} className="cards">

                <Card style={{ height: 250, margin: 5 }} sx={{ maxWidth: 250 }}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            height="100"
                            image={course.image}
                            alt="image-list"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {course.name}
                            </Typography>
                            <Typography color="text.secondary">
                               { course.description }
                            </Typography>
                        </CardContent>
                        <IconButton aria-label="add to favorites">
                            <FavoriteIcon />
                        </IconButton>
                        <IconButton aria-label="share">
                            <ShareIcon />
                        </IconButton>
                    </CardActionArea>
                </Card>
            </Link>
        )
    }
    )
}




export default function AllCourses() {

    const { courses, loading } = useCourses();
    const [filteredCourses, setCourses] = useState([]);

    useEffect(() => {
        setCourses(courses);
    }, [courses])

    const doSomethingWith = (query) => {
        if (query.length) {
            let searchStr = query.toLowerCase().trim();
            let filtered = courses.filter(c => c.name.toLowerCase().includes(searchStr));
            setCourses(filtered);
        } else {
            setCourses(courses);
        }
    }

    return (

        <Container className="main-container">
            <div>
                <h1>All Courses</h1>
                <SearchBar
                    onChange={(newValue) => doSomethingWith(newValue)}
                    onCancelSearch={() => setCourses(courses)}
                />
            </div>
            <div>
                <ListOfCourses courses={filteredCourses} />
            </div>
        </Container>
    );
}