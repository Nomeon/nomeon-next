import * as motion from 'motion/react-client'

const Frame = () => {
    return (
        <div id='frame' className="fixed z-20 container-frame">
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