const fs = require('fs');
const path = require('path');

const domain = 'https://engiprephub.in';
const publicDir = '.';

function getHtmlFiles(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            if (!fullPath.includes('node_modules') && !fullPath.includes('dist') && !fullPath.includes('.git')) {
                results = results.concat(getHtmlFiles(fullPath));
            }
        } else if (fullPath.endsWith('.html')) {
            results.push(fullPath);
        }
    });
    return results;
}

const htmlFiles = getHtmlFiles(publicDir);

const adSenseScript = `
    <!-- Google AdSense -->
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9357545069587539" crossorigin="anonymous"></script>
`;

const seoMapping = {
    'index.html': {
        title: 'JNTUK R23 Notes, PYQs & Syllabi Portal | EngiPrepHub',
        desc: 'Access JNTUK R23 engineering syllabus study resources, verified lecture notes, previous year solved question papers, and interactive educational tools.'
    },
    'semester-1.html': {
        title: 'JNTUK R23 Semester-1 Notes & Study Guide | EngiPrepHub',
        desc: 'Get high-quality lecture notes, PYQ solutions, and lab guidelines for Semester-1 JNTUK R23 courses including M1, Physics, Chemistry, CPDS, and English.'
    },
    'semester-2.html': {
        title: 'JNTUK R23 Semester-2 Notes & Study Guide | EngiPrepHub',
        desc: 'Get high-yield syllabus notes, solved papers, and interactive guides for Semester-2 JNTUK R23 courses including M2, BEEE, BCME, and Data Structures.'
    },
    'all-subjects.html': {
        title: 'JNTUK Syllabus & Subject Guides (R23) | EngiPrepHub',
        desc: 'Explore comprehensive JNTUK R23 engineering syllabus subjects, course previews, learning routes, and quick access topper guides.'
    },
    'notes.html': {
        title: 'JNTUK R23 Verified Notes & Reference Docs | EngiPrepHub',
        desc: 'Search fully verified topper lecture notes for JNTUK R23 engineering subjects. Instant visual diagrams and exact university marking formulas.'
    },
    'jntuk-r23-previous-question-papers.html': {
        title: 'JNTUK R23 Solved Previous Year Papers (PYQs) | EngiPrepHub',
        desc: 'Boost your engineering scores. Navigate repeated JNTUK R23 exam questions, detailed answer steps, and standard marking sheets.'
    },
    'tools.html': {
        title: 'Interactive Smart Calculators & Academic Tools | EngiPrepHub',
        desc: 'Use dynamic calculation simulators: interactive graph plotting, matrix solver equations, electrical mesh codes, and step solvers.'
    },
    'about.html': {
        title: 'Educational Mission & Academic Credibility | EngiPrepHub',
        desc: 'Learn about EngiPrepHub, our strict educational standards, peer-reviewed topper materials, and dedicated focus on JNTUK curriculum.'
    },
    'contact.html': {
        title: 'Contact Support & Study Feedback Form | EngiPrepHub',
        desc: 'Reach out to our secure moderation desk for sitemap index inquiries, sitemap requests, data correction, or direct email queries.'
    },
    'faq.html': {
        title: 'Frequently Asked Questions & Exam Guide | EngiPrepHub',
        desc: 'Find fast answers regarding JNTUK R23 grading, syllabus requirements, how to study for midterm exams, and study tracking usage.'
    },
    'disclaimer.html': {
        title: 'Academic Disclaimer & Student Integrity | EngiPrepHub',
        desc: 'Review our professional academic disclaimer, syllabus alignment policy, study integrity, and fair educational usage conditions.'
    },
    'privacy-policy.html': {
        title: 'Privacy Policy & GDPR Cookie Security | EngiPrepHub',
        desc: 'Review EngiPrepHub\'s GDPR and AdSense-safe Privacy Policy. Learn how we secure your data, collect consent, and preserve student privacy.'
    },
    'terms-conditions.html': {
        title: 'Terms of Service & Student Usage Rules | EngiPrepHub',
        desc: 'Read terms of use, permitted content crawling permissions for AI engines, study resources rules, and basic terms on EngiPrepHub.'
    },
    'cookie-policy.html': {
        title: 'Cookie Policy & GDPR Consent Transparency | EngiPrepHub',
        desc: 'Review our GDPR-compliant cookie consent rules, analytic tracking cookies, and how to customize your privacy settings on EngiPrepHub.'
    },
    'blog.html': {
        title: 'JNTUK Engineering Student Blogs & News | EngiPrepHub',
        desc: 'Find student guides, exam-viva prep guides, survival frameworks, time allocation cheats, and standard engineering trends.'
    },
    'ai-professor.html': {
        title: 'JNTUK AI Study Professor & Tutor Engine | EngiPrepHub',
        desc: 'Get immediate guidance from our trained study bot explaining JNTUK R23 topics, formulas, step solutions, and practice quizzes.'
    },
    'exam-survival.html': {
        title: 'JNTUK R23 Exam Survival Kits & Cheat Sheets | EngiPrepHub',
        desc: 'Save critical math derivations, formulas cheat sheets, BEEE theorems, CP pointers rules, and download high-yield checklists.'
    },
    'physics-notes.html': {
        title: 'JNTUK R23 Engineering Physics Lecture Notes | EngiPrepHub',
        desc: 'Master JNTUK R23 Engineering Physics with verified study notes, fiber optics derivations, semiconductor physics charts, and solved exam papers.'
    },
    'chemistry-topper-notes.html': {
        title: 'JNTUK R23 Engineering Chemistry Topper Notes | EngiPrepHub',
        desc: 'Excel in JNTUK R23 Engineering Chemistry. Get deep topper notes covering coordinate polymers, water technology, batteries, and derivations.'
    },
    'maths-1.html': {
        title: 'JNTUK R23 Engineering Mathematics-1 Notes | EngiPrepHub',
        desc: 'Solve JNTUK R23 Engineering Mathematics-1 easily. Steps for Eigenvalues, Rank of Matrices, Stokes\' integrations, and vector calculus formulas.'
    },
    'engineering-mathematics-2.html': {
        title: 'JNTUK R23 Engineering Mathematics-2 Notes | EngiPrepHub',
        desc: 'Study JNTUK R23 Engineering Mathematics-2. Step-by-step calculus solutions, matrices solvers, vectors, and solved question sets for exam success.'
    },
    'beee-notes.html': {
        title: 'JNTUK R23 Basic Electrical Engineering Notes | EngiPrepHub',
        desc: 'Understand JNTUK R23 Basic Electrical core concepts. Solved KVL/KCL theorems, AC circuit parameters, diode math, and transformer derivations.'
    },
    'c-programming-notes.html': {
        title: 'JNTUK R23 C Programming Complete Text Notes | EngiPrepHub',
        desc: 'Compile code and study JNTUK R23 C Programming with dynamic code playground, pointer visualizations, memory diagrams, and core viva questions.'
    },
    'data-structures-basics.html': {
        title: 'JNTUK R23 Data Structures Complete Notes | EngiPrepHub',
        desc: 'Master JNTUK R23 Data Structures. Explore Linked Lists, Stack expression trees, Queues, Graphs search algorithms, and solved question papers.'
    },
    'communicative-english.html': {
        title: 'JNTUK R23 Communicative English Study Guide | EngiPrepHub',
        desc: 'Excel in communicative english under JNTUK R23. Complete notes on reading skills, technical writing, resume building, and vocabularies.'
    },
    'basic-civil-mechanical-engineering.html': {
        title: 'JNTUK R23 Basic Civil & Mechanical Notes | EngiPrepHub',
        desc: 'Read Basic Civil and Mechanical engineering study material. Explore standard thermal properties, hydraulic fluids, and architectural loads.'
    },
    'engineering-graphics-lab.html': {
        title: 'JNTUK R23 Engineering Graphics & AutoCAD Lab | EngiPrepHub',
        desc: 'Build 3D orthographic projections, isometric views, and learn standard AutoCAD command lines with step-by-step virtual drafter animations.'
    }
};

htmlFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let modified = false;
    const baseName = path.basename(file);

    // 1. Title and Description Optimization
    const mapping = seoMapping[baseName];
    if (mapping) {
        // Replace existing <title>
        if (content.includes('<title>')) {
            content = content.replace(/<title>.*?<\/title>/gi, `<title>${mapping.title}</title>`);
            modified = true;
        } else {
            content = content.replace('</head>', `    <title>${mapping.title}</title>\n</head>`);
            modified = true;
        }

        // Replace or Inject Meta Description
        if (content.includes('<meta name="description"')) {
            content = content.replace(/<meta name="description" content=".*?"/gi, `<meta name="description" content="${mapping.desc}"`);
            modified = true;
        } else {
            content = content.replace('</title>', `</title>\n    <meta name="description" content="${mapping.desc}">`);
            modified = true;
        }

        // Clean out conflicting old description if duplicated
        content = content.replace(/<meta name="description" content="The ultimate JNTUK R23 engineering prep platform\.".*?>/g, '');
    }

    // 2. Add Canonical URL
    const fileToCleanUrlMapping = {
        'index.html': '/',
        'about.html': '/about',
        'contact.html': '/contact',
        'privacy-policy.html': '/privacy-policy',
        'cookie-policy.html': '/cookie-policy',
        'terms-conditions.html': '/terms-and-conditions',
        'faq.html': '/faq',
        'blog.html': '/blog',
        'tools.html': '/tools',
        'notes.html': '/notes',
        'cheat-sheets.html': '/cheat-sheets',
        'ai-professor.html': '/ai-professor-jntuk-study-assistant',
        'semester-1.html': '/jntuk-r23-semester-1',
        'semester-2.html': '/jntuk-r23-semester-2',
        'maths-1.html': '/engineering-mathematics-1-notes-jntuk-r23',
        'engineering-mathematics-unit-1.html': '/engineering-mathematics-unit-1-differential-equations',
        'engineering-mathematics-unit-2.html': '/engineering-mathematics-unit-2-higher-order-differential-equations',
        'engineering-mathematics-unit-3.html': '/engineering-mathematics-unit-3-partial-differential-equations',
        'engineering-mathematics-unit-4.html': '/engineering-mathematics-unit-4-vector-differentiation',
        'engineering-mathematics-unit-5.html': '/engineering-mathematics-unit-5-vector-integration',
        'physics-notes.html': '/engineering-physics-notes-jntuk-r23',
        'engineering-physics-unit-1.html': '/engineering-physics-unit-1-wave-optics',
        'engineering-physics-unit-2.html': '/engineering-physics-unit-2-lasers-and-fiber-optics',
        'engineering-physics-unit-3.html': '/engineering-physics-unit-3-quantum-mechanics',
        'engineering-physics-unit-4.html': '/engineering-physics-unit-4-semiconductor-physics',
        'engineering-physics-unit-5.html': '/engineering-physics-unit-5-modern-physics',
        'chemistry-topper-notes.html': '/engineering-chemistry-notes-jntuk-r23',
        'chemistry-unit-1.html': '/engineering-chemistry-unit-1-structure-and-bonding',
        'chemistry-unit-2.html': '/engineering-chemistry-unit-2-modern-engineering-materials',
        'chemistry-unit-3.html': '/engineering-chemistry-unit-3-electrochemistry',
        'chemistry-unit-4.html': '/engineering-chemistry-unit-4-polymer-chemistry',
        'chemistry-unit-5.html': '/engineering-chemistry-unit-5-water-technology',
        'c-programming-notes.html': '/c-programming-notes-jntuk-r23',
        'c-programming-unit-1.html': '/c-programming-unit-1-fundamentals',
        'c-programming-unit-2.html': '/c-programming-unit-2-control-statements',
        'c-programming-unit-3.html': '/c-programming-unit-3-functions-and-arrays',
        'c-programming-unit-4.html': '/c-programming-unit-4-pointers-and-structures',
        'c-programming-unit-5.html': '/c-programming-unit-5-files-and-dynamic-memory',
        'data-structures-basics.html': '/data-structures-notes-jntuk-r23',
        'data-structures-unit-1.html': '/data-structures-unit-1-introduction',
        'data-structures-unit-2.html': '/data-structures-unit-2-linked-lists',
        'data-structures-unit-3.html': '/data-structures-unit-3-stacks-and-queues',
        'data-structures-unit-4.html': '/data-structures-unit-4-trees',
        'data-structures-unit-5.html': '/data-structures-unit-5-graphs-and-hashing',
        'beee-notes.html': '/basic-electrical-engineering-notes',
        'basic-electrical-engineering-unit-1.html': '/basic-electrical-engineering-unit-1-electrical-fundamentals',
        'basic-electrical-engineering-unit-2.html': '/basic-electrical-engineering-unit-2-dc-circuits',
        'basic-electrical-engineering-unit-3.html': '/basic-electrical-engineering-unit-3-ac-circuits',
        'basic-electrical-engineering-unit-4.html': '/basic-electrical-engineering-unit-4-transformers',
        'basic-electrical-engineering-unit-5.html': '/basic-electrical-engineering-unit-5-electrical-machines',
        'basic-civil-mechanical-engineering.html': '/basic-civil-mechanical-engineering-notes',
        'basic-civil-and-mechanical-engineering-unit-1.html': '/basic-civil-mechanical-unit-1-construction-materials',
        'basic-civil-and-mechanical-engineering-unit-2.html': '/basic-civil-mechanical-unit-2-surveying',
        'basic-civil-and-mechanical-engineering-unit-3.html': '/basic-civil-mechanical-unit-3-building-planning',
        'basic-civil-and-mechanical-engineering-unit-4.html': '/basic-civil-mechanical-unit-4-thermodynamics',
        'basic-civil-and-mechanical-engineering-unit-5.html': '/basic-civil-mechanical-unit-5-manufacturing-processes',
        'communicative-english.html': '/communicative-english-notes',
        'communicative-english-unit-1.html': '/communicative-english-unit-1-language-skills',
        'communicative-english-unit-2.html': '/communicative-english-unit-2-reading-comprehension',
        'communicative-english-unit-3.html': '/communicative-english-unit-3-writing-skills',
        'communicative-english-unit-4.html': '/communicative-english-unit-4-professional-communication',
        'communicative-english-unit-5.html': '/communicative-english-unit-5-presentation-skills',
        'engineering-graphics-notes.html': '/engineering-graphics-notes',
        'engineering-graphics-lab.html': '/engineering-graphics-notes',
        'engineering-graphics-enter-lab.html': '/engineering-graphics-lab',
        'jntuk-r23-previous-question-papers.html': '/jntuk-r23-previous-question-papers'
    };

    const cleanPath = fileToCleanUrlMapping[baseName] || (baseName === 'index.html' ? '/' : `/${baseName.replace('.html', '')}`);
    const canonicalUrl = `${domain}${cleanPath === '/' ? '' : cleanPath}`;
    
    // Clean old canonicals and inject perfectly
    content = content.replace(/<link rel="canonical".*?>/gi, '');
    content = content.replace('</title>', `</title>\n    <link rel="canonical" href="${canonicalUrl}">`);
    modified = true;

    // 3. Inject Hreflang and high-fidelity SEO localization keys
    if (!content.includes('hreflang="en-IN"')) {
        const hreflangs = `
    <link rel="alternate" hreflang="en-IN" href="${canonicalUrl}">
    <link rel="alternate" hreflang="x-default" href="${canonicalUrl}">
`;
        content = content.replace('</head>', `${hreflangs}\n</head>`);
        modified = true;
    }

    // 4. Clean old Open Graphs and inject fresh ones
    content = content.replace(/<meta property="og:title".*?>/gi, '');
    content = content.replace(/<meta property="og:description".*?>/gi, '');
    content = content.replace(/<meta property="og:url".*?>/gi, '');
    content = content.replace(/<meta property="og:type".*?>/gi, '');
    content = content.replace(/<meta property="og:site_name".*?>/gi, '');
    content = content.replace(/<meta name="twitter:card".*?>/gi, '');
    content = content.replace(/<meta name="twitter:title".*?>/gi, '');
    content = content.replace(/<meta name="twitter:description".*?>/gi, '');

    const activeTitle = mapping ? mapping.title : 'Premium JNTUK Study Notes | EngiPrepHub';
    const activeDesc = mapping ? mapping.desc : 'Verify JNTUK R23 syllabus study materials, solved PYQ question sheets, and interactive student dashboards on EngiPrepHub.';

    const ogTags = `
    <meta property="og:title" content="${activeTitle}">
    <meta property="og:description" content="${activeDesc}">
    <meta property="og:url" content="${canonicalUrl}">
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="EngiPrep Hub">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${activeTitle}">
    <meta name="twitter:description" content="${activeDesc}">
`;
    content = content.replace('</head>', `${ogTags}\n</head>`);

    // 5. AdSense constraints
    const isNotes = file.includes('unit') || file.includes('notes') || file.includes('maths') || file.includes('physics') || file.includes('chemistry') || file.includes('c-programming') || file.includes('english') || file.includes('civil') || file.includes('data-structures') || file.includes('quiz') || file.includes('beee');
    const isPyqs = file.includes('pyqs') || file.includes('survival');
    const isBlog = file.includes('blog');
    const isDashboard = file.includes('dashboard') || file.includes('admin') || file.includes('auth') || file.includes('profile');

    if ((isNotes || isPyqs || isBlog) && !isDashboard) {
        if (!content.includes('pagead2.googlesyndication.com')) {
            content = content.replace('</head>', `${adSenseScript}\n</head>`);
            modified = true;
        }
    } else {
        if (content.includes('pagead2.googlesyndication.com')) {
             content = content.replace(adSenseScript, '');
             content = content.replace(/<script async src="https:\/\/pagead2.googlesyndication.com.*?<\/script>/g, '');
             modified = true;
        }
    }

    // 5.5 Inject Footer and Author Box
    const footer = `
<!-- EngiPrepHubFooter -->
<footer class="engi-injected-footer bg-slate-900 border-t border-slate-800 text-center p-8 mt-20">
  <div class="flex justify-center flex-wrap gap-4 text-sm text-slate-400">
    <a href="/about.html" class="hover:text-white">About</a>
    <a href="/contact.html" class="hover:text-white">Contact</a>
    <a href="/privacy-policy.html" class="hover:text-white">Privacy</a>
    <a href="/terms-conditions.html" class="hover:text-white">Terms</a>
    <a href="/cookie-policy.html" class="hover:text-white">Cookie Policy</a>
    <a href="/faq.html" class="hover:text-white">FAQ</a>
  </div>
  <p class="text-slate-600 mt-4 text-xs">© 2026 EngiPrepHub. All rights reserved.</p>
</footer>
`;
    // Remove ALL previously injected footers and AuthorBoxes to start fresh.
    content = content.replace(/<!-- EngiPrepHubFooter -->[\s\S]*?<\/footer>/g, '');
    content = content.replace(/<!-- EngiPrepAuthorBox -->[\s\S]*?<\/section>/g, '');
    
    // Clean up any remaining comments from previous failed attempts
    content = content.replace(/<!-- EngiPrepHubFooter -->/g, '');
    content = content.replace(/<!-- EngiPrepAuthorBox -->/g, '');
    
    const authorBox = `
<!-- EngiPrepAuthorBox -->
<section class="max-w-4xl mx-auto my-16 p-8 bg-slate-900 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-center gap-6">
  <img src="/public/logo.png" alt="EngiPrepHub Logo" class="w-20 h-20 rounded-full border border-slate-700">
  <div>
    <h3 class="text-lg font-bold text-white">About the Author</h3>
    <p class="text-slate-300 text-sm mt-2">EngiPrepHub is an academic initiative aimed at providing high-quality, verified, and structured JNTUK R23 study notes, PYQs, and interactive tools for engineering students. Our materials are reviewed by expert students and engineers to ensure syllabus alignment.</p>
  </div>
</section>
`;

    if (content.includes('</body>')) {
        let enhancedContent = content;
        
        // Inject AuthorBox if it's a notes page
        if (isNotes) {
             enhancedContent = enhancedContent.replace('</body>', `\n${authorBox}\n</body>`);
        }
        // Always inject footer
        enhancedContent = enhancedContent.replace('</body>', `\n${footer}\n</body>`);
        
        content = enhancedContent;
        modified = true;
    }

    // 6. Structured Schema: Course block for notes, FAQPage block for pyqs, and EducationalOrganization + webSite for homepage
    content = content.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/gi, ''); // Wipe old schemas safely

    let schema = '';
    if (baseName === 'index.html') {
        schema = `
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "EducationalOrganization",
          "@id": "${domain}/#organization",
          "name": "EngiPrep Hub",
          "url": "${domain}",
          "logo": {
            "@type": "ImageObject",
            "url": "${domain}/public/logo.png",
            "caption": "EngiPrep Hub"
          },
          "description": "Premium educational sitemap and verified database studying guides tailormade for JNTUK R23 engineering students."
        },
        {
          "@type": "WebSite",
          "@id": "${domain}/#website",
          "url": "${domain}",
          "name": "EngiPrepHub",
          "publisher": {
            "@id": "${domain}/#organization"
          }
        }
      ]
    }
    </script>
`;
    } else if (isNotes) {
        schema = `
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Course",
      "name": "${activeTitle.replace(/"/g, '\\"')}",
      "description": "${activeDesc.replace(/"/g, '\\"')}",
      "provider": {
        "@type": "Organization",
        "name": "EngiPrep Hub",
        "sameAs": "${domain}"
      },
      "educationalCredentialAwarded": "Syllabus Compliance Certificate of Study Guidance",
      "hasCourseInstance": {
        "@type": "CourseInstance",
        "courseMode": "Online",
        "instructor": {
          "@type": "Person",
          "name": "Academic Board Engineers"
        }
      }
    }
    </script>
`;
    } else if (baseName === 'jntuk-r23-previous-question-papers.html') {
        schema = `
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [{
        "@type": "Question",
        "name": "Are previous year question papers available for JNTUK R23?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, EngiPrepHub provides verified step-by-step solutions to repeated previous year exam questions (PYQs) for JNTUK R23 subjects."
        }
      }, {
        "@type": "Question",
        "name": "How to secure full marks in JNTUK R23 examinations?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Students can prepare using high-yield topper notes, formulas cheat sheets, active practice quizzes, and standard grading answer templates."
        }
      }]
    }
    </script>
`;
    }

    if (schema) {
        content = content.replace('</head>', `${schema}\n</head>`);
        modified = true;
    }

    // Ensure main scripts are linked perfectly
    if (!content.includes('src="/src/main.js"') && content.includes('</body>')) {
        content = content.replace('</body>', '    <!-- Universal Academic Navigator & Active Live Alerts -->\n    <script type="module" src="/src/main.js"></script>\n</body>');
        modified = true;
    }

    if (modified) {
        fs.writeFileSync(file, content);
    }
});

console.log('Successfully completed full enterprise-grade SEO/GEO/EEAT metadata pass!');
