import * as THREE from 'three'
import * as dat from 'lil-gui'

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

/**
 * Base
 */
// Debug
const gui = new dat.GUI()
const debugObject = {}



// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()
/**
 * Update all materials
 */
const updateAllMaterials = () => {
    scene.traverse((child) => {
        if(child  instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
           child.material.envMap = environmentMap
           child.material.envMapIntensity = debugObject.envMapIntensity
        }
    })
}
debugObject.envMapIntensity = 2
gui.add(debugObject, 'envMapIntensity').min(0).max(5).step(0.001).onChange(updateAllMaterials)


/**
 * Environment Map
 */
const cubeTextureLoader = new THREE.CubeTextureLoader()
const environmentMap = cubeTextureLoader.load([
    '/textures/environmentMaps/0/px.jpg',
    '/textures/environmentMaps/0/nx.jpg',
    '/textures/environmentMaps/0/py.jpg',
    '/textures/environmentMaps/0/ny.jpg',
    '/textures/environmentMaps/0/pz.jpg',
    '/textures/environmentMaps/0/nz.jpg'
])
environmentMap.outputEncoding = THREE.sRGBEncoding
scene.background = environmentMap

/**
 * Loaders
 */
const gltfLoader = new GLTFLoader()
gltfLoader.load(
    'models/FlightHelmet/glTF/FlightHelmet.gltf',
    (gltfModel) => {
        gltfModel.scene.scale.set(10, 10, 10)
        gltfModel.scene.position.set(0, -4, 0)
        gltfModel.scene.rotation.y = Math.PI* 0.75
        scene.add(gltfModel.scene)
        updateAllMaterials()
        
        gui
            .add(gltfModel.scene.rotation, 'y')
            .min(- Math.PI)
            .max(Math.PI)
            .step(0.001)
            .name('rotation')
    })



/**
 * Lights
 */
const directionalLight = new THREE.DirectionalLight('#ffffff', 3)
directionalLight.position.set(0.25, 3, - 2.25)
scene.add(directionalLight)
gui.add(directionalLight, 'intensity').min(0).max(10).step(0.001).name('lightIntensity')
gui.add(directionalLight.position, 'x').min(- 5).max(5).step(0.001).name('lightX')
gui.add(directionalLight.position, 'y').min(- 5).max(5).step(0.001).name('lightY')
gui.add(directionalLight.position, 'z').min(- 5).max(5).step(0.001).name('lightZ')


/**
 * Test sphere
 */
// const testSphere = new THREE.Mesh(
//     new THREE.SphereGeometry(1, 32, 32),
//     new THREE.MeshStandardMaterial()
// )
// scene.add(testSphere)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(4, 1, - 4)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})
renderer.outputEncoding = THREE.sRGBEncoding
renderer.physicallyCorrectLights = true
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.toneMapping = THREE.ReinhardToneMapping
renderer.toneMappingExposure = 3

gui.add(renderer, 'toneMapping', {
    No: THREE.NoToneMapping,
    Linear: THREE.LinearToneMapping,
    Reinhard: THREE.ReinhardToneMapping,
    Cineon: THREE.CineonToneMapping,
    ACESFilmic: THREE.ACESFilmicToneMapping
})

gui.add(renderer, 'toneMappingExposure').min(0).max(10).step(0.001)


// ADD SHADOWS NEXT !!!

/**
 * Animate
 */
const tick = () =>
{
    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()