import { ModalBackdrop, ModalContent } from './Modal.styled';
import { useEffect } from 'react';

const Modal = ({ modalImage, closeModal }) => {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  const handleKeyDown = event => {
    if (event.code === `Escape`) {
      closeModal();
    }
  };

  const handleBackdropClick = event => {
    if (event.target.nodeName === 'DIV') {
      closeModal();
    }
  };

  return (
    <ModalBackdrop onClick={handleBackdropClick}>
      <ModalContent>
        <img src={modalImage} alt="Large scr"></img>
      </ModalContent>
    </ModalBackdrop>
  );
};

export default Modal;
