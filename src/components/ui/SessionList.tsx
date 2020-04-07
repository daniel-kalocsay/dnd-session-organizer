import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";

import Session from "./Session";

<<<<<<< HEAD
export const SessionList = () => {
  const [sessions, setSessions] = useState([] as any[]);

  //TODO fetch sessions belonging to the user
  useEffect(() => {
    let mySessions = [
      { id: "1", name: "my session", clicked: false },
      { id: "2", name: "my second session", clicked: false }
    ];
    setSessions(mySessions);
  }, []);

  const handleClick = (id: string) => {
    let newSessions = sessions.map(session => {
      return { id: session.id, name: session.name, clicked: session.id === id };
    });

    setSessions(newSessions);
  };

  return (
    <div>
      {sessions.map(session => (
        <div onClick={() => handleClick(session.id)}>
          <Session sessionData={session} />
=======
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";

const SessionList = () => {
    const [sessions, setSessions] = useState([] as any[]);

    //TODO fetch sessions belonging to the user
    useEffect(() => {
        let mySessions = [
            {id: "1", name: "my first session", players: 4, combatfields: 2},
            {id: "2", name: "my second session", players: 2, combatfields: 0},
            {id: "3", name: "my third session", players: 8, combatfields: 1},
            {id: "4", name: "my fourth session", players: 4, combatfields: 6},
            {id: "5", name: "my fifth session", players: 5, combatfields: 3},
            {id: "6", name: "my sixth session", players: 1, combatfields: 5},
            {id: "7", name: "my seventh session", players: 0, combatfields: 1},
            {id: "8", name: "my eighth session", players: 3, combatfields: 2},
        ];
        setSessions(mySessions);
    }, []);

    return (
        <div style={styles.sessionListContainer}>
            {sessions.map(session => (
                <div style={styles.cardContainer}>

                    <Card style={styles.card}>
                        <CardHeader title={session.name} />
                        <CardContent>
                            <p>created on: just now</p>
                            <p>{session.players} players</p>
                            <p>{session.combatfields} combat fields</p>

                            <Link to={"/combat"}>Combatfields</Link>
                        </CardContent>
                    </Card>

                    <Session sessionData={session}/>

                </div>
            ))}
>>>>>>> 41751cb9ac78445b9a593f5d50701b2c6ffd76fc
        </div>
    );
};

export default SessionList;

const styles = {
    sessionListContainer: {
        display: "grid",
        gridGap: "1em",
        gridTemplateColumns: "repeat(auto-fill, minmax(100px, 300px))",
        gridTemplateRows: "repeat(auto-fill, 1fr)",
    },
    cardContainer: {
        // maxWidth: 350,
        // cursor: "pointer"
    },
    card: {
        backgroundColor: "#eee",
    }
};
