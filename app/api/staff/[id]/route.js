import Staff from '@/models/Staff';

export async function GET(request, {params}) {
    const id = params.id;
    const staff = await Staff.findById(id);
    return Response.json(staff);
}

export async function DELETE(request, {params}) {
    const id = params.id;
    const staff = await Staff.findByIdAndDelete(id);
    return Response.json(staff)
}