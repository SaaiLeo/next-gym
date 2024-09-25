"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";


export default function Home() {

    const APIBASE = process.env.NEXT_PUBLIC_API_URL;

    const [planList, setPlanList] = useState([]);
    const { register, handleSubmit } = useForm();

    async function fetchPlan() {
        const data = await fetch(`${APIBASE}/plan`);
        const c = await data.json();
        setPlanList(c);
    }

    useEffect(() => {
        fetchPlan();
    }, []);

    function handlePlanFormSubmit(data) {
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
        await fetch(`${APIBASE}/plan/${id}`,{
            method: "DELETE",
        })
        fetchPlan()
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
                    <div className="col-span-2 text-right">
                        <input
                            type="submit"
                            value="Create"
                            className="bg-green-700 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full"
                        />
                    </div>
                </div>
            </form>

            <div className="ml-4">
                <h1>Plan ({planList.length})</h1>
                {planList.map((plan) =>
                    <div key={plan._id} className="ml-4">
                        <button onClick={() =>  deletePlan(plan)}>Delete</button>
                        <Link href={`/plan/${plan._id}`} className="text-red-600">
                            {plan.name}
                        </Link>
                    </div>
                )}
            </div>

        </main>
    )
}