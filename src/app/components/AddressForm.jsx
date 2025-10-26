"use client";
import { useEffect, useState } from "react";
import statesData from "../data/states.json";

export default function AddressForm({ address, onChange, errors }) {
    const [cities, setCities] = useState([]);

    useEffect(() => {
        if (address.state) {
            setCities(statesData[address.state] || []);
        }
    }, [address.state]);

    const handleInput = (e) => {
        const { name, value } = e.target;
        onChange(name, value);
    };

    const handleStateChange = (e) => {
        const state = e.target.value;
        onChange("state", state);
        onChange("city", ""); // reset city when state changes
        setCities(statesData[state] || []);
    };

    return (
        <fieldset className="border-t pt-2 mt-3">
            <legend className="text-sm font-semibold mb-1">Address</legend>

            <input
                name="line1"
                placeholder="Line 1"
                className="border p-2 w-full rounded mb-3"
                value={address.line1}
                onChange={handleInput}
            />
            <input
                name="line2"
                placeholder="Line 2"
                className="border p-2 w-full rounded mb-3"
                value={address.line2}
                onChange={handleInput}
            />

            <select
                name="state"
                className="border p-2 w-full rounded mb-3"
                value={address.state}
                onChange={handleStateChange}
            >
                <option value="">Select State</option>
                {Object.keys(statesData).map((state) => (
                    <option key={state}>{state}</option>
                ))}
            </select>

            <select
                name="city"
                className="border p-2 w-full rounded mb-3"
                value={address.city}
                onChange={handleInput}
            >
                <option value="">Select City</option>
                {cities.map((city) => (
                    <option key={city}>{city}</option>
                ))}
            </select>

            <input
                name="pin"
                placeholder="PIN"
                className="border p-2 w-full rounded"
                value={address.pin}
                onChange={handleInput}
            />
            {errors.pin && <p className="text-red-500 text-sm">{errors.pin}</p>}
        </fieldset>
    );
}
