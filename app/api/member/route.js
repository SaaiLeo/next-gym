import Member from '@/models/Member'

export async function POST(request) {
    const body = await request.json()
    const member = new  Member(body)
    await member.save()
    return Response.json(member)
}

export async function GET() {
    const members = await Member.find().sort({name: 1})
    return Response.json(members)
}

export async function PUT(request) {
    const body = await request.json()
    const member = await Member.findByIdAndUpdate(body._id,body)
    return Response.json(member)
}