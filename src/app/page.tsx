"use client";

import { motion } from "framer-motion";
import { ArrowRight, ArrowDown, FlaskConical, Globe2, Rocket, Beaker, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const smoothEase = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 15 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.7, ease: smoothEase }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    }
  }
};

const drawLine = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: { 
    pathLength: 1, 
    opacity: 1,
    transition: { duration: 1.5, ease: "easeInOut" as const }
  }
};

export default function Home() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  return (
    <main className="min-h-screen pb-24 relative w-full overflow-hidden">
      
      {/* 1. HOME PAGE / HERO */}
      <section className="px-4 md:px-6 pt-16 pb-12 md:pt-32 md:pb-24 max-w-4xl mx-auto flex flex-col items-start relative w-full">
        <motion.div 
          initial={{ opacity: 0, rotate: 0 }}
          animate={{ opacity: 0.1, rotate: 12 }}
          transition={{ duration: 1.5, ease: smoothEase }}
          className="absolute top-10 right-[-40px] md:right-10 pointer-events-none"
        >
          <svg className="w-48 h-48 md:w-64 md:h-64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round">
            <motion.path 
              variants={drawLine} 
              initial="hidden" 
              animate="visible" 
              d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"
            />
          </svg>
        </motion.div>
        
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="w-full relative z-10"
        >
          <motion.span variants={fadeUp} className="font-hand text-lg md:text-xl text-accent-rust mb-4 block rotate-[-2deg] -ml-2">
            Research Archive // Entry 01
          </motion.span>
          <motion.h1 variants={fadeUp} className="text-[clamp(2.5rem,10vw,4.5rem)] font-serif font-medium leading-[1.1] mb-6 text-graphite break-words">
            Microbes<br />
            <span className="italic text-charcoal/90">Beyond Earth</span>
          </motion.h1>
          <motion.p variants={fadeUp} className="text-lg md:text-2xl font-serif text-charcoal/80 max-w-2xl leading-relaxed mb-10">
            Understanding how space changes the biology of life.
          </motion.p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8, ease: smoothEase }}
          className="w-full max-w-3xl mt-4 md:mt-8 border-hand p-5 md:p-10 bg-paper/80 md:bg-paper/50 backdrop-blur-sm relative z-10"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.3, scale: 1 }}
            transition={{ delay: 1, duration: 0.8, ease: smoothEase }}
            className="absolute -top-3 -right-3 text-accent-blue md:opacity-50"
          >
            <FlaskConical size={32} strokeWidth={1} />
          </motion.div>
          <p className="font-sans text-xs md:text-sm tracking-widest uppercase text-muted-grey mb-3 md:mb-4 font-bold">The Central Question</p>
          <p className="text-xl md:text-3xl font-serif leading-snug">
            What happens when a microorganism evolved for Earth is taken beyond Earth?
          </p>
          
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-10 md:mt-12 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4 font-hand text-xl md:text-2xl text-charcoal relative"
          >
            <motion.div variants={fadeUp} className="flex flex-col items-center relative group cursor-pointer" onMouseEnter={() => setHoveredNode('earth')} onMouseLeave={() => setHoveredNode(null)}>
              <span className="mb-2">Earth</span>
              <motion.div whileHover={{ rotate: 15 }} transition={{ duration: 0.4, ease: smoothEase }}>
                <Globe2 strokeWidth={1} size={40} className="text-graphite/40 w-8 h-8 md:w-10 md:h-10" />
              </motion.div>
              <motion.span 
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: hoveredNode === 'earth' ? 1 : 0, y: hoveredNode === 'earth' ? 0 : 5 }}
                className="absolute top-16 text-xs font-sans tracking-wide text-muted-grey w-32 text-center pointer-events-none"
              >
                Normal terrestrial environment
              </motion.span>
            </motion.div>
            
            <motion.div variants={fadeUp}><ArrowRight strokeWidth={1} className="hidden md:block text-muted-grey/40" /></motion.div>
            <motion.div variants={fadeUp}><ArrowDown strokeWidth={1} className="md:hidden text-muted-grey/40" /></motion.div>
            
            <motion.div variants={fadeUp} className="flex flex-col items-center relative group cursor-pointer" onMouseEnter={() => setHoveredNode('space')} onMouseLeave={() => setHoveredNode(null)}>
              <span className="mb-2">Space</span>
              <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.4, ease: smoothEase }}>
                <Rocket strokeWidth={1} size={40} className="text-graphite/40 w-8 h-8 md:w-10 md:h-10" />
              </motion.div>
              <motion.span 
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: hoveredNode === 'space' ? 1 : 0, y: hoveredNode === 'space' ? 0 : 5 }}
                className="absolute top-16 text-xs font-sans tracking-wide text-muted-grey w-40 text-center pointer-events-none z-20"
              >
                Microgravity & spaceflight stress
              </motion.span>
            </motion.div>

            <motion.div variants={fadeUp}><ArrowRight strokeWidth={1} className="hidden md:block text-muted-grey/40" /></motion.div>
            <motion.div variants={fadeUp}><ArrowDown strokeWidth={1} className="md:hidden text-muted-grey/40" /></motion.div>
            
            <motion.div variants={fadeUp} className="flex flex-col items-center">
              <span className="mb-2">Adaptation</span>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-graphite/40 w-8 h-8 md:w-10 md:h-10">
                <motion.path variants={drawLine} d="M12 2v20M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
              </svg>
            </motion.div>

            <motion.div variants={fadeUp}><ArrowRight strokeWidth={1} className="hidden md:block text-muted-grey/40" /></motion.div>
            <motion.div variants={fadeUp}><ArrowDown strokeWidth={1} className="md:hidden text-muted-grey/40" /></motion.div>
            
            <motion.div variants={fadeUp} className="flex flex-col items-center pb-8 md:pb-0 relative group">
              <span className="mb-2 text-accent-rust">"Superbug"</span>
              <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.3, ease: smoothEase }}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-accent-rust/40 w-8 h-8 md:w-10 md:h-10"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
              </motion.div>
              <span className="absolute bottom-0 md:-bottom-8 text-[10px] md:text-sm text-muted-grey whitespace-nowrap">*changes in virulence</span>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      <div className="w-full max-w-4xl mx-auto px-4 py-4 md:py-8">
        <motion.div 
          initial={{ scaleX: 0 }} 
          whileInView={{ scaleX: 1 }} 
          viewport={{ once: true }} 
          transition={{ duration: 1, ease: smoothEase }}
          className="divider-sketch w-full origin-left"
        />
      </div>

      {/* 2. EARTH VS SPACE & SALMONELLA */}
      <section id="earth-vs-space" className="px-4 md:px-6 py-12 md:py-16 max-w-4xl mx-auto w-full relative z-10">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeUp}
          className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-10 md:mb-12"
        >
          <h2 className="text-[clamp(1.75rem,6vw,2.25rem)] font-serif leading-tight">Earth vs Space</h2>
          <span className="font-hand text-lg md:text-xl text-accent-blue bg-accent-blue/5 px-3 py-1 rounded-sm border border-accent-blue/20 -rotate-2 inline-block w-fit">
            Fig. 1 Environmental Shift
          </span>
        </motion.div>

        <div className="flex flex-col md:grid md:grid-cols-2 gap-8 md:gap-16 relative">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp}
            className="border-hand p-6 md:p-8 relative hover:bg-white/40 transition-colors duration-500"
          >
            <h3 className="font-sans text-xs md:text-sm tracking-widest uppercase mb-5 md:mb-6 font-bold text-charcoal">Earth</h3>
            <ul className="space-y-3 md:space-y-4 font-serif text-base md:text-lg text-charcoal/90">
              <li className="flex gap-3 items-start"><span className="text-muted-grey mt-1 opacity-50">•</span> <span>Normal gravity (1g)</span></li>
              <li className="flex gap-3 items-start"><span className="text-muted-grey mt-1 opacity-50">•</span> <span>Natural atmospheric conditions</span></li>
              <li className="flex gap-3 items-start"><span className="text-muted-grey mt-1 opacity-50">•</span> <span>Earth-based nutrient environment</span></li>
              <li className="flex gap-3 items-start"><span className="text-muted-grey mt-1 opacity-50">•</span> <span>Normal biological stresses</span></li>
            </ul>
            <div className="absolute bottom-4 right-4 text-muted-grey/10 md:text-muted-grey/20 pointer-events-none">
              <Globe2 className="w-16 h-16 md:w-20 md:h-20" strokeWidth={0.5} />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }} 
            whileInView={{ opacity: 1, scale: 1 }} 
            viewport={{ once: true }} 
            transition={{ delay: 0.3, duration: 0.6, ease: smoothEase }}
            className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 bg-paper px-3 py-1 items-center justify-center font-hand text-accent-rust text-2xl rotate-[-10deg]"
          >
            VS
          </motion.div>
          
          <div className="md:hidden flex justify-center -my-2 relative z-10">
            <span className="bg-paper px-4 py-1 font-hand text-accent-rust text-xl rotate-[-5deg]">VS</span>
          </div>

          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp}
            className="border-hand p-6 md:p-8 relative bg-graphite/[0.02] border-graphite/30 hover:bg-graphite/[0.04] transition-colors duration-500"
          >
            <h3 className="font-sans text-xs md:text-sm tracking-widest uppercase mb-5 md:mb-6 font-bold text-charcoal">Space</h3>
            <ul className="space-y-3 md:space-y-4 font-serif text-base md:text-lg text-charcoal/90">
              <li className="flex gap-3 items-start"><span className="text-accent-rust mt-1 opacity-80">*</span> <span>Microgravity</span></li>
              <li className="flex gap-3 items-start"><span className="text-accent-rust mt-1 opacity-80">*</span> <span>Spaceflight-associated stresses</span></li>
              <li className="flex gap-3 items-start"><span className="text-accent-rust mt-1 opacity-80">*</span> <span>Radiation exposure</span></li>
              <li className="flex gap-3 items-start"><span className="text-accent-rust mt-1 opacity-80">*</span> <span>Altered cellular behavior</span></li>
              <li className="flex gap-3 items-start"><span className="text-accent-rust mt-1 opacity-80">*</span> <span>Different environmental conditions</span></li>
            </ul>
          </motion.div>
        </div>
      </section>

      <section id="salmonella" className="px-4 md:px-6 py-12 md:py-16 max-w-4xl mx-auto w-full relative z-10">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp}>
          <h2 className="text-[clamp(1.75rem,6vw,2.25rem)] font-serif mb-6 md:mb-8 leading-tight">Salmonella in Space</h2>
          <p className="text-lg md:text-xl font-serif leading-relaxed text-charcoal/90 mb-10 md:mb-12">
            Research has extensively investigated changes in Salmonella during spaceflight and simulated spaceflight conditions. Instead of dying in the harsh environment, observations suggest that it adapts, altering its gene expression and, in some cases, becoming more virulent—exhibiting <span className="font-hand text-xl md:text-2xl px-1 text-accent-rust whitespace-nowrap relative">
              "superbug"
              <motion.span 
                initial={{ width: 0 }} whileInView={{ width: "100%" }} viewport={{ once: true }} transition={{ delay: 0.5, duration: 0.6, ease: smoothEase }}
                className="absolute -bottom-1 left-0 h-[1px] bg-accent-rust/50 block" 
              />
            </span> characteristics.
          </p>
        </motion.div>

        <div className="relative border-l border-graphite/20 ml-2 md:ml-6 pl-6 py-2 space-y-8 md:space-y-12">
          {[
            { title: "EARTH", desc: "Baseline behavior and established virulence." },
            { title: "SPACEFLIGHT", desc: "Launch and exposure to orbital environment." },
            { title: "ENVIRONMENTAL STRESS", desc: "Microgravity, fluid shear changes, radiation." },
            { title: "CELLULAR RESPONSE", desc: "Stress response pathways activated." },
            { title: "CHANGES IN GENE EXPRESSION / BIOLOGY", desc: "Altered biofilm formation, reproduction rate, and resistance." },
            { title: "RESEARCH QUESTIONS", desc: "How can we mitigate these risks for astronauts?" }
          ].map((step, i) => (
            <motion.div 
              key={i} 
              initial="hidden" 
              whileInView="visible" 
              viewport={{ once: true, margin: "-50px" }} 
              variants={fadeUp}
              className="relative group cursor-default"
            >
              <div className="absolute -left-[33px] top-0 md:top-1 w-4 h-4 rounded-full border border-graphite/50 bg-paper flex items-center justify-center transition-colors group-hover:border-accent-blue duration-300">
                <div className="w-1.5 h-1.5 bg-graphite/50 rounded-full transition-colors group-hover:bg-accent-blue duration-300"></div>
              </div>
              <h3 className="font-sans font-bold text-xs md:text-sm tracking-widest mb-1.5 transition-colors group-hover:text-accent-blue duration-300">{step.title}</h3>
              <p className="font-serif text-base md:text-lg text-charcoal/90">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <div className="w-full max-w-4xl mx-auto px-4 py-4 md:py-8">
        <motion.div 
          initial={{ scaleX: 0 }} 
          whileInView={{ scaleX: 1 }} 
          viewport={{ once: true }} 
          transition={{ duration: 1, ease: smoothEase }}
          className="divider-sketch w-full origin-left"
        />
      </div>

      {/* 3. RESEARCH LIBRARY */}
      <section id="research-shelf" className="px-4 md:px-6 py-12 md:py-16 max-w-4xl mx-auto w-full relative z-10">
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp}
          className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-12 gap-4"
        >
          <div>
            <span className="font-hand text-lg md:text-xl text-muted-grey block mb-1 md:mb-2">The Research Shelf</span>
            <h2 className="text-[clamp(2rem,7vw,2.5rem)] font-serif leading-tight">Research Archive</h2>
          </div>
          <p className="font-sans text-[10px] md:text-xs uppercase tracking-widest text-muted-grey max-w-[200px] md:max-w-xs leading-relaxed">
            A collection of field notes and scientific observations.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:gap-8">
          <Link href="/article/1" className="block group w-full outline-none">
            <motion.div 
              whileHover={{ y: -4, scale: 1.005 }}
              whileTap={{ scale: 0.98, y: 0 }}
              transition={{ duration: 0.3, ease: smoothEase }}
              className="border-hand p-5 md:p-8 bg-paper/60 hover:bg-white/90 hover:border-graphite/40 transition-colors duration-300 relative overflow-hidden h-full flex flex-col min-h-[220px]"
            >
              <motion.div 
                className="absolute top-4 right-4 md:top-0 md:right-0 md:p-8 text-muted-grey/10 transition-colors duration-300 pointer-events-none"
                initial={{ rotate: 0 }}
                whileHover={{ rotate: 5, scale: 1.1, color: "rgba(109, 139, 166, 0.15)" }}
                transition={{ duration: 0.4, ease: smoothEase }}
              >
                <Beaker className="w-20 h-20 md:w-32 md:h-32" strokeWidth={0.5} />
              </motion.div>
              
              <div className="flex justify-between items-start mb-4 md:mb-6 relative z-10">
                <span className="font-sans text-[10px] md:text-xs font-bold tracking-widest border-b border-graphite/20 pb-1">FIELD NOTE 01</span>
                <span className="font-hand text-base md:text-lg text-muted-grey">1986 - Present</span>
              </div>
              
              <div className="relative z-10 flex flex-col flex-grow">
                <p className="font-sans text-[10px] md:text-xs tracking-widest uppercase text-accent-green mb-1 md:mb-2">Radiation Ecology</p>
                <h3 className="text-xl md:text-3xl font-serif mb-2 md:mb-4 group-hover:text-accent-blue transition-colors duration-300 pr-10 md:pr-0 leading-snug">
                  Radioactive Caesium from Chernobyl in Fungi
                </h3>
                <p className="font-sans text-xs md:text-sm text-charcoal mb-3 md:mb-4">Gerard T. Oolbekkink & Thomas W. Kuyper</p>
                <p className="font-serif text-sm md:text-base text-charcoal/80 mb-6 md:mb-8 line-clamp-3 md:line-clamp-2 leading-relaxed">
                  A study discussing the accumulation of radioactive caesium in fungi and ecosystems following radioactive fallout.
                </p>
                
                <div className="mt-auto inline-flex items-center gap-2 font-sans text-[10px] md:text-xs font-bold tracking-widest uppercase group-hover:text-accent-blue py-2 transition-colors duration-300 w-fit">
                  Read Article 
                  <motion.div
                    initial={{ x: 0 }}
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.3, ease: smoothEase }}
                  >
                    <ChevronRight size={14} className="md:w-4 md:h-4" />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </Link>
          
          {[
            {
              id: "02",
              url: "https://share.google/yEr1VaLxIg1k0OExN",
              date: "2024",
              category: "Mycology / Resource Extraction",
              title: "Mycomining: perspective on fungi as scavengers of scattered metal, mineral, and rare earth element resources",
              authors: "Mitchell P. Jones & Alexander Bismarck",
              summary: "A perspective on using fungi for the extraction and scavenging of scattered metals, minerals, and rare earth elements from various resources."
            },
            {
              id: "03",
              url: "https://share.google/jl6wQlRHHEDsKOcdF",
              date: "2025",
              category: "Space Microbiology",
              title: "Impacts of microgravity on the survival and growth kinetics of Salmonella on seeds and in plant nutrient solution",
              authors: "Zhen Jia, Emma G. Holliday, Yaguang Luo & Boce Zhang",
              summary: "Research on how microgravity conditions affect the survival, growth, and behavior of Salmonella when grown on seeds and in plant nutrient solutions."
            },
            {
              id: "04",
              url: "https://share.google/tkb5cIsPkUMhMULS3",
              date: "2026",
              category: "Oncology / Biohybrid Therapeutics",
              title: "Biohybrid Salmonella typhimurium for synergistic chemoimmunotherapy via localized chemotherapy and in situ PD-L1 blockade",
              authors: "Longxue Guan et al.",
              summary: "Exploring the use of biohybrid Salmonella typhimurium to deliver localized chemotherapy combined with PD-L1 blockade for cancer treatment."
            },
            {
              id: "05",
              url: "https://share.google/SwsIzhksUQAjPim0t",
              date: "2026",
              category: "Radiochemistry / PET Imaging",
              title: "Design semi-automated radio-synthesis strategy and synthesis of benzimidazole-based radiotracer 2-(4-(2-(fluoro-18F) ethyl) piperidin-1-yl) benzo imidazo[1,2-a] pyrimidine for Tau as a PET imaging agent",
              authors: "Akhilesh Kumar Singh et al.",
              summary: "A study detailing a semi-automated radio-synthesis strategy for a novel benzimidazole-based radiotracer targeting Tau for PET imaging applications."
            }
          ].map((item, idx) => (
            <Link key={idx} href={item.url} target="_blank" rel="noopener noreferrer" className="block group w-full outline-none">
              <motion.div 
                whileHover={{ y: -4, scale: 1.005 }}
                whileTap={{ scale: 0.98, y: 0 }}
                transition={{ duration: 0.3, ease: smoothEase }}
                className="border-hand p-5 md:p-8 bg-paper/60 hover:bg-white/90 hover:border-graphite/40 transition-colors duration-300 relative overflow-hidden h-full flex flex-col min-h-[220px]"
              >
                <motion.div 
                  className="absolute top-4 right-4 md:top-0 md:right-0 md:p-8 text-muted-grey/10 transition-colors duration-300 pointer-events-none"
                  initial={{ rotate: 0 }}
                  whileHover={{ rotate: 5, scale: 1.1, color: "rgba(109, 139, 166, 0.15)" }}
                  transition={{ duration: 0.4, ease: smoothEase }}
                >
                  <Globe2 className="w-20 h-20 md:w-32 md:h-32" strokeWidth={0.5} />
                </motion.div>
                
                <div className="flex justify-between items-start mb-4 md:mb-6 relative z-10">
                  <span className="font-sans text-[10px] md:text-xs font-bold tracking-widest border-b border-graphite/20 pb-1">FIELD NOTE {item.id}</span>
                  <span className="font-hand text-base md:text-lg text-muted-grey">{item.date}</span>
                </div>
                
                <div className="relative z-10 flex flex-col flex-grow">
                  <p className="font-sans text-[10px] md:text-xs tracking-widest uppercase text-accent-green mb-1 md:mb-2">{item.category}</p>
                  <h3 className="text-xl md:text-3xl font-serif mb-2 md:mb-4 group-hover:text-accent-blue transition-colors duration-300 pr-10 md:pr-0 leading-snug line-clamp-2 md:line-clamp-none">
                    {item.title}
                  </h3>
                  <p className="font-sans text-xs md:text-sm text-charcoal mb-3 md:mb-4">{item.authors}</p>
                  <p className="font-serif text-sm md:text-base text-charcoal/80 mb-6 md:mb-8 line-clamp-3 md:line-clamp-2 leading-relaxed">
                    {item.summary}
                  </p>
                  
                  <div className="mt-auto inline-flex items-center gap-2 font-sans text-[10px] md:text-xs font-bold tracking-widest uppercase group-hover:text-accent-blue py-2 transition-colors duration-300 w-fit">
                    External Link 
                    <motion.div
                      initial={{ x: 0 }}
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.3, ease: smoothEase }}
                    >
                      <Globe2 size={14} className="md:w-4 md:h-4" />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>

    </main>
  );
}
