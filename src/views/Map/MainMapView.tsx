/* eslint-disable no-undef */
import React, {useContext, useEffect, useState} from "react";
// import { GoogleMap, Marker, withGoogleMap } from "react-google-maps"
import {GoogleMap, InfoWindow, LoadScript, Marker, Polyline, useJsApiLoader} from '@react-google-maps/api';
import usePersistentState from "../../utils/usePersistentState";
import {RouteMapContext} from "../../state/MapContext";

var polyline = require('@mapbox/polyline');

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

const generateJobIcon = (value: string): string => {
    let color = "rgb(137,153,186)";
    return `data:image/svg+xml;utf-8,  <svg width="36" height="31"  viewBox="0 0 36 31" xmlns="http://www.w3.org/2000/svg"><style>.small { font: 15px sans-serif; fill: white;}</style><path d="M0 6.5C0 3.18629 2.68629 0.5 6 0.5H30C33.3137 0.5 36 3.18629 36 6.5V24.5C36 27.8137 33.3137 30.5 30 30.5H6C2.68629 30.5 0 27.8137 0 24.5V6.5Z" fill="${color}"/><text x="12" y="22" class="small">${value}</text></svg>`

}

const MainMapView = ({theme}: Props) => {



    const {route, solution} = useContext(RouteMapContext);

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY || ""
    })

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
        if (route?.findRoute?.startLocation) {
            bounds.extend({
                lat: route.findRoute.startLocation.latitude,
                lng: route.findRoute.startLocation.longitude
            })
        }
        map.fitBounds(bounds);
    }
    useEffect(() => {
        console.log("the route is ")
        console.log(route)
        if (route) {
            if (mapRef !== null) {
                fitBounds(mapRef)
            }
        }
    }, [route])

    const loadHandler = (map: any) => {
        console.log("Map loaded")
        setMapRef(map)
    }

    const decodePolyline = (raw: string): google.maps.LatLng[] => {
        let ans = polyline.decode(raw, 6).map((x: any) => {

            return {lat: x[0], lng: x[1]}
        })
        console.log("Decoded polyline is ")
        console.log(ans)
        return ans
    }

    let isDark = theme === "theme--dark"
    return isLoaded ? (
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

                    {
                        route?.findRoute?.orders.map((it) => {
                            let l = {
                                lat: it.location.latitude, lng: it.location.longitude
                            }
                            return (
                                <Marker key={it.id} position={l} icon={{
                                    url: generateJobIcon("O")
                                }}/>
                            )
                        })
                    }

                    {route?.findRoute?.startLocation &&
                    <Marker key={route.findRoute.id}
                            position={{lat: route.findRoute.startLocation.latitude, lng: route.findRoute.startLocation.longitude}}
                            icon={{
                        url: generateJobIcon("S")
                    }}/>
                    }

                    {google && solution?.directions &&
                    <Polyline
                        path={decodePolyline(solution.directions?.geometry || "")}
                        options={{
                            strokeColor: '#2156C3',
                            strokeOpacity: 1,
                            strokeWeight: 6,
                            geodesic: true,
                            icons: [{
                                icon: {
                                    path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
                                    scale: 1,
                                    fillColor: "#fff",
                                    strokeColor: "#fff"
                                },
                                offset: '100%',
                                repeat: '40px'
                            }]
                        }}
                    />}

                    {
                        solution?.orders.map((it) => {
                            let l = {
                                lat: it.details!.location.latitude, lng: it.details!.location.longitude
                            }
                            return (
                                <Marker key={it.id} position={l} icon={{
                                    url: generateJobIcon((it.order + 1).toString())
                                }}/>
                            )
                        })
                    }
                    
                </GoogleMap>
    ) : <></>

}

export default MainMapView;
