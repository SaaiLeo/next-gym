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