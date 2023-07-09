import * as THREE from 'three'

const scene = new THREE.Scene()

const group = new THREE.Group()
scene.add(group)

const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(0.25, 0.25, 0.25),
    new THREE.MeshBasicMaterial({ color: '#ff0000' })
)
cube1.position.x = 2
group.add(cube1)

const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(0.25, 0.25, 0.25),
    new THREE.MeshBasicMaterial({ color: '#00ff00' })
)
cube2.position.x = 1
group.add(cube2)

const cube3 = new THREE.Mesh(
    new THREE.BoxGeometry(0.25, 0.25, 0.25),
    new THREE.MeshBasicMaterial({ color: '#00f' })
)
group.add(cube3)


group.rotation.set(Math.PI, Math.PI * 0.25, Math.PI * 1.75)

//AxesHelper
const axesHelper = new THREE.AxesHelper(3)
scene.add(axesHelper)

//Camera
const sizes = {
    width: 500,
    height: 500
}

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.set(1, 1, 3)
scene.add(camera)

//Canvas
const canvas = document.querySelector('.webgl')

//Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)