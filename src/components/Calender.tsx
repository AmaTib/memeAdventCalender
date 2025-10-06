import { useEffect, useState } from "react";
import { IDayOfMonth } from "../models/IDayOfMonth";

export const Calender = () => {
  const calenderBase: IDayOfMonth[] = [
    {
      dateOfThisDay: 1,
      hasBeenOpened: false,
      memeUrl: "",
    },
    {
      dateOfThisDay: 2,
      hasBeenOpened: false,
      memeUrl: "",
    },
    {
      dateOfThisDay: 3,
      hasBeenOpened: false,
      memeUrl: "",
    },
    {
      dateOfThisDay: 4,
      hasBeenOpened: false,
      memeUrl: "",
    },
    {
      dateOfThisDay: 5,
      hasBeenOpened: false,
      memeUrl: "",
    },
    {
      dateOfThisDay: 6,
      hasBeenOpened: false,
      memeUrl: "",
    },
    {
      dateOfThisDay: 7,
      hasBeenOpened: false,
      memeUrl: "",
    },
    {
      dateOfThisDay: 8,
      hasBeenOpened: false,
      memeUrl: "",
    },
    {
      dateOfThisDay: 9,
      hasBeenOpened: false,
      memeUrl: "",
    },
    {
      dateOfThisDay: 10,
      hasBeenOpened: false,
      memeUrl: "",
    },
    {
      dateOfThisDay: 11,
      hasBeenOpened: false,
      memeUrl: "",
    },
    {
      dateOfThisDay: 12,
      hasBeenOpened: false,
      memeUrl: "",
    },
    {
      dateOfThisDay: 13,
      hasBeenOpened: false,
      memeUrl: "",
    },
    {
      dateOfThisDay: 14,
      hasBeenOpened: false,
      memeUrl: "",
    },
    {
      dateOfThisDay: 15,
      hasBeenOpened: false,
      memeUrl: "",
    },
    {
      dateOfThisDay: 16,
      hasBeenOpened: false,
      memeUrl: "",
    },
    {
      dateOfThisDay: 17,
      hasBeenOpened: false,
      memeUrl: "",
    },
    {
      dateOfThisDay: 18,
      hasBeenOpened: false,
      memeUrl: "",
    },
    {
      dateOfThisDay: 19,
      hasBeenOpened: false,
      memeUrl: "",
    },
    {
      dateOfThisDay: 20,
      hasBeenOpened: false,
      memeUrl: "",
    },
    {
      dateOfThisDay: 21,
      hasBeenOpened: false,
      memeUrl: "",
    },
    {
      dateOfThisDay: 22,
      hasBeenOpened: false,
      memeUrl: "",
    },
    {
      dateOfThisDay: 23,
      hasBeenOpened: false,
      memeUrl: "",
    },
    {
      dateOfThisDay: 24,
      hasBeenOpened: false,
      memeUrl: "",
    },
  ];

  //när man klickar på en dag kolla att dateofthisday inte överstiger datumet som är den dagen,
  // man ska inte kunna öppna framtida luckor men man kan öppna luckor bak i tiden om de ej blivit öppnade tidigare.

  const [calender, setCalender] = useState<IDayOfMonth[]>([]);

  useEffect(() => {
    setCalender(
      JSON.parse(
        localStorage.getItem("memeCalender") || JSON.stringify(calenderBase)
      )
    );
  }, []);

  console.log("calender", calender);

  const openCalenderDoor = (clickedDay: number) => {
    const updatedCalender = calender.map((day) => {
      if (day.dateOfThisDay === clickedDay) {
        day.hasBeenOpened = true;
      }
      return day;
    });

    setCalender(updatedCalender);
    localStorage.setItem("memeCalender", JSON.stringify(updatedCalender));
  };

  return (
    <>
      {calender.map((day) => (
        <p
          onClick={() => openCalenderDoor(day.dateOfThisDay)}
          key={day.dateOfThisDay}
        >
          {day.dateOfThisDay}
          <span>{day.hasBeenOpened ? "öppnad" : ""}</span>
        </p>
      ))}
    </>
  );
};
