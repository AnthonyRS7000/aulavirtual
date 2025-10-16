import React from "react";
import "./CardItems.css";

interface Button {
  text: string;
  icon: React.ReactNode;
  onClick: () => void;
}

interface CardItemsProps {
  title: string;
  image: string;
  description: string;
  buttons: Button[];
  footerText?: React.ReactNode;
}

const CardItems: React.FC<CardItemsProps> = ({
  title,
  image,
  description,
  buttons,
  footerText,
}) => {
  return (
    <div className="card-item">
      {/* Imagen de la tarjeta */}
      <div className="card-item-image-container">
        <img src={image} alt={title} className="card-item-image" />
      </div>

      {/* Contenido de la tarjeta */}
      <div className="card-item-content">
        <h3 className="card-item-title">{title}</h3>
        <p className="card-item-description">{description}</p>

        {/* Botones */}
        <div className="card-item-buttons">
          {buttons.map((button, index) => (
            <button
              key={index}
              onClick={button.onClick}
              className="card-item-button"
            >
              {button.icon && <span className="card-item-button-icon">{button.icon}</span>}
              {button.text}
            </button>
          ))}
        </div>

        {/* Footer opcional */}
        {footerText && (
          <div className="card-item-footer">
            {footerText}
          </div>
        )}
      </div>
    </div>
  );
};

export default CardItems;
