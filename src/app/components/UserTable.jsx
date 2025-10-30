"use client";
import { useState } from "react";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteUser } from "../redux/userSlice";
import ConfirmDialog from "./ConfirmDialog";
import { CONFIG } from "../config/settings"; // import config

export default function UserTable({ onEdit }) {
  const users = useSelector((s) => s.users);
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState({ show: false, userId: null });

  const handleDelete = (id) => {
    setConfirmDialog({ show: true, userId: id });
  };

  const confirmDelete = () => {
    dispatch(deleteUser(confirmDialog.userId));
    setConfirmDialog({ show: false, userId: null });
  };

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <table className="w-full border-collapse">
        <thead className="bg-gray-200 text-left">
          <tr>
            <th className="p-3 text-center">Name</th>
            <th className="p-3 text-center">Email</th>
            <th className="p-3 text-center">LinkedIn</th>
            <th className="p-3 text-center">Gender</th>
            <th className="p-3 text-center">Address</th>
            <th className="p-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <React.Fragment key={u.id}>
              <tr className="border-b hover:bg-gray-50">
                <td className="p-3">{u.name}</td>
                <td className="p-3">{u.email}</td>
                <td className="p-3">
                  <a
                    href={u.linkedin}
                    target="_blank"
                    className="text-blue-500"
                  >
                    {u.linkedin}
                    {/* Profile */}
                  </a>
                </td>
                <td className="p-3">{u.gender}</td>
                <td className="p-3">
                  <button
                    className="bg-orange-400 text-white px-4 py-2 rounded"
                    onClick={() =>
                      setExpanded(expanded === u.id ? null : u.id)
                    }
                  >
                    {expanded === u.id ? "Hide" : "View"}
                  </button>
                </td>
                <td className="p-3 text-center space-x-2">
                  {/* Enable/disable Edit based on config */}
                  <button
                    className={`bg-green-600 text-white px-4 py-2 rounded ${!CONFIG.editable ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                    onClick={() => CONFIG.editable && onEdit(u)}
                    disabled={!CONFIG.editable}
                  >
                    Edit
                  </button>

                  <button
                    className="bg-red-600 text-white px-4 py-2 rounded"
                    onClick={() => handleDelete(u.id)}
                  >
                    Delete
                  </button>


                </td>
              </tr>

              {expanded === u.id && (
                <tr className="bg-gray-50">
                  <td colSpan="5" className="p-3 text-sm text-gray-600">
                    <b>Address:</b> {u.address.line1}, {u.address.line2},{" "}
                    {u.address.city}, {u.address.state}, PIN: {u.address.pin}
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>

      {/* Custom Confirm Modal */}
      <ConfirmDialog
        show={confirmDialog.show}
        message="Are you sure you want to delete this user?"
        onConfirm={confirmDelete}
        onCancel={() => setConfirmDialog({ show: false, userId: null })}
      />
    </div>
  );
}
