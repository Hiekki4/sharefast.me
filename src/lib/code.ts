"use server"

import prisma from "@/lib/prisma";
import { characterList } from "@/lib/utils"
import ms from "ms"


export const generateCode = async (length: number): Promise<{ code: string, characters: any[] }> => {
    var characters = characterList
    const character = characters.find((character) => character.value === length) || characters[0];

    // Check if the limit has been reached
    if (length === character.value) {
        const count = await prisma.code.findMany({
            where: {
                characters: length
            }
        })

        if (length === 2) {
            // add field enabled to the character
            characters = characterList.map((character) => {
                if (character.value === length) {
                    character.enabled = false
                }
                return character
            })
            return generateCode(length + 1);
        }

        if (count.length >= character.limit) {
            characters = characterList.filter((character) => character.value !== length);
            return generateCode(length + 1);
        }
    }

    // Generate the code
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let code = "";
    for (let i = 0; i < length; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    // Verify that the code is unique
    const check = await prisma.code.findUnique({
        where: {
            id: code
        }
    })

    if (check !== null) {
        return generateCode(length);
    }

    await prisma.code.create({
        data: {
            id: code,
            characters: length,
            expires_at: new Date(Date.now() + ms('1h'))
        }
    })
    
    // Return the code
    return {
        code,
        characters: characterList
    }
}

export async function updateCode(code: string, expiresAfter: string) {
    await prisma.code.update({
        where: {
            id: code
        },
        data: {
            expires_at: new Date(Date.now() + ms(expiresAfter))
        }
    })

    return true
}