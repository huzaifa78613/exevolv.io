import { Metadata } from 'next'
import Link from 'next/link'
import { Github, ExternalLink, Code2, UserRound, ArrowUpRight, Sparkles, GitBranch } from 'lucide-react'
import { products } from '@/lib/products'

// Framer Motion
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export const metadata: Metadata = {
  title: 'GitHub Source Code',
  description: 'Browse the GitHub source code repositories for our products.',
}

const sourceProducts = products.filter((product) => product.sourceCodeUrl)
const developerName = 'Gulraiz Hamza'
const developerProfile = 'https://github.com/gulraiz12ab'

// ========== ANIMATION VARIANTS ==========
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
    },
  },
}

const heroTextVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

const floatingIconVariant = {
  animate: {
    y: [0, -8, 0],
    rotate: [0, 5, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
}

// ========== MAIN COMPONENT ==========
export default function GitHubSourceCodePage() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.98])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.3])

  return (
    <>
      {/* ULTRA MODERN HERO SECTION */}
      <motion.section
        ref={heroRef}
        style={{ scale: heroScale, opacity: heroOpacity }}
        className="relative bg-white dark:bg-dark-950 py-28 md:py-40 overflow-hidden"
      >
        {/* Animated gradient mesh + floating orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Primary orb */}
          <motion.div
            animate={{
              x: ['-5%', '5%', '-5%'],
              y: ['-10%', '10%', '-10%'],
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
            className="absolute top-[-10%] right-[-5%] w-[50rem] h-[50rem] bg-gradient-to-br from-primary/20 via-primary/5 to-transparent rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen"
          />
          {/* Secondary orb */}
          <motion.div
            animate={{
              x: ['5%', '-5%', '5%'],
              y: ['10%', '-10%', '10%'],
              scale: [1, 0.9, 1],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
            className="absolute bottom-[-15%] left-[-5%] w-[40rem] h-[40rem] bg-gradient-to-tr from-cyan-400/10 via-fuchsia-400/5 to-transparent rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-screen"
          />
          {/* Floating subtle grid pattern */}
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.03] dark:opacity-[0.05]" />
        </div>

        {/* Content */}
        <motion.div
          initial="hidden"
          animate="visible"
          className="container-custom relative z-10"
        >
          <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
            {/* Animated badge */}
            <motion.div
              variants={floatingIconVariant}
              animate="animate"
              className="group inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-white/60 dark:bg-dark-900/60 backdrop-blur-xl border border-dark-200/50 dark:border-dark-700/50 mb-10 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(var(--primary),0.15)] transition-all duration-500 cursor-default"
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-bold bg-gradient-to-r from-dark-800 to-dark-500 dark:from-white dark:to-dark-300 bg-clip-text text-transparent tracking-widest uppercase">
                Open Source Ecosystem
              </span>
            </motion.div>

            {/* Headline with staggered text animation */}
            <motion.h1
              variants={heroTextVariant}
              className="text-5xl md:text-8xl font-black text-dark-900 dark:text-white tracking-tight mb-8 leading-[0.95]"
            >
              Explore the{' '}
              <span className="relative inline-block text-primary">
                Code Universe
                <motion.svg
                  viewBox="0 0 200 20"
                  className="absolute -bottom-4 left-0 w-full h-4 text-primary/40"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, delay: 0.5 }}
                >
                  <path
                    d="M0 15 Q50 0, 100 15 T200 15"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </motion.svg>
              </span>
            </motion.h1>

            <motion.p
              variants={heroTextVariant}
              className="text-dark-600 dark:text-dark-400 text-lg md:text-2xl leading-relaxed max-w-2xl mx-auto font-medium"
            >
              Step inside our architecture. Browse public repositories, learn from the code behind our products, and contribute to the modern stack.
            </motion.p>

            {/* Floating code icons to emphasize modern dev feel */}
            <motion.div
              variants={heroTextVariant}
              className="flex gap-8 mt-12 opacity-30"
            >
              {['TypeScript', 'React', 'Next.js', 'Tailwind', 'Prisma'].map((tech) => (
                <motion.span
                  key={tech}
                  whileHover={{ y: -5, opacity: 0.8 }}
                  className="text-sm font-mono font-bold tracking-widest text-dark-900 dark:text-white"
                >
                  {tech}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Animated bottom wave separator */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none rotate-180">
          <svg
            className="relative block w-full h-16 md:h-24 text-white dark:text-dark-950"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <motion.path
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
              fill="currentColor"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
            />
          </svg>
        </div>
      </motion.section>

      {/* REPOSITORIES GRID WITH SCROLL ANIMATIONS */}
      <section className="relative py-24 bg-dark-50/30 dark:bg-dark-950/30 border-t border-dark-100/50 dark:border-dark-800/50">
        <div className="container-custom">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="grid md:grid-cols-2 lg:gap-10 gap-8"
          >
            {sourceProducts.map((product) => (
              <motion.div
                key={product.id}
                variants={cardVariants}
                className="group relative overflow-hidden rounded-[2.5rem] border border-dark-100/80 dark:border-dark-800/80 bg-white dark:bg-dark-900 p-8 flex flex-col h-full shadow-lg hover:shadow-2xl transition-shadow duration-500"
                whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.3 } }}
                style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
              >
                {/* Top shimmer line */}
                <motion.div
                  className="absolute top-0 left-[-100%] w-[200%] h-1.5 bg-gradient-to-r from-transparent via-primary/80 to-transparent"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%', transition: { duration: 0.8, ease: 'easeInOut' } }}
                />

                {/* Glowing corner hover effect */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                <div className="flex items-center justify-between gap-4 mb-8">
                  <div className="flex items-center gap-3 text-primary">
                    <motion.div
                      className="p-2.5 rounded-2xl bg-primary/10 group-hover:bg-primary group-hover:text-white transition-all duration-500"
                      whileHover={{ rotate: 15, scale: 1.1 }}
                    >
                      <Code2 className="w-5 h-5" />
                    </motion.div>
                    <span className="text-xs font-extrabold uppercase tracking-widest text-dark-800 dark:text-dark-200 group-hover:text-primary transition-colors">
                      Repository
                    </span>
                  </div>
                  <span className="text-[11px] font-bold px-4 py-2 rounded-full bg-dark-50 dark:bg-dark-800 text-dark-500 dark:text-dark-400 border border-dark-200/50 dark:border-dark-700/50 group-hover:border-primary/30 group-hover:text-primary transition-all duration-500">
                    PUBLIC
                  </span>
                </div>

                <motion.h2
                  className="text-3xl font-bold text-dark-900 dark:text-white mb-4 group-hover:text-primary transition-colors duration-300"
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                >
                  {product.name}
                </motion.h2>

                <p className="text-base text-dark-600 dark:text-dark-400 mb-10 leading-relaxed flex-grow">
                  {product.description}
                </p>

                <div className="mt-auto flex flex-col gap-5">
                  {/* Developer info card with hover tilt */}
                  <motion.div
                    className="flex items-center justify-between p-4 rounded-3xl bg-dark-50/50 dark:bg-dark-950/50 border border-dark-100/50 dark:border-dark-800/50 group-hover:bg-primary/5 transition-colors duration-500"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-white dark:bg-dark-900 flex items-center justify-center text-dark-500 shadow-sm border border-dark-100 dark:border-dark-800 group-hover:text-primary">
                        <UserRound className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-[11px] font-bold text-dark-400 dark:text-dark-500 uppercase tracking-widest mb-0.5">Author</p>
                        <p className="text-sm font-bold text-dark-900 dark:text-white">{developerName}</p>
                      </div>
                    </div>
                    <a
                      href={developerProfile}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/link flex items-center justify-center w-12 h-12 rounded-2xl bg-white dark:bg-dark-900 text-dark-400 hover:text-white hover:bg-primary shadow-sm border border-dark-100 dark:border-dark-800 hover:border-primary transition-all duration-300 active:scale-90"
                      title="View Developer Profile"
                    >
                      <motion.span
                        whileHover={{ rotate: 45 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ArrowUpRight className="w-5 h-5" />
                      </motion.span>
                    </a>
                  </motion.div>

                  {/* Action buttons with modern micro-interactions */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <motion.a
                      href={product.sourceCodeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative overflow-hidden group/btn flex-1 flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl bg-dark-900 dark:bg-white text-white dark:text-dark-900 font-bold transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-dark-900/20 dark:hover:shadow-white/10"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary/20 to-transparent scale-x-0 group-hover/btn:scale-x-100 origin-left transition-transform duration-500" />
                      <Github className="w-5 h-5 relative z-10 group-hover/btn:scale-110 transition-transform duration-300" />
                      <span className="relative z-10 tracking-wide">View on GitHub</span>
                    </motion.a>

                    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                      <Link
                        href={`/products/${product.slug}`}
                        className="group/link flex-1 flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl bg-white dark:bg-dark-900 text-dark-900 dark:text-white font-bold border-2 border-dark-100 dark:border-dark-800 hover:border-dark-300 dark:hover:border-dark-600 hover:bg-dark-50 dark:hover:bg-dark-800 transition-all duration-300 shadow-lg hover:shadow-xl"
                      >
                        <span className="tracking-wide">Product Details</span>
                        <ExternalLink className="w-5 h-5 text-dark-400 group-hover/link:text-dark-900 dark:group-hover/link:text-white transition-colors duration-300" />
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Empty State - More Animated */}
          {sourceProducts.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="text-center py-32 px-4 bg-gradient-to-b from-white/50 to-transparent dark:from-dark-900/30 dark:to-transparent backdrop-blur-xl rounded-[3rem] border border-dark-100 dark:border-dark-800/50 mt-12"
            >
              <motion.div
                animate={{
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{ duration: 4, repeat: Infinity }}
                className="w-28 h-28 bg-dark-50 dark:bg-dark-800/50 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner relative"
              >
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 rounded-full border-2 border-primary/30"
                />
                <GitBranch className="w-12 h-12 text-primary" />
              </motion.div>
              <h3 className="text-3xl font-extrabold text-dark-900 dark:text-white mb-4 tracking-tight">
                Fresh Commits Coming Soon
              </h3>
              <p className="text-dark-500 dark:text-dark-400 max-w-md mx-auto text-lg font-medium">
                Our codebase is brewing. Stay tuned as we open‑source new repositories in the coming days.
              </p>
            </motion.div>
          )}
        </div>
      </section>
    </>
  )
}