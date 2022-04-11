import * as React from "react";
import { useRealmApp } from "../../components/RealmApp";
import { Button, Container } from '@material-ui/core';
import './ModuleQuizPage.css';
import QuestionCard from './QuestionCard';
import { useParams } from "react-router-dom";
import { useModules } from "../../hooks/useModules";
import { useQuizQuestions } from "../../hooks/useQuizQuestion";
import { useUserModules } from "../../hooks/useUserModules";


let userAnswersArray = [];

const radioChangeHandler = (index, event) => {
    userAnswersArray[index] = event.target.value;
}


const DisplayQuizQuestions = props => {
    return (
        <div className='card-list'>
            {props.questions.map((question, i) => {
                return (
                    <QuestionCard key={i} cardNumber={i} cardQuestion={question} radioChangeHandler={(e) =>radioChangeHandler(i, e)}/>
                );
            })}
        </div>
    )
}

export default function ModuleQuizPage() {
    const realmApp = useRealmApp();
    const { modules } = useModules();
    const { id } = useParams();

    const { makeAttempt } = useUserModules();
    const { quizQuestions } = useQuizQuestions();

    const [module, setModule] = React.useState();

    React.useEffect(() => {
        let thisModule = modules.find(m => String(m._id) === id);
        setModule(thisModule);
    }, [modules, quizQuestions]);

    const onSubmitQuiz = async () => {
        let numRight = quizQuestions.reduce((acc, q, i) => q.answer.toLowerCase() == (userAnswersArray[i] ?? "").toLowerCase() ? ++acc : acc, 0)
        let score = (numRight / quizQuestions.length) * 100;
        alert(`You scored ${Math.round(score)}%`);
        const attempt = {
            moduleId: module._id,
            score: score 
        }
        try {
            await makeAttempt(attempt);
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <Container className='quiz-container'>
            <h1>{ module?.name } Quiz</h1>
            <p>You must score 75% or higher to pass.</p>
            <DisplayQuizQuestions questions={quizQuestions} />
            <Button onClick={onSubmitQuiz} className='submit-button' variant='contained' size='large' color='primary'>SUBMIT</Button>
        </Container>
    );
}