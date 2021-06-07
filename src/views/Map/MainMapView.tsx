/* eslint-disable no-undef */
import React, {useContext, useEffect, useState} from "react";
// import { GoogleMap, Marker, withGoogleMap } from "react-google-maps"
import {GoogleMap, InfoWindow, LoadScript, Marker, Polyline} from '@react-google-maps/api';
import usePersistentState from "../../utils/usePersistentState";
import {RouteMapContext} from "../../state/MapContext";

interface Props {
    theme: string
}

const mapStyles = {
    height: "100vh",
    width: "100%",
}

const nightStyles: google.maps.MapTypeStyle[] = [
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
]

const generateJobIcon = (nr: Number): string => {
    let color = "rgb(33, 86, 195)";
    return `data:image/svg+xml;utf-8,  <svg width="36" height="31"  viewBox="0 0 36 31" xmlns="http://www.w3.org/2000/svg"><style>.small { font: 15px sans-serif; fill: white;}</style><path d="M0 6.5C0 3.18629 2.68629 0.5 6 0.5H30C33.3137 0.5 36 3.18629 36 6.5V24.5C36 27.8137 33.3137 30.5 30 30.5H6C2.68629 30.5 0 27.8137 0 24.5V6.5Z" fill="${color}"/><text x="${nr < 10 ? 14 : 10}" y="22" class="small">${nr}</text></svg>`

}

const MainMapView = ({theme}: Props) => {



    const {route} = useContext(RouteMapContext);

    const [defaultCenter, setDefaultCenter] = useState<any>({ lat: 40.674, lng: -73.945 })
    const [defaultZoom, setDefaultZoom] = useState<number>(12)

    const [mapRef, setMapRef] = useState<any | null>(null);


    const fitBounds = (map: any) => {
        const bounds = new window.google.maps.LatLngBounds();
        route?.findRoute?.orders.map(it => {
            let googleLocation = {
                lat: it.location.latitude,
                lng: it.location.longitude
            }
            bounds.extend(googleLocation);
            return it.id;
        })
        map.fitBounds(bounds);
    }
    useEffect(() => {
        console.log("the route is ")
        console.log(route)
        if (route) {
            let m = document.getElementById("google-map")!
            if (m !== null) {
                fitBounds(m)
            }
        }
    }, [route])

    const loadHandler = (map: any) => {
        console.log("Map loaded")
        setMapRef(map)
    }

    let isDark = theme === "theme--dark"
    return (
        <LoadScript
            googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_KEY || ""}>
                <GoogleMap
                    mapContainerStyle={mapStyles}
                    zoom={defaultZoom}
                    center={defaultCenter}
                    onLoad={loadHandler}
                    id={"google-map"}
                    options={{
                        styles: isDark ? nightStyles : [],
                    }}
                >

                    {/*{*/}
                    {/*    route?.findRoute?.orders.map((it) => {*/}
                    {/*        let l = {*/}
                    {/*            lat: it.location.latitude, lng: it.location.longitude*/}
                    {/*        }*/}
                    {/*        return (*/}
                    {/*            <Marker key={it.id} position={l} />*/}
                    {/*        )*/}
                    {/*    })*/}
                    {/*}*/}

                    <Marker key="sdafaserfsdafa" position={{ lat: 40.674, lng: -73.945 }} icon={{
                        url: generateJobIcon(2)
                    }} />
                    
                </GoogleMap>
        </LoadScript>
    )

}

export default MainMapView;
