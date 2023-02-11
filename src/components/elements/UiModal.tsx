import { Modal } from "@mui/material";
import React from "react";
import { Col } from "./Col";

interface ModalProps {
  open: boolean;
  onClose: any;
  width?: string;
  padding?: string;
  children?: React.ReactNode;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "1px solid white",
  borderRadius: "12px",
};

export const UiModal = ({
  open,
  onClose,
  width = "30%",
  padding = "30px 20px",
  ...children
}: ModalProps) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Col
        sx={{ ...style, width: width, padding: padding, maxHeight: "80vh" }}
        {...children}
      />
    </Modal>
  );
};
