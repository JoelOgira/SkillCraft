import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import { db } from "@/lib/db"
import Link from "next/link"
import { ArrowLeft, Eye, LayoutDashboard, Video } from "lucide-react"
import { IconBadge } from "@/components/icon-badge"
import ChapterTitleForm from "./_components/chapter-title-form"
import ChapterDescriptionForm from "./_components/chapter-description-form"
import ChapterAccessForm from "./_components/chapter-access-form"
import ChapterVideoForm from "./_components/chapter-video-form"
import Banner from "@/components/ui/banner"
import ChapterActions from "./_components/chapter-actions"

export default async function ChapterIdPage({
    params
}: {
    params: { courseId: string; chapterId: string }
}) {
    const { userId } = auth()

    if (!userId) {
        redirect('/')
    }

    const chapter = await db.chapter.findUnique({
        where: {
            id: params.chapterId,
            courseId: params.courseId
        },
        include: {
            muxData: true
        }
    })

    if (!chapter) {
        return redirect(`/`)
    }

    const requiredFields = [
        chapter.title,
        chapter.description,
        chapter.muxData
    ]

    const totalFields = requiredFields.length
    const completedFields = requiredFields.filter(Boolean).length
    const completionText = `(${completedFields}/${totalFields})`

    const isComplete = requiredFields.every(Boolean)

    return (
        <>
            {!chapter?.isPublished && (
                <Banner
                    variant="warning"
                    label="This chapter is not yet published. It will not be visible in the course."
                />
            )}
            <main className="p-6">
                <Link
                    href={`/teachers/courses/${params.courseId}`}
                    className="flex items-center space-x-2 text-sm hover:opacity-75 transition mb-6"
                >
                    <ArrowLeft className="h-4 w-4" />
                    <span>Back to course setup</span>
                </Link>
                <div className="flex items-center justify-between">
                    <div className="flex items-center justify-between w-full">
                        <div className="flex flex-col space-y-2">
                            <h1 className="text-2xl font-medium">
                                Chapter Creation
                            </h1>
                            <span className="text-sm text-slate-700">
                                Complete all fields {completionText}
                            </span>
                        </div>
                    </div>
                    <ChapterActions
                        disabled={!isComplete}
                        courseId={params.courseId}
                        chapterId={params.chapterId}
                        isPublished={chapter.isPublished}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
                    <div className="space-y-4">
                        <div className="flex items-center gap-x-2">
                            <IconBadge size={"default"} icon={LayoutDashboard} />
                            <h2 className="text-lg">
                                Customize your chapter
                            </h2>
                        </div>
                        <ChapterTitleForm
                            initialData={chapter}
                            chapterId={params.chapterId}
                            courseId={params.courseId}
                        />
                        <ChapterDescriptionForm
                            initialData={chapter}
                            chapterId={params.chapterId}
                            courseId={params.courseId}
                        />
                        <div>
                            <div className="flex items-center gap-x-2">
                                <IconBadge size={"default"} icon={Eye} />
                                <h2 className="text-lg">
                                    Access Settings
                                </h2>
                            </div>
                            <ChapterAccessForm
                                initialData={chapter}
                                chapterId={params.chapterId}
                                courseId={params.courseId}
                            />
                        </div>
                    </div>

                    <div className="space-y-4" >
                        <div>
                            <div className="flex items-center gap-x-2">
                                <IconBadge size={"default"} icon={Video} />
                                <h2 className="text-lg">
                                    Add a video
                                </h2>
                            </div>
                            <ChapterVideoForm
                                initialData={chapter}
                                chapterId={params.chapterId}
                                courseId={params.courseId}
                            />
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}
