import React from "react";
import ReactDOM from "react-dom";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";

const ModalComponent = ({
  isOpen = false,
  onClose,
  onConfirm,
  title = "Modal",
  text = "",
}) => {
  return ReactDOM.createPortal(
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
        <ModalBody>
          <p>{text}</p>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="light" onClick={onClose}>
            Cerrar
          </Button>
          <Button
            color="primary"
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            Continuar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>,
    document.body
  );
};

export default ModalComponent;
