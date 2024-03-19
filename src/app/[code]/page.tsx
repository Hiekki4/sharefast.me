import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";

import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileImage, faFileAudio, faFileArchive, faFileCode, faFileExcel, faFilePdf, faFileWord, faFileZipper, faFileVideo, faFile } from '@fortawesome/free-solid-svg-icons'

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { Button } from "@/components/ui/button"

export default async function Code({ params }: { params: { code: string } }) {
    const code = await prisma.code.findUnique({
        where: {
            id: params.code
        }
    })

    if (code === null) {
        redirect("/")
    }

    if (code.expires_at < new Date()) {
        return (
            <>
                <Navbar />
                <main className="min-h-fit grid content-center">
                    <div className="min-h-full mt-auto grid content-center">
                        <h1 className="text-4xl font-bold text-center">Files expired</h1>
                        <p className="text-center">The files have expired and are no longer available for download.</p>
                    </div>
                </main>
                <Footer />
            </>
        )
    }

    const files = await prisma.file.findMany({
        where: {
            code: params.code
        }
    })

    const list = files.map((file) => {
        let icon = faFile
        if (file.type.includes('image')) {
            icon = faFileImage;
        } else if (file.type.includes('video')) {
            icon = faFileVideo
        } else if (file.type.includes('audio')) {
            icon = faFileAudio;
        } else if (file.type.includes('pdf')) {
            icon = faFilePdf;
        } else if (file.type.includes('word')) {
            icon = faFileWord;
        } else if (file.type.includes('excel')) {
            icon = faFileExcel;
        } else if (file.type.includes('zip')) {
            icon = faFileZipper;
        } else if (file.type.includes('archive')) {
            icon = faFileArchive;
        } else if (file.type.includes('javascript') || file.type.includes('json') || file.type.includes('html') || file.type.includes('css')) {
            icon = faFileCode;
        } else {
            icon = faFileArchive;
        }

        return (
            <Card key={file.id} className="border shadow border-gray-200 justify-center rounded-md mt-2">
                <CardHeader className="justify-center gap-2">
                    <FontAwesomeIcon icon={icon} className="h-[120px] text-blue-500" />
                    <CardTitle>{file.name}</CardTitle>
                </CardHeader>
                <CardFooter className="justify-center">
                    <Button className="w-full">
                        Download
                    </Button>
                </CardFooter>
            </Card>
        )
    })

    return (
        <>
            <Navbar />
            <main className="p-4 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {list}
            </main>
            <Footer />
        </>
    )
}