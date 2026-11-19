import React from 'react';

export const ProjectSvgPreview = ({ projectId, title }) => {
  const commonProps = {
    viewBox: '0 0 640 360',
    className: 'w-full h-full object-cover select-none',
    role: 'img',
    'aria-label': `${title} architectural interface preview`,
  };

  switch (projectId) {
    // 1. Helpdesk & Timesheet Portals
    case 'helpdesk-timesheet-portals':
      return (
        <svg {...commonProps}>
          <defs>
            <linearGradient id="hd-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#1e2438" />
              <stop offset="100%" stopColor="#0f1322" />
            </linearGradient>
            <linearGradient id="gold-bar" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#e5a93c" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>
          </defs>
          <rect width="640" height="360" fill="url(#hd-grad)" />
          {/* Header Bar */}
          <rect x="24" y="24" width="592" height="48" rx="8" fill="#181e30" stroke="#2b344e" strokeWidth="1" />
          <circle cx="50" cy="48" r="6" fill="#ef4444" />
          <circle cx="70" cy="48" r="6" fill="#f59e0b" />
          <circle cx="90" cy="48" r="6" fill="#10b981" />
          <text x="120" y="53" fill="#cbd5e1" fontSize="13" fontWeight="600" fontFamily="monospace">Odoo Enterprise v18 • Helpdesk &amp; Timesheet Portal</text>
          <rect x="490" y="34" width="110" height="28" rx="14" fill="#e5a93c" fillOpacity="0.15" stroke="#e5a93c" strokeWidth="1" />
          <text x="545" y="52" fill="#e5a93c" fontSize="11" fontWeight="700" textAnchor="middle">SLA: 01:24:00</text>

          {/* Left: Ticket Form View */}
          <rect x="24" y="86" width="350" height="250" rx="10" fill="#141928" stroke="#232a3d" strokeWidth="1" />
          <text x="44" y="118" fill="#f8fafc" fontSize="15" fontWeight="700">Ticket #HD-8492: Portal Integration</text>
          <rect x="44" y="130" width="80" height="20" rx="4" fill="#ef4444" fillOpacity="0.2" />
          <text x="84" y="144" fill="#f87171" fontSize="10" fontWeight="700" textAnchor="middle">P1 - CRITICAL</text>
          <rect x="134" y="130" width="90" height="20" rx="4" fill="#10b981" fillOpacity="0.2" />
          <text x="179" y="144" fill="#34d399" fontSize="10" fontWeight="700" textAnchor="middle">STAGE: SOLVED</text>

          {/* Form Rows */}
          <rect x="44" y="165" width="310" height="12" rx="3" fill="#252e46" />
          <rect x="44" y="187" width="240" height="12" rx="3" fill="#1e2539" />
          <rect x="44" y="209" width="280" height="12" rx="3" fill="#1e2539" />

          {/* Timesheet Summary Box */}
          <rect x="44" y="240" width="310" height="74" rx="6" fill="#192033" stroke="#2e3852" strokeWidth="1" />
          <text x="60" y="265" fill="#94a3b8" fontSize="11">Total Billable Hours</text>
          <text x="60" y="295" fill="#e5a93c" fontSize="22" fontWeight="800">14.50 hrs</text>
          <text x="180" y="265" fill="#94a3b8" fontSize="11">Analytic Account</text>
          <text x="180" y="292" fill="#cbd5e1" fontSize="13" fontWeight="600">Client Projects / Tier 1</text>

          {/* Right: Real-time Chatter Feed */}
          <rect x="390" y="86" width="226" height="250" rx="10" fill="#141928" stroke="#232a3d" strokeWidth="1" />
          <text x="410" y="118" fill="#e5a93c" fontSize="13" fontWeight="700">Chatter &amp; Audit Log</text>
          
          <rect x="410" y="138" width="186" height="52" rx="6" fill="#1c2338" />
          <circle cx="426" cy="156" r="8" fill="#e5a93c" />
          <text x="442" y="154" fill="#f8fafc" fontSize="10" fontWeight="600">Rajkumar Raja</text>
          <text x="442" y="172" fill="#94a3b8" fontSize="9">Resolved &amp; logged 3.5 hrs</text>

          <rect x="410" y="202" width="186" height="52" rx="6" fill="#1c2338" />
          <circle cx="426" cy="220" r="8" fill="#22d3ee" />
          <text x="442" y="218" fill="#f8fafc" fontSize="10" fontWeight="600">Odoo Bot (Automated)</text>
          <text x="442" y="236" fill="#94a3b8" fontSize="9">SLA Met: Sent survey email</text>

          <rect x="410" y="266" width="186" height="48" rx="6" fill="#1c2338" />
          <circle cx="426" cy="284" r="8" fill="#10b981" />
          <text x="442" y="282" fill="#f8fafc" fontSize="10" fontWeight="600">Client Sign-off</text>
          <text x="442" y="300" fill="#94a3b8" fontSize="9">Rating: 5/5 Stars Excellent</text>
        </svg>
      );

    // 2. Marketplace Data Importer
    case 'marketplace-data-importer':
      return (
        <svg {...commonProps}>
          <rect width="640" height="360" fill="#0d111d" />
          {/* Header */}
          <rect x="24" y="24" width="592" height="42" rx="6" fill="#161c2e" />
          <text x="44" y="50" fill="#22d3ee" fontSize="13" fontWeight="700" fontFamily="monospace">POST /api/v1/marketplace/sync_orders • 200 OK</text>
          <circle cx="580" cy="45" r="5" fill="#10b981" />

          {/* 3 Pipeline Nodes */}
          {/* Node 1: External Marketplace */}
          <rect x="34" y="100" width="165" height="210" rx="8" fill="#141a2a" stroke="#252e46" strokeWidth="1" />
          <rect x="34" y="100" width="165" height="36" rx="8" fill="#1c243a" />
          <text x="50" y="123" fill="#cbd5e1" fontSize="12" fontWeight="700">Marketplace JSON</text>
          <text x="50" y="160" fill="#94a3b8" fontSize="10" fontFamily="monospace">&#123;</text>
          <text x="60" y="180" fill="#f59e0b" fontSize="10" fontFamily="monospace">"order_id": "MK-99"</text>
          <text x="60" y="200" fill="#22d3ee" fontSize="10" fontFamily="monospace">"sku": "MOD-19"</text>
          <text x="60" y="220" fill="#34d399" fontSize="10" fontFamily="monospace">"qty": 24,</text>
          <text x="60" y="240" fill="#cbd5e1" fontSize="10" fontFamily="monospace">"amount": 1850</text>
          <text x="50" y="260" fill="#94a3b8" fontSize="10" fontFamily="monospace">&#125;</text>
          <rect x="50" y="275" width="133" height="22" rx="4" fill="#22d3ee" fillOpacity="0.15" />
          <text x="116" y="290" fill="#22d3ee" fontSize="10" fontWeight="700" textAnchor="middle">IDEMPOTENT TOKEN</text>

          {/* Connecting Arrow 1 */}
          <path d="M 205 205 L 230 205" stroke="#e5a93c" strokeWidth="3" strokeDasharray="4 2" />
          <polygon points="230,201 238,205 230,209" fill="#e5a93c" />

          {/* Node 2: Python Controller & ORM Logic */}
          <rect x="242" y="100" width="170" height="210" rx="8" fill="#141a2a" stroke="#e5a93c" strokeWidth="1" />
          <rect x="242" y="100" width="170" height="36" rx="8" fill="#232230" />
          <text x="258" y="123" fill="#e5a93c" fontSize="12" fontWeight="700">Python ORM Pipeline</text>
          <rect x="256" y="150" width="142" height="28" rx="4" fill="#192033" />
          <text x="268" y="168" fill="#cbd5e1" fontSize="10" fontFamily="monospace">search(client_ref)</text>
          <rect x="256" y="190" width="142" height="28" rx="4" fill="#192033" />
          <text x="268" y="208" fill="#cbd5e1" fontSize="10" fontFamily="monospace">find_or_create(email)</text>
          <rect x="256" y="230" width="142" height="28" rx="4" fill="#192033" />
          <text x="268" y="248" fill="#cbd5e1" fontSize="10" fontFamily="monospace">create(sale.order)</text>
          <rect x="256" y="270" width="142" height="28" rx="4" fill="#e5a93c" fillOpacity="0.2" />
          <text x="327" y="288" fill="#fcd34d" fontSize="10" fontWeight="700" textAnchor="middle">action_confirm()</text>

          {/* Connecting Arrow 2 */}
          <path d="M 418 205 L 442 205" stroke="#10b981" strokeWidth="3" strokeDasharray="4 2" />
          <polygon points="442,201 450,205 442,209" fill="#10b981" />

          {/* Node 3: Odoo Database Target */}
          <rect x="454" y="100" width="152" height="210" rx="8" fill="#141a2a" stroke="#252e46" strokeWidth="1" />
          <rect x="454" y="100" width="152" height="36" rx="8" fill="#182728" />
          <text x="470" y="123" fill="#34d399" fontSize="12" fontWeight="700">Odoo v16–v19 DB</text>
          <circle cx="475" cy="165" r="6" fill="#10b981" />
          <text x="490" y="169" fill="#cbd5e1" fontSize="11" fontWeight="600">SO-1049 Created</text>
          <circle cx="475" cy="205" r="6" fill="#10b981" />
          <text x="490" y="209" fill="#cbd5e1" fontSize="11" fontWeight="600">Stock Reserved</text>
          <circle cx="475" cy="245" r="6" fill="#10b981" />
          <text x="490" y="249" fill="#cbd5e1" fontSize="11" fontWeight="600">Invoice Drafted</text>
          <rect x="468" y="275" width="124" height="22" rx="4" fill="#10b981" fillOpacity="0.15" />
          <text x="530" y="290" fill="#34d399" fontSize="10" fontWeight="700" textAnchor="middle">SYNC VERIFIED ✓</text>
        </svg>
      );

    // 3. Custom Odoo ERP Module Suite
    case 'custom-odoo-erp-module-suite':
      return (
        <svg {...commonProps}>
          <rect width="640" height="360" fill="#0d111b" />
          {/* Header */}
          <rect x="24" y="20" width="592" height="42" rx="6" fill="#151b2c" stroke="#232a3e" strokeWidth="1" />
          <text x="44" y="46" fill="#f8fafc" fontSize="14" fontWeight="800">Odoo Enterprise Suite • Custom Core Architecture</text>
          <rect x="480" y="29" width="120" height="24" rx="12" fill="#e5a93c" fillOpacity="0.2" />
          <text x="540" y="45" fill="#e5a93c" fontSize="11" fontWeight="700" textAnchor="middle">v16 • v17 • v18 • v19</text>

          {/* 6 Core Module Cards Grid */}
          {/* Sales */}
          <rect x="24" y="78" width="186" height="118" rx="8" fill="#141a29" stroke="#252e46" strokeWidth="1" />
          <rect x="24" y="78" width="186" height="28" rx="8" fill="#202942" />
          <text x="40" y="97" fill="#e5a93c" fontSize="12" fontWeight="700">Sales &amp; Quotations</text>
          <text x="40" y="128" fill="#f8fafc" fontSize="18" fontWeight="800">₹4.82 M</text>
          <text x="40" y="148" fill="#94a3b8" fontSize="10">Automated discount tier rule</text>
          <rect x="40" y="162" width="150" height="6" rx="3" fill="#e5a93c" fillOpacity="0.3" />

          {/* Purchase */}
          <rect x="226" y="78" width="186" height="118" rx="8" fill="#141a29" stroke="#252e46" strokeWidth="1" />
          <rect x="226" y="78" width="186" height="28" rx="8" fill="#202942" />
          <text x="242" y="97" fill="#22d3ee" fontSize="12" fontWeight="700">Purchase &amp; Vendor PO</text>
          <text x="242" y="128" fill="#f8fafc" fontSize="18" fontWeight="800">128 POs</text>
          <text x="242" y="148" fill="#94a3b8" fontSize="10">RFQ multi-approval routing</text>
          <rect x="242" y="162" width="150" height="6" rx="3" fill="#22d3ee" fillOpacity="0.3" />

          {/* Inventory */}
          <rect x="428" y="78" width="188" height="118" rx="8" fill="#141a29" stroke="#252e46" strokeWidth="1" />
          <rect x="428" y="78" width="188" height="28" rx="8" fill="#202942" />
          <text x="444" y="97" fill="#34d399" fontSize="12" fontWeight="700">Inventory &amp; Routes</text>
          <text x="444" y="128" fill="#f8fafc" fontSize="18" fontWeight="800">99.4%</text>
          <text x="444" y="148" fill="#94a3b8" fontSize="10">Automated reordering limits</text>
          <rect x="444" y="162" width="150" height="6" rx="3" fill="#34d399" fillOpacity="0.3" />

          {/* QWeb Reports */}
          <rect x="24" y="210" width="186" height="126" rx="8" fill="#141a29" stroke="#252e46" strokeWidth="1" />
          <rect x="24" y="210" width="186" height="28" rx="8" fill="#202942" />
          <text x="40" y="229" fill="#d946ef" fontSize="12" fontWeight="700">QWeb XML Reports</text>
          <text x="40" y="258" fill="#cbd5e1" fontSize="11" fontFamily="monospace">Custom PDF Invoices</text>
          <text x="40" y="278" fill="#cbd5e1" fontSize="11" fontFamily="monospace">Delivery Slips &amp; QR</text>
          <rect x="40" y="295" width="110" height="20" rx="4" fill="#d946ef" fillOpacity="0.2" />
          <text x="95" y="309" fill="#f0abfc" fontSize="9" fontWeight="700" textAnchor="middle">BARCODE / QR READY</text>

          {/* PostgreSQL ORM */}
          <rect x="226" y="210" width="186" height="126" rx="8" fill="#141a29" stroke="#252e46" strokeWidth="1" />
          <rect x="226" y="210" width="186" height="28" rx="8" fill="#202942" />
          <text x="242" y="229" fill="#f59e0b" fontSize="12" fontWeight="700">PostgreSQL Schema</text>
          <text x="242" y="258" fill="#cbd5e1" fontSize="11" fontFamily="monospace">Indexed Foreach FKs</text>
          <text x="242" y="278" fill="#cbd5e1" fontSize="11" fontFamily="monospace">ACID Transaction Safe</text>
          <rect x="242" y="295" width="110" height="20" rx="4" fill="#f59e0b" fillOpacity="0.2" />
          <text x="297" y="309" fill="#fcd34d" fontSize="9" fontWeight="700" textAnchor="middle">RELATIONAL ORM</text>

          {/* Role Access / ACL */}
          <rect x="428" y="210" width="188" height="126" rx="8" fill="#141a29" stroke="#252e46" strokeWidth="1" />
          <rect x="428" y="210" width="188" height="28" rx="8" fill="#202942" />
          <text x="444" y="229" fill="#38bdf8" fontSize="12" fontWeight="700">Security &amp; ACL Rules</text>
          <text x="444" y="258" fill="#cbd5e1" fontSize="11" fontFamily="monospace">ir.model.access.csv</text>
          <text x="444" y="278" fill="#cbd5e1" fontSize="11" fontFamily="monospace">Record Rules: [team_id]</text>
          <rect x="444" y="295" width="120" height="20" rx="4" fill="#38bdf8" fillOpacity="0.2" />
          <text x="504" y="309" fill="#7dd3fc" fontSize="9" fontWeight="700" textAnchor="middle">MULTI-COMPANY SAFE</text>
        </svg>
      );

    // 4. Storefront Theme & Technical SEO Audits
    case 'storefront-theme-seo-audits':
      return (
        <svg {...commonProps}>
          <rect width="640" height="360" fill="#0d111d" />
          <rect x="24" y="20" width="592" height="42" rx="6" fill="#151b2c" />
          <text x="44" y="46" fill="#10b981" fontSize="14" fontWeight="800">Shopify Liquid CRO &amp; Core Web Vitals Audit</text>
          <rect x="490" y="29" width="110" height="24" rx="12" fill="#10b981" fillOpacity="0.2" />
          <text x="545" y="45" fill="#34d399" fontSize="11" fontWeight="700" textAnchor="middle">PASSING CWV</text>

          {/* Left: 99% Google Lighthouse Meter */}
          <rect x="24" y="76" width="220" height="260" rx="8" fill="#141a29" stroke="#10b981" strokeWidth="1" />
          <circle cx="134" cy="160" r="60" fill="none" stroke="#1f293d" strokeWidth="10" />
          <circle cx="134" cy="160" r="60" fill="none" stroke="#10b981" strokeWidth="10" strokeDasharray="377" strokeDashoffset="15" strokeLinecap="round" />
          <text x="134" y="162" fill="#34d399" fontSize="32" fontWeight="900" textAnchor="middle">99</text>
          <text x="134" y="184" fill="#94a3b8" fontSize="11" textAnchor="middle">Performance Score</text>
          <rect x="44" y="246" width="180" height="30" rx="6" fill="#192033" />
          <text x="134" y="265" fill="#cbd5e1" fontSize="11" fontWeight="700" textAnchor="middle">Dawn &amp; Dwell Themes</text>
          <text x="134" y="305" fill="#e5a93c" fontSize="12" fontWeight="600" textAnchor="middle">+38% Mobile Conversion</text>

          {/* Right: Technical Metrics Grid */}
          <rect x="260" y="76" width="356" height="260" rx="8" fill="#141a29" stroke="#252e46" strokeWidth="1" />
          <text x="280" y="106" fill="#f8fafc" fontSize="14" fontWeight="700">Core Web Vitals &amp; JSON-LD Schema</text>

          {/* LCP Row */}
          <rect x="280" y="122" width="316" height="42" rx="6" fill="#192033" />
          <text x="296" y="147" fill="#cbd5e1" fontSize="12" fontWeight="600">Largest Contentful Paint (LCP)</text>
          <rect x="520" y="131" width="60" height="24" rx="4" fill="#10b981" fillOpacity="0.2" />
          <text x="550" y="147" fill="#34d399" fontSize="11" fontWeight="700" textAnchor="middle">0.82 s</text>

          {/* CLS Row */}
          <rect x="280" y="174" width="316" height="42" rx="6" fill="#192033" />
          <text x="296" y="199" fill="#cbd5e1" fontSize="12" fontWeight="600">Cumulative Layout Shift (CLS)</text>
          <rect x="520" y="183" width="60" height="24" rx="4" fill="#10b981" fillOpacity="0.2" />
          <text x="550" y="199" fill="#34d399" fontSize="11" fontWeight="700" textAnchor="middle">0.000</text>

          {/* Schema Snippet */}
          <rect x="280" y="226" width="316" height="90" rx="6" fill="#161b2a" stroke="#2a334d" strokeWidth="1" />
          <text x="296" y="248" fill="#e5a93c" fontSize="11" fontFamily="monospace">@context: "https://schema.org"</text>
          <text x="296" y="268" fill="#38bdf8" fontSize="11" fontFamily="monospace">@type: "Product", "offers", "review"</text>
          <text x="296" y="288" fill="#34d399" fontSize="11" fontFamily="monospace">Rich Snippet Star Badges Enabled ✓</text>
        </svg>
      );

    // 5. Food Delivery Web Application
    case 'food-delivery-web-application':
      return (
        <svg {...commonProps}>
          <rect width="640" height="360" fill="#111827" />
          {/* Header */}
          <rect x="24" y="20" width="592" height="48" rx="8" fill="#1f2937" stroke="#374151" strokeWidth="1" />
          <text x="44" y="50" fill="#f59e0b" fontSize="16" fontWeight="900">QUICKEAT</text>
          <text x="140" y="49" fill="#9ca3af" fontSize="12">Deliver to: 104 Race Course, Coimbatore</text>
          <rect x="510" y="30" width="90" height="28" rx="14" fill="#f59e0b" />
          <text x="555" y="48" fill="#111827" fontSize="11" fontWeight="800" textAnchor="middle">Cart (3)</text>

          {/* Category Chips */}
          <rect x="24" y="80" width="70" height="28" rx="14" fill="#f59e0b" />
          <text x="59" y="98" fill="#111827" fontSize="11" fontWeight="700" textAnchor="middle">All</text>
          <rect x="104" y="80" width="80" height="28" rx="14" fill="#1f2937" />
          <text x="144" y="98" fill="#d1d5db" fontSize="11" textAnchor="middle">Burgers</text>
          <rect x="194" y="80" width="80" height="28" rx="14" fill="#1f2937" />
          <text x="234" y="98" fill="#d1d5db" fontSize="11" textAnchor="middle">Pizzas</text>
          <rect x="284" y="80" width="80" height="28" rx="14" fill="#1f2937" />
          <text x="324" y="98" fill="#d1d5db" fontSize="11" textAnchor="middle">Desserts</text>

          {/* Food Cards Grid */}
          <rect x="24" y="120" width="186" height="210" rx="10" fill="#1f2937" stroke="#374151" strokeWidth="1" />
          <rect x="36" y="132" width="162" height="90" rx="8" fill="#374151" />
          <circle cx="117" cy="177" r="30" fill="#ef4444" fillOpacity="0.4" />
          <text x="117" y="183" fill="#f87171" fontSize="16" fontWeight="800" textAnchor="middle">BURGER</text>
          <text x="36" y="242" fill="#f9fafb" fontSize="13" fontWeight="700">Artisan Truffle Beef</text>
          <text x="36" y="260" fill="#f59e0b" fontSize="11">★ 4.9 (420+ reviews)</text>
          <text x="36" y="295" fill="#f8fafc" fontSize="15" fontWeight="800">$14.99</text>
          <rect x="128" y="278" width="70" height="28" rx="6" fill="#f59e0b" />
          <text x="163" y="296" fill="#111827" fontSize="11" fontWeight="800" textAnchor="middle">+ Add</text>

          {/* Food Card 2 */}
          <rect x="226" y="120" width="186" height="210" rx="10" fill="#1f2937" stroke="#374151" strokeWidth="1" />
          <rect x="238" y="132" width="162" height="90" rx="8" fill="#374151" />
          <circle cx="319" cy="177" r="30" fill="#f59e0b" fillOpacity="0.4" />
          <text x="319" y="183" fill="#fcd34d" fontSize="16" fontWeight="800" textAnchor="middle">PIZZA</text>
          <text x="238" y="242" fill="#f9fafb" fontSize="13" fontWeight="700">Woodfired Burrata</text>
          <text x="238" y="260" fill="#f59e0b" fontSize="11">★ 4.8 (310+ reviews)</text>
          <text x="238" y="295" fill="#f8fafc" fontSize="15" fontWeight="800">$18.50</text>
          <rect x="330" y="278" width="70" height="28" rx="6" fill="#f59e0b" />
          <text x="365" y="296" fill="#111827" fontSize="11" fontWeight="800" textAnchor="middle">+ Add</text>

          {/* Cart Sidebar Preview */}
          <rect x="428" y="120" width="188" height="210" rx="10" fill="#1a2233" stroke="#f59e0b" strokeWidth="1" />
          <text x="444" y="148" fill="#fcd34d" fontSize="13" fontWeight="800">Your Basket</text>
          <rect x="444" y="165" width="156" height="34" rx="4" fill="#243048" />
          <text x="454" y="186" fill="#f8fafc" fontSize="10">1x Truffle Beef</text>
          <text x="568" y="186" fill="#f59e0b" fontSize="10" fontWeight="700">$14.99</text>
          <rect x="444" y="205" width="156" height="34" rx="4" fill="#243048" />
          <text x="454" y="226" fill="#f8fafc" fontSize="10">2x French Fries</text>
          <text x="568" y="226" fill="#f59e0b" fontSize="10" fontWeight="700">$7.98</text>
          <rect x="444" y="275" width="156" height="36" rx="6" fill="#10b981" />
          <text x="522" y="298" fill="#ffffff" fontSize="12" fontWeight="800" textAnchor="middle">Checkout • $22.97</text>
        </svg>
      );

    // 6. Full-Stack E-Commerce Store
    case 'full-stack-e-commerce-store':
      return (
        <svg {...commonProps}>
          <rect width="640" height="360" fill="#0f172a" />
          <rect x="24" y="20" width="592" height="46" rx="8" fill="#1e293b" />
          <text x="44" y="49" fill="#38bdf8" fontSize="16" fontWeight="900">DRESS SHOP</text>
          <text x="160" y="48" fill="#94a3b8" fontSize="12">Men • Women • Kids • Accessories</text>
          <rect x="520" y="29" width="80" height="28" rx="6" fill="#38bdf8" fillOpacity="0.2" stroke="#38bdf8" strokeWidth="1" />
          <text x="560" y="47" fill="#38bdf8" fontSize="11" fontWeight="700" textAnchor="middle">Cart: 2</text>

          {/* Left: Filter Sidebar */}
          <rect x="24" y="78" width="150" height="254" rx="8" fill="#1e293b" stroke="#334155" strokeWidth="1" />
          <text x="40" y="106" fill="#f8fafc" fontSize="12" fontWeight="700">Filters</text>
          <text x="40" y="136" fill="#cbd5e1" fontSize="11">Category</text>
          <rect x="40" y="148" width="118" height="20" rx="4" fill="#334155" />
          <text x="46" y="162" fill="#38bdf8" fontSize="10">✓ Summer Dresses</text>
          <text x="40" y="196" fill="#cbd5e1" fontSize="11">Size</text>
          <rect x="40" y="208" width="24" height="24" rx="4" fill="#38bdf8" />
          <text x="52" y="224" fill="#0f172a" fontSize="10" fontWeight="700" textAnchor="middle">S</text>
          <rect x="70" y="208" width="24" height="24" rx="4" fill="#334155" />
          <text x="82" y="224" fill="#cbd5e1" fontSize="10" textAnchor="middle">M</text>
          <rect x="100" y="208" width="24" height="24" rx="4" fill="#334155" />
          <text x="112" y="224" fill="#cbd5e1" fontSize="10" textAnchor="middle">L</text>

          {/* Right Product Grid */}
          <rect x="190" y="78" width="200" height="254" rx="8" fill="#1e293b" stroke="#334155" strokeWidth="1" />
          <rect x="204" y="92" width="172" height="130" rx="6" fill="#334155" />
          <text x="290" y="160" fill="#94a3b8" fontSize="12" textAnchor="middle">[ Product Image ]</text>
          <text x="204" y="246" fill="#f8fafc" fontSize="13" fontWeight="700">Floral Linen Midi Dress</text>
          <text x="204" y="266" fill="#38bdf8" fontSize="15" fontWeight="800">$64.00</text>
          <text x="260" y="266" fill="#64748b" fontSize="12" textDecoration="line-through">$89.00</text>
          <rect x="204" y="284" width="172" height="32" rx="6" fill="#e5a93c" />
          <text x="290" y="304" fill="#0b0d14" fontSize="11" fontWeight="800" textAnchor="middle">Add to Bag</text>

          {/* Product 2 */}
          <rect x="406" y="78" width="210" height="254" rx="8" fill="#1e293b" stroke="#334155" strokeWidth="1" />
          <rect x="420" y="92" width="182" height="130" rx="6" fill="#334155" />
          <text x="511" y="160" fill="#94a3b8" fontSize="12" textAnchor="middle">[ Product Image ]</text>
          <text x="420" y="246" fill="#f8fafc" fontSize="13" fontWeight="700">Classic Tailored Blazer</text>
          <text x="420" y="266" fill="#38bdf8" fontSize="15" fontWeight="800">$120.00</text>
          <rect x="420" y="284" width="182" height="32" rx="6" fill="#e5a93c" />
          <text x="511" y="304" fill="#0b0d14" fontSize="11" fontWeight="800" textAnchor="middle">Add to Bag</text>
        </svg>
      );

    // 7. React Publishing & Blog App
    case 'react-publishing-blog-app':
      return (
        <svg {...commonProps}>
          <rect width="640" height="360" fill="#0c101d" />
          <rect x="24" y="20" width="592" height="44" rx="6" fill="#182035" />
          <text x="44" y="47" fill="#f8fafc" fontSize="15" fontWeight="800">React Dev Community Blog</text>
          <rect x="496" y="28" width="104" height="28" rx="14" fill="#e5a93c" />
          <text x="548" y="46" fill="#0b0d14" fontSize="11" fontWeight="700" textAnchor="middle">+ New Post</text>

          {/* Main Article Banner */}
          <rect x="24" y="76" width="370" height="256" rx="8" fill="#131b2e" stroke="#253252" strokeWidth="1" />
          <rect x="40" y="92" width="338" height="100" rx="6" fill="#1e2a48" />
          <text x="209" y="148" fill="#94a3b8" fontSize="13" textAnchor="middle">[ Featured Article Cover ]</text>
          <rect x="40" y="204" width="70" height="18" rx="4" fill="#22d3ee" fillOpacity="0.2" />
          <text x="75" y="217" fill="#22d3ee" fontSize="9" fontWeight="700" textAnchor="middle">REACT 18</text>
          <text x="40" y="242" fill="#f8fafc" fontSize="15" fontWeight="800">Mastering State &amp; Concurrency</text>
          <text x="40" y="264" fill="#94a3b8" fontSize="11">Deep dive into hooks, suspense boundaries, and server state.</text>
          <text x="40" y="296" fill="#e5a93c" fontSize="10" fontWeight="600">By Rajkumar Raja • 6 min read</text>

          {/* Side Articles List */}
          <rect x="410" y="76" width="206" height="122" rx="8" fill="#131b2e" stroke="#253252" strokeWidth="1" />
          <text x="424" y="104" fill="#fcd34d" fontSize="11" fontWeight="700">TRENDING</text>
          <text x="424" y="126" fill="#f8fafc" fontSize="12" fontWeight="700">Building Enterprise Portals</text>
          <text x="424" y="148" fill="#94a3b8" fontSize="10">Odoo ORM + React frontends.</text>
          <text x="424" y="174" fill="#64748b" fontSize="9">4 min read • 890 views</text>

          <rect x="410" y="210" width="206" height="122" rx="8" fill="#131b2e" stroke="#253252" strokeWidth="1" />
          <text x="424" y="238" fill="#34d399" fontSize="11" fontWeight="700">OPTIMIZATION</text>
          <text x="424" y="260" fill="#f8fafc" fontSize="12" fontWeight="700">Shopify Liquid Performance</text>
          <text x="424" y="282" fill="#94a3b8" fontSize="10">Achieving 95+ Core Web Vitals.</text>
          <text x="424" y="308" fill="#64748b" fontSize="9">5 min read • 1.2k views</text>
        </svg>
      );

    // 8. Previous Personal Portfolio Website
    case 'previous-personal-portfolio-website':
      return (
        <svg {...commonProps}>
          <rect width="640" height="360" fill="#1e1e24" />
          {/* Browser Bar */}
          <rect x="24" y="20" width="592" height="36" rx="6" fill="#2d2d38" />
          <circle cx="44" cy="38" r="5" fill="#ef4444" />
          <circle cx="60" cy="38" r="5" fill="#f59e0b" />
          <circle cx="76" cy="38" r="5" fill="#10b981" />
          <rect x="100" y="28" width="340" height="20" rx="10" fill="#1a1a20" />
          <text x="115" y="42" fill="#9ca3af" fontSize="10">https://rajkumarraja-portfolio.netlify.app/</text>

          {/* Hero Content */}
          <rect x="24" y="68" width="592" height="264" rx="8" fill="#252530" />
          <circle cx="100" cy="140" r="45" fill="#e5a93c" fillOpacity="0.2" stroke="#e5a93c" strokeWidth="2" />
          <text x="100" y="146" fill="#e5a93c" fontSize="24" fontWeight="900" textAnchor="middle">RR</text>
          <text x="170" y="130" fill="#ffffff" fontSize="22" fontWeight="800">Hi, I'm Rajkumar Raja</text>
          <text x="170" y="156" fill="#e5a93c" fontSize="14" fontWeight="600">Web Developer &amp; Programmer</text>
          <rect x="170" y="176" width="380" height="8" rx="4" fill="#3a3a4c" />
          <rect x="170" y="194" width="320" height="8" rx="4" fill="#3a3a4c" />

          {/* Project Carousel Preview */}
          <rect x="50" y="230" width="160" height="80" rx="6" fill="#1b1b22" stroke="#3a3a4c" strokeWidth="1" />
          <text x="130" y="275" fill="#cbd5e1" fontSize="11" textAnchor="middle">Portfolio Card 1</text>
          <rect x="230" y="230" width="160" height="80" rx="6" fill="#1b1b22" stroke="#3a3a4c" strokeWidth="1" />
          <text x="310" y="275" fill="#cbd5e1" fontSize="11" textAnchor="middle">Portfolio Card 2</text>
          <rect x="410" y="230" width="160" height="80" rx="6" fill="#1b1b22" stroke="#3a3a4c" strokeWidth="1" />
          <text x="490" y="275" fill="#cbd5e1" fontSize="11" textAnchor="middle">Portfolio Card 3</text>
        </svg>
      );

    // 9. Countries Flag Explorer
    case 'countries-flag-explorer':
      return (
        <svg {...commonProps}>
          <rect width="640" height="360" fill="#182030" />
          {/* Search & Filter Bar */}
          <rect x="24" y="20" width="360" height="42" rx="6" fill="#243048" stroke="#374768" strokeWidth="1" />
          <text x="50" y="46" fill="#94a3b8" fontSize="12">🔍 Search for a country...</text>
          <rect x="410" y="20" width="206" height="42" rx="6" fill="#243048" stroke="#374768" strokeWidth="1" />
          <text x="430" y="46" fill="#cbd5e1" fontSize="12">Filter by Region: Asia ▾</text>

          {/* 3 Country Flag Cards */}
          {/* India */}
          <rect x="24" y="80" width="186" height="250" rx="8" fill="#1f293d" stroke="#33415c" strokeWidth="1" />
          <rect x="24" y="80" width="186" height="100" rx="8" fill="#ff9933" />
          <rect x="24" y="113" width="186" height="34" fill="#ffffff" />
          <circle cx="117" cy="130" r="14" fill="none" stroke="#000080" strokeWidth="2" />
          <rect x="24" y="147" width="186" height="33" rx="0" fill="#138808" />
          <text x="40" y="205" fill="#f8fafc" fontSize="14" fontWeight="800">India</text>
          <text x="40" y="230" fill="#94a3b8" fontSize="11">Population: <tspan fill="#f1f5f9">1.41 Billion</tspan></text>
          <text x="40" y="255" fill="#94a3b8" fontSize="11">Region: <tspan fill="#f1f5f9">Asia</tspan></text>
          <text x="40" y="280" fill="#94a3b8" fontSize="11">Capital: <tspan fill="#f1f5f9">New Delhi</tspan></text>

          {/* Germany */}
          <rect x="226" y="80" width="186" height="250" rx="8" fill="#1f293d" stroke="#33415c" strokeWidth="1" />
          <rect x="226" y="80" width="186" height="33" rx="8" fill="#000000" />
          <rect x="226" y="113" width="186" height="34" fill="#dd0000" />
          <rect x="226" y="147" width="186" height="33" fill="#ffce00" />
          <text x="242" y="205" fill="#f8fafc" fontSize="14" fontWeight="800">Germany</text>
          <text x="242" y="230" fill="#94a3b8" fontSize="11">Population: <tspan fill="#f1f5f9">83.2 Million</tspan></text>
          <text x="242" y="255" fill="#94a3b8" fontSize="11">Region: <tspan fill="#f1f5f9">Europe</tspan></text>
          <text x="242" y="280" fill="#94a3b8" fontSize="11">Capital: <tspan fill="#f1f5f9">Berlin</tspan></text>

          {/* Japan */}
          <rect x="428" y="80" width="188" height="250" rx="8" fill="#1f293d" stroke="#33415c" strokeWidth="1" />
          <rect x="428" y="80" width="188" height="100" rx="8" fill="#ffffff" />
          <circle cx="522" cy="130" r="28" fill="#bc002d" />
          <text x="444" y="205" fill="#f8fafc" fontSize="14" fontWeight="800">Japan</text>
          <text x="444" y="230" fill="#94a3b8" fontSize="11">Population: <tspan fill="#f1f5f9">125.7 Million</tspan></text>
          <text x="444" y="255" fill="#94a3b8" fontSize="11">Region: <tspan fill="#f1f5f9">Asia</tspan></text>
          <text x="444" y="280" fill="#94a3b8" fontSize="11">Capital: <tspan fill="#f1f5f9">Tokyo</tspan></text>
        </svg>
      );

    // 10. Interactive Resume Builder
    case 'interactive-resume-builder':
      return (
        <svg {...commonProps}>
          <rect width="640" height="360" fill="#1a1c24" />
          {/* Header */}
          <rect x="24" y="20" width="592" height="36" rx="6" fill="#252834" />
          <text x="44" y="44" fill="#e5a93c" fontSize="13" fontWeight="800">Resume Builder • Live Dual-Pane Preview</text>
          <rect x="500" y="26" width="100" height="24" rx="4" fill="#e5a93c" />
          <text x="550" y="42" fill="#0b0d14" fontSize="10" fontWeight="800" textAnchor="middle">EXPORT PDF</text>

          {/* Left: Input Form Controls */}
          <rect x="24" y="68" width="280" height="264" rx="8" fill="#20232e" stroke="#2d3244" strokeWidth="1" />
          <text x="40" y="96" fill="#cbd5e1" fontSize="12" fontWeight="700">Personal Details</text>
          <rect x="40" y="108" width="248" height="26" rx="4" fill="#2a2e3d" />
          <text x="50" y="125" fill="#f8fafc" fontSize="10">Rajkumar Raja</text>
          <rect x="40" y="142" width="248" height="26" rx="4" fill="#2a2e3d" />
          <text x="50" y="159" fill="#94a3b8" fontSize="10">Odoo Developer &amp; Full-Stack</text>
          <text x="40" y="190" fill="#cbd5e1" fontSize="12" fontWeight="700">Experience</text>
          <rect x="40" y="202" width="248" height="54" rx="4" fill="#2a2e3d" />
          <text x="50" y="222" fill="#cbd5e1" fontSize="10">Bambus Technologies LLP</text>
          <text x="50" y="240" fill="#94a3b8" fontSize="9">Odoo v16–v19 modules...</text>
          <rect x="40" y="270" width="118" height="24" rx="4" fill="#e5a93c" fillOpacity="0.2" />
          <text x="99" y="286" fill="#fcd34d" fontSize="10" fontWeight="700" textAnchor="middle">+ Add Section</text>

          {/* Right: Rendered CV Sheet */}
          <rect x="320" y="68" width="296" height="264" rx="4" fill="#ffffff" />
          <text x="340" y="100" fill="#0f172a" fontSize="16" fontWeight="900" fontFamily="serif">RAJKUMAR RAJA</text>
          <text x="340" y="118" fill="#e5a93c" fontSize="11" fontWeight="700">ODOO DEVELOPER (v16–v19)</text>
          <line x1="340" y1="126" x2="596" y2="126" stroke="#e5a93c" strokeWidth="2" />
          <text x="340" y="144" fill="#334155" fontSize="10" fontWeight="700">EXPERIENCE</text>
          <text x="340" y="160" fill="#0f172a" fontSize="9" fontWeight="700">Software Developer — Bambus Tech</text>
          <text x="340" y="174" fill="#64748b" fontSize="8">• Engineered custom Odoo ERP modules</text>
          <text x="340" y="186" fill="#64748b" fontSize="8">• Automated REST API pipelines</text>
          <text x="340" y="210" fill="#334155" fontSize="10" fontWeight="700">EDUCATION</text>
          <text x="340" y="226" fill="#0f172a" fontSize="9" fontWeight="700">B.E. — Knowledge Inst of Tech</text>
          <text x="340" y="250" fill="#334155" fontSize="10" fontWeight="700">KEY SKILLS</text>
          <text x="340" y="266" fill="#64748b" fontSize="8">Python, Odoo ORM, OWL, React JS, PostgreSQL</text>
        </svg>
      );

    // 11. Basic Resume Builder
    case 'basic-resume-builder':
      return (
        <svg {...commonProps}>
          <rect width="640" height="360" fill="#0f172a" />
          <rect x="120" y="20" width="400" height="320" rx="6" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
          {/* Header on Paper */}
          <rect x="140" y="40" width="360" height="40" fill="#0284c7" />
          <text x="160" y="65" fill="#ffffff" fontSize="16" fontWeight="800">RAJKUMAR RAJA</text>
          <text x="380" y="65" fill="#e0f2fe" fontSize="10">rajkumarrajaco@gmail.com</text>

          {/* Section 1 */}
          <text x="140" y="105" fill="#0284c7" fontSize="12" fontWeight="700">PROFILE SUMMARY</text>
          <rect x="140" y="112" width="360" height="4" fill="#e2e8f0" />
          <rect x="140" y="125" width="340" height="6" rx="3" fill="#94a3b8" />
          <rect x="140" y="137" width="280" height="6" rx="3" fill="#94a3b8" />

          {/* Section 2 */}
          <text x="140" y="170" fill="#0284c7" fontSize="12" fontWeight="700">WORK EXPERIENCE</text>
          <rect x="140" y="177" width="360" height="4" fill="#e2e8f0" />
          <text x="140" y="195" fill="#0f172a" fontSize="10" fontWeight="700">Odoo Developer | Bambus Technologies</text>
          <rect x="140" y="205" width="320" height="6" rx="3" fill="#cbd5e1" />
          <rect x="140" y="217" width="300" height="6" rx="3" fill="#cbd5e1" />

          {/* Section 3 */}
          <text x="140" y="250" fill="#0284c7" fontSize="12" fontWeight="700">TECHNICAL SKILLS</text>
          <rect x="140" y="257" width="360" height="4" fill="#e2e8f0" />
          <rect x="140" y="270" width="80" height="18" rx="9" fill="#e0f2fe" />
          <text x="180" y="283" fill="#0369a1" fontSize="9" fontWeight="700" textAnchor="middle">Python</text>
          <rect x="230" y="270" width="80" height="18" rx="9" fill="#e0f2fe" />
          <text x="270" y="283" fill="#0369a1" fontSize="9" fontWeight="700" textAnchor="middle">Odoo ERP</text>
          <rect x="320" y="270" width="80" height="18" rx="9" fill="#e0f2fe" />
          <text x="360" y="283" fill="#0369a1" fontSize="9" fontWeight="700" textAnchor="middle">React JS</text>
        </svg>
      );

    // 12. Personal Expense Tracker
    case 'personal-expense-tracker':
      return (
        <svg {...commonProps}>
          <rect width="640" height="360" fill="#0f172a" />
          {/* Header */}
          <rect x="24" y="20" width="592" height="44" rx="6" fill="#1e293b" />
          <text x="44" y="48" fill="#f8fafc" fontSize="15" fontWeight="800">Expense Tracker &amp; Ledger</text>
          <text x="470" y="47" fill="#10b981" fontSize="13" fontWeight="800">Balance: +$4,850.00</text>

          {/* 2 Stat Cards */}
          <rect x="24" y="78" width="286" height="74" rx="8" fill="#1e293b" stroke="#10b981" strokeWidth="1" />
          <text x="44" y="105" fill="#94a3b8" fontSize="11">TOTAL INCOME</text>
          <text x="44" y="135" fill="#34d399" fontSize="22" fontWeight="800">+$6,200.00</text>

          <rect x="330" y="78" width="286" height="74" rx="8" fill="#1e293b" stroke="#ef4444" strokeWidth="1" />
          <text x="350" y="105" fill="#94a3b8" fontSize="11">TOTAL EXPENSES</text>
          <text x="350" y="135" fill="#f87171" fontSize="22" fontWeight="800">-$1,350.00</text>

          {/* Transactions List */}
          <rect x="24" y="166" width="592" height="166" rx="8" fill="#1e293b" stroke="#334155" strokeWidth="1" />
          <text x="44" y="196" fill="#f8fafc" fontSize="13" fontWeight="700">Recent Transactions</text>

          <rect x="44" y="210" width="552" height="34" rx="4" fill="#0f172a" />
          <text x="60" y="232" fill="#cbd5e1" fontSize="11">Freelance Odoo Consulting</text>
          <text x="560" y="232" fill="#34d399" fontSize="12" fontWeight="700" textAnchor="end">+$1,500.00</text>

          <rect x="44" y="252" width="552" height="34" rx="4" fill="#0f172a" />
          <text x="60" y="274" fill="#cbd5e1" fontSize="11">AWS Cloud Hosting Server</text>
          <text x="560" y="274" fill="#f87171" fontSize="12" fontWeight="700" textAnchor="end">-$85.00</text>

          <rect x="44" y="294" width="552" height="30" rx="4" fill="#0f172a" />
          <text x="60" y="314" fill="#cbd5e1" fontSize="11">Hardware &amp; Monitor Setup</text>
          <text x="560" y="314" fill="#f87171" fontSize="12" fontWeight="700" textAnchor="end">-$340.00</text>
        </svg>
      );

    // 13. To-Do Task Manager
    case 'to-do-task-manager':
      return (
        <svg {...commonProps}>
          <rect width="640" height="360" fill="#111827" />
          {/* Header */}
          <rect x="80" y="20" width="480" height="44" rx="8" fill="#1f2937" stroke="#374151" strokeWidth="1" />
          <text x="100" y="48" fill="#f59e0b" fontSize="16" fontWeight="800">To-Do Master Checklist</text>
          <text x="460" y="47" fill="#10b981" fontSize="12" fontWeight="700">4 Completed</text>

          {/* Add Input Bar */}
          <rect x="80" y="78" width="370" height="42" rx="6" fill="#1f2937" stroke="#374151" strokeWidth="1" />
          <text x="100" y="104" fill="#9ca3af" fontSize="12">+ Add a high priority task...</text>
          <rect x="460" y="78" width="100" height="42" rx="6" fill="#f59e0b" />
          <text x="510" y="104" fill="#111827" fontSize="12" fontWeight="800" textAnchor="middle">ADD TASK</text>

          {/* Task 1: Completed */}
          <rect x="80" y="136" width="480" height="48" rx="6" fill="#1f2937" stroke="#10b981" strokeWidth="1" />
          <circle cx="110" cy="160" r="10" fill="#10b981" />
          <text x="110" y="164" fill="#ffffff" fontSize="11" fontWeight="800" textAnchor="middle">✓</text>
          <text x="135" y="164" fill="#6b7280" fontSize="13" textDecoration="line-through">Deploy Odoo v18 Helpdesk custom module to staging</text>

          {/* Task 2: Active */}
          <rect x="80" y="196" width="480" height="48" rx="6" fill="#1f2937" stroke="#374151" strokeWidth="1" />
          <circle cx="110" cy="220" r="10" fill="#374151" />
          <text x="135" y="224" fill="#f9fafb" fontSize="13" fontWeight="600">Audit Shopify Dawn Theme for Core Web Vitals CRO</text>
          <rect x="480" y="210" width="60" height="20" rx="10" fill="#ef4444" fillOpacity="0.2" />
          <text x="510" y="224" fill="#f87171" fontSize="9" fontWeight="700" textAnchor="middle">URGENT</text>

          {/* Task 3: Active */}
          <rect x="80" y="256" width="480" height="48" rx="6" fill="#1f2937" stroke="#374151" strokeWidth="1" />
          <circle cx="110" cy="280" r="10" fill="#374151" />
          <text x="135" y="284" fill="#f9fafb" fontSize="13" fontWeight="600">Connect marketplace webhook endpoints with REST API</text>
          <rect x="480" y="270" width="60" height="20" rx="10" fill="#f59e0b" fillOpacity="0.2" />
          <text x="510" y="284" fill="#fbbf24" fontSize="9" fontWeight="700" textAnchor="middle">IN DEV</text>
        </svg>
      );

    // 14. Interactive Quiz Application
    case 'interactive-quiz-application':
      return (
        <svg {...commonProps}>
          <rect width="640" height="360" fill="#0f172a" />
          <rect x="40" y="20" width="560" height="42" rx="6" fill="#1e293b" />
          <text x="60" y="46" fill="#38bdf8" fontSize="13" fontWeight="800">Quiz Challenge • Question 4 of 10</text>
          <text x="520" y="46" fill="#e5a93c" fontSize="12" fontWeight="700">Score: 300 pts</text>

          {/* Question Box */}
          <rect x="40" y="74" width="560" height="70" rx="8" fill="#1e293b" stroke="#334155" strokeWidth="1" />
          <text x="60" y="114" fill="#f8fafc" fontSize="15" fontWeight="700">Which Odoo model handles analytic timesheet billing entries?</text>

          {/* 4 Choices */}
          <rect x="40" y="156" width="270" height="52" rx="6" fill="#1e293b" stroke="#334155" strokeWidth="1" />
          <text x="60" y="187" fill="#cbd5e1" fontSize="12">A. hr.timesheet.record</text>

          {/* Correct Choice */}
          <rect x="330" y="156" width="270" height="52" rx="6" fill="#10b981" fillOpacity="0.2" stroke="#10b981" strokeWidth="2" />
          <text x="350" y="187" fill="#34d399" fontSize="12" fontWeight="700">B. account.analytic.line ✓</text>

          <rect x="40" y="220" width="270" height="52" rx="6" fill="#1e293b" stroke="#334155" strokeWidth="1" />
          <text x="60" y="251" fill="#cbd5e1" fontSize="12">C. project.billing.entry</text>

          <rect x="330" y="220" width="270" height="52" rx="6" fill="#1e293b" stroke="#334155" strokeWidth="1" />
          <text x="350" y="251" fill="#cbd5e1" fontSize="12">D. res.timesheet.line</text>

          {/* Timer bar */}
          <rect x="40" y="295" width="560" height="8" rx="4" fill="#334155" />
          <rect x="40" y="295" width="380" height="8" rx="4" fill="#38bdf8" />
        </svg>
      );

    // 15. Client-Side Registration Form
    case 'client-side-registration-form':
      return (
        <svg {...commonProps}>
          <rect width="640" height="360" fill="#111827" />
          <rect x="120" y="20" width="400" height="320" rx="10" fill="#1f2937" stroke="#374151" strokeWidth="1" />
          <text x="200" y="55" fill="#f9fafb" fontSize="16" fontWeight="800">Account Registration</text>

          {/* Field 1: Name */}
          <text x="150" y="86" fill="#d1d5db" fontSize="11">Full Name</text>
          <rect x="150" y="94" width="340" height="34" rx="6" fill="#111827" stroke="#10b981" strokeWidth="1" />
          <text x="165" y="116" fill="#f9fafb" fontSize="11">Rajkumar Raja</text>
          <circle cx="465" cy="111" r="7" fill="#10b981" />
          <text x="465" y="115" fill="#111827" fontSize="10" fontWeight="900" textAnchor="middle">✓</text>

          {/* Field 2: Email */}
          <text x="150" y="148" fill="#d1d5db" fontSize="11">Work Email</text>
          <rect x="150" y="156" width="340" height="34" rx="6" fill="#111827" stroke="#10b981" strokeWidth="1" />
          <text x="165" y="178" fill="#f9fafb" fontSize="11">rajkumarrajaco@gmail.com</text>
          <circle cx="465" cy="173" r="7" fill="#10b981" />
          <text x="465" y="177" fill="#111827" fontSize="10" fontWeight="900" textAnchor="middle">✓</text>

          {/* Field 3: Password */}
          <text x="150" y="210" fill="#d1d5db" fontSize="11">Password</text>
          <rect x="150" y="218" width="340" height="34" rx="6" fill="#111827" stroke="#10b981" strokeWidth="1" />
          <text x="165" y="240" fill="#f9fafb" fontSize="11">••••••••••••••••</text>
          <circle cx="465" cy="235" r="7" fill="#10b981" />
          <text x="465" y="239" fill="#111827" fontSize="10" fontWeight="900" textAnchor="middle">✓</text>

          {/* Password strength */}
          <rect x="150" y="260" width="340" height="4" rx="2" fill="#374151" />
          <rect x="150" y="260" width="340" height="4" rx="2" fill="#10b981" />

          {/* Button */}
          <rect x="150" y="280" width="340" height="38" rx="6" fill="#e5a93c" />
          <text x="320" y="304" fill="#0b0d14" fontSize="12" fontWeight="800" textAnchor="middle">Register Account</text>
        </svg>
      );

    // 16. Rate Calculator
    case 'rate-calculator':
      return (
        <svg {...commonProps}>
          <rect width="640" height="360" fill="#0b132b" />
          <rect x="120" y="24" width="400" height="312" rx="12" fill="#1c2541" stroke="#3a506b" strokeWidth="1" />
          <text x="320" y="60" fill="#6fffe9" fontSize="18" fontWeight="800" textAnchor="middle">Currency Rate Calculator</text>

          {/* From Input */}
          <rect x="150" y="85" width="220" height="50" rx="8" fill="#0b132b" stroke="#3a506b" strokeWidth="1" />
          <text x="170" y="116" fill="#f8fafc" fontSize="20" fontWeight="700">1,000.00</text>
          <rect x="380" y="85" width="110" height="50" rx="8" fill="#3a506b" />
          <text x="435" y="116" fill="#ffffff" fontSize="14" fontWeight="800" textAnchor="middle">USD ($)</text>

          {/* Exchange Icon */}
          <circle cx="320" cy="165" r="18" fill="#6fffe9" />
          <text x="320" y="171" fill="#0b132b" fontSize="16" fontWeight="900" textAnchor="middle">⇅</text>

          {/* To Input */}
          <rect x="150" y="195" width="220" height="50" rx="8" fill="#0b132b" stroke="#6fffe9" strokeWidth="1" />
          <text x="170" y="226" fill="#6fffe9" fontSize="20" fontWeight="700">83,420.00</text>
          <rect x="380" y="195" width="110" height="50" rx="8" fill="#3a506b" />
          <text x="435" y="226" fill="#ffffff" fontSize="14" fontWeight="800" textAnchor="middle">INR (₹)</text>

          {/* Exchange Rate Badge */}
          <rect x="150" y="268" width="340" height="36" rx="6" fill="#0b132b" />
          <text x="320" y="291" fill="#cbd5e1" fontSize="12" textAnchor="middle">Mid-market rate: 1 USD = 83.42 INR</text>
        </svg>
      );

    // 17. Launch Countdown Timer
    case 'launch-countdown-timer':
      return (
        <svg {...commonProps}>
          <rect width="640" height="360" fill="#191a24" />
          <text x="320" y="70" fill="#ffffff" fontSize="20" fontWeight="800" letterSpacing="4" textAnchor="middle">WE'RE LAUNCHING SOON</text>

          {/* 4 Flip Boxes */}
          {/* Days */}
          <rect x="50" y="110" width="115" height="130" rx="10" fill="#343650" />
          <rect x="50" y="110" width="115" height="65" rx="10" fill="#2b2d42" />
          <line x1="50" y1="175" x2="165" y2="175" stroke="#191a24" strokeWidth="3" />
          <text x="107" y="190" fill="#fb7185" fontSize="48" fontWeight="900" textAnchor="middle">14</text>
          <text x="107" y="270" fill="#8486a9" fontSize="11" fontWeight="700" letterSpacing="2" textAnchor="middle">DAYS</text>

          {/* Hours */}
          <rect x="190" y="110" width="115" height="130" rx="10" fill="#343650" />
          <rect x="190" y="110" width="115" height="65" rx="10" fill="#2b2d42" />
          <line x1="190" y1="175" x2="305" y2="175" stroke="#191a24" strokeWidth="3" />
          <text x="247" y="190" fill="#fb7185" fontSize="48" fontWeight="900" textAnchor="middle">08</text>
          <text x="247" y="270" fill="#8486a9" fontSize="11" fontWeight="700" letterSpacing="2" textAnchor="middle">HOURS</text>

          {/* Minutes */}
          <rect x="330" y="110" width="115" height="130" rx="10" fill="#343650" />
          <rect x="330" y="110" width="115" height="65" rx="10" fill="#2b2d42" />
          <line x1="330" y1="175" x2="445" y2="175" stroke="#191a24" strokeWidth="3" />
          <text x="387" y="190" fill="#fb7185" fontSize="48" fontWeight="900" textAnchor="middle">45</text>
          <text x="387" y="270" fill="#8486a9" fontSize="11" fontWeight="700" letterSpacing="2" textAnchor="middle">MINUTES</text>

          {/* Seconds */}
          <rect x="470" y="110" width="115" height="130" rx="10" fill="#343650" />
          <rect x="470" y="110" width="115" height="65" rx="10" fill="#2b2d42" />
          <line x1="470" y1="175" x2="585" y2="175" stroke="#191a24" strokeWidth="3" />
          <text x="527" y="190" fill="#fb7185" fontSize="48" fontWeight="900" textAnchor="middle">22</text>
          <text x="527" y="270" fill="#8486a9" fontSize="11" fontWeight="700" letterSpacing="2" textAnchor="middle">SECONDS</text>
        </svg>
      );

    // 18. Analog Clock
    case 'analog-clock':
      return (
        <svg {...commonProps}>
          <rect width="640" height="360" fill="#0b0e14" />
          <circle cx="320" cy="180" r="140" fill="#131926" stroke="#e5a93c" strokeWidth="4" />
          <circle cx="320" cy="180" r="128" fill="#161f30" stroke="#25324d" strokeWidth="1" />

          {/* Hour markers */}
          <text x="320" y="78" fill="#e5a93c" fontSize="16" fontWeight="900" textAnchor="middle">12</text>
          <text x="430" y="186" fill="#e5a93c" fontSize="16" fontWeight="900" textAnchor="middle">3</text>
          <text x="320" y="295" fill="#e5a93c" fontSize="16" fontWeight="900" textAnchor="middle">6</text>
          <text x="210" y="186" fill="#e5a93c" fontSize="16" fontWeight="900" textAnchor="middle">9</text>

          {/* Clock Hands */}
          {/* Hour Hand */}
          <line x1="320" y1="180" x2="370" y2="140" stroke="#e5a93c" strokeWidth="6" strokeLinecap="round" />
          {/* Minute Hand */}
          <line x1="320" y1="180" x2="320" y2="90" stroke="#22d3ee" strokeWidth="4" strokeLinecap="round" />
          {/* Second Hand */}
          <line x1="320" y1="200" x2="320" y2="76" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" />
          {/* Center Pivot */}
          <circle cx="320" cy="180" r="8" fill="#e5a93c" />
          <circle cx="320" cy="180" r="3" fill="#0b0e14" />
          <text x="320" y="235" fill="#94a3b8" fontSize="10" letterSpacing="2" textAnchor="middle">RAJKUMAR RAJA</text>
        </svg>
      );

    // 19. Tic-Tac-Toe Game
    case 'tic-tac-toe-game':
      return (
        <svg {...commonProps}>
          <rect width="640" height="360" fill="#0d111d" />
          <text x="320" y="44" fill="#10b981" fontSize="16" fontWeight="800" textAnchor="middle">Player X Wins! 🏆</text>

          {/* 3x3 Grid Lines */}
          <line x1="280" y1="65" x2="280" y2="315" stroke="#25324d" strokeWidth="6" strokeLinecap="round" />
          <line x1="360" y1="65" x2="360" y2="315" stroke="#25324d" strokeWidth="6" strokeLinecap="round" />
          <line x1="195" y1="150" x2="445" y2="150" stroke="#25324d" strokeWidth="6" strokeLinecap="round" />
          <line x1="195" y1="230" x2="445" y2="230" stroke="#25324d" strokeWidth="6" strokeLinecap="round" />

          {/* Row 1 */}
          {/* (1,1) X */}
          <text x="237" y="130" fill="#e5a93c" fontSize="56" fontWeight="900" textAnchor="middle">X</text>
          {/* (1,2) O */}
          <text x="320" y="130" fill="#22d3ee" fontSize="56" fontWeight="900" textAnchor="middle">O</text>
          {/* (1,3) empty */}

          {/* Row 2 */}
          {/* (2,1) O */}
          <text x="237" y="210" fill="#22d3ee" fontSize="56" fontWeight="900" textAnchor="middle">O</text>
          {/* (2,2) X */}
          <text x="320" y="210" fill="#e5a93c" fontSize="56" fontWeight="900" textAnchor="middle">X</text>
          {/* (2,3) empty */}

          {/* Row 3 */}
          {/* (3,1) O */}
          <text x="237" y="290" fill="#22d3ee" fontSize="56" fontWeight="900" textAnchor="middle">O</text>
          {/* (3,2) empty */}
          {/* (3,3) X */}
          <text x="402" y="290" fill="#e5a93c" fontSize="56" fontWeight="900" textAnchor="middle">X</text>

          {/* Winning Diagonal Line (X from top-left to bottom-right) */}
          <line x1="215" y1="85" x2="425" y2="295" stroke="#10b981" strokeWidth="6" strokeLinecap="round" />
        </svg>
      );

    // 20. Rock Paper Scissors Game
    case 'rock-paper-scissors-game':
      return (
        <svg {...commonProps}>
          <rect width="640" height="360" fill="#141539" />
          {/* Score Header */}
          <rect x="140" y="20" width="360" height="54" rx="8" stroke="#ffffff" strokeOpacity="0.3" strokeWidth="2" fill="none" />
          <text x="160" y="44" fill="#ffffff" fontSize="13" fontWeight="800">ROCK</text>
          <text x="160" y="58" fill="#ffffff" fontSize="13" fontWeight="800">PAPER SCISSORS</text>
          <rect x="410" y="26" width="76" height="42" rx="6" fill="#ffffff" />
          <text x="448" y="42" fill="#2a46c0" fontSize="9" fontWeight="700" textAnchor="middle">SCORE</text>
          <text x="448" y="62" fill="#3b4363" fontSize="20" fontWeight="900" textAnchor="middle">12</text>

          {/* Arena Triangle */}
          <polygon points="320,130 200,280 440,280" fill="none" stroke="#10132b" strokeWidth="18" strokeLinejoin="round" />

          {/* Rock (Bottom Right) */}
          <circle cx="440" cy="275" r="44" fill="#dc2626" />
          <circle cx="440" cy="275" r="34" fill="#ffffff" />
          <text x="440" y="283" fill="#1f2937" fontSize="24" textAnchor="middle">✊</text>

          {/* Paper (Top) */}
          <circle cx="320" cy="130" r="44" fill="#4f46e5" />
          <circle cx="320" cy="130" r="34" fill="#ffffff" />
          <text x="320" y="138" fill="#1f2937" fontSize="24" textAnchor="middle">✋</text>

          {/* Scissors (Bottom Left) */}
          <circle cx="200" cy="275" r="44" fill="#f59e0b" />
          <circle cx="200" cy="275" r="34" fill="#ffffff" />
          <text x="200" y="283" fill="#1f2937" fontSize="24" textAnchor="middle">✌️</text>
        </svg>
      );

    // 21. Pig Dice Game
    case 'pig-dice-game':
      return (
        <svg {...commonProps}>
          <rect width="640" height="360" fill="#0d111a" />
          {/* Player 1 Pane (Active) */}
          <rect x="40" y="24" width="260" height="312" rx="12" fill="#1c2333" stroke="#e5a93c" strokeWidth="2" />
          <text x="170" y="65" fill="#e5a93c" fontSize="20" fontWeight="800" textAnchor="middle">PLAYER 1</text>
          <text x="170" y="125" fill="#f8fafc" fontSize="56" fontWeight="900" textAnchor="middle">64</text>
          <rect x="90" y="210" width="160" height="80" rx="8" fill="#e5a93c" fillOpacity="0.2" />
          <text x="170" y="240" fill="#fcd34d" fontSize="11" fontWeight="700" textAnchor="middle">CURRENT ROUND</text>
          <text x="170" y="275" fill="#f8fafc" fontSize="28" fontWeight="800" textAnchor="middle">18</text>

          {/* Center 3D Dice */}
          <rect x="290" y="110" width="60" height="60" rx="10" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" />
          <circle cx="304" cy="124" r="4" fill="#1e293b" />
          <circle cx="336" cy="124" r="4" fill="#1e293b" />
          <circle cx="320" cy="140" r="4" fill="#ef4444" />
          <circle cx="304" cy="156" r="4" fill="#1e293b" />
          <circle cx="336" cy="156" r="4" fill="#1e293b" />

          {/* Action Buttons */}
          <rect x="270" y="200" width="100" height="30" rx="15" fill="#22c55e" />
          <text x="320" y="219" fill="#ffffff" fontSize="11" fontWeight="800" textAnchor="middle">🎲 ROLL DICE</text>
          <rect x="270" y="242" width="100" height="30" rx="15" fill="#ef4444" />
          <text x="320" y="261" fill="#ffffff" fontSize="11" fontWeight="800" textAnchor="middle">📥 HOLD</text>

          {/* Player 2 Pane */}
          <rect x="340" y="24" width="260" height="312" rx="12" fill="#131722" stroke="#232a3d" strokeWidth="1" />
          <text x="470" y="65" fill="#94a3b8" fontSize="20" fontWeight="700" textAnchor="middle">PLAYER 2</text>
          <text x="470" y="125" fill="#64748b" fontSize="56" fontWeight="900" textAnchor="middle">42</text>
          <rect x="390" y="210" width="160" height="80" rx="8" fill="#1a202c" />
          <text x="470" y="240" fill="#94a3b8" fontSize="11" fontWeight="700" textAnchor="middle">CURRENT ROUND</text>
          <text x="470" y="275" fill="#cbd5e1" fontSize="28" fontWeight="800" textAnchor="middle">0</text>
        </svg>
      );

    default:
      return (
        <svg {...commonProps}>
          <defs>
            <linearGradient id="custom-proj-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#1e2438" />
              <stop offset="50%" stopColor="#141824" />
              <stop offset="100%" stopColor="#0b0e18" />
            </linearGradient>
            <pattern id="custom-grid" width="24" height="24" patternUnits="userSpaceOnUse">
              <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#222b40" strokeWidth="0.8" opacity="0.6" />
            </pattern>
          </defs>
          <rect width="640" height="360" fill="url(#custom-proj-grad)" />
          <rect width="640" height="360" fill="url(#custom-grid)" />
          {/* Header Bar */}
          <rect x="24" y="24" width="592" height="42" rx="8" fill="#181e30" stroke="#2b344e" strokeWidth="1" />
          <circle cx="48" cy="45" r="5" fill="#ef4444" />
          <circle cx="66" cy="45" r="5" fill="#f59e0b" />
          <circle cx="84" cy="45" r="5" fill="#10b981" />
          <text x="110" y="49" fill="#94a3b8" fontSize="12" fontWeight="600" fontFamily="monospace">Admin Published Application</text>
          
          {/* Center Showcase Card */}
          <rect x="70" y="95" width="500" height="215" rx="14" fill="#0f1320" stroke="#e5a93c" strokeWidth="1" strokeOpacity="0.4" />
          <circle cx="320" cy="155" r="34" fill="#e5a93c" fillOpacity="0.12" stroke="#e5a93c" strokeWidth="1.5" />
          <path d="M 310 145 L 330 155 L 310 165 Z" fill="#e5a93c" />
          <text x="320" y="222" fill="#ffffff" fontSize="18" fontWeight="800" textAnchor="middle">{title}</text>
          <rect x="235" y="245" width="170" height="26" rx="13" fill="#e5a93c" fillOpacity="0.15" stroke="#e5a93c" strokeWidth="1" />
          <text x="320" y="262" fill="#e5a93c" fontSize="11" fontWeight="700" textAnchor="middle">✨ Production Showcase</text>
        </svg>
      );
  }
};
