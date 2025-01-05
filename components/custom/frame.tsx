import * as motion from 'motion/react-client'

const Frame = () => {
    return (
        <div id='frame' className="fixed z-20 h-[calc(100dvh-6.75rem)] w-[calc(100dvw-2.5rem)] left-5 top-20 md:h-[calc(100dvh-5rem)] md:w-[calc(100dvw-5rem)] md:left-10 md:top-10">
            <motion.div initial={{ height: 0 }} animate={{ height: "25%" }} exit={{ height: 0 }} transition={{ duration: 1, ease: "easeInOut" }} className="absolute bottom-0 right-0 w-[0.5px] bg-white dark:hidden rounded-full blur-sm" />
            <motion.div initial={{ height: 0 }} animate={{ height: "25%" }} exit={{ height: 0 }} transition={{ duration: 1, ease: "easeInOut" }} className="absolute bottom-0 right-0 w-[0.5px] dark:bg-white bg-black rounded-full" />
            <motion.div initial={{ width: 0 }} animate={{ width: "25%" }} exit={{ width: 0 }} transition={{ duration: 1, ease: "easeInOut" }} className="absolute bottom-0 right-0 h-[0.5px] bg-white dark:hidden rounded-full blur-sm" />
            <motion.div initial={{ width: 0 }} animate={{ width: "25%" }} exit={{ width: 0 }} transition={{ duration: 1, ease: "easeInOut" }} className="absolute bottom-0 right-0 h-[0.5px] dark:bg-white bg-black rounded-full" />
            <motion.div initial={{ height: 0 }} animate={{ height: "25%" }} exit={{ height: 0 }} transition={{ duration: 1, ease: "easeInOut" }} className="absolute top-0 left-0 w-[0.5px] bg-white dark:hidden rounded-full blur-sm" />
            <motion.div initial={{ height: 0 }} animate={{ height: "25%" }} exit={{ height: 0 }} transition={{ duration: 1, ease: "easeInOut" }} className="absolute top-0 left-0 w-[0.5px] dark:bg-white bg-black rounded-full" />
            <motion.div initial={{ width: 0 }} animate={{ width: "25%" }} exit={{ width: 0 }} transition={{ duration: 1, ease: "easeInOut" }} className="absolute top-0 left-0 h-[0.5px] bg-white dark:hidden rounded-full blur-sm" />
            <motion.div initial={{ width: 0 }} animate={{ width: "25%" }} exit={{ width: 0 }} transition={{ duration: 1, ease: "easeInOut" }} className="absolute top-0 left-0 h-[0.5px] dark:bg-white bg-black rounded-full" />
        </div>
    );
}

export { Frame }