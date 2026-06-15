'use client'

import { Send } from 'lucide-react'

export default function ContactForm() {
  return (
    <div className="md:col-span-3 p-10 lg:p-12">
      <h3 className="text-2xl font-bold text-dark-900 dark:text-white mb-6">Send a Message</h3>
      <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium text-dark-700 dark:text-dark-300">Your Name</label>
            <input type="text" id="name" className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-dark-950 border border-gray-200 dark:border-dark-800 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all dark:text-white" placeholder="John Doe" required />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-dark-700 dark:text-dark-300">Email Address</label>
            <input type="email" id="email" className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-dark-950 border border-gray-200 dark:border-dark-800 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all dark:text-white" placeholder="john@example.com" required />
          </div>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="subject" className="text-sm font-medium text-dark-700 dark:text-dark-300">Subject / Service Needed</label>
          <input type="text" id="subject" className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-dark-950 border border-gray-200 dark:border-dark-800 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all dark:text-white" placeholder="e.g. Play Console Policy Fix" required />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="message" className="text-sm font-medium text-dark-700 dark:text-dark-300">Project Details</label>
          <textarea id="message" rows={4} className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-dark-950 border border-gray-200 dark:border-dark-800 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none dark:text-white" placeholder="Tell me about your project or issue..." required></textarea>
        </div>
        
        <button type="submit" className="btn-primary w-full py-4 text-lg flex items-center justify-center gap-2 group">
          Send Message <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </form>
    </div>
  )
}
