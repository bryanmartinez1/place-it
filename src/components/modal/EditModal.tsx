import React, { useState } from "react";
import "./editModal.css";
import Upload from "rc-upload";

type EditModalProps = {
  initialColor: string;
  initialWidth: number;
  initialHeight: number;
  initialRotation: number;
  initalHasBorder: boolean;
  initialImageSrc: string;
  componentType: string;
  onSave: (
    color: string,
    width: number,
    height: number,
    rotate: number,
    hasBorder: boolean,
    setImageSrc: string,
    title: string
  ) => void;
  onCancel: () => void;
  initialTitle: string;
  style?: React.CSSProperties;
};

export default function EditModal({
  initialColor,
  initialWidth,
  initialHeight,
  initialRotation,
  initalHasBorder,
  initialImageSrc,
  componentType,
  initialTitle,
  style = {},
  onSave,
  onCancel,
}: EditModalProps) {
  const [tempBackgroundColor, setTempBackgroundColor] =
    useState<string>(initialColor);
  const [tempTitle, setTempTitle] = useState<string>(initialTitle);
  const [tempWidth, setTempWidth] = useState<number>(initialWidth);
  const [tempHeight, setTempHeight] = useState<number>(initialHeight);
  const [tempRotation, setTempRotation] = useState<number>(initialRotation);
  const [tempHasBorder, setTempHasBorder] = useState<boolean>(initalHasBorder);
  const [tempIMGSrc, setTempIMGSrc] = useState<string>(initialImageSrc);

  const handleFileChange = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (reader.result) {
        setTempIMGSrc(reader.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    onSave(
      tempBackgroundColor,
      tempWidth,
      tempHeight,
      tempRotation,
      tempHasBorder,
      tempIMGSrc,
      tempTitle
    );
  };

  return (
    <div className="modal" style={style}>
      {componentType === "Image" && (
        <div className="modal-upload">
          <Upload
            beforeUpload={(file) => {
              handleFileChange(file);
              return false;
            }}
          >
            <button>Upload Image</button>
          </Upload>
        </div>
      )}
      {componentType === "Title" && (
        <label>
          Title:
          <input
            type="text"
            className="input-text"
            value={tempTitle}
            onChange={(e) => setTempTitle(e.target.value)}
            placeholder="Title"
          />
        </label>
      )}

      <div className="modal-content">
        <label>
          Color:
          <input
            type="text"
            className="input-text"
            value={tempBackgroundColor}
            onChange={(e) => setTempBackgroundColor(e.target.value)}
            placeholder="Color"
          />
        </label>
        <label>
          Width:
          <input
            className="input-text"
            type="number"
            value={tempWidth}
            onChange={(e) => setTempWidth(Number(e.target.value))}
          />
        </label>
        <label>
          Height:
          <input
            className="input-text"
            type="number"
            value={tempHeight}
            onChange={(e) => setTempHeight(Number(e.target.value))}
          />
        </label>
        <label>
          Rotation:
          <input
            className="input-text"
            type="number"
            value={tempRotation}
            onChange={(e) => setTempRotation(Number(e.target.value))}
          />
        </label>
        <label>
          Has Border:
          <input
            type="checkbox"
            className="checkbox-m"
            checked={tempHasBorder}
            onChange={(e) => setTempHasBorder(e.target.checked)}
          />
        </label>
        <div className="modal-buttons">
          <button onClick={handleSave}>Save</button>
          <button onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
