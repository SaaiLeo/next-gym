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
                <div>
                    <div>Plan name:</div>
                    <div>
                        <input
                            name="name"
                            type="text"
                            {...register("name", { required: true })}
                        />
                    </div>
                    <div className="col-span-2 text-right">
                        <input
                            type="submit"
                            value="Create"
                        />
                    </div>
                </div>
            </form>

            <div className="ml-4">
                <h1>Plan ({planList.length})</h1>
                {planList.map((plan) =>
                    <div key={plan._id} className="ml-4">
                        <button onClick={() =>  deletePlan(plan)}>Delete</button>
                        <Link href={`/plan/${plan._id}`}>
                            {plan.name}
                        </Link>
                    </div>
                )}
            </div>

        </main>
    )
}