import React from "react";
import { useWatch } from "./useWatch";
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
            setUserModules(fetchedUserModules.filter(m => m._partition === realmApp.currentUser.id));
            setLoading(false);
        });
    }, [userModuleCollection]);

    return {
        loading,
        userModules
    };

}