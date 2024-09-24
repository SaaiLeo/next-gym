import Plan from "@/models/Plan";

export async function POST(request) {
    const body = await request.json()
    const plan = new Plan(body)
    await plan.save()
    return Response.json(plan)
}

export async function GET() {
    const plans = await Plan.find().sort({price: -1})
    return Response.json(plans)
}

