import React from "react";
import * as Realm from "realm-web";
import { useCollection } from "./useCollection";
import { useRealmApp } from "../components/RealmApp";
import { dataSourceName } from "../realm.json";


export function useUserModules() {
    // Set up a list of userModules in state
    const realmApp = useRealmApp();
    const [userModules, setUserModules] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    // Get a client object for the todo task collection
    const userModuleCollection = useCollection({
        cluster: dataSourceName,
        db: "LearnlyLog",
        collection: "UserModules",
    });

    // Fetch all userModules on load and whenever our collection changes (e.g. if the current user changes)
    React.useEffect(() => {
        userModuleCollection.find({}).then((fetchedUserModules) => {
            setUserModules(fetchedUserModules);
            setLoading(false);
        });
    }, [userModuleCollection]);

    const getAttempt = (moduleId) => {
        return userModules.find(a => a._partition === realmApp.currentUser.id && String(a.moduleId) === String(moduleId));
    }

    /**
     * Get all module completion attempts for the currently signed in user
     * @returns A list of UserModules
     */
    const getUserAttempts = () => {
        return userModules.filter(m => m._partition === realmApp.currentUser.id);
    }

    const makeAttempt = async (attempt) => {
        let previous = await userModuleCollection.findOne(
            {
                _partition: realmApp.currentUser.id,
                moduleId: attempt.moduleId
            });
        if (previous && attempt.score >= previous.bestScore) {
            return userModuleCollection.updateOne({
                    _partition: realmApp.currentUser.id,
                    moduleId: attempt.moduleId
                },
                {
                    bestScore: attempt.score,
                    lastAttempt: new Date(),
                    _partition: realmApp.currentUser.id,
                    moduleId: attempt.moduleId
                }
            )
        } else {
            return userModuleCollection.insertOne({
                _id: new Realm.BSON.ObjectID(),
                _partition: realmApp.currentUser.id,
                moduleId: attempt.moduleId,
                bestScore: Math.round(attempt.score),
                lastAttempt: new Date()
            });
        }
    }

    return {
        loading,
        userModules,
        makeAttempt,
        getUserAttempts,
        getAttempt
    };

}