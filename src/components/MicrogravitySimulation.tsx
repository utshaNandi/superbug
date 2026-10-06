"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Rocket, FlaskConical, Beaker, Dna, Activity, ArrowDown, Globe2, Shield, TestTube2, AlertCircle, ChevronRight } from 'lucide-react';

const smoothEase = [0.22, 1, 0.36, 1] as const;

type Bacterium = 'ecoli' | 'salmonella' | 'saureus';
type Antibiotic = 'none' | 'gentamicin' | 'ciprofloxacin' | 'azithromycin' | 'methicillin';
type EvidenceType = 'spaceflight' | 'simulated' | 'ground' | 'literature';

const BACTERIA = {
  ecoli: { name: 'E. coli' },
  salmonella: { name: 'S. typhimurium' },
  saureus: { name: 'S. aureus' }
};

const ANTIBIOTICS: Record<Bacterium, Antibiotic[]> = {
  ecoli: ['none', 'gentamicin', 'ciprofloxacin'],
  salmonella: ['none', 'azithromycin'],
  saureus: ['none', 'methicillin']
};

const ICONS: Record<string, React.ElementType> = {
  Globe2, ArrowDown, Beaker, Dna, Activity, Shield, TestTube2, AlertCircle, Rocket, FlaskConical
};

type Metric = { id: string; label: string; earth: number; micro: number; highlight?: boolean; evidence: EvidenceType };
type Observation = { id: string; title: string; text: string; evidence: EvidenceType };
type Mechanism = { label: string; icon: string };

type ExperimentData = {
  sourceTitle: string;
  sourceDesc: string;
  link: string | null;
  mechanism: Mechanism[];
  metrics: Metric[];
  growthCurve: { earth: number[]; micro: number[] } | null;
  observations: Observation[];
};

const DATA_DB: Record<string, ExperimentData> = {
  'salmonella-none': {
    sourceTitle: 'NASA MICROBE (STS-115) & Published LSMMG Research',
    sourceDesc: 'Spaceflight investigation of microbial gene expression combined with spaceflight-analogue growth studies.',
    link: 'https://www.nasa.gov/ames/space-biosciences/microbe-sts-115/',
    mechanism: [
      { label: 'Microgravity', icon: 'Globe2' },
      { label: 'Altered Fluid Shear', icon: 'ArrowDown' },
      { label: 'Cellular Sensing', icon: 'Beaker' },
      { label: 'Hfq Gene Regulation', icon: 'Dna' },
      { label: 'Increased Virulence', icon: 'Activity' }
    ],
    metrics: [
      { id: 'm1', label: 'Final Growth Density', earth: 70, micro: 90, evidence: 'simulated' },
      { id: 'm2', label: 'Extracellular Matrix (Biofilm)', earth: 30, micro: 85, highlight: true, evidence: 'spaceflight' },
      { id: 'm3', label: 'Differentially Expressed Genes', earth: 0, micro: 100, evidence: 'spaceflight' }
    ],
    growthCurve: { earth: [10, 20, 45, 65, 70], micro: [10, 25, 55, 80, 90] },
    observations: [
      { id: '01', title: 'Growth', text: 'Microgravity analogues produced a measurable reduction in lag phase, leading to slightly higher final cell densities compared to 1×g ground controls.', evidence: 'simulated' },
      { id: '02', title: 'Regulatory Response', text: 'Significant changes in gene expression were observed across 167 genes during actual spaceflight, orchestrated heavily by the Hfq RNA chaperone pathway.', evidence: 'spaceflight' },
      { id: '03', title: 'Biofilm / Virulence', text: 'Spaceflight samples exhibited altered behaviour resulting in increased extracellular matrix accumulation and significantly enhanced virulence in murine models.', evidence: 'spaceflight' }
    ]
  },
  'salmonella-azithromycin': {
    sourceTitle: 'NASA-Supported Analogue & STS-115 Findings',
    sourceDesc: 'Composite data utilizing STS-115 genetic data and spaceflight-analogue antibiotic susceptibility research.',
    link: null,
    mechanism: [
      { label: 'Microgravity', icon: 'Globe2' },
      { label: 'Altered Fluid Shear', icon: 'ArrowDown' },
      { label: 'Hfq/Stress Response', icon: 'Dna' },
      { label: 'Cell Envelope Changes', icon: 'Shield' },
      { label: 'Altered Susceptibility', icon: 'TestTube2' }
    ],
    metrics: [
      { id: 'm1', label: 'Antibiotic Survival Rate', earth: 20, micro: 60, highlight: true, evidence: 'simulated' },
      { id: 'm2', label: 'Extracellular Matrix (Biofilm)', earth: 30, micro: 85, evidence: 'spaceflight' }
    ],
    growthCurve: { earth: [10, 30, 40, 20, 10], micro: [10, 30, 45, 40, 35] },
    observations: [
      { id: '01', title: 'Cellular Stress', text: 'Significant stress-response activation was observed in spaceflight, serving as a precursor to altered drug sensitivity.', evidence: 'spaceflight' },
      { id: '02', title: 'Antibiotic Response', text: 'NASA-supported spaceflight-analogue research has reported altered S. Typhimurium antibiotic sensitivity to azithromycin, demonstrating delayed killing.', evidence: 'simulated' },
      { id: '03', title: 'Biofilm / Virulence', text: 'Increased virulence and biofilm-like properties were independently verified in spaceflight.', evidence: 'spaceflight' }
    ]
  },
  'ecoli-none': {
    sourceTitle: 'Simulated Microgravity Studies',
    sourceDesc: 'Peer-reviewed laboratory studies on E. coli growth kinetics under simulated microgravity.',
    link: null,
    mechanism: [
      { label: 'Microgravity', icon: 'Globe2' },
      { label: 'Altered Sedimentation', icon: 'ArrowDown' },
      { label: 'Cellular Morphology Shift', icon: 'Activity' },
      { label: 'Reduced Cell Size', icon: 'Beaker' },
      { label: 'Enhanced Growth', icon: 'Dna' }
    ],
    metrics: [
      { id: 'm1', label: 'Growth Rate (Exponential)', earth: 60, micro: 85, evidence: 'simulated' },
      { id: 'm2', label: 'Average Cell Volume', earth: 80, micro: 40, evidence: 'simulated' }
    ],
    growthCurve: { earth: [5, 15, 35, 55, 65], micro: [5, 20, 50, 75, 85] },
    observations: [
      { id: '01', title: 'Growth', text: 'Enhanced growth rates were experimentally observed during the exponential phase under modeled microgravity.', evidence: 'simulated' },
      { id: '02', title: 'Cellular Morphology', text: 'Modifications in cell size and morphology effectively altered cell surface area to volume ratios.', evidence: 'simulated' }
    ]
  },
  'ecoli-gentamicin': {
    sourceTitle: 'NASA EcAMSat (OS-813)',
    sourceDesc: 'Spaceflight investigation of E. coli antibiotic resistance using the EcAMSat nanosatellite.',
    link: 'https://osdr.nasa.gov/bio/repo/data/experiments/OS-813',
    mechanism: [
      { label: 'Microgravity', icon: 'Globe2' },
      { label: 'Quiescent Fluid', icon: 'ArrowDown' },
      { label: 'σS (RpoS) Activation', icon: 'Dna' },
      { label: 'Gentamicin Assault', icon: 'TestTube2' },
      { label: 'Enhanced Survival', icon: 'Shield' }
    ],
    metrics: [
      { id: 'm1', label: 'Antibiotic Survival Rate', earth: 15, micro: 65, highlight: true, evidence: 'spaceflight' },
      { id: 'm2', label: 'RpoS Stress Response', earth: 40, micro: 85, evidence: 'spaceflight' }
    ],
    growthCurve: { earth: [10, 30, 40, 20, 10], micro: [10, 30, 45, 50, 45] },
    observations: [
      { id: '01', title: 'Growth & Transport', text: 'The lack of convective mixing in microgravity radically altered nutrient and drug transport to the bacterial envelope.', evidence: 'spaceflight' },
      { id: '02', title: 'Cellular Stress', text: 'Microgravity-associated changes pre-adapted the cells by upregulating the general stress response pathway mediated by σS (RpoS).', evidence: 'spaceflight' },
      { id: '03', title: 'Antibiotic Response', text: 'E. coli showed a significantly higher survival rate and delayed killing when exposed to gentamicin under actual spaceflight conditions.', evidence: 'spaceflight' }
    ]
  },
  'ecoli-ciprofloxacin': {
    sourceTitle: 'Simulated Microgravity Study (PMC9502502)',
    sourceDesc: 'Peer-reviewed laboratory study on E. coli growth and antibiotic sensitivity under simulated microgravity.',
    link: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC9502502/',
    mechanism: [
      { label: 'Simulated Microgravity', icon: 'Globe2' },
      { label: 'Morphological Shift', icon: 'Activity' },
      { label: 'Envelope Thickening', icon: 'Shield' },
      { label: 'Reduced Permeability', icon: 'ArrowDown' },
      { label: 'Elevated MIC', icon: 'TestTube2' }
    ],
    metrics: [
      { id: 'm1', label: 'Growth Rate (Exponential)', earth: 60, micro: 85, evidence: 'simulated' },
      { id: 'm2', label: 'Minimum Inhibitory Concentration (MIC)', earth: 30, micro: 70, highlight: true, evidence: 'simulated' },
      { id: 'm3', label: 'Cell Size / Volume', earth: 80, micro: 40, evidence: 'simulated' }
    ],
    growthCurve: { earth: [5, 15, 35, 25, 15], micro: [5, 20, 50, 45, 35] },
    observations: [
      { id: '01', title: 'Growth', text: 'Enhanced growth rates were experimentally observed during the exponential phase under modeled microgravity.', evidence: 'simulated' },
      { id: '02', title: 'Cellular Morphology', text: 'Modifications in cell size and morphology effectively altered cell surface area to volume ratios.', evidence: 'simulated' },
      { id: '03', title: 'Antibiotic Response', text: 'The experimentally measured Minimum Inhibitory Concentration (MIC) increased, indicating reduced sensitivity to ciprofloxacin.', evidence: 'simulated' }
    ]
  },
  'saureus-none': {
    sourceTitle: 'Literature-Derived S. aureus Analogue Studies',
    sourceDesc: 'Aggregate findings from peer-reviewed rotating wall vessel (RWV) bioreactor studies on S. aureus.',
    link: null,
    mechanism: [
      { label: 'Microgravity', icon: 'Globe2' },
      { label: 'Low Shear Stress', icon: 'ArrowDown' },
      { label: 'Metabolic Shift', icon: 'Activity' },
      { label: 'PIA Expression', icon: 'Dna' },
      { label: 'Biofilm Formation', icon: 'Beaker' }
    ],
    metrics: [
      { id: 'm1', label: 'Biofilm Thickness / Biomass', earth: 40, micro: 90, highlight: true, evidence: 'simulated' },
      { id: 'm2', label: 'Growth Rate', earth: 50, micro: 60, evidence: 'simulated' }
    ],
    growthCurve: { earth: [10, 20, 40, 55, 60], micro: [10, 25, 45, 65, 75] },
    observations: [
      { id: '01', title: 'Growth', text: 'S. aureus demonstrates marginal increases in growth rate but significant shifts in metabolic profiles under low-shear modeled microgravity.', evidence: 'simulated' },
      { id: '02', title: 'Biofilm / Virulence', text: 'Studies consistently report enhanced PIA-dependent biofilm formation and thicker extracellular matrices when grown in microgravity analogues.', evidence: 'simulated' }
    ]
  },
  'saureus-methicillin': {
    sourceTitle: 'S. aureus Biofilm & Antibiotic Resistance Literature',
    sourceDesc: 'Based on published observations correlating microgravity-induced biofilm enhancements with drug resistance.',
    link: null,
    mechanism: [
      { label: 'Microgravity', icon: 'Globe2' },
      { label: 'Low Shear Stress', icon: 'ArrowDown' },
      { label: 'Thickened Biofilm', icon: 'Beaker' },
      { label: 'Reduced Drug Penetration', icon: 'Shield' },
      { label: 'Altered Susceptibility', icon: 'TestTube2' }
    ],
    metrics: [
      { id: 'm1', label: 'Antibiotic Survival Rate', earth: 15, micro: 55, highlight: true, evidence: 'simulated' },
      { id: 'm2', label: 'Biofilm Formation', earth: 40, micro: 90, evidence: 'simulated' }
    ],
    growthCurve: { earth: [10, 25, 30, 15, 5], micro: [10, 25, 40, 35, 30] },
    observations: [
      { id: '01', title: 'Biofilm Development', text: 'Robust biofilm architectures develop rapidly in low-fluid-shear environments, establishing a physical barrier.', evidence: 'simulated' },
      { id: '02', title: 'Antibiotic Response', text: 'S. aureus exhibits reduced susceptibility to methicillin and other antibiotics in modeled microgravity, heavily correlated with the increased biofilm production isolating cells from the drug.', evidence: 'simulated' }
    ]
  }
};

const getExperimentData = (b: Bacterium, a: Antibiotic): ExperimentData => {
  const key = `${b}-${a}`;
  return DATA_DB[key] || DATA_DB[`${b}-none`]; // fallback to none if somehow invalid
};

export default function MicrogravitySimulation() {
  const [bacterium, setBacterium] = useState<Bacterium>('salmonella');
  const [antibiotic, setAntibiotic] = useState<Antibiotic>('none');
  
  const [step, setStep] = useState<'setup' | 'simulating' | 'results'>('setup');
  const [simPhase, setSimPhase] = useState(0);

  // Enforce valid antibiotics for the chosen bacterium
  useEffect(() => {
    if (!ANTIBIOTICS[bacterium].includes(antibiotic)) {
      setAntibiotic(ANTIBIOTICS[bacterium][0]);
    }
  }, [bacterium, antibiotic]);

  const runSimulation = () => {
    setStep('simulating');
    setSimPhase(0);
    // Visual sequence timing
    setTimeout(() => setSimPhase(1), 1500); // 1xG Earth / Microgravity
    setTimeout(() => setSimPhase(2), 3000); // Cellular Response
    setTimeout(() => setSimPhase(3), 4500); // Regulatory Response
    setTimeout(() => setSimPhase(4), 6000); // Phenotypic Response
    setTimeout(() => setStep('results'), 7500); // Results
  };

  const currentData = getExperimentData(bacterium, antibiotic);

  return (
    <section id="simulation" className="px-4 md:px-6 py-16 md:py-24 max-w-4xl mx-auto w-full relative z-10 mt-8">
      {/* Simulation Header */}
      <div className="mb-10 md:mb-16">
        <span className="font-sans text-[10px] tracking-widest uppercase text-accent-blue block mb-2 font-bold border-b border-accent-blue/20 w-fit pb-1">Interactive Exhibition</span>
        <h2 className="text-[clamp(2rem,5vw,2.5rem)] font-serif leading-tight text-graphite mb-4">
          Microgravity Simulation
        </h2>
        <p className="font-serif text-charcoal/80 max-w-2xl leading-relaxed">
          Select an organism and observe its experimentally documented response to microgravity conditions.
        </p>
      </div>

      <AnimatePresence mode="wait">
        
        {/* 1. SETUP */}
        {step === 'setup' && (
          <motion.div 
            key="setup"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: smoothEase }}
            className="border-hand p-6 md:p-10 bg-paper/60 backdrop-blur-sm"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 mb-10">
              {/* Bacterium Select */}
              <div>
                <p className="font-sans text-[10px] tracking-widest uppercase text-muted-grey mb-4 font-bold border-b border-graphite/20 pb-2">1. Bacterium</p>
                <div className="flex flex-col gap-3">
                  {(Object.keys(BACTERIA) as Bacterium[]).map(b => (
                    <button 
                      key={b}
                      onClick={() => setBacterium(b)}
                      className={`text-left px-4 py-3 border-hand transition-all duration-300 ${bacterium === b ? 'bg-graphite text-paper shadow-md scale-[1.02]' : 'bg-transparent hover:bg-white/50 text-graphite'}`}
                    >
                      <span className="font-serif text-lg">{BACTERIA[b].name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Antibiotic Select */}
              <div>
                <p className="font-sans text-[10px] tracking-widest uppercase text-muted-grey mb-4 font-bold border-b border-graphite/20 pb-2">2. Antibiotic</p>
                <div className="flex flex-col gap-3">
                  {ANTIBIOTICS[bacterium].map(a => (
                    <button 
                      key={a}
                      onClick={() => setAntibiotic(a)}
                      className={`text-left px-4 py-3 border-hand transition-all duration-300 capitalize ${antibiotic === a ? 'bg-graphite text-paper shadow-md scale-[1.02]' : 'bg-transparent hover:bg-white/50 text-graphite'}`}
                    >
                      <span className="font-serif text-lg">{a === 'none' ? 'None (Baseline Growth)' : a}</span>
                    </button>
                  ))}
                </div>
                <p className="font-sans text-[9px] uppercase tracking-widest text-muted-grey mt-4">
                  * Showing only antibiotics for which relevant spaceflight or modelled-microgravity research exists.
                </p>
              </div>
            </div>

            <div className="flex justify-center mt-6">
              <button 
                onClick={runSimulation}
                className="group relative px-10 py-4 border-hand bg-graphite text-paper overflow-hidden transition-transform duration-300 hover:scale-[1.02] active:scale-95 flex items-center gap-3"
              >
                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <span className="font-sans text-xs tracking-widest uppercase font-bold relative z-10">Run Experiment</span>
                <ChevronRight className="relative z-10" size={16} />
              </button>
            </div>
          </motion.div>
        )}

        {/* 2. EXPERIMENT VISUALIZATION (ANIMATION) - DARK THEME RESTORED */}
        {step === 'simulating' && (
          <motion.div 
            key="simulating"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="border-hand p-10 md:p-20 bg-graphite text-paper flex flex-col items-center justify-center min-h-[350px] relative overflow-hidden"
          >
            {/* Very light animated particles */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
              className="absolute inset-0 pointer-events-none flex justify-center items-center opacity-10"
            >
              <div className="w-48 h-48 md:w-64 md:h-64 rounded-full border-[0.5px] border-paper border-dashed" />
              <div className="absolute w-72 h-72 md:w-96 md:h-96 rounded-full border-[0.5px] border-paper border-dotted" />
            </motion.div>

            <AnimatePresence mode="wait">
              {simPhase === 0 && (
                <motion.div key="v0" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.1 }} transition={{ duration: 0.5 }} className="flex flex-col items-center text-center relative z-10">
                  <FlaskConical size={32} strokeWidth={1} className="text-paper mb-4" />
                  <p className="font-sans text-[10px] tracking-widest uppercase text-paper/60 mb-2">Phase I</p>
                  <h3 className="text-xl font-serif text-paper tracking-wide">BACTERIA</h3>
                </motion.div>
              )}
              {simPhase === 1 && (
                <motion.div key="v1" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.1 }} transition={{ duration: 0.5 }} className="flex flex-col items-center text-center relative z-10">
                  <Globe2 size={32} strokeWidth={1} className="text-paper mb-4" />
                  <p className="font-sans text-[10px] tracking-widest uppercase text-paper/60 mb-2">Phase II</p>
                  <h3 className="text-xl font-serif text-paper tracking-wide">1×g EARTH / MICROGRAVITY</h3>
                </motion.div>
              )}
              {simPhase === 2 && (
                <motion.div key="v2" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.1 }} transition={{ duration: 0.5 }} className="flex flex-col items-center text-center relative z-10">
                  <Activity size={32} strokeWidth={1} className="text-paper mb-4" />
                  <p className="font-sans text-[10px] tracking-widest uppercase text-paper/60 mb-2">Phase III</p>
                  <h3 className="text-xl font-serif text-paper tracking-wide">CELLULAR RESPONSE</h3>
                </motion.div>
              )}
              {simPhase === 3 && (
                <motion.div key="v3" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.1 }} transition={{ duration: 0.5 }} className="flex flex-col items-center text-center relative z-10">
                  <Dna size={32} strokeWidth={1} className="text-paper mb-4" />
                  <p className="font-sans text-[10px] tracking-widest uppercase text-paper/60 mb-2">Phase IV</p>
                  <h3 className="text-xl font-serif text-paper tracking-wide">REGULATORY / GENE RESPONSE</h3>
                </motion.div>
              )}
              {simPhase === 4 && (
                <motion.div key="v4" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.1 }} transition={{ duration: 0.5 }} className="flex flex-col items-center text-center relative z-10">
                  <Beaker size={32} strokeWidth={1} className="text-paper mb-4" />
                  <p className="font-sans text-[10px] tracking-widest uppercase text-paper/60 mb-2">Phase V</p>
                  <h3 className="text-xl font-serif text-paper tracking-wide">PHENOTYPIC RESPONSE</h3>
                </motion.div>
              )}
            </AnimatePresence>
            
            <div className="absolute bottom-10 w-48 h-px bg-paper/10 overflow-hidden">
              <motion.div 
                className="h-full bg-paper/50"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 7.5, ease: "linear" }}
              />
            </div>
          </motion.div>
        )}

        {/* RESULTS PAGE */}
        {step === 'results' && (
          <motion.div 
            key="results"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-12"
          >
            {/* Top summary & Reset */}
            <div className="border-hand p-6 md:p-8 bg-paper/60 flex flex-col md:flex-row md:items-end justify-between gap-6 backdrop-blur-sm">
              <div>
                <p className="font-sans text-[10px] tracking-widest uppercase text-muted-grey mb-2 font-bold flex items-center gap-2">
                  <FlaskConical size={12} /> Simulation Complete
                </p>
                <h3 className="text-2xl font-serif leading-none text-graphite">{BACTERIA[bacterium].name}</h3>
                <p className="font-serif text-charcoal/70 mt-2 text-sm">
                  {antibiotic === 'none' ? 'Baseline Analysis' : `Exposed to ${capitalize(antibiotic)}`}
                </p>
              </div>
              <button 
                onClick={() => setStep('setup')}
                className="font-sans text-[10px] uppercase tracking-widest text-graphite hover:text-accent-blue transition-colors duration-300 w-fit shrink-0 border-b border-transparent hover:border-accent-blue pb-0.5"
              >
                Reset Setup
              </button>
            </div>

            {/* 3. MECHANISM */}
            <div>
              <p className="font-sans text-[10px] tracking-widest uppercase text-graphite font-bold mb-6 border-b border-graphite/20 pb-2">Mechanism</p>
              <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0 relative my-6">
                <div className="hidden md:block absolute top-1/2 left-4 right-4 h-px bg-graphite/20 -z-10" />
                {currentData.mechanism.map((step, idx) => {
                  const IconCmp = ICONS[step.icon] || Globe2;
                  return (
                    <div key={idx} className="flex flex-col items-center text-center bg-paper px-2 py-1 z-10 w-32">
                      <div className="w-10 h-10 rounded-full border border-graphite/20 flex items-center justify-center bg-white mb-3">
                        <IconCmp size={16} strokeWidth={1.5} className="text-graphite" />
                      </div>
                      <span className="font-sans text-[9px] uppercase tracking-widest text-charcoal/80 leading-relaxed">{step.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 4. OBSERVATIONAL METRICS */}
            <div>
              <p className="font-sans text-[10px] tracking-widest uppercase text-graphite font-bold mb-6 border-b border-graphite/20 pb-2">Observational Metrics (Earth vs Microgravity)</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
                
                {/* Metric Bars */}
                <div className="flex flex-col gap-6 justify-center">
                  {currentData.metrics.map(m => (
                    <MetricComparison key={m.id} title={m.label} earth={m.earth} micro={m.micro} highlight={m.highlight} evidence={m.evidence} />
                  ))}
                </div>

                {/* Growth Curve */}
                {currentData.growthCurve && (
                  <div className="border-hand p-6 bg-white/40">
                    <p className="font-sans text-[9px] tracking-widest uppercase text-muted-grey mb-4">Relative Growth Kinetics (Time →)</p>
                    <div className="relative h-40 w-full border-l border-b border-graphite/20">
                      <SimpleLineChart earthData={currentData.growthCurve.earth} microData={currentData.growthCurve.micro} />
                      
                      <div className="absolute top-2 left-4 flex flex-col gap-1.5">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-px bg-graphite/60" />
                          <span className="font-sans text-[9px] uppercase text-graphite/70 tracking-widest">1×g Earth</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-0.5 bg-graphite" />
                          <span className="font-sans text-[9px] uppercase text-graphite font-bold tracking-widest">Microgravity</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* 5. KEY OBSERVATIONS */}
            <div className="mt-4">
              <p className="font-sans text-[10px] tracking-widest uppercase text-graphite font-bold mb-6 border-b border-graphite/20 pb-2">Key Observations</p>
              <div className="flex flex-col gap-6">
                {currentData.observations.map((obs) => (
                  <div key={obs.id} className="flex flex-col md:flex-row gap-2 md:gap-6 items-start">
                    <div className="shrink-0 mt-1 flex flex-col gap-1">
                      <span className="font-sans text-[10px] font-bold tracking-widest uppercase text-graphite/50">{obs.id} — {obs.title}</span>
                      <EvidenceBadge type={obs.evidence} />
                    </div>
                    <p className="font-serif text-charcoal/90 text-[15px] leading-relaxed">{obs.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 6. DATA & SOURCES */}
            <div className="mt-8 pt-8 border-t border-graphite/10 text-center flex flex-col items-center">
              {currentData.link ? (
                <a href={currentData.link} target="_blank" rel="noopener noreferrer" className="font-sans text-[9px] uppercase tracking-widest text-muted-grey hover:text-graphite transition-colors">
                  Data & Experiment Source: {currentData.sourceTitle}
                </a>
              ) : (
                <span className="font-sans text-[9px] uppercase tracking-widest text-muted-grey opacity-60">
                  Data Source: {currentData.sourceTitle}
                </span>
              )}
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

// Minimal Subcomponents

function EvidenceBadge({ type }: { type: EvidenceType }) {
  const labels: Record<EvidenceType, string> = {
    spaceflight: 'SPACEFLIGHT DATA',
    simulated: 'SIMULATED MICROGRAVITY',
    ground: 'GROUND EXPERIMENT',
    literature: 'LITERATURE-DERIVED'
  };
  return (
    <span className="inline-block px-1.5 py-0.5 border border-graphite/20 text-[7px] tracking-widest uppercase text-graphite/60 rounded-sm w-fit">
      {labels[type]}
    </span>
  );
}

function MetricComparison({ title, earth, micro, highlight = false, evidence }: { title: string, earth: number, micro: number, highlight?: boolean, evidence: EvidenceType }) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <p className="font-serif text-[15px] text-graphite">{title}</p>
        <EvidenceBadge type={evidence} />
      </div>
      
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-3">
          <span className="font-sans text-[9px] uppercase tracking-widest text-graphite/50 w-10 shrink-0">1×g</span>
          <div className="flex-grow h-1.5 bg-graphite/5 relative overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${earth}%` }}
              transition={{ duration: 1, delay: 0.2, ease: smoothEase }}
              className="absolute top-0 left-0 h-full bg-graphite/30"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <span className="font-sans text-[9px] uppercase tracking-widest text-graphite w-10 shrink-0 font-bold">Micro</span>
          <div className="flex-grow h-1.5 bg-graphite/10 relative overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${micro}%` }}
              transition={{ duration: 1.2, delay: 0.4, ease: smoothEase }}
              className={`absolute top-0 left-0 h-full ${highlight ? 'bg-graphite' : 'bg-graphite/70'}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function SimpleLineChart({ earthData, microData }: { earthData: number[], microData: number[] }) {
  const max = Math.max(...earthData, ...microData, 100);
  
  const getPoints = (data: number[]) => {
    return data.map((val, i) => {
      const x = (i / (data.length - 1)) * 100;
      const y = 100 - ((val / max) * 100);
      return `${x},${y}`;
    }).join(' ');
  };

  const earthPoints = getPoints(earthData);
  const microPoints = getPoints(microData);

  return (
    <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100">
      <motion.polyline 
        points={earthPoints}
        fill="none"
        stroke="rgba(84, 91, 98, 0.4)"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, ease: smoothEase }}
      />
      <motion.polyline 
        points={microPoints}
        fill="none"
        stroke="#545b62" 
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.8, delay: 0.2, ease: smoothEase }}
      />
      
      {microData.map((val, i) => {
        const x = (i / (microData.length - 1)) * 100;
        const y = 100 - ((val / max) * 100);
        return (
          <motion.circle 
            key={i}
            cx={x} 
            cy={y} 
            r="1.5" 
            fill="#F4F1ED" 
            stroke="#545b62" 
            strokeWidth="1"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.8 + (i * 0.1) }}
          />
        );
      })}
    </svg>
  );
}

function capitalize(s: string) {
  if (!s) return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
}
