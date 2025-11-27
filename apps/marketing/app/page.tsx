"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
    CheckCircle, XCircle, Calculator, ArrowRight, Star, ShieldCheck, Zap,
    Smartphone, Globe, Users, TrendingUp, LayoutDashboard, CreditCard, Menu, X
} from "lucide-react";

export default function LandingPage() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [pricingPeriod, setPricingPeriod] = useState<'monthly' | 'annual'>('monthly');

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const togglePricing = () => {
        setPricingPeriod(prev => prev === 'monthly' ? 'annual' : 'monthly');
    };

    const prices = {
        starter: { monthly: 49, annual: 39 },
        growth: { monthly: 99, annual: 79 },
        pro: { monthly: 149, annual: 119 }
    };

    return (
        <div className="font-body text-charcoal bg-white overflow-x-hidden">
            {/* HEADER / NAVIGATION */}
            <header className={`header ${isScrolled ? 'scrolled' : ''}`} id="header">
                <nav className="nav container">
                    <Link href="/" className="logo" aria-label="The Laundry Hive - Home">
                        <svg className="logo-icon" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path d="M20 2L36.66 11.5V30.5L20 40L3.34 30.5V11.5L20 2Z" fill="#F59E0B" />
                            <ellipse cx="20" cy="22" rx="8" ry="10" fill="#1F2937" />
                            <ellipse cx="20" cy="18" rx="6" ry="4" fill="#FCD34D" />
                            <ellipse cx="20" cy="26" rx="6" ry="4" fill="#FCD34D" />
                            <ellipse cx="12" cy="18" rx="4" ry="6" fill="white" opacity="0.8" />
                            <ellipse cx="28" cy="18" rx="4" ry="6" fill="white" opacity="0.8" />
                            <circle cx="17" cy="14" r="2" fill="white" />
                            <circle cx="23" cy="14" r="2" fill="white" />
                        </svg>
                        The Laundry <span>Hive</span>
                    </Link>

                    <ul className="nav-links">
                        <li><a href="#features">Features</a></li>
                        <li><a href="#pricing">Pricing</a></li>
                        <li><a href="#compare">Compare</a></li>
                        <li><a href="#calculator">Calculator</a></li>
                        <li><a href="#partners">Partners</a></li>
                    </ul>

                    <div className="nav-cta">
                        <a href="#signup" className="btn btn-primary">Start Free Trial</a>
                        <button
                            className="mobile-menu-btn"
                            aria-label="Toggle menu"
                            aria-expanded={mobileMenuOpen}
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </nav>

                {/* Mobile Menu Overlay */}
                {mobileMenuOpen && (
                    <div className="fixed inset-0 top-[72px] bg-white z-50 p-6 md:hidden">
                        <ul className="flex flex-col gap-6 text-lg font-bold">
                            <li><a href="#features" onClick={() => setMobileMenuOpen(false)}>Features</a></li>
                            <li><a href="#pricing" onClick={() => setMobileMenuOpen(false)}>Pricing</a></li>
                            <li><a href="#compare" onClick={() => setMobileMenuOpen(false)}>Compare</a></li>
                            <li><a href="#calculator" onClick={() => setMobileMenuOpen(false)}>Calculator</a></li>
                            <li><a href="#partners" onClick={() => setMobileMenuOpen(false)}>Partners</a></li>
                        </ul>
                    </div>
                )}
            </header>

            <main id="main">
                {/* HERO SECTION */}
                <section className="hero" id="hero">
                    <div className="hero-decor hero-decor-1" aria-hidden="true"></div>
                    <div className="hero-decor hero-decor-2" aria-hidden="true"></div>

                    <div className="container">
                        <div className="hero-content">
                            <div className="hero-text animate-fade-in-up">
                                <div className="hero-badge">
                                    <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    No Hardware Required • Plans from $49/mo
                                </div>

                                <h1>
                                    <span className="highlight">Laundry Management Software</span> That Won't Break the Bank
                                </h1>

                                <p className="hero-subtitle">
                                    Finally, affordable wash & fold software for small and medium laundromats. QR tracking, SMS notifications, route optimization, and white-label branding—all without expensive equipment.
                                </p>

                                <div className="hero-cta">
                                    <a href="#signup" className="btn btn-primary btn-lg">
                                        Start 14-Day Free Trial
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </a>
                                    <a href="#demo" className="btn btn-secondary btn-lg">Watch Demo</a>
                                </div>

                                <div className="hero-stats">
                                    <div className="stat">
                                        <div className="stat-value">$49</div>
                                        <div className="stat-label">Starting Price/mo</div>
                                    </div>
                                    <div className="stat">
                                        <div className="stat-value">0<span>%</span></div>
                                        <div className="stat-label">Commission Fees</div>
                                    </div>
                                    <div className="stat">
                                        <div className="stat-value">300<span>+</span></div>
                                        <div className="stat-label">SMS Included</div>
                                    </div>
                                </div>
                            </div>

                            <div className="hero-visual animate-fade-in-up delay-200">
                                <div className="hero-mockup">
                                    <div className="floating-badge badge-qr">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2" aria-hidden="true">
                                            <rect x="3" y="3" width="7" height="7" />
                                            <rect x="14" y="3" width="7" height="7" />
                                            <rect x="14" y="14" width="7" height="7" />
                                            <rect x="3" y="14" width="7" height="7" />
                                        </svg>
                                        QR Tracking
                                    </div>

                                    <div className="floating-badge badge-sms">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2" aria-hidden="true">
                                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                                        </svg>
                                        SMS Updates
                                    </div>

                                    <div className="floating-badge badge-route">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2" aria-hidden="true">
                                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                            <circle cx="12" cy="10" r="3" />
                                        </svg>
                                        Route Optimization
                                    </div>

                                    <div className="phone-frame">
                                        <div className="phone-screen">
                                            <div className="app-preview">
                                                <div className="app-header">
                                                    <div className="app-header-top">
                                                        <div className="app-logo-small">🐝 Laundry Hive</div>
                                                        <div className="app-status">
                                                            <span className="status-dot"></span>
                                                            Live
                                                        </div>
                                                    </div>
                                                    <div className="app-greeting">
                                                        Good morning,
                                                        <strong>Sunny's Laundromat</strong>
                                                    </div>
                                                </div>
                                                <div className="app-body">
                                                    <div className="app-card">
                                                        <div className="app-card-header">
                                                            <span className="app-card-title">Order #1247</span>
                                                            <span className="app-card-badge">Folding</span>
                                                        </div>
                                                        <div className="app-progress">
                                                            <div className="app-progress-bar"></div>
                                                        </div>
                                                        <div className="app-progress-steps">
                                                            <span className="active">Received</span>
                                                            <span className="active">Washing</span>
                                                            <span className="active">Drying</span>
                                                            <span className="active">Folding</span>
                                                            <span>Ready</span>
                                                            <span>Delivered</span>
                                                        </div>
                                                    </div>
                                                    <div className="app-card">
                                                        <div className="app-card-header">
                                                            <span className="app-card-title">Today's Summary</span>
                                                        </div>
                                                        <div className="app-order-info">
                                                            <div>
                                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /></svg>
                                                                12 Orders
                                                            </div>
                                                            <div>
                                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
                                                                $487 Revenue
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* TRUST BAR */}
                <section className="trust-bar">
                    <div className="container">
                        <div className="trust-content">
                            <p className="trust-label">Powered by trusted technology</p>
                            <div className="trust-logos">
                                <div className="trust-item">
                                    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                    </svg>
                                    Google Cloud
                                </div>
                                <div className="trust-item">
                                    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                        <path d="M3.89 15.672L6.255 19.5h4.104l3.522-5.5-2.166-3.328-4.104 5zm.008-7.336l2.16 3.328 4.104-5L6.255 4.5H2.151l3.522 5.5-.008.336h.008l-.008-.008zm8.089-3.828l-2.16 3.328 4.096 5L17.745 19.5h4.104l-7.626-11.836-2.236-3.156zm.008 7.336l2.16 3.328L21.745 4.5h-4.104l-3.522 5.5-.008.336h.008l-.008-.008z" />
                                    </svg>
                                    Firebase
                                </div>
                                <div className="trust-item">
                                    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                        <path d="M20.317 4.492c-1.53-.69-3.17-1.2-4.885-1.49a.075.075 0 0 0-.079.036c-.21.369-.444.85-.608 1.23a18.566 18.566 0 0 0-5.487 0 12.36 12.36 0 0 0-.617-1.23A.077.077 0 0 0 8.562 3c-1.714.29-3.354.8-4.885 1.491a.07.07 0 0 0-.032.027C.533 9.093-.32 13.555.099 17.961a.08.08 0 0 0 .031.055 20.03 20.03 0 0 0 5.993 2.98.078.078 0 0 0 .084-.026 13.83 13.83 0 0 0 1.226-1.963.074.074 0 0 0-.041-.104 13.175 13.175 0 0 1-1.872-.878.075.075 0 0 1-.008-.125c.126-.093.252-.19.372-.287a.075.075 0 0 1 .078-.01c3.927 1.764 8.18 1.764 12.061 0a.075.075 0 0 1 .079.009c.12.098.245.195.372.288a.075.075 0 0 1-.006.125c-.598.344-1.22.635-1.873.877a.075.075 0 0 0-.041.105c.36.687.772 1.341 1.225 1.962a.077.077 0 0 0 .084.028 19.963 19.963 0 0 0 6.002-2.981.076.076 0 0 0 .032-.054c.5-5.094-.838-9.52-3.549-13.442a.06.06 0 0 0-.031-.028z" />
                                    </svg>
                                    Stripe Payments
                                </div>
                                <div className="trust-item">
                                    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zM7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 2.88-2.88 7.19-5 9.88C9.92 16.21 7 11.85 7 9z" />
                                        <circle cx="12" cy="9" r="2.5" />
                                    </svg>
                                    Google Maps
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FEATURES SECTION */}
                <section className="section features" id="features">
                    <div className="container">
                        <div className="section-header">
                            <span className="section-badge">Powerful Features</span>
                            <h2>Everything You Need to Run Pickup & Delivery</h2>
                            <p>Built from real laundromat owner feedback. No bloated features you'll never use—just the tools that actually grow your business.</p>
                        </div>

                        {/* Features Grid */}
                        <div className="features-grid">
                            {/* QR Tracking */}
                            <div className="feature-card featured">
                                <div className="feature-icon" style={{ background: 'linear-gradient(135deg, #FEF3C7 0%, #FCD34D 100%)' }}>
                                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="2">
                                        <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
                                        <rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
                                    </svg>
                                </div>
                                <div className="feature-badge">No Hardware Needed</div>
                                <h3>QR Code Tracking</h3>
                                <p>Print QR codes on any printer. Scan with any phone. Customers get instant updates. No expensive equipment.</p>
                                <ul className="feature-benefits">
                                    <li><svg width="16" height="16" viewBox="0 0 20 20" fill="#10B981"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>Works with your existing phone</li>
                                    <li><svg width="16" height="16" viewBox="0 0 20 20" fill="#10B981"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>Print on regular paper or stickers</li>
                                    <li><svg width="16" height="16" viewBox="0 0 20 20" fill="#10B981"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>One scan = instant status update</li>
                                </ul>
                                <a href="#qr-demo" className="feature-link">See how it works →</a>
                            </div>

                            {/* SMS Notifications */}
                            <div className="feature-card">
                                <div className="feature-icon" style={{ background: 'linear-gradient(135deg, #DBEAFE 0%, #93C5FD 100%)' }}>
                                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2">
                                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                                    </svg>
                                </div>
                                <h3>SMS Notifications</h3>
                                <p>Automatic text updates at every stage. Customers love knowing exactly where their laundry is.</p>
                                <ul className="feature-benefits">
                                    <li><svg width="16" height="16" viewBox="0 0 20 20" fill="#10B981"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>Automatic at each status change</li>
                                    <li><svg width="16" height="16" viewBox="0 0 20 20" fill="#10B981"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>Customizable message templates</li>
                                    <li><svg width="16" height="16" viewBox="0 0 20 20" fill="#10B981"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>Reduces "where's my laundry?" calls</li>
                                </ul>
                            </div>

                            {/* Route Optimization */}
                            <div className="feature-card">
                                <div className="feature-icon" style={{ background: 'linear-gradient(135deg, #D1FAE5 0%, #6EE7B7 100%)' }}>
                                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2">
                                        <circle cx="12" cy="10" r="3" /><path d="M12 2a8 8 0 0 0-8 8c0 5.4 7 12 8 12s8-6.6 8-12a8 8 0 0 0-8-8z" />
                                    </svg>
                                </div>
                                <h3>Route Optimization</h3>
                                <p>Smart routing saves your drivers time and gas. Get the most efficient delivery order with one click.</p>
                                <ul className="feature-benefits">
                                    <li><svg width="16" height="16" viewBox="0 0 20 20" fill="#10B981"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>Powered by Google Maps</li>
                                    <li><svg width="16" height="16" viewBox="0 0 20 20" fill="#10B981"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>Save 20-30% on drive time</li>
                                    <li><svg width="16" height="16" viewBox="0 0 20 20" fill="#10B981"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>One-click optimized routes</li>
                                </ul>
                            </div>

                            {/* White-Label */}
                            <div className="feature-card">
                                <div className="feature-icon" style={{ background: 'linear-gradient(135deg, #F3E8FF 0%, #C4B5FD 100%)' }}>
                                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="2">
                                        <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
                                    </svg>
                                </div>
                                <h3>White-Label Branding</h3>
                                <p>Your logo, your colors, your domain. Customers see YOUR brand—not ours.</p>
                                <ul className="feature-benefits">
                                    <li><svg width="16" height="16" viewBox="0 0 20 20" fill="#10B981"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>Custom logo & colors</li>
                                    <li><svg width="16" height="16" viewBox="0 0 20 20" fill="#10B981"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>Your own tracking URL</li>
                                    <li><svg width="16" height="16" viewBox="0 0 20 20" fill="#10B981"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>Branded SMS messages</li>
                                </ul>
                            </div>

                            {/* Customer Portal */}
                            <div className="feature-card">
                                <div className="feature-icon" style={{ background: 'linear-gradient(135deg, #FEE2E2 0%, #FCA5A5 100%)' }}>
                                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2">
                                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
                                    </svg>
                                </div>
                                <h3>Customer Portal</h3>
                                <p>Customers track orders, view history, and manage their account—all self-service.</p>
                                <ul className="feature-benefits">
                                    <li><svg width="16" height="16" viewBox="0 0 20 20" fill="#10B981"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>Real-time order tracking</li>
                                    <li><svg width="16" height="16" viewBox="0 0 20 20" fill="#10B981"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>Order history & receipts</li>
                                    <li><svg width="16" height="16" viewBox="0 0 20 20" fill="#10B981"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>Saved preferences</li>
                                </ul>
                            </div>

                            {/* Recurring Billing */}
                            <div className="feature-card">
                                <div className="feature-icon" style={{ background: 'linear-gradient(135deg, #CFFAFE 0%, #67E8F9 100%)' }}>
                                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0891B2" strokeWidth="2">
                                        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                                    </svg>
                                </div>
                                <h3>Recurring Billing</h3>
                                <p>Set up weekly or monthly subscriptions for regular customers. Automatic billing, predictable revenue.</p>
                                <ul className="feature-benefits">
                                    <li><svg width="16" height="16" viewBox="0 0 20 20" fill="#10B981"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>Weekly/monthly schedules</li>
                                    <li><svg width="16" height="16" viewBox="0 0 20 20" fill="#10B981"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>Automatic card charging</li>
                                    <li><svg width="16" height="16" viewBox="0 0 20 20" fill="#10B981"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>Predictable revenue</li>
                                </ul>
                            </div>

                            {/* Driver Management */}
                            <div className="feature-card">
                                <div className="feature-icon" style={{ background: 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)' }}>
                                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="2">
                                        <rect x="1" y="3" width="15" height="13" rx="2" /><path d="M16 8h4l3 3v5h-7V8z" />
                                        <circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" />
                                    </svg>
                                </div>
                                <h3>Driver Management</h3>
                                <p>Add drivers, assign routes, track deliveries in real-time. Know where every order is.</p>
                                <ul className="feature-benefits">
                                    <li><svg width="16" height="16" viewBox="0 0 20 20" fill="#10B981"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>Separate driver accounts</li>
                                    <li><svg width="16" height="16" viewBox="0 0 20 20" fill="#10B981"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>Assign orders to drivers</li>
                                    <li><svg width="16" height="16" viewBox="0 0 20 20" fill="#10B981"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>Real-time location tracking</li>
                                </ul>
                            </div>

                            {/* Analytics */}
                            <div className="feature-card">
                                <div className="feature-icon" style={{ background: 'linear-gradient(135deg, #E0E7FF 0%, #A5B4FC 100%)' }}>
                                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#4F46E5" strokeWidth="2">
                                        <path d="M18 20V10M12 20V4M6 20v-6" />
                                    </svg>
                                </div>
                                <h3>Analytics Dashboard</h3>
                                <p>See what's working at a glance. Track orders, revenue, and customer trends to grow smarter.</p>
                                <ul className="feature-benefits">
                                    <li><svg width="16" height="16" viewBox="0 0 20 20" fill="#10B981"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>Revenue tracking</li>
                                    <li><svg width="16" height="16" viewBox="0 0 20 20" fill="#10B981"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>Order volume trends</li>
                                    <li><svg width="16" height="16" viewBox="0 0 20 20" fill="#10B981"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>Customer insights</li>
                                </ul>
                            </div>
                        </div>

                        {/* All Features List */}
                        <div className="all-features">
                            <h3>All Features Included</h3>
                            <p className="all-features-subtitle">Every plan includes these core features. Higher tiers add more volume and advanced capabilities.</p>

                            <div className="features-columns">
                                <div className="features-column">
                                    <h4>Order Management</h4>
                                    <ul>
                                        <li>✓ QR code tracking</li>
                                        <li>✓ Order status updates</li>
                                        <li>✓ Customer notes</li>
                                        <li>✓ Order history</li>
                                        <li>✓ Search & filter</li>
                                    </ul>
                                </div>
                                <div className="features-column">
                                    <h4>Communication</h4>
                                    <ul>
                                        <li>✓ SMS notifications</li>
                                        <li>✓ Email notifications</li>
                                        <li>✓ Custom templates</li>
                                        <li>✓ Branded messages</li>
                                        <li>✓ Delivery ETAs</li>
                                    </ul>
                                </div>
                                <div className="features-column">
                                    <h4>Delivery & Routes</h4>
                                    <ul>
                                        <li>✓ Route planning</li>
                                        <li>✓ Route optimization</li>
                                        <li>✓ Driver assignment</li>
                                        <li>✓ Real-time tracking</li>
                                        <li>✓ Google Maps</li>
                                    </ul>
                                </div>
                                <div className="features-column">
                                    <h4>Billing & Payments</h4>
                                    <ul>
                                        <li>✓ Stripe integration</li>
                                        <li>✓ One-time payments</li>
                                        <li>✓ Subscriptions</li>
                                        <li>✓ Invoice generation</li>
                                        <li>✓ Payment history</li>
                                    </ul>
                                </div>
                                <div className="features-column">
                                    <h4>Branding</h4>
                                    <ul>
                                        <li>✓ White-label</li>
                                        <li>✓ Custom logo</li>
                                        <li>✓ Brand colors</li>
                                        <li>✓ Custom URL</li>
                                        <li>✓ Branded portal</li>
                                    </ul>
                                </div>
                                <div className="features-column">
                                    <h4>Analytics</h4>
                                    <ul>
                                        <li>✓ Revenue dashboard</li>
                                        <li>✓ Order analytics</li>
                                        <li>✓ Customer insights</li>
                                        <li>✓ Export to CSV</li>
                                        <li>✓ Custom date ranges</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Features CTA */}
                        <div className="features-cta">
                            <h3>Ready to simplify your laundry business?</h3>
                            <p>Join laundromats saving time and growing revenue with The Laundry Hive.</p>
                            <div className="features-cta-buttons">
                                <a href="#signup" className="btn btn-primary btn-lg">Start 14-Day Free Trial</a>
                                <a href="#demo" className="btn btn-secondary btn-lg">Watch Demo</a>
                            </div>
                            <p className="features-cta-note">No credit card required • Setup in 5 minutes</p>
                        </div>
                    </div>
                </section>

                {/* PRICING SECTION */}
                <section className="section pricing" id="pricing">

                    <div className="container">
                        <div className="section-header">
                            <span className="section-badge">Simple Pricing</span>
                            <h2>No Commission Fees. Ever.</h2>
                            <p>
                                Unlike competitors who take 3-5% of every order, we charge a flat monthly fee.
                                <strong>You keep 100% of your customer revenue.</strong>
                            </p>
                        </div>

                        {/* Savings Banner */}
                        <div className="savings-banner">
                            <div className="savings-icon">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                                </svg>
                            </div>
                            <div className="savings-text">
                                <strong>Quick Math:</strong> At 200 orders/month ($35 avg), a 3% commission app costs you <strong>$210/month</strong>.
                                Our Growth plan? <strong>$99/month</strong>. That's <span className="highlight">$111 saved every month</span>.
                            </div>
                            <a href="#calculator" className="savings-cta">Calculate Your Savings →</a>
                        </div>

                        {/* Pricing Toggle */}
                        <div className="pricing-toggle">
                            <span
                                className={`toggle-label ${pricingPeriod === 'monthly' ? 'active' : ''}`}
                                onClick={() => setPricingPeriod('monthly')}
                            >
                                Monthly
                            </span>
                            <button
                                className="toggle-switch"
                                aria-label="Toggle annual pricing"
                                data-state={pricingPeriod}
                                onClick={togglePricing}
                            >
                                <span className="toggle-slider"></span>
                            </button>
                            <span
                                className={`toggle-label ${pricingPeriod === 'annual' ? 'active' : ''}`}
                                onClick={() => setPricingPeriod('annual')}
                            >
                                Annual
                                <span className="toggle-discount">Save 20%</span>
                            </span>
                        </div>

                        {/* Pricing Cards */}
                        <div className="pricing-grid">
                            {/* STARTER */}
                            <div className="pricing-card">
                                <div className="card-header">
                                    <span className="tier-name">Starter</span>
                                    <div className="tier-price">
                                        <span className="currency">$</span>
                                        <span className="amount">{prices.starter[pricingPeriod]}</span>
                                        <span className="period">/month</span>
                                    </div>
                                    <p className="tier-description">Perfect for small laundromats just starting with pickup & delivery</p>
                                </div>

                                <div className="card-body">
                                    <div className="included-section">
                                        <h4>Included Monthly</h4>
                                        <ul className="included-list">
                                            <li>
                                                <span className="included-icon sms"></span>
                                                <span className="included-value">300</span>
                                                <span className="included-label">SMS Messages</span>
                                            </li>
                                            <li>
                                                <span className="included-icon route"></span>
                                                <span className="included-value">100</span>
                                                <span className="included-label">Route Calculations</span>
                                            </li>
                                            <li>
                                                <span className="included-icon geo"></span>
                                                <span className="included-value">100</span>
                                                <span className="included-label">Address Lookups</span>
                                            </li>
                                        </ul>
                                    </div>

                                    <div className="features-section">
                                        <h4>Features</h4>
                                        <ul className="features-list">
                                            <li className="included">
                                                <CheckCircle className="check" /> White-label branding
                                            </li>
                                            <li className="included">
                                                <CheckCircle className="check" /> QR code tracking
                                            </li>
                                            <li className="included">
                                                <CheckCircle className="check" /> Customer portal
                                            </li>
                                            <li className="included">
                                                <CheckCircle className="check" /> 1 driver account
                                            </li>
                                            <li className="included">
                                                <CheckCircle className="check" /> Recurring customer billing
                                            </li>
                                            <li className="not-included">
                                                <XCircle className="x" /> Route optimization
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="card-footer">
                                    <a href="#signup" className="btn btn-secondary btn-block">Start Free Trial</a>
                                    <p className="trial-note">14-day free trial • No credit card required</p>
                                </div>
                            </div>

                            {/* GROWTH (Popular) */}
                            <div className="pricing-card popular">
                                <div className="popular-badge">Most Popular</div>
                                <div className="card-header">
                                    <span className="tier-name">Growth</span>
                                    <div className="tier-price">
                                        <span className="currency">$</span>
                                        <span className="amount">{prices.growth[pricingPeriod]}</span>
                                        <span className="period">/month</span>
                                    </div>
                                    <p className="tier-description">For growing operations ready to scale their delivery service</p>
                                </div>

                                <div className="card-body">
                                    <div className="included-section">
                                        <h4>Included Monthly</h4>
                                        <ul className="included-list">
                                            <li>
                                                <span className="included-icon sms"></span>
                                                <span className="included-value">1,000</span>
                                                <span className="included-label">SMS Messages</span>
                                            </li>
                                            <li>
                                                <span className="included-icon route"></span>
                                                <span className="included-value">500</span>
                                                <span className="included-label">Route Calculations</span>
                                            </li>
                                            <li>
                                                <span className="included-icon geo"></span>
                                                <span className="included-value">300</span>
                                                <span className="included-label">Address Lookups</span>
                                            </li>
                                        </ul>
                                    </div>

                                    <div className="features-section">
                                        <h4>Everything in Starter, plus:</h4>
                                        <ul className="features-list">
                                            <li className="included">
                                                <CheckCircle className="check" /> Route optimization (10 stops)
                                            </li>
                                            <li className="included">
                                                <CheckCircle className="check" /> 3 driver accounts
                                            </li>
                                            <li className="included">
                                                <CheckCircle className="check" /> Analytics dashboard
                                            </li>
                                            <li className="included">
                                                <CheckCircle className="check" /> Customer segments
                                            </li>
                                            <li className="included">
                                                <CheckCircle className="check" /> Promotional SMS campaigns
                                            </li>
                                            <li className="not-included">
                                                <XCircle className="x" /> Multi-location
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="card-footer">
                                    <a href="#signup" className="btn btn-primary btn-block">Start Free Trial</a>
                                    <p className="trial-note">14-day free trial • No credit card required</p>
                                </div>
                            </div>

                            {/* PRO */}
                            <div className="pricing-card">
                                <div className="card-header">
                                    <span className="tier-name">Pro</span>
                                    <div className="tier-price">
                                        <span className="currency">$</span>
                                        <span className="amount">{prices.pro[pricingPeriod]}</span>
                                        <span className="period">/month</span>
                                    </div>
                                    <p className="tier-description">For high-volume operations and multi-location businesses</p>
                                </div>

                                <div className="card-body">
                                    <div className="included-section">
                                        <h4>Included Monthly</h4>
                                        <ul className="included-list">
                                            <li>
                                                <span className="included-icon sms"></span>
                                                <span className="included-value">3,000</span>
                                                <span className="included-label">SMS Messages</span>
                                            </li>
                                            <li>
                                                <span className="included-icon route"></span>
                                                <span className="included-value">2,000</span>
                                                <span className="included-label">Route Calculations</span>
                                            </li>
                                            <li>
                                                <span className="included-icon geo"></span>
                                                <span className="included-value">500</span>
                                                <span className="included-label">Address Lookups</span>
                                            </li>
                                        </ul>
                                    </div>

                                    <div className="features-section">
                                        <h4>Everything in Growth, plus:</h4>
                                        <ul className="features-list">
                                            <li className="included">
                                                <CheckCircle className="check" /> Multi-location (up to 5)
                                            </li>
                                            <li className="included">
                                                <CheckCircle className="check" /> Advanced route optimization
                                            </li>
                                            <li className="included">
                                                <CheckCircle className="check" /> Unlimited drivers
                                            </li>
                                            <li className="included">
                                                <CheckCircle className="check" /> Full API access
                                            </li>
                                            <li className="included">
                                                <CheckCircle className="check" /> Dedicated account manager
                                            </li>
                                            <li className="included">
                                                <CheckCircle className="check" /> Phone support
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="card-footer">
                                    <a href="#signup" className="btn btn-secondary btn-block">Start Free Trial</a>
                                    <p className="trial-note">14-day free trial • No credit card required</p>
                                </div>
                            </div>
                        </div>

                        {/* Overage Rates */}
                        <div className="overage-info">
                            <div className="overage-header">
                                <h4>Need more? You're in control.</h4>
                                <p className="overage-subtext">When you hit your limit, choose to <strong>pause</strong> (free) or <strong>continue</strong> with pay-as-you-go:</p>
                            </div>
                            <div className="overage-grid">
                                <div className="overage-item">
                                    <div className="overage-icon">💬</div>
                                    <span className="overage-label">Additional SMS</span>
                                    <span className="overage-price">$0.026<span>/message</span></span>
                                </div>
                                <div className="overage-item">
                                    <div className="overage-icon">🗺️</div>
                                    <span className="overage-label">Additional Routes</span>
                                    <span className="overage-price">$0.01<span>/calculation</span></span>
                                </div>
                                <div className="overage-item">
                                    <div className="overage-icon">📍</div>
                                    <span className="overage-label">Additional Geocoding</span>
                                    <span className="overage-price">$0.01<span>/lookup</span></span>
                                </div>
                            </div>
                            <div className="overage-note">
                                <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                </svg>
                                <span>You'll get alerts at 80% and 100% usage. Pause anytime to avoid extra charges.</span>
                            </div>
                        </div>

                        {/* Enterprise CTA */}
                        <div className="enterprise-cta">
                            <div className="enterprise-content">
                                <h3>Need more than 5 locations?</h3>
                                <p>We offer custom Enterprise plans for laundromat chains and franchises with volume discounts, dedicated infrastructure, and custom SLAs.</p>
                            </div>
                            <a href="#contact" className="btn btn-secondary">Contact Sales</a>
                        </div>
                    </div>
                </section>
            </main>

            {/* FOOTER */}
            <footer className="footer">
                <div className="container">
                    <div className="footer-grid">
                        <div className="footer-brand">
                            <Link href="/" className="footer-logo">
                                <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                    <path d="M20 2L36.66 11.5V30.5L20 40L3.34 30.5V11.5L20 2Z" fill="#F59E0B" />
                                    <ellipse cx="20" cy="22" rx="8" ry="10" fill="#1F2937" />
                                    <ellipse cx="20" cy="18" rx="6" ry="4" fill="#FCD34D" />
                                    <ellipse cx="20" cy="26" rx="6" ry="4" fill="#FCD34D" />
                                </svg>
                                The Laundry <span>Hive</span>
                            </Link>
                            <p>Affordable laundry management software for small and medium laundromats. No expensive hardware. No complicated setup.</p>
                        </div>

                        <div className="footer-column">
                            <h4>Product</h4>
                            <ul>
                                <li><a href="#features">Features</a></li>
                                <li><a href="#pricing">Pricing</a></li>
                                <li><a href="#compare">Compare</a></li>
                                <li><a href="#calculator">Income Calculator</a></li>
                                <li><a href="#demo">Live Demo</a></li>
                            </ul>
                        </div>

                        <div className="footer-column">
                            <h4>Programs</h4>
                            <ul>
                                <li><a href="#reseller">Reseller Program (30%)</a></li>
                                <li><a href="#affiliate">Affiliate Program (30%)</a></li>
                                <li><a href="#whitelabel">White Label</a></li>
                                <li><a href="#api">API Access</a></li>
                            </ul>
                        </div>

                        <div className="footer-column">
                            <h4>Support</h4>
                            <ul>
                                <li><a href="#help">Help Center</a></li>
                                <li><a href="#contact">Contact Us</a></li>
                                <li><a href="#status">System Status</a></li>
                                <li><a href="#changelog">Changelog</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="footer-bottom">
                        <p className="footer-copyright">© 2025 The Laundry Hive. All rights reserved.</p>
                        <div className="footer-legal">
                            <a href="/privacy">Privacy Policy</a>
                            <a href="/terms">Terms of Service</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div >
    );
}
