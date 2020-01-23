import React from 'react'
import GoogleMapReact from 'google-map-react'

const LocationTitle = ({ text }) => <div>{text}</div>;
const lat = 44.046178
const lng = -123.066508
const zoom = 17

const myLatLng = {lat, lng}
const location = { center: myLatLng, zoom}

function renderMarkers(map, maps) {
    return new maps.Marker({
        position: myLatLng,
        map,
        title: 'Track Town Pizza'
      });
}

const GoogleMaps = () => {
    return (
        <div style={{ height: '100vh', width: '100%' }}>
            <GoogleMapReact
                bootstrapURLKeys={{key: process.env.API_KEY}}
                defaultCenter={location.center}
                defaultZoom={location.zoom}
                yesIWantToUseGoogleMapApiInternals
                onGoogleApiLoaded={({map, maps}) => renderMarkers(map, maps)}
                >
                <LocationTitle
                    lat={lat}
                    lng={lng}
                    text="Track Town Pizza"
                />
            </GoogleMapReact>
        </div>
    )
}

export default GoogleMaps