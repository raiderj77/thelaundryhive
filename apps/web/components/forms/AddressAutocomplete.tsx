"use client";
import React, { useState } from "react";
import { useLoadScript, Autocomplete } from "@react-google-maps/api";

const libraries: ("places")[] = ["places"];

interface AddressAutocompleteProps {
    onAddressSelect: (address: string, placeId: string) => void;
    placeholder?: string;
}

export default function AddressAutocomplete({ onAddressSelect, placeholder = "Enter delivery address" }: AddressAutocompleteProps) {
    const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY || "",
        libraries,
    });

    const onLoad = (autocompleteInstance: google.maps.places.Autocomplete) => {
        setAutocomplete(autocompleteInstance);
    };

    const onPlaceChanged = () => {
        if (autocomplete) {
            const place = autocomplete.getPlace();
            if (place.formatted_address && place.place_id) {
                onAddressSelect(place.formatted_address, place.place_id);
            }
        }
    };

    if (loadError) return <div>Error loading maps</div>;
    if (!isLoaded) return <div>Loading maps...</div>;

    return (
        <Autocomplete
            onLoad={onLoad}
            onPlaceChanged={onPlaceChanged}
            options={{
                componentRestrictions: { country: "us" },
                fields: ["formatted_address", "place_id"], // Only request necessary fields to save $
            }}
        >
            <input
                type="text"
                placeholder={placeholder}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-hive-primary focus:border-transparent"
            />
        </Autocomplete>
    );
}
