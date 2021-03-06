import React from "react";
import { useWatch } from "./useWatch";
import * as Realm from "realm-web";
import { useCollection } from "./useCollection";
import { useRealmApp } from "../components/RealmApp";
import { dataSourceName } from "../realm.json";


export function useCourseEnrollment() {
    // Set up a list of courses in state
    const realmApp = useRealmApp();
    const [enrollments, setCourseEnrollment] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    // Get a client object for the todo task collection
    const enrollmentCollection = useCollection({
        cluster: dataSourceName,
        db: "LearnlyLog",
        collection: "CourseEnrollment",
    });

    // Fetch all courses on load and whenever our collection changes (e.g. if the current user changes)
    React.useEffect(() => {
        enrollmentCollection.find({}).then((fetchedCourseEnrollment) => {
            setCourseEnrollment(fetchedCourseEnrollment);
            setLoading(false);
        });
    }, [enrollmentCollection]);

    const isEnrolled = (id) => {
        return enrollments.findIndex(e => String(e.courseId) === String(id) && e._partition == realmApp.currentUser.id) >= 0;
    }

    /**
     * Get the current user's enrolled courses
     * @returns a list of CourseEnrollments for the current user
     */
    const getUserEnrollments = () => {
        return enrollments.filter(e => e._partition === realmApp.currentUser.id);
    }

    const dropCourse = async (id) => {
        await enrollmentCollection.deleteOne({ _partition: realmApp.currentUser.id, courseId: id });
    }

    const enrollCourse = async (id) => {
        try {
            await enrollmentCollection.insertOne({
                _id: new Realm.BSON.ObjectID(),
                _partition: realmApp.currentUser.id,
                courseId: id,
                startDate: new Date()
            });
          } catch (err) {
            // already enrolled if dup
            console.error(err);
          }
    }


    return {
        loading,
        enrollments,
        dropCourse,
        enrollCourse,
        isEnrolled,
        getUserEnrollments
    };

}