"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { cn } from "@/src/lib/utils";

interface AnimatedAvatar3DProps {
  className?: string;
}

export function AnimatedAvatar3D({ className }: AnimatedAvatar3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const waveStartRef = useRef<number>(-10);
  const [waving, setWaving] = useState(false);

  const triggerWave = () => {
    waveStartRef.current = performance.now() / 1000;
    setWaving(true);
    setTimeout(() => setWaving(false), 1600);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let disposed = false;
    let rafId = 0;

    // 1. Renderer & Scene Setup
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.12;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.display = "block";
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();

    // Soft PBR studio environment reflections
    const pmrem = new THREE.PMREMGenerator(renderer);
    const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = envTex;
    scene.environmentIntensity = 0.48;

    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 30);
    camera.position.set(0, -0.06, 4.85);
    camera.lookAt(0, -0.16, 0);

    // 2. Cinematic 4-Point Studio Lighting
    const keyLight = new THREE.DirectionalLight(0xfff5eb, 2.25);
    keyLight.position.set(2.2, 3.2, 3.8);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xc7d2fe, 0.7);
    fillLight.position.set(-2.6, 1.2, 2.4);
    scene.add(fillLight);

    const vermilionRim = new THREE.PointLight(0xff4b4b, 7.8, 8);
    vermilionRim.position.set(1.9, 1.3, -1.5);
    scene.add(vermilionRim);

    const goldRim = new THREE.PointLight(0xffc730, 5.6, 8);
    goldRim.position.set(-1.9, 1.1, -1.4);
    scene.add(goldRim);

    const screenGlow = new THREE.PointLight(0x38bdf8, 1.9, 3.0);
    screenGlow.position.set(0, -0.52, 1.15);
    scene.add(screenGlow);

    // 3. Shared Studio PBR Materials (Matched to Nirav's reference photo!)
    const skinMat = new THREE.MeshPhysicalMaterial({
      color: 0xd4966a,
      roughness: 0.52,
      metalness: 0.0,
      clearcoat: 0.06,
      sheen: 0.38,
      sheenRoughness: 0.65,
      sheenColor: new THREE.Color(0xff9e7a),
    });

    const cheekMat = new THREE.MeshStandardMaterial({
      color: 0xc9735b,
      roughness: 0.7,
      transparent: true,
      opacity: 0.35,
    });

    const hairMat = new THREE.MeshPhysicalMaterial({
      color: 0x111217,
      roughness: 0.56,
      metalness: 0.05,
      clearcoat: 0.18,
      clearcoatRoughness: 0.45,
    });

    const facialHairMat = new THREE.MeshStandardMaterial({
      color: 0x1c1b20,
      roughness: 0.75,
    });

    const blazerMat = new THREE.MeshStandardMaterial({
      color: 0x14161e,
      roughness: 0.76,
      metalness: 0.04,
    });

    const lapelMat = new THREE.MeshStandardMaterial({
      color: 0x1c1f2b,
      roughness: 0.62,
      metalness: 0.06,
    });

    // Signature soft pistachio-lime collared shirt from profile.jpg
    const shirtMat = new THREE.MeshStandardMaterial({
      color: 0xc5e080,
      roughness: 0.55,
    });

    // Signature half-rim glasses: dark navy brow-bar + silver wire + white temples
    const frameTopMat = new THREE.MeshPhysicalMaterial({
      color: 0x1a263b,
      roughness: 0.25,
      metalness: 0.2,
      clearcoat: 0.8,
    });

    const frameWireMat = new THREE.MeshStandardMaterial({
      color: 0xdbe4f0,
      roughness: 0.2,
      metalness: 0.88,
    });

    const templeWhiteMat = new THREE.MeshPhysicalMaterial({
      color: 0xf4f6f9,
      roughness: 0.28,
      clearcoat: 0.5,
    });

    const lensMat = new THREE.MeshPhysicalMaterial({
      color: 0xdff2ff,
      transparent: true,
      opacity: 0.2,
      roughness: 0.05,
      metalness: 0.08,
      clearcoat: 1.0,
      reflectivity: 1.0,
    });

    const scleraMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.22,
    });

    const irisMat = new THREE.MeshPhysicalMaterial({
      color: 0x2b1810,
      roughness: 0.15,
      clearcoat: 1.0,
    });

    const pupilMat = new THREE.MeshBasicMaterial({ color: 0x070709 });
    const catchlightMat = new THREE.MeshBasicMaterial({ color: 0xffffff });

    // Brown leather watch strap + dark bronze dial
    const leatherMat = new THREE.MeshStandardMaterial({
      color: 0x9e4f22,
      roughness: 0.58,
    });
    const watchCaseMat = new THREE.MeshStandardMaterial({
      color: 0xb46934,
      roughness: 0.28,
      metalness: 0.78,
    });
    const watchDialMat = new THREE.MeshStandardMaterial({
      color: 0x16161a,
      roughness: 0.2,
      metalness: 0.4,
    });

    // 4. Character Hierarchy Construction
    const characterRoot = new THREE.Group();
    characterRoot.position.set(0, -0.06, 0);
    scene.add(characterRoot);

    // --- TORSO & BLAZER ---
    const torsoGroup = new THREE.Group();
    torsoGroup.position.set(0, -0.78, 0);
    characterRoot.add(torsoGroup);

    const blazerBody = new THREE.Mesh(
      new RoundedBoxGeometry(1.26, 0.98, 0.64, 6, 0.24),
      blazerMat,
    );
    torsoGroup.add(blazerBody);

    // Pistachio-green shirt V-front & collar wings
    const shirtFront = new THREE.Mesh(
      new RoundedBoxGeometry(0.4, 0.66, 0.65, 4, 0.08),
      shirtMat,
    );
    shirtFront.position.set(0, 0.14, 0.015);
    torsoGroup.add(shirtFront);

    const leftCollar = new THREE.Mesh(
      new RoundedBoxGeometry(0.19, 0.16, 0.08, 3, 0.025),
      shirtMat,
    );
    leftCollar.position.set(-0.11, 0.47, 0.29);
    leftCollar.rotation.set(0.15, 0.15, -0.45);
    torsoGroup.add(leftCollar);

    const rightCollar = leftCollar.clone();
    rightCollar.position.x = 0.11;
    rightCollar.rotation.set(0.15, -0.15, 0.45);
    torsoGroup.add(rightCollar);

    // Tailored Blazer Lapels
    const leftLapel = new THREE.Mesh(
      new RoundedBoxGeometry(0.16, 0.62, 0.07, 4, 0.03),
      lapelMat,
    );
    leftLapel.position.set(-0.22, 0.16, 0.315);
    leftLapel.rotation.z = -0.22;
    torsoGroup.add(leftLapel);

    const rightLapel = leftLapel.clone();
    rightLapel.position.x = 0.22;
    rightLapel.rotation.z = 0.22;
    torsoGroup.add(rightLapel);

    // Neck
    const neck = new THREE.Mesh(
      new THREE.CylinderGeometry(0.165, 0.19, 0.34, 24),
      skinMat,
    );
    neck.position.set(0, 0.56, 0.02);
    torsoGroup.add(neck);

    // --- HEAD & FACE RIG ---
    const headPivot = new THREE.Group();
    headPivot.position.set(0, -0.06, 0.02);
    characterRoot.add(headPivot);

    const headGroup = new THREE.Group();
    headGroup.position.set(0, 0.36, 0);
    headPivot.add(headGroup);

    // Stylized smooth Spline-squircle head
    const headMesh = new THREE.Mesh(
      new RoundedBoxGeometry(0.94, 1.02, 0.86, 8, 0.38),
      skinMat,
    );
    headGroup.add(headMesh);

    // Ears
    const earGeo = new THREE.CapsuleGeometry(0.085, 0.11, 8, 16);
    const leftEar = new THREE.Mesh(earGeo, skinMat);
    leftEar.position.set(-0.49, -0.02, -0.02);
    leftEar.rotation.z = 0.12;
    headGroup.add(leftEar);

    const rightEar = leftEar.clone();
    rightEar.position.x = 0.49;
    rightEar.rotation.z = -0.12;
    headGroup.add(rightEar);

    // Subtle cheek warmth
    const cheekGeo = new THREE.SphereGeometry(0.095, 16, 16);
    cheekGeo.scale(1.25, 0.7, 0.25);
    const leftCheek = new THREE.Mesh(cheekGeo, cheekMat);
    leftCheek.position.set(-0.26, -0.08, 0.415);
    headGroup.add(leftCheek);

    const rightCheek = leftCheek.clone();
    rightCheek.position.x = 0.26;
    headGroup.add(rightCheek);

    // Nose
    const nose = new THREE.Mesh(
      new THREE.CapsuleGeometry(0.048, 0.085, 8, 16),
      skinMat,
    );
    nose.position.set(0, -0.015, 0.44);
    nose.rotation.x = -0.14;
    headGroup.add(nose);

    // Eyes with independent pupil tracking & blinking eyelids
    const createEye = (xOffset: number) => {
      const eyeRoot = new THREE.Group();
      eyeRoot.position.set(xOffset, 0.065, 0.415);

      const sclera = new THREE.Mesh(
        new THREE.SphereGeometry(0.082, 24, 24),
        scleraMat,
      );
      sclera.scale.set(1.08, 1.0, 0.42);
      eyeRoot.add(sclera);

      const pupilRig = new THREE.Group();
      pupilRig.position.z = 0.032;
      eyeRoot.add(pupilRig);

      const iris = new THREE.Mesh(new THREE.CircleGeometry(0.052, 24), irisMat);
      pupilRig.add(iris);

      const pupil = new THREE.Mesh(
        new THREE.CircleGeometry(0.027, 20),
        pupilMat,
      );
      pupil.position.z = 0.002;
      pupilRig.add(pupil);

      const catchMain = new THREE.Mesh(
        new THREE.CircleGeometry(0.013, 12),
        catchlightMat,
      );
      catchMain.position.set(0.018, 0.018, 0.004);
      pupilRig.add(catchMain);

      const catchSub = new THREE.Mesh(
        new THREE.CircleGeometry(0.006, 10),
        catchlightMat,
      );
      catchSub.position.set(-0.015, -0.015, 0.004);
      pupilRig.add(catchSub);

      // Upper eyelid for natural blinking
      const eyelid = new THREE.Mesh(
        new THREE.SphereGeometry(
          0.088,
          20,
          16,
          0,
          Math.PI * 2,
          0,
          Math.PI * 0.55,
        ),
        skinMat,
      );
      eyelid.scale.set(1.12, 0.05, 0.5);
      eyelid.position.set(0, 0.01, 0.005);
      eyeRoot.add(eyelid);

      headGroup.add(eyeRoot);
      return { eyeRoot, pupilRig, eyelid };
    };

    const leftEye = createEye(-0.205);
    const rightEye = createEye(0.205);

    // Expressive Eyebrows
    const browGeo = new RoundedBoxGeometry(0.21, 0.042, 0.045, 4, 0.018);
    const leftBrow = new THREE.Mesh(browGeo, facialHairMat);
    leftBrow.position.set(-0.205, 0.235, 0.435);
    leftBrow.rotation.z = 0.05;
    headGroup.add(leftBrow);

    const rightBrow = new THREE.Mesh(browGeo, facialHairMat);
    rightBrow.position.set(0.205, 0.235, 0.435);
    rightBrow.rotation.z = -0.05;
    headGroup.add(rightBrow);

    // --- SIGNATURE TWO-TONE HALF-RIM GLASSES ---
    const glassesGroup = new THREE.Group();
    glassesGroup.position.set(0, 0.068, 0.475);
    headGroup.add(glassesGroup);

    const buildLensAssembly = (side: -1 | 1) => {
      const g = new THREE.Group();
      g.position.x = side * 0.215;

      // Dark navy/black top brow-bar
      const topBar = new THREE.Mesh(
        new RoundedBoxGeometry(0.32, 0.036, 0.038, 4, 0.012),
        frameTopMat,
      );
      topBar.position.y = 0.09;
      g.add(topBar);

      // Thin metallic lower half-rim U-wire
      const bottomWire = new THREE.Mesh(
        new RoundedBoxGeometry(0.295, 0.012, 0.02, 2, 0.005),
        frameWireMat,
      );
      bottomWire.position.y = -0.088;
      g.add(bottomWire);

      const outerWire = new THREE.Mesh(
        new RoundedBoxGeometry(0.014, 0.175, 0.02, 2, 0.005),
        frameWireMat,
      );
      outerWire.position.x = side * 0.146;
      g.add(outerWire);

      const innerWire = outerWire.clone();
      innerWire.position.x = -side * 0.146;
      g.add(innerWire);

      // Clearcoat reflective glass lens
      const lens = new THREE.Mesh(
        new RoundedBoxGeometry(0.285, 0.17, 0.012, 3, 0.02),
        lensMat,
      );
      g.add(lens);

      // Crisp white side temple arm extending back to ear!
      const temple = new THREE.Mesh(
        new RoundedBoxGeometry(0.026, 0.034, 0.48, 3, 0.01),
        templeWhiteMat,
      );
      temple.position.set(side * 0.162, 0.055, -0.24);
      temple.rotation.y = side * -0.06;
      g.add(temple);

      return g;
    };

    glassesGroup.add(buildLensAssembly(-1));
    glassesGroup.add(buildLensAssembly(1));

    // Glasses center bridge
    const bridge = new THREE.Mesh(
      new RoundedBoxGeometry(0.115, 0.026, 0.032, 3, 0.01),
      frameTopMat,
    );
    bridge.position.set(0, 0.072, -0.005);
    glassesGroup.add(bridge);

    // --- NEAT MUSTACHE, SMILE & CHIN GOATEE ---
    const mustache = new THREE.Mesh(
      new THREE.TorusGeometry(0.105, 0.022, 12, 28, Math.PI * 0.82),
      facialHairMat,
    );
    mustache.position.set(0, -0.225, 0.432);
    mustache.rotation.z = Math.PI * 0.09;
    headGroup.add(mustache);

    // Warm friendly smile arc
    const smile = new THREE.Mesh(
      new THREE.TorusGeometry(0.075, 0.014, 10, 24, Math.PI * 0.78),
      new THREE.MeshStandardMaterial({ color: 0x7c3f32, roughness: 0.5 }),
    );
    smile.position.set(0, -0.22, 0.434);
    smile.rotation.z = Math.PI * 1.11;
    headGroup.add(smile);

    // Subtle chin goatee
    const goatee = new THREE.Mesh(
      new RoundedBoxGeometry(0.15, 0.065, 0.05, 4, 0.025),
      facialHairMat,
    );
    goatee.position.set(0, -0.44, 0.395);
    goatee.rotation.x = 0.25;
    headGroup.add(goatee);

    // --- SCULPTED SIDE-SWEPT HAIR (Parted right -> swept left) ---
    const hairGroup = new THREE.Group();
    headGroup.add(hairGroup);

    // Main top & back hair volume
    const hairCrown = new THREE.Mesh(
      new RoundedBoxGeometry(1.01, 0.52, 0.94, 8, 0.25),
      hairMat,
    );
    hairCrown.position.set(0, 0.36, -0.02);
    hairGroup.add(hairCrown);

    const hairBack = new THREE.Mesh(
      new RoundedBoxGeometry(0.98, 0.68, 0.52, 6, 0.22),
      hairMat,
    );
    hairBack.position.set(0, 0.14, -0.24);
    hairGroup.add(hairBack);

    // Side temple tapers
    const leftSideHair = new THREE.Mesh(
      new THREE.CapsuleGeometry(0.08, 0.28, 8, 12),
      hairMat,
    );
    leftSideHair.position.set(-0.465, 0.16, 0.05);
    hairGroup.add(leftSideHair);

    const rightSideHair = leftSideHair.clone();
    rightSideHair.position.set(0.465, 0.18, 0.05);
    hairGroup.add(rightSideHair);

    // Sweeping front fringe locks (parted from viewer-left/character-right across forehead)
    const sweep1 = new THREE.Mesh(
      new THREE.CapsuleGeometry(0.115, 0.54, 10, 16),
      hairMat,
    );
    sweep1.position.set(0.05, 0.43, 0.35);
    sweep1.rotation.set(0.22, -0.14, 1.34);
    hairGroup.add(sweep1);

    const sweep2 = new THREE.Mesh(
      new THREE.CapsuleGeometry(0.092, 0.44, 10, 16),
      hairMat,
    );
    sweep2.position.set(0.16, 0.37, 0.4);
    sweep2.rotation.set(0.18, -0.18, 1.24);
    hairGroup.add(sweep2);

    const sweepPartRight = new THREE.Mesh(
      new THREE.CapsuleGeometry(0.085, 0.22, 8, 12),
      hairMat,
    );
    sweepPartRight.position.set(-0.33, 0.41, 0.33);
    sweepPartRight.rotation.set(0.2, 0.2, -1.1);
    hairGroup.add(sweepPartRight);

    // --- ARTICULATED ARMS, COGNAC WATCH & HANDS ---
    // Character's Left Arm (Viewer's Right — wears the brown leather watch!)
    const leftArmPivot = new THREE.Group();
    leftArmPivot.position.set(0.62, -0.44, 0.06);
    characterRoot.add(leftArmPivot);

    const leftSleeve = new THREE.Mesh(
      new THREE.CapsuleGeometry(0.135, 0.46, 8, 16),
      blazerMat,
    );
    leftSleeve.position.set(-0.08, -0.22, 0.22);
    leftSleeve.rotation.set(1.05, 0, 0.32);
    leftArmPivot.add(leftSleeve);

    // Cognac leather wristwatch on left wrist!
    const watchGroup = new THREE.Group();
    watchGroup.position.set(-0.18, -0.34, 0.43);
    watchGroup.rotation.set(1.05, 0.1, 0.32);
    leftArmPivot.add(watchGroup);

    const strap = new THREE.Mesh(
      new THREE.CylinderGeometry(0.098, 0.098, 0.065, 20),
      leatherMat,
    );
    watchGroup.add(strap);

    const watchBezel = new THREE.Mesh(
      new THREE.CylinderGeometry(0.072, 0.072, 0.028, 24),
      watchCaseMat,
    );
    watchBezel.position.set(0, 0, 0.088);
    watchBezel.rotation.x = Math.PI * 0.5;
    watchGroup.add(watchBezel);

    const watchFace = new THREE.Mesh(
      new THREE.CircleGeometry(0.058, 20),
      watchDialMat,
    );
    watchFace.position.set(0, 0, 0.103);
    watchGroup.add(watchFace);

    const leftHand = new THREE.Mesh(
      new THREE.SphereGeometry(0.105, 20, 20),
      skinMat,
    );
    leftHand.scale.set(1.0, 0.82, 1.15);
    leftHand.position.set(-0.23, -0.39, 0.54);
    leftArmPivot.add(leftHand);

    // Character's Right Arm (Viewer's Left — types in idle, waves on click!)
    const rightArmPivot = new THREE.Group();
    rightArmPivot.position.set(-0.62, -0.44, 0.06);
    characterRoot.add(rightArmPivot);

    const rightForearmGroup = new THREE.Group();
    rightArmPivot.add(rightForearmGroup);

    const rightSleeve = new THREE.Mesh(
      new THREE.CapsuleGeometry(0.135, 0.46, 8, 16),
      blazerMat,
    );
    rightSleeve.position.set(0.08, -0.22, 0.22);
    rightSleeve.rotation.set(1.05, 0, -0.32);
    rightForearmGroup.add(rightSleeve);

    const rightHand = new THREE.Mesh(
      new THREE.SphereGeometry(0.105, 20, 20),
      skinMat,
    );
    rightHand.scale.set(1.0, 0.82, 1.15);
    rightHand.position.set(0.23, -0.39, 0.54);
    rightForearmGroup.add(rightHand);

    // --- FLOATING 3D HOLOGRAPHIC LAPTOP & CODE BARS ---
    const deckGroup = new THREE.Group();
    deckGroup.position.set(0, -0.94, 0.78);
    characterRoot.add(deckGroup);

    const laptopMat = new THREE.MeshPhysicalMaterial({
      color: 0x1e2230,
      roughness: 0.3,
      metalness: 0.75,
      clearcoat: 0.4,
    });

    const laptopBase = new THREE.Mesh(
      new RoundedBoxGeometry(0.86, 0.035, 0.52, 4, 0.015),
      laptopMat,
    );
    deckGroup.add(laptopBase);

    const laptopLid = new THREE.Mesh(
      new RoundedBoxGeometry(0.86, 0.52, 0.028, 4, 0.015),
      laptopMat,
    );
    laptopLid.position.set(0, 0.24, -0.26);
    laptopLid.rotation.x = -0.28;
    deckGroup.add(laptopLid);

    // Glowing Vermilion / Cyan Holographic Code Bars floating above deck
    const holoGroup = new THREE.Group();
    holoGroup.position.set(0, 0.28, -0.02);
    deckGroup.add(holoGroup);

    const holoBars: THREE.Mesh[] = [];
    const barSpecs = [
      { w: 0.42, y: 0.14, x: -0.08, color: 0xff582a },
      { w: 0.56, y: 0.06, x: 0.02, color: 0x38bdf8 },
      { w: 0.34, y: -0.02, x: -0.12, color: 0xffb547 },
    ];
    for (const spec of barSpecs) {
      const bar = new THREE.Mesh(
        new RoundedBoxGeometry(spec.w, 0.026, 0.012, 2, 0.006),
        new THREE.MeshBasicMaterial({
          color: spec.color,
          transparent: true,
          opacity: 0.82,
        }),
      );
      bar.position.set(spec.x, spec.y, 0);
      holoGroup.add(bar);
      holoBars.push(bar);
    }

    // Floating 3D Orbital Craft Nodes around Nirav
    const orbitGroup = new THREE.Group();
    orbitGroup.position.set(0, 0.15, 0);
    characterRoot.add(orbitGroup);

    const orbNode1 = new THREE.Mesh(
      new THREE.OctahedronGeometry(0.065, 0),
      new THREE.MeshStandardMaterial({
        color: 0xff582a,
        emissive: 0xff582a,
        emissiveIntensity: 0.6,
        roughness: 0.2,
      }),
    );
    orbNode1.position.set(0.92, 0.42, -0.15);
    orbitGroup.add(orbNode1);

    const orbNode2 = new THREE.Mesh(
      new THREE.OctahedronGeometry(0.05, 0),
      new THREE.MeshStandardMaterial({
        color: 0xffb547,
        emissive: 0xffb547,
        emissiveIntensity: 0.5,
        roughness: 0.2,
      }),
    );
    orbNode2.position.set(-0.88, 0.28, 0.18);
    orbitGroup.add(orbNode2);

    // 5. Sizing & Interactive Pointer / Drag Listeners
    const resize = () => {
      const w = Math.max(1, container.clientWidth);
      const h = Math.max(1, container.clientHeight);
      renderer.setSize(w, h, true);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(container);

    let targetGazeX = 0;
    let targetGazeY = 0;
    let gazeX = 0;
    let gazeY = 0;
    let headX = 0;
    let headY = 0;
    let torsoY = 0;

    let dragging = false;
    let dragStartX = 0;
    let dragSpin = 0;
    let smoothSpin = 0;

    const onWindowPointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const cx = rect.left + rect.width * 0.5;
      const cy = rect.top + rect.height * 0.42;
      targetGazeX = Math.max(
        -1,
        Math.min(1, (e.clientX - cx) / (window.innerWidth * 0.42)),
      );
      targetGazeY = Math.max(
        -1,
        Math.min(1, (cy - e.clientY) / (window.innerHeight * 0.42)),
      );

      if (dragging) {
        const dx = e.clientX - dragStartX;
        dragStartX = e.clientX;
        dragSpin = Math.max(-0.68, Math.min(0.68, dragSpin + dx * 0.008));
      }
    };

    const onPointerDown = (e: PointerEvent) => {
      dragging = true;
      dragStartX = e.clientX;
    };

    const onPointerUp = () => {
      dragging = false;
    };

    window.addEventListener("pointermove", onWindowPointerMove, {
      passive: true,
    });
    container.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("pointerup", onPointerUp, { passive: true });

    // Natural Blink Scheduler
    let nextBlinkTime = 1.6;
    let blinkDuration = 0.16;

    const startTime = performance.now() / 1000;

    // 6. 60fps Animation Loop
    const animate = () => {
      if (disposed) return;
      const now = performance.now() / 1000;
      const t = now - startTime;

      // Spring-staggered gaze hierarchy: Pupils lead -> Head follows -> Torso leans
      gazeX += (targetGazeX - gazeX) * 0.14;
      gazeY += (targetGazeY - gazeY) * 0.14;
      headX += (targetGazeY * -0.22 - headX) * 0.075;
      headY += (targetGazeX * 0.38 - headY) * 0.075;
      torsoY += (targetGazeX * 0.14 - torsoY) * 0.045;

      if (!dragging) {
        dragSpin *= 0.95;
      }
      smoothSpin += (dragSpin - smoothSpin) * 0.1;

      // Idle organic float & breathing
      const breath = Math.sin(t * 2.1);
      characterRoot.position.y = -0.05 + Math.sin(t * 1.5) * 0.025;
      characterRoot.rotation.y = smoothSpin + Math.sin(t * 0.65) * 0.04;

      torsoGroup.scale.set(
        1 + breath * 0.01,
        1 + breath * 0.012,
        1 + breath * 0.01,
      );
      torsoGroup.rotation.y = torsoY;

      // Wave reaction state
      const waveElapsed = now - waveStartRef.current;
      const isWaving = waveElapsed >= 0 && waveElapsed < 1.55;
      const waveEnv = isWaving
        ? Math.sin(Math.min(1, waveElapsed / 1.55) * Math.PI)
        : 0;

      // Head rotation + playful tilt on wave
      headPivot.rotation.x = headX + Math.sin(t * 1.1) * 0.02 - waveEnv * 0.08;
      headPivot.rotation.y = headY;
      headPivot.rotation.z =
        -gazeX * 0.05 + Math.sin(t * 0.85) * 0.018 + waveEnv * 0.11;

      // Eye Pupil Tracking
      const px = gazeX * 0.026;
      const py = gazeY * 0.02;
      leftEye.pupilRig.position.x = px;
      leftEye.pupilRig.position.y = py;
      rightEye.pupilRig.position.x = px;
      rightEye.pupilRig.position.y = py;

      // Natural Eyelid Blinking
      if (t > nextBlinkTime + blinkDuration) {
        nextBlinkTime = t + 2.4 + Math.random() * 2.3;
      }
      let blinkAmount = 0;
      if (t >= nextBlinkTime && t <= nextBlinkTime + blinkDuration) {
        const bp = (t - nextBlinkTime) / blinkDuration;
        blinkAmount = Math.sin(bp * Math.PI);
      }
      const lidScaleY = 0.05 + Math.max(blinkAmount, waveEnv * 0.35) * 1.02;
      leftEye.eyelid.scale.y = lidScaleY;
      rightEye.eyelid.scale.y = lidScaleY;

      // Eyebrow micro-expressions
      const browLift = gazeY * 0.018 + waveEnv * 0.042;
      leftBrow.position.y = 0.235 + browLift;
      rightBrow.position.y = 0.235 + browLift;
      leftBrow.rotation.z = 0.05 + waveEnv * 0.08;
      rightBrow.rotation.z = -0.05 - waveEnv * 0.08;

      // Left hand gentle typing bob
      leftArmPivot.rotation.x = Math.sin(t * 5.2) * 0.035 * (1 - waveEnv);

      // Right arm: gentle alternating typing in idle OR smooth friendly wave on click!
      if (waveEnv > 0.001) {
        const waveOsc = Math.sin(waveElapsed * 15.0) * 0.26 * waveEnv;
        rightArmPivot.rotation.z = -2.15 * waveEnv + waveOsc;
        rightArmPivot.rotation.x = -0.6 * waveEnv;
      } else {
        rightArmPivot.rotation.z = 0;
        rightArmPivot.rotation.x = Math.cos(t * 5.2) * 0.035;
      }

      // Floating holographic deck & code bar shimmer
      deckGroup.position.y = -0.94 + Math.sin(t * 2.0 + 1.0) * 0.018;
      holoBars.forEach((bar, idx) => {
        bar.position.x =
          barSpecs[idx].x + Math.sin(t * 2.4 + idx * 1.3) * 0.025;
        bar.scale.x = 0.9 + Math.sin(t * 3.1 + idx) * 0.1;
      });

      // Orbiting geometric craft crystals
      orbNode1.position.y = 0.42 + Math.sin(t * 2.2) * 0.08;
      orbNode1.rotation.y = t * 1.4;
      orbNode1.rotation.x = t * 0.9;

      orbNode2.position.y = 0.28 + Math.cos(t * 1.9) * 0.07;
      orbNode2.rotation.y = -t * 1.2;
      orbNode2.rotation.z = t * 0.8;

      renderer.render(scene, camera);
      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      disposed = true;
      cancelAnimationFrame(rafId);
      ro.disconnect();
      window.removeEventListener("pointermove", onWindowPointerMove);
      container.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      envTex.dispose();
      pmrem.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      data-cursor="CLICK TO WAVE"
      onClick={triggerWave}
      className={cn(
        "relative w-full h-full bg-[#191817] overflow-hidden select-none cursor-pointer",
        className,
      )}
    >
      {/* Studio Backdrop Radial Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,rgba(255,75,75,0.16),rgba(255,199,48,0.06)_45%,transparent_75%)]"
      />

      {/* Top-Left Live Interactive Hint */}
      <div className="pointer-events-none absolute top-3 left-3.5 z-20 flex items-center gap-2 px-2.5 py-1 rounded-full bg-black/55 backdrop-blur-md border border-white/10 font-mono text-[9px] uppercase tracking-[0.16em] text-white/80">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        <span>{waving ? "HEY THERE! 👋" : "CLICK TO WAVE · DRAG 3D"}</span>
      </div>
    </div>
  );
}
