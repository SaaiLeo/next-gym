"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { DataGrid } from "@mui/x-data-grid";

export default function Home() {

    const APIBASE = process.env.NEXT_PUBLIC_API_URL

    const columns = [
        {field: 'Action', headerName: 'Action', width: 90,
            renderCell: (params) => {
                return (
                    <div>
                        <button onClick={() => startEditMode(params.row)}>✏️</button>
                        {'  '}
                        <button onClick={() => deleteStaff(params.row)}>🗑️</button>
                    </div>
                )
            }
        },
        {field: 'name', headerName: 'Name', width: 150},
        {field: 'phone', headerName: 'Phone', width: 150},
        {field: 'salary', headerName: 'Salary', width: 150},
        {field: 'workinghour', headerName: 'WorkingHour', width: 150},
        // {field: 'weight', headerName: 'Weight', width: 150},
    ]

    const [staffList, setStaffList] = useState([]);
    const { register, handleSubmit, reset } = useForm();
    const [editMode, setEditMode] = useState(false);

    async function fetchStaff() {
        const data = await fetch(`${APIBASE}/staff`);
        const c = await data.json()
        const c2 = c.map((staff) => {
            return{
            ...staff,
            id: staff._id,
            }
        })
        setStaffList(c2)
    }

    useEffect(() => {
        fetchStaff();
    }, []);


    async function deleteStaff(staff) {
        if (!confirm([`Deleting ${staff.name}`])) return

        const id = staff._id;
        await fetch(`${APIBASE}/staff/${id}`, {
            method: "DELETE",
        })
        fetchStaff()
    }

    function handleMemberFormSubmit(data) {

        if (editMode) {
            fetch(`${APIBASE}/staff`, {
                method: "PUT",
                headers: {
                    "Content-Types" : "appliction/json",
                },
                body: JSON.stringify(data)
        }).then(() => {
            fetchStaff()
            stopEditMode()
        })
        return
        }

        // create new
        fetch(`${APIBASE}/staff`, {
            method: "POST",
            headers: {
                "Content-Types": "application/json",
            },
            body: JSON.stringify(data),
        }).then(() => {
            fetchStaff()
        });
        return
    }

    function startEditMode(staff) {
        reset(staff)
        setEditMode(true)
    }

    function stopEditMode() {
        reset({
            name:"",
            phone:"",
            salary:"",
            workinghour:"",
        
    })
        setEditMode(false)
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
                        className="border border-gray-300 text-gray-600 text-sm rounded-lg focus: ring-blue-500 focus:border-blue-500 w-full p-2.5"
                    />

                    <h1>Phone:</h1>
                    <input
                        name="phone"
                        type="number"
                        {...register("phone")}
                        className="border border-gray-300 text-gray-600 text-sm rounded-lg focus: ring-blue-500 focus:border-blue-500 w-full p-2.5"
                    />

                    <h1>Salary:</h1>
                    <input
                        name="salary"
                        type="number"
                        {...register("salary")}
                        className="border border-gray-300 text-gray-600 text-sm rounded-lg focus: ring-blue-500 focus:border-blue-500 w-full p-2.5"
                    />

                    <h1>Working Hour:</h1>
                    <input
                        name="workinghour"
                        type="number"
                        {...register("workinghour")}
                        className="border border-gray-300 text-gray-600 text-sm rounded-lg focus: ring-blue-500 focus:border-blue-500 w-full p-2.5"
                    />

                    {/* <h1>Height:</h1>
                    <input
                        name="height"
                        type="number"
                        {...register("height")}
                        className="border border-gray-300 text-gray-600 text-sm rounded-lg focus: ring-blue-500 focus:border-blue-500 w-full p-2.5"
                    />


                    <h1>Weight:</h1>
                    <input
                        name="weight"
                        type="number"
                        {...register("weight")}
                        className="border border-gray-300 text-gray-600 text-sm rounded-lg focus: ring-blue-500 focus:border-blue-500 w-full p-2.5"
                    /> */}

                    <div className="col-span-2 text-right">
                        {editMode ?
                            <>
                                <input
                                    type="submit"
                                    value="Update"
                                    className="bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                                />

                                <button 
                                onClick={() => stopEditMode()}
                                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full"
                                >Cancel</button>

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

            <div className="m-2">
                <DataGrid 
                    rows={staffList}
                    columns={columns}
                />
            </div>

            {/* <div>
                <h1>All members ({memberList.length})</h1>
                {memberList.map((member) =>
                    <div key={member._id} className="ml-4">
                        <button onClick={() => deleteMember(member)}>Delete</button>
                        <button onClick={() => startEditMode(member)}>Edit</button>
                        <Link href={`/plan/${member._id}`} className="text-red-600">
                            {member.name} 📞 {member.phone} ☠️ {member.age} {member.height} {member.weight}
                        </Link>
                    </div>
                )}
            </div> */}
        </main >
    )
}