"use client"

import { useState, useEffect, useRef, useCallback } from 'react'
import { toast } from 'sonner'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleInfo, faGears, faShieldHalved, faUserShield, faFile, faCopy, faRetweet, faCheck } from '@fortawesome/free-solid-svg-icons'

import { expireList } from "@/lib/utils"
import { generateCode } from '@/lib/code'

import { useSettingsContext } from '@/context/Settings'

export default function Settings({ URL }: { URL: { code: string, characters: any[] } }) {
    // URL Settings
    const firstCharacterCount = URL.characters.find((item) => item.enabled)?.value || 2;
    const [charactersCount, setCharactersCount] = useState(firstCharacterCount);
    const [customUrlData, setCustomUrlData] = useState('');
    const [isCustomUrl, setIsCustomUrl] = useState(false);

    // File settings
    const [expiresAfter, setExpiresAfter] = useState('24h');

    // Security
    const [passwordProtectionData, setPasswordProtectionData] = useState('');
    const [isPasswordProtection, setIsPasswordProtection] = useState(false);

    // Managment
    const [adminKeyData, setAdminKeyData] = useState('');

    // Set the first code
    const [code, setCode] = useState(URL.code);

    const [loading, setLoading] = useState(true)

    const codeRef = useRef(code);
    const characters = useRef(URL.characters) as React.MutableRefObject<any[]>;

    const handleSaveCustomUrlData = () => {
        // console.log('Input data saved:', customUrlData);

        if (customUrlData.length >= 4 && customUrlData.length <= 32) {
            // Save the customUrlData
        } else {
            // Display an error message
        };
    };

    const handleSavePasswordProtectionData = () => {
        console.log('Input data saved:', passwordProtectionData);
    };

    const copy = () => {
        navigator.clipboard.writeText(process.env.NEXT_PUBLIC_SHORT_DOMAIN + codeRef.current);
        toast.success('Copied to clipboard');
    };

    const updateCode = useCallback(async (value: number) => {
        setLoading(true);

        // Check and toggle isCustomUrl
        if (isCustomUrl) {
            setIsCustomUrl(false);
        };

        const newCode = await generateCode(value);
        setCode(newCode.code);

        characters.current = newCode.characters; // Update the mutable object
        codeRef.current = newCode.code; // Update the mutable object

        setTimeout(() => {
            setLoading(false);
        }, 500);

        // if the expire selected is not available for the charactersCount then change it to 24h
        if (!expireList.find((item) => item.value === expiresAfter)?.characterCount.includes(value)) {
            setExpiresAfter('24h');
        }

        toast.success('Selected characters count is ' + value + ' and expires after is ' + expiresAfter);
    }, [expiresAfter, isCustomUrl]);

    // Handle the loading state
    setTimeout(() => {
        setLoading(false);
    }, 500);

    return (
        <>
            <section className="pr-4 sm:pr-[32px] pl-4 w-full lg:w-3/5 min-h-96 mb-10">
                <div className="flex flex-col items-center border-2 border-gray-200 border-dashed rounded-md p-5">
                    {loading ?
                        <div role="status" className='h-[56px] grid content-center'>
                            <svg aria-hidden="true" className="w-8 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                            </svg>
                        </div>
                        :
                        <>
                            <h2 className="text-lg font-semibold text-slate-500">Your files will be stored here</h2><div className="flex gap-3 items-center">
                                <a id="url" data-code={code} className="text-xl text-blue-500 underline" href={"/" + code} target="_blank">
                                    {process.env.NEXT_PUBLIC_SHORT_DOMAIN}/{code}
                                </a>
                                <button className="text-blue-500 hover:text-blue-600 transition-colors" onClick={() => updateCode(charactersCount)}>
                                    <FontAwesomeIcon icon={faRetweet} className='h-[20px] flex self-end' />
                                </button>
                                <button className="text-blue-500 hover:text-blue-600 transition-colors" onClick={copy}>
                                    <FontAwesomeIcon icon={faCopy} className='h-[18px]' />
                                </button>
                            </div>
                        </>
                    }
                </div>
                <div className="text-xs flex gap-1 text-blue-500 mt-2 mb-2">
                    <FontAwesomeIcon icon={faCircleInfo} className="w-[16x] h-[16px]" />
                    <span className="font-semibold">
                        Your files will be deleted after {expireList.find((item) => item.value === expiresAfter)?.label || "24 Hours"}.
                        <span className="text-slate-400  font-normal"> You can change these value in file settings.</span>
                    </span>
                </div>
                <div>
                    <Accordion type="single" collapsible>
                        <AccordionItem value="item-1">
                            <AccordionTrigger className="hover:text-blue-500 text-slate-500">
                                <span className="flex gap-1 items-center">
                                    <FontAwesomeIcon icon={faGears} className="w-[16x] h-[16px] transition-transform" />
                                    URL Settings
                                </span>
                            </AccordionTrigger>
                            <AccordionContent className="flex flex-col gap-2 mt-[1px] mr-[1px] ml-[1px] text-slate-500">
                                {!isCustomUrl &&
                                    <>
                                        <div className="flex flex-col gap-2 sm:flex-row items-baseline justify-between text-sm">
                                            <p className="whitespace-nowrap">URL Characters</p>
                                            <Select
                                                name="charactersCount"
                                                value={String(charactersCount)}
                                                onValueChange={(value) => {
                                                    setCharactersCount(parseInt(value))
                                                    updateCode(parseInt(value))
                                                }}>
                                                <SelectTrigger className="sm:w-3/4 lg:w-[260px]">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {characters.current.map((item: any, index: number) => (
                                                        item.enabled ?
                                                            <SelectItem key={index} value={String(item.value)}>{item.label}</SelectItem>
                                                            :
                                                            <SelectItem key={index} value={String(item.value)} disabled>{item.label}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <span className="text-xs text-slate-400">Count of characters that will be used to create url.</span>
                                        <hr className="my-2" />
                                    </>}
                                <div className="flex flex-col gap-2 sm:flex-row justify-between">
                                    <div className="flex items-center space-x-2 min-w-[140px]">
                                        <Switch id="customUrl" checked={isCustomUrl} onCheckedChange={() => {
                                            setIsCustomUrl((prev) => !prev)
                                            if (!isCustomUrl) {
                                                setCharactersCount(0)
                                            } else {
                                                setCharactersCount(2)
                                            }
                                        }} />
                                        <Label htmlFor="customUrl">Custom URL</Label>
                                    </div>

                                    {isCustomUrl &&
                                        <div className="flex gap-1 sm:w-3/4 lg:w-[220px] mb-4 sm:mb-0">
                                            <Input
                                                className="w-full"
                                                type={"text"}
                                                value={customUrlData}
                                                onChange={(e) => setCustomUrlData(e.target.value)} />

                                            <Button onClick={handleSaveCustomUrlData}>
                                                <FontAwesomeIcon icon={faCheck} className="w-[16x] h-[16px] text-white" />
                                            </Button>
                                        </div>}
                                </div>
                                {/*
    <div className="flex items-center space-x-2">
        <Switch id="caseSensitive" checked={isCaseSensitive} onCheckedChange={() => setIsCaseSensitive((prev) => !prev)} />
        <Label htmlFor="caseSensitive">Case Sensitive</Label>
    </div>
    */}
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>

                    <Accordion type="single" collapsible>
                        <AccordionItem value="item-1">
                            <AccordionTrigger className="hover:text-blue-500 text-slate-500">
                                <span className="flex gap-1 items-center">
                                    <FontAwesomeIcon icon={faFile} className="w-[16x] h-[16px] transition-transform" />
                                    File Settings
                                </span>
                            </AccordionTrigger>
                            <AccordionContent className="flex flex-col gap-2 mt-[1px] mr-[1px] ml-[1px] text-slate-500">
                                <div className="flex flex-col gap-2 sm:flex-row items-baseline justify-between text-sm">
                                    <p>Expires After</p>

                                    <Select
                                        name="expiresAfter"
                                        value={expiresAfter}
                                        onValueChange={(value) => setExpiresAfter(value)}
                                    >
                                        <SelectTrigger className="sm:w-3/4 lg:w-[260px]">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {expireList.map((item, index) => (
                                                item.characterCount.includes(charactersCount) &&
                                                <SelectItem key={index} value={item.value}>{item.label}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <span className="text-xs text-slate-400">Time after which your files should be deleted.</span>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>

                    <Accordion type="single" collapsible>
                        <AccordionItem value="item-1">
                            <AccordionTrigger className="hover:text-blue-500 text-slate-500">
                                <span className="flex gap-1 items-center">
                                    <FontAwesomeIcon icon={faShieldHalved} className="w-[16x] h-[16px] transition-transform" />
                                    Security
                                </span>
                            </AccordionTrigger>
                            <AccordionContent className="flex flex-col gap-2 mt-[1px] mr-[1px] text-slate-500">
                                <div className='flex flex-col gap-2 sm:flex-row justify-between ml-[1px]'>
                                    <div className="flex items-center space-x-2">
                                        <Switch id="passwordProtection" checked={isPasswordProtection} onCheckedChange={() => setIsPasswordProtection((prev) => !prev)} />
                                        <Label htmlFor="passwordProtection">Password Protection</Label>
                                    </div>

                                    {isPasswordProtection &&
                                        <div className="flex gap-1 sm:w-3/4 lg:w-[220px] mb-4 sm:mb-0">
                                            <Input
                                                className="w-full"
                                                type={"password"}
                                                value={passwordProtectionData}
                                                onChange={(e) => setPasswordProtectionData(e.target.value)} />

                                            <Button onClick={handleSavePasswordProtectionData}>
                                                <FontAwesomeIcon icon={faCheck} className="w-[16x] h-[16px] text-white" />
                                            </Button>
                                        </div>}
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>

                    <Accordion type="single" collapsible>
                        <AccordionItem value="item-1">
                            <AccordionTrigger className="hover:text-blue-500 text-slate-500">
                                <span className="flex gap-1 items-center">
                                    <FontAwesomeIcon icon={faUserShield} className="w-[16x] h-[16px] transition-transform" />
                                    Managment
                                </span>
                            </AccordionTrigger>
                            <AccordionContent className="flex flex-col gap-2 mt-[1px] mr-[1px] ml-[1px] text-slate-500">
                                <div className="flex flex-col gap-2 sm:flex-row items-baseline justify-between text-sm">
                                    <p>Admin Key</p>
                                    <Input
                                        type="text"
                                        placeholder="Key"
                                        className="sm:w-3/4 lg:w-[260px]"
                                        value={adminKeyData}
                                        onChange={(e) => setAdminKeyData(e.target.value)} />
                                </div>

                                <hr className="hidden sm:block" />

                                <span className="text-xs text-slate-400">Key that can be used to manage files afterwards, this key can be changed (only A-z0-9) after first upload it wont be possible to change.</span>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            </section>
        </>
    )
}