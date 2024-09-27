import Staff from '@/models/Staff'

export async function POST(request) {
    const body = await request.json()
    const staff = new Staff(body)
    await staff.save()
    return Response.json(staff)
}

export async function GET() {
    const staffs = await Staff.find().sort({name: 1})
    return Response.json(staffs)
}

export async function PUT(request) {
    const body = await request.json()
    const staff = await Staff.findByIdAndUpdate(body._id,body)
    return Response.json(staff)
}