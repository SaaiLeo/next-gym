import Plan from '@/models/Plan';


export async function GET(request, {params}) {
    const id = params.id;
    const plan = await Plan.findById(id);
    return Response.json(plan);
}

export async function DELETE(request, {params}) {
    const id = params.id;
    const plan = await Plan.findByIdAndDelete(id);
    return Response.json(plan)
}