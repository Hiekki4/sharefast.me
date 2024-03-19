"use client"

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDownIcon } from "@radix-ui/react-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons'

const items = [
    {
        label: 'Donate',
        href: 'https://go.shfst.me/donate',
    },
    {
        label: 'About',
        href: '/about',
    },
    {
        label: 'Documentation',
        href: 'https://docs.sharefast.me',
    },
    {
        label: 'Community',
        href: 'https://go.shfst.me/community'
    },
    {
        label: 'Legal',
        items: [
            {
                label: 'Terms of Service',
                href: '/legal/terms',
            },
            {
                label: 'Privacy Policy',
                href: '/legal/privacy',
            },
        ],
    },
]

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(true);

    const handleToggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 640) {
                setIsMenuOpen(true);
            } else {
                setIsMenuOpen(false);
            }
        };
    
        // Add event listener for window resize
        window.addEventListener('resize', handleResize);
    
        // Initial check
        handleResize();
    
        // Clean up the event listener on component unmount
        return () => {
          window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className='container mx-auto'>
            <div className='flex justify-between items-center mt-5 sm:hidden sm:mt-0'>
                <Image src="/icon.png" alt="ShareFast" width={50} height={50} />
                <button className="text-sm mt-[1px]" onClick={handleToggleMenu}>
                    { 
                    isMenuOpen ? <FontAwesomeIcon icon={faXmark} className='h-[32px]' />
                    :
                    <FontAwesomeIcon icon={faBars} className='h-[32px]' />
                    }
                </button>
            </div>

            <NavigationMenu className={`mt-5 mx-auto ${isMenuOpen ? 'block scale-y-100' : 'hidden scale-y-0'} sm:mx-0 transition-transform origin-top min-w-full sm:min-w-min`}>
                <NavigationMenuList className='flex flex-col sm:gap-0 sm:flex-row'>
                    <NavigationMenuItem className='mr-0 sm:mr-12 hidden sm:block'>
                        <Image src="/logo.png" alt="ShareFast" width={200} height={200} className='hidden md:block' />
                        <Image src="/icon.png" alt="ShareFast" width={50} height={50} className='block md:hidden' />
                    </NavigationMenuItem>
                    {items.map((item, index) => (
                        item.items === undefined ?
                            <NavigationMenuItem key={index} className='cursor-pointer min-w-full sm:min-w-max'>
                                <Link href={item.href || "#"} legacyBehavior>
                                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                        {item.label}
                                    </NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>
                            : <NavigationMenuItem key={index} className='cursor-pointer min-w-full sm:min-w-max'>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <NavigationMenuLink className={navigationMenuTriggerStyle() + "flex justify-between"}>
                                            {item.label}
                                            <ChevronDownIcon
                                                className="relative top-[1px] ml-1 h-3 w-3 transition duration-300 group-data-[state=open]:rotate-180"
                                                aria-hidden="true"
                                            />
                                        </NavigationMenuLink>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className=''>
                                        {item.items.map((subItem, subIndex) => (
                                            <Link key={subIndex} href={subItem.href || "#"} legacyBehavior>
                                                <DropdownMenuItem className="cursor-pointer">
                                                    {subItem.label}
                                                </DropdownMenuItem>
                                            </Link>
                                        ))}
                                    </DropdownMenuContent>
                                </DropdownMenu>

                                {/* <NavigationMenuTrigger>{item.label}</NavigationMenuTrigger>
                                <NavigationMenuContent className='flex flex-col w-[400px] gap-3 p-4 md:w-[500px] lg:w-[600px]'>
                                    {item.items.map((subItem, subIndex) => (
                                        <Link className='' key={subIndex} href={subItem.href || "#"} legacyBehavior>
                                            {subItem.label}
                                        </Link>
                                    ))}
                                </NavigationMenuContent> */}
                            </NavigationMenuItem>
                    ))}
                </NavigationMenuList>
            </NavigationMenu>
        </div>
    )
}