import React from "react";
import "./placeables.css";
import Wrapper from "../Wrapper";

type BlockProps = {
  id: string;
  componentType: string;
};

const Block: React.FC<BlockProps> = ({ id }) => {
  return <Wrapper componentType="Block" id={id} placeable={<div />} />;
};

export default Block;
