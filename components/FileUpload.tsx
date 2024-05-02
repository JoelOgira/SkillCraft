"use client"

import { UploadDropzone } from "@/lib/uploadthing"
import { ourFileRouter } from "@/app/api/uploadthing/core"
import toast from "react-hot-toast"

type FileUploadProps = {
    onChange: (url?: string) => void
    endpoint: keyof typeof ourFileRouter
}

export default function FileUpload({
    onChange,
    endpoint
}: FileUploadProps) {
    return (
        <UploadDropzone
            endpoint={endpoint}
            onClientUploadComplete={(res) => {
                onChange(res?.[ 0 ].url)
            }}
            onUploadError={(error: Error) => {
                toast.error(`ERROR! ${error?.message}`)
            }}
        />
    )
}
