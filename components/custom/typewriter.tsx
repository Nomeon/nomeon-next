'use client'

import { TypeAnimation } from "react-type-animation";

const Typewriter = () => {
    return (
        <TypeAnimation
            sequence={['Student', 2500, 'Business Consultant', 2500, 'Software Developer', 2500, 'Web Developer', 2500]}
            repeat={Infinity}
            wrapper="h3"
            speed={75}
            className="dark:text-white text-black font-barlow text-2xl md:text-3xl"
        />
    );
}

export { Typewriter }