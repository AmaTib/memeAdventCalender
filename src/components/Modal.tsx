import "../styles/Modal.css";

interface IModalProp {
  closeModal: () => void;
  clearStorage: () => void;
}

export const Modal = ({ closeModal, clearStorage }: IModalProp) => {
  return (
    <>
      <div className="modalContainer">
        <button onClick={closeModal}>X</button>
        <h3>Om du börjar om kan du inte längre se dina öppnade memes</h3>
        <button onClick={clearStorage}>Börja Om</button>
      </div>
    </>
  );
};
