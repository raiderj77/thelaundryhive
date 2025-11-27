"use client";
import React, { useState, useCallback } from "react";
import { GoogleMap, useLoadScript, Marker, DirectionsRenderer, InfoWindow } from "@react-google-maps/api";
import { Navigation, Truck, CheckCircle, MapPin, X, ExternalLink, List, Map as MapIcon } from "lucide-react";
import { ProofOfDelivery } from "./ProofOfDelivery";

// Demo stops in San Francisco
const INITIAL_STOPS = [
    { id: 1, name: "Laundry Hive HQ", lat: 37.7749, lng: -122.4194, type: "hub", status: "pending", address: "123 Main St" }, // Start
    { id: 2, name: "Alice's Pickup", lat: 37.7849, lng: -122.4094, type: "pickup", status: "pending", address: "456 Market St" },
    { id: 3, name: "Bob's Dropoff", lat: 37.7649, lng: -122.4294, type: "dropoff", status: "pending", address: "789 Mission St" },
    { id: 4, name: "Hotel Grand", lat: 37.7949, lng: -122.3994, type: "pickup", status: "pending", address: "101 California St" },
    { id: 5, name: "Charlie's Place", lat: 37.7549, lng: -122.4394, type: "dropoff", status: "pending", address: "202 Castro St" },
];

const mapContainerStyle = {
    width: "100%",
    height: "100%",
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
    const [viewMode, setViewMode] = useState<'map' | 'list'>('map'); // For mobile toggle

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

    const openExternalMap = (stop: any) => {
        const url = `https://www.google.com/maps/dir/?api=1&destination=${stop.lat},${stop.lng}`;
        window.open(url, '_blank');
    };

    if (loadError) return <div className="p-4 text-red-400">Error loading maps. Check API Key.</div>;
    if (!isLoaded) return <div className="p-4 text-slate-600 animate-pulse">Loading Driver Hub...</div>;

    return (
        <div className="flex flex-col h-[calc(100vh-80px)] md:flex-row gap-4 relative overflow-hidden">
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

            {/* Sidebar / List View */}
            <div className={`
                flex-col bg-white rounded-xl shadow-sm border border-slate-200 w-full md:w-96 flex-shrink-0
                ${viewMode === 'list' ? 'flex' : 'hidden md:flex'}
            `}>
                <div className="p-4 border-b border-slate-100 bg-slate-50 rounded-t-xl">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-bold flex items-center gap-2 text-slate-800">
                            <Truck className="text-hive-primary" size={20} /> Route Plan
                        </h2>
                        <div className="text-xs font-bold bg-slate-200 text-slate-600 px-2 py-1 rounded">
                            {stops.filter(s => s.status === 'pending').length} LEFT
                        </div>
                    </div>

                    {routeStats && (
                        <div className="flex gap-2 text-sm font-medium bg-white p-2 rounded border border-slate-200 mb-3">
                            <div className="flex-1 text-center">
                                <span className="block text-slate-400 text-[10px] uppercase">Est. Time</span>
                                <span className="text-slate-800">{routeStats.duration}</span>
                            </div>
                            <div className="w-px bg-slate-100"></div>
                            <div className="flex-1 text-center">
                                <span className="block text-slate-400 text-[10px] uppercase">Distance</span>
                                <span className="text-slate-800">{routeStats.distance}</span>
                            </div>
                        </div>
                    )}

                    <button
                        onClick={optimizeRoute}
                        disabled={optimizing}
                        className="w-full bg-hive-primary text-white py-2 rounded-lg font-bold text-sm flex items-center justify-center gap-2 hover:brightness-110 transition disabled:opacity-50"
                    >
                        {optimizing ? "Calculating..." : <><Navigation size={16} /> Optimize Route</>}
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-2 space-y-2">
                    {stops.map((stop, index) => (
                        <div
                            key={stop.id}
                            onClick={() => {
                                setSelectedStop(stop);
                                setViewMode('map'); // Switch to map on mobile when clicked
                            }}
                            className={`
                                p-3 rounded-lg border cursor-pointer transition-all
                                ${selectedStop?.id === stop.id ? 'border-hive-primary bg-hive-primary/5 ring-1 ring-hive-primary' : 'border-slate-100 hover:border-slate-300 bg-white'}
                                ${stop.status === 'completed' ? 'opacity-60 grayscale' : ''}
                            `}
                        >
                            <div className="flex items-start gap-3">
                                <div className={`
                                    w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0 mt-0.5
                                    ${stop.status === 'completed' ? 'bg-green-500' : 'bg-slate-400'}
                                `}>
                                    {stop.status === 'completed' ? <CheckCircle size={14} /> : index + 1}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-bold text-slate-800 truncate">{stop.name}</h3>
                                    <p className="text-xs text-slate-500 truncate">{stop.address}</p>
                                    <div className="flex items-center gap-2 mt-2">
                                        <span className={`
                                            text-[10px] font-bold px-1.5 py-0.5 rounded uppercase
                                            ${stop.type === 'pickup' ? 'bg-blue-100 text-blue-700' : stop.type === 'dropoff' ? 'bg-purple-100 text-purple-700' : 'bg-slate-100 text-slate-600'}
                                        `}>
                                            {stop.type}
                                        </span>
                                    </div>
                                </div>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        openExternalMap(stop);
                                    }}
                                    className="p-2 text-slate-400 hover:text-hive-primary hover:bg-slate-50 rounded-full"
                                    title="Open in Google Maps"
                                >
                                    <ExternalLink size={18} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Map Area */}
            <div className={`
                flex-1 bg-slate-100 rounded-xl overflow-hidden border border-slate-200 relative shadow-inner
                ${viewMode === 'map' ? 'block' : 'hidden md:block'}
            `}>
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
                    {stops.map((stop, index) => (
                        <Marker
                            key={stop.id}
                            position={{ lat: stop.lat, lng: stop.lng }}
                            label={{
                                text: (index + 1).toString(),
                                color: "white",
                                fontWeight: "bold"
                            }}
                            icon={stop.status === 'completed' ? {
                                path: google.maps.SymbolPath.CIRCLE,
                                scale: 10,
                                fillColor: "#10b981",
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
                                suppressMarkers: true,
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
                                <p className="text-sm text-slate-500 mb-3">{selectedStop.address}</p>

                                <div className="flex gap-2">
                                    <button
                                        onClick={() => openExternalMap(selectedStop)}
                                        className="flex-1 bg-white border border-slate-300 text-slate-700 py-2 rounded-lg font-bold text-xs flex items-center justify-center gap-1 hover:bg-slate-50"
                                    >
                                        <ExternalLink size={14} /> Navigate
                                    </button>

                                    {selectedStop.status !== 'completed' && (
                                        <button
                                            onClick={() => setShowProof(true)}
                                            className="flex-1 bg-hive-primary text-white py-2 rounded-lg font-bold text-xs hover:brightness-110"
                                        >
                                            Complete
                                        </button>
                                    )}
                                </div>
                            </div>
                        </InfoWindow>
                    )}
                </GoogleMap>

                {/* Mobile View Toggles */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex bg-white rounded-full shadow-lg border border-slate-200 p-1 md:hidden">
                    <button
                        onClick={() => setViewMode('list')}
                        className={`px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 ${viewMode === 'list' ? 'bg-slate-900 text-white' : 'text-slate-500'}`}
                    >
                        <List size={16} /> List
                    </button>
                    <button
                        onClick={() => setViewMode('map')}
                        className={`px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 ${viewMode === 'map' ? 'bg-slate-900 text-white' : 'text-slate-500'}`}
                    >
                        <MapIcon size={16} /> Map
                    </button>
                </div>
            </div>
        </div>
    );
}
