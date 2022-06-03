import { Fragment } from "react";
import classes from "./Modal.module.css";
import ReactDOM from "react-dom";

interface BackdropProps {
  onClose: (event: React.MouseEvent<HTMLDivElement>) => void
}

const Backdrop = (props: BackdropProps) => {
  return <div className={classes.backdrop} onClick={props.onClose} />;
};

type ModalOverlayType = {
  children: React.ReactNode
}

const ModalOverlay = (props: ModalOverlayType) => (
  <div className={classes.modal}>
    <div className={classes.content}>{props.children}</div>
  </div>
);

const portalEl = document.getElementById("overlay") as HTMLElement;

interface ModalProps {
  onClose: (event: React.MouseEvent<HTMLDivElement>) => void,
  children: React.ReactNode
}

const Modal = (props: ModalProps) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(<Backdrop onClose={props.onClose} />, portalEl)}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalEl
      )}
    </Fragment>
  );
};

export default Modal;
