import { useEffect, useState } from "react";
import { IDayOfMonth } from "../models/IDayOfMonth";
import "../styles/Calender.css";
/* import { IMemeResponse } from "../models/IMemeResponse"; */
import { Modal } from "./Modal";
import { calendarBase } from "../assets/calendarBase";
import { memes } from "../assets/memes";
import { MemeModal } from "./MemeModal";

export const Calender = () => {
  const [calender, setCalender] = useState<IDayOfMonth[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isMemeModalOpen, setIsMemeModalOpen] = useState(false);
  const [clickedMemeImg, setClickedMemeImg] = useState("");

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
    function getMemes() {
      const positionNumbers: number[] = [];
      for (let i = 0; i < 24; i++) {
        let num = Math.floor(Math.random() * 26);

        while (positionNumbers.includes(num)) {
          num = Math.floor(Math.random() * 26);
        }

        positionNumbers.push(num);
      }

      console.log("positionNumbers:", positionNumbers);

      if (positionNumbers.length === 24) {
        const updatedCalender = calender.map((day, i) => {
          if (day.memeUrl && day.memeUrl !== "") {
            return day;
          }

          return {
            ...day,
            memeUrl: memes[positionNumbers[i]]?.url ?? "",
          };
        });

        console.log("updatedCalender", updatedCalender);

        setCalender(updatedCalender);
      }
    }

    if (calender.some((day) => day.memeUrl === "")) {
      console.log("getting memes");
      getMemes();
    }
  }, [calender]);

  console.log("calender", calender);

  const openCalenderDoor = (clickedDay: number, imageUrl: string) => {
    const updatedCalender = calender.map((day) => {
      if (day.dateOfThisDay === clickedDay) {
        return { ...day, hasBeenOpened: true };
      }
      return day;
    });

    if (currentMonth === 12) {
      if (clickedDay <= currentDay) {
        setClickedMemeImg(imageUrl);
        setCalender(updatedCalender);
        setIsMemeModalOpen(true);
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
            onClick={() => {
              {
                day.hasBeenOpened && setIsMemeModalOpen(!isMemeModalOpen);
              }
              setClickedMemeImg(day.memeUrl);
            }}
            key={day.dateOfThisDay}
            className="coverImagecContainer"
          >
            <p id={day.hasBeenOpened ? "doorOpened" : ""}>
              {day.dateOfThisDay}
            </p>
            <img className="memeImage" src={day.memeUrl} alt="" />
            <img
              onClick={() => openCalenderDoor(day.dateOfThisDay, day.memeUrl)}
              src={day.coverImg}
              alt="cover image"
              className="coverImage"
              id={day.hasBeenOpened ? "doorOpened" : ""}
            ></img>
          </div>
        ))}
      </section>

      {calender.every((day) => day.hasBeenOpened) && (
        <button onClick={toggleModal}>Börja om</button>
      )}

      {isOpen && (
        <Modal closeModal={toggleModal} clearStorage={clearlocalstorage} />
      )}

      {isMemeModalOpen && (
        <MemeModal
          imgSource={clickedMemeImg}
          close={() => {
            setIsMemeModalOpen(!isMemeModalOpen);
          }}
        />
      )}
    </>
  );
};
