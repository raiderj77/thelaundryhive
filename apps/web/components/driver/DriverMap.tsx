"use client";
import React, { useState, useCallback } from "react";
import { GoogleMap, useLoadScript, Marker, DirectionsRenderer, InfoWindow } from "@react-google-maps/api";
import { Navigation, Truck, CheckCircle, MapPin, X } from "lucide-react";
import { ProofOfDelivery } from "./ProofOfDelivery";

// Demo stops in San Francisco
const INITIAL_STOPS = [
    { id: 1, name: "Laundry Hive HQ", lat: 37.7749, lng: -122.4194, type: "hub", status: "pending" }, // Start
    { id: 2, name: "Alice's Pickup", lat: 37.7849, lng: -122.4094, type: "pickup", status: "pending" },
    { id: 3, name: "Bob's Dropoff", lat: 37.7649, lng: -122.4294, type: "dropoff", status: "pending" },
    { id: 4, name: "Hotel Grand", lat: 37.7949, lng: -122.3994, type: "pickup", status: "pending" },
    { id: 5, name: "Charlie's Place", lat: 37.7549, lng: -122.4394, type: "dropoff", status: "pending" },
];

const mapContainerStyle = {
    width: "100%",
    height: "100%",
    minHeight: "500px",
    borderRadius: "1rem",
};

const center = {
    lat: 37.7749,
    lng: -122.4194,
};

const libraries: ("places")[] = ["places"];

export default function DriverMap() {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY || "",
        libraries,
    });

    const [stops, setStops] = useState(INITIAL_STOPS);
    const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);
    const [optimizing, setOptimizing] = useState(false);
    const [routeStats, setRouteStats] = useState<{ duration: string; distance: string } | null>(null);
    const [selectedStop, setSelectedStop] = useState<any | null>(null);
    const [showProof, setShowProof] = useState(false);

    const optimizeRoute = useCallback(() => {
        if (!isLoaded || !window.google) return;
        setOptimizing(true);

        try {
            const directionsService = new google.maps.DirectionsService();
            const origin = { lat: stops[0].lat, lng: stops[0].lng };
            const destination = { lat: stops[0].lat, lng: stops[0].lng };

            // Only include pending stops in optimization
            const waypoints = stops.slice(1).filter(s => s.status === 'pending').map(stop => ({
                location: { lat: stop.lat, lng: stop.lng },
                stopover: true,
            }));

            if (waypoints.length === 0) {
                setOptimizing(false);
                alert("All stops completed!");
                return;
            }

            directionsService.route(
                {
                    origin,
                    destination,
                    waypoints,
                    optimizeWaypoints: true,
                    travelMode: google.maps.TravelMode.DRIVING,
                },
                (result, status) => {
                    setOptimizing(false);
                    if (status === google.maps.DirectionsStatus.OK && result) {
                        setDirections(result);
                        const route = result.routes[0];
                        let totalDist = 0;
                        let totalDur = 0;
                        route.legs.forEach(leg => {
                            totalDist += leg.distance?.value || 0;
                            totalDur += leg.duration?.value || 0;
                        });
                        setRouteStats({
                            distance: (totalDist / 1609.34).toFixed(1) + " mi",
                            duration: Math.round(totalDur / 60) + " min",
                        });
                    } else {
                        console.error(`Directions request failed due to ${status}`);
                    }
                }
            );
        } catch (err) {
            setOptimizing(false);
            console.error("Error initializing DirectionsService:", err);
        }
    }, [isLoaded, stops]);

    const handleStopComplete = (proof: any) => {
        console.log("Proof received:", proof);
        setStops(stops.map(s => s.id === selectedStop.id ? { ...s, status: 'completed' } : s));
        setShowProof(false);
        setSelectedStop(null);
    };

    if (loadError) return <div className="p-4 text-red-400">Error loading maps. Check API Key.</div>;
    if (!isLoaded) return <div className="p-4 text-slate-400 animate-pulse">Loading Driver Hub...</div>;

    return (
        <div className="flex flex-col h-[calc(100vh-100px)] gap-4 relative">
            {/* Proof Modal */}
            {showProof && selectedStop && (
                <div className="absolute inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="w-full max-w-md relative">
                        <button
                            onClick={() => setShowProof(false)}
                            className="absolute -top-12 right-0 text-white hover:text-slate-300"
                        >
                            <X size={32} />
                        </button>
                        <ProofOfDelivery
                            type={selectedStop.type}
                            onComplete={handleStopComplete}
                        />
                    </div>
                </div>
            )}

            {/* Header / Controls */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-4">
                <div>
                    <h2 className="text-xl font-bold flex items-center gap-2 text-slate-800">
                        <Truck className="text-hive-primary" /> Driver Route Optimizer
                    </h2>
                    <p className="text-sm text-slate-500">
                        {stops.filter(s => s.status === 'pending').length} stops remaining
                    </p>
                </div>

                {routeStats && (
                    <div className="flex gap-4 text-sm font-medium bg-slate-50 px-4 py-2 rounded-lg border border-slate-100">
                        <div className="flex flex-col items-center">
                            <span className="text-slate-400 text-xs uppercase">Est. Time</span>
                            <span className="text-slate-800">{routeStats.duration}</span>
                        </div>
                        <div className="w-px bg-slate-200"></div>
                        <div className="flex flex-col items-center">
                            <span className="text-slate-400 text-xs uppercase">Distance</span>
                            <span className="text-slate-800">{routeStats.distance}</span>
                        </div>
                    </div>
                )}

                <button
                    onClick={optimizeRoute}
                    disabled={optimizing}
                    className="bg-hive-primary text-hive-dark px-6 py-3 rounded-lg font-bold flex items-center gap-2 hover:brightness-110 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-hive-primary/20"
                >
                    {optimizing ? "Calculating..." : <><Navigation size={18} /> Optimize Route</>}
                </button>
            </div>

            {/* Map Area */}
            <div className="flex-1 bg-slate-100 rounded-2xl overflow-hidden border border-slate-200 relative shadow-inner">
                <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    zoom={13}
                    center={center}
                    options={{
                        disableDefaultUI: false,
                        zoomControl: true,
                        streetViewControl: false,
                        mapTypeControl: false,
                        styles: [
                            { featureType: "poi", elementType: "labels", stylers: [{ visibility: "off" }] },
                        ]
                    }}
                >
                    {stops.map((stop) => (
                        <Marker
                            key={stop.id}
                            position={{ lat: stop.lat, lng: stop.lng }}
                            label={{
                                text: stop.id.toString(),
                                color: "white",
                                fontWeight: "bold"
                            }}
                            icon={stop.status === 'completed' ? {
                                path: google.maps.SymbolPath.CIRCLE,
                                scale: 10,
                                fillColor: "#10b981", // Green
                                fillOpacity: 1,
                                strokeColor: "#ffffff",
                                strokeWeight: 2,
                            } : undefined}
                            onClick={() => setSelectedStop(stop)}
                        />
                    ))}

                    {directions && (
                        <DirectionsRenderer
                            directions={directions}
                            options={{
                                polylineOptions: {
                                    strokeColor: "#f59e0b",
                                    strokeWeight: 6,
                                    strokeOpacity: 0.8,
                                },
                                suppressMarkers: true, // We use our own markers
                            }}
                        />
                    )}

                    {selectedStop && (
                        <InfoWindow
                            position={{ lat: selectedStop.lat, lng: selectedStop.lng }}
                            onCloseClick={() => setSelectedStop(null)}
                        >
                            <div className="p-2 min-w-[200px]">
                                <h3 className="font-bold text-lg mb-1">{selectedStop.name}</h3>
                                <div className="flex items-center gap-2 text-sm text-slate-500 mb-3">
                                    <MapPin size={14} />
                                    <span className="capitalize">{selectedStop.type}</span>
                                </div>

                                {selectedStop.status === 'completed' ? (
                                    <div className="bg-green-100 text-green-700 px-3 py-2 rounded-lg text-sm font-bold flex items-center gap-2 justify-center">
                                        <CheckCircle size={16} /> Completed
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => setShowProof(true)}
                                        className="w-full bg-hive-primary text-hive-dark py-2 rounded-lg font-bold text-sm hover:brightness-110 transition shadow-sm"
                                    >
                                        Complete Stop
                                    </button>
                                )}
                            </div>
                        </InfoWindow>
                    )}
                </GoogleMap>
            </div>
        </div>
    );
}
