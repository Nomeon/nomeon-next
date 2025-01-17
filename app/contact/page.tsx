import { ContactForm } from "@/components/custom/contact-form"
import { DivFrame } from "@/components/custom/div-frame"
import * as motion from 'motion/react-client'

export default function Contact() {
    return (
        <div className="h-full w-full flex items-center justify-center p-8">
            <motion.div className="max-lg:w-full p-8 relative flex flex-col gap-8 items-center" initial={{ backdropFilter: 'blur(0px)' }} animate={{ backdropFilter: 'blur(4px)' }} transition={{ duration: 1, delay: 2 }}>
                <motion.h1 className="text-3xl font-bold self-center underline decoration-cyan-500" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2, delay: 2 }}>Contactform</motion.h1>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2, delay: 2 }} >
                    <ContactForm />
                </motion.div>
                <DivFrame />
            </motion.div>
        </div>
    )
}