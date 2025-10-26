"use client";
import { useState, useEffect } from "react";
import AddressForm from "./AddressForm";
import { CONFIG } from "../config/settings";

export default function UserForm({ onSubmit, onCancel, initialData }) {
    const [form, setForm] = useState({
        name: "",
        email: "",
        linkedin: "",
        gender: "",
        address: {
            line1: "",
            line2: "",
            state: "",
            city: "",
            pin: "",
        },
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (initialData) {
            setForm(initialData);
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    // 📌 this will be passed to AddressForm
    const handleAddressChange = (field, value) => {
        setForm((prev) => ({
            ...prev,
            address: { ...prev.address, [field]: value },
        }));
    };

    const validate = () => {
        const err = {};
        if (
            !form.name ||
            form.name.length < CONFIG.name.minLength ||
            form.name.length > CONFIG.name.maxLength
        )
            err.name = `Name must be ${CONFIG.name.minLength}-${CONFIG.name.maxLength} chars`;
        if (!/\S+@\S+\.\S+/.test(form.email)) err.email = "Invalid email";
        if (!/^https?:\/\/.+/.test(form.linkedin)) err.linkedin = "Invalid URL";
        if (!form.gender) err.gender = "Gender required";
        if (!/^\d{6}$/.test(form.address.pin)) err.pin = "PIN must be 6 digits";
        return err;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const v = validate();
        if (Object.keys(v).length) setErrors(v);
        else onSubmit(form);
    };

    return (
        <div className="p-5 bg-white shadow-md rounded-xl">
            <h2 className="text-lg font-semibold mb-3">
                {initialData ? "Edit User" : "Add User"}
            </h2>
            <form className="space-y-3" onSubmit={handleSubmit}>
                <input
                    name="name"
                    placeholder="Name"
                    className="border p-2 w-full rounded"
                    value={form.name}
                    onChange={handleChange}
                    disabled={!CONFIG.editable && !!initialData}
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

                <input
                    name="email"
                    placeholder="Email"
                    className="border p-2 w-full rounded"
                    value={form.email}
                    onChange={handleChange}
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

                <input
                    name="linkedin"
                    placeholder="LinkedIn URL"
                    className="border p-2 w-full rounded"
                    value={form.linkedin}
                    onChange={handleChange}
                />
                {errors.linkedin && (
                    <p className="text-red-500 text-sm">{errors.linkedin}</p>
                )}

                <select
                    name="gender"
                    className="border p-2 w-full rounded"
                    value={form.gender}
                    onChange={handleChange}
                >
                    <option value="">Select Gender</option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                </select>
                {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}

                {/* 👇 Include Address Subform */}
                <AddressForm
                    address={form.address}
                    onChange={handleAddressChange}
                    errors={errors}
                />

                <div className="flex justify-end gap-3 mt-2">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="bg-gray-300 px-4 py-1 rounded"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-1 rounded"
                    >
                        {initialData ? "Update" : "Add"}
                    </button>
                </div>
            </form>
        </div>
    );
}
