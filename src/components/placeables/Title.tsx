import React from "react";
import "./placeables.css";
import Wrapper from "../Wrapper";

type TitleProps = {
  id: string;
  componentType: string;
};

const Title: React.FC<TitleProps> = ({ id }) => {
  return <Wrapper componentType="Title" id={id} placeable={<div />} />;
};

export default Title;
