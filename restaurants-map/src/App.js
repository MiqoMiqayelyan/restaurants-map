import React, { useState, useEffect } from 'react';
import { TextField, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import RestaurantsList from'./Components/RestaurantsList';
import MapContainer from './Components/Map';

import './index.css';

const RestaurantsData = [
  {
    title:'Karas',
    rating:4.6,
    coordinates: [-0.2416815, 51.5285582],
    description: 'Armenian food'
  },
  {
    title:'Artash',
    rating:2.4,
    coordinates: [-0.2416532, 51.5435382],
    description: 'Artash shaverma'
  },
  {
    title:'Healthy food',
    rating:3.8,
    coordinates: [-0.2466815, 51.5245482],
    description: 'Healthy food'
  },
  {
    title:'SAS food',
    rating:3.0,
    coordinates: [-0.2416232, 51.4482382],
    description: 'Sas food'
  },
  {
    title:'Twix',
    rating:5,
    coordinates: [-0.2516815, 51.5285582],
    description: 'Twix candy'
  },
  {
    title:'Jose',
    rating:3.8,
    coordinates: [-0.2316815, 51.5234582],
    description: 'Jose club'
  }
];

const useStyles = makeStyles({
  root: {
    display: 'flex',
    height: '100vh',
    padding: '0 30px',
  },
  listContainer: {
    marginLeft: 20,
  },
  filterContainer: {
    display: 'flex',
    flexDirection: 'column'
  },
  minMaxFilter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
});

const App = () => {
  const [ restaurants, setRestaurants ] = useState(RestaurantsData);
  const [ activeRestaurant, setActiveRestaurant ] = useState(null);
  const [ minMaxValue, setMinMaxValue ] = useState({min: 1, max: 5});
  const classes = useStyles();

  const filterByTitle = (event) => {
    const value = event.target.value.toLowerCase();

    const filterRestaurants = RestaurantsData.filter((item) => item.title.toLowerCase().includes(value));

    setRestaurants(filterRestaurants);

    if (activeRestaurant) {
      setActiveRestaurant(null);
    }
  }

  const filterByRating = (event, isMax) => {
    const value = +event.target.value;
    isMax ? 
    setMinMaxValue((state) => ({...state, max: value})):
    setMinMaxValue((state) => ({...state, min: value}))

    const filterRestaurants = RestaurantsData.filter((item) => 
     isMax ? (item.rating >= minMaxValue.min) && (item.rating <= value) :
     (item.rating >= value) && (item.rating <= minMaxValue.max)
    )

    setRestaurants(filterRestaurants);
  }
  
  const openPopupOnClick = (title, coordinates, description) => {
    setActiveRestaurant({
      title,
      coordinates,
      description
    })
  }

  useEffect(() => {
    if(minMaxValue.min === 0 && minMaxValue.max === 0){
      setRestaurants(RestaurantsData);
      setMinMaxValue({min: 1, max: 5});
    }
  }, [minMaxValue]);

  return (
    <Container className={classes.root} >
      <MapContainer activeMarker={activeRestaurant} markers={restaurants} />
      <div className={classes.listContainer}>
        <div className={classes.filterContainer}>
          <TextField onChange={filterByTitle} label="Search" variant="filled" />
          <div className={classes.minMaxFilter}>
            <TextField
              onChange={(e) => filterByRating(e, false)}
              type="number"
              InputProps={{
                inputProps: { 
                max: 5, min: 1 
                }
              }}
              label="Min"
            />
            <span>to</span>
            <TextField
              onChange={(e) => filterByRating(e, true)}
              type="number"
              InputProps={{
                inputProps: { 
                max: 5, min: 1 
                }
              }}
              label="Max"
            />
          </div>
        </div>
      {restaurants.map((item) => 
        <RestaurantsList
          {...item}
          openOnMap={openPopupOnClick}
          key={`${item.rating}-${item.title}`}
        />
      )}
      </div>
    </Container>
  );
}

export default App;
