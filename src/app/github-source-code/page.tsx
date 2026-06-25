'use client'

import Link from 'next/link'
import { Github, ExternalLink, Code2, UserRound, ArrowUpRight, Sparkles, GitBranch, Star, GitCommit, Zap } from 'lucide-react'
import { products } from '@/lib/products'
import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import { useEffect } from 'react'

const sourceProducts = products.filter((product) => product.sourceCodeUrl)
const developerName = 'Gulraiz Hamza'
const developerProfile = 'https://github.com/gulraiz12ab'
const fiverrProfile = 'https://www.fiverr.com/s/7Y2VPzE'

// ========== FIVERR LOGO COMPONENT ==========
function FiverrLogo({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 120 36">
      <path 
        className="fill-dark-900 dark:fill-white transition-colors" 
        d="M110.04 17.413h-4.247c-2.735 0-4.198 2.055-4.198 5.478v12.376h-8.056V17.413h-3.417c-2.734 0-4.198 2.055-4.198 5.478v12.376h-8.056V10.81h8.056v3.717c1.319-2.886 3.125-3.717 5.81-3.717h9.862v3.717c1.319-2.886 3.125-3.717 5.81-3.717h2.636v6.603zm-33.93 7.533H59.316c.44 2.74 2.147 4.304 5.028 4.304 2.147 0 3.66-.88 4.15-2.446l7.127 2.006c-1.757 4.255-6.102 6.848-11.277 6.848-8.739 0-12.743-6.8-12.743-12.62 0-5.722 3.515-12.57 12.254-12.57 9.276 0 12.352 6.945 12.352 12.081a25 25 0 0 1-.097 2.397M68.298 20.2c-.195-2.104-1.709-4.06-4.442-4.06-2.54 0-4.052 1.125-4.54 4.06zM37.542 35.267h7.079l8.837-24.456h-8.104l-4.296 14.233-4.395-14.234h-8.056zm-33.001 0h8.006V17.413h7.616v17.854h7.958V10.81H12.547V9.294c0-1.663 1.172-2.69 3.027-2.69h4.59V0h-5.908c-5.81 0-9.715 3.571-9.715 8.804v2.006H0v6.603h4.54z"
      />
      <path fill="#1DBF73" d="M115.02 36c2.75 0 4.98-2.234 4.98-4.99 0-2.755-2.23-4.99-4.98-4.99a4.984 4.984 0 0 0-4.98 4.99 4.984 4.984 0 0 0 4.98 4.99"/>
    </svg>
  )
}

// ========== OPTIMIZED COUNTER ==========
function AnimatedCounter({ end, suffix = '' }: { end: number; suffix?: string }) {
  const count = useMotionValue(0)
  const rounded = useTransform(count, (latest) => Math.round(latest) + suffix)

  useEffect(() => {
    const controls = animate(count, end, { duration: 2, ease: 'easeOut' })
    return controls.stop
  }, [count, end])

  return <motion.span>{rounded}</motion.span>
}

export default function GitHubSourceCodePage() {
  return (
    <>
      {/* ===== ULTRA-SMOOTH HERO ===== */}
      <section className="relative bg-white dark:bg-dark-950 py-32 md:py-48 overflow-hidden">
        
        {/* GPU-Accelerated Mesh Gradients */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none flex items-center justify-center">
          <div className="absolute top-[-20%] right-[-10%] w-[50rem] h-[50rem] bg-primary/20 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen animate-pulse duration-10000 will-change-transform" />
          <div className="absolute bottom-[-20%] left-[-10%] w-[40rem] h-[40rem] bg-cyan-400/15 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-screen animate-pulse duration-7000 delay-1000 will-change-transform" />
        </div>

        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.03] dark:opacity-[0.05]" />

        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
            
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-white/60 dark:bg-dark-900/60 backdrop-blur-md border border-dark-200/50 dark:border-dark-700/50 mb-10 shadow-sm"
            >
              <Sparkles className="w-4 h-4 text-primary animate-spin-slow" />
              <span className="text-sm font-bold bg-gradient-to-r from-primary to-cyan-500 bg-clip-text text-transparent tracking-widest uppercase">
                Open Source Hub
              </span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-black text-dark-900 dark:text-white tracking-tight mb-6 leading-tight">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="block"
              >
                Explore the
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative inline-block bg-gradient-to-r from-primary via-cyan-400 to-primary bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-x"
              >
                Code Universe
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-dark-600 dark:text-dark-400 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto font-medium mt-6 mb-12"
            >
              Step inside our architecture. Browse our public repositories, learn from the source code, and contribute to the modern stack.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-wrap gap-4 justify-center mb-12"
            >
              {[
                { val: sourceProducts.length || 12, label: 'Repos', icon: GitBranch },
                { val: 48, label: 'Commits', icon: GitCommit },
                { val: 99, label: 'Stars', icon: Star },
              ].map((stat, i) => (
                <div key={i} className="flex flex-col items-center gap-1 px-6 py-4 rounded-2xl bg-white/50 dark:bg-dark-900/50 backdrop-blur-sm border border-dark-200/50 dark:border-dark-700/50 shadow-sm hover:-translate-y-1 transition-transform duration-300">
                  <stat.icon className="w-4 h-4 text-primary mb-1" />
                  <span className="text-2xl font-black text-dark-900 dark:text-white">
                    <AnimatedCounter end={stat.val} suffix="+" />
                  </span>
                  <span className="text-xs font-bold text-dark-400 uppercase tracking-widest">{stat.label}</span>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap gap-3 justify-center"
            >
              {['TypeScript', 'React', 'Next.js', 'Tailwind', 'Framer Motion'].map((tech) => (
                <span key={tech} className="text-xs font-bold tracking-widest px-4 py-2 rounded-full bg-dark-50 dark:bg-dark-800/80 border border-dark-200/50 dark:border-dark-700/50 text-dark-700 dark:text-dark-300 hover:bg-primary/10 hover:text-primary transition-colors cursor-default">
                  {tech}
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== REPOSITORIES GRID ===== */}
      <section className="relative py-24 bg-dark-50/50 dark:bg-dark-950/50 border-t border-dark-100 dark:border-dark-900">
        <div className="container-custom">
          
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-xs font-bold text-primary uppercase tracking-widest">Public Repositories</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-dark-900 dark:text-white">
              Browse Our <span className="text-primary">Source Code</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:gap-10 gap-8">
            {sourceProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-[2.5rem] border border-dark-100 dark:border-dark-800/80 bg-white dark:bg-dark-900 p-8 flex flex-col h-full shadow-sm hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-500 ease-out will-change-transform"
              >
                {/* Numeric Watermark */}
                <div className="absolute right-8 bottom-24 text-7xl font-black text-dark-100/40 dark:text-dark-800/40 font-mono select-none pointer-events-none group-hover:text-primary/10 group-hover:scale-110 transition-all duration-500 ease-out">
                  {String(index + 1).padStart(2, '0')}
                </div>

                <div className="absolute top-0 left-[-100%] w-[200%] h-1 bg-gradient-to-r from-transparent via-primary to-transparent group-hover:translate-x-[50%] transition-transform duration-1000 ease-in-out" />

                <div className="flex items-center justify-between gap-4 mb-8 relative z-10">
                  <div className="flex items-center gap-3 text-primary">
                    <div className="p-3 rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                      <Code2 className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-extrabold uppercase tracking-widest text-dark-500 dark:text-dark-400">
                      Repository
                    </span>
                  </div>
                  <span className="text-[11px] font-bold px-4 py-2 rounded-full bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-700/30 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    PUBLIC
                  </span>
                </div>

                <h2 className="text-3xl font-bold text-dark-900 dark:text-white mb-4 relative z-10 group-hover:text-primary transition-colors duration-300">
                  {product.name}
                </h2>

                <p className="text-base text-dark-600 dark:text-dark-400 mb-10 leading-relaxed flex-grow relative z-10">
                  {product.description}
                </p>

                <div className="mt-auto flex flex-col gap-5 relative z-10">
                  
                  {/* DEVELOPER INFO & FIVERR BUTTON */}
                  <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-3xl bg-dark-50/70 dark:bg-dark-950/70 border border-dark-100/50 dark:border-dark-800/50">
                    <div className="flex items-center gap-3.5">
                      <div className="w-11 h-11 rounded-full bg-white dark:bg-dark-900 flex items-center justify-center text-dark-500 shadow-sm border border-dark-100 dark:border-dark-800">
                        <UserRound className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-dark-400 dark:text-dark-500 uppercase tracking-widest mb-0.5">Author</p>
                        <p className="text-sm font-bold text-dark-900 dark:text-white">{developerName}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {/* Fiverr Button */}
                      <a
                        href={fiverrProfile}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/fiverr flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl bg-white dark:bg-dark-900 border border-dark-100 dark:border-dark-800 hover:border-[#1DBF73]/40 hover:bg-[#1DBF73]/5 hover:shadow-[0_4px_12px_rgba(29,191,115,0.1)] transition-all duration-300"
                        title="Hire me on Fiverr"
                      >
                        <span className="text-[10px] font-extrabold uppercase tracking-widest text-dark-400 group-hover/fiverr:text-[#1DBF73] transition-colors hidden sm:block">
                          Hire on
                        </span>
                        <FiverrLogo className="h-3.5 w-auto" />
                      </a>

                      {/* GitHub Profile Button */}
                      <a
                        href={developerProfile}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center w-11 h-11 rounded-2xl bg-white dark:bg-dark-900 text-dark-400 hover:text-white hover:bg-primary shadow-sm border border-dark-100 dark:border-dark-800 hover:border-primary transition-all duration-300"
                        title="View GitHub Profile"
                      >
                        <ArrowUpRight className="w-4 h-4" />
                      </a>
                    </div>
                  </div>

                  {/* ACTION BUTTONS */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <a
                      href={product.sourceCodeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/btn flex-1 flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl bg-dark-900 dark:bg-white text-white dark:text-dark-900 font-bold hover:bg-dark-800 dark:hover:bg-dark-100 transition-colors active:scale-[0.98]"
                    >
                      <Github className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
                      <span className="tracking-wide">View on GitHub</span>
                    </a>
                    
                    <Link
                      href={`/products/${product.slug}`}
                      className="group/link flex-1 flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl bg-white dark:bg-dark-900 text-dark-900 dark:text-white font-bold border-2 border-dark-100 dark:border-dark-800 hover:border-dark-300 dark:hover:border-dark-600 hover:bg-dark-50 dark:hover:bg-dark-800 transition-colors active:scale-[0.98]"
                    >
                      <span className="tracking-wide">Product Details</span>
                      <ExternalLink className="w-5 h-5 text-dark-400 group-hover/link:text-dark-900 dark:group-hover/link:text-white transition-colors" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>
    </>
  )
}