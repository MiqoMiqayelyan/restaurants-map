import React from 'react';

import './styles.css';

const RestaurantsList = ({title, rating, coordinates, description, openOnMap}) => (
  <div onClick={() => openOnMap(title, coordinates, description)} className="container">
    <p>Title: {title}</p>
    <p>Rating: {rating}</p>
    <p>{description}</p>
  </div>
)

export default RestaurantsList;