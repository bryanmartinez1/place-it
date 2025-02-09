import React from "react";
import { Tooltip } from "react-tooltip";
import ChevronUpIcon from "../../assets/images/chevron-up.svg";
import ChevronDownIcon from "../../assets/images/chevron-down.svg";

type IconButtonProps = {
  src: string;
  alt: string;
  toolTipText: string;
  toolTipPlace?: any;
  type?: "button" | "submit" | "reset";
  buttonStyle?: React.CSSProperties;
  imageStyle?: React.CSSProperties;
  backgroundColor?: string;
  hoverBackgroundColor?: string;
  isDropdown?: boolean;
  isDropdownOpen?: boolean;
  onClick?: () => void;
  chevronIconSize?: string;
};

export default function IconButton({
  src,
  alt,
  toolTipText,
  toolTipPlace = "bottom-start",
  type = "button",
  backgroundColor = "transparent",
  hoverBackgroundColor = "transparent",
  buttonStyle = {},
  imageStyle = {},
  isDropdown = false,
  isDropdownOpen = false,
  chevronIconSize = "1rem",
  onClick = () => {},
}: IconButtonProps) {
  return (
    <>
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
        data-tooltip-content={toolTipText}
        data-tooltip-id={`${toolTipText}-id`}
        data-testid={isDropdown ? "icon-dropdown" : "icon-button"}
      >
        <img src={src} alt={alt} style={imageStyle} />
        {isDropdown ? (
          <img
            src={isDropdownOpen ? ChevronUpIcon : ChevronDownIcon}
            style={{ height: chevronIconSize }}
            alt="Chevron"
          />
        ) : null}
      </button>
      <Tooltip id={`${toolTipText}-id`} place={toolTipPlace} />
    </>
  );
}
