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
      width: 90,
      renderCell: (params) => {
        return (
          <div>
            <button onClick={() => startEditMode(params.row)}>✏️</button>
            {"  "}
            <button onClick={() => deleteMember(params.row)}>🗑️</button>
          </div>
        );
      },
    },
    { field: "name", headerName: "Name", width: 150 },
    { field: "phone", headerName: "Phone", width: 150 },
    { field: "age", headerName: "Age", width: 150 },
    { field: "height", headerName: "Height", width: 150 },
    { field: "weight", headerName: "Weight", width: 150 },
    { field: "plan", headerName: "Plan", width: 150 },
    { field: "startDate", headerName: "StartDate", width: 150 },
    { field: "endDate", headerName: "EndDate", width: 150 },
  ];

  const [memberList, setMemberList] = useState([]);
  const [planList, setPlanList] = useState([]);
  const { register, handleSubmit, reset, watch, setValue } = useForm();
  const [editMode, setEditMode] = useState(false);

  const startDate = watch("startDate");
  const selectedPlan = watch("plan");

  const calculateEndDate = (startDate, duration) => {
    if (startDate && duration) {
      const date = new Date(startDate);
      date.setMonth(date.getMonth() + duration);
      return date.toISOString().split("T")[0]; // Convert to 'YYYY-MM-DD' format
    }
    return "";
  };

  async function fetchMember() {
    const data = await fetch(`${APIBASE}/member`);
    const c = await data.json();
    const c2 = c.map((member) => {
      return {
        ...member,
        id: member._id,
      };
    });
    setMemberList(c2);
  }

  async function fetchPlan() {
    const data = await fetch(`${APIBASE}/plan`);
    const c1 = await data.json();
    setPlanList(c1);
  }

  useEffect(() => {
    fetchPlan();
    fetchMember();
  }, []);

  useEffect(() => {
    if (startDate && selectedPlan) {
      const planDuration =
        planList.find((plan) => plan.name === selectedPlan)?.duration || 0;
      const calculatedEndDate = calculateEndDate(startDate, planDuration);
      setValue("endDate", calculatedEndDate); // Set endDate value in form
    }
  }, [startDate, selectedPlan, planList, setValue]);

  async function deleteMember(member) {
    if (!confirm([`Deleting ${member.name}`])) return;

    const id = member._id;
    await fetch(`${APIBASE}/member/${id}`, {
      method: "DELETE",
    });
    fetchMember();
  }

  function handleMemberFormSubmit(data) {
    if (editMode) {
      fetch(`${APIBASE}/member`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then(() => {
        fetchMember();
        stopEditMode();
      });
      return;
    }

    // Create new member
    fetch(`${APIBASE}/member`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(() => {
      fetchMember();
    });
    return;
  }

  function startEditMode(member) {
    reset(member);
    setEditMode(true);
  }

  function stopEditMode() {
    reset({
      name: "",
      phone: "",
      age: "",
      height: "",
      weight: "",
      plan: "",
      startDate: "",
      endDate: "",
    });
    setEditMode(false);
  }

  return (
    <main>
      <form onSubmit={handleSubmit(handleMemberFormSubmit)}>
        <div className="w-fit gap-4 p-2.5 m-2 border border-gray-400 rounded-lg grid grid-cols-2">
          <h1>Name:</h1>
          <input
            name="name"
            type="text"
            {...register("name", { required: true })}
            className="border border-gray-300 text-gray-600 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5"
          />

          <h1>Phone:</h1>
          <input
            name="phone"
            type="tel"
            {...register("phone")}
            className="border border-gray-300 text-gray-600 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5"
          />

          <h1>Age:</h1>
          <input
            name="age"
            type="number"
            {...register("age")}
            className="border border-gray-300 text-gray-600 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5"
          />

          <h1>Height:</h1>
          <input
            name="height"
            type="number"
            {...register("height")}
            className="border border-gray-300 text-gray-600 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5"
          />

          <h1>Weight:</h1>
          <input
            name="weight"
            type="number"
            {...register("weight")}
            className="border border-gray-300 text-gray-600 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5"
          />

          <h1>Plan:</h1>
          <div>
            <select
              name="plan"
              {...register("plan", { required: true })}
              className="border border-black w-full"
            >
              {planList.map((c1) => (
                <option key={c1._id} value={c1.name}>
                  {c1.name}
                </option>
              ))}
            </select>
          </div>

          <h1>Start Date:</h1>
          <input
            name="startDate"
            type="date"
            {...register("startDate")}
            className="border border-gray-300 text-gray-600 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5"
          />

          <h1>End Date:</h1>
          <input
            name="endDate"
            type="date"
            {...register("endDate")}
            readOnly
            className="border border-gray-300 text-gray-600 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5"
          />

          <div className="col-span-2 text-right">
            {editMode ? (
              <>
                <input
                  type="submit"
                  value="Update"
                  className="bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                />
                <button
                  onClick={() => stopEditMode()}
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full"
                >
                  Cancel
                </button>
              </>
            ) : (
              <input
                type="submit"
                value="Create"
                className="bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded-full"
              />
            )}
          </div>
        </div>
      </form>

      <div className="m-2">
        <DataGrid rows={memberList} columns={columns} />
      </div>
    </main>
  );
}
