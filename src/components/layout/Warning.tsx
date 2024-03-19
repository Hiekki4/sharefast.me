"use client"

import * as React from "react"

import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from "@/components/ui/drawer"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWarning } from '@fortawesome/free-solid-svg-icons'

import { useMediaQuery } from "@/hooks/use-media-query"
import { Button } from "@/components/ui/button"

export default function Warning() {
    const [open, setOpen] = React.useState(true)
    const isDesktop = useMediaQuery("(min-width: 768px)")

    if (isDesktop) {
        return (
            <Alert className="flex-col lg:flex-row container p-4 mb-8" variant="warning">
                <AlertTitle>
                    <FontAwesomeIcon icon={faWarning} className="w-[16x] h-[16px] mr-2" />
                    Beta Version
                </AlertTitle>
                <AlertDescription>
                    <span className="text-slate-400">This is a beta version of ShareFast, some features may not work as expected.</span>
                    <span className="text-slate-400"> If you find any bugs please report them to <a href="mailto:support@sharefast.me" className="text-blue-500">
                        support@sharefast.me
                    </a>.
                    </span>
                </AlertDescription>
            </Alert>
        )
    }

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerContent className="">
                <DrawerHeader className="text-left">
                    <DrawerTitle className="text-lg text-[#f59e0b]">
                        <FontAwesomeIcon icon={faWarning} className="w-[16x] h-[16px] mr-2" />
                        Beta Version
                    </DrawerTitle>
                    <DrawerDescription>
                        <span className="text-slate-400">This is a beta version of ShareFast, some features may not work as expected.</span>
                        <span className="text-slate-400"> If you find any bugs please report them to <a href="mailto:support@sharefast.me" className="text-blue-500">
                            support@sharefast.me
                        </a>.
                        </span>
                    </DrawerDescription>
                </DrawerHeader>
                <DrawerFooter className="pt-2">
                    <DrawerClose asChild>
                        <Button variant="outline">Close</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}