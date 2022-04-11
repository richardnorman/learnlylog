import React from "react";
import { useWatch } from "./useWatch";
import { useCollection } from "./useCollection";
import { useRealmApp } from "../components/RealmApp";
import { dataSourceName } from "../realm.json";


export function useQuizQuestions() {
    // Set up a list of quizQuestions in state
    const realmApp = useRealmApp();
    const [quizQuestions, setQuizQuestions] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    // Get a client object for the todo task collection
    const quizQuestionCollection = useCollection({
        cluster: dataSourceName,
        db: "LearnlyLog",
        collection: "QuizQuestion",
    });

    // Fetch all quizQuestions on load and whenever our collection changes (e.g. if the current user changes)
    React.useEffect(() => {
        quizQuestionCollection.find({}).then((fetchedQuizQuestions) => {
            setQuizQuestions(fetchedQuizQuestions);
            setLoading(false);
        });
    }, [quizQuestionCollection]);

    return {
        loading,
        quizQuestions
    };

}