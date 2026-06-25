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
      {/* HERO SECTION */}
      <section className="relative gradient-bg py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-32 -right-24 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        </div>

        <div className="container-custom relative">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-dark-900/80 backdrop-blur-sm border border-dark-100 dark:border-dark-800 mb-8 shadow-lg shadow-dark-900/5">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-dark-600 dark:text-dark-300">Source code hub</span>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-primary-50 dark:bg-primary-900/20 rounded-2xl flex items-center justify-center ring-8 ring-primary/5">
                <Github className="w-7 h-7 text-primary" />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-dark-900 dark:text-white tracking-tight">
                  Source Code
                </h1>
              </div>
            </div>

            <p className="text-dark-600 dark:text-dark-400 text-lg md:text-xl leading-relaxed max-w-2xl">
              Browse the public source code repositories for the products that have GitHub links available. Explore, learn, and contribute.
            </p>
          </div>
        </div>
      </section>

      {/* REPOSITORIES SECTION */}
      <section className="section-padding bg-white dark:bg-dark-950">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {sourceProducts.map((product) => (
              <div
                key={product.id}
                className="group relative overflow-hidden rounded-3xl border border-dark-100 dark:border-dark-800 bg-white dark:bg-dark-900 p-6 sm:p-8 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 flex flex-col h-full"
              >
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-primary-500 to-primary-700 opacity-70 group-hover:opacity-100 transition-opacity" />

                <div className="flex items-center justify-between gap-4 mb-6">
                  <div className="flex items-center gap-2 text-primary">
                    <Code2 className="w-5 h-5" />
                    <span className="text-xs font-bold uppercase tracking-[0.2em]">Repository</span>
                  </div>
                  <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-primary-50 dark:bg-primary-900/20 text-primary border border-primary/10">
                    Public
                  </span>
                </div>

                <h2 className="text-2xl font-bold text-dark-900 dark:text-white mb-3 group-hover:text-primary transition-colors">
                  {product.name}
                </h2>

                <p className="text-sm text-dark-600 dark:text-dark-400 mb-8 leading-relaxed flex-grow">
                  {product.description}
                </p>

                <div className="mt-auto space-y-4">
                  {/* Developer Info Box */}
                  <div className="flex items-center justify-between p-4 rounded-2xl bg-dark-50 dark:bg-dark-950/50 border border-dark-100 dark:border-dark-800">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-dark-200 dark:bg-dark-800 flex items-center justify-center text-dark-700 dark:text-dark-300">
                        <UserRound className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-[11px] font-semibold text-dark-500 uppercase tracking-wider mb-0.5">Developer</p>
                        <p className="text-sm font-bold text-dark-900 dark:text-white">{developerName}</p>
                      </div>
                    </div>
                    <a
                      href={developerProfile}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl text-dark-500 hover:text-primary hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors"
                      title="View Developer Profile"
                    >
                      <ArrowUpRight className="w-5 h-5" />
                    </a>
                  </div>

                  {/* Clean Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <a
                      href={product.sourceCodeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-dark-900 dark:bg-white text-white dark:text-dark-900 font-medium hover:bg-dark-800 dark:hover:bg-dark-100 transition-colors shadow-sm"
                    >
                      <Github className="w-4 h-4" />
                      View on GitHub
                    </a>
                    <Link
                      href={`/products/${product.slug}`}
                      className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-dark-50 dark:bg-dark-800 text-dark-900 dark:text-white font-medium hover:bg-dark-100 dark:hover:bg-dark-700 border border-dark-200 dark:border-dark-700 transition-colors"
                    >
                      Product Details
                      <ExternalLink className="w-4 h-4 text-dark-500 dark:text-dark-400" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {sourceProducts.length === 0 && (
            <div className="text-center py-24 bg-dark-50 dark:bg-dark-900/50 rounded-3xl border border-dark-100 dark:border-dark-800 mt-8">
              <Github className="w-12 h-12 text-dark-300 dark:text-dark-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-dark-900 dark:text-white mb-2">No Repositories Found</h3>
              <p className="text-dark-600 dark:text-dark-400">Public source code repositories will appear here once available.</p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}