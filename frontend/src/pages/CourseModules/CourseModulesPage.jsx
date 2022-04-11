import React, { useState, useEffect } from "react"
import { useCourses } from "../../hooks/useCourses";
import { useModules } from "../../hooks/useModules";
import { Card, Grid, Typography, Container, CardMedia, CardContent, Button, CardActions } from "@material-ui/core";
import { useParams } from "react-router-dom";
import "./CourseModulesPage.css";
import { useCourseEnrollment } from "../../hooks/useCourseEnrollment";


export default function CourseModulesPage() {

    const { loading, modules } = useModules();
    const { isEnrolled, enrollCourse, dropCourse } = useCourseEnrollment();
    const { coursesLoading, courses } = useCourses();
    const [course, setCourse] = useState(null);
    const { id } = useParams();

    const userEnrolled = () => course ? isEnrolled(course._id) : false;
    const buttonText = () => userEnrolled() ? "Drop" : "Enroll";
    
    useEffect(() => {
        console.log(id);
        let thisCourse = courses.find(c => String(c._id) === id);
        setCourse(thisCourse);
        return () => {
            
        }
    }, [courses]);

    const enrollAction = async () => {
        if (userEnrolled()) {
            let confirmed = window.confirm("Are you sure? You will lose all progress in this course including quiz scores, completion, and baddges.");
            if (confirmed)
                await dropCourse(course?._id);
        } else {
            await enrollCourse(course?._id);
        }
        window.location.reload();   // too lazy to update the ui
    }

    return (
        <Container className="main-container" maxWidth="md">

            <Typography variant="h2" component="div">
                {course?.name}
                <Button onClick={enrollAction} className="enrollment-btn" variant="contained" color={userEnrolled() ? "secondary" : "primary"}>
                    { `${buttonText()} Course` }
                </Button>
            </Typography>
            <Typography variant="h5" component="div">
                Modules
            </Typography>
            <hr />
            {/* End hero unit */}
            <Grid container spacing={3}>
                {modules.map((card) => (
                    <Grid item key={card._id} xs={12} sm={6} md={4}>
                        <Card
                            sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                        >
                            <CardMedia
                                component="img"
                                height="200"
                                image="https://source.unsplash.com/random"
                                alt="random"
                            />
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {card.name}
                                </Typography>
                                <Typography noWrap>
                                    {card.description}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small">View</Button>
                                <Button size="small">Take Quiz</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>

    );

}