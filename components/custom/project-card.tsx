'use client'

import { FC, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import * as motion from 'motion/react-client';
import { DivFrame } from './div-frame';

export interface ProjectCardProps {
    name: string;
    company: string;
    description: string;
    image: string;
    link?: string;
}

const ProjectCard: FC<ProjectCardProps> = ({ name, company, description, image, link }) => {
    const [active, setActive] = useState(false);

    return(
        <motion.div className='p-8 relative flex flex-col' initial={{ backdropFilter: 'blur(0px)' }} animate={{ backdropFilter: 'blur(4px)' }}transition={{ duration: 2, delay: 2 }}>
            <motion.div className='flex justify-between items-center pb-4 gap-8' initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2, delay: 2 }}>
                <h1 className='text-xl underline decoration-cyan-500'>{name}</h1>
                <h2 className='font-barlow text-2xl'>{company}</h2>
            </motion.div>
            <motion.div className='w-96 h-60' initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2, delay: 2 }}>
                <Image src={image} alt={name} width={500} height={500} className='w-full h-auto'/>
            </motion.div>
            {link && 
                <Link href={link}>
                    <a>Read more</a>
                </Link>
            }
            <DivFrame reverse />
        </motion.div>
    )
}

export { ProjectCard }