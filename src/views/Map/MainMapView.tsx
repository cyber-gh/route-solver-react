import React, {useEffect, useState} from "react";
import {GoogleMap, InfoWindow, LoadScript, Marker, MarkerClusterer, Polyline} from '@react-google-maps/api';
import usePersistentState from "../../utils/usePersistentState";

interface Props {
    theme: string
}

const mapStyles = {
    height: "100vh",
    width: "100%",

}

const MainMapView = ({theme}: Props) => {

    const [defaultCenter, setDefaultCenter] = useState<any>({ lat: 40.674, lng: -73.945 })
    const [defaultZoom, setDefaultZoom] = useState<number>(10)

    const [mapRef, setMapRef] = useState<any | null>(null);
    useEffect(() => {
        try {
            if (theme == "theme--dark") {
                setDarkMode()
            } else {
                setWhiteMode()
            }
        } catch (e) {
            console.error(e)
        }
    }, [theme])

    function setDarkMode() {
        const t = new google.maps.Map(document.getElementById("google-map")!, {
            center: defaultCenter,
            zoom: defaultZoom,
            styles: [
                { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
                { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
                { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
                {
                    featureType: "administrative.locality",
                    elementType: "labels.text.fill",
                    stylers: [{ color: "#d59563" }],
                },
                {
                    featureType: "poi",
                    elementType: "labels.text.fill",
                    stylers: [{ color: "#d59563" }],
                },
                {
                    featureType: "poi.park",
                    elementType: "geometry",
                    stylers: [{ color: "#263c3f" }],
                },
                {
                    featureType: "poi.park",
                    elementType: "labels.text.fill",
                    stylers: [{ color: "#6b9a76" }],
                },
                {
                    featureType: "road",
                    elementType: "geometry",
                    stylers: [{ color: "#38414e" }],
                },
                {
                    featureType: "road",
                    elementType: "geometry.stroke",
                    stylers: [{ color: "#212a37" }],
                },
                {
                    featureType: "road",
                    elementType: "labels.text.fill",
                    stylers: [{ color: "#9ca5b3" }],
                },
                {
                    featureType: "road.highway",
                    elementType: "geometry",
                    stylers: [{ color: "#746855" }],
                },
                {
                    featureType: "road.highway",
                    elementType: "geometry.stroke",
                    stylers: [{ color: "#1f2835" }],
                },
                {
                    featureType: "road.highway",
                    elementType: "labels.text.fill",
                    stylers: [{ color: "#f3d19c" }],
                },
                {
                    featureType: "transit",
                    elementType: "geometry",
                    stylers: [{ color: "#2f3948" }],
                },
                {
                    featureType: "transit.station",
                    elementType: "labels.text.fill",
                    stylers: [{ color: "#d59563" }],
                },
                {
                    featureType: "water",
                    elementType: "geometry",
                    stylers: [{ color: "#17263c" }],
                },
                {
                    featureType: "water",
                    elementType: "labels.text.fill",
                    stylers: [{ color: "#515c6d" }],
                },
                {
                    featureType: "water",
                    elementType: "labels.text.stroke",
                    stylers: [{ color: "#17263c" }],
                },
            ],
        });
    }

    function setWhiteMode() {
        const t = new google.maps.Map(document.getElementById("google-map")!, {
            center: defaultCenter,
                zoom: defaultZoom
        })
    }

    const loadHandler = (map: any) => {
        console.log("Map loaded")
        setMapRef(map)
        if (theme == "theme--dark") {
            setDarkMode()
        } else {
            setWhiteMode()
        }
    }

    return (
        <LoadScript
            googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_KEY || ""}>
                <GoogleMap
                    mapContainerStyle={mapStyles}
                    zoom={defaultZoom}
                    center={defaultCenter}
                    onLoad={loadHandler}
                    id={"google-map"}
                />
        </LoadScript>
    )

}

export default MainMapView;
