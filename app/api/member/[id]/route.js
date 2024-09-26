import Member from '@/models/Member';

export async function GET(request, {params}) {
    const id = params.id;
    const member = await Member.findById(id);
    return Response.json(member);
}

export async function DELETE(request, {params}) {
    const id = params.id;
    const member = await Member.findByIdAndDelete(id);
    return Response.json(member)
}