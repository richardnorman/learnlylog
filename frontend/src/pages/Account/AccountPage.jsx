import * as React from "react";
import { RealmAppProvider, useRealmApp } from "../../components/RealmApp";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { CardActionArea, Container, Grid } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
import ShareIcon from '@material-ui/icons/Share';
import IconButton, { IconButtonProps } from '@material-ui/core/IconButton';
import './AccountPage.css'

const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
    </Box>
);
export default function AccountPage() {
    const { currentUser } = useRealmApp();
    // alert(typeof currentUser);
    let currentUserJSON=JSON.stringify(currentUser);
    let userdata=JSON.parse(currentUserJSON);
    return (
        <div style={{ padding: 10 }} >
        <Grid container spacing={5}>
        <Grid item xs={6} md={6} lg={6}>
            <Card elevation={3}>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Email
                    </Typography>
                    <Typography variant="h5" component="div">
                    {userdata["profile"].data.email}
                    </Typography>
                    </CardContent>
            </Card>
            </Grid>
            <Grid item xs={6} md={6} lg={6}>
            <Card elevation={1}>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Password
                    </Typography>
                    <Typography variant="h5" component="div">
                         ******
                    </Typography>
                    
                </CardContent>
                <CardActions>
                </CardActions>
            </Card>
            </Grid>

            <Grid item xs={6} md={6} lg={6}>
            <Card elevation={1}>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Courses
                    </Typography>
                    <Typography variant="h5" component="div">
                        1.2%
                    </Typography>
                    <CardMedia
                        component="img"
                        height="150"
                        image="https://www.betterevaluation.org/sites/default/files/styles/feature_image/public/barchart.gif?itok=BiPcDxYw"
                        alt="Progress"
                    />
                </CardContent>
                <CardActions>
                </CardActions>
            </Card>
            </Grid>
            <Grid item xs={6} md={6} lg={6}>
            <Card elevation={1}>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Badges
                    </Typography>
                    <IconButton aria-label="share">
                            <ShareIcon />
                        </IconButton>

                    <CardMedia
                        component="img"
                        height="100"
                        image="https://static.vecteezy.com/system/resources/previews/002/299/635/non_2x/set-of-company-training-badge-certificates-to-determine-based-on-criteria-illustration-certified-logo-geometric-design-vector.jpg"
                        alt="Badges"
                    />
                
                </CardContent>
                <CardActions>
                </CardActions>
            </Card>
            </Grid>
            <Grid item xs={6} md={6} lg={6}>
            <Card elevation={3}>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Leaderboard
                    </Typography>
                    <Typography variant="h5" component="div">
                        #5-30000 pts
                    </Typography>
                </CardContent>
                <CardActions>
                </CardActions>
            </Card>
            </Grid>
            

            <Grid item xs={6} md={6} lg={6}>
            <Card elevation={1}>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Progress
                    </Typography>
                    <Typography variant="h5" component="div">
                        +3 Modules
                    </Typography>
                    <Typography sx={{ mb: 0.5 }} color="text.primary">
                         
                        +5% last 30 days
                    </Typography>

                
                </CardContent>
                <CardActions>
                </CardActions>
            </Card>
            </Grid>
            </Grid>
            
        
        </div>
    );
}