import Image from 'next/image';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

export default function Footer() {
    return (
        <footer className="bg-white border-t border-gray-200 grid">
            <div className="container flex flex-col md:flex-row gap-3 text-center items-center justify-between h-full">
                <div className='text-sm flex flex-col gap-0 sm:gap-2 sm:flex-row items-center'>
                    <Image src="/icon.png" alt="ShareFast" width={50} height={50} className="inline-block" />
                    <span> &copy; {new Date().getFullYear()} sharefast.me. All rights reserved.</span>
                </div>
                <div className='text-sm'>
                    <span>
                        Made with <FontAwesomeIcon icon={faHeart} className="text-red-500 h-[14px] w-[14px]" /> by
                        <span className="font-bold"> EveCloud Technologies</span>
                    </span>
                </div>
            </div>
        </footer>
    );
}
