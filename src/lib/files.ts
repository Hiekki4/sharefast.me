"use server"

import prisma from "@/lib/prisma";

export async function saveFile(code: string, filename: string, size: number, type: string) {
    await prisma.file.create({
        data: {
            code,
            name: filename,
            type: type,
            size: size
        }
    })
}