import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text, Html } from "@react-three/drei";
import * as THREE from "three";
import { ATOM_COLORS, ATOM_RADII } from "@/lib/reactions";

export interface Atom3D {
  id: string;
  symbol: string;
  position: [number, number, number];
  charge?: string;
  label?: string;
}

export interface Bond3D {
  from: string;
  to: string;
  order?: 1 | 2 | 3;
  dashed?: boolean;
  color?: string;
}

interface AtomMeshProps {
  atom: Atom3D;
}

function AtomMesh({ atom }: AtomMeshProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const color = ATOM_COLORS[atom.symbol] ?? "#999";
  const radius = ATOM_RADII[atom.symbol] ?? 0.45;

  useFrame((state) => {
    if (meshRef.current && (atom.charge === "+" || atom.charge === "δ+")) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 3) * 0.05;
      meshRef.current.scale.setScalar(scale);
    }
  });

  return (
    <group position={atom.position}>
      <mesh ref={meshRef} castShadow>
        <sphereGeometry args={[radius, 32, 32]} />
        <meshStandardMaterial
          color={color}
          metalness={0.4}
          roughness={0.3}
          emissive={color}
          emissiveIntensity={0.15}
        />
      </mesh>
      <Text
        position={[0, 0, radius + 0.01]}
        fontSize={radius * 0.9}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor="#000000"
      >
        {atom.label ?? atom.symbol}
      </Text>
      {atom.charge && (
        <Html
          position={[radius + 0.2, radius + 0.2, 0]}
          center
          style={{
            color: atom.charge.includes("-") ? "#ef4444" : "#facc15",
            fontWeight: "bold",
            fontSize: "14px",
            pointerEvents: "none",
            textShadow: "0 0 4px rgba(0,0,0,0.8)",
          }}
        >
          {atom.charge}
        </Html>
      )}
    </group>
  );
}

interface BondLineProps {
  bond: Bond3D;
  atoms: Atom3D[];
}

function BondLine({ bond, atoms }: BondLineProps) {
  const fromAtom = atoms.find((a) => a.id === bond.from);
  const toAtom = atoms.find((a) => a.id === bond.to);

  const data = useMemo(() => {
    if (!fromAtom || !toAtom) return null;
    const start = new THREE.Vector3(...fromAtom.position);
    const end = new THREE.Vector3(...toAtom.position);
    const dir = new THREE.Vector3().subVectors(end, start);
    const len = dir.length();
    const mid = new THREE.Vector3()
      .addVectors(start, end)
      .multiplyScalar(0.5);
    const quaternion = new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      dir.clone().normalize(),
    );
    return { mid, len, quaternion };
  }, [fromAtom, toAtom]);

  if (!data || !fromAtom || !toAtom) return null;

  const order = bond.order ?? 1;
  const color = bond.color ?? "#cbd5e1";
  const offsets: number[] = order === 1 ? [0] : order === 2 ? [-0.12, 0.12] : [-0.18, 0, 0.18];

  return (
    <group position={data.mid} quaternion={data.quaternion}>
      {offsets.map((offset, i) => (
        <mesh key={i} position={[offset, 0, 0]}>
          <cylinderGeometry args={[0.06, 0.06, data.len, 12]} />
          <meshStandardMaterial
            color={color}
            metalness={0.3}
            roughness={0.5}
            transparent={bond.dashed}
            opacity={bond.dashed ? 0.4 : 1}
          />
        </mesh>
      ))}
    </group>
  );
}

interface ElectronArrowProps {
  from: [number, number, number];
  to: [number, number, number];
  color?: string;
}

function ElectronArrow({ from, to, color = "#f43f5e" }: ElectronArrowProps) {
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (ref.current) {
      const t = (Math.sin(state.clock.elapsedTime * 1.5) + 1) / 2;
      ref.current.scale.setScalar(0.7 + t * 0.4);
    }
  });

  const data = useMemo(() => {
    const start = new THREE.Vector3(...from);
    const end = new THREE.Vector3(...to);
    const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
    mid.y += 0.5;

    const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
    const points = curve.getPoints(20);
    const tubeGeom = new THREE.TubeGeometry(curve, 20, 0.04, 8, false);

    const dir = new THREE.Vector3().subVectors(end, points[points.length - 2]).normalize();
    const arrowQuaternion = new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      dir,
    );

    return { tubeGeom, end, arrowQuaternion };
  }, [from, to]);

  return (
    <group ref={ref}>
      <mesh geometry={data.tubeGeom}>
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.6}
        />
      </mesh>
      <mesh position={data.end} quaternion={data.arrowQuaternion}>
        <coneGeometry args={[0.12, 0.3, 12]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.6}
        />
      </mesh>
    </group>
  );
}

function Scene({
  atoms,
  bonds,
  arrows,
}: {
  atoms: Atom3D[];
  bonds: Bond3D[];
  arrows?: { from: [number, number, number]; to: [number, number, number]; color?: string }[];
}) {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 8, 5]} intensity={1.2} castShadow />
      <directionalLight position={[-5, -3, -5]} intensity={0.4} color="#60a5fa" />
      <pointLight position={[0, 0, 5]} intensity={0.6} color="#38bdf8" />

      {bonds.map((bond, i) => (
        <BondLine key={`bond-${i}`} bond={bond} atoms={atoms} />
      ))}
      {atoms.map((atom) => (
        <AtomMesh key={atom.id} atom={atom} />
      ))}
      {arrows?.map((arrow, i) => (
        <ElectronArrow key={`arrow-${i}`} {...arrow} />
      ))}
    </>
  );
}

interface Molecule3DProps {
  atoms: Atom3D[];
  bonds: Bond3D[];
  arrows?: { from: [number, number, number]; to: [number, number, number]; color?: string }[];
  cameraPosition?: [number, number, number];
}

function WebGLFallback({ atoms }: { atoms: Atom3D[] }) {
  return (
    <div
      className="flex h-full w-full flex-col items-center justify-center gap-4 p-8 text-center"
      style={{
        background:
          "radial-gradient(circle at center, hsl(222 47% 13%), hsl(222 47% 7%))",
      }}
    >
      <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4 max-w-md">
        <div className="text-sm font-semibold text-amber-300">
          Vue 3D indisponible
        </div>
        <p className="mt-2 text-xs text-amber-200/80">
          Votre navigateur ne supporte pas WebGL. Veuillez utiliser un navigateur
          récent (Chrome, Firefox, Edge, Safari) avec l'accélération matérielle activée.
          La vue 2D reste pleinement disponible.
        </p>
      </div>
      <div className="text-xs text-muted-foreground">
        Atomes présents : {atoms.map((a) => a.label ?? a.symbol).join(", ")}
      </div>
    </div>
  );
}

export function Molecule3D({
  atoms,
  bonds,
  arrows,
  cameraPosition = [0, 2, 8],
}: Molecule3DProps) {
  const [webglOk, setWebglOk] = useState(true);

  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl2") || canvas.getContext("webgl");
      setWebglOk(!!gl);
    } catch {
      setWebglOk(false);
    }
  }, []);

  if (!webglOk) {
    return <WebGLFallback atoms={atoms} />;
  }

  return (
    <Canvas
      camera={{ position: cameraPosition, fov: 50 }}
      style={{
        background:
          "radial-gradient(circle at center, hsl(222 47% 13%), hsl(222 47% 7%))",
      }}
      shadows
      onCreated={({ gl }) => {
        gl.setClearColor(0x0a1024, 1);
      }}
      gl={{ failIfMajorPerformanceCaveat: false, antialias: true }}
    >
      <Scene atoms={atoms} bonds={bonds} arrows={arrows} />
      <OrbitControls
        enablePan={false}
        minDistance={4}
        maxDistance={20}
        autoRotate
        autoRotateSpeed={0.5}
      />
    </Canvas>
  );
}
