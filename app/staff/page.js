"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { DataGrid } from "@mui/x-data-grid";
import Navbar from "../components/Navbar";

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
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded-md"
            >
              ✏️
            </button>
            <button
              onClick={() => deleteStaff(params.row)}
              className="bg-gray-300 hover:bg-gray-700 text-white font-bold py-1 px-3 rounded-md"
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

    // Create new staff
    fetch(`${APIBASE}/staff`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(() => {
      fetchStaff();
      stopEditMode();
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
    <div>
      <Navbar />

      <main className="p-8 bg-gray-100 min-h-screen pt-20">
        {/* Form Card */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-6">Manage Trainer</h2>
          <form
            onSubmit={handleSubmit(handleMemberFormSubmit)}
            className="grid grid-cols-2 gap-6"
          >
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Name:
              </label>
              <input
                name="name"
                type="text"
                {...register("name", { required: true })}
                className="border border-gray-300 text-gray-600 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Phone:
              </label>
              <input
                name="phone"
                type="number"
                {...register("phone")}
                className="border border-gray-300 text-gray-600 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Salary:
              </label>
              <input
                name="salary"
                type="number"
                {...register("salary")}
                className="border border-gray-300 text-gray-600 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Working Hour:
              </label>
              <input
                name="workinghour"
                type="text"
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

        {/* DataGrid Table */}
        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Trainer List</h2>
          <DataGrid
            rows={staffList}
            columns={columns}
            pageSize={5}
            autoHeight
            className="text-gray-700"
          />
        </div>
      </main>
    </div>
  );
}
