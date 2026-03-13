'use client'

import { useState, useEffect } from 'react'
import { CheckCircle2, Lock, Send, AlertCircle, Clock } from 'lucide-react'
import { findStudentById } from '../src/data/students'

export default function CertificateVerificationPortal() {
  const [searchId, setSearchId] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [verifiedStudent, setVerifiedStudent] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')
  const [serverTime, setServerTime] = useState(new Date())
  const [selectedPath, setSelectedPath] = useState(null)

  const LOADING_DURATION = 1500
  const DEADLINE = new Date('2026-03-16T16:00:00+01:00')

  useEffect(() => {
    const timer = setInterval(() => {
      setServerTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

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
                        placeholder="GTA-2026-7782-DIST"
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

              {/* Enrollment Status Banner - Only for main user */}
              {verifiedStudent.id === 'GTA-2026-7782-DIST' && (
                <div className="mb-6 bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-bold text-amber-900">
                      ENROLLMENT STATUS: PENDING
                    </p>
                    <p className="text-xs text-amber-800 mt-1">
                      Server Provisioning Batch closes Monday, 16th March at 16:00 WAT.
                    </p>
                  </div>
                </div>
              )}

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

                  {/* Phase 2 Enrollment Section - Only for main user */}
                  {verifiedStudent.id === 'GTA-2026-7782-DIST' ? (
                    <div className="space-y-6 border-t border-border pt-8">
                      <div>
                        <p className="text-xs font-semibold text-secondary uppercase tracking-wider mb-4">
                          Academic Pathway & Enrollment
                        </p>
                        <h3 className="font-bold text-lg text-foreground mb-4">
                          {verifiedStudent.phase2Program}
                        </h3>
                      </div>

                      {/* Enrollment Options */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Option 1: Standard Residency */}
                        <div className={`border-2 rounded-xl p-6 transition-all cursor-pointer ${
                          selectedPath === 'standard'
                            ? 'border-accent bg-accent/5'
                            : 'border-border hover:border-accent/50 bg-card'
                        }`}
                        onClick={() => setSelectedPath('standard')}
                        >
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <p className="text-sm font-semibold text-secondary uppercase tracking-wide">Option 1</p>
                              <h4 className="text-lg font-bold text-foreground mt-1">Standard Residency</h4>
                              <p className="text-xs text-secondary mt-1">Domestic Track</p>
                            </div>
                            <div className="w-5 h-5 rounded-full border-2 border-secondary flex items-center justify-center flex-shrink-0">
                              {selectedPath === 'standard' && (
                                <div className="w-3 h-3 rounded-full bg-accent"></div>
                              )}
                            </div>
                          </div>
                          <p className="text-2xl font-bold text-foreground mb-4">₦200,000</p>
                          <div className="space-y-2 mb-4 text-sm text-foreground">
                            <p className="flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                              Core Vulnerability Labs
                            </p>
                            <p className="flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                              4-Month Access
                            </p>
                            <p className="flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                              TrevoTech Certification
                            </p>
                          </div>
                          <button
                            onClick={() => setSelectedPath('standard')}
                            className="w-full px-4 py-2.5 border-2 border-secondary text-secondary font-semibold rounded-xl hover:border-accent hover:text-accent transition-colors text-sm"
                          >
                            Select Standard
                          </button>
                        </div>

                        {/* Option 2: Global Specialist Track */}
                        <div className={`border-2 rounded-xl p-6 transition-all cursor-pointer relative ${
                          selectedPath === 'global'
                            ? 'border-amber-500 bg-amber-50'
                            : 'border-border hover:border-accent/50 bg-card'
                        }`}
                        onClick={() => setSelectedPath('global')}
                        >
                          <div className="absolute -top-3 right-4 bg-amber-500 text-amber-50 px-3 py-1 rounded-full text-xs font-bold">
                            RESERVED
                          </div>
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <p className="text-sm font-semibold text-secondary uppercase tracking-wide">Option 2</p>
                              <h4 className="text-lg font-bold text-foreground mt-1">Global Specialist</h4>
                              <p className="text-xs text-amber-700 mt-1 font-semibold">For Distinction Candidates</p>
                            </div>
                            <div className="w-5 h-5 rounded-full border-2 border-amber-500 flex items-center justify-center flex-shrink-0">
                              {selectedPath === 'global' && (
                                <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                              )}
                            </div>
                          </div>
                          <p className="text-2xl font-bold text-foreground mb-4">₦250,000</p>
                          <div className="space-y-2 mb-4 text-sm text-foreground">
                            <p className="flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                              Everything in Standard
                            </p>
                            <p className="flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                              International Board Exam
                            </p>
                            <p className="flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                              Enterprise Tool Suite
                            </p>
                            <p className="flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                              Global Mentorship
                            </p>
                          </div>
                          <button
                            onClick={() => setSelectedPath('global')}
                            className="w-full px-4 py-2.5 bg-amber-500 text-white font-semibold rounded-xl hover:bg-amber-600 active:scale-95 transition-all text-sm"
                          >
                            Confirm Global Enrollment
                          </button>
                        </div>
                      </div>

                      {/* Batch Info */}
                      <div className="bg-muted border border-border rounded-xl p-4 text-xs text-secondary space-y-2">
                        <p className="font-semibold text-foreground">Lab Server Allocation</p>
                        <p>
                          Lab servers are provisioned in synchronized cohorts. Unclaimed seats are automatically re-allocated to the Q3 waiting list upon expiration of the Monday deadline.
                        </p>
                      </div>

                      {/* Server Time Display */}
                      <div className="flex items-center justify-between bg-muted rounded-xl p-4 border border-border">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-secondary" />
                          <span className="text-xs font-semibold text-secondary">Server Time</span>
                        </div>
                        <span className="text-sm font-mono font-bold text-foreground">
                          {serverTime.toLocaleTimeString()}
                        </span>
                      </div>
                    </div>
                  ) : (
                    // Phase 2 Status for other students
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
                  )}

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
