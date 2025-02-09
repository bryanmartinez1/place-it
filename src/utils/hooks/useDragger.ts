import React, { useEffect, useRef } from "react";

type Coordinates = {
  startX: number;
  startY: number;
  lastX: number;
  lastY: number;
};

function useDragger(id: string): void {
  const isClicked = useRef<boolean>(false);

  const coordinatesRef = useRef<Coordinates>({
    startX: 0,
    startY: 0,
    lastX: 0,
    lastY: 0,
  });

  const onMouseDown = (e: MouseEvent, target: HTMLElement) => {
    isClicked.current = true;
    coordinatesRef.current.startX = e.clientX;
    coordinatesRef.current.startY = e.clientY;
  };

  const onMouseUp = (e: MouseEvent, target: HTMLElement) => {
    isClicked.current = false;
    coordinatesRef.current.lastX = target.offsetLeft;
    coordinatesRef.current.lastY = target.offsetTop;
  };

  const onMouseMove = (
    e: MouseEvent,
    target: HTMLElement,
    container: HTMLElement
  ) => {
    if (!isClicked.current) return;

    const containerRect = container.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();

    const nextX = Math.min(
      Math.max(
        e.clientX -
          coordinatesRef.current.startX +
          coordinatesRef.current.lastX,
        0
      ),
      containerRect.width - targetRect.width
    );

    const nextY = Math.min(
      Math.max(
        e.clientY -
          coordinatesRef.current.startY +
          coordinatesRef.current.lastY,
        0
      ),
      containerRect.height - targetRect.height
    );

    target.style.top = `${nextY}px`;
    target.style.left = `${nextX}px`;
  };

  const addEventListeners = (target: HTMLElement, container: HTMLElement) => {
    target.addEventListener("mousedown", (e) => onMouseDown(e, target));
    target.addEventListener("mouseup", (e) => onMouseUp(e, target));
    container.addEventListener("mousemove", (e) =>
      onMouseMove(e, target, container)
    );
    container.addEventListener("mouseleave", (e) => onMouseUp(e, target));
  };

  const removeEventListeners = (
    target: HTMLElement,
    container: HTMLElement
  ) => {
    target.removeEventListener("mousedown", (e) => onMouseDown(e, target));
    target.removeEventListener("mouseup", (e) => onMouseUp(e, target));
    container.removeEventListener("mousemove", (e) =>
      onMouseMove(e, target, container)
    );
    container.removeEventListener("mouseleave", (e) => onMouseUp(e, target));
  };

  useEffect(() => {
    const target = document.getElementById(id);
    if (!target) throw new Error("Element doesnt exist");

    const container = target.parentElement;
    if (!container) throw new Error("Element doesnt exist");
    addEventListeners(target, container);
    return () => removeEventListeners(target, container);
  }, []);
}

export default useDragger;
