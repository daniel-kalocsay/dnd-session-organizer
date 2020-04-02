import React, { useState, useEffect } from "react";
import Session from "./Session";

export const SessionList = () => {
  const [sessions, setSessions] = useState([] as any[]);

  //TODO fetch sessions belonging to the user
  useEffect(() => {
    let mySessions = [{ id: 1, name: "my session" }];
    setSessions(mySessions);
  }, []);

  return (
    <div>
      {sessions.map(session => (
        <Session />
      ))}
    </div>
  );
};
