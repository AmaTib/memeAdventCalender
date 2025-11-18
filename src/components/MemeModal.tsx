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
          <button onClick={close}>X</button>
          <h2></h2>
          <img src={imgSource} alt="meme of the day" />
        </div>
      </section>
    </>
  );
};
