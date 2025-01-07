'use client'

import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"
import * as THREE from "three"
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer"
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass"
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass"
import * as motion from 'motion/react-client'
import { usePathname } from "next/navigation"
import { gsap } from "gsap"
import { CustomEase } from "gsap/all"

function rn(min: number, max: number) {
    return Math.random() * (max - min) + min
}

function angleForRoute(pathname: string): number {
    switch (pathname) {
        // Turn all 45 degrees with a 45 degree offset
        case "/about":    return Math.PI / 2 + Math.PI / 4
        case "/projects": return Math.PI + Math.PI / 4
        case "/contact":  return 3 * Math.PI / 2 + Math.PI / 4
        default:          return Math.PI / 4
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
    const composerRef = useRef<EffectComposer | null>(null);
    const starmaterialRef = useRef<THREE.PointsMaterial | null>(null);
    const pathname = usePathname();
    const standardHeight = 75
    const range = 30
    const space = 20
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

        // Starfield generation 
        const starPositions = []

        for (let i = -range; i <= range; i++) { // UP -> DOWN
            for (let j = -range; j <= range; j++) { // RIGHT -> LEFT
                // Each "point" is one star
                const star = new THREE.Vector3();
                star.x = i * space + space / 2;
                star.y = rn(0, 5);
                star.z = j * space + space / 2;
                starPositions.push(star);
            }
        }

        // Star material and geometry
        const starsGeometry = new THREE.BufferGeometry()
        starsGeometry.setFromPoints(starPositions);
        const starsMaterial = new THREE.PointsMaterial({
            color: 0x00ccff,
            size: 1,
        });
        starmaterialRef.current = starsMaterial
        const starField = new THREE.Points(starsGeometry, starsMaterial);
        scene.add(starField);

        // Post-processing for glow
        const composer = new EffectComposer(renderer)
        composerRef.current = composer

        const renderPass = new RenderPass(scene, camera)
        composer.addPass(renderPass)

        const bloomPass = new UnrealBloomPass(
            new THREE.Vector2(width, height), 
            1.5, 
            0.4, 
            0.85
        )
        bloomPass.threshold = 0.1
        bloomPass.strength = 2 // 1.5
        bloomPass.radius = 1
        composer.addPass(bloomPass)

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
            composer.render()
        }
        animateScene()

        function handleResize() {
            const w = container.clientWidth;
            const h = container.clientHeight;
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
            renderer.setSize(w, h);
            composer.setSize(w, h);
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
        const material = starmaterialRef.current
        if (scene && material) {
            const bg = theme === "dark" ? 0x000000 : 0xffffff
            scene.background = new THREE.Color(bg)
            const color = theme === "dark" ? 0x00ccff : 0xff0000
            material.color.setHex(color)
            console.log(material.color)
        }
    }, [theme])

    useEffect(() => {
        if (!cameraRef.current) return
        const camera = cameraRef.current
      
        const startAngle = Math.atan2(camera.position.z, camera.position.x)
        const radius = Math.sqrt(camera.position.x**2 + camera.position.z**2)
        
        const routeAngle = angleForRoute(pathname)
        const finalAngle = shortestAngle(startAngle, routeAngle)
      
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
            
            camera.position.set(x, standardHeight, z)
            camera.lookAt(0, 100, 0)
          }
        })
      }, [pathname])

    return (
        <motion.div id='background' initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 3, delay: 1, ease: "easeInOut" }} ref={containerRef} className="fixed z-10 container-frame" />
    )
}

export { Background }