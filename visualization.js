const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(
75,
window.innerWidth/window.innerHeight,
0.1,
1000
)

camera.position.z = 5

const renderer = new THREE.WebGLRenderer({antialias:true})
renderer.setSize(window.innerWidth,window.innerHeight)

document.body.appendChild(renderer.domElement)

const controls = new THREE.OrbitControls(camera,renderer.domElement)

const geometry = new THREE.BufferGeometry()

const points=[]
const colors=[]

fetch("data/diffusion_coords.csv")
.then(res=>res.text())
.then(text=>{

const rows=text.trim().split("\n")

rows.forEach(row=>{

const parts=row.split(",")

const x=parseFloat(parts[0])
const y=parseFloat(parts[1])
const z=parseFloat(parts[2])

points.push(x,y,z)

const color=new THREE.Color()
color.setHSL((z+1)/2,0.8,0.6)

colors.push(color.r,color.g,color.b)

})

geometry.setAttribute(
"position",
new THREE.Float32BufferAttribute(points,3)
)

geometry.setAttribute(
"color",
new THREE.Float32BufferAttribute(colors,3)
)

const material=new THREE.PointsMaterial({
size:0.05,
vertexColors:true
})

const cloud=new THREE.Points(geometry,material)

scene.add(cloud)

})

function animate(){

requestAnimationFrame(animate)

scene.rotation.y+=0.002

renderer.render(scene,camera)

}

animate()
