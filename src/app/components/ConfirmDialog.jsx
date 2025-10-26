"use client";
import React from "react";
import { AlertTriangle } from "lucide-react"; // built-in icon if you use shadcn/lucide

export default function ConfirmModal({ show, message, onConfirm, onCancel }) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-[90%] max-w-md p-6 relative animate-fadeIn">
        {/* Header */}
        <div className="flex items-center gap-3 border-b pb-3 mb-4">
          <div className="bg-red-100 text-red-600 p-2 rounded-full">
            <AlertTriangle size={22} />
          </div>
          <h2 className="text-xl font-semibold text-gray-800">Confirm Delete</h2>
        </div>

        {/* Message */}
        <p className="text-gray-600 text-base leading-relaxed mb-6">{message}</p>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition text-gray-800 font-medium"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition text-white font-medium shadow-sm"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
