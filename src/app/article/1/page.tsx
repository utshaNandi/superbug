"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { motion, useScroll, useSpring } from "framer-motion";
import { useState } from "react";

const smoothEase = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 15 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: smoothEase }
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

export default function ArticlePage() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  
  const [isAnnotationVisible, setAnnotationVisible] = useState(false);

  return (
    <main className="min-h-screen pb-24 md:pb-32 relative bg-paper w-full overflow-x-hidden">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-accent-blue/30 origin-left z-50"
        style={{ scaleX }}
      />
      
      <div className="max-w-3xl mx-auto px-4 md:px-6 pt-8 md:pt-16">
        <Link href="/" className="inline-flex items-center gap-2 text-[10px] md:text-xs font-sans tracking-widest uppercase text-muted-grey hover:text-graphite transition-colors mb-8 md:mb-12 py-3 min-h-[44px] group outline-none">
          <motion.div whileTap={{ scale: 0.9 }}>
            <motion.div 
              initial={{ x: 0 }}
              whileHover={{ x: -4 }}
              transition={{ duration: 0.3, ease: smoothEase }}
            >
              <ArrowLeft size={16} />
            </motion.div>
          </motion.div>
          <span className="link-underline">Back to Archive</span>
        </Link>

        <header className="mb-10 md:mb-16 relative">
          <motion.div 
            initial={{ opacity: 0, rotate: 0 }}
            animate={{ opacity: 0.7, rotate: [-2, -5] }}
            transition={{ delay: 0.4, duration: 0.8, ease: smoothEase }}
            className="md:absolute -top-4 md:-top-6 -left-2 md:-left-6 font-hand text-lg md:text-xl text-accent-blue rotate-[-5deg] mb-4 md:mb-0"
          >
            Archived scan - excerpt
          </motion.div>
          
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="font-sans text-[10px] md:text-xs font-bold tracking-widest border-b border-graphite/20 pb-1 mb-4 md:mb-6 inline-block"
          >
            FIELD NOTE 01
          </motion.span>
          
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7, ease: smoothEase }}
            className="text-[clamp(2rem,7vw,3rem)] font-serif font-medium leading-[1.15] mb-6 md:mb-8 text-graphite break-words"
          >
            Radioactive Caesium from Chernobyl in Fungi
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.7, ease: smoothEase }}
            className="border-l-2 border-graphite/10 pl-4 md:pl-6 py-2"
          >
            <h2 className="font-sans text-[10px] md:text-xs tracking-widest uppercase mb-3 md:mb-4 text-charcoal font-bold">Authors</h2>
            <div className="space-y-4 font-serif text-sm md:text-base text-charcoal/90">
              <div className="break-words">
                <p className="font-bold text-graphite">Gerard T. Oolbekkink</p>
                <p className="text-charcoal/70">10 Helmenstraat 2301, 1054 EP Amsterdam, The Netherlands</p>
              </div>
              <div className="break-words">
                <p className="font-bold text-graphite">Thomas W. Kuyper</p>
                <p className="text-charcoal/70">Biological Station, Kampweg 27, 9418 PD Wijster, The Netherlands</p>
              </div>
            </div>
          </motion.div>
        </header>

        <article className="space-y-5 md:space-y-6 text-[17px] md:text-lg font-serif leading-[1.7] md:leading-relaxed text-charcoal max-w-none relative">
          
          <motion.p initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp}>
            The accident at the Chernobyl reactor on 26 April 1986 led to considerable amounts of radioactive material being distributed over a large area of Europe. Small amounts of radioactive material have even been detected as far as Svalbard and Greenland (Pourchet et al, 1986), USA (Bondietti & Brantley, 1986) and Japan (Aoyama et al, 1986).
          </motion.p>

          <motion.p initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp}>
            In the first weeks after the accident most attention was directed to the shortliving isotopes, such as iodine-131, iodine-132 and tellurium-132, owing to their direct danger to public health. Nothing of these radioactive nuclides remains to date, due to their short half-lives.
          </motion.p>

          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp}
            className="relative flex flex-col lg:block"
            onViewportEnter={() => setAnnotationVisible(true)}
          >
            <p className="mb-4 lg:mb-0">
              At present the longer living isotopes caesium-134 and caesium-137 (physical half-life of <span className="bg-accent-rust/10 px-1 rounded transition-colors duration-500 hover:bg-accent-rust/20">2.1</span> and <span className="bg-accent-rust/10 px-1 rounded transition-colors duration-500 hover:bg-accent-rust/20">30.2</span> years respectively) are given most attention. After the accident publications appeared in which large amounts of radioactive caesium in mushrooms were reported. These publications suggested that the consumption of wild growing mushrooms had to be regarded as a risky activity. It is therefore not surprising that a slight panic was noted among mycophagists.
            </p>
            {/* Scientific annotation */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isAnnotationVisible ? { opacity: 0.8, scale: 1 } : { opacity: 0, scale: 0.95 }}
              whileHover={{ opacity: 1, scale: 1.05 }}
              transition={{ duration: 0.5, ease: smoothEase }}
              className="flex lg:absolute lg:-right-32 lg:top-0 flex-col items-center bg-paper/50 lg:bg-transparent p-4 lg:p-0 border border-graphite/10 lg:border-none border-hand lg:rounded-none mx-auto w-fit mb-6 lg:mb-0 cursor-default"
            >
               <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-accent-rust mb-1 md:w-10 md:h-10">
                 <motion.path variants={drawLine} initial="hidden" animate={isAnnotationVisible ? "visible" : "hidden"} d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                 <circle cx="12" cy="11" r="3"/><path d="M12 14v2"/><path d="M9.88 9.88l-1.42-1.42"/><path d="M14.12 9.88l1.42-1.42"/>
               </svg>
               <span className="font-hand text-accent-rust text-base md:text-lg rotate-3">Cs-137</span>
               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="mt-1 md:mt-2 text-graphite md:w-6 md:h-6">
                 <motion.path variants={drawLine} initial="hidden" animate={isAnnotationVisible ? "visible" : "hidden"} d="M20 12c-1.2-1.2-3-3-8-3s-6.8 1.8-8 3c0 2.8 1.4 5.5 4 6.7V22h8v-3.3c2.6-1.2 4-3.9 4-6.7z"/>
                 <path d="M12 9v5"/><path d="M9 14h6"/>
               </svg>
               <span className="font-hand text-xs md:text-sm mt-1 text-graphite -rotate-2">Accumulation</span>
            </motion.div>
          </motion.div>

          <motion.p initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp}>
            As the amount of radioactive Cs in fungi will remain rather high for some years, we should not be surprised if alarm on the hazards of eating wild mushrooms will rise again. It seems therefore useful to provide some general information on the accumulation of radioactive Cs in ecosystems, with the focus of attention on fungi.
          </motion.p>

          <motion.p initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp}>
            Interest in the accumulation of radioactive Cs was first aroused much earlier than the Chernobyl disaster. Caesium-137 (and probably Caesium-134) was released after the disaster at the graphite reactor at Windscale (now Sellafield) in 1957 and research was done on the presence of this radionuclide in food products (Booker, 1959; Liden & Andersson, 1962).
          </motion.p>

          <motion.p initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp}>
            During the 1960's and 1970's extensive research was done on the uptake and accumulation of Cs-137 (Cs-134 was hardly present) that was present in the worldwide fallout from the above ground tests with nuclear weapons.
          </motion.p>

          <motion.p initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp}>
            The accumulation of radioactive Cs was first found in lichens and mosses in 1961 (Licon & Gustafsson, 1967; Mattson & Liden, 1975) and later (in 1963) in fungal fruitbodies (Grueter, 1971).
          </motion.p>

          <motion.p 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp}
            className="border-l-2 border-accent-blue/30 pl-4 md:pl-6 py-1 italic font-medium hover:border-accent-blue/60 transition-colors duration-500"
          >
            The difference is that lichens and mosses are accumulators of aerial fallout, but that fungi take up the Cs from the substrate on which they grow.
          </motion.p>

          <motion.p initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp}>
            The time period during which 80% of radionuclide is lost or removed from an ecosystem, a vegetation or a particular plant species by both physical and biological mechanisms, is known as 'effective half-life' (Teff). This depends on factors such as physical half-life, biotic and abiotic removal processes, growth rate of the vegetation and latitude (climate).
          </motion.p>

          <motion.p initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp}>
            It can be different for various vegetation types. The Teff for Cs-137 in the whole plant community in the Canadian Arctic is about eight years but for the lichen component alone it is 10-12 years (Taylor et al, 1985). The effective half-life in temperate forest ecosystems is shorter than the one in cold regions.
          </motion.p>

          <motion.p initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp}>
            After the Chernobyl accident many data have been published on the amount of radioactivity deposited on the ground, which is expressed in Becquerels per square metre (Bq/m²).
          </motion.p>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp} className="relative pb-8 md:pb-12">
            <p>
              The deposition of fallout from Chernobyl showed extreme geographical variability over short distances, depending on rainfall patterns prevailing when the radioactive cloud...
            </p>
            <motion.span 
              initial={{ opacity: 0, rotate: 0 }}
              whileInView={{ opacity: 1, rotate: -2 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.8, ease: smoothEase }}
              className="absolute bottom-0 right-0 md:-bottom-4 font-hand text-base md:text-xl text-muted-grey bg-paper px-2 z-10"
            >
              (scan excerpt ends here)
            </motion.span>
          </motion.div>

          <div className="py-6 md:py-8">
            <motion.div 
              initial={{ scaleX: 0 }} 
              whileInView={{ scaleX: 1 }} 
              viewport={{ once: true }} 
              transition={{ duration: 1, ease: smoothEase }}
              className="divider-sketch w-full origin-left"
            />
          </div>

          <motion.footer 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp}
            className="text-xs md:text-sm font-sans tracking-wide text-muted-grey flex items-start gap-3 md:gap-4"
          >
            <span className="font-serif italic text-lg md:text-xl text-graphite/40 leading-none">"</span>
            <p className="leading-relaxed">Translated and updated from Biological Station, Wijster, Comm. 353.</p>
          </motion.footer>
        </article>
      </div>
    </main>
  );
}
