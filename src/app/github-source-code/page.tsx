import { Metadata } from 'next'
import Link from 'next/link'
import { Github, ExternalLink, Code2, UserRound, ArrowUpRight, Sparkles } from 'lucide-react'
import { products } from '@/lib/products'

export const metadata: Metadata = {
  title: 'GitHub Source Code',
  description: 'Browse the GitHub source code repositories for our products.',
}

const sourceProducts = products.filter((product) => product.sourceCodeUrl)
const developerName = 'Gulraiz Hamza'
const developerProfile = 'https://github.com/gulraiz12ab'

export default function GitHubSourceCodePage() {
  return (
    <>
      {/* PREMIUM HERO SECTION */}
      <section className="relative bg-white dark:bg-dark-950 py-20 md:py-32 overflow-hidden border-b border-dark-100 dark:border-dark-900">
        {/* Cinematic Ambient Glows */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-[30rem] h-[30rem] bg-primary/10 rounded-full blur-[120px] opacity-70" />
          <div className="absolute bottom-0 left-10 w-[25rem] h-[25rem] bg-primary/5 rounded-full blur-[100px] opacity-60" />
        </div>

        <div className="container-custom relative z-10">
          <div className="max-w-3xl">
            {/* Glassmorphic Badge */}
            <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/60 dark:bg-dark-900/40 backdrop-blur-md border border-dark-200/50 dark:border-dark-700/50 mb-10 shadow-[0_8px_16px_-6px_rgba(0,0,0,0.05)]">
              <Sparkles className="w-4 h-4 text-primary animate-pulse" />
              <span className="text-sm font-semibold text-dark-700 dark:text-dark-300 tracking-wide">
                Premium Source Code Hub
              </span>
            </div>

            <div className="flex items-center gap-5 mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-50 to-white dark:from-primary-900/20 dark:to-dark-900 rounded-2xl flex items-center justify-center border border-primary/10 shadow-inner">
                <Github className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h1 className="text-4xl md:text-6xl font-extrabold text-dark-900 dark:text-white tracking-tight">
                  Source Code
                </h1>
              </div>
            </div>

            <p className="text-dark-600 dark:text-dark-400 text-lg md:text-xl leading-relaxed max-w-2xl font-medium">
              Explore the core architecture. Browse our public repositories, discover the code powering our products, and contribute to the ecosystem.
            </p>
          </div>
        </div>
      </section>

      {/* REPOSITORIES GRID SECTION */}
      <section className="relative py-20 bg-dark-50/50 dark:bg-dark-950/50">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
            {sourceProducts.map((product) => (
              <div
                key={product.id}
                className="group relative overflow-hidden rounded-[2rem] border border-dark-100/80 dark:border-dark-800/80 bg-white/80 dark:bg-dark-900/80 backdrop-blur-xl p-8 shadow-lg shadow-dark-900/5 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1.5 transition-all duration-500 ease-out flex flex-col h-full"
              >
                {/* Premium Gradient Top Line */}
                <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-transparent via-primary to-transparent opacity-40 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="flex items-center justify-between gap-4 mb-8">
                  <div className="flex items-center gap-2.5 text-primary">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Code2 className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-widest">Repository</span>
                  </div>
                  <span className="text-[11px] font-bold px-4 py-1.5 rounded-full bg-dark-100 dark:bg-dark-800 text-dark-600 dark:text-dark-300 border border-dark-200 dark:border-dark-700">
                    PUBLIC
                  </span>
                </div>

                <h2 className="text-2xl lg:text-3xl font-bold text-dark-900 dark:text-white mb-4 group-hover:text-primary transition-colors duration-300">
                  {product.name}
                </h2>

                <p className="text-base text-dark-600 dark:text-dark-400 mb-10 leading-relaxed flex-grow">
                  {product.description}
                </p>

                <div className="mt-auto flex flex-col gap-5">
                  {/* Sleek Developer Info Card */}
                  <div className="flex items-center justify-between p-4 rounded-2xl bg-white dark:bg-dark-950 border border-dark-100 dark:border-dark-800/60 shadow-sm">
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-full bg-dark-50 dark:bg-dark-900 flex items-center justify-center text-dark-500 border border-dark-100 dark:border-dark-800">
                        <UserRound className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-dark-400 dark:text-dark-500 uppercase tracking-widest mb-0.5">Author</p>
                        <p className="text-sm font-bold text-dark-900 dark:text-white">{developerName}</p>
                      </div>
                    </div>
                    <a
                      href={developerProfile}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/link flex items-center justify-center w-10 h-10 rounded-xl text-dark-400 hover:text-primary hover:bg-primary/10 transition-all duration-300"
                      title="View Developer Profile"
                    >
                      <ArrowUpRight className="w-5 h-5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                    </a>
                  </div>

                  {/* Premium Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3.5">
                    <a
                      href={product.sourceCodeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/btn flex-1 flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-dark-900 dark:bg-white text-white dark:text-dark-900 font-semibold hover:bg-dark-800 dark:hover:bg-dark-100 transition-all duration-300 shadow-[0_4px_12px_rgba(0,0,0,0.1)] hover:shadow-[0_6px_16px_rgba(0,0,0,0.15)] hover:-translate-y-0.5"
                    >
                      <Github className="w-4 h-4" />
                      View on GitHub
                    </a>
                    <Link
                      href={`/products/${product.slug}`}
                      className="group/link flex-1 flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-white dark:bg-dark-900 text-dark-900 dark:text-white font-semibold hover:bg-dark-50 dark:hover:bg-dark-800 border border-dark-200 dark:border-dark-700 transition-all duration-300 hover:-translate-y-0.5"
                    >
                      Product Details
                      <ExternalLink className="w-4 h-4 text-dark-400 group-hover/link:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Premium Empty State */}
          {sourceProducts.length === 0 && (
            <div className="text-center py-28 px-4 bg-white/50 dark:bg-dark-900/30 backdrop-blur-md rounded-[3rem] border border-dark-100 border-dashed dark:border-dark-800 mt-10">
              <div className="w-20 h-20 bg-dark-50 dark:bg-dark-800 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                <Github className="w-10 h-10 text-dark-400 dark:text-dark-500" />
              </div>
              <h3 className="text-2xl font-bold text-dark-900 dark:text-white mb-3 tracking-tight">No Repositories Available</h3>
              <p className="text-dark-500 dark:text-dark-400 max-w-md mx-auto text-lg">
                Public source code repositories will appear here once they are released. Check back later.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}