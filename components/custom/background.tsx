'use client'

import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"
import * as THREE from "three"
import * as motion from 'motion/react-client'
import { usePathname } from "next/navigation"
import { gsap } from "gsap"
import { CustomEase } from "gsap/all"

interface WaveOrigin {
    startTime: number
    centerX: number
    centerZ: number
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

const vertexShader = `
    uniform float uSize;
  
    void main() {
        // Standard position calculation
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);

        // Set point size -- scales with distance
        // Tweak 400.0 as needed for your FOV
        gl_PointSize = uSize * (400.0 / -mvPosition.z);  

        gl_Position = projectionMatrix * mvPosition;
    }
`;

const fragmentShader = `
    uniform vec3 uColor;
    uniform float uAlpha;

    void main() {
        // Distance from this fragment to center of the point (0.5, 0.5)
        float dist = distance(gl_PointCoord, vec2(0.5, 0.5));

        // Use smoothstep for a nice fade at the edges
        // The first two params define the start and end of the transition
        float radius = 0.45; // how big the "glow" is
        float edge = 0.6;   // how hard/soft the falloff is
        float alpha = 1.0 - smoothstep(radius, edge, dist);

        // Final output: color * alpha
        // 'alpha * uAlpha' so we can control overall material transparency
        gl_FragColor = vec4(uColor, alpha * uAlpha);
    }
`;


const Background = () => {
    const { theme } = useTheme()
    const pathname = usePathname();

    const containerRef = useRef<HTMLDivElement>(null)
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
    const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
    const sceneRef = useRef<THREE.Scene | null>(null);
    const starShaderMaterialRef = useRef<THREE.ShaderMaterial | null>(null);

    // Field parameters:
    const standardHeight = 75
    const range = 50
    const space = 10

    // Star parameters:
    const darkColor = 0x00ccff
    const lightColor = 0xff0000
    const starSize = 2.0
    const starAlpha = 1.0

    // Wave animation parameters:
    const waveSpeed = 175
    const halfWidth = 50
    const amplitude = 12
    const ringInterval = 2.5

    gsap.registerPlugin(CustomEase)

    useEffect(() => {
        if (!containerRef.current) return
        const container = containerRef.current
        
        const scene = new THREE.Scene()
        const width = container.clientWidth
        const height = container.clientHeight
        const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
        const raycaster = new THREE.Raycaster()
        const mouse = new THREE.Vector2()
        const waveOrigins: WaveOrigin[] = []
        
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
                star.y = 0;
                star.z = j * space + space / 2;
                starPositions.push(star);
            }
        }

        // Star material and geometry
        const starsGeometry = new THREE.BufferGeometry()
        starsGeometry.setFromPoints(starPositions);
        const basePositions = new Float32Array(starPositions.length * 3)
        for (let i = 0; i < starPositions.length; i++) {
            basePositions[3*i + 0] = starPositions[i].x;
            basePositions[3*i + 1] = starPositions[i].y;
            basePositions[3*i + 2] = starPositions[i].z;
        }

        const starShaderMaterial = new THREE.ShaderMaterial({
            vertexShader,
            fragmentShader,
            transparent: true,
            blending: THREE.NormalBlending,
            uniforms: {
                uSize: { value: starSize }, // Size of the stars
                uColor: { value: new THREE.Color(darkColor) }, // Standard color
                uAlpha: { value: starAlpha } // Standard alpha
            }
        })

        starShaderMaterialRef.current = starShaderMaterial

        const starField = new THREE.Points(starsGeometry, starShaderMaterial);
        scene.add(starField);

        // Invisible plane for raycasting
        const planeGeometry = new THREE.PlaneGeometry(1000, 1000)
        planeGeometry.rotateX(-Math.PI / 2)
        const planeMaterial = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, visible: false })
        const invisiblePlane = new THREE.Mesh(planeGeometry, planeMaterial)
        invisiblePlane.position.y = 0
        scene.add(invisiblePlane)

        function animateScene() {
            requestAnimationFrame(animateScene)

            const timeSeconds = performance.now() * 0.001
            const maxDistance = range * space * 2 + 200

            const positions = starsGeometry.attributes.position.array as Float32Array
            for (let idx = 0; idx < positions.length; idx += 3) {
                const baseX = basePositions[idx + 0]
                const baseY = basePositions[idx + 1]
                const baseZ = basePositions[idx + 2]

                const r = Math.sqrt(baseX*baseX + baseZ*baseZ)
                let totalOffset = 0.0

                // for (let n = 0; n < 20; n++) {
                for (let origin of waveOrigins) {
                    const ringAge = timeSeconds - origin.startTime
                    if (ringAge < 0) continue

                    const waveFront = waveSpeed * ringAge
                    if (waveFront - halfWidth > maxDistance) continue

                    const dx = baseX - origin.centerX
                    const dz = baseZ - origin.centerZ
                    const r = Math.sqrt(dx*dx + dz*dz)
                    const distanceFromFront = r - waveFront

                    if (Math.abs(distanceFromFront) < halfWidth) {
                        const normalized = distanceFromFront / halfWidth;
                        const waveShape = (1 + Math.cos(Math.PI * normalized)) / 2;
                        totalOffset += waveShape * amplitude;
                    }
                }

                positions[idx + 0] = baseX
                positions[idx + 1] = baseY + totalOffset
                positions[idx + 2] = baseZ
            }

            starsGeometry.attributes.position.needsUpdate = true;
            renderer.render(scene, camera);
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

        function onPointerDown(event: MouseEvent) {
            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

            raycaster.setFromCamera(mouse, camera);

            const intersects = raycaster.intersectObject(invisiblePlane, false)
            if (intersects.length > 0) {
                const point = intersects[0].point
                spawnRippleAt(point.x, point.z)
            }
        }
        window.addEventListener("pointerdown", onPointerDown)

        function spawnRippleAt(x: number, z: number) {
            console.log(x, z)
            waveOrigins.push({
                startTime: performance.now() * 0.001,
                centerX: x,
                centerZ: z
            })
        }

        return () => {
            window.removeEventListener("resize", handleResize)
            window.removeEventListener("pointerdown", onPointerDown)
            if (container.contains(renderer.domElement)) {
                container.removeChild(renderer.domElement);
            }
            starsGeometry.dispose();
            planeGeometry.dispose();
            renderer.dispose();
        }
    }, [])

    useEffect(() => {
        const scene = sceneRef.current
        const mat = starShaderMaterialRef.current
        if (scene && mat) {
            const bg = theme === "dark" ? 0x000000 : 0xffffff;
            scene.background = new THREE.Color(bg)

            const color = theme === "dark" ? darkColor : lightColor;
            mat.uniforms.uColor.value.setHex(color);
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