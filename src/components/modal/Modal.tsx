import React, { useEffect, useRef, ReactNode } from "react";
import IconButton from "../buttons/Icon";
import Close from "../../assets/icons/x.svg";
import "./modal.css";
const closeButtonProperties = {
  borderRadius: "100%",
  hoverBackgroundColor: "#DCDCDC",
  width: "30px",
  height: "30px",
  margin: "10px 10px 0px 10px",
};
type ModalProps = {
  show: boolean;
  hide: () => void;
  content: ReactNode;
  width?: string;
  height?: string;
  title?: string;
  maxWidth?: string;
  maxHeight?: string;
  minWidth?: string;
  minHeight?: string;
  titleSize?: string;
};

export default function Modal({
  show,
  hide,
  content,
  width = "50%",
  height = "50%",
  title = "",
  maxWidth = "none",
  maxHeight = "none",
  minWidth = "none",
  minHeight = "none",
  titleSize = "32px",
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      hide();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  if (!show) return null;

  return (
    <div
      className="modalContent"
      style={{ width, height, maxWidth, maxHeight, minHeight, minWidth }}
      ref={modalRef}
      data-testid="modal"
    >
      <div className="modalCloseHeader">
        <div className="modalTitle" style={{ fontSize: titleSize }}>
          {title}
        </div>
        <IconButton
          src={Close}
          alt="Close"
          toolTipText="Close"
          onClick={hide}
          {...closeButtonProperties}
        />
      </div>
      <div className="modalBody">{content}</div>
    </div>
  );
}
