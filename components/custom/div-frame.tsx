import * as motion from 'motion/react-client'

// Allow optional reverse prop

const DivFrame = ({ reverse }: { reverse?: boolean }) => {
  return (
    <>
      <motion.div initial={{ height: 0 }} animate={{ height: '25%' }} transition={{ duration: 1, delay: 1 }}className={`absolute ${reverse ? 'top-0' : 'bottom-0'} left-0 h-1/4 w-[0.5px] bg-black dark:bg-white`}/>
      <motion.div initial={{ width: 0 }} animate={{ width: '25%' }} transition={{ duration: 1, delay: 1 }}className={`absolute ${reverse ? 'top-0' : 'bottom-0'} left-0 w-1/4 h-[0.5px] bg-black dark:bg-white`}/>
      <motion.div initial={{ height: 0 }} animate={{ height: '25%' }} transition={{ duration: 1, delay: 1 }}className={`absolute ${reverse ? 'bottom-0' : 'top-0'} right-0 h-1/4 w-[0.5px] bg-black dark:bg-white`}/>
      <motion.div initial={{ width: 0 }} animate={{ width: '25%' }} transition={{ duration: 1, delay: 1 }}className={`absolute ${reverse ? 'bottom-0' : 'top-0 '} right-0 w-1/4 h-[0.5px] bg-black dark:bg-white`}/>
    </>
  )
}

export { DivFrame }