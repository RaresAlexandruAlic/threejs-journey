import * as THREE from 'three'

const scene = new THREE.Scene()

//Scene with a default cube
const geometry = new THREE.BoxGeometry(10, 5, 5)
const material = new THREE.MeshBasicMaterial({ color: '#322b78' })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

//Camera
const sizes = {
    width: 500,
    height: 500
}

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 11

scene.add(camera)

//Canvas
const canvas = document.querySelector('.webgl')

//Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)