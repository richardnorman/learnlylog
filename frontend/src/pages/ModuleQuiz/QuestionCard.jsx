import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import './QuestionCard.css';

const QuestionCard = props => {
    const BlueRadio = withStyles({
        root: {
            color: '#default',
            '&$checked': {
                color: '#3f51b5',
            },
        },
        checked: {},
    })((props) => <Radio color="default" {...props} />);

    return (
        <Card className='question-card'>
            <CardContent>
                <Typography>
                    {props.cardQuestion.prompt}
                </Typography>
                {props.cardQuestion.type == 'mc' ? <RadioGroup onChange={props.radioChangeHandler}>
                    {props.cardQuestion.options.map((answer, i) => {
                        return (
                            <FormControlLabel
                                key={i}
                                value={answer}
                                control={<BlueRadio />}
                                label={answer.replace('*', '')}
                            />
                        );
                    })}
                </RadioGroup> :
                    <TextField id="standard-basic" label="Answer..." variant="standard" onChange={props.radioChangeHandler} />
                }
            </CardContent>
        </Card>
    );
}

export default QuestionCard;