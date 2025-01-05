'use client'

import { Icon } from '@iconify/react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

const ModeToggle = () => {
    const [mounted, setMounted] = useState(false)
    const { setTheme } = useTheme()

    useEffect(() => setMounted(true), [])
    if (!mounted) return null

    function toggleTheme() {
        setTheme((oldTheme) => (oldTheme === "light" ? "dark" : "light"))
    }

    return (
        <button onClick={toggleTheme} className="w-6 h-6 flex items-center justify-center fixed max-md:top-5 max-md:right-5 md:relative">
            <Icon icon="cuida:sun-outline" className="text-white md:h-4 md:w-4 h-6 w-6 hidden dark:block" />
            <Icon icon='cuida:moon-outline' className="text-black md:h-4 md:w-4 h-6 w-6 dark:hidden" />
            <span className="sr-only">Toggle theme</span>
        </button>
    )
}

export { ModeToggle }