// 1. Setting up the scene, camera, and renderer using Three.js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement); // Append the renderer to the body of the page

// 2. Lighting
const light = new THREE.PointLight(0xFFFFFF, 1, 100);
light.position.set(5, 5, 5);
scene.add(light);

// Ambient light for soft global illumination
const ambientLight = new THREE.AmbientLight(0x404040, 2);
scene.add(ambientLight);

// 3. Loading a 3D Avatar Model (GLTF format)
const loader = new THREE.GLTFLoader();

// Replace the path with your actual avatar model file path
loader.load('path_to_your_3d_avatar.glb', function(gltf) {
    const avatar = gltf.scene;
    avatar.scale.set(1, 1, 1); // Set the size of the avatar
    avatar.position.set(0, -1, 0); // Position the avatar in the scene
    scene.add(avatar);
    
    // Animate the avatar (e.g., rotation)
    function animateAvatar() {
        requestAnimationFrame(animateAvatar);
        
        // Rotate the avatar for some dynamic effect
        avatar.rotation.y += 0.01; // Rotate the avatar around the Y-axis
        
        renderer.render(scene, camera);
    }
    
    animateAvatar();
}, undefined, function(error) {
    console.error(error);
});

// 4. Camera setup
camera.position.z = 5;

// 5. Window resizing to maintain the aspect ratio
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// 6. Rendering the scene
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();
