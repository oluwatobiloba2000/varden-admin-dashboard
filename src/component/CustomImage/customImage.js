import { useState, useEffect } from "react";

const MAX_HEIGHT = "300px";

const Checkmark = ({ selected }) => (
  <div
    style={
      selected
        ? { left: "4px", top: "4px", position: "absolute", zIndex: "1" }
        : { display: "none" }
    }
  >
    <svg
      style={{ fill: "white", position: "absolute" }}
      width="24px"
      height="24px"
    >
      <circle cx="12.5" cy="12.2" r="8.292" />
    </svg>
    <svg
      style={{ fill: "#06befa", position: "absolute" }}
      width="24px"
      height="24px"
    >
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
    </svg>
  </div>
);

const imgStyle = {
  maxHeight: MAX_HEIGHT,
  transition: "transform .135s cubic-bezier(0.0,0.0,0.2,1),opacity linear .15s",
};
const selectedImgStyle = {
  transform: "translateZ(0px) scale3d(0.9, 0.9, 1)",
  transition: "transform .135s cubic-bezier(0.0,0.0,0.2,1),opacity linear .15s",
};

const SelectedImage = ({ index, photo, selected, onImageClick }) => {
  const [isSelected, setIsSelected] = useState(selected);

  const handleOnClick = async (e) => {
    try {
      onImageClick && (await onImageClick());
      setIsSelected(!isSelected);
    } catch (error) {
    }
  };

  useEffect(() => {
    setIsSelected(selected);
  }, [selected]);

  return (
    <div
      style={{
        position: "relative",
        margin: "10px",
        backgroundColor: "#eee",
        cursor: "pointer",
        overflow: "hidden",
        maxWidth: "45%",
        maxHeight: MAX_HEIGHT,
        display: "inline-block",
      }}
      className={!isSelected ? "not-selected" : ""}
    >
      <Checkmark selected={isSelected ? true : false} />
      <img
        className="img"
        alt={`images-${index}`}
        width="100%"
        height="100%"
        style={
          isSelected ? { ...imgStyle, ...selectedImgStyle } : { ...imgStyle }
        }
        src={photo}
        onClick={handleOnClick}
      />
      <style jsx>{`
        .not-selected:hover {
          outline: 2px solid #06befa;
        }
      `}</style>
    </div>
  );
};

export default SelectedImage;