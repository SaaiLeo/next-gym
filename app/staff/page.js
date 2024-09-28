"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { DataGrid } from "@mui/x-data-grid";

export default function Home() {
  const APIBASE = process.env.NEXT_PUBLIC_API_URL;

  const columns = [
    {
      field: "Action",
      headerName: "Action",
      width: 120,
      renderCell: (params) => {
        return (
          <div className="flex space-x-2">
            <button
              onClick={() => startEditMode(params.row)}
              className="bg-blue-500 hover:bg-blue-700 text-white p-1 rounded-md"
            >
              ✏️
            </button>
            <button
              onClick={() => deleteStaff(params.row)}
              className="bg-red-500 hover:bg-red-700 text-white p-1 rounded-md"
            >
              🗑️
            </button>
          </div>
        );
      },
    },
    { field: "name", headerName: "Name", width: 150 },
    { field: "phone", headerName: "Phone", width: 150 },
    { field: "salary", headerName: "Salary", width: 150 },
    { field: "workinghour", headerName: "Working Hour", width: 150 },
  ];

  const [staffList, setStaffList] = useState([]);
  const { register, handleSubmit, reset } = useForm();
  const [editMode, setEditMode] = useState(false);

  async function fetchStaff() {
    const data = await fetch(`${APIBASE}/staff`);
    const c = await data.json();
    const c2 = c.map((staff) => {
      return {
        ...staff,
        id: staff._id,
      };
    });
    setStaffList(c2);
  }

  useEffect(() => {
    fetchStaff();
  }, []);

  async function deleteStaff(staff) {
    if (!confirm([`Deleting ${staff.name}`])) return;

    const id = staff._id;
    await fetch(`${APIBASE}/staff/${id}`, {
      method: "DELETE",
    });
    fetchStaff();
  }

  function handleMemberFormSubmit(data) {
    if (editMode) {
      fetch(`${APIBASE}/staff`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then(() => {
        fetchStaff();
        stopEditMode();
      });
      return;
    }

    // create new
    fetch(`${APIBASE}/staff`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(() => {
      fetchStaff();
    });
  }

  function startEditMode(staff) {
    reset(staff);
    setEditMode(true);
  }

  function stopEditMode() {
    reset({
      name: "",
      phone: "",
      salary: "",
      workinghour: "",
    });
    setEditMode(false);
  }

  return (
    <main className="p-6 bg-gray-50 min-h-screen">
      <div className="bg-white p-4 rounded-lg shadow-md">
        <form onSubmit={handleSubmit(handleMemberFormSubmit)} className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Name:</label>
            <input
              name="name"
              type="text"
              {...register("name", { required: true })}
              className="border border-gray-300 text-gray-600 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Phone:</label>
            <input
              name="phone"
              type="number"
              {...register("phone")}
              className="border border-gray-300 text-gray-600 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Salary:</label>
            <input
              name="salary"
              type="number"
              {...register("salary")}
              className="border border-gray-300 text-gray-600 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Working Hour:</label>
            <input
              name="workinghour"
              type="number"
              {...register("workinghour")}
              className="border border-gray-300 text-gray-600 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5"
            />
          </div>

          <div className="col-span-2 flex justify-end space-x-4 mt-4">
            {editMode ? (
              <>
                <input
                  type="submit"
                  value="Update"
                  className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-lg"
                />
                <button
                  onClick={() => stopEditMode()}
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg"
                >
                  Cancel
                </button>
              </>
            ) : (
              <input
                type="submit"
                value="Create"
                className="bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded-lg"
              />
            )}
          </div>
        </form>
      </div>

      <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
        <DataGrid rows={staffList} columns={columns} autoHeight className="text-gray-700" />
      </div>
    </main>
  );
}
