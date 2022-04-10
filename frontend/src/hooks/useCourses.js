import React from "react";
import { useWatch } from "./useWatch";
import { useCollection } from "./useCollection";
import { useRealmApp } from "../components/RealmApp";
import { dataSourceName } from "../realm.json";


export function useCourses() {
    // Set up a list of courses in state
    const realmApp = useRealmApp();
    const [courses, setCourses] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    // Get a client object for the todo task collection
    const courseCollection = useCollection({
        cluster: dataSourceName,
        db: "LearnlyLog",
        collection: "Course",
    });

    // Fetch all courses on load and whenever our collection changes (e.g. if the current user changes)
    React.useEffect(() => {
        courseCollection.find({}).then((fetchedCourses) => {
            setCourses(fetchedCourses);
            setLoading(false);
        });
    }, [courseCollection]);

    return {
        loading,
        courses
    };

}