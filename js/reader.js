/**
 * Reader Controls for The First Life HTML Book
 * - Font size adjustment (persisted to localStorage)
 * - Table of Contents sidebar toggle
 */

(function() {
    'use strict';

    // Font size levels
    const FONT_SIZES = ['small', 'medium', 'large', 'xlarge'];
    const FONT_LABELS = ['A-', 'A', 'A+', 'A++'];
    const STORAGE_KEY = 'firstlife-font-size';

    // Get saved font size or default to medium
    function getSavedFontSize() {
        const saved = localStorage.getItem(STORAGE_KEY);
        return FONT_SIZES.includes(saved) ? saved : 'medium';
    }

    // Apply font size to document
    function applyFontSize(size) {
        // Remove all font size classes
        FONT_SIZES.forEach(s => document.documentElement.classList.remove('font-size-' + s));
        // Add the selected one
        document.documentElement.classList.add('font-size-' + size);
        // Save preference
        localStorage.setItem(STORAGE_KEY, size);
        // Update button states
        updateFontButtons(size);
    }

    // Update active state on font buttons
    function updateFontButtons(activeSize) {
        const buttons = document.querySelectorAll('.font-controls button');
        buttons.forEach((btn, i) => {
            btn.classList.toggle('active', FONT_SIZES[i] === activeSize);
        });
    }

    // Create reader controls
    function createReaderControls() {
        const controls = document.createElement('div');
        controls.className = 'reader-controls';

        // TOC toggle button
        const tocBtn = document.createElement('button');
        tocBtn.innerHTML = '&#9776; Contents';
        tocBtn.setAttribute('aria-label', 'Toggle table of contents');
        tocBtn.addEventListener('click', toggleTOC);
        controls.appendChild(tocBtn);

        // Font size controls
        const fontControls = document.createElement('div');
        fontControls.className = 'font-controls';

        FONT_SIZES.forEach((size, i) => {
            const btn = document.createElement('button');
            btn.textContent = FONT_LABELS[i];
            btn.setAttribute('aria-label', 'Font size ' + size);
            btn.addEventListener('click', () => applyFontSize(size));
            fontControls.appendChild(btn);
        });

        controls.appendChild(fontControls);
        document.body.appendChild(controls);
    }

    // Create TOC sidebar
    function createTOCSidebar() {
        // Create overlay
        const overlay = document.createElement('div');
        overlay.className = 'toc-overlay';
        overlay.addEventListener('click', closeTOC);
        document.body.appendChild(overlay);

        // Create sidebar
        const sidebar = document.createElement('nav');
        sidebar.className = 'toc-sidebar';
        sidebar.setAttribute('aria-label', 'Table of contents');

        // Header
        const header = document.createElement('div');
        header.className = 'toc-sidebar-header';
        header.innerHTML = `
            <h3>Contents</h3>
            <button class="toc-close" aria-label="Close table of contents">&times;</button>
        `;
        header.querySelector('.toc-close').addEventListener('click', closeTOC);
        sidebar.appendChild(header);

        // TOC list
        const tocList = document.createElement('ul');
        tocList.className = 'toc';
        tocList.innerHTML = `
            <li class="toc-part">Front Matter</li>
            <li class="toc-chapter"><a href="00-front-matter.html">A Note on Process</a></li>
            <li class="toc-chapter"><a href="00-front-matter.html#preface">Preface</a></li>
            <li class="toc-chapter"><a href="00-front-matter.html#introduction">Introduction</a></li>

            <li class="toc-part">Part I: The Question</li>
            <li class="toc-chapter"><a href="01-part-i.html#chapter-1">Chapter 1: The Mismatch</a></li>
            <li class="toc-chapter"><a href="01-part-i.html#chapter-2">Chapter 2: The Dream</a></li>

            <li class="toc-part">Part II: The Philosophy</li>
            <li class="toc-chapter"><a href="02-part-ii.html#chapter-3">Chapter 3: The Purpose</a></li>
            <li class="toc-chapter"><a href="02-part-ii.html#chapter-4">Chapter 4: The Three Freedoms</a></li>
            <li class="toc-chapter"><a href="02-part-ii.html#chapter-5">Chapter 5: The Peril</a></li>
            <li class="toc-chapter"><a href="02-part-ii.html#chapter-6">Chapter 6: The Synthesis</a></li>

            <li class="toc-part">Part III: The Global Context</li>
            <li class="toc-chapter"><a href="03-part-iii.html#chapter-7">Chapter 7: The Burden</a></li>
            <li class="toc-chapter"><a href="03-part-iii.html#chapter-8">Chapter 8: The Paradox</a></li>
            <li class="toc-chapter"><a href="03-part-iii.html#chapter-9">Chapter 9: The Limits</a></li>

            <li class="toc-part">Part IV: The Architecture</li>
            <li class="toc-chapter"><a href="04-part-iv.html#chapter-10">Chapter 10: How It Works</a></li>
            <li class="toc-chapter"><a href="04-part-iv.html#chapter-11">Chapter 11: Training Your Partner</a></li>
            <li class="toc-chapter"><a href="04-part-iv.html#chapter-12">Chapter 12: The Memory Problem</a></li>

            <li class="toc-part">Part V: The Applications</li>
            <li class="toc-chapter"><a href="05-part-v.html#chapter-13">Chapter 13: Economic Agency</a></li>
            <li class="toc-chapter"><a href="05-part-v.html#chapter-14">Chapter 14: Education</a></li>
            <li class="toc-chapter"><a href="05-part-v.html#chapter-15">Chapter 15: Legacy</a></li>

            <li class="toc-part">Part VI: The Principles</li>
            <li class="toc-chapter"><a href="06-part-vi.html#chapter-16">Chapter 16: For Individuals</a></li>
            <li class="toc-chapter"><a href="06-part-vi.html#chapter-17">Chapter 17: For Builders</a></li>
            <li class="toc-chapter"><a href="06-part-vi.html#chapter-18">Chapter 18: For Society</a></li>

            <li class="toc-part">Part VII: The Vision</li>
            <li class="toc-chapter"><a href="07-part-vii.html#chapter-19">Chapter 19: The Unburdened Life</a></li>
            <li class="toc-chapter"><a href="07-part-vii.html#chapter-20">Chapter 20: The Invitation</a></li>

            <li class="toc-part">Additional Materials</li>
            <li class="toc-chapter"><a href="08-vignettes.html">Vignettes</a></li>
        `;

        // Fix links for index page vs chapter pages
        const currentPath = window.location.pathname;
        if (currentPath.includes('/chapters/') || currentPath.endsWith('/chapters')) {
            // Already in chapters folder, links are correct
        } else {
            // On index page, need to prefix with chapters/
            tocList.querySelectorAll('a').forEach(link => {
                const href = link.getAttribute('href');
                if (!href.startsWith('chapters/') && !href.startsWith('../') && !href.startsWith('http')) {
                    link.setAttribute('href', 'chapters/' + href);
                }
            });
        }

        sidebar.appendChild(tocList);
        document.body.appendChild(sidebar);
    }

    // Toggle TOC sidebar
    function toggleTOC() {
        const sidebar = document.querySelector('.toc-sidebar');
        const overlay = document.querySelector('.toc-overlay');
        sidebar.classList.toggle('open');
        overlay.classList.toggle('open');
        document.body.style.overflow = sidebar.classList.contains('open') ? 'hidden' : '';
    }

    // Close TOC sidebar
    function closeTOC() {
        const sidebar = document.querySelector('.toc-sidebar');
        const overlay = document.querySelector('.toc-overlay');
        sidebar.classList.remove('open');
        overlay.classList.remove('open');
        document.body.style.overflow = '';
    }

    // Handle keyboard shortcuts
    function handleKeyboard(e) {
        // Escape closes TOC
        if (e.key === 'Escape') {
            closeTOC();
        }
        // Ctrl/Cmd + = to increase font
        if ((e.ctrlKey || e.metaKey) && (e.key === '=' || e.key === '+')) {
            e.preventDefault();
            const current = getSavedFontSize();
            const idx = FONT_SIZES.indexOf(current);
            if (idx < FONT_SIZES.length - 1) {
                applyFontSize(FONT_SIZES[idx + 1]);
            }
        }
        // Ctrl/Cmd + - to decrease font
        if ((e.ctrlKey || e.metaKey) && e.key === '-') {
            e.preventDefault();
            const current = getSavedFontSize();
            const idx = FONT_SIZES.indexOf(current);
            if (idx > 0) {
                applyFontSize(FONT_SIZES[idx - 1]);
            }
        }
    }

    // Reading progress indicator
    function updateProgress() {
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPos = window.scrollY;
        const progress = docHeight > 0 ? (scrollPos / docHeight) * 100 : 0;
        const progressBar = document.getElementById('progress');
        if (progressBar) {
            progressBar.style.width = progress + '%';
        }
    }

    // Initialize
    function init() {
        createReaderControls();
        createTOCSidebar();

        // Apply saved font size
        applyFontSize(getSavedFontSize());

        // Event listeners
        document.addEventListener('keydown', handleKeyboard);
        window.addEventListener('scroll', updateProgress);

        // Initial progress update
        updateProgress();
    }

    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
