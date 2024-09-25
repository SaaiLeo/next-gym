"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import {DataGrid} from "@mui/x-data-grid";


export default function Home() {

    const APIBASE = process.env.NEXT_PUBLIC_API_URL;

    const columns = [
        {field: 'Action', headerName: "Action", width: 90, 
            renderCell: (params) => {
                return (
                    <div>
                        <button onClick={() => startEditMode(params.row)}>✏️</button>
                        {'  '}
                        <button onClickCapture={() => deletePlan(params.row)}>🗑️</button>
                    </div>
                )
            }
        },
        {field: 'name', headerName: 'Name', width: 150},
        {field: 'price', headerName: 'Price (THB)', width: 150},
        {field: 'duration', headerName: 'Duration (Month)', width: 150}
    ]

    const [planList, setPlanList] = useState([]);
    const { register, handleSubmit, reset } = useForm();
    const [editMode, setEditMode] = useState(false);

    async function fetchPlan() {
        const data = await fetch(`${APIBASE}/plan`);
        const c = await data.json();
        const c2 = c.map((plan) => {
            return{
            ...plan,
            id: plan._id,
            }
        })
        setPlanList(c2);
    }

    useEffect(() => {
        fetchPlan();
    }, []);

    function handlePlanFormSubmit(data) {
        if (editMode) {
            // Modify new plan if plan exit
            fetch(`${APIBASE}/plan`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            }).then(() => {
                fetchPlan()
                stopEditMode()
            });

            return
        }

        // Create new plan if plan doesn't exit
        fetch(`${APIBASE}/plan`, {
            method: "POST",
            headers: {
                "Content-Type": "appliction/json",
            },
            body: JSON.stringify(data),
        }).then(() => {
            fetchPlan()
        });
        return
    }

    async function deletePlan(plan) {
        if (!confirm(`Deleting [${plan.name}]`)) return

        const id = plan._id
        await fetch(`${APIBASE}/plan/${id}`, {
            method: "DELETE",
        })
        fetchPlan()
    }

    function startEditMode(plan) {
        reset(plan)
        setEditMode(true)
    }

    function stopEditMode() {
        reset({
            name: '',
            price: '',
            duration: '',
        })
        setEditMode(false)
    }

    return (
        <main>
            <form onSubmit={handleSubmit(handlePlanFormSubmit)}>
                <div className="grid grid-cols-2 gap-4 w-fit m-4 border border-gray-400 p-2 rounded-lg">
                    <div>Plan name:</div>
                    <div>
                        <input
                            name="name"
                            type="text"
                            {...register("name", { required: true })}
                            className="border border-gray-300 text-gray-600 text-sm rounded-lg focus: ring-blue-500 focus:border-blue-500 w-full p-2.5"
                        />
                    </div>

                    <div>Price (THB):</div>
                    <div>
                    <input
                        name="price"
                        type="number"
                        {...register("price", { required: true })}
                        className="border border-gray-300 text-gray-600 text-sm rounded-lg focus: ring-blue-500 focus:border-blue-500 w-full p-2.5"
                    />
                    </div>

                    <div>Duration (month):</div>
                    <div>
                        <input
                        name="duration"
                        type="number"
                        {...register("duration", {required: true})}
                        className="border border-gray-300 text-gray-600 text-sm rounded-lg focus: ring-blue-500 focus:border-blue-500 w-full p-2.5"
                        />
                    </div>

                    <div className="col-span-2 text-right">
                        {editMode ?
                            <>
                                <input
                                    type="submit"
                                    value="Update"
                                    className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-full"
                                />
                                {'  '}
                                <button
                                    onClick={() => stopEditMode()}
                                    className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-full"
                                >
                                    Cancel
                                </button>
                            </>
                            :
                            <input
                                type="submit"
                                value="Create"
                                className="bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded-full"
                            />
                        }

                    </div>
                </div>
            </form>


            <div className="ml-4">
                <DataGrid
                    rows={planList}
                    columns={columns}
                />
            </div>

            {/* <div className="ml-4">
                <h1>Plan ({planList.length})</h1>
                {planList.map((plan) =>
                    <div key={plan._id} className="ml-4">
                        <button onClick={() => deletePlan(plan)} className="ml-2">Delete</button>
                        <button onClick={() => startEditMode(plan)} className="ml-2">Edit</button>
                        <Link href={`/plan/${plan._id}`} className="text-red-600">
                            {plan.name}
                        </Link>
                    </div>
                )}
            </div> */}

        </main>
    )
}