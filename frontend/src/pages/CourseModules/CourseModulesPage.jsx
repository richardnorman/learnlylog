import React, { useState, useEffect } from "react"
import { useCourses } from "../../hooks/useCourses";
import { useModules } from "../../hooks/useModules";
import { Card, Grid, Typography, Container, CardMedia, CardContent, Button, CardActions, CardHeader, Avatar } from "@material-ui/core";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "./CourseModulesPage.css";
import { useCourseEnrollment } from "../../hooks/useCourseEnrollment";
import { useUserModules } from "../../hooks/useUserModules";
import { red, purple, green, yellow, grey } from '@material-ui/core/colors';


const getAvatarColor = (score) => {
    if (!score) {
        return purple[200];
    } else if (score <= 50) {
        return red[200];
    } else if (score <= 75) {
        return yellow[200];
    } else {
        return green[200];
    }
}

const ModuleCard = (props) => {
    return (
        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardHeader
                avatar={
                    <Avatar style={{ backgroundColor: getAvatarColor(props.attempt?.bestScore) }} aria-label="attempt">
                        <Typography variant="caption" display="block" style={{color: grey[900]}}>{props.attempt ? `${props.attempt.bestScore}%` : "N/A"}</Typography>
                    </Avatar>
                }
                title={props.module.name}
                subheader={props.attempt ? `Last: ${props.attempt.lastAttempt.toLocaleDateString()} ${props.attempt.lastAttempt.toLocaleTimeString()}` : "Incomplete"}
            />
            <CardMedia
                component="img"
                height="200"
                image={`https://source.unsplash.com/random/?${props.course?.name},${props.module.name}`}
                alt="random"
            />
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography noWrap>
                    {props.module.description}
                </Typography>
            </CardContent>
            <CardActions>
                <Link to={`/module/${props.module._id}`}>
                    <Button size="small" variant="contained" color="primary">View</Button>
                </Link>
                <Link to={`/module-quiz/${props.module._id}`}>
                    <Button size="small" variant="contained" color="primary">{props.attempt?.bestScore >= 75 ? "Retake" : "Take"} Quiz</Button>
                </Link>
            </CardActions>
        </Card>
    );
}

export default function CourseModulesPage() {

    const { loading, modules } = useModules();
    const { isEnrolled, enrollCourse, dropCourse } = useCourseEnrollment();
    const { userModules, getAttempt } = useUserModules();
    const { coursesLoading, courses } = useCourses();
    const [course, setCourse] = useState(null);
    const [completed, setCompleted] = useState();
    const { id } = useParams();

    const userEnrolled = () => course ? isEnrolled(course._id) : false;
    const buttonText = () => userEnrolled() ? "Drop" : "Enroll";

    useEffect(() => {
        let thisCourse = courses.find(c => String(c._id) === id);
        setCourse(thisCourse);
    }, [courses, modules, userModules]);

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
                <Button onClick={enrollAction} className="enrollment-btn" variant="outlined" color={userEnrolled() ? "secondary" : "primary"}>
                    {`${buttonText()} Course`}
                </Button>
            </Typography>
            <p>Objective: {course?.description}</p>
            <hr />
            {/* End hero unit */}
            <Grid container spacing={3}>
                {modules.map((module, i) => {
                    let attempt = getAttempt(module._id);
                    if (!attempt || attempt.bestScore < 75) {
                        return (
                            <Grid item key={i} xs={12} sm={6} md={4}>
                                <ModuleCard course={course} module={module} attempt={attempt} />
                            </Grid>
                        )
                    } 
                })}
            </Grid>
            <hr />
            <Typography variant="h5" component="div">
                Completed
            </Typography>
            <Grid container spacing={3}>
                {modules.map((module, i) => {
                    let attempt = getAttempt(module._id);
                    if (attempt && attempt.bestScore >= 75) {
                        return (
                            <Grid item key={i} xs={12} sm={6} md={4}>
                                <ModuleCard course={course} module={module} attempt={attempt} />
                            </Grid>
                        )
                    } 
                })}
            </Grid>
        </Container>



    );

}