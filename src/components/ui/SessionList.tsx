import React, { useState, useEffect } from "react";
import Session from "./Session";

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

    console.log(newSessions);
    setSessions(newSessions);
  };

  return (
    <div>
      {sessions.map(session => (
        <div onClick={() => handleClick(session.id)}>
          <Session sessionData={session} />
        </div>
      ))}
    </div>
  );
};
