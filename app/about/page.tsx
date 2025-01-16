'use client'

import { DivFrame } from "@/components/custom/div-frame"
import { Button } from "@/components/ui/button"
import * as motion from "motion/react-client"
import Link from "next/link"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel"
import { Icon } from "@iconify/react"
import Autoplay from "embla-carousel-autoplay"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

const skillList = [
    {
        name: "NextJS",
        light: "skill-icons:nextjs-light",
        dark: "skill-icons:nextjs-dark",
    },
    {
        name: "React",
        light: "skill-icons:react-light",
        dark: "skill-icons:react-dark",
    },
    {
        name: "TypeScript",
        light: "skill-icons:typescript",
        dark: "skill-icons:typescript",
    },
    {
        name: "TailwindCSS",
        light: "skill-icons:tailwindcss-light",
        dark: "skill-icons:tailwindcss-dark",
    },
    {
        name: "Vercel",
        light: "skill-icons:vercel-light",
        dark: "skill-icons:vercel-dark",
    }, 
    {
        name: "Supabase",
        light: "skill-icons:supabase-light",
        dark: "skill-icons:supabase-dark",
    },
    {
        name: "Python",
        light: "skill-icons:python-light",
        dark: "skill-icons:python-dark",
    },
    {
        name: "Rust",
        light: "skill-icons:rust",
        dark: "skill-icons:rust",
    }
]

export default function About() {
    const { theme } = useTheme()
    const useWidth = () => {
        const [width, setWidth] = useState(0)
        const handleResize = () => setWidth(window.innerWidth)
        useEffect(() => {
            handleResize()
            window.addEventListener('resize', handleResize)
            return () => window.removeEventListener('resize', handleResize)
        }, [])
        return width
    }
    return (
        <div className="h-full w-full flex">
            <div className="w-full grid justify-items-center grid-cols-1 lg:grid-cols-[1fr_12rem_1fr] my-auto p-8 lg:p-0">
                <motion.div className="p-8 lg:w-3/4 flex flex-col gap-4 justify-self-end" initial={{ backdropFilter: 'blur(0px)' }} animate={{ backdropFilter: 'blur(4px)' }} transition={{ duration: 1, delay: 2 }} >
                    <motion.h1 className="text-3xl font-bold self-center underline decoration-cyan-500" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2, delay: 2 }} >My Background</motion.h1>
                    <motion.p className="text-base lg:text-md flex-grow" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2, delay: 2 }} >After graduating in Business & IT at the University of Twente, I found my groove: coming up with smart solutions that fit just right with the company. My goal? Making things simpler and better, so everyone can do their job with ease and do it well. Curious about how I can benefit your company? Dive into my <Link className="text-purple-800 dark:text-cyan-400" href='/projects'>portfolio</Link> or send me a message!</motion.p>
                    <DivFrame />
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2, delay: 2 }}>
                        <Button><Link href='/contact'>Contact</Link></Button>
                    </motion.div>
                </motion.div>
                <motion.div className="h-full max-w-64 flex items-center justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2, delay: 2 }}>
                    <Carousel
                        opts={{
                            loop: true,
                            align: 'start',
                        }}
                        plugins={[
                            Autoplay({
                                delay: 1500
                            })
                        ]}
                        orientation={useWidth() > 1024 ? 'vertical' : 'horizontal'}
                    >
                        <CarouselContent className="h-32 lg:h-96">
                            {skillList.map((skill, index) => (
                                <CarouselItem key={index} className="basis-1/4 md:basis-1/5 flex items-center justify-center">
                                    <Icon icon={theme === 'dark' ? skill.dark : skill.light} width="32" height="32" />
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                    </Carousel>
                </motion.div>
                <motion.div className="p-8 lg:w-3/4 flex flex-col gap-4 justify-self-start" initial={{ backdropFilter: 'blur(0px)' }} animate={{ backdropFilter: 'blur(4px)' }} transition={{ duration: 1, delay: 2 }}>
                    <motion.h2 className="text-3xl font-bold self-center underline decoration-cyan-500" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2, delay: 2 }} >Two Languages</motion.h2>
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2, delay: 2 }} className="text-base lg:text-md flex-grow">In the dynamic landscape of Business & IT, two distinct languages often emerge: the strategic voice of business and the technical dialect of IT. Bridging the gap between these worlds is what I do best. I comprehend the business challenges and translate them seamlessly for the tech team. This ensures solutions that are aligned with business goals and technically robust. When off-the-shelf solutions fall short, I take a proactive approach. I create custom software that fits; whether it's to transform data, run detailed production simulations, or connecting two existing software systems.</motion.p>
                    <DivFrame />
                </motion.div>
            </div>
        </div>
    )
}