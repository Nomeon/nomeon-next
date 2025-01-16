'use client'

import { DivFrame } from "@/components/custom/div-frame"
import { Button } from "@/components/ui/button"
import * as motion from "motion/react-client"
import Link from "next/link"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselPrevious,
    CarouselNext
} from "@/components/ui/carousel"
import { Icon } from "@iconify/react"
import Autoplay from "embla-carousel-autoplay"

export default function About() {
    return (
        <div className="h-full w-full flex">
            <div className="w-full grid justify-items-center lg:grid-cols-[1fr_8rem_1fr] p-8 my-auto">
                <motion.div className="p-8 lg:w-3/4 flex flex-col gap-4 justify-self-end" initial={{ backdropFilter: 'blur(0px)' }} animate={{ backdropFilter: 'blur(4px)' }} transition={{ duration: 1, delay: 2 }} >
                    <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2, delay: 2 }} className="text-3xl font-bold self-center">My Background</motion.h1>
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2, delay: 2 }} className="text-base lg:text-md flex-grow">After graduating in Business & IT at the University of Twente, I found my groove: coming up with smart solutions that fit just right with the company. My goal? Making things simpler and better, so everyone can do their job with ease and do it well. Curious about how I can benefit your company? Dive into my <Link className="text-purple-800 dark:text-cyan-400" href='/projects'>portfolio</Link> or send me a message!</motion.p>
                    <DivFrame />
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2, delay: 2 }}>
                        <Button><Link href='/contact'>Contact</Link></Button>
                    </motion.div>
                </motion.div>
                <motion.div className="flex items-center">
                    {/* <Carousel
                        orientation="vertical"
                        opts={{ loop: true }}
                        plugins={[
                            Autoplay({
                                delay: 2000
                            })
                        ]}
                    >
                        <CarouselContent>
                            <CarouselItem className="p-4 md:basis-1/4">
                                <Icon icon="vscode-icons:file-type-python" width="32" height="32" />
                            </CarouselItem>
                            <CarouselItem className="p-4 md:basis-1/4">
                                <Icon icon="vscode-icons:file-type-python" width="32" height="32" />
                            </CarouselItem>
                            <CarouselItem className="p-4 md:basis-1/4">
                                <Icon icon="vscode-icons:file-type-python" width="32" height="32" />
                            </CarouselItem>
                            <CarouselItem className="p-4 md:basis-1/4">
                                <Icon icon="vscode-icons:file-type-python" width="32" height="32" />
                            </CarouselItem>
                            <CarouselItem className="p-4 md:basis-1/4">
                                <Icon icon="vscode-icons:file-type-python" width="32" height="32" />
                            </CarouselItem>
                            <CarouselItem className="p-4 md:basis-1/4">
                                <Icon icon="vscode-icons:file-type-python" width="32" height="32" />
                            </CarouselItem>
                            <CarouselItem className="p-4 md:basis-1/4">
                                <Icon icon="vscode-icons:file-type-python" width="32" height="32" />
                            </CarouselItem>
                            <CarouselItem className="p-4 md:basis-1/4">
                                <Icon icon="vscode-icons:file-type-python" width="32" height="32" />
                            </CarouselItem>
                            <CarouselItem className="p-4 md:basis-1/4">
                                <Icon icon="vscode-icons:file-type-python" width="32" height="32" />
                            </CarouselItem>
                            <CarouselItem className="p-4 md:basis-1/4">
                                <Icon icon="vscode-icons:file-type-python" width="32" height="32" />
                            </CarouselItem>
                        </CarouselContent>
                        <CarouselPrevious/>
                        <CarouselNext/>
                    </Carousel> */}
                </motion.div>
                <motion.div className="p-8 lg:w-3/4 flex flex-col gap-4 justify-self-start" initial={{ backdropFilter: 'blur(0px)' }} animate={{ backdropFilter: 'blur(4px)' }} transition={{ duration: 1, delay: 2 }}>
                    <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2, delay: 2 }} className="text-3xl font-bold self-center">Two languages</motion.h2>
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2, delay: 2 }} className="text-base lg:text-md flex-grow">In the dynamic landscape of Business & IT, two distinct languages often emerge: the strategic voice of business and the technical dialect of IT. Bridging the gap between these worlds is what I do best. I comprehend the business challenges and translate them seamlessly for the tech team. This ensures solutions that are aligned with business goals and technically robust. When off-the-shelf solutions fall short, I take a proactive approach. I create custom software that fits; whether it's to transform data, run detailed production simulations, or connecting two existing software systems.</motion.p>
                    <DivFrame />
                </motion.div>
            </div>
        </div>
    )
}