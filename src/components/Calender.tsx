import { useEffect, useState } from "react";
import { IDayOfMonth } from "../models/IDayOfMonth";
import "../styles/Calender.css";
import { IMemeResponse } from "../models/IMemeResponse";
import { Modal } from "./Modal";

export const Calender = () => {
  const calenderBase: IDayOfMonth[] = [
    {
      dateOfThisDay: 1,
      hasBeenOpened: false,
      memeUrl: "",
      coverImg: "/dag1.png",
    },
    {
      dateOfThisDay: 2,
      hasBeenOpened: false,
      memeUrl: "",
      coverImg: "/dag2.png",
    },
    {
      dateOfThisDay: 3,
      hasBeenOpened: false,
      memeUrl: "",
      coverImg: "/dag3.png",
    },
    {
      dateOfThisDay: 4,
      hasBeenOpened: false,
      memeUrl: "",
      coverImg: "/dag4.png",
    },
    {
      dateOfThisDay: 5,
      hasBeenOpened: false,
      memeUrl: "",
      coverImg: "/dag5.png",
    },
    {
      dateOfThisDay: 6,
      hasBeenOpened: false,
      memeUrl: "",
      coverImg: "/dag6.png",
    },
    {
      dateOfThisDay: 7,
      hasBeenOpened: false,
      memeUrl: "",
      coverImg: "/dag7.png",
    },
    {
      dateOfThisDay: 8,
      hasBeenOpened: false,
      memeUrl: "",
      coverImg: "/dag8.png",
    },
    {
      dateOfThisDay: 9,
      hasBeenOpened: false,
      memeUrl: "",
      coverImg: "/dag9.png",
    },
    {
      dateOfThisDay: 10,
      hasBeenOpened: false,
      memeUrl: "",
      coverImg: "/dag10.png",
    },
    {
      dateOfThisDay: 11,
      hasBeenOpened: false,
      memeUrl: "",
      coverImg: "/dag11.png",
    },
    {
      dateOfThisDay: 12,
      hasBeenOpened: false,
      memeUrl: "",
      coverImg: "/dag12.png",
    },
    {
      dateOfThisDay: 13,
      hasBeenOpened: false,
      memeUrl: "",
      coverImg: "/dag13.png",
    },
    {
      dateOfThisDay: 14,
      hasBeenOpened: false,
      memeUrl: "",
      coverImg: "/dag14.png",
    },
    {
      dateOfThisDay: 15,
      hasBeenOpened: false,
      memeUrl: "",
      coverImg: "/dag15.png",
    },
    {
      dateOfThisDay: 16,
      hasBeenOpened: false,
      memeUrl: "",
      coverImg: "/dag16.png",
    },
    {
      dateOfThisDay: 17,
      hasBeenOpened: false,
      memeUrl: "",
      coverImg: "/dag17.png",
    },
    {
      dateOfThisDay: 18,
      hasBeenOpened: false,
      memeUrl: "",
      coverImg: "/dag18.png",
    },
    {
      dateOfThisDay: 19,
      hasBeenOpened: false,
      memeUrl: "",
      coverImg: "/dag19.png",
    },
    {
      dateOfThisDay: 20,
      hasBeenOpened: false,
      memeUrl: "",
      coverImg: "/dag20.png",
    },
    {
      dateOfThisDay: 21,
      hasBeenOpened: false,
      memeUrl: "",
      coverImg: "/dag21.png",
    },
    {
      dateOfThisDay: 22,
      hasBeenOpened: false,
      memeUrl: "",
      coverImg: "/dag22.png",
    },
    {
      dateOfThisDay: 23,
      hasBeenOpened: false,
      memeUrl: "",
      coverImg: "/dag23.png",
    },
    {
      dateOfThisDay: 24,
      hasBeenOpened: false,
      memeUrl: "",
      coverImg: "/dag24.png",
    },
  ];

  //när man klickar på en dag kolla att dateofthisday inte överstiger datumet som är den dagen,
  // man ska inte kunna öppna framtida luckor men man kan öppna luckor bak i tiden om de ej blivit öppnade tidigare.

  const [calender, setCalender] = useState<IDayOfMonth[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setCalender(
      JSON.parse(
        localStorage.getItem("memeCalender") || JSON.stringify(calenderBase)
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
      /*  console.log("updatedCalender with memes", updatedCalender); */

      setCalender(updatedCalender);
      localStorage.setItem("memeCalender", JSON.stringify(updatedCalender));
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

    setCalender(updatedCalender);
    localStorage.setItem("memeCalender", JSON.stringify(updatedCalender));
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
