"use client";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser, editUser } from "./redux/userSlice";
import UserTable from "./components/UserTable";
import UserForm from "./components/UserForm";

export default function Page() {
  const dispatch = useDispatch();
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null);

  const handleSubmit = (data) => {
    if (editData) dispatch(editUser({ ...data, id: editData.id }));
    else dispatch(addUser(data));
    setShowForm(false);
    setEditData(null);
  };

  return (
    <div className="max-w-6xl mx-auto mt-10">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-2xl font-bold">User Management</h1>
        <button onClick={() => setShowForm(true)} className="bg-blue-600 text-white px-4 py-2 rounded">
          Add User
        </button>
      </div>

      {showForm ? (
        <UserForm
          onSubmit={handleSubmit}
          onCancel={() => { setShowForm(false); setEditData(null); }}
          initialData={editData}
        />
      ) : (
        <UserTable onEdit={(u) => { setEditData(u); setShowForm(true); }} />
      )}
    </div>
  );
}
