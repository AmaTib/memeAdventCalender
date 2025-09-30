import { AudioPLayer } from "./AudioPlayer";

interface ICalenderViewProps {
  nameExists: boolean;
  nameInput: string;
}

export const CalenderView = ({ nameExists, nameInput }: ICalenderViewProps) => {
  return (
    <>
      {nameExists && (
        <article>
          <AudioPLayer />

          <h1>{nameInput + "s"} adventskalender</h1>
        </article>
      )}
    </>
  );
};
