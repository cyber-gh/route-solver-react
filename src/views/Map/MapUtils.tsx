import { compose, withProps } from "recompose";
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
    InfoWindow,
} from "react-google-maps";
import {useState} from "react";

const MyGoogleMap = compose(
    withProps({
        googleMapURL:
            "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `100%` }} />,
        mapElement: <div style={{ height: `100%` }} />,
    }),
    withScriptjs,
    withGoogleMap
)(() => {
    const [popupCenter, setPopupCenter] = useState(null);

    // we receive coordinates as array
    // const markerPosition = { lat: marker.position[0], lng: marker.position[1] };
    const gCenter = { lat: 40.674, lng: -73.945 };

    return (
        <GoogleMap defaultZoom={8} center={gCenter}>


        </GoogleMap>
    );
});
