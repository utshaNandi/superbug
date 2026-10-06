"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Rocket, FlaskConical, Beaker, Dna, Activity, ChevronRight, Info, AlertTriangle, ChevronDown, ArrowDown, Globe2 } from 'lucide-react';

const smoothEase = [0.22, 1, 0.36, 1] as const;

type Bacterium = 'ecoli' | 'salmonella' | 'saureus';
type Antibiotic = 'none' | 'gentamicin' | 'ciprofloxacin' | 'methicillin';
type Exposure = 'short' | 'long';

const BACTERIA = {
  ecoli: { name: 'E. coli', icon: '🦠' },
  salmonella: { name: 'S. typhimurium', icon: '🔬' },
  saureus: { name: 'S. aureus', icon: '🧫' }
};

const ANTIBIOTICS: Record<Bacterium, Antibiotic[]> = {
  ecoli: ['none', 'gentamicin', 'ciprofloxacin'],
  salmonella: ['none', 'ciprofloxacin'],
  saureus: ['none', 'methicillin']
};

const DATA_DB = {
  'salmonella-none': {
    sourceTitle: 'NASA MICROBE — STS-115',
    sourceDesc: 'Spaceflight investigation of microbial gene expression and virulence. Flown on Space Shuttle Atlantis (2006).',
    link: 'https://www.nasa.gov/ames/space-biosciences/microbe-sts-115/',
    hasData: true,
    earth: { growth: 70, biofilm: 30, stress: 40, survival: 100 },
    micro: { growth: 90, biofilm: 85, stress: 80, survival: 100 },
    findings: [
      '167 genes showed differential expression in flight samples.',
      'Increased virulence in murine models compared to ground controls.',
      'Global regulator Hfq identified as a key orchestrator of the spaceflight response.',
      'Increased extracellular matrix accumulation (biofilm-like behavior).'
    ],
    growthCurve: { earth: [10, 20, 45, 65, 70], micro: [10, 25, 55, 80, 90] }
  },
  'ecoli-gentamicin': {
    sourceTitle: 'NASA EcAMSat (OS-813)',
    sourceDesc: 'Spaceflight investigation of E. coli antibiotic resistance using the EcAMSat nanosatellite.',
    link: 'https://osdr.nasa.gov/bio/repo/data/experiments/OS-813',
    hasData: true,
    earth: { growth: 60, biofilm: 20, stress: 50, survival: 15 },
    micro: { growth: 60, biofilm: 30, stress: 85, survival: 65 },
    findings: [
      'E. coli exhibited significantly increased survival when exposed to gentamicin in spaceflight.',
      'Resistance mechanism was dependent on the σS (RpoS) general stress response pathway.',
      'Microgravity radically altered the stress-response baseline, pre-adapting cells to antibiotic assault.'
    ],
    growthCurve: { earth: [10, 30, 40, 20, 10], micro: [10, 30, 45, 50, 45] } 
  },
  'ecoli-ciprofloxacin': {
    sourceTitle: 'Simulated Microgravity Study (PMC9502502)',
    sourceDesc: 'Peer-reviewed laboratory study on E. coli growth and antibiotic sensitivity under simulated microgravity.',
    link: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC9502502/',
    hasData: true,
    earth: { growth: 80, biofilm: 40, stress: 30, survival: 20 },
    micro: { growth: 85, biofilm: 60, stress: 60, survival: 50 },
    findings: [
      'Experimentally measured Minimum Inhibitory Concentration (MIC) was altered under simulated microgravity.',
      'Bacteria showed enhanced growth rates in the exponential phase.',
      'Modifications in cell size and morphology were observed, potentially reducing drug permeability.'
    ],
    growthCurve: { earth: [5, 15, 35, 25, 15], micro: [5, 20, 50, 45, 35] }
  }
};

const getExperimentData = (b: Bacterium, a: Antibiotic) => {
  const key = `${b}-${a}`;
  if (key in DATA_DB) return (DATA_DB as any)[key];
  
  return {
    hasData: false,
    sourceTitle: 'No Direct Experimental Dataset',
    sourceDesc: `We lack peer-reviewed spaceflight or robust simulated microgravity data for ${BACTERIA[b].name} exposed to ${a}.`,
    link: null,
    earth: { growth: 50, biofilm: 50, stress: 50, survival: 50 },
    micro: { growth: 65, biofilm: 70, stress: 80, survival: 75 },
    findings: [
      'Insufficient direct experimental data for this combination.',
      'Research-based qualitative expectation: Microgravity generally induces a generalized stress response (e.g., via RpoS or Hfq).',
      'Expect altered membrane permeability, thickened biofilms, and generally reduced drug efficacy compared to 1×g controls.'
    ],
    growthCurve: { earth: [10, 20, 30, 40, 50], micro: [10, 25, 40, 55, 65] }
  };
};

export default function MicrogravitySimulation() {
  const [bacterium, setBacterium] = useState<Bacterium>('salmonella');
  const [antibiotic, setAntibiotic] = useState<Antibiotic>('none');
  const [exposure, setExposure] = useState<Exposure>('long');
  const [environment, setEnvironment] = useState<'microgravity' | '1g'>('microgravity');
  
  const [step, setStep] = useState<'setup' | 'simulating' | 'results'>('setup');
  const [simPhase, setSimPhase] = useState(0);
  const [showSource, setShowSource] = useState(false);

  useEffect(() => {
    if (!ANTIBIOTICS[bacterium].includes(antibiotic)) {
      setAntibiotic(ANTIBIOTICS[bacterium][0]);
    }
  }, [bacterium, antibiotic]);

  const runSimulation = () => {
    setStep('simulating');
    setSimPhase(0);
    setTimeout(() => setSimPhase(1), 2000);
    setTimeout(() => setSimPhase(2), 4500);
    setTimeout(() => setSimPhase(3), 7000);
    setTimeout(() => setStep('results'), 9500);
  };

  const currentData = getExperimentData(bacterium, antibiotic);

  return (
    <section className="px-4 md:px-6 py-16 md:py-24 max-w-5xl mx-auto w-full relative z-10 border-t border-graphite/10 mt-12">
      <div className="mb-10 md:mb-16">
        <span className="font-hand text-lg md:text-xl text-accent-blue block mb-2">Interactive Exhibit</span>
        <h2 className="text-[clamp(2rem,6vw,3rem)] font-serif leading-tight text-graphite mb-4">
          Microgravity Simulation
        </h2>
        <p className="font-serif text-lg md:text-xl text-charcoal/80 max-w-2xl leading-relaxed">
          Run a space-biology experiment. Observe how physical forces alter cellular sensing, regulatory networks, and phenotypic behavior.
        </p>
      </div>

      <AnimatePresence mode="wait">
        {step === 'setup' && (
          <motion.div 
            key="setup"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5, ease: smoothEase }}
            className="border-hand p-6 md:p-10 bg-paper/60 backdrop-blur-sm"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-10">
              
              <div>
                <p className="font-sans text-xs tracking-widest uppercase text-muted-grey mb-4 font-bold border-b border-graphite/20 pb-2">1. Bacterium</p>
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

              <div>
                <p className="font-sans text-xs tracking-widest uppercase text-muted-grey mb-4 font-bold border-b border-graphite/20 pb-2">2. Environment</p>
                <div className="flex flex-col gap-3 mb-6">
                  <button 
                    onClick={() => setEnvironment('1g')}
                    className={`text-left px-4 py-3 border-hand transition-all duration-300 ${environment === '1g' ? 'bg-accent-blue/10 text-accent-blue border-accent-blue/30 shadow-sm relative overflow-hidden scale-[1.02]' : 'bg-transparent hover:bg-white/50 text-graphite opacity-70'}`}
                  >
                    <span className="font-serif text-lg relative z-10">1×g Earth (Control)</span>
                  </button>
                  <button 
                    onClick={() => setEnvironment('microgravity')}
                    className={`text-left px-4 py-3 border-hand transition-all duration-300 ${environment === 'microgravity' ? 'bg-accent-blue/10 text-accent-blue border-accent-blue/30 shadow-sm relative overflow-hidden scale-[1.02]' : 'bg-transparent hover:bg-white/50 text-graphite'}`}
                  >
                    {environment === 'microgravity' && <div className="absolute top-0 right-0 p-2 opacity-20"><Rocket size={24} /></div>}
                    <span className="font-serif text-lg relative z-10">Microgravity (Test)</span>
                  </button>
                </div>
                
                <p className="font-sans text-xs tracking-widest uppercase text-muted-grey mb-4 font-bold border-b border-graphite/20 pb-2">3. Exposure</p>
                <div className="flex gap-3">
                  {(['short', 'long'] as Exposure[]).map(e => (
                    <button 
                      key={e}
                      onClick={() => setExposure(e)}
                      className={`flex-1 capitalize px-3 py-2 border-hand transition-all duration-300 ${exposure === e ? 'bg-graphite text-paper' : 'bg-transparent hover:bg-white/50 text-graphite'}`}
                    >
                      <span className="font-serif">{e}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="font-sans text-xs tracking-widest uppercase text-muted-grey mb-4 font-bold border-b border-graphite/20 pb-2">4. Antibiotic</p>
                <div className="flex flex-col gap-3">
                  {ANTIBIOTICS[bacterium].map(a => (
                    <button 
                      key={a}
                      onClick={() => setAntibiotic(a)}
                      className={`text-left px-4 py-3 border-hand transition-all duration-300 capitalize ${antibiotic === a ? 'bg-accent-rust text-paper shadow-md scale-[1.02]' : 'bg-transparent hover:bg-white/50 text-graphite'}`}
                    >
                      <span className="font-serif text-lg">{a}</span>
                    </button>
                  ))}
                </div>
              </div>

            </div>

            <div className="flex justify-center mt-8">
              <button 
                onClick={runSimulation}
                className="group relative px-8 py-4 border-hand bg-graphite text-paper overflow-hidden transition-transform duration-300 hover:scale-[1.02] active:scale-95 flex items-center gap-3"
              >
                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <Activity className="relative z-10 animate-pulse" size={20} />
                <span className="font-sans text-sm tracking-widest uppercase font-bold relative z-10">Run Simulation</span>
              </button>
            </div>
          </motion.div>
        )}

        {step === 'simulating' && (
          <motion.div 
            key="simulating"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="border-hand p-10 md:p-20 bg-graphite text-paper flex flex-col items-center justify-center min-h-[400px] relative overflow-hidden"
          >
            <motion.div 
              animate={{ y: [0, -20, 0], opacity: [0.2, 0.5, 0.2] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute inset-0 pointer-events-none flex justify-center items-center"
            >
              <div className="w-64 h-64 rounded-full border border-paper/10" />
              <div className="absolute w-96 h-96 rounded-full border border-paper/5" />
            </motion.div>

            <AnimatePresence mode="wait">
              {simPhase === 0 && (
                <motion.div key="p0" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="flex flex-col items-center text-center">
                  <FlaskConical size={48} className="text-accent-blue mb-6" strokeWidth={1} />
                  <p className="font-sans text-xs tracking-widest uppercase text-muted-grey mb-2">Phase 1</p>
                  <h3 className="text-2xl font-serif">Inoculating Experimental Hardware...</h3>
                  <p className="text-sm text-paper/60 mt-4 max-w-md">Preparing {BACTERIA[bacterium].name} payload for launch conditions.</p>
                </motion.div>
              )}
              {simPhase === 1 && (
                <motion.div key="p1" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="flex flex-col items-center text-center">
                  <motion.div animate={{ y: [-10, -30], opacity: [1, 0.5] }} transition={{ repeat: Infinity, duration: 1.5 }} className="mb-6">
                    <Rocket size={48} className="text-accent-rust" strokeWidth={1} />
                  </motion.div>
                  <p className="font-sans text-xs tracking-widest uppercase text-muted-grey mb-2">Phase 2</p>
                  <h3 className="text-2xl font-serif">Microgravity Exposure</h3>
                  <p className="text-sm text-paper/60 mt-4 max-w-md">Physical forces altered. Lack of convective mixing and sedimentations leads to a quiescent fluid environment.</p>
                </motion.div>
              )}
              {simPhase === 2 && (
                <motion.div key="p2" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="flex flex-col items-center text-center">
                  <Dna size={48} className="text-accent-green mb-6" strokeWidth={1} />
                  <p className="font-sans text-xs tracking-widest uppercase text-muted-grey mb-2">Phase 3</p>
                  <h3 className="text-2xl font-serif">Cellular Sensing & Regulation</h3>
                  <p className="text-sm text-paper/60 mt-4 max-w-md">Bacteria sense altered transport. Global regulators (e.g., Hfq, RpoS) reprogram gene expression across hundreds of loci.</p>
                </motion.div>
              )}
              {simPhase === 3 && (
                <motion.div key="p3" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="flex flex-col items-center text-center">
                  <Activity size={48} className="text-paper mb-6" strokeWidth={1} />
                  <p className="font-sans text-xs tracking-widest uppercase text-muted-grey mb-2">Phase 4</p>
                  <h3 className="text-2xl font-serif">Phenotypic Manifestation</h3>
                  <p className="text-sm text-paper/60 mt-4 max-w-md">Applying {antibiotic !== 'none' ? antibiotic : 'measurement assay'}... Recording changes in growth kinetics, stress response, and virulence potential.</p>
                </motion.div>
              )}
            </AnimatePresence>
            
            <div className="absolute bottom-10 w-64 h-1 bg-paper/10 overflow-hidden">
              <motion.div 
                className="h-full bg-accent-blue"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 9.5, ease: "linear" }}
              />
            </div>
          </motion.div>
        )}

        {step === 'results' && (
          <motion.div 
            key="results"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="border-hand bg-paper/80 backdrop-blur-md relative"
          >
            <div className="p-6 md:p-10 border-b border-graphite/20 flex flex-col md:flex-row md:items-end justify-between gap-6 bg-white/40">
              <div>
                <p className="font-sans text-xs tracking-widest uppercase text-accent-rust mb-2 font-bold flex items-center gap-2">
                  <FlaskConical size={14} /> Simulation Complete
                </p>
                <h3 className="text-[clamp(1.8rem,4vw,2.5rem)] font-serif leading-none">Bacterial Response</h3>
                <p className="font-serif text-charcoal/70 mt-3 text-lg">
                  {BACTERIA[bacterium].name} • {antibiotic === 'none' ? 'No Antibiotic' : capitalize(antibiotic)} • {capitalize(exposure)} Exposure
                </p>
              </div>
              
              <button 
                onClick={() => setStep('setup')}
                className="px-5 py-2 border-hand text-sm font-sans uppercase tracking-widest hover:bg-graphite hover:text-paper transition-colors duration-300 w-fit shrink-0"
              >
                Reset Setup
              </button>
            </div>

            <div className="p-6 md:p-10 flex flex-col lg:flex-row gap-10 md:gap-16">
              
              <div className="lg:w-1/3 flex flex-col gap-8">
                
                <div className="border border-accent-blue/30 bg-accent-blue/5 p-5 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-3 opacity-10"><Info size={40} /></div>
                  <div 
                    className="flex justify-between items-center cursor-pointer relative z-10"
                    onClick={() => setShowSource(!showSource)}
                  >
                    <p className="font-sans text-xs tracking-widest uppercase text-accent-blue font-bold flex items-center gap-2">
                      Data Provenance
                    </p>
                    <ChevronDown size={16} className={`text-accent-blue transition-transform duration-300 ${showSource ? 'rotate-180' : ''}`} />
                  </div>
                  
                  <AnimatePresence>
                    {showSource && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-4 mt-4 border-t border-accent-blue/20">
                          <h4 className="font-serif text-lg font-bold mb-1">{currentData.sourceTitle}</h4>
                          <p className="text-sm font-serif text-charcoal/80 mb-3">{currentData.sourceDesc}</p>
                          {!currentData.hasData && (
                            <div className="bg-accent-rust/10 text-accent-rust text-xs p-3 font-sans border-l-2 border-accent-rust mb-3">
                              <strong>Note:</strong> Displayed trends represent qualitative expectations based on known microbiological spaceflight phenomena, not direct measurements.
                            </div>
                          )}
                          {currentData.hasData && currentData.link && (
                            <a href={currentData.link} target="_blank" rel="noopener noreferrer" className="text-xs font-sans uppercase tracking-widest text-accent-blue hover:underline flex items-center gap-1">
                              View Source <ChevronRight size={12} />
                            </a>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="border-hand p-5 bg-white/50">
                  <p className="font-sans text-xs tracking-widest uppercase text-muted-grey font-bold mb-4 border-b border-graphite/10 pb-2">Mechanism</p>
                  <div className="flex flex-col gap-3 relative">
                    <div className="absolute left-[11px] top-4 bottom-4 w-px bg-graphite/20 z-0" />
                    
                    {[
                      { l: 'Microgravity', i: <Globe2 size={12}/> },
                      { l: 'Altered Fluid Dynamics', i: <ArrowDown size={12}/> },
                      { l: 'Reduced Nutrient Transport', i: <Beaker size={12}/> },
                      { l: 'Stress Response (RpoS / Hfq)', i: <Dna size={12}/> },
                      { l: 'Phenotypic Shift', i: <Activity size={12}/> }
                    ].map((st, i) => (
                      <div key={i} className="flex items-center gap-4 relative z-10">
                        <div className="w-6 h-6 rounded-full bg-paper border border-graphite/30 flex items-center justify-center text-graphite">
                          {st.i}
                        </div>
                        <span className="font-serif text-sm text-charcoal">{st.l}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="font-sans text-xs tracking-widest uppercase text-muted-grey font-bold mb-4">Key Observations</p>
                  <ul className="flex flex-col gap-3">
                    {currentData.findings.map((finding: string, i: number) => (
                      <li key={i} className="font-serif text-charcoal text-sm md:text-base pl-4 relative">
                        <span className="absolute left-0 top-2 w-1.5 h-1.5 bg-accent-rust rounded-full" />
                        {finding}
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

              <div className="lg:w-2/3 flex flex-col gap-8 md:gap-12">
                
                <div>
                  <p className="font-sans text-xs tracking-widest uppercase text-muted-grey font-bold mb-6 border-b border-graphite/20 pb-2">Quantitative Metrics</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <MetricComparison title="Final Growth Density" earth={currentData.earth.growth} micro={currentData.micro.growth} />
                    <MetricComparison title="Stress Response Indicators" earth={currentData.earth.stress} micro={currentData.micro.stress} />
                    <MetricComparison title="Biofilm / Matrix Formation" earth={currentData.earth.biofilm} micro={currentData.micro.biofilm} />
                    {antibiotic !== 'none' && (
                      <MetricComparison title="Antibiotic Survival Rate" earth={currentData.earth.survival} micro={currentData.micro.survival} highlight />
                    )}
                  </div>
                </div>

                <div className="border-hand p-6 bg-white/60">
                  <p className="font-sans text-[10px] tracking-widest uppercase text-muted-grey font-bold mb-6">Relative Growth Kinetics (Time →)</p>
                  <div className="relative h-48 w-full border-l border-b border-graphite/20">
                    <SimpleLineChart earthData={currentData.growthCurve.earth} microData={currentData.growthCurve.micro} />
                    
                    <div className="absolute top-2 left-4 flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-0.5 bg-graphite/50" />
                        <span className="font-sans text-[10px] uppercase text-graphite/60 tracking-wider">Earth 1×g</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-1 bg-accent-blue" />
                        <span className="font-sans text-[10px] uppercase text-accent-blue font-bold tracking-wider">Microgravity</span>
                      </div>
                    </div>
                  </div>
                </div>

                {!currentData.hasData && (
                  <div className="flex items-start gap-3 p-4 border border-accent-rust/30 bg-accent-rust/5 text-accent-rust">
                    <AlertTriangle size={20} className="shrink-0 mt-0.5" />
                    <div>
                      <p className="font-sans text-xs uppercase font-bold tracking-widest mb-1">Scientific Integrity Notice</p>
                      <p className="font-serif text-sm opacity-90">
                        Because no direct peer-reviewed spaceflight data exists for this specific bacterium-antibiotic combination, the simulation infers the response based on generic bacterial physiological adaptations to microgravity.
                      </p>
                    </div>
                  </div>
                )}

              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function MetricComparison({ title, earth, micro, highlight = false }: { title: string, earth: number, micro: number, highlight?: boolean }) {
  return (
    <div>
      <p className="font-serif text-sm mb-3 text-graphite font-medium">{title}</p>
      
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <span className="font-sans text-[10px] uppercase tracking-widest text-graphite/60 w-12 shrink-0">Earth</span>
          <div className="flex-grow h-4 bg-graphite/10 relative overflow-hidden border border-graphite/20">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${earth}%` }}
              transition={{ duration: 1, delay: 0.2, ease: smoothEase }}
              className="absolute top-0 left-0 h-full bg-graphite/40"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <span className="font-sans text-[10px] uppercase tracking-widest text-accent-blue w-12 shrink-0 font-bold">Micro</span>
          <div className="flex-grow h-4 bg-accent-blue/10 relative overflow-hidden border border-accent-blue/30 shadow-sm">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${micro}%` }}
              transition={{ duration: 1.2, delay: 0.4, ease: smoothEase }}
              className={`absolute top-0 left-0 h-full ${highlight ? 'bg-accent-rust' : 'bg-accent-blue'}`}
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
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, ease: smoothEase }}
      />
      <motion.polyline 
        points={microPoints}
        fill="none"
        stroke="#6D8BA6"
        strokeWidth="3"
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
            stroke="#6D8BA6" 
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
