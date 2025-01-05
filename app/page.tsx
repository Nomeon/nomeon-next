import Link from 'next/link'
import { Button } from '@/components/ui/button'
import * as motion from "motion/react-client"
import { Typewriter } from '@/components/custom/typewriter'

export default function Home() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 2, delay: 2 }} className="h-full w-full flex flex-col items-center justify-center">
      <h1 className="dark:text-white text-black font-raleway font-bold text-4xl md:text-5xl">Stijn Nijhuis</h1>
      <Typewriter />
      <Link href="/about">
          <Button className="mt-4">Learn more</Button>
      </Link>
    </motion.div>
  );
}
