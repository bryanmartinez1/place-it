import React from "react";
import "./button.css";
import ChevronUpIcon from "../../assets/images/chevron-up.svg";
import ChevronDownIcon from "../../assets/images/chevron-down.svg";

type TextButtonProps = {
  text: string;
  type?: "button" | "submit" | "reset";
  buttonStyle?: React.CSSProperties;
  backgroundColor?: string;
  hoverBackgroundColor?: string;
  isDropdown?: boolean;
  isDropdownOpen?: boolean;
  onClick?: () => void;
  chevronIconSize?: string;
};

export default function TextButton({
  text,
  type = "button",
  backgroundColor = "transparent",
  hoverBackgroundColor = "transparent",
  buttonStyle = {},
  isDropdown = false,
  isDropdownOpen = false,
  chevronIconSize = "1rem",
  onClick = () => {},
}: TextButtonProps) {
  return (
    <button
      type={type}
      style={{ ...buttonStyle, cursor: "pointer", backgroundColor }}
      onClick={onClick}
      onMouseEnter={(e) =>
        (e.currentTarget.style.backgroundColor = hoverBackgroundColor)
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.backgroundColor = backgroundColor)
      }
      data-testid={isDropdown ? "icon-dropdown" : "icon-button"}
    >
      {text}
      {isDropdown ? (
        <img
          src={isDropdownOpen ? ChevronUpIcon : ChevronDownIcon}
          style={{ height: chevronIconSize }}
          alt="Chevron"
        />
      ) : null}
    </button>
  );
}
