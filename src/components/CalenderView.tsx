import { AudioPLayer } from "./AudioPlayer";
import { Calender } from "./Calender";

interface ICalenderViewProps {
  nameExists: boolean;
  nameInput: string;
}

export const CalenderView = ({ nameExists, nameInput }: ICalenderViewProps) => {
  const lastLetterinName = nameInput.charAt(nameInput.length - 1);

  console.log(lastLetterinName);

  return (
    <>
      {nameExists && (
        <article>
          <h1>
            <span className="redText">
              {nameInput}
              {lastLetterinName !== "s" ? "s " : " "}
            </span>
            adventskalender
          </h1>

          <AudioPLayer />

          <Calender />
        </article>
      )}
    </>
  );
};
