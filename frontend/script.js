// ===== GLOBAL VARIABLES =====
let walletConnected = false;
let userWallet = null;
let contributionData = [];
let isLoading = false;
let performanceMetrics = {};
let touchStartY = 0;
let touchStartX = 0;
let gestureThreshold = 50;

// ===== DOM ELEMENTS =====
const connectWalletBtn = document.getElementById('connectWalletBtn');
const startMissionBtn = document.getElementById('startMissionBtn');
const missionModal = document.getElementById('missionModal');
const modalTitle = document.getElementById('modalTitle');
const modalContent = document.getElementById('modalContent');
const nav = document.querySelector('.nav');

// ===== ENHANCED INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    showLoadingState();
    
    // Initialize in order with performance tracking
    initializePerformanceMonitoring();
    initializeEnhancedFeatures();
    initializeLucideIcons();
    initializeGlobalMap();
    initializeStats();
    initializeLeaderboard();
    setupEventListeners();
    setupAccessibility();
    setupTouchGestures();
    setupProgressiveEnhancement();
    
    // Setup wallet event listeners
    setupWalletEventListeners();
    
    // Check for stored wallet after a delay
    setTimeout(checkStoredWallet, 2000);
    
    // Animate elements
    animateStats();
    animateOnScroll();
    
    hideLoadingState();
});

// ===== PERFORMANCE MONITORING =====
function initializePerformanceMonitoring() {
    // Measure initial page load
    if (performance.mark) {
        performance.mark('atlasai-init-start');
    }
    
    // Monitor largest contentful paint
    if ('PerformanceObserver' in window) {
        const observer = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            entries.forEach((entry) => {
                if (entry.entryType === 'largest-contentful-paint') {
                    performanceMetrics.lcp = entry.startTime;
                }
                if (entry.entryType === 'first-input') {
                    performanceMetrics.fid = entry.processingStart - entry.startTime;
                }
            });
        });
        observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input'] });
    }
}

// ===== LOADING STATE MANAGEMENT =====
function showLoadingState() {
    // Add loading overlay
    const loadingOverlay = document.createElement('div');
    loadingOverlay.id = 'loadingOverlay';
    loadingOverlay.className = 'loading-overlay active';
    loadingOverlay.innerHTML = `
        <div class="loading-content">
            <div class="loading-spinner"></div>
            <p style="margin-top: 1rem; color: var(--neutral-400);">Initializing AtlasAI...</p>
        </div>
    `;
    document.body.appendChild(loadingOverlay);
}

function hideLoadingState() {
    const loadingOverlay = document.getElementById('loadingOverlay');
    if (loadingOverlay) {
        setTimeout(() => {
            loadingOverlay.classList.remove('active');
            setTimeout(() => {
                loadingOverlay.remove();
            }, 300);
        }, 500);
    }
}

// ===== MISSION TYPES =====
const missions = {
    capture: {
        title: "Capture Environment",
        description: "Take photos or videos of your surroundings",
        reward: "5-10 X402",
        icon: "camera",
        permission: "camera"
    },
    geotag: {
        title: "GeoTag Location",
        description: "Share precise GPS coordinates of interesting locations",
        reward: "1-5 X402",
        icon: "map-pin",
        permission: "location"
    },
    audio: {
        title: "Audio Sample",
        description: "Record short audio clips of your environment",
        reward: "3-7 X402",
        icon: "mic",
        permission: "microphone"
    }
};

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    initializeLucideIcons();
    initializeGlobalMap();
    initializeStats();
    initializeLeaderboard();
    setupEventListeners();
    animateStats();
});

// ===== ENHANCED FEATURES =====
function initializeEnhancedFeatures() {
    // Initialize intersection observer for animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
            }
        });
    }, { threshold: 0.1 });
    
    // Observe elements for animation
    document.querySelectorAll('.stat-card, .mission-card, .step-card, .token-card').forEach(el => {
        observer.observe(el);
    });
    
    // Initialize smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ===== ENHANCED ANIMATION SYSTEM =====
function animateStats() {
    const statElements = document.querySelectorAll('.stat-value');
    
    // Animate counting up
    statElements.forEach((element, index) => {
        setTimeout(() => {
            element.classList.add('animate-count');
            // Add number counting animation
            const finalValue = parseFloat(element.textContent.replace(/[^0-9.]/g, ''));
            if (!isNaN(finalValue)) {
                animateNumber(element, 0, finalValue, 2000, index);
            }
        }, index * 200);
    });
}

function animateNumber(element, start, end, duration, index) {
    const startTime = performance.now();
    const isDecimal = element.textContent.includes('.');
    
    function updateNumber(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = start + (end - start) * easeOut;
        
        if (isDecimal) {
            element.textContent = current.toFixed(1);
        } else {
            element.textContent = Math.floor(current).toLocaleString();
        }
        
        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        } else {
            element.classList.add('animate-complete');
        }
    }
    
    requestAnimationFrame(updateNumber);
}

// ===== SCROLL ANIMATIONS =====
function animateOnScroll() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const animationType = element.dataset.animate || 'fade-in';
                
                element.classList.add(`animate-${animationType}`);
                
                // Staggered animation for grouped elements
                const siblings = Array.from(element.parentElement.children);
                const index = siblings.indexOf(element);
                element.style.animationDelay = `${index * 0.1}s`;
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    document.querySelectorAll('[data-animate]').forEach(el => {
        observer.observe(el);
    });
}

// ===== ENHANCED NOTIFICATION SYSTEM =====
class ToastManager {
    constructor() {
        this.toasts = [];
        this.maxToasts = 3;
    }
    
    show(message, type = 'info', duration = 4000) {
        const toast = this.createToast(message, type);
        document.body.appendChild(toast);
        
        // Position toasts
        this.positionToast(toast);
        
        // Show animation
        setTimeout(() => toast.classList.add('show'), 100);
        
        // Auto remove
        setTimeout(() => {
            this.removeToast(toast);
        }, duration);
        
        this.toasts.push(toast);
        this.limitToasts();
    }
    
    createToast(message, type) {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        
        const icons = {
            success: 'check-circle',
            warning: 'alert-circle',
            error: 'x-circle',
            info: 'info'
        };
        
        toast.innerHTML = `
            <i data-lucide="${icons[type] || 'info'}" class="toast-icon"></i>
            <span class="toast-message">${message}</span>
            <button class="toast-close" onclick="toastManager.removeToast(this.parentElement)">
                <i data-lucide="x"></i>
            </button>
        `;
        
        return toast;
    }
    
    positionToast(toast) {
        const existingToasts = this.toasts;
        const index = existingToasts.length;
        const top = 20 + (index * 80);
        toast.style.top = `${top}px`;
    }
    
    removeToast(toast) {
        toast.classList.remove('show');
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
        
        // Remove from array
        const index = this.toasts.indexOf(toast);
        if (index > -1) {
            this.toasts.splice(index, 1);
        }
    }
    
    limitToasts() {
        while (this.toasts.length > this.maxToasts) {
            this.removeToast(this.toasts[0]);
        }
    }
}

const toastManager = new ToastManager();

// ===== TOUCH AND GESTURE SUPPORT =====
function setupTouchGestures() {
    let startY = 0;
    let startX = 0;
    let endY = 0;
    let endX = 0;
    
    document.addEventListener('touchstart', (e) => {
        startY = e.touches[0].clientY;
        startX = e.touches[0].clientX;
    }, { passive: true });
    
    document.addEventListener('touchend', (e) => {
        endY = e.changedTouches[0].clientY;
        endX = e.changedTouches[0].clientX;
        
        const deltaY = startY - endY;
        const deltaX = startX - endX;
        
        // Swipe up gesture
        if (deltaY > 50 && Math.abs(deltaX) < 30) {
            handleSwipeUp();
        }
        
        // Swipe down gesture
        if (deltaY < -50 && Math.abs(deltaX) < 30) {
            handleSwipeDown();
        }
    }, { passive: true });
}

function handleSwipeUp() {
    // Could trigger mission modal or scroll to next section
    const nextSection = document.querySelector('.how-it-works');
    if (nextSection && !document.querySelector('.modal-overlay.active')) {
        nextSection.scrollIntoView({ behavior: 'smooth' });
    }
}

function handleSwipeDown() {
    // Could trigger wallet connection or scroll to top
    const walletBtn = document.getElementById('connectWalletBtn');
    if (walletBtn && !walletConnected) {
        connectWallet();
    }
}

// ===== ACCESSIBILITY ENHANCEMENTS =====
function setupAccessibility() {
    // Add skip links for screen readers
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--primary-500);
        color: var(--neutral-950);
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 10000;
        transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', () => {
        skipLink.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Enhanced keyboard navigation
    document.addEventListener('keydown', (e) => {
        // ESC key closes modals
        if (e.key === 'Escape') {
            const activeModal = document.querySelector('.modal-overlay.active');
            if (activeModal) {
                closeModal();
            }
        }
        
        // Enter key triggers buttons
        if (e.key === 'Enter' && e.target.classList.contains('btn')) {
            e.target.click();
        }
    });
    
    // Add ARIA labels
    document.querySelectorAll('button').forEach(button => {
        if (!button.getAttribute('aria-label') && !button.textContent.trim()) {
            button.setAttribute('aria-label', 'Interactive button');
        }
    });
}

// ===== PROGRESSIVE ENHANCEMENT =====
function setupProgressiveEnhancement() {
    // Check for reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.documentElement.classList.add('reduce-motion');
    }
    
    // Check for touch support
    if ('ontouchstart' in window) {
        document.documentElement.classList.add('touch-device');
    }
    
    // Network status monitoring
    if ('navigator' in window && 'onLine' in navigator) {
        window.addEventListener('online', () => {
            toastManager.show('Connection restored', 'success');
        });
        
        window.addEventListener('offline', () => {
            toastManager.show('Connection lost - Some features may be limited', 'warning');
        });
    }
}

// ===== ENHANCED BUTTON INTERACTIONS =====
function addButtonEnhancements() {
    document.querySelectorAll('.btn').forEach(button => {
        // Add ripple effect
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Add ripple animation to CSS
const rippleCSS = `
<style>
@keyframes ripple {
    to {
        transform: scale(4);
        opacity: 0;
    }
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', rippleCSS);

// ===== ENHANCED SCROLL BEHAVIOR =====
function setupEnhancedScroll() {
    let lastScrollY = window.scrollY;
    let ticking = false;
    
    function updateScroll() {
        const scrollY = window.scrollY;
        
        // Hide/show navigation on scroll
        if (nav) {
            if (scrollY > lastScrollY && scrollY > 100) {
                nav.style.transform = 'translateY(-100%)';
            } else {
                nav.style.transform = 'translateY(0)';
            }
        }
        
        // Add scroll-based animations
        const scrolled = scrollY / window.innerHeight;
        document.documentElement.style.setProperty('--scroll-progress', scrolled);
        
        lastScrollY = scrollY;
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateScroll);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick, { passive: true });
}

// ===== ICON INITIALIZATION =====
function initializeLucideIcons() {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

// ===== GLOBAL MAP ANIMATION =====
function initializeGlobalMap() {
    const canvas = document.getElementById('globalMap');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Global data points
    const dataPoints = [];
    const numPoints = 50;
    
    // Generate random data points
    for (let i = 0; i < numPoints; i++) {
        dataPoints.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 4 + 2,
            alpha: Math.random() * 0.8 + 0.2,
            pulse: Math.random() * Math.PI * 2
        });
    }
    
    function animateMap() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Create gradient background
        const gradient = ctx.createRadialGradient(
            canvas.width / 2, canvas.height / 2, 0,
            canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height) / 2
        );
        gradient.addColorStop(0, 'rgba(0, 255, 255, 0.02)');
        gradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Animate data points
        dataPoints.forEach(point => {
            point.pulse += 0.05;
            const currentRadius = point.radius + Math.sin(point.pulse) * 2;
            const currentAlpha = point.alpha + Math.sin(point.pulse) * 0.3;
            
            // Draw pulsing circles
            ctx.beginPath();
            ctx.arc(point.x, point.y, currentRadius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 255, 255, ${currentAlpha})`;
            ctx.fill();
            
            // Draw outer glow
            ctx.beginPath();
            ctx.arc(point.x, point.y, currentRadius * 2, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(0, 255, 255, ${currentAlpha * 0.3})`;
            ctx.lineWidth = 2;
            ctx.stroke();
        });
        
        requestAnimationFrame(animateMap);
    }
    
    animateMap();
    
    // Handle window resize
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// ===== STATISTICS FUNCTIONALITY =====
function initializeStats() {
    // Initialize with realistic data
    const stats = {
        contributors: 1842069,
        dataCollected: 847.2,
        rewards: 284.7
    };
    
    updateStat('totalContributors', stats.contributors);
    updateStat('dataCollected', stats.dataCollected);
    updateStat('totalRewards', stats.rewards);
}

function updateStat(elementId, value) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    const formattedValue = formatNumber(value);
    element.textContent = formattedValue;
}

function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    } else {
        return num.toLocaleString();
    }
}

function animateStats() {
    const statElements = document.querySelectorAll('.stat-value');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'pulse 2s ease-in-out infinite';
            }
        });
    });
    
    statElements.forEach(el => observer.observe(el));
}

// ===== ENHANCED NAVIGATION SCROLL =====
setupEnhancedScroll();

// ===== WALLET FUNCTIONALITY =====
function setupEventListeners() {
    // Connect Wallet Button
    if (connectWalletBtn) {
        connectWalletBtn.addEventListener('click', connectWallet);
    }
    
    // Start Mission Button
    if (startMissionBtn) {
        startMissionBtn.addEventListener('click', () => {
            if (!walletConnected) {
                showNotification('Please connect your wallet first', 'warning');
                return;
            }
            openMissionModal();
        });
    }
    
    // Learn More Button
    const learnMoreBtn = document.getElementById('learnMoreBtn');
    if (learnMoreBtn) {
        learnMoreBtn.addEventListener('click', () => {
            document.querySelector('.how-it-works').scrollIntoView({
                behavior: 'smooth'
            });
        });
    }
    
    // Navigation links
    // ===== SECTION NAVIGATION SYSTEM =====
const sections = ['mission', 'stats', 'leaderboard', 'explorer'];

function initializeSectionNavigation() {
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            showSection(targetId);
        });
    });
}

function showSection(sectionId) {
    // Hide all sections
    sections.forEach(id => {
        const section = document.getElementById(id);
        if (section) {
            section.style.display = 'none';
            section.classList.remove('active');
        }
    });
    
    // Show target section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.style.display = 'block';
        targetSection.classList.add('active');
        
        // Update navigation active state
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${sectionId}`) {
                link.classList.add('active');
            }
        });
        
        // Initialize section-specific features
        if (sectionId === 'stats') {
            loadStatsData();
        } else if (sectionId === 'explorer') {
            loadExplorerData();
        }
    }
}

// Initialize section navigation
initializeSectionNavigation();

// Show default section (mission) on page load
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        showSection('mission');
    }, 100);
});
    
    // Modal close on overlay click
    if (missionModal) {
        missionModal.addEventListener('click', (e) => {
            if (e.target === missionModal) {
                closeModal();
            }
        });
    }
}

// ===== ULTRA-ROBUST WALLET DETECTION =====
async function ultraRobustWalletDetection() {
    const maxRetries = 5;
    const retryDelay = 800;
    const detectionMethods = [
        {
            name: 'Primary Check',
            test: () => window.solana?.isPhantom === true,
            description: 'Standard Phantom detection'
        },
        {
            name: 'Method Check',
            test: () => window.solana?.connect && typeof window.solana.connect === 'function',
            description: 'Connect method availability'
        },
        {
            name: 'Storage Check',
            test: () => {
                const keys = Object.keys(localStorage);
                return keys.some(key => 
                    key.toLowerCase().includes('phantom') || 
                    key.toLowerCase().includes('solana')
                );
            },
            description: 'LocalStorage indicators'
        },
        {
            name: 'Event Check',
            test: () => {
                return new Promise((resolve) => {
                    const timer = setTimeout(() => resolve(false), 1000);
                    window.addEventListener('load', () => {
                        clearTimeout(timer);
                        resolve(window.solana?.isPhantom === true);
                    }, { once: true });
                });
            },
            description: 'Post-load detection'
        },
        {
            name: 'Polling Check',
            test: () => {
                return new Promise((resolve) => {
                    let attempts = 0;
                    const maxAttempts = 5;
                    const poll = setInterval(() => {
                        attempts++;
                        if (window.solana?.isPhantom === true || attempts >= maxAttempts) {
                            clearInterval(poll);
                            resolve(window.solana?.isPhantom === true);
                        }
                    }, 200);
                });
            },
            description: 'Polling detection method'
        }
    ];

    for (let retry = 0; retry < maxRetries; retry++) {
        for (const method of detectionMethods) {
            try {
                const result = method.test();
                if (result === true || (result && await result)) {
                    return {
                        found: true,
                        method: method.name,
                        description: method.description,
                        attempts: retry + 1
                    };
                }
            } catch (error) {
                console.warn(`Detection method ${method.name} failed:`, error);
                continue;
            }
        }
        
        // Wait before retry with exponential backoff
        if (retry < maxRetries - 1) {
            const delay = retryDelay * Math.pow(1.5, retry);
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }

    return {
        found: false,
        reason: 'No wallet detected after comprehensive detection attempts',
        attempts: maxRetries,
        methods: detectionMethods.length,
        suggestions: [
            '1. Open Chrome Extensions (chrome://extensions/)',
            '2. Find "Phantom" and ensure it is ENABLED',
            '3. Refresh this page completely (Ctrl+F5 or Cmd+Shift+R)',
            '4. Check browser console for errors (F12 → Console)',
            '5. Try closing and reopening the browser',
            '6. If using incognito mode, enable extension for incognito',
            '7. Check if antivirus is blocking extension',
            '8. Try creating a new browser profile'
        ],
        debugInfo: {
            userAgent: navigator.userAgent,
            protocol: location.protocol,
            hasLocalStorage: !!localStorage,
            hasWindowSolana: !!window.solana,
            localStorageKeys: Object.keys(localStorage).filter(k => 
                k.toLowerCase().includes('phantom') || k.toLowerCase().includes('solana')
            )
        }
    };
}

function showAdvancedWalletError(errorInfo) {
    const suggestions = errorInfo.suggestions || [];
    const debugInfo = errorInfo.debugInfo || {};
    
    // Create detailed error message
    let message = `${errorInfo.reason}\n\n🔧 QUICK FIXES:\n${suggestions.slice(0, 3).map(s => `• ${s}`).join('\n')}\n\n🔍 DETAILED DEBUG:`;
    
    Object.entries(debugInfo).forEach(([key, value]) => {
        if (Array.isArray(value)) {
            message += `\n• ${key}: ${value.join(', ') || 'None'}`;
        } else {
            message += `\n• ${key}: ${value}`;
        }
    });
    
    showNotification(message, 'error', 12000);
    
    // Create interactive troubleshooting section
    setTimeout(() => {
        createInteractiveTroubleshooting();
    }, 2000);
}

function createInteractiveTroubleshooting() {
    const notification = document.querySelector('.notification.error');
    if (!notification) return;
    
    const troubleshootingSection = document.createElement('div');
    troubleshootingSection.className = 'troubleshooting-section';
    troubleshootingSection.innerHTML = `
        <div style="margin-top: 15px; padding: 15px; background: rgba(255,255,255,0.1); border-radius: 8px;">
            <h4 style="margin: 0 0 10px 0; color: #fff;">🛠️ Interactive Troubleshooting</h4>
            <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                <button onclick="openExtensionsPage()" class="btn btn-secondary" style="font-size: 12px; padding: 8px 12px;">
                    🔌 Open Extensions
                </button>
                <button onclick="clearCacheAndReload()" class="btn btn-warning" style="font-size: 12px; padding: 8px 12px;">
                    🔄 Clear & Reload
                </button>
                <button onclick="openDiagnosticTool()" class="btn btn-info" style="font-size: 12px; padding: 8px 12px;">
                    🔍 Run Diagnostics
                </button>
                <button onclick="showManualConnectionSteps()" class="btn btn-primary" style="font-size: 12px; padding: 8px 12px;">
                    📋 Manual Steps
                </button>
            </div>
        </div>
    `;
    
    notification.appendChild(troubleshootingSection);
    initializeLucideIcons();
}

// Global troubleshooting functions
window.openExtensionsPage = function() {
    window.open('chrome://extensions/', '_blank');
};

window.clearCacheAndReload = function() {
    if (confirm('This will clear all data and reload the page. Continue?')) {
        localStorage.clear();
        sessionStorage.clear();
        location.reload();
    }
};

window.openDiagnosticTool = function() {
    window.open('./enhanced-wallet-diagnostic.html', '_blank');
};

window.showManualConnectionSteps = function() {
    const steps = `
MANUAL CONNECTION STEPS:

1. 🔌 Open Phantom Extension
   • Click the Phantom icon in your browser toolbar
   
2. 🔗 Connect to Website
   • Click "Connect" in the Phantom popup
   • Select this website (AtlasAI)
   • Click "Connect"
   
3. ✅ Verify Connection
   • Extension should show "Connected"
   • Button should show your wallet address
   
4. 🔄 If Still Not Working:
   • Refresh this page (Ctrl+F5)
   • Try closing and reopening the browser
   • Disable and re-enable the extension
    `;
    
    alert(steps);
};

// Enhanced wallet event listeners
function setupWalletEventListeners() {
    // Enhanced solana detection with multiple approaches
    const enhancedCheckSolana = () => {
        if (window.solana) {
            console.log('Solana object detected, setting up event listeners');
            
            // Multi-event listener setup with error handling
            const setupEventListeners = (wallet) => {
                try {
                    // Account change listener
                    if (typeof wallet.on === 'function') {
                        wallet.on('accountChanged', (publicKey) => {
                            console.log('Account changed event:', publicKey);
                            if (publicKey) {
                                walletConnected = true;
                                userWallet = publicKey.toString();
                                updateWalletUI();
                                showNotification('Wallet account changed', 'info');
                            } else {
                                walletConnected = false;
                                userWallet = null;
                                updateWalletUI();
                                showNotification('Wallet disconnected', 'warning');
                            }
                        });
                        
                        wallet.on('connect', (publicKey) => {
                            console.log('Connect event:', publicKey);
                            walletConnected = true;
                            if (publicKey) {
                                userWallet = publicKey.toString();
                                updateWalletUI();
                                showNotification('Wallet connected via event', 'success');
                            }
                        });
                        
                        wallet.on('disconnect', () => {
                            console.log('Disconnect event');
                            walletConnected = false;
                            userWallet = null;
                            localStorage.removeItem('atlasai_wallet');
                            localStorage.removeItem('atlasai_last_connection');
                            updateWalletUI();
                            showNotification('Wallet disconnected', 'warning');
                        });
                    }
                } catch (error) {
                    console.error('Event listener setup failed:', error);
                }
            };
            
            setupEventListeners(window.solana);
            
            // Also check if it's specifically Phantom
            if (window.solana.isPhantom) {
                console.log('Phantom wallet confirmed');
            }
            
        } else {
            // Progressive detection with exponential backoff
            let attempts = 0;
            const maxAttempts = 10;
            const baseDelay = 500;
            
            const tryAgain = () => {
                attempts++;
                const delay = baseDelay * Math.pow(1.5, Math.min(attempts - 1, 5));
                
                if (window.solana) {
                    console.log('Solana object found after', attempts, 'attempts');
                    enhancedCheckSolana();
                } else if (attempts < maxAttempts) {
                    setTimeout(tryAgain, delay);
                } else {
                    console.log('Failed to detect Solana object after', maxAttempts, 'attempts');
                    // Start periodic checking
                    setInterval(() => {
                        if (window.solana && !window._solanaDetected) {
                            window._solanaDetected = true;
                            console.log('Late Solana object detection');
                            enhancedCheckSolana();
                        }
                    }, 2000);
                }
            };
            
            setTimeout(tryAgain, baseDelay);
        }
    };
    
    enhancedCheckSolana();
    
    // Listen for window load events to catch late-loading extensions
    window.addEventListener('load', () => {
        if (!window.solana) {
            console.log('Checking for late-loaded Solana object');
            setTimeout(enhancedCheckSolana, 1000);
        }
    });
    
    // Listen for visibility changes (when user switches tabs)
    document.addEventListener('visibilitychange', () => {
        if (!document.hidden && window.solana && !walletConnected) {
            console.log('Page became visible, checking wallet status');
            setTimeout(enhancedCheckSolana, 500);
        }
    });
}

async function connectWallet() {
    try {
        showLoadingState();
        
        // Ultra-robust wallet detection
        const detectionResult = await ultraRobustWalletDetection();
        if (!detectionResult.found) {
            hideLoadingState();
            showAdvancedWalletError(detectionResult);
            return;
        }
        
        console.log('Wallet detected using:', detectionResult);
        
        // Request connection with timeout
        const connectionTimeout = new Promise((_, reject) => {
            setTimeout(() => reject(new Error('Connection timeout')), 10000);
        });
        
        const connectionPromise = window.solana.connect();
        const response = await Promise.race([connectionPromise, connectionTimeout]);
        
        walletConnected = true;
        userWallet = response.publicKey.toString();
        
        // Update UI
        updateWalletUI();
        showNotification(`Wallet connected successfully using ${detectionResult.method}!`, 'success');
        
        // Store wallet info
        localStorage.setItem('atlasai_wallet', userWallet);
        localStorage.setItem('atlasai_last_connection', new Date().toISOString());
        
        // Setup automatic reconnection check
        setupAutoReconnection();
        
    } catch (error) {
        console.error('Wallet connection failed:', error);
        hideLoadingState();
        
        // Handle specific error types
        if (error.name === 'UserRejectedRequestError') {
            showNotification('Connection request rejected. Please approve the connection in Phantom extension and try again.', 'warning');
        } else if (error.message === 'Connection timeout') {
            showNotification('Connection timeout. Please check your Phantom extension and try again.', 'error');
        } else if (error.message.includes('not found') || error.message.includes('undefined')) {
            showAdvancedWalletError({
                found: false,
                reason: 'Extension not properly loaded during connection',
                suggestions: [
                    'Refresh the page completely',
                    'Check if Phantom extension is enabled',
                    'Try manual connection via extension first'
                ]
            });
        } else {
            showNotification(`Connection failed: ${error.message}. Please try again.`, 'error');
        }
    } finally {
        hideLoadingState();
    }
}

function setupAutoReconnection() {
    // Check for reconnection every 30 seconds
    setInterval(async () => {
        if (walletConnected && !window.solana) {
            console.log('Wallet connection lost, attempting reconnection...');
            try {
                const response = await window.solana.connect();
                walletConnected = true;
                userWallet = response.publicKey.toString();
                updateWalletUI();
                showNotification('Wallet reconnected', 'info');
            } catch (error) {
                console.log('Reconnection failed:', error);
                walletConnected = false;
                userWallet = null;
                localStorage.removeItem('atlasai_wallet');
                updateWalletUI();
            }
        }
    }, 30000);
}

function updateWalletUI() {
    if (connectWalletBtn) {
        const shortWallet = userWallet ? `${userWallet.slice(0, 4)}...${userWallet.slice(-4)}` : '';
        connectWalletBtn.innerHTML = `
            <i data-lucide="check-circle"></i>
            ${shortWallet}
        `;
        initializeLucideIcons();
    }
}

async function checkStoredWallet() {
    const storedWallet = localStorage.getItem('atlasai_wallet');
    const lastConnection = localStorage.getItem('atlasai_last_connection');
    
    if (storedWallet) {
        // Check if we have a recent connection (within 1 hour)
        if (lastConnection) {
            const connectionTime = new Date(lastConnection);
            const now = new Date();
            const timeDiff = now - connectionTime;
            const oneHour = 60 * 60 * 1000;
            
            if (timeDiff > oneHour) {
                console.log('Stored wallet connection too old, removing');
                localStorage.removeItem('atlasai_wallet');
                localStorage.removeItem('atlasai_last_connection');
                return;
            }
        }
        
        // Try to reconnect with enhanced detection
        try {
            const detectionResult = await ultraRobustWalletDetection();
            if (detectionResult.found && window.solana?.isPhantom) {
                const response = await window.solana.connect();
                walletConnected = true;
                userWallet = response.publicKey.toString();
                updateWalletUI();
                showNotification('Welcome back! Wallet reconnected', 'success');
                console.log('Wallet reconnected successfully');
            } else {
                console.log('Cannot reconnect - wallet not available');
                localStorage.removeItem('atlasai_wallet');
                localStorage.removeItem('atlasai_last_connection');
            }
        } catch (error) {
            console.log('Stored wallet reconnect failed:', error);
            localStorage.removeItem('atlasai_wallet');
            localStorage.removeItem('atlasai_last_connection');
            
            // Only show notification if it was a genuine connection error
            if (error.name !== 'UserRejectedRequestError') {
                showNotification('Previous wallet connection expired. Please connect again.', 'info');
            }
        }
    }
}

// ===== MISSION FUNCTIONALITY =====
function startMission(missionType) {
    if (!walletConnected) {
        showNotification('Please connect your wallet first', 'warning');
        return;
    }
    
    const mission = missions[missionType];
    if (!mission) return;
    
    openMissionModal(missionType);
}

function openMissionModal(missionType) {
    if (missionType) {
        const mission = missions[missionType];
        modalTitle.textContent = mission.title;
        modalContent.innerHTML = getMissionContent(missionType);
    } else {
        modalTitle.textContent = 'Choose Your Mission';
        modalContent.innerHTML = getMissionSelection();
    }
    
    missionModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    initializeLucideIcons();
}

function closeModal() {
    missionModal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function getMissionContent(missionType) {
    const mission = missions[missionType];
    
    switch (missionType) {
        case 'capture':
            return `
                <div class="mission-interface">
                    <h4>Capture Environment Mission</h4>
                    <p>Take a photo or video of your surroundings. The better the quality, the higher your reward!</p>
                    <div class="mission-actions">
                        <button class="mission-action-btn" onclick="requestCameraPermission()">
                            <i data-lucide="camera"></i>
                            Take Photo
                        </button>
                        <button class="mission-action-btn" onclick="requestCameraPermission(true)">
                            <i data-lucide="video"></i>
                            Record Video
                        </button>
                    </div>
                    <div class="mission-info">
                        <p><strong>Reward:</strong> ${mission.reward}</p>
                        <p><strong>Requirements:</strong> High resolution, good lighting, clear subject</p>
                    </div>
                </div>
            `;
            
        case 'geotag':
            return `
                <div class="mission-interface">
                    <h4>GeoTag Location Mission</h4>
                    <p>Share precise GPS coordinates of an interesting or important location.</p>
                    <div class="mission-actions">
                        <button class="mission-action-btn" onclick="requestLocationPermission()">
                            <i data-lucide="map-pin"></i>
                            Get Current Location
                        </button>
                    </div>
                    <div class="mission-info">
                        <p><strong>Reward:</strong> ${mission.reward}</p>
                        <p><strong>Requirements:</strong> Accurate GPS coordinates, interesting location</p>
                    </div>
                </div>
            `;
            
        case 'audio':
            return `
                <div class="mission-interface">
                    <h4>Audio Sample Mission</h4>
                    <p>Record a short audio clip of your environment or surroundings.</p>
                    <div class="mission-actions">
                        <button class="mission-action-btn" onclick="requestMicrophonePermission()">
                            <i data-lucide="mic"></i>
                            Start Recording
                        </button>
                    </div>
                    <div class="mission-info">
                        <p><strong>Reward:</strong> ${mission.reward}</p>
                        <p><strong>Requirements:</strong> Clear audio, minimum 10 seconds, good quality</p>
                    </div>
                </div>
            `;
            
        default:
            return '<p>Mission not found</p>';
    }
}

function getMissionSelection() {
    return `
        <div class="mission-selection">
            <h4>Choose Your Mission Type</h4>
            <div class="mission-options">
                <div class="mission-option" onclick="startMission('capture')">
                    <i data-lucide="camera"></i>
                    <h5>Capture Environment</h5>
                    <p>Photos & Videos</p>
                </div>
                <div class="mission-option" onclick="startMission('geotag')">
                    <i data-lucide="map-pin"></i>
                    <h5>GeoTag Location</h5>
                    <p>GPS Coordinates</p>
                </div>
                <div class="mission-option" onclick="startMission('audio')">
                    <i data-lucide="mic"></i>
                    <h5>Audio Sample</h5>
                    <p>Sound Recording</p>
                </div>
            </div>
        </div>
    `;
}

// ===== PERMISSION REQUESTS =====
async function requestCameraPermission(isVideo = false) {
    try {
        showNotification('Requesting camera access...', 'warning');
        
        const constraints = isVideo ? 
            { video: true, audio: true } : 
            { video: true };
            
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        
        // Stop the stream after getting permission
        stream.getTracks().forEach(track => track.stop());
        
        // Simulate data collection
        simulateDataCollection('camera', isVideo);
        showNotification('Camera access granted! Data collected successfully.', 'success');
        closeModal();
        
    } catch (error) {
        console.error('Camera permission denied:', error);
        showNotification('Camera access denied. Please allow camera permissions.', 'error');
    }
}

async function requestLocationPermission() {
    try {
        showNotification('Requesting location access...', 'warning');
        
        const position = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject, {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 60000
            });
        });
        
        // Simulate data collection
        simulateDataCollection('location', position);
        showNotification('Location captured! GPS coordinates collected successfully.', 'success');
        closeModal();
        
    } catch (error) {
        console.error('Location permission denied:', error);
        showNotification('Location access denied. Please allow location permissions.', 'error');
    }
}

async function requestMicrophonePermission() {
    try {
        showNotification('Requesting microphone access...', 'warning');
        
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        
        // Stop the stream after getting permission
        stream.getTracks().forEach(track => track.stop());
        
        // Simulate data collection
        simulateDataCollection('microphone');
        showNotification('Microphone access granted! Audio recorded successfully.', 'success');
        closeModal();
        
    } catch (error) {
        console.error('Microphone permission denied:', error);
        showNotification('Microphone access denied. Please allow microphone permissions.', 'error');
    }
}

// ===== DATA COLLECTION SIMULATION =====
function simulateDataCollection(type, data = null) {
    // Simulate AI validation
    setTimeout(() => {
        const score = Math.floor(Math.random() * 30) + 70; // Score between 70-100
        const reward = calculateReward(score);
        
        // Add to contribution history
        const contribution = {
            id: Date.now(),
            type: type,
            score: score,
            reward: reward,
            timestamp: new Date()
        };
        
        contributionData.push(contribution);
        
        // Update stats
        updateContributionStats();
        showRewardNotification(reward, score);
        
    }, 2000);
}

function calculateReward(score) {
    if (score >= 90) return 10;
    if (score >= 70) return 5;
    return 1;
}

function updateContributionStats() {
    // Update total data collected
    const currentData = parseFloat(document.getElementById('dataCollected').textContent);
    const newData = currentData + 0.1;
    updateStat('dataCollected', newData);
    
    // Update total rewards
    const currentRewards = parseFloat(document.getElementById('totalRewards').textContent);
    const newRewards = currentRewards + 0.1;
    updateStat('totalRewards', newRewards);
}

function showRewardNotification(reward, score) {
    const notification = document.createElement('div');
    notification.className = 'reward-notification';
    notification.innerHTML = `
        <div class="reward-content">
            <i data-lucide="gift"></i>
            <div class="reward-text">
                <h4>Mission Completed!</h4>
                <p>You earned ${reward} X402 tokens</p>
                <p>Quality Score: ${score}/100</p>
            </div>
        </div>
    `;
    
    document.body.appendChild(notification);
    setTimeout(() => notification.classList.add('show'), 100);
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => document.body.removeChild(notification), 300);
    }, 3000);
}

// ===== LEADERBOARD =====
function initializeLeaderboard() {
    const mockData = [
        { rank: 1, address: "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU", contributions: 1247, rewards: 15680 },
        { rank: 2, address: "9mKqY6QwEvV8RHBZYq7gGH3nEKtW1yY1gT9f2nL6R5W3E", contributions: 1089, rewards: 13450 },
        { rank: 3, address: "5nH8mN2jP7kL4vR6wY8zA3xC1sQ9dE6fB2tG5hJ7mN4oP", contributions: 967, rewards: 12100 },
        { rank: 4, address: "2wE9sD4fH1gL6mN8bV3xC5zA7sQ9dE2fJ4hK6nO8pR1tW", contributions: 834, rewards: 10200 },
        { rank: 5, address: "8vX2sA4fG1hL6mN9cV3zB5xK7sQ1dE3fJ5hN7oP9rT2uW", contributions: 756, rewards: 9200 }
    ];
    
    renderLeaderboard(mockData);
}

function renderLeaderboard(data) {
    const leaderboardRows = document.getElementById('leaderboardRows');
    if (!leaderboardRows) return;
    
    leaderboardRows.innerHTML = data.map(entry => `
        <div class="leaderboard-row">
            <div class="rank-col">#${entry.rank}</div>
            <div class="address-col">${entry.address}</div>
            <div class="contributions-col">${entry.contributions.toLocaleString()}</div>
            <div class="rewards-col">${entry.rewards.toLocaleString()}</div>
        </div>
    `).join('');
}

// ===== ENHANCED NOTIFICATION SYSTEM =====
function showNotification(message, type = 'info', duration = 4000) {
    toastManager.show(message, type, duration);
}

// Legacy compatibility
function showNotificationLegacy(message, type = 'info') {
    showNotification(message, type);
}

// ===== GLOBAL MAP CANVAS SCRIPT =====
function initGlobalMap() {
    const canvas = document.getElementById('globalMap');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let width, height;
    
    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    }
    
    resize();
    window.addEventListener('resize', resize);
    
    const dataPoints = [];
    for (let i = 0; i < 30; i++) {
        dataPoints.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            radius: Math.random() * 3 + 1,
            alpha: Math.random() * 0.5 + 0.2
        });
    }
    
    function animate() {
        ctx.clearRect(0, 0, width, height);
        
        // Update and draw points
        dataPoints.forEach(point => {
            point.x += point.vx;
            point.y += point.vy;
            
            // Bounce off edges
            if (point.x < 0 || point.x > width) point.vx *= -1;
            if (point.y < 0 || point.y > height) point.vy *= -1;
            
            // Draw point
            ctx.beginPath();
            ctx.arc(point.x, point.y, point.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 255, 255, ${point.alpha})`;
            ctx.fill();
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

// ===== PHANTOM WALLET INTEGRATION =====
function checkPhantomWallet() {
    if (window.solana && window.solana.isPhantom) {
        return true;
    }
    return false;
}

// Listen for wallet changes
if (window.solana) {
    window.solana.on('accountChanged', (publicKey) => {
        if (publicKey) {
            walletConnected = true;
            userWallet = publicKey.toString();
            updateWalletUI();
        } else {
            walletConnected = false;
            userWallet = null;
        }
    });
}

// ===== CSS FOR DYNAMIC ELEMENTS =====
const additionalCSS = `
<style>
/* ===== SECTION MANAGEMENT ===== */
#mission, #stats, #explorer, #leaderboard {
    transition: opacity 300ms ease, display 300ms ease;
}

/* Hide non-active sections by default */
#stats, #explorer, #leaderboard {
    display: none;
}

/* Show active sections */
#mission.active, #stats.active, #explorer.active, #leaderboard.active {
    display: block;
}

/* Navigation active state */
.nav-link.active {
    color: var(--primary-400) !important;
    font-weight: 600;
}

.mission-interface {
    text-align: center;
}

.mission-actions {
    display: flex;
    gap: 1rem;
    margin: 1.5rem 0;
    justify-content: center;
}

.mission-action-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    background: var(--primary-500);
    color: var(--neutral-950);
    border: none;
    border-radius: var(--radius-md);
    font-weight: 600;
    cursor: pointer;
    transition: all 200ms ease;
}

.mission-action-btn:hover {
    background: var(--primary-700);
    transform: translateY(-2px);
}

.mission-info {
    background: var(--neutral-800);
    padding: 1rem;
    border-radius: var(--radius-md);
    margin-top: 1rem;
}

.mission-selection h4 {
    text-align: center;
    margin-bottom: 1.5rem;
    color: var(--neutral-100);
}

.mission-options {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1rem;
}

.mission-option {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1.5rem;
    background: var(--neutral-800);
    border: 1px solid var(--neutral-800);
    border-radius: var(--radius-md);
    cursor: pointer;
    transition: all 200ms ease;
    text-align: center;
}

.mission-option:hover {
    border-color: var(--primary-500);
    background: var(--neutral-700);
    transform: translateY(-2px);
}

.mission-option i {
    color: var(--primary-500);
    margin-bottom: 0.5rem;
}

.mission-option h5 {
    color: var(--neutral-100);
    margin-bottom: 0.25rem;
    font-size: 14px;
}

.mission-option p {
    color: var(--neutral-400);
    font-size: 12px;
}

.notification {
    position: fixed;
    top: 100px;
    right: 20px;
    background: var(--neutral-900);
    border: 1px solid var(--neutral-800);
    border-radius: var(--radius-md);
    padding: 1rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    z-index: 3000;
    transform: translateX(400px);
    transition: transform 300ms ease;
    max-width: 300px;
}

.notification.show {
    transform: translateX(0);
}

.notification-success {
    border-color: var(--success);
    color: var(--success);
}

.notification-warning {
    border-color: var(--warning);
    color: var(--warning);
}

.notification-error {
    border-color: var(--error);
    color: var(--error);
}

.reward-notification {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0.8);
    background: var(--neutral-900);
    border: 2px solid var(--primary-500);
    border-radius: var(--radius-lg);
    padding: 2rem;
    z-index: 4000;
    opacity: 0;
    transition: all 300ms ease;
}

.reward-notification.show {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
}

/* ===== STATS SECTION STYLES ===== */
.stats-section {
    padding: 4rem 0;
    background: linear-gradient(135deg, var(--neutral-950) 0%, var(--neutral-900) 100%);
    min-height: 100vh;
}

.stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
    margin-bottom: 3rem;
}

.stat-card {
    background: var(--neutral-800);
    border: 1px solid var(--neutral-700);
    border-radius: var(--radius-lg);
    padding: 1.5rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    transition: all 300ms ease;
}

.stat-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
    border-color: var(--primary-500);
}

.stat-icon {
    width: 60px;
    height: 60px;
    background: linear-gradient(135deg, var(--primary-500), var(--primary-600));
    border-radius: var(--radius-md);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 1.5rem;
}

.stat-content {
    flex: 1;
}

.stat-value {
    font-size: 2rem;
    font-weight: 700;
    color: var(--neutral-100);
    margin: 0;
    line-height: 1;
}

.stat-label {
    color: var(--neutral-400);
    margin: 0.25rem 0;
    font-size: 0.875rem;
}

.stat-change {
    font-size: 0.75rem;
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius-sm);
    font-weight: 500;
}

.stat-change.positive {
    background: var(--success-500);
    color: white;
}

.activity-feed {
    background: var(--neutral-800);
    border: 1px solid var(--neutral-700);
    border-radius: var(--radius-lg);
    padding: 1.5rem;
    margin-top: 2rem;
}

.activity-feed h3 {
    color: var(--neutral-100);
    margin-bottom: 1rem;
    font-size: 1.25rem;
}

.feed-items {
    max-height: 300px;
    overflow-y: auto;
}

.feed-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem 0;
    border-bottom: 1px solid var(--neutral-700);
}

.feed-item:last-child {
    border-bottom: none;
}

.feed-icon {
    width: 32px;
    height: 32px;
    background: var(--primary-500);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 0.875rem;
    flex-shrink: 0;
}

.feed-content {
    flex: 1;
}

.feed-message {
    color: var(--neutral-200);
    margin: 0 0 0.25rem 0;
    font-size: 0.875rem;
}

.feed-time {
    color: var(--neutral-500);
    font-size: 0.75rem;
}

/* ===== EXPLORER SECTION STYLES ===== */
.explorer-section {
    padding: 4rem 0;
    background: var(--neutral-950);
    min-height: 100vh;
}

.explorer-controls {
    display: flex;
    gap: 1rem;
    margin-bottom: 2rem;
    flex-wrap: wrap;
}

.search-bar {
    position: relative;
    flex: 1;
    min-width: 300px;
}

.search-bar i {
    position: absolute;
    left: 0.75rem;
    top: 50%;
    transform: translateY(-50%);
    color: var(--neutral-500);
}

.search-bar input {
    width: 100%;
    padding: 0.75rem 0.75rem 0.75rem 2.5rem;
    background: var(--neutral-800);
    border: 1px solid var(--neutral-700);
    border-radius: var(--radius-md);
    color: var(--neutral-200);
    font-size: 0.875rem;
}

.search-bar input:focus {
    outline: none;
    border-color: var(--primary-500);
    box-shadow: 0 0 0 2px rgba(var(--primary-500), 0.2);
}

.filter-buttons {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
}

.filter-btn {
    padding: 0.5rem 1rem;
    background: var(--neutral-800);
    border: 1px solid var(--neutral-700);
    border-radius: var(--radius-md);
    color: var(--neutral-300);
    font-size: 0.875rem;
    cursor: pointer;
    transition: all 200ms ease;
}

.filter-btn:hover {
    background: var(--neutral-700);
}

.filter-btn.active {
    background: var(--primary-500);
    border-color: var(--primary-500);
    color: white;
}

.explorer-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
}

.explorer-item {
    background: var(--neutral-800);
    border: 1px solid var(--neutral-700);
    border-radius: var(--radius-lg);
    overflow: hidden;
    transition: all 300ms ease;
}

.explorer-item:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.4);
    border-color: var(--primary-500);
}

.explorer-thumbnail {
    position: relative;
    height: 200px;
    overflow: hidden;
}

.explorer-thumbnail img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.explorer-type-badge {
    position: absolute;
    top: 0.75rem;
    right: 0.75rem;
    background: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius-sm);
    font-size: 0.75rem;
    display: flex;
    align-items: center;
    gap: 0.25rem;
    backdrop-filter: blur(4px);
}

.explorer-content {
    padding: 1rem;
}

.explorer-title {
    color: var(--neutral-100);
    margin: 0 0 0.5rem 0;
    font-size: 1rem;
    font-weight: 600;
}

.explorer-description {
    color: var(--neutral-400);
    margin: 0 0 0.75rem 0;
    font-size: 0.875rem;
    line-height: 1.4;
}

.explorer-meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
    font-size: 0.75rem;
    color: var(--neutral-500);
}

.explorer-location,
.explorer-score {
    display: flex;
    align-items: center;
    gap: 0.25rem;
}

.explorer-wallet {
    color: var(--neutral-600);
    font-size: 0.75rem;
}

.loading-placeholder,
.no-data-placeholder,
.error-placeholder {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 3rem;
    color: var(--neutral-500);
    text-align: center;
}

.loading-placeholder i {
    margin-bottom: 1rem;
    color: var(--primary-500);
}

.animate-spin {
    animation: spin 1s linear infinite;
}

@keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
}

/* ===== RESPONSIVE STYLES ===== */
@media (max-width: 768px) {
    .explorer-controls {
        flex-direction: column;
    }
    
    .search-bar {
        min-width: 100%;
    }
    
    .explorer-grid {
        grid-template-columns: 1fr;
    }
    
    .stats-grid {
        grid-template-columns: 1fr;
    }
}

.reward-content {
    display: flex;
    align-items: center;
    gap: 1rem;
    text-align: center;
}

.reward-content i {
    color: var(--primary-500);
    font-size: 2rem;
}

.reward-text h4 {
    color: var(--neutral-100);
    margin-bottom: 0.5rem;
}

.reward-text p {
    color: var(--neutral-400);
    font-size: 14px;
}
</style>
`;

// Inject additional CSS
document.head.insertAdjacentHTML('beforeend', additionalCSS);

// ===== STATS FUNCTIONALITY =====
async function loadStatsData() {
    try {
        const response = await fetch('/api/stats');
        const result = await response.json();
        
        if (result.success && result.data) {
            updateStatsDisplay(result.data);
            loadActivityFeed();
        }
    } catch (error) {
        console.error('Error loading stats:', error);
    }
}

function updateStatsDisplay(data) {
    // Update individual stat values
    const updates = {
        'stat-total-users': formatNumber(data.totalUsers || 0),
        'stat-total-missions': formatNumber(data.totalMissions || 0),
        'stat-total-contributions': formatNumber(data.totalContributions || 0),
        'stat-x402-distributed': formatNumber(data.x402Distributed || 0),
        'stat-ipfs-uploads': formatNumber(data.ipfsUploads || 0),
        'stat-ai-validations': formatNumber(data.aiValidations || 0)
    };
    
    Object.entries(updates).forEach(([id, value]) => {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = value;
        }
    });
}

function loadActivityFeed() {
    const activityFeed = document.getElementById('activityFeed');
    if (!activityFeed) return;
    
    const activities = [
        { type: 'contribution', message: 'New image uploaded from NYC', time: '2m ago' },
        { type: 'reward', message: '15 X402 tokens earned for video validation', time: '5m ago' },
        { type: 'user', message: 'New user joined the network', time: '8m ago' },
        { type: 'ai', message: 'AI validated 47 new data points', time: '12m ago' },
        { type: 'contribution', message: 'Location data submitted from Central Park', time: '15m ago' }
    ];
    
    activityFeed.innerHTML = activities.map(activity => `
        <div class="feed-item" data-animate="fade-in">
            <div class="feed-icon">
                <i data-lucide="${getActivityIcon(activity.type)}"></i>
            </div>
            <div class="feed-content">
                <p class="feed-message">${activity.message}</p>
                <span class="feed-time">${activity.time}</span>
            </div>
        </div>
    `).join('');
    
    // Re-initialize Lucide icons for the new content
    if (window.lucide) {
        window.lucide.createIcons();
    }
}

function getActivityIcon(type) {
    const icons = {
        contribution: 'upload',
        reward: 'gift',
        user: 'user-plus',
        ai: 'cpu',
        location: 'map-pin'
    };
    return icons[type] || 'activity';
}

// ===== EXPLORER FUNCTIONALITY =====
async function loadExplorerData(type = 'all', page = 1) {
    try {
        const explorerGrid = document.getElementById('explorerGrid');
        if (!explorerGrid) return;
        
        // Show loading state
        explorerGrid.innerHTML = `
            <div class="loading-placeholder">
                <i data-lucide="loader-2" class="animate-spin"></i>
                <p>Loading public data...</p>
            </div>
        `;
        
        const response = await fetch(`/api/explorer?type=${type}&page=${page}&limit=20`);
        const result = await response.json();
        
        if (result.success && result.data) {
            renderExplorerData(result.data, result.pagination);
        }
    } catch (error) {
        console.error('Error loading explorer data:', error);
        renderExplorerError();
    }
}

function renderExplorerData(data, pagination) {
    const explorerGrid = document.getElementById('explorerGrid');
    if (!explorerGrid) return;
    
    if (data.length === 0) {
        explorerGrid.innerHTML = `
            <div class="no-data-placeholder">
                <i data-lucide="database"></i>
                <p>No data found for this category</p>
            </div>
        `;
        return;
    }
    
    explorerGrid.innerHTML = data.map(item => `
        <div class="explorer-item card" data-animate="fade-in" data-id="${item.id}">
            <div class="explorer-thumbnail">
                <img src="${item.thumbnail}" alt="${item.title}" loading="lazy">
                <div class="explorer-type-badge">
                    <i data-lucide="${getExplorerIcon(item.type)}"></i>
                    <span>${item.type}</span>
                </div>
            </div>
            <div class="explorer-content">
                <h4 class="explorer-title">${item.title}</h4>
                <p class="explorer-description">${item.description}</p>
                <div class="explorer-meta">
                    <span class="explorer-location">
                        <i data-lucide="map-pin"></i>
                        ${item.location}
                    </span>
                    <span class="explorer-score">
                        <i data-lucide="star"></i>
                        ${item.quality_score}/100
                    </span>
                </div>
                <div class="explorer-wallet">
                    <small>by ${item.wallet_address.substring(0, 8)}...</small>
                </div>
            </div>
        </div>
    `).join('');
    
    // Re-initialize Lucide icons
    if (window.lucide) {
        window.lucide.createIcons();
    }
}

function renderExplorerError() {
    const explorerGrid = document.getElementById('explorerGrid');
    if (explorerGrid) {
        explorerGrid.innerHTML = `
            <div class="error-placeholder">
                <i data-lucide="alert-circle"></i>
                <p>Error loading data. Please try again.</p>
            </div>
        `;
    }
}

function getExplorerIcon(type) {
    const icons = {
        image: 'image',
        video: 'video',
        audio: 'mic',
        location: 'map-pin'
    };
    return icons[type] || 'file';
}

function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

// ===== FILTER FUNCTIONALITY =====
document.addEventListener('DOMContentLoaded', function() {
    // Add filter button functionality
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('filter-btn')) {
            // Remove active class from all filter buttons
            document.querySelectorAll('.filter-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Add active class to clicked button
            e.target.classList.add('active');
            
            // Get filter type
            const type = e.target.getAttribute('data-type');
            
            // Load data with new filter
            if (type) {
                loadExplorerData(type);
            }
        }
    });
});

// ===== EXPORT FUNCTIONS =====
window.startMission = startMission;
window.closeModal = closeModal;
window.requestCameraPermission = requestCameraPermission;
window.requestLocationPermission = requestLocationPermission;
window.requestMicrophonePermission = requestMicrophonePermission;
window.showSection = showSection;
window.loadStatsData = loadStatsData;
window.loadExplorerData = loadExplorerData;

// ===== LEGACY PHANTOM WALLET CHECK =====
document.addEventListener('DOMContentLoaded', () => {
    // Check if Phantom wallet is available
    if (checkPhantomWallet()) {
        // Enhanced wallet handling is now done in the main DOMContentLoaded
        // This is kept for compatibility
    }
});