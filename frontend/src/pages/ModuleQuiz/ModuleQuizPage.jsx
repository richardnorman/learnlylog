import * as React from "react";
import Button from '@material-ui/core/Button';
import './ModuleQuizPage.css';
import QuestionCard from './QuestionCard';

let quizQuestions = [
    {
        _id: 1,
        answer: 'b',
        moduleId: 123,
        options: ['a', 'b', 'c', 'd'],
        prompt: 'Here is a module quiz question?',
        type: 'mc'
    },
    {
        _id: 2,
        answer: 'd',
        moduleId: 123,
        options: ['a', 'b', 'c', 'd'],
        prompt: 'Here is a module quiz question?',
        type: 'mc'
    },
    {
        _id: 3,
        answer: 'short answer',
        moduleId: 123,
        options: [''],
        prompt: 'Here is a ________ quiz question?',
        type: 'sa'
    }
]

let userAnswersArray = [quizQuestions.length];

const radioChangeHandler = (event) => {
    let cardID = event.target.value[0];
    userAnswersArray[cardID] = event.target.value.substring(1, event.target.value.length - 1);
}

const DisplayQuizQuestions = props => {
    return (
        <div className='card-list'>
            {quizQuestions.map((question, i) => {
                return (
                    <QuestionCard key={i} cardNumber={i} cardQuestion={question} />
                );
            })}
        </div>
    )
}

export default function ModuleQuizPage() {
    return (
        <div className='quiz-container'>
            <h1>Module Quiz</h1>
            <DisplayQuizQuestions />
            <Button /*onClick={handler}*/ className='submit-button' variant='contained' size='large' color='primary'>SUBMIT</Button>
        </div>
    );
}