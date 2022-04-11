import React, { useState, useEffect } from "react";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { CardActionArea, Container } from '@material-ui/core';
import PropTypes from 'prop-types';
import LinearProgress from '@material-ui/core/LinearProgress';
import Box from '@material-ui/core/Box';
import Fab from '@material-ui/core/Fab';
import IconButton, { IconButtonProps } from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import SearchBar from "material-ui-search-bar";


// const { search } = window.location;
// const query = new URLSearchParams(search).get('s');
// const filterPosts = (courses, query) => {
//     if (!query) {
//         return courses;
//     }

//     return courses.filter((course) => {
//         const postName = course.CourseName.toLowerCase();
//         return postName.includes(query);
//     });
// };
// const filteredPosts = filterPosts(courses, query);

let coursesList = [
    {
        CourseName: "Hiking",
        CourseImage: "https://images.theconversation.com/files/405661/original/file-20210610-18-imwshy.jpg?ixlib=rb-1.1.0&rect=6%2C0%2C4486%2C2997&q=45&auto=format&w=926&fit=clip",
        IsTakingCourse: true,
        CourseID: 1
    }, 
    {
        CourseName: "Boating",
        CourseImage: "https://images.unsplash.com/photo-1520255870062-bd79d3865de7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Ym9hdGluZ3xlbnwwfHwwfHw%3D&w=1000&q=80",
        IsTakingCourse: true,
        CourseID: 2
    },
    {
        CourseName: "Farming",
        CourseImage: "https://i.natgeofe.com/n/748f1c42-0d8b-498e-85fd-88151c6f863b/01_organic_farming_i8860_20181003_11260.jpg",
        IsTakingCourse: true,
        CourseID: 3
    },
    {
        CourseName: "Planets",
        CourseImage: "https://i.natgeofe.com/k/d6f301e9-0c90-4379-9a64-1e1e9b048419/planetary-lineup_3x2.jpg",
        IsTakingCourse: false,
        CourseID: 4
    },
    {
        CourseName: "JavaScript",
        CourseImage: "https://miro.medium.com/max/720/1*Aih9FwHjvM6AEL1aBh6W2g.png",
        IsTakingCourse: false,
        CourseID: 5
    },
    {
        CourseName: "C++ Fundamentals",
        CourseImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/ISO_C%2B%2B_Logo.svg/1200px-ISO_C%2B%2B_Logo.svg.png",
        IsTakingCourse: false,
        CourseID: 6
    },
    {
        CourseName: "HTML",
        CourseImage: "https://www.computerhope.com/jargon/h/html-head.jpg",
        IsTakingCourse: false,
        CourseID: 7
    },
    {
        CourseName: "CSS",
        CourseImage: "https://www.elegantthemes.com/blog/wp-content/uploads/2021/01/000-Basic-CSS.png",
        IsTakingCourse: false,
        CourseID: 8
    },
]


const ListOfCourses = props => {
    
    return props.courses.map(course => {
            return (
                <div className="cards">
      
                <Card style={{height: 250, margin: 5}} sx={{ maxWidth: 250 }}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            height="100"
                            image={course.CourseImage}
                            alt="image-list"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {course.CourseName}
                            </Typography>
                            <Typography color="text.secondary">
                                #courses #learning #activities
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
                </div>
            )
        }
    )
}




export default function AllCourses() {
    // const [query, setQuery] = useState("");
    const [courses, setCourses] = useState([]);
    // const [query, setQuery] = useState("");
    // const filteredItems = getFilteredItems(query, courses);

    useEffect(() => {
        setCourses(coursesList);
    }, [])

    const doSomethingWith = (query) => {
        if (query.length) {
            let searchStr = query.toLowerCase().trim();
            let filteredCourses = coursesList.filter(c => c.CourseName.toLowerCase().includes(searchStr));
            setCourses(filteredCourses);
        } else {
            setCourses(coursesList);
        }
    }

    return (
        
        <div>
    <div>
        <h1>All Courses</h1>
        {/* <form action="/" method="get">
        <label htmlFor="header-search">
        </label>
        <input
            type="text"
            id="header-search"
            placeholder="Search All Courses"
            name="s" 
        />
        <button type="submit">Search</button>
    </form> */}
    <SearchBar
    onChange={(newValue) => doSomethingWith(newValue)}
    onCancelSearch={() => setCourses(coursesList)}
    // onRequestSearch={() => doSomethingWith()}
  />
    </div>
    <div>
        <ListOfCourses courses={courses} />
    </div>
</div>
    );
}