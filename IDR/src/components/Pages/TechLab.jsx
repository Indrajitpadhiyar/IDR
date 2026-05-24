import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import * as THREE from 'three';
import {
  Code2,
  Database,
  ArrowRight,
  ArrowUpRight,
  Zap,
  Layers,
  Cpu,
  Flame,
  Lock,
  Globe,
  Settings,
  Server,
  Activity,
  GitBranch,
  Smartphone,
  Monitor,
} from 'lucide-react';

const TECH_DATA = [
  { id: 'react', name: 'React.js 19', category: 'frontend', description: 'Component-driven frontend with modern hooks, suspense, and server actions for ultra-fast clients.', icon: Code2, color: '#0b63f6', badge: 'Frontend', metrics: { Speed: 96, DX: 98, Scale: 95 } },
  { id: 'angular', name: 'Angular', category: 'frontend', description: 'Enterprise-grade, structured framework for large-scale apps with built-in type-safety.', icon: Layers, color: '#dd0031', badge: 'Frontend', metrics: { Speed: 92, DX: 90, Scale: 99 } },
  { id: 'react-native', name: 'React Native', category: 'mobile', description: 'Cross-platform native Android apps built with React syntax and native-feeling performance.', icon: Cpu, color: '#00a7d8', badge: 'Mobile', metrics: { Speed: 89, DX: 95, Scale: 90 } },
  { id: 'tailwind', name: 'Tailwind CSS 4', category: 'styling', description: 'Utility-first CSS with lightning builds, CSS variables, and scalable design tokens.', icon: Globe, color: '#0284c7', badge: 'Styling', metrics: { Speed: 100, DX: 97, Scale: 92 } },
  { id: 'framer', name: 'Framer Motion', category: 'styling', description: 'Spring physics animations, keyframe sequences, and polished micro-interactions.', icon: Flame, color: '#f43f5e', badge: 'Animation', metrics: { Speed: 95, DX: 94, Scale: 90 } },
  { id: 'gsap', name: 'GSAP 3', category: 'styling', description: 'ScrollTrigger timelines, parallax, and performance-optimized 60fps motion systems.', icon: Settings, color: '#5a9f00', badge: 'Animation', metrics: { Speed: 99, DX: 96, Scale: 98 } },
  { id: 'threejs', name: 'Three.js', category: 'styling', description: 'WebGL rendering, custom shaders, and interactive 3D scenes built for browsers.', icon: Globe, color: '#6366f1', badge: 'WebGL', metrics: { Speed: 94, DX: 88, Scale: 91 } },
  { id: 'node', name: 'Node.js & Express', category: 'backend', description: 'Event-driven, non-blocking API servers with RESTful and GraphQL routing patterns.', icon: Server, color: '#339933', badge: 'Backend', metrics: { Speed: 95, DX: 97, Scale: 96 } },
  { id: 'firebase', name: 'Firebase Suite', category: 'backend', description: 'Serverless auth, Firestore realtime sync, Cloud Functions, and CDN-backed storage.', icon: Lock, color: '#d97706', badge: 'Backend', metrics: { Speed: 97, DX: 91, Scale: 89 } },
  { id: 'mongodb', name: 'MongoDB', category: 'database', description: 'Document NoSQL for rapid schema iteration, large payloads, and horizontal scaling.', icon: Database, color: '#16a34a', badge: 'Database', metrics: { Speed: 97, DX: 95, Scale: 96 } },
  { id: 'mysql', name: 'MySQL', category: 'database', description: 'Relational SQL with ACID compliance, optimized joins, and transactional safety.', icon: Database, color: '#00758f', badge: 'Database', metrics: { Speed: 93, DX: 88, Scale: 92 } },
  { id: 'postgresql', name: 'PostgreSQL', category: 'database', description: 'Object-relational DB with JSONB indexing, MVCC, and complex analytical queries.', icon: Database, color: '#336791', badge: 'Database', metrics: { Speed: 95, DX: 92, Scale: 98 } },
];

const CATEGORIES = [
  { id: 'frontend', label: 'Frontend' },
  { id: 'backend', label: 'Backend' },
  { id: 'database', label: 'Database' },
  { id: 'mobile', label: 'Mobile' },
];

const ARCH_LAYERS = [
  { label: 'Client Apps', icon: Monitor, items: ['React.js 19', 'Angular', 'Next.js'], color: 'from-blue-500 to-indigo-500', dot: 'bg-blue-500' },
  { label: 'Mobile', icon: Smartphone, items: ['React Native', 'Android SDK', 'Expo'], color: 'from-cyan-500 to-blue-500', dot: 'bg-cyan-500' },
  { label: 'API Layer', icon: Server, items: ['Node.js', 'Express.js', 'Firebase Functions'], color: 'from-green-500 to-emerald-500', dot: 'bg-green-500' },
  { label: 'Databases', icon: Database, items: ['MongoDB', 'MySQL', 'PostgreSQL'], color: 'from-orange-500 to-amber-500', dot: 'bg-orange-500' },
];

const ocean = new THREE.Color('#0b63f6');
const deepOcean = new THREE.Color('#1646a0');
const land = new THREE.Color('#20a464');
const highland = new THREE.Color('#f0c977');
const ice = new THREE.Color('#f8fbff');
const cloud = new THREE.Color('#ffffff');
const waveBlue = new THREE.Color('#7db2ff');
const waveSoft = new THREE.Color('#dbeafe');

const pseudoNoise = (lat, lon) => {
  const a = Math.sin(lon * 2.4 + Math.sin(lat * 3.2) * 1.2);
  const b = Math.sin(lon * 5.1 - lat * 2.7);
  const c = Math.cos(lon * 1.3 + lat * 5.8);
  return a * 0.48 + b * 0.3 + c * 0.22;
};

const earthColorAt = (x, y, z, radius) => {
  const lat = Math.asin(y / radius);
  const lon = Math.atan2(z, x);
  const polar = Math.abs(lat) / (Math.PI / 2);
  const n = pseudoNoise(lat, lon);
  const cloudBand = Math.sin(lon * 7.5 + lat * 9.5) + Math.cos(lon * 4.3 - lat * 6.2);

  if (polar > 0.84) return ice;
  if (cloudBand > 1.36 && polar < 0.78) return cloud;
  if (n > 0.12) return n > 0.45 ? highland : land;
  return polar > 0.72 ? ocean.clone().lerp(ice, 0.3) : deepOcean.clone().lerp(ocean, Math.max(0, n + 0.55));
};

const writeColor = (array, index, color) => {
  array[index] = color.r;
  array[index + 1] = color.g;
  array[index + 2] = color.b;
};

function TechCanvas({ canvasRef, scopeRef, fullPage = false, hovering }) {
  const frameRef = useRef(null);
  const mixRef = useRef(0);
  const targetMixRef = useRef(0);
  const waveRef = useRef(null);
  const earthRef = useRef(null);
  const waveColorRef = useRef(null);
  const earthColorRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    targetMixRef.current = hovering ? 1 : 0;
  }, [hovering]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const scope = fullPage ? window : scopeRef.current;
    if (!canvas || !scope) return undefined;

    const COUNT = fullPage ? 5200 : 3600;
    let width = fullPage ? window.innerWidth : scope.clientWidth;
    let height = fullPage ? window.innerHeight : scope.clientHeight || 760;
    const radius = fullPage ? 2.95 : 2.65;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(52, width / height, 0.1, 100);
    camera.position.z = fullPage ? 7.4 : 7;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const wave = new Float32Array(COUNT * 3);
    const earth = new Float32Array(COUNT * 3);
    const waveColors = new Float32Array(COUNT * 3);
    const earthColors = new Float32Array(COUNT * 3);
    const cols = Math.ceil(Math.sqrt(COUNT * (width / height)));
    const rows = Math.ceil(COUNT / cols);

    for (let i = 0; i < COUNT; i += 1) {
      const i3 = i * 3;
      const col = i % cols;
      const row = Math.floor(i / cols);
      const wx = (col / cols - 0.5) * (fullPage ? 18 : 16);
      const wz = (row / rows - 0.5) * (fullPage ? 11 : 10);
      const wy = Math.sin(wx * 0.5) * 0.42 + Math.cos(wz * 0.7) * 0.34;
      wave[i3] = wx + (Math.random() - 0.5) * 0.14;
      wave[i3 + 1] = wy + (Math.random() - 0.5) * 0.12;
      wave[i3 + 2] = wz + (Math.random() - 0.5) * 0.14;

      const phi = Math.acos(1 - (2 * (i + 0.5)) / COUNT);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      const ex = radius * Math.sin(phi) * Math.cos(theta);
      const ey = radius * Math.cos(phi);
      const ez = radius * Math.sin(phi) * Math.sin(theta);
      earth[i3] = ex;
      earth[i3 + 1] = ey;
      earth[i3 + 2] = ez;

      writeColor(waveColors, i3, i % 5 === 0 ? waveSoft : waveBlue);
      writeColor(earthColors, i3, earthColorAt(ex, ey, ez, radius));
    }

    waveRef.current = wave;
    earthRef.current = earth;
    waveColorRef.current = waveColors;
    earthColorRef.current = earthColors;

    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(COUNT * 3);
    const colors = new Float32Array(COUNT * 3);
    positions.set(wave);
    colors.set(waveColors);
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: fullPage ? 0.043 : 0.05,
      vertexColors: true,
      transparent: true,
      opacity: fullPage ? 0.82 : 0.78,
      sizeAttenuation: true,
    });

    const globe = new THREE.Points(geometry, material);
    scene.add(globe);

    const clock = new THREE.Clock();
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();
      mixRef.current += (targetMixRef.current - mixRef.current) * 0.045;
      const mix = mixRef.current;
      const posAttr = geometry.attributes.position;
      const colorAttr = geometry.attributes.color;

      for (let i = 0; i < COUNT; i += 1) {
        const i3 = i * 3;
        const wx = wave[i3];
        const wy = wave[i3 + 1] + Math.sin(time * 0.55 + wx * 0.36) * 0.12 * (1 - mix);
        const wz = wave[i3 + 2];
        posAttr.array[i3] = wx + (earth[i3] - wx) * mix;
        posAttr.array[i3 + 1] = wy + (earth[i3 + 1] - wy) * mix;
        posAttr.array[i3 + 2] = wz + (earth[i3 + 2] - wz) * mix;
        colorAttr.array[i3] = waveColors[i3] + (earthColors[i3] - waveColors[i3]) * mix;
        colorAttr.array[i3 + 1] = waveColors[i3 + 1] + (earthColors[i3 + 1] - waveColors[i3 + 1]) * mix;
        colorAttr.array[i3 + 2] = waveColors[i3 + 2] + (earthColors[i3 + 2] - waveColors[i3 + 2]) * mix;
      }

      posAttr.needsUpdate = true;
      colorAttr.needsUpdate = true;
      globe.rotation.y += 0.0055 * mix + mouseRef.current.x * 0.00045 * (1 - mix);
      globe.rotation.x = THREE.MathUtils.lerp(globe.rotation.x, mouseRef.current.y * 0.12 * (1 - mix), 0.035);
      renderer.render(scene, camera);
    };
    animate();

    const onMouse = (event) => {
      const rect = fullPage ? { left: 0, top: 0, width, height } : scope.getBoundingClientRect();
      mouseRef.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouseRef.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    };

    const onResize = () => {
      width = fullPage ? window.innerWidth : scope.clientWidth;
      height = fullPage ? window.innerHeight : scope.clientHeight || 760;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('mousemove', onMouse);
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('mousemove', onMouse);
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(frameRef.current);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, [canvasRef, fullPage, scopeRef]);

  return null;
}

export default function TechLab({ variant = 'section' }) {
  const isPage = variant === 'page';
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState('frontend');
  const [selectedTech, setSelectedTech] = useState(TECH_DATA[0]);
  const [isHoveringCard, setIsHoveringCard] = useState(false);

  const filteredTech = TECH_DATA.filter((tech) => (
    activeCategory === 'frontend'
      ? tech.category === 'frontend' || tech.category === 'styling'
      : tech.category === activeCategory
  ));

  const handleCardHover = useCallback((tech) => {
    setSelectedTech(tech);
    setIsHoveringCard(true);
  }, []);

  const handleCardLeave = useCallback(() => {
    setIsHoveringCard(false);
  }, []);

  const wrapperClass = isPage
    ? 'relative min-h-screen overflow-x-hidden bg-white text-slate-950'
    : 'relative overflow-hidden bg-white py-24 px-4 sm:px-6 lg:px-8 min-h-screen';

  const contentClass = isPage
    ? 'relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'
    : 'relative z-10 mx-auto max-w-7xl';

  const heroIcon = isPage ? Activity : Zap;
  const HeroIcon = heroIcon;

  return (
    <section id="tech-stack" ref={sectionRef} className={wrapperClass}>
      <canvas
        ref={canvasRef}
        className={`${isPage ? 'fixed' : 'absolute'} inset-0 h-full w-full pointer-events-none`}
        style={{ opacity: isPage ? 0.72 : 0.62 }}
      />
      <TechCanvas canvasRef={canvasRef} scopeRef={sectionRef} fullPage={isPage} hovering={isHoveringCard} />

      <div className={`${isPage ? 'fixed' : 'absolute'} inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_15%,rgba(11,99,246,0.12),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.82),rgba(255,255,255,0.56)_45%,rgba(255,255,255,0.95))]`} />

      <div className={contentClass}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
          className={`${isPage ? 'pt-36 pb-14' : 'mb-16'} text-center`}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/85 px-4 py-1.5 text-xs font-extrabold uppercase tracking-[0.28em] text-blue-700 shadow-sm">
            <HeroIcon className="h-3.5 w-3.5" />
            {isPage ? 'Interactive Lab' : 'Technology Stack'}
          </span>
          <h1 className={`${isPage ? 'text-5xl sm:text-6xl lg:text-7xl' : 'text-4xl sm:text-5xl lg:text-6xl'} mt-5 font-black leading-[1.1] tracking-tight text-slate-950`}>
            {isPage ? 'Capabilities' : 'Our Interactive'}
            <span className="block mt-2 bg-gradient-to-r from-blue-700 via-sky-500 to-emerald-500 bg-clip-text text-transparent">
              {isPage ? 'Technology Lab' : 'Tech Capabilities'}
            </span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
            Hover over any technology card to turn the dot field into a detailed rotating Earth with oceans, land, ice, and cloud-like highlights.
          </p>
          {isPage && (
            <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
              <a href="#contact" className="inline-flex items-center gap-2 rounded-full bg-blue-700 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-700/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-600">
                Start Your Project <ArrowRight className="h-4 w-4" />
              </a>
              <a href="/projects" className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/85 px-7 py-3.5 text-sm font-bold text-slate-700 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:text-blue-700">
                View Work <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          )}
        </motion.div>

        <div className="mb-10 flex flex-wrap items-center justify-center gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                const next = TECH_DATA.filter((tech) => (
                  cat.id === 'frontend'
                    ? tech.category === 'frontend' || tech.category === 'styling'
                    : tech.category === cat.id
                ));
                if (next[0]) setSelectedTech(next[0]);
              }}
              className={`rounded-full border px-4 py-2 text-xs font-bold tracking-wide transition-all duration-300 ${
                activeCategory === cat.id
                  ? 'border-blue-600 bg-blue-700 text-white shadow-lg shadow-blue-700/20'
                  : 'border-slate-200 bg-white/85 text-slate-600 shadow-sm hover:border-blue-200 hover:text-blue-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <AnimatePresence mode="popLayout">
                {filteredTech.map((tech, idx) => {
                  const Icon = tech.icon;
                  const isSelected = selectedTech.id === tech.id;
                  return (
                    <motion.div
                      key={tech.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3, delay: idx * 0.035 }}
                      onMouseEnter={() => handleCardHover(tech)}
                      onMouseLeave={handleCardLeave}
                      onClick={() => setSelectedTech(tech)}
                      className={`group relative cursor-pointer rounded-2xl border bg-white/88 p-5 shadow-[0_18px_50px_rgba(15,23,42,0.07)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_24px_60px_rgba(11,99,246,0.13)] ${
                        isSelected ? 'border-blue-200 ring-1 ring-blue-100' : 'border-slate-200/80'
                      }`}
                    >
                      {isSelected && <div className="absolute left-0 right-0 top-0 h-[2px] rounded-t-2xl" style={{ background: `linear-gradient(90deg, ${tech.color}, ${tech.color}55)` }} />}
                      <div className="flex items-start gap-4">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border" style={{ backgroundColor: `${tech.color}12`, borderColor: `${tech.color}30`, color: tech.color }}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="mb-1 flex items-center justify-between gap-2">
                            <p className="truncate text-sm font-extrabold text-slate-950">{tech.name}</p>
                            <span className="shrink-0 rounded-full border px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider" style={{ color: tech.color, backgroundColor: `${tech.color}10`, borderColor: `${tech.color}2f` }}>
                              {tech.badge}
                            </span>
                          </div>
                          <p className="line-clamp-2 text-xs leading-relaxed text-slate-600">{tech.description}</p>
                          <div className="mt-3 space-y-1.5">
                            {Object.entries(tech.metrics).map(([key, val]) => (
                              <div key={key} className="flex items-center gap-2">
                                <span className="w-8 text-[9px] font-bold uppercase text-slate-400">{key}</span>
                                <div className="h-1 flex-1 overflow-hidden rounded-full bg-slate-100">
                                  <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: isSelected ? `${val}%` : '0%' }}
                                    transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
                                    className="h-full rounded-full"
                                    style={{ backgroundColor: tech.color }}
                                  />
                                </div>
                                <span className="w-6 text-right font-mono text-[9px] text-slate-400">{val}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      <ArrowUpRight className="absolute right-4 top-4 h-3.5 w-3.5 text-slate-300 transition-colors group-hover:text-blue-600" />
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>

          <div className="lg:col-span-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedTech.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.35 }}
                className="sticky top-24"
              >
                <div className="rounded-3xl border border-slate-200 bg-white/90 p-7 shadow-[0_28px_80px_rgba(15,23,42,0.10)] backdrop-blur-md">
                  <div className="mb-6 flex items-start justify-between gap-3">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl border" style={{ backgroundColor: `${selectedTech.color}12`, borderColor: `${selectedTech.color}30`, color: selectedTech.color }}>
                      <selectedTech.icon className="h-7 w-7" />
                    </div>
                    <span className="rounded-full border px-3 py-1.5 text-xs font-extrabold uppercase tracking-widest" style={{ color: selectedTech.color, backgroundColor: `${selectedTech.color}10`, borderColor: `${selectedTech.color}30` }}>
                      {selectedTech.badge}
                    </span>
                  </div>
                  <h3 className="mb-2 text-2xl font-extrabold text-slate-950">{selectedTech.name}</h3>
                  <p className="mb-6 text-sm leading-relaxed text-slate-600">{selectedTech.description}</p>
                  <div className="mb-6 grid grid-cols-3 gap-3">
                    {Object.entries(selectedTech.metrics).map(([key, val]) => (
                      <div key={key} className="rounded-xl border p-3 text-center" style={{ borderColor: `${selectedTech.color}24`, backgroundColor: `${selectedTech.color}0d` }}>
                        <div className="font-mono text-2xl font-black" style={{ color: selectedTech.color }}>{val}</div>
                        <div className="mt-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">{key}</div>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                    <div className="h-2 w-2 shrink-0 rounded-full animate-pulse" style={{ backgroundColor: isHoveringCard ? selectedTech.color : '#94a3b8' }} />
                    <p className="text-xs text-slate-600">
                      {isHoveringCard ? 'Earth mode active: oceans, continents, polar ice, and cloud highlights are rotating.' : 'Hover any card to reveal the Earth animation.'}
                    </p>
                  </div>
                </div>

                <a href="#contact" className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-700 py-4 text-sm font-bold text-white shadow-lg shadow-blue-700/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-600">
                  Build with This Stack <ArrowRight className="h-4 w-4" />
                </a>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className={`${isPage ? 'py-20' : 'mt-24 pt-16'} border-t border-slate-200/80`}
        >
          <div className="mb-12 text-center">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white/85 px-4 py-1.5 text-xs font-extrabold uppercase tracking-[0.28em] text-orange-600 shadow-sm">
              <GitBranch className="h-3.5 w-3.5" />
              Architecture
            </span>
            <h2 className="text-3xl font-extrabold text-slate-950 sm:text-4xl">Full-Stack System Design</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-slate-600">How the layers connect from user interface to persistent storage.</p>
          </div>

          <div className="relative grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="pointer-events-none absolute left-[12.5%] right-[12.5%] top-1/2 hidden h-px -translate-y-1/2 bg-gradient-to-r from-blue-200 via-green-200 to-orange-200 lg:block" />
            {ARCH_LAYERS.map((layer, idx) => {
              const Icon = layer.icon;
              return (
                <motion.div
                  key={layer.label}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.12 }}
                  whileHover={{ y: -6 }}
                  className="relative rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.07)] backdrop-blur-sm transition-all duration-300 hover:border-blue-200"
                >
                  <div className="mb-5 flex items-center justify-between">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${layer.color} shadow-lg`}>
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <span className="font-mono text-[10px] font-extrabold text-slate-300">{String(idx + 1).padStart(2, '0')}</span>
                  </div>
                  <h4 className="mb-3 text-sm font-extrabold text-slate-950">{layer.label}</h4>
                  <div className="space-y-2">
                    {layer.items.map((item) => (
                      <div key={item} className="flex items-center gap-2">
                        <div className={`h-1.5 w-1.5 shrink-0 rounded-full ${layer.dot}`} />
                        <span className="text-xs text-slate-600">{item}</span>
                      </div>
                    ))}
                  </div>
                  {idx < ARCH_LAYERS.length - 1 && (
                    <div className="absolute -right-3 top-1/2 z-10 hidden h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm lg:flex">
                      <ArrowRight className="h-3 w-3 text-slate-500" />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white/90 p-5 shadow-[0_18px_50px_rgba(15,23,42,0.06)] backdrop-blur-md">
            <div className="flex items-center gap-3">
              <div className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold text-slate-700">All systems operational</span>
            </div>
            <div className="flex flex-wrap gap-4">
              {[
                { label: 'Uptime', val: '99.9%', color: 'text-emerald-600' },
                { label: 'Avg Latency', val: '< 80ms', color: 'text-blue-700' },
                { label: 'Deploy Freq', val: 'Daily', color: 'text-violet-600' },
                { label: 'Test Cover', val: '94%', color: 'text-orange-600' },
              ].map((stat) => (
                <div key={stat.label} className="flex items-center gap-1.5">
                  <span className="text-[10px] font-bold uppercase text-slate-400">{stat.label}:</span>
                  <span className={`font-mono text-xs font-extrabold ${stat.color}`}>{stat.val}</span>
                </div>
              ))}
            </div>
            {!isPage && (
              <a href="/tech-showcase" className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 transition-colors hover:text-blue-500">
                Explore Full Lab <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
