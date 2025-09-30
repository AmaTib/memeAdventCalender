interface ICalenderViewProps {
  nameExists: boolean;
  nameInput: string;
}

export const CalenderView = ({ nameExists, nameInput }: ICalenderViewProps) => {
  return (
    <>
      {nameExists && (
        <article>
          <h1>{nameInput + "s"} adventskalender</h1>
        </article>
      )}
    </>
  );
};
