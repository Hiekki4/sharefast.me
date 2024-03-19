"use client"

import { useCallback, useRef, useEffect, useState, use } from 'react';
import { useDropzone, FileRejection, DropEvent } from 'react-dropzone';
import Link from 'next/link'

import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileImage, faFileAudio, faFileArchive, faFileCode, faFileExcel, faFilePdf, faFileWord, faFileZipper, faFileVideo, faFile } from '@fortawesome/free-solid-svg-icons'
import { toast } from 'sonner';

import { useSettingsContext } from '@/context/Settings';

import { getPresignedUrl } from '@/lib/storage/get-presigned-url';
import { saveFile } from '@/lib/files';
import { updateCode } from '@/lib/code';

export default function FileUpload() {
    const { code, expiresAfter, password } = useSettingsContext().settings;

    const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
    const [rejectedFiles, setRejectedFiles] = useState<FileRejection[]>([]);
    const [uploading, setUploading] = useState(false);

    const onDrop = useCallback((acceptedFiles: File[], fileRejections: FileRejection[], event: DropEvent) => {
        if (acceptedFiles?.length) {
            acceptedFiles.forEach((file: File) => {
                toast.success(`File ${file.name} has been uploaded to ${code} and will be deleted ${expiresAfter} and is ${password ? 'password protected' : 'public'}.`);
                Object.assign(file, {
                    preview: URL.createObjectURL(file),
                    status: 'pending',
                    uploaded: 0
                });    

                const reader = new FileReader();
                reader.onabort = () => {
                    Object.assign(file, {
                        status: 'failed',
                        uploaded: 0
                    })
                }
                reader.onerror = () => {
                    Object.assign(file, {
                        status: 'failed',
                        uploaded: 0
                    })
                }
                reader.onload = async () => {
                    setUploading(true);
                    const url = await getPresignedUrl(code, file.name, password);

                    const base64String = reader.result as string;

                    const blob = await fetch(base64String).then(res => res.blob());
                    const formData = new FormData();

                    formData.append('file', blob);

                    const response = await fetch(url, {
                        method: 'PUT',
                        body: formData,
                        headers: {
                            'Content-Type': file.type
                        }
                    });

                    if (response.ok) {
                        await updateCode(code, expiresAfter)
                        await saveFile(code, file.name, file.size, file.type);
                        Object.assign(file, {
                            status: 'completed',
                            uploaded: file.size
                        });
                    } else {
                        Object.assign(file, {
                            status: 'failed',
                            uploaded: 0
                        });
                    }

                    setUploading(false);
                };

                reader.readAsDataURL(file);
                
                setUploadedFiles((previousFiles: File[]) => [
                    ...previousFiles,
                    file
                ]);
            });
        }
    
        if (fileRejections?.length) {
            setRejectedFiles(previousRejections => [...previousRejections, ...fileRejections]);
        };
    }, [code, expiresAfter, password]);

    // update the status depending on the file upload
    useEffect(() => {
        if (uploading) {
            uploadedFiles.forEach((file: any) => {
                Object.assign(file, {
                    status: file.status,
                    uploaded: file.size
                })
            });
        }
    }, [uploading, uploadedFiles]);


    const { getRootProps, getInputProps } = useDropzone({
        maxFiles: 1000, // 1000 files
        maxSize: 1000000000, // 1000MB
        onDrop,
    });

    const files = uploadedFiles.map((file: any) => {
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
            <li key={file.path} className='border shadow p-2 border-gray-200 rounded-md mt-2 flex gap-2'>
                <FontAwesomeIcon icon={icon} className="h-[40px] self-center text-blue-500" />
                <div className='w-full'>
                    <div className='flex justify-between gap-5 items-center'>
                        <span className='text-emerald-700 text-lg' style={{ wordBreak: "break-word" }}>{file.path}</span>
                        <span className='ml-auto text-slate-400 text-xs'>{file.status}</span>
                    </div>

                    <Progress value={file.uploaded / file.size * 100} className='mt-2' />

                    <div className='flex mt-2 '>
                        <span className='text-slate-400 text-xs'>{convertSize(file.uploaded)}/{convertSize(file.size)}</span>
                    </div>
                </div>
            </li>
        );
    });

    return (
        <section className="border-2 border-gray-200 border-dashed w-full rounded-md p-2 relative min-h-[256px] h-fit lg:h-full hover:cursor-pointer">
            <div className="w-full text-center h-full">
                {uploadedFiles.length > 0 ?
                    <div {...getRootProps({ className: 'dropzone' })} className='h-full'>
                        <div className='border-b-2 border-gray-200 border-dashed pb-2 mb-4'>
                            <p className='text-blue-500 underline'>Drag and drop more files or click here to select</p>
                        </div>
                        <ul onClick={(e) => e.stopPropagation()} className='text-left'>{files}</ul>
                    </div>
                    :
                    <>
                        <div {...getRootProps({ className: 'dropzone' })} className='flex flex-col w-full h-full'>
                            <div className="flex flex-col justify-center items-center h-2/4">
                                <input {...getInputProps()} />
                                <p className='text-sm font-semibold text-slate-500 leading-relaxed'>Drag and drop files</p>
                                <p className='text-xs text-slate-400 leading-relaxed'>or click to upload up to 1000MB and 1000 files</p>
                                <Button className='text-sm mt-5 bg-blue-500 hover:bg-blue-600 text-white'>Select files to upload</Button>
                            </div>
                        </div>
                        <div className='text-center text-xs leading-relaxed absolute z-20 bottom-2 left-1/2 transform -translate-x-1/2 w-10/12 lg:w-4/6'>
                            {/*<p className='font-semibold text-slate-500'>325,890 uploads have been made, currently storing 915 files</p>*/}
                            <p className='text-slate-400'>
                                By uploading any files you agree that you have read, understand, and accept our
                                <Link href="/legal/terms" className='font-semibold text-blue-500 hover:underline'> Terms of Service</Link>.
                            </p>
                        </div>
                    </>
                }
            </div>
        </section>
    );
}

function convertSize(size: number) {
    const units = ['B', 'KB', 'MB', 'GB', 'TB'];

    let i = 0;
    while (size >= 1024) {
        size /= 1024;
        i++;
    }

    return `${size.toFixed(2)} ${units[i]}`;
}