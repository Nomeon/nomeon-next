'use client'

import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"
import * as THREE from "three"
import * as motion from 'motion/react-client'
import { usePathname } from "next/navigation"
import { gsap } from "gsap"
import { CustomEase } from "gsap/all"

function rn(min: number, max: number) {
    return Math.random() * (max - min) + min
}

function angleForRoute(pathname: string): number {
    switch (pathname) {
      case "/about":    return Math.PI / 2
      case "/projects": return Math.PI
      case "/contact":  return 3 * Math.PI / 2
      default:          return 0  // for "/"
    }
}

function shortestAngle(start: number, end: number) {
    let diff = end - start
    diff = (diff + Math.PI) % (2 * Math.PI) - Math.PI
    return start + diff
}

const Background = () => {
    const { theme } = useTheme()
    const containerRef = useRef<HTMLDivElement>(null)
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
    const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
    const sceneRef = useRef<THREE.Scene | null>(null);
    const pathname = usePathname();
    const standardHeight = 100
    const range = 30
    const space = 10
    gsap.registerPlugin(CustomEase)

    useEffect(() => {
        if (!containerRef.current) return
        const container = containerRef.current
        
        const scene = new THREE.Scene()
        const width = container.clientWidth
        const height = container.clientHeight
        const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
        
        const renderer = new THREE.WebGLRenderer({ antialias: true })
        renderer.setSize(width, height)
        container.append(renderer.domElement)

        sceneRef.current = scene
        cameraRef.current = camera
        rendererRef.current = renderer

        camera.position.set(500, standardHeight, 0)
        camera.lookAt(0,100,0)

        // STARS IN SQUARE GRID 
        const starPositions = []

        for (let i = -range; i <= range; i++) { // Van boven naar beneden
            for (let j = -range; j <= range; j++) { // Van rechts naar links
                // Each "point" is one star
                const star = new THREE.Vector3();
                star.x = i * space + space / 2;
                star.y = rn(0, 5);
                star.z = j * space + space / 2;
                starPositions.push(star);
            }
        }

        // STARS IN RANDOM CIRCLE        
        // const starPositions = []
        // const starCount = 5000
        // const radius = 300

        // for (let i = 0; i < starCount; i++) {
        //     const rand = Math.random();           // in [0, 1]
        //     const r = radius * Math.sqrt(rand);   // ensures uniform distribution across the disk
        //               const angle = 2 * Math.PI * Math.random();
          
        //     const x = r * Math.cos(angle);
        //     const z = r * Math.sin(angle);
        //     const y = rn(0, 5);
          
        //     starPositions.push(new THREE.Vector3(x, y, z));
        // }


        // Shared material for all stars
        const starsGeometry = new THREE.BufferGeometry()
        starsGeometry.setFromPoints(starPositions);
        const starsMaterial = new THREE.PointsMaterial({
            color: 0x00ccff,
            size: 1,
        });
        const starField = new THREE.Points(starsGeometry, starsMaterial);
        scene.add(starField);

        function animateScene() {
            requestAnimationFrame(animateScene)

            const positions = starsGeometry.attributes.position.array as Float32Array
            for (let idx = 0; idx < positions.length; idx += 3) {
                const x = positions[idx];
                const y = positions[idx + 1];
                const z = positions[idx + 2];

                const newY = y + 0.1 * Math.sin(z * 0.02 + x * 0.015 + Date.now() * 0.002);
                positions[idx + 1] = newY;
            }

            starsGeometry.attributes.position.needsUpdate = true;
            renderer.render(scene, camera)
        }
        animateScene()

        function handleResize() {
            const w = container.clientWidth;
            const h = container.clientHeight;
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
            renderer.setSize(w, h);
        }
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize)
            if (container.contains(renderer.domElement)) {
                container.removeChild(renderer.domElement);
            }
        
            starsMaterial.dispose();
            starsGeometry.dispose();
            renderer.dispose();
        }
    }, [])

    useEffect(() => {
        const scene = sceneRef.current
        if (scene) {
            const bg = theme === "dark" ? 0x000000 : 0xffffff
            scene.background = new THREE.Color(bg)
        }
    }, [theme])

    useEffect(() => {
        if (!cameraRef.current) return
        const camera = cameraRef.current
      
        // 1) figure out current angle & radius
        const startAngle = Math.atan2(camera.position.z, camera.position.x)
        const radius = Math.sqrt(camera.position.x**2 + camera.position.z**2)
        
        // 2) decide targetAngle based on route
        const routeAngle = angleForRoute(pathname)
        const finalAngle = shortestAngle(startAngle, routeAngle)
      
        // 3) tween from startAngle -> finalAngle
        let angleObj = { value: startAngle }
        gsap.to(angleObj, {
          value: finalAngle,
          duration: 2,
          ease: CustomEase.create("custom", "M0,0 C0,0 0.300,0 0.5,0.5 0.700,1 1,1 1,1 "),
          onUpdate: () => {
            // x = radius * cos(angle), z = radius * sin(angle)
            const angle = angleObj.value
            const x = radius * Math.cos(angle)
            const z = radius * Math.sin(angle)
            console.log(camera.position)
            
            camera.position.set(x, standardHeight, z)
            camera.lookAt(0, 100, 0)
          }
        })
      }, [pathname])

    return (
        <motion.div id='background' initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 2, delay: 1 }} ref={containerRef} className="fixed z-10 h-[calc(100dvh-6.75rem)] w-[calc(100dvw-2.5rem)] left-5 top-20 md:h-[calc(100dvh-5rem)] md:w-[calc(100dvw-5rem)] md:left-10 md:top-10" />
    )
}

export { Background }