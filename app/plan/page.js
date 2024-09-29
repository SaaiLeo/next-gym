"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
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
          <div className="space-x-2">
            <button
              onClick={() => startEditMode(params.row)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded-md"
            >
              ✏️
            </button>
            <button
              onClickCapture={() => deletePlan(params.row)}
              className="bg-gray-300 hover:bg-gray-700 text-white font-bold py-1 px-3 rounded-md"
            >
              🗑️
            </button>
          </div>
        );
      },
    },
    { field: "name", headerName: "Name", width: 150 },
    { field: "price", headerName: "Price (THB)", width: 150 },
    { field: "duration", headerName: "Duration (Month)", width: 150 },
  ];

  const [planList, setPlanList] = useState([]);
  const { register, handleSubmit, reset } = useForm();
  const [editMode, setEditMode] = useState(false);

  async function fetchPlan() {
    const data = await fetch(`${APIBASE}/plan`);
    const c = await data.json();
    const c2 = c.map((plan) => {
      return {
        ...plan,
        id: plan._id,
      };
    });
    setPlanList(c2);
  }

  useEffect(() => {
    fetchPlan();
  }, []);

  function handlePlanFormSubmit(data) {
    if (editMode) {
      fetch(`${APIBASE}/plan`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then(() => {
        fetchPlan();
        stopEditMode();
      });

      return;
    }

    fetch(`${APIBASE}/plan`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(() => {
      fetchPlan();
      stopEditMode();
    });
    return;
  }

  async function deletePlan(plan) {
    if (!confirm(`Deleting [${plan.name}]`)) return;

    const id = plan._id;
    await fetch(`${APIBASE}/plan/${id}`, {
      method: "DELETE",
    });
    fetchPlan();
  }

  function startEditMode(plan) {
    reset(plan);
    setEditMode(true);
  }

  function stopEditMode() {
    reset({
      name: "",
      price: "",
      duration: "",
    });
    setEditMode(false);
  }

  return (
    <div>
      <Navbar />

      {/* Main content with some padding for a cleaner layout */}
      <main className="p-8 bg-gray-100 min-h-screen pt-20">
        <div className="bg-white shadow-md rounded-lg p-4 mb-6">
          <h2 className="text-2xl font-semibold mb-4">Manage Plans</h2>

          {/* Form section */}
          <form onSubmit={handleSubmit(handlePlanFormSubmit)} className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-1">Plan Name:</label>
              <input
                name="name"
                type="text"
                {...register("name", { required: true })}
                className="border border-gray-300 text-gray-700 rounded-md w-full px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Price (THB):</label>
              <input
                name="price"
                type="number"
                {...register("price", { required: true })}
                className="border border-gray-300 text-gray-700 rounded-md w-full px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Duration (Months):</label>
              <input
                name="duration"
                type="number"
                {...register("duration", { required: true })}
                className="border border-gray-300 text-gray-700 rounded-md w-full px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="col-span-2 text-right">
              {editMode ? (
                <>
                  <input
                    type="submit"
                    value="Update"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                  />
                  <button
                    onClick={() => stopEditMode()}
                    className="ml-4 bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-full"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <input
                  type="submit"
                  value="Create"
                  className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full"
                />
              )}
            </div>
          </form>
        </div>

        {/* DataGrid section */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Plan List</h2>
          <DataGrid
            rows={planList}
            columns={columns}
            pageSize={5}
            className="text-gray-700"
            autoHeight
          />
        </div>
      </main>
    </div>
  );
}
