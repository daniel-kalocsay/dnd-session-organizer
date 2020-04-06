import React, {useState, useEffect} from "react";
import Session from "./Session";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";

const SessionList = () => {
    const [sessions, setSessions] = useState([] as any[]);

    //TODO fetch sessions belonging to the user
    useEffect(() => {
        let mySessions = [
            {id: "1", name: "my first session", clicked: false},
            {id: "2", name: "my second session", clicked: false},
            {id: "3", name: "my third session", clicked: false},
            {id: "4", name: "my fourth session", clicked: false},
            {id: "5", name: "my fifth session", clicked: false},
            {id: "6", name: "my sixth session", clicked: false},
            {id: "7", name: "my seventh session", clicked: false},
            {id: "8", name: "my eighth session", clicked: false},
        ];
        setSessions(mySessions);
    }, []);

    const handleClick = (id: string) => {
        let newSessions = sessions.map(session => {
            return {id: session.id, name: session.name, clicked: session.id === id};
        });

        console.log(newSessions);
        setSessions(newSessions);
    };

    return (
        <div style={styles.sessionListContainer}>
            {sessions.map(session => (
                <Card style={styles.card} onClick={() => handleClick(session.id)}>
                    <CardHeader title={session.name} />
                    <CardContent>{session.name}</CardContent>
                    <Session sessionData={session}/>
                </Card>
            ))}
        </div>
    );
};

export default SessionList;

const styles = {
    sessionListContainer: {
        display: "grid",
        gridGap: "1em",
        gridTemplateRows: "repeat(auto-fill, 1fr)",
        gridTemplateColumns: "repeat(5, 1fr)",
    },
    card: {
        maxWidth: 350,
        backgroundColor: "#eee",
        pointer: "cursor"
    }
};
