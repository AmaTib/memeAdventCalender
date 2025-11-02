import { useEffect, useState } from "react";
import { IDayOfMonth } from "../models/IDayOfMonth";
import "../styles/Calender.css";
import { IMemeResponse } from "../models/IMemeResponse";
import { Modal } from "./Modal";
import { calendarBase } from "../assets/calendarBase";

export const Calender = () => {
  const [calender, setCalender] = useState<IDayOfMonth[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const date = new Date();
  const currentDay = date.getDate();
  const currentMonth = date.getMonth() + 1;

  useEffect(() => {
    setCalender(
      JSON.parse(
        localStorage.getItem("memeCalender") || JSON.stringify(calendarBase)
      )
    );
  }, []);

  useEffect(() => {
    async function getMemes() {
      const memeSubreddits = [
        "memes",
        "meme",
        "MemesIRL",
        "Funnymemes",
        "bestmemes",
        "AnimalMemes",
      ];
      const chosenSubreddit =
        memeSubreddits[Math.floor(Math.random() * memeSubreddits.length)];
      console.log("subreddit:", chosenSubreddit);

      const response = await fetch(
        `https://meme-api.com/gimme/${chosenSubreddit}/12`
      );
      const memeresponse: IMemeResponse = await response.json();

      console.log("memeresponse", memeresponse);
      console.log("memeresponse count", memeresponse.count);

      if (!memeresponse.memes) return;

      let memeIndex = 0;
      const updatedCalender = calender.map((day) => {
        if (day.memeUrl && day.memeUrl !== "") {
          return day;
        }

        return {
          ...day,
          memeUrl: memeresponse.memes[memeIndex++]?.url ?? "",
        };
      });

      setCalender(updatedCalender);
    }

    if (calender.some((day) => day.memeUrl === "")) {
      console.log("getting memes");
      getMemes();
    }
  }, [calender]);

  console.log("calender", calender);

  const openCalenderDoor = (clickedDay: number) => {
    const updatedCalender = calender.map((day) => {
      if (day.dateOfThisDay === clickedDay) {
        return { ...day, hasBeenOpened: true };
      }
      return day;
    });

    if (currentMonth === 12) {
      if (clickedDay <= currentDay) {
        console.log("updaterar calender");

        setCalender(updatedCalender);
        localStorage.setItem("memeCalender", JSON.stringify(updatedCalender));
      } else {
        alert("Tålamod tålamod, det är inte " + clickedDay + " December än");
      }
    } else {
      alert("Tålamod tålamod, det är inte December än");
    }
  };

  function clearlocalstorage() {
    localStorage.removeItem("memeCalender");
    localStorage.removeItem("memeCalenderUserName");
    location.reload();
  }

  function toggleModal() {
    setIsOpen(!isOpen);
  }

  return (
    <>
      <section className="calenderContainer">
        {calender.map((day) => (
          <div
            onClick={() => openCalenderDoor(day.dateOfThisDay)}
            key={day.dateOfThisDay}
            className="coverImagecContainer"
          >
            <p id={day.hasBeenOpened ? "doorOpened" : ""}>
              {day.dateOfThisDay}
            </p>
            <img
              src={day.coverImg}
              alt="cover image"
              className="coverImage"
              id={day.hasBeenOpened ? "doorOpened" : ""}
            ></img>
            <img className="memeImage" src={day.memeUrl} alt="" />
          </div>
        ))}
      </section>

      {calender.every((day) => day.hasBeenOpened) && (
        <button onClick={toggleModal}>Börja om</button>
      )}

      {isOpen && (
        <Modal closeModal={toggleModal} clearStorage={clearlocalstorage} />
      )}
    </>
  );
};
