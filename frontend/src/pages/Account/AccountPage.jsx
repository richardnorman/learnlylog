import * as React from "react";
import { RealmAppProvider, useRealmApp } from "../../components/RealmApp";


export default function AccountPage() {
    const { currentUser } = useRealmApp();
    return (
        <div>
            <h1>Account</h1>
            <pre>User: { JSON.stringify(currentUser, null, 2) }</pre>
        </div>
    );
}