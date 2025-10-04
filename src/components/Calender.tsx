import { useState } from "react";
import { IDayOfMonth } from "../models/IDayOfMonth";

export const Calender = () => {
  const generateCalendarDays = (): IDayOfMonth[] => {
    const days: IDayOfMonth[] = [];

    //i loopen hämta meme url från api och sätt den för alla 24 dagar direkt

    for (let i = 1; i <= 24; i++) {
      days.push({
        dateOfThisDay: i,
        hasBeenOpened: false,
        memeUrl: "",
      });
    }

    return days;
  };

  //när man klickar på en dag kolla att dateofthisday inte överstiger datumet som är den dagen,
  // man ska inte kunna öppna framtida luckor men man kan öppna luckor bak i tiden om de ej blivit öppnade tidigare.
  //När man öppnar en lucka så ska hasbeenopened ändras till true, detta måste sen sparas i localstorage

  const [calender, setCalender] = useState<IDayOfMonth[]>(() => {
    const stored = localStorage.getItem("memeCalendar");
    return stored ? JSON.parse(stored) : generateCalendarDays();
  });

  console.log("calender", calender);

  return (
    <>
      {calender.map((day) => (
        <p>{day.dateOfThisDay}</p>
      ))}
    </>
  );
};
