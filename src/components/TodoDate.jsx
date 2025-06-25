import { useState } from "react";
import { useEffect } from "react";

export const TodoDate = () => {
  const [dateTime, setdateTime] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date();
      const formattedate = date.toLocaleDateString();
      const formattedtime = date.toLocaleTimeString();
      setdateTime(`${formattedate} - ${formattedtime}`);
    }, 1000);

    return () => clearInterval(interval); // No memory leak problem
  }, []);
  return <h2>{dateTime}</h2>;
};
