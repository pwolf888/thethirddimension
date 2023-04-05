import './App.css';
import { Suspense, useRef } from 'react'
import {Canvas, useFrame, useThree,useLoader} from '@react-three/fiber'
import { GradientTexture, Icosahedron, useCubeTexture } from '@react-three/drei';
import { BackSide, TextureLoader, } from 'three';
import image1 from './img/posy.jpg';
// import image2 from './img/negy.jpg';
// import image3 from './img/negz.jpg';
// import image4 from './img/posx.jpg';
// import image5 from './img/posy.jpg';
// import image6 from './img/posz.jpg';


function Dice() {
    const {scene} = useThree();
    const bgTexture = useLoader(TextureLoader, image1)
 

    const envMap = useCubeTexture(['px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg'], { path: 'img/cubes/' })
    

      const meshRef = useRef();
      useFrame(({ clock }) => {
        meshRef.current.rotation.y = clock.elapsedTime * 0.1 // Rotate the mesh around the y-axis
        meshRef.current.rotation.x = clock.elapsedTime * 0.1// Rotate the mesh around the x-axis
        meshRef.current.rotation.z = clock.elapsedTime * 0.1 // Rotate the mesh around the x-axis
      })

    scene.background = bgTexture;
    return (
        <>
           
         <pointLight position={[-30, -30, -30]}  color="green"/>
         <pointLight position={[30, 30, 30]}  color="blue"/>
         <Icosahedron ref={meshRef} args={[2, 0]} >
            <meshPhysicalMaterial 
            
            metalness={0.1}
            roughness={0}
            transmission={0}
            clearcoat={1}
            clearcoatRoughness={0}
            reflectivity={1}
            envMapIntensity={1}
            // side={BackSide}
            envMap={envMap}
            preset="glass"/>
          </Icosahedron>
          
        </>
    )
     
}

function App() {
  


    return (
        <div className='App'>
            <Canvas  >
            
                <Suspense fallback={null}>
                   <Dice />
                   
                 </Suspense> 
                  
            </Canvas>
        </div>

    );
}

export default App;
