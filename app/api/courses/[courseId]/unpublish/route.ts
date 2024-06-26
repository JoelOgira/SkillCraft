import { auth } from "@clerk/nextjs"
import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export async function PATCH(
    req: Request,
    { params }: { params: { courseId: string } }
) {
    try {
        const { courseId } = params

        const { userId } = auth()
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const course = await db.course.findUnique({
            where: {
                id: courseId,
                userId
            }
        })

        if (!course) {
            return new NextResponse("Unauthorized", { status: 404 })
        }

        const unpublishedCourse = await db.course.update({
            where: {
                id: courseId,
                userId
            },
            data: {
                isPublished: false
            }
        })

        return NextResponse.json(unpublishedCourse)

    } catch (error) {
        console.log("COURSE_ID_UNPUBLISH", error)
        return new NextResponse("Internal server error", { status: 500 })
    }
}
