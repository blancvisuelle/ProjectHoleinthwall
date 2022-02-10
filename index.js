import * as THREE from './three.js/build/three.module.js';
import {OrbitControls} from './three.js/examples/jsm/controls/OrbitControls.js'
import {GLTFLoader} from './three.js/examples/jsm/loaders/GLTFLoader.js'

function main(){
    const scene = new THREE.Scene();

    const camera = createCamera();
    const renderer = createRenderer();
    const control = new OrbitControls(camera,renderer.domElement);
    const loader = new THREE.TextureLoader();

    const aLight = createAmbientLight();
    const sLight = createSpotLight();
    scene.add(aLight);
    scene.add(sLight);

    const text = createText(scene);

    scene.add(text);

    HoleModel('./assets/3dmodel/hole1.glb', scene);
    ObjectModel('./assets/3dmodel/object1.glb', scene);

    handleResize(renderer, camera);

    // let shouldRotateXPlus = false;
    // let shouldRotateXMinus = false;
    // let shouldRotateYPlus = false;
    // let shouldRotateYMinus = false;
    // let shouldRotateZPlus = false;
    // let shouldRotateZMinus = false;
    // let shouldMoveXPlus = false;
    // let shouldMoveXMinus = false;
    // let shouldMoveYPlus = false;
    // let shouldMoveYMinus = false;


    // window.addEventListener('keydown', function (event){
    //     if (event.code === 'KeyQ'){
    //         shouldMoveXPlus = true;
    //     } else if (event.code === 'KeyW') {
    //         shouldMoveXMinus = true;
    //     } else if (event.code === 'KeyA') {
    //         shouldMoveYPlus = true;
    //     } else if (event.code === 'KeyS') {
    //         shouldMoveYMinus = true;
    //     } else if (event.code === 'KeyE') {
    //         shouldRotateXPlus = true;
    //     } else if (event.code === 'KeyR') {
    //         shouldRotateXMinus = true;
    //     } else if (event.code === 'KeyD') {
    //         shouldRotateYPlus = true;
    //     } else if (event.code === 'KeyF') {
    //         shouldRotateYMinus = true;
    //     } else if (event.code === 'KeyC') {
    //         shouldRotateZPlus = true;
    //     } else if (event.code === 'KeyV') {
    //         shouldRotateZMinus = true;
    //     }
    //     }
    //     }
    //     }
    //     }
    //     }
    //     }
    //     }
    //     }
    // });

    // window.addEventListener('keyup', function (event){
    //     if (event.code === 'KeyQ'){
    //         shouldMoveXPlus = false;
    //     } else if (event.code === 'KeyW') {
    //         shouldMoveXMinus = false;
    //     } else if (event.code === 'KeyA') {
    //         shouldMoveYPlus = false;
    //     } else if (event.code === 'KeyS') {
    //         shouldMoveYMinus = false;
    //     } else if (event.code === 'KeyE') {
    //         shouldRotateXPlus = false;
    //     } else if (event.code === 'KeyR') {
    //         shouldRotateXMinus = false;
    //     } else if (event.code === 'KeyD') {
    //         shouldRotateYPlus = false;
    //     } else if (event.code === 'KeyF') {
    //         shouldRotateYMinus = false;
    //     } else if (event.code === 'KeyC') {
    //         shouldRotateZPlus = false;
    //     } else if (event.code === 'KeyV') {
    //         shouldRotateZMinus = false;
    //     }
    //     }
    //     }
    //     }
    //     }
    //     }
    //     }
    //     }
    //     }
    // });


    function render(){
        requestAnimationFrame(render);
        // HoleModel.position.z += 0.01;
        // if (ObjectModel) {
        //     if (shouldMoveXPlus) {
        //         groupCake.Position.y -= 0.1;
        //     }

        //     if (shouldMoveXMinus) {
        //         groupCake.Position.y += 0.1;
        //     }
        control.update();
        //addListener();
        renderer.render(scene,camera);
        // }
    }

    render();

    window.onresize = () => {
        const width = innerWidth
        const height = innerHeight

        renderer.setSize(width, height)

        camera.aspect = width / height
        camera.updateProjectionMatrix()
    }

    
}

function createCamera(){
    const[fov,aspect] = [75,window.innerWidth/window.innerHeight];
    const camera = new THREE.PerspectiveCamera(fov,aspect);
    camera.position.set(0,30,50);
    camera.lookAt(0,0,0);

    return camera;
}

function createRenderer(){
    const renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(window.innerWidth,window.innerHeight);
    document.body.appendChild(renderer.domElement);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setClearColor('#555555');

    return renderer;
}

const handleResize = (renderer, camera) => {
    window.addEventListener('resize', () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    });
};

function createText(scene){
    const fontLoader = new THREE.FontLoader();
    fontLoader.load('./three.js/examples/fonts/helvetiker_bold.typeface.json', function (font) {
        const geometry = new THREE.TextGeometry('Move: Q/W on X axis, A/S on Y axis. Rotate: E/R on X axis, D/F on Y axis, C/V on Z axis.', {
            font: font,
            size: 0.3,
            height: 0.2,
            })
        const material = new THREE.MeshStandardMaterial({color: 'white'})
        const mesh = new THREE.Mesh(geometry, material);
    
        const x = -(Math.PI/8) * (180 / Math.PI)
        const y = (Math.PI/2) * (180 / Math.PI)
    
        mesh.position.set(-8.5,25,45)
        mesh.rotation.set(-Math.PI/8, 0, 0);
        mesh.receiveShadow = true;
        mesh.castShadow = true;
        scene.add(mesh);
    })
}

  //Hole
function HoleModel (path, scene){
    let loader = new GLTFLoader();
    let Hole = null;
    loader.load(path, (object) => {
        console.log("3D Model On Load");
        console.log(object);
        Hole = object.scene;
        Hole.position.set(0, 0, -80);
        Hole.rotation.set(0, -Math.PI/2, 0);
        Hole.scale.set(3, 3 ,3);
        scene.add(object.scene);
    }, () => {
        console.log("3D Model On Progress")
    }, () => {
        console.log("3D Model Error")
    });
}

function ObjectModel (path, scene){
    let loader = new GLTFLoader();
    let Model = null;
    loader.load(path, (object) => {
        console.log("3D Model On Load");
        console.log(object);
        Model = object.scene;
        Model.position.set(0, 0, 0);
        Model.rotation.set(0, -Math.PI/2, 0);
        Model.scale.set(3, 3 ,3);
        scene.add(object.scene);
    }, () => {
        console.log("3D Model On Progress")
    }, () => {
        console.log("3D Model Error")
    });
}

function createAmbientLight(){
    const aLight = new THREE.AmbientLight('#E8DC8B',0.3);

    return aLight;
}

function createSpotLight(){
    const sLight = new THREE.SpotLight('cyan',1,1000,Math.PI/8);
    sLight.position.set(0,30,80)
    sLight.castShadow = true;

    return sLight;
}
main();