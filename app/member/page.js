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
          <div className="space-x-2">
            <button onClick={() => startEditMode(params.row)} 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded-md">
              ✏️
            </button>
            <button onClick={() => deleteMember(params.row)} 
            className="bg-gray-300 hover:bg-gray-700 text-white font-bold py-1 px-3 rounded-md">
              🗑️
            </button>
          </div>
        );
      },
    },
    { field: "name", headerName: "Name", width: 150 },
    { field: "phone", headerName: "Phone", width: 150 },
    { field: "age", headerName: "Age", width: 100 },
    { field: "height", headerName: "Height", width: 100 },
    { field: "weight", headerName: "Weight", width: 100 },
    { field: "plan", headerName: "Plan", width: 150 },
    { field: "startDate", headerName: "Start Date", width: 150 },
    { field: "endDate", headerName: "End Date", width: 150 },
    { field: "trainer", headerName: "Trainer", width: 150 },
  ];

  const [memberList, setMemberList] = useState([]);
  const [planList, setPlanList] = useState([]);
  const { register, handleSubmit, reset, watch, setValue } = useForm();
  const [editMode, setEditMode] = useState(false);
  const [staffList, setStaffList] = useState([]);

  const startDate = watch("startDate");
  const selectedPlan = watch("plan");

  const calculateEndDate = (startDate, duration) => {
    if (startDate && duration) {
      const date = new Date(startDate);
      date.setMonth(date.getMonth() + duration);
      return date.toISOString().slice(0, 10);
    }
    return "";
  };

  async function fetchMember() {
    const data = await fetch(`${APIBASE}/member`);
    const members = await data.json();
    const formattedMembers = members.map((member) => ({
      ...member,
      id: member._id,
    }));
    setMemberList(formattedMembers);
  }

  async function fetchPlan() {
    const data = await fetch(`${APIBASE}/plan`);
    const plans = await data.json();
    setPlanList(plans);
  }

  async function fetchStaff() {
    const data = await fetch(`${APIBASE}/staff`);
    const staff = await data.json();
    setStaffList(staff);
  }

  useEffect(() => {
    fetchPlan();
    fetchMember();
    fetchStaff();
  }, []);

  useEffect(() => {
    if (startDate && selectedPlan) {
      const planDuration = planList.find((plan) => plan.name === selectedPlan)?.duration || 0;
      const calculatedEndDate = calculateEndDate(startDate, planDuration);
      setValue("endDate", calculatedEndDate);
    }
  }, [startDate, selectedPlan, planList, setValue]);

  async function deleteMember(member) {
    if (!confirm([`Deleting ${member.name}`])) return;

    const id = member._id;
    await fetch(`${APIBASE}/member/${id}`, { method: "DELETE" });
    fetchMember();
  }

  function handleMemberFormSubmit(data) {
    const method = editMode ? "PUT" : "POST";
    fetch(`${APIBASE}/member`, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(() => {
      fetchMember();
      stopEditMode();
    });
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
      trainer: "",
    });
    setEditMode(false);
  }

  return (
    <div>
      <Navbar />
      <main className="p-8 bg-gray-100 min-h-screen pt-20">
      <form onSubmit={handleSubmit(handleMemberFormSubmit)} className="bg-white p-4 rounded-lg shadow-lg">
        <h1 className="text-xl font-semibold mb-4">{editMode ? "Edit Member" : "Add Member"}</h1>
        <div className="grid grid-cols-2 gap-4">
          {["name", "phone", "age", "height", "weight"].map((field) => (
            <div key={field}>
              <label className="block text-gray-700 font-medium mb-1 capitalize">{field}:</label>
              <input
                 type={field === "name" ? "text" : field === "phone" ? "tel" : "number"}
                {...register(field, { required: field !== "phone" })}
                className="border border-gray-300 rounded-lg w-full p-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          ))}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Plan:</label>
            <select
              name="plan"
              {...register("plan", { required: true })}
              className="border border-gray-300 rounded-lg w-full p-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select a plan</option>
              {planList.map((plan) => (
                <option key={plan._id} value={plan.name}>
                  {plan.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Start Date:</label>
            <input
              name="startDate"
              type="date"
              {...register("startDate", { required: true })}
              className="border border-gray-300 rounded-lg w-full p-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">End Date:</label>
            <input
              name="endDate"
              type="date"
              {...register("endDate")}
              readOnly
              className="border border-gray-300 rounded-lg w-full p-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Trainer:</label>
            <select
              name="trainer"
              {...register("trainer", { required: true })}
              className="border border-gray-300 rounded-lg w-full p-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select a trainer</option>
              {staffList.map((staff) => (
                <option key={staff._id} value={staff.name}>
                  {staff.name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-span-2 flex justify-end mt-4">
            <input
              type="submit"
              value={editMode ? "Update" : "Create"}
              className={`bg-${editMode ? 'blue' : 'green'}-600 hover:bg-${editMode ? 'blue' : 'green'}-700 text-white font-bold py-2 px-4 rounded-lg`}
            />
            {editMode && (
              <button
                onClick={() => stopEditMode()}
                className="ml-2 bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-lg"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </form>

      <div className="mt-6">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Member List</h2>
          <DataGrid
            rows={memberList}
            columns={columns}
            pageSize={5}
            autoHeight
            className="text-gray-700"
          />
        </div>
      </div>
    </main>
  </div>
  );
}