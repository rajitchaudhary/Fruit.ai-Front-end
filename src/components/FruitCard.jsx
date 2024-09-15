import React from "react";

const FruitCard = ({ fruit }) => {
  return (
    <div className="fruit-card">
      <img src={`/${fruit.image}`} alt={fruit.name} className="fruit-size" />
      <div className="content">
        <h2>{fruit.name}</h2>
        <p>{fruit.description}</p>
      </div>
    </div>
  );
};

export default FruitCard;
