import React, { useState } from "react";
import "./wrapper.css";
import editIcon from "../assets/images/edit-3.svg";
import copyIcon from "../assets/images/copy.svg";
import deleteIcon from "../assets/images/trash-2.svg";
import useDragger from "../utils/hooks/useDragger";
import EditModal from "./modal/EditModal";
import defaultIMG from "../assets/images/image.svg";
import { useAppContext } from "../App";

type WrapperProps = {
  id: string;
  placeable: React.ReactElement;
  componentType: string;
};

const Wrapper: React.FC<WrapperProps> = ({ id, placeable, componentType }) => {
  useDragger(id);
  const { addElement, children, setChildren } = useAppContext();
  const [backgroundColor, setBackgroundColor] = useState<string>("transparent");
  const [width, setWidth] = useState<number>(50);
  const [title, setTitle] = useState<string>("Title");
  const [height, setHeight] = useState<number>(50);
  const [rotate, setRotate] = useState<number>(0);
  const [hasBorder, setBorder] = useState<boolean>(true);
  const [imageSrc, setImageSrc] = useState<string>(defaultIMG);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const isImageComponent = placeable.type === "img";

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCopy = () => {
    const childComponent = children[Number(id)];
    if (childComponent) {
      const newId = children.length.toString(); // Assign new ID based on array length
      const newElement = React.cloneElement(childComponent, { id: newId });

      addElement(newElement);
    }
  };

  const handleDelete = () => {
    const updatedChildren = children.filter((child) => child.key !== id);
    setChildren(updatedChildren);
  };

  const handleSave = (
    color: string,
    width: number,
    height: number,
    rotate: number,
    hasBorder: boolean,
    imageSrc: string,
    title: string
  ) => {
    setBackgroundColor(color);
    setWidth(width);
    setHeight(height);
    setRotate(rotate);
    setBorder(hasBorder);
    setImageSrc(imageSrc);
    setTitle(title);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const renderEditModal = () => {
    if (!isEditing) return null;
    return (
      <EditModal
        initialColor={backgroundColor}
        initialWidth={width}
        initialHeight={height}
        initialRotation={rotate}
        initalHasBorder={hasBorder}
        initialTitle={title}
        componentType={componentType}
        initialImageSrc={imageSrc}
        onSave={handleSave}
        onCancel={handleCancel}
        style={{
          transform: `rotate(${360 - rotate}deg)`,
        }}
      />
    );
  };

  const renderElement = () => {
    const commonStyles = {
      width: `${width}px`,
      height: `${height}px`,
      backgroundColor: `${backgroundColor}`,
      border: hasBorder ? "1px solid black" : "none",
    };

    switch (componentType) {
      case "Title":
        return (
          <div
            style={{
              ...commonStyles,
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
            }}
          >
            {title}
          </div>
        );
      case "Text":
        return <div style={commonStyles}>{title}</div>;
      default:
        return React.cloneElement(placeable, {
          style: {
            ...placeable.props.style,
            ...commonStyles,
            ...(isImageComponent && {
              pointerEvents: "none",
              userSelect: "none",
              WebkitUserDrag: "none",
            }),
          },
          src: placeable.type === "img" ? imageSrc : defaultIMG,
        });
    }
  };

  return (
    <div
      id={id}
      className="placeables-wrapper"
      style={{
        width: width + 10,
        height: height + 10,
        transform: `rotate(${rotate}deg)`,
      }}
    >
      {renderElement()}
      <div className="wrapper-buttons">
        <button
          className="wrapper-button"
          onClick={handleCopy}
          style={{
            transform: `rotate(${360 - rotate}deg)`,
          }}
        >
          <img
            src={copyIcon}
            alt={`Copy ${id}`}
            className="wrapper-image-button"
          />
        </button>
        <button
          className="wrapper-button"
          onClick={handleEditClick}
          style={{
            transform: `rotate(${360 - rotate}deg)`,
          }}
        >
          <img
            src={editIcon}
            alt={`Edit ${id}`}
            className="wrapper-image-button"
          />
        </button>
        <button
          className="wrapper-button"
          onClick={handleDelete}
          style={{
            transform: `rotate(${360 - rotate}deg)`,
          }}
        >
          <img
            src={deleteIcon}
            alt={`Delete ${id}`}
            className="wrapper-image-button"
          />
        </button>
      </div>

      {renderEditModal()}
    </div>
  );
};

export default Wrapper;
