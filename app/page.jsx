'use client'

import { useState } from 'react'
import { CheckCircle2, Lock, Send } from 'lucide-react'
import { findStudentById } from '../src/data/students'

export default function CertificateVerificationPortal() {
  const [searchId, setSearchId] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [verifiedStudent, setVerifiedStudent] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')

  const LOADING_DURATION = 1500

  const handleSearch = async () => {
    setErrorMessage('')
    setVerifiedStudent(null)

    if (!searchId.trim()) {
      setErrorMessage('Please enter a Credential Identification Number.')
      return
    }

    setIsLoading(true)

    await new Promise((resolve) => setTimeout(resolve, LOADING_DURATION))

    const student = findStudentById(searchId)

    if (student) {
      setVerifiedStudent(student)
      setSearchId('')
    } else {
      setErrorMessage('Credential not found in database. Please verify the ID and try again.')
    }

    setIsLoading(false)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !isLoading) {
      handleSearch()
    }
  }

  const handlePrint = () => {
    window.print()
  }

  const handleDownload = () => {
    alert('Digital Transcript downloaded successfully.')
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Minimal Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lock className="w-5 h-5 text-accent" />
            <span className="text-sm font-semibold tracking-tight">TrevoTech Verify</span>
          </div>
          <p className="text-xs text-secondary">Global Credential Service</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full">
        {!verifiedStudent ? (
          // Landing View
          <div className="w-full">
            {/* Hero Section */}
            <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
              <div className="text-center space-y-6">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
                  Verify Your Credentials
                </h1>
                <p className="text-lg sm:text-xl text-secondary max-w-2xl mx-auto leading-relaxed">
                  Instant verification of TrevoTech Academy professional certifications. Trust in transparency.
                </p>
              </div>

              {/* Search Card */}
              <div className="mt-12 max-w-xl mx-auto">
                <div className="bg-card border border-border rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-3">
                        Credential Identification Number
                      </label>
                      <input
                        type="text"
                        value={searchId}
                        onChange={(e) => {
                          setSearchId(e.target.value.toUpperCase())
                          setErrorMessage('')
                        }}
                        onKeyPress={handleKeyPress}
                        placeholder="GTA-2026-xxxx-xxxx"
                        disabled={isLoading}
                        className="w-full px-4 py-3 bg-muted border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background placeholder:text-secondary disabled:opacity-50 disabled:cursor-not-allowed text-foreground transition-all"
                      />
                    </div>

                    <button
                      onClick={handleSearch}
                      disabled={isLoading || !searchId.trim()}
                      className="w-full px-6 py-3.5 bg-accent text-accent-foreground font-semibold rounded-xl hover:bg-accent/90 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                    >
                      {isLoading ? (
                        <>
                          <span className="inline-block w-4 h-4 border-2 border-accent-foreground border-t-transparent rounded-full animate-spin"></span>
                          Searching...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Verify
                        </>
                      )}
                    </button>
                  </div>

                  {/* Error Message */}
                  {errorMessage && (
                    <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl">
                      <p className="text-red-700 text-sm font-medium">{errorMessage}</p>
                    </div>
                  )}
                </div>

                {/* Info Text */}
                <p className="text-center text-xs text-secondary mt-6">
                  Your search is encrypted and secure. No data is stored.
                </p>
              </div>
            </div>
          </div>
        ) : (
          // Result View
          <div className="w-full">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
              {/* Back Button */}
              <button
                onClick={() => {
                  setVerifiedStudent(null)
                  setErrorMessage('')
                  setSearchId('')
                }}
                className="text-secondary hover:text-foreground text-sm font-medium mb-8 transition-colors"
              >
                ← New Search
              </button>

              {/* Verified Result Card */}
              <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
                {/* Status Header with Gradient */}
                <div className="bg-gradient-to-r from-accent to-accent/80 px-6 sm:px-8 py-8 flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-accent-foreground">
                      Credential Verified
                    </h2>
                    <p className="text-accent-foreground/80 text-sm mt-1">Authentic & Current</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-8 h-8 text-accent-foreground flex-shrink-0" />
                  </div>
                </div>

                {/* Credential Details */}
                <div className="px-6 sm:px-8 py-8 space-y-8">
                  {/* Identity Section */}
                  <div>
                    <p className="text-xs font-semibold text-secondary uppercase tracking-wider mb-2">
                      Credential Holder
                    </p>
                    <p className="text-2xl sm:text-3xl font-bold text-foreground">
                      {verifiedStudent.name}
                    </p>
                  </div>

                  {/* Program Section */}
                  <div className="border-t border-border pt-8">
                    <p className="text-xs font-semibold text-secondary uppercase tracking-wider mb-4">
                      Program Details
                    </p>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-secondary mb-1">Program</p>
                        <p className="text-lg font-semibold text-foreground">
                          {verifiedStudent.program}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <p className="text-sm text-secondary mb-1">Performance</p>
                          <p className="text-2xl font-bold text-foreground">
                            {verifiedStudent.grade}%
                          </p>
                          <p className="text-xs text-secondary mt-1">{verifiedStudent.gradeLabel}</p>
                        </div>

                        <div>
                          <p className="text-sm text-secondary mb-1">Professional Level</p>
                          <p className="text-lg font-semibold text-foreground">
                            {verifiedStudent.clearanceLevel}
                          </p>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm text-secondary mb-1">Specialization</p>
                        <p className="text-base text-foreground">
                          {verifiedStudent.eligibility}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Phase 2 Status */}
                  <div className="bg-muted border border-border rounded-xl p-6">
                    <p className="text-xs font-semibold text-secondary uppercase tracking-wider mb-3">
                      Next Advancement
                    </p>
                    <div className="space-y-3">
                      <h3 className="font-bold text-lg text-foreground">
                        {verifiedStudent.phase2Program}
                      </h3>
                      <div className="flex items-baseline gap-2">
                        <span className={`text-sm font-bold px-3 py-1 rounded-full ${
                          verifiedStudent.phase2Status === 'CONFIRMED'
                            ? 'bg-green-100 text-green-700'
                            : verifiedStudent.phase2Status === 'RESERVED'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-amber-100 text-amber-700'
                        }`}>
                          {verifiedStudent.phase2Status}
                        </span>
                      </div>
                      <p className="text-sm text-secondary">
                        Enrollment opens {verifiedStudent.phase2Date}
                      </p>
                    </div>
                  </div>

                  {/* Verification Badge */}
                  <div className="border-t border-border pt-8">
                    <p className="text-xs font-semibold text-secondary uppercase tracking-wider mb-3">
                      Verification
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <div className="w-2 h-2 rounded-full bg-green-600"></div>
                        </div>
                        <div>
                          <p className="font-medium text-foreground text-sm">Blockchain Verified</p>
                          <p className="text-xs text-secondary">TrevoTech Ledger</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <div className="w-2 h-2 rounded-full bg-green-600"></div>
                        </div>
                        <div>
                          <p className="font-medium text-foreground text-sm">Industry Standards</p>
                          <p className="text-xs text-secondary">CompTIA, ISO, NIST</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-3 border-t border-border pt-8">
                    <button
                      onClick={handleDownload}
                      className="px-4 py-3 bg-foreground text-background font-semibold rounded-xl hover:bg-foreground/90 active:scale-95 transition-all text-sm"
                    >
                      Download
                    </button>
                    <button
                      onClick={handlePrint}
                      className="px-4 py-3 bg-muted text-foreground font-semibold rounded-xl hover:bg-muted/80 active:scale-95 transition-all text-sm"
                    >
                      Print
                    </button>
                  </div>
                </div>
              </div>

              {/* Footer Note */}
              <p className="text-center text-xs text-secondary mt-8">
                This verification is valid for official use. Questions? contact verification@trevotech.academy
              </p>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-background/50 backdrop-blur-sm mt-auto">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 text-center text-xs text-secondary">
          <p>© 2026 TrevoTech Academy. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
