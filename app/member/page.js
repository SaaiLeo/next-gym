"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";

export default function Home() {

    const APIBASE = process.env.NEXT_PUBLIC_API_URL

    const [memberList, setMemberList] = useState([]);

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

    return (
        <main>
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
        </main>
    )
}