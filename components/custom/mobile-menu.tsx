import Link from "next/link"
import * as motion from "motion/react-client"

const MobileMenu = () => {
    return (
        <div className="z-50 fixed right-2 top-16 dark:bg-black bg-white text-left dark:text-white text-black rounded-xl md:hidden">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1, delay: 1 }}  className="flex flex-row font-barlow items-center justify-center px-2">
                <Link href="/">
                    <p className="text-2xl">HOME</p>
                </Link>
                <div className="h-6 w-[1px] dark:bg-white bg-black mx-2" />
                <Link href="/about">
                    <p className="text-2xl">ABOUT</p>
                </Link>
                <div className="h-6 w-[1px] dark:bg-white bg-black mx-2" />
                <Link href="/projects">
                    <p className="text-2xl">PROJECTS</p>
                </Link>
                <div className="h-6 w-[1px] dark:bg-white bg-black mx-2" />
                <Link href="/contact">
                    <p className="text-2xl">CONTACT</p>
                </Link>
            </motion.div>
        </div>
    )
}

export { MobileMenu }