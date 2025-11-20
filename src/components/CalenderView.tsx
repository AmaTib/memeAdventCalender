import { AudioPLayer } from "./AudioPlayer";
import { Calender } from "./Calender";

interface ICalenderViewProps {
  nameExists: boolean;
  nameInput: string;
}

export const CalenderView = ({ nameExists, nameInput }: ICalenderViewProps) => {
  return (
    <>
      {nameExists && (
        <article>
          <h1>
            <span className="redText">{nameInput + "s"}</span> adventskalender
          </h1>

          <AudioPLayer />

          <Calender />
        </article>
      )}
    </>
  );
};
