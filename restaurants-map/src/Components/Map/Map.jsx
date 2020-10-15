import React from 'react';
import ReactMapboxGl, { Layer, Feature, Marker, Popup } from 'react-mapbox-gl';

import RoomIcon from '@material-ui/icons/Room';
import './style.css';

const Map = ReactMapboxGl({
  accessToken:
  'pk.eyJ1IjoibWlxYXllbCIsImEiOiJja2c5cWo5cWEwcWJiMnlsc2ZhM3JlOTdiIn0.SeJoZpqPpIZewDkqOIOK8g'
});

const DEFAULT_COORDINATE = [-0.2416815, 51.5285582];

const MapContainer = ({ markers, activeMarker }) => {
	const mapCoordinates = (activeMarker && activeMarker.coordinates) || DEFAULT_COORDINATE;
	return (
		<Map
			style="mapbox://styles/mapbox/streets-v9"
			containerStyle={{
				height: '100%',
				width: '50%'
			}}
			center={mapCoordinates}
		>
			{markers.map(({coordinates, title}) => (
				<Marker
					coordinates={coordinates}
					anchor="bottom"
					className="marker"
					key={`${title}-${coordinates[0]}`}
				>
					<RoomIcon />
				</Marker>
			))}
			<Layer type="symbol" id="marker" layout={{ 'icon-image': 'marker-15' }}>
				<Feature coordinates={mapCoordinates} />
			</Layer>
			{activeMarker && (
				<Popup
					coordinates={activeMarker.coordinates}
					offset={{
						'bottom-left': [0, 0],  'bottom': [0, -30], 'bottom-right': [0, 0]
					}}
				>
  				<p>{activeMarker.title}</p>
					<p>{activeMarker.description}</p>
				</Popup>
			)}
		</Map>
	);
};

export default MapContainer;