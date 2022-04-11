import * as React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { CardActionArea, Container } from '@material-ui/core';
import PropTypes from 'prop-types';
import LinearProgress from '@material-ui/core/LinearProgress';
import Box from '@material-ui/core/Box';
import Fab from '@material-ui/core/Fab';
import { Link } from "react-router-dom";
import { useCourses } from "../../hooks/useCourses";
import './HomePage.css';
import { useCourseEnrollment } from '../../hooks/useCourseEnrollment';

// let courses = [
//     {
//         CourseName: "Hiking",
//         CourseImage: "https://images.theconversation.com/files/405661/original/file-20210610-18-imwshy.jpg?ixlib=rb-1.1.0&rect=6%2C0%2C4486%2C2997&q=45&auto=format&w=926&fit=clip",
//         IsTakingCourse: true,
//         CourseProgress: 75,
//         CourseID: 1
//     },
//     {
//         CourseName: "Boating",
//         CourseImage: "https://images.unsplash.com/photo-1520255870062-bd79d3865de7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Ym9hdGluZ3xlbnwwfHwwfHw%3D&w=1000&q=80",
//         IsTakingCourse: true,
//         CourseProgress: 30,
//         CourseID: 2
//     },
//     {
//         CourseName: "Farming",
//         CourseImage: "https://i.natgeofe.com/n/748f1c42-0d8b-498e-85fd-88151c6f863b/01_organic_farming_i8860_20181003_11260.jpg",
//         IsTakingCourse: true,
//         CourseProgress: 10,
//         CourseID: 3
//     },
//     {
//         CourseName: "Planets",
//         CourseImage: "https://i.natgeofe.com/k/d6f301e9-0c90-4379-9a64-1e1e9b048419/planetary-lineup_3x2.jpg",
//         IsTakingCourse: true,
//         CourseProgress: 0,
//         CourseID: 4
//     },
//     {
//         CourseName: "JavaScript",
//         CourseImage: "https://miro.medium.com/max/720/1*Aih9FwHjvM6AEL1aBh6W2g.png",
//         IsTakingCourse: true,
//         CourseProgress: 0,
//         CourseID: 5
//     },
//     {
//         CourseName: "C++ Fundamentals",
//         CourseImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/ISO_C%2B%2B_Logo.svg/1200px-ISO_C%2B%2B_Logo.svg.png",
//         IsTakingCourse: false,
//         CourseProgress: 0,
//         CourseID: 6
//     },
//     {
//         CourseName: "HTML",
//         CourseImage: "https://www.computerhope.com/jargon/h/html-head.jpg",
//         IsTakingCourse: true,
//         CourseProgress: 100,
//         CourseID: 7
//     },
//     {
//         CourseName: "CSS",
//         CourseImage: "https://www.elegantthemes.com/blog/wp-content/uploads/2021/01/000-Basic-CSS.png",
//         IsTakingCourse: true,
//         CourseProgress: 0,
//         CourseID: 8
//     },
// ]

const DisplayCourses = props => {
    return props.courses.map(course => {
            let progress = 10;  // %
            return (
                <Link to={`course-modules/${course._id}`} className="course-card" style={{ textDecoration: "none" }}>
                    <Card style={{ height: 250, margin: 5 }} sx={{ maxWidth: 250 }}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="140"
                                image={course.image}
                                alt="course image"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    { course.name }
                                </Typography>
                                {props.isEnrolled ? null :
                                    <Typography noWrap variant="body2" color="text.secondary">
                                        { course.description }
                                    </Typography>}
                            </CardContent>
                        </CardActionArea>
                    </Card>
                    {props.isEnrolled ? <Box sx={{ display: 'flex' }} style={{ padding: 5 }}>
                        <Box sx={{ width: '95%', mr: 1 }}>
                            <LinearProgress borderRadius="5" variant="determinate" value={progress} />
                        </Box>
                        <Box sx={{ minWidth: 35, maxWidth: 250 }}>
                            <Typography variant="body2" color="text.secondary">{`${Math.round(
                                progress,      //fix
                            )}%`}</Typography>
                        </Box>
                    </Box> : null}
                </Link>
            )
    })
}

export default function HomePage() {
    const { courses, loading } = useCourses();
    const { isEnrolled } = useCourseEnrollment();

    return (
        <div className="page-content">
            <h2>My Courses</h2>
            <div className='my-courses-content'>
                <DisplayCourses courses={courses.filter(c => isEnrolled(c._id))} isEnrolled={true} />
            </div>
            <div id='all-courses-heading-content'>
                <h2>All Courses</h2>
                <p onClick={() => { alert("Display more courses!") }} style={{ marginRight: 20, cursor: 'pointer' }}><b>MORE COURSES &gt;</b></p>
            </div>
            <div className='all-courses-content'>
                <DisplayCourses courses={courses.filter(c => !isEnrolled(c._id))} isEnrolled={false} />
            </div>
            <Link to="/chat">
                <Fab color='primary' className='chat-button' variant="extended">
                    <b>+ JOIN CHAT</b>
                </Fab>
            </Link>
        </div>

    );
}