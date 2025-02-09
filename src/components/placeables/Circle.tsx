import React from "react";
import "./placeables.css";
import Wrapper from "../Wrapper";

type CircleProps = {
  id: string;
  componentType: string;
};

const Circle: React.FC<CircleProps> = ({ id }) => {
  return (
    <Wrapper
      componentType="Circle"
      id={id}
      placeable={<div className="circle" />}
    />
  );
};

export default Circle;
