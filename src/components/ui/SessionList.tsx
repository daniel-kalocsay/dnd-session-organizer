import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import firebase from "firebase";
import { FirebaseContext } from "../contexts/FirebaseContext";
import { useAuthState } from "react-firebase-hooks/auth";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Button from "@material-ui/core/Button";

type QuerySnapshot = firebase.firestore.QuerySnapshot;
type DocumentSnapshot = firebase.firestore.DocumentSnapshot;

//TODO create a generic class
class sessionPreviewData {
  name: string;
  uid: string;
  createdOn: string;

  constructor(uid: string, name: string, createdOn: string) {
    this.uid = uid;
    this.name = name;
    this.createdOn = createdOn;
  }
}

const SessionList = () => {
  const sessionsRef = useContext(FirebaseContext)!.sessionsRef;
  const usersRef = useContext(FirebaseContext)!.usersRef;
  const [sessions, setSessions] = useState([] as sessionPreviewData[]);

  const auth = useContext(FirebaseContext)!.auth;
  const [user, initializing, authError] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      fetchSessions();
    }
  }, [user]);

  const fetchSessions = () => {
    usersRef
      .doc(user!.uid)
      .collection("sessions")
      .get()
      .then(function (querySnapshot: QuerySnapshot) {
        querySnapshot.forEach((data: DocumentSnapshot) => {
          sessionsRef
            .doc(data.id)
            .get()
            .then((sessionRecord: DocumentSnapshot) => {
              if (sessionRecord.exists) {
                let entry = sessionRecord.data();
                let data = new sessionPreviewData(
                  sessionRecord.id,
                  entry!.name,
                  entry!.created_on
                );
                setSessions((oldData) => [...oldData, data]);
              }
            });
        });
      });
  };

  //TODO im sure this can be done in a better way
  //TODO some response after deletion
  const deleteSession = (sessionId: string) => {
    sessionsRef
      .doc(sessionId)
      .collection("players")
      .get()
      .then(function (querySnapshot: QuerySnapshot) {
        querySnapshot.forEach((user: DocumentSnapshot) => {
          usersRef.doc(user.id).collection("sessions").doc(sessionId).delete();
        });
        querySnapshot.forEach((user: DocumentSnapshot) => {
          user.ref.delete();
        });
        sessionsRef.doc(sessionId).delete();
      });

    let updatedSessions = sessions.filter(
      (session: sessionPreviewData) => session.uid !== sessionId
    );
    setSessions(updatedSessions);
  };

  return (
    <div style={styles.sessionListContainer}>
      {sessions.map((session: sessionPreviewData) => (
        <div style={styles.cardContainer} key={session.uid}>
          <Card style={styles.card}>
            <CardHeader title={session.name} />
            <CardContent>
              <p>created on: right now</p>

              <Link to={`/session?id=${session.uid}`}>Details</Link>
              <Button
                onClick={() => {
                  deleteSession(session.uid);
                }}
              >
                Delete
              </Button>
            </CardContent>
          </Card>
        </div>
      ))}
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
  },
};
