import * as React from "react";
import { useCourses } from "../../hooks/useCourses";
import { useModules } from "../../hooks/useModules";
import { Card, Grid, Typography, Container, CardMedia, CardContent, Button, CardActions, Divider } from "@material-ui/core";



export default function CourseModulesPage() {

    const { loading, modules } = useModules();
    const { courses } = useCourses();

    return (
        <div>
            <Container sx={{ py: 8 }} maxWidth="md">
                <Typography variant="h2" component="div">
                    Course Name
                </Typography>
                <Typography variant="h5" component="div">
                    Modules
                </Typography>
                <hr/>
                {/* End hero unit */}
                <Grid container spacing={3}>
                    {modules.map((card) => (
                        <Grid item key={card} xs={12} sm={6} md={4}>
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
                                        { card.name }
                                    </Typography>
                                    <Typography noWrap>
                                        { card.description }
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small">Enter</Button>
                                    {/* <Button size="small">Edit</Button> */}
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </div>

    );

}