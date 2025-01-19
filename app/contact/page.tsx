'use client'

import { ContactForm } from "@/components/custom/contact-form"
import { DivFrame } from "@/components/custom/div-frame"
import * as motion from 'motion/react-client'
import { AnimatePresence } from 'motion/react'
import { useTransitionContext } from "@/components/custom/path-provider"
import { useTransitionState } from "next-transition-router"
import { useState, useEffect } from "react"

export default function Contact() {
    const { to } = useTransitionContext()
    const [transitioning, setTransitioning] = useState(false)
    const { stage } = useTransitionState()

    useEffect(() => {
        if (stage === 'leaving') {
        setTransitioning(true)
        } else {
        setTransitioning(false)
        }
    }, [to, stage])

    return (
        <div className="h-full w-full flex items-center justify-center p-8">
            <AnimatePresence>
                {transitioning ? null : (
                    <motion.div 
                        className="max-lg:w-full w-[500px] p-8 relative flex flex-col gap-8 items-center"
                        key='contact-div'
                        initial={{ backdropFilter: 'blur(0px)' }} 
                        animate={{ backdropFilter: 'blur(4px)' }} 
                        transition={{ duration: 0.5, delay: 0.5 }} 
                        exit={{ backdropFilter: 'blur(0px)', transition: { duration: 0.5, delay: 0.5 }}}
                    >
                        <motion.h1 
                            className="text-3xl font-bold self-center underline decoration-cyan-500" 
                            key='contact-h1'
                            initial={{ opacity: 0 }} 
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                            exit={{ opacity: 0, transition: { duration: 0.5 }}} 
                        >Contactform</motion.h1>
                        <motion.div 
                            className="w-full" 
                            key='contact-form'
                            initial={{ opacity: 0 }} 
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                            exit={{ opacity: 0, transition: { duration: 0.5 }}}  
                        >
                            <ContactForm />
                        </motion.div>
                        <DivFrame />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}