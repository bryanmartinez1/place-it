import React, { useEffect, useRef, useState } from "react";
import "./dropdown.css";

type DropdownProps = {
  component: React.ReactNode;
  options: string[];
  optionsFunctions: (() => void)[];
  dropdownStyle?: React.CSSProperties;
  componentStyle?: React.CSSProperties;
};

export default function Dropdown({
  component,
  options,
  optionsFunctions,
  dropdownStyle,
  componentStyle,
}: DropdownProps) {
  const [isDropDownOpen, setDropDownOpen] = useState<boolean>(false);

  const toggleDropDown = () => {
    setDropDownOpen(!isDropDownOpen);
  };

  const optionSelect = (index: number) => {
    optionsFunctions[index]();
    toggleDropDown();
  };

  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setDropDownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside); // Add event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside); // Clean up on unmount
    };
  }, []);
  return (
    <div
      className="dropdown-container"
      ref={dropdownRef}
      data-testid="dropdown"
    >
      <div onClick={toggleDropDown} style={componentStyle}>
        {component}
      </div>
      {isDropDownOpen && (
        <div className="dropdown-content">
          {options.map((option, index) => (
            <div
              className="ddPara"
              onClick={() => optionSelect(index)}
              key={index}
              style={dropdownStyle}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
