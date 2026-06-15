'use client'

import { useState } from 'react'
import { Send, CheckCircle, AlertCircle } from 'lucide-react'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.id]: e.target.value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('submitting')
    setErrorMessage('')

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: 'a8c1efbd-b3a7-4b49-bbbd-128f8b3b8050',
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          from_name: 'exevolv.io Contact Form'
        })
      })

      const result = await response.json()
      if (result.success) {
        setStatus('success')
        setFormData({ name: '', email: '', subject: '', message: '' })
      } else {
        setStatus('error')
        setErrorMessage(result.message || 'Something went wrong. Please try again.')
      }
    } catch (error) {
      setStatus('error')
      setErrorMessage('Failed to send message. Please check your internet connection.')
    }
  }

  return (
    <div className="md:col-span-3 p-10 lg:p-12">
      <h3 className="text-2xl font-bold text-dark-900 dark:text-white mb-6">Send a Message</h3>
      
      {status === 'success' && (
        <div className="mb-6 p-4 rounded-xl bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-300 flex items-start gap-3">
          <CheckCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-base">Message Sent Successfully!</h4>
            <p className="text-sm mt-0.5 opacity-90">Thank you for reaching out. I will get back to you as soon as possible.</p>
          </div>
        </div>
      )}

      {status === 'error' && (
        <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-300 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-base">Failed to Send Message</h4>
            <p className="text-sm mt-0.5 opacity-90">{errorMessage}</p>
          </div>
        </div>
      )}

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium text-dark-700 dark:text-dark-300">Your Name</label>
            <input 
              type="text" 
              id="name" 
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-dark-950 border border-gray-200 dark:border-dark-800 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all dark:text-white" 
              placeholder="John Doe" 
              required 
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-dark-700 dark:text-dark-300">Email Address</label>
            <input 
              type="email" 
              id="email" 
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-dark-950 border border-gray-200 dark:border-dark-800 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all dark:text-white" 
              placeholder="john@example.com" 
              required 
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="subject" className="text-sm font-medium text-dark-700 dark:text-dark-300">Subject / Service Needed</label>
          <input 
            type="text" 
            id="subject" 
            value={formData.subject}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-dark-950 border border-gray-200 dark:border-dark-800 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all dark:text-white" 
            placeholder="e.g. Play Console Policy Fix" 
            required 
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="message" className="text-sm font-medium text-dark-700 dark:text-dark-300">Project Details</label>
          <textarea 
            id="message" 
            rows={4} 
            value={formData.message}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-dark-950 border border-gray-200 dark:border-dark-800 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none dark:text-white" 
            placeholder="Tell me about your project or issue..." 
            required
          ></textarea>
        </div>
        
        <button 
          type="submit" 
          disabled={status === 'submitting'}
          className="btn-primary w-full py-4 text-lg flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {status === 'submitting' ? 'Sending...' : 'Send Message'}
          <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </form>
    </div>
  )
}

