import React from "react";
import "./bar.css";
import { useAppContext } from "../../App";
import Circle from "../placeables/Circle";
import Block from "../placeables/Block";
import Image from "../placeables/Image";
import Title from "../placeables/Title";

function TopBar() {
  const { addElement, children } = useAppContext();

  const addElementTopBar = (ComponentType: string) => {
    const currentIDs = children
      .filter((child) => child !== null)
      .map((child) => Number(child?.props?.id))
      .filter(Number.isFinite);

    const newID = currentIDs.length > 0 ? Math.max(...currentIDs) + 1 : 1;
    let component: React.ReactElement | null = null;
    switch (ComponentType) {
      case "Circle":
        component = <Circle id={String(newID)} componentType="Circle" />;
        break;
      case "Block":
        component = <Block id={String(newID)} componentType="Block" />;
        break;
      case "Image":
        component = <Image id={String(newID)} componentType="Image" />;
        break;
      case "Title":
        component = <Title id={String(newID)} componentType="Title" />;
        break;
      default:
        console.warn(`Unknown component type: ${ComponentType}`);
        component = <div id={String(newID)}>Invalid Component</div>;
    }
    addElement(component);
  };

  return (
    <div className="topbar">
      <div>Place It</div>
      <div className="topbar-buttons">
        <button onClick={() => addElementTopBar("Circle")}>Circle</button>
        <button onClick={() => addElementTopBar("Block")}>Block</button>
        <button onClick={() => addElementTopBar("Image")}>Image</button>
        <button onClick={() => addElementTopBar("Title")}>Title</button>
        <button onClick={() => console.log(children)}>Image</button>
      </div>
    </div>
  );
}

export default TopBar;
