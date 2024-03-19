import * as React from "react"

import { get } from '@vercel/edge-config'
import { generateCode } from '@/lib/code';

import Settings from '@/components/Settings'
import Warning from "@/components/layout/Warning"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"

import { SettingsWrapper } from "@/context/Settings";
import FileUpload from "@/components/FileUpload";

export default async function Home() {
    const code = await generateCode(2)

    return (
        <>
            <Navbar />
            <main className="min-h-fit grid content-center">
                <div className="min-h-full mt-auto grid content-center">
                    <div className="absolute w-full h-[450px] top-0 bg-white -z-10"></div>
                    {await get('beta') &&
                        <Warning />
                    }
                    <div className="flex flex-col lg:flex-row container p-4 border-0 sm:border border-gray-100 bg-white rounded-md">
                        <SettingsWrapper data={{ code: code.code, expiresAfter: '24h', password: false }}>
                            <Settings URL={code} />
                            <FileUpload />
                        </SettingsWrapper>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}