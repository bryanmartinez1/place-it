import React from "react";
import "./placeables.css";
import Wrapper from "../Wrapper";
import defaultIMG from "../../assets/images/image.svg";

type ImageProps = {
  id: string;
  componentType: string;
};

const Image: React.FC<ImageProps> = ({ id }) => {
  return (
    <Wrapper
      componentType="Image"
      id={id}
      placeable={
        <img className="image" src={defaultIMG} alt={`placeable ${id}`} />
      }
    />
  );
};

export default Image;
