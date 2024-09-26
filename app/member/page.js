"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { stringify } from "postcss";

export default function Home() {

    const APIBASE = process.env.NEXT_PUBLIC_API_URL

    const [memberList, setMemberList] = useState([]);
    const { register, handleSubmit } = useForm();

    async function fetchMember() {
        const data = await fetch(`${APIBASE}/member`);
        const c = await data.json()
        setMemberList(c)
    }

    useEffect(() => {
        fetchMember();
    }, []);


    async function deleteMember(member) {
        if (!confirm([`Deleting ${member.name}`])) return

        const id = member._id;
        await fetch(`${APIBASE}/member/${id}`, {
            method: "DELETE",
        })
        fetchMember()
    }

    function handleMemberFormSubmit(data) {

        // create new
        fetch(`${APIBASE}/member`, {
            method: "POST",
            headers: {
                "Content-Types": "application/json",
            },
            body: JSON.stringify(data),
        }).then(() => {
            fetchMember()
        });
        return
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

                    <div className="col-span-2 text-right">
                        <input
                            type="submit"
                            value="Create"
                            className="bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded-full"
                        />
                    </div>
                </div>

            </form>
            <div>
                <h1>All members ({memberList.length})</h1>
                {memberList.map((member) =>
                    <div key={member._id} className="ml-4">
                        <button onClick={() => deleteMember(member)}>Delete</button>
                        <Link href={`/plan/${member._id}`} className="text-red-600">
                            {member.name}
                        </Link>
                    </div>
                )}
            </div>
        </main >
    )
}