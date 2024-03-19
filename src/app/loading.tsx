import Image from 'next/image'
import React from 'react'

export default function Loading() {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <Image src="/logo.png" alt="ShareFast" width={500} height={500} className="animate-pulse" />
        </div>
    )
}
