import React from "react";
import { useWatch } from "./useWatch";
import { useCollection } from "./useCollection";
import { useRealmApp } from "../components/RealmApp";
import { dataSourceName } from "../realm.json";


export function useModules() {
    // Set up a list of modules in state
    const realmApp = useRealmApp();
    const [modules, setModules] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    // Get a client object for the todo task collection
    const moduleCollection = useCollection({
        cluster: dataSourceName,
        db: "LearnlyLog",
        collection: "Module",
    });

    // Fetch all modules on load and whenever our collection changes (e.g. if the current user changes)
    React.useEffect(() => {
        moduleCollection.find({}).then((fetchedModules) => {
            setModules(fetchedModules);
            setLoading(false);
        });
    }, [moduleCollection]);

    return {
        loading,
        modules
    };

}