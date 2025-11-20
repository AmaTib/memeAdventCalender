import "../styles/MemeModal.css";
interface IMemeModalProps {
  imgSource: string;
  close: () => void;
}

export const MemeModal = ({ imgSource, close }: IMemeModalProps) => {
  return (
    <>
      <section className="memeModalBackground">
        <div>
          <h2></h2>
          <img src={imgSource} alt="meme of the day" />
          <button onClick={close}>Stäng</button>
        </div>
      </section>
    </>
  );
};
