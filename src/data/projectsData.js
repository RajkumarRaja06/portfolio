export const PROJECT_CATEGORIES = [
  { id: 'all', label: 'All Projects' },
  { id: 'odoo', label: 'Odoo' },
  { id: 'react', label: 'React' },
  { id: 'html-css', label: 'HTML & CSS' },
];

export const PROJECTS = [
  // 1. ODOO PROJECTS (1-4)
  {
    id: 'helpdesk-timesheet-portals',
    title: 'Helpdesk & Timesheet Portals',
    category: 'Odoo',
    categoryId: 'odoo',
    badge: 'Odoo Enterprise',
    description:
      'Custom customer service ticket portal with real-time Chatter integration, automated SLA escalation policies, timesheet tracking, and granular client role-based permissions across Odoo v16–v19.',
    techStack: ['Odoo v16–v19', 'Python', 'QWeb/XML', 'PostgreSQL', 'Chatter API'],
    hasModal: true,
    architecture: {
      overview:
        'Bi-directional portal architecture enabling external clients to log support tickets, view live SLA countdowns, and track timesheet billing lines without exposing core ERP internal views.',
      keyHighlights: [
        'Inherited `helpdesk.ticket` model with customized computed SLA countdown fields',
        'Secure customer portal controller with CSRF verification and ACL access rules',
        'Automated mail notifications via QWeb mail templates and Chatter synchronization',
        'Real-time automated timesheet entry generation upon ticket resolution'
      ],
      codeSnippet: `# -*- coding: utf-8 -*-
from odoo import models, fields, api, _
from odoo.exceptions import ValidationError

class HelpdeskTicketCustom(models.Model):
    _inherit = 'helpdesk.ticket'

    client_priority_level = fields.Selection([
        ('p1', 'Urgent - System Down'),
        ('p2', 'High - Critical Workflow Blocked'),
        ('p3', 'Medium - Feature Request'),
        ('p4', 'Low - General Inquiry'),
    ], string="Client SLA Tier", default='p3', tracking=True)

    timesheet_line_ids = fields.One2many(
        'account.analytic.line', 'helpdesk_ticket_id',
        string="Analytic Timesheet Entries"
    )
    total_billable_hours = fields.Float(
        string="Total Billed Hours",
        compute='_compute_total_billable_hours',
        store=True
    )

    @api.depends('timesheet_line_ids.unit_amount')
    def _compute_total_billable_hours(self):
        for ticket in self:
            ticket.total_billable_hours = sum(
                line.unit_amount for line in ticket.timesheet_line_ids
            )

    def action_resolve_and_log_timesheet(self, duration, memo):
        self.ensure_one()
        if duration <= 0.0:
            raise ValidationError(_("Logged duration must be greater than zero."))
        self.env['account.analytic.line'].sudo().create({
            'name': memo or _("Ticket resolution timesheet"),
            'unit_amount': duration,
            'helpdesk_ticket_id': self.id,
            'user_id': self.env.user.id,
        })
        self.write({'stage_id': self.env.ref('helpdesk.stage_solved').id})
        self.message_post(body=_("Ticket solved and %s hrs logged to timesheet.") % duration)`
    }
  },
  {
    id: 'marketplace-data-importer',
    title: 'Marketplace Data Importer',
    category: 'Odoo',
    categoryId: 'odoo',
    badge: 'Odoo Integration',
    description:
      'High-throughput REST API ingestion pipeline synchronizing external e-commerce orders, inventory valuations, and webhook payloads into Odoo Sales & Inventory modules with idempotency.',
    techStack: ['Python', 'Odoo ORM', 'REST API', 'PostgreSQL', 'Postman'],
    hasModal: true,
    architecture: {
      overview:
        'RESTful webhook ingestion service parsing incoming JSON payloads from multi-channel marketplaces, mapping external SKU IDs to Odoo product variants, and batch-creating validated sale orders.',
      keyHighlights: [
        'Idempotent transaction tokens preventing duplicate order creation on network retries',
        'Automatic partner creation and tax fiscal position resolution',
        'Stock reservation and warehouse picking validation with real-time error telemetry',
        'Unit tested with Postman collections covering edge-case payload validation'
      ],
      codeSnippet: `# -*- coding: utf-8 -*-
from odoo import http, fields, _
from odoo.http import request
import json
import logging

_logger = logging.getLogger(__name__)

class MarketplaceOrderAPIController(http.Controller):

    @http.route('/api/v1/marketplace/sync_orders', type='json', auth='api_key', methods=['POST'], csrf=False)
    def sync_marketplace_orders(self, **post):
        try:
            payload = request.get_json_data()
            orders_data = payload.get('orders', [])
            synced_orders = []

            for raw_order in orders_data:
                external_id = raw_order.get('external_order_id')
                # Idempotency check: prevent duplicate imports
                existing = request.env['sale.order'].sudo().search([
                    ('client_order_ref', '=', external_id)
                ], limit=1)
                if existing:
                    synced_orders.append({'order_ref': external_id, 'status': 'already_synced', 'odoo_id': existing.id})
                    continue

                # Resolve or create partner record
                partner = request.env['res.partner'].sudo().find_or_create_by_email(
                    email=raw_order.get('customer_email'),
                    name=raw_order.get('customer_name')
                )

                # Construct order lines
                order_lines = []
                for item in raw_order.get('items', []):
                    product = request.env['product.product'].sudo().search([
                        ('default_code', '=', item.get('sku'))
                    ], limit=1)
                    if product:
                        order_lines.append((0, 0, {
                            'product_id': product.id,
                            'product_uom_qty': item.get('quantity', 1),
                            'price_unit': item.get('unit_price', product.list_price),
                        }))

                sale_order = request.env['sale.order'].sudo().create({
                    'partner_id': partner.id,
                    'client_order_ref': external_id,
                    'order_line': order_lines,
                    'origin': f"Marketplace Sync: {raw_order.get('channel_name')}",
                })
                sale_order.action_confirm()
                synced_orders.append({'order_ref': external_id, 'status': 'confirmed', 'odoo_id': sale_order.id})

            return {'success': True, 'count': len(synced_orders), 'results': synced_orders}
        except Exception as e:
            _logger.error("Marketplace sync failed: %s", str(e), exc_info=True)
            return {'success': False, 'error': str(e)}`
    }
  },
  {
    id: 'custom-odoo-erp-module-suite',
    title: 'Custom Odoo ERP Module Suite',
    category: 'Odoo',
    categoryId: 'odoo',
    badge: 'Odoo Core ERP',
    description:
      'Enterprise-grade multi-module ERP extension covering Sales, Purchase, Inventory, and Financial reporting with custom QWeb PDF templates, automated approval tiers, and reordering rules.',
    techStack: ['Odoo v16–v19', 'Python ORM', 'QWeb Reports', 'PostgreSQL', 'XML Views'],
    hasModal: true,
    architecture: {
      overview:
        'Complete business logic customization extending base Odoo models with custom pricing approval matrices, warehouse automated picking routes, and dynamic multi-currency financial PDF reports.',
      keyHighlights: [
        'Inherited `sale.order` with tiered manager approval thresholds for heavy discounts',
        'Cross-model automated stock reordering triggers for low inventory buffers',
        'Bespoke QWeb XML PDF invoice and quotation templates with company branding',
        'Customized kanban, tree, and form views with contextual domain filters'
      ],
      codeSnippet: `# -*- coding: utf-8 -*-
from odoo import models, fields, api, _
from odoo.exceptions import UserError

class SaleOrderCustom(models.Model):
    _inherit = 'sale.order'

    approval_state = fields.Selection([
        ('draft', 'Draft Quotation'),
        ('pending_approval', 'Pending Manager Approval'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
    ], string="Discount Approval Status", default='draft', tracking=True)

    max_discount_pct = fields.Float(
        string="Max Line Discount (%)",
        compute='_compute_max_discount',
        store=True
    )

    @api.depends('order_line.discount')
    def _compute_max_discount(self):
        for order in self:
            order.max_discount_pct = max(order.order_line.mapped('discount') or [0.0])

    def action_confirm(self):
        for order in self:
            # Enforce 15% discount approval rule
            if order.max_discount_pct > 15.0 and order.approval_state != 'approved':
                order.write({'approval_state': 'pending_approval'})
                order.activity_schedule(
                    'mail.mail_activity_data_todo',
                    summary=_("Quotation requires manager discount sign-off."),
                    user_id=order.team_id.user_id.id or self.env.ref('base.user_admin').id
                )
                raise UserError(_("Discount exceeds 15%. Order sent for Manager Approval."))
        return super(SaleOrderCustom, self).action_confirm()`
    }
  },
  {
    id: 'storefront-theme-seo-audits',
    title: 'Storefront Theme & Technical SEO Audits',
    category: 'Odoo',
    categoryId: 'odoo',
    badge: 'E-Commerce CRO',
    description:
      'Performance re-architecture and technical SEO overhaul for Shopify Liquid themes (Dawn & Dwell), boosting mobile Core Web Vitals to 95+ and implementing rich JSON-LD structured data.',
    techStack: ['Shopify Liquid', 'Dawn Theme', 'Technical SEO', 'CRO Audits', 'JSON-LD'],
    hasModal: true,
    architecture: {
      overview:
        'Complete front-end audit and conversion-rate optimization targeting Largest Contentful Paint (LCP), Cumulative Layout Shift (CLS), and semantic schema trees for top organic search visibility.',
      keyHighlights: [
        'Eliminated render-blocking assets and asynchronous script execution pipelines',
        'Implemented comprehensive JSON-LD Product & Review structured data schemas',
        'Optimized responsive image loading with modern srcset and native lazy-loading',
        'Boosted mobile Google PageSpeed score from 58 to 96 on high-traffic storefronts'
      ],
      codeSnippet: `<!-- Snippet: snippets/product-json-ld.liquid -->
<script type="application/ld+json">
{
  "@context": "https://schema.org/",
  "@type": "Product",
  "name": {{ product.title | json }},
  "image": [
    {%- for image in product.images limit: 3 -%}
      {{ image.src | image_url: width: 1200 | prepend: "https:" | json }}{%- unless forloop.last -%},{%- endunless -%}
    {%- endfor -%}
  ],
  "description": {{ product.description | strip_html | truncatewords: 45 | json }},
  "sku": {{ product.selected_or_first_available_variant.sku | default: product.id | json }},
  "brand": {
    "@type": "Brand",
    "name": {{ product.vendor | json }}
  },
  "offers": {
    "@type": "Offer",
    "url": {{ shop.url | append: product.url | json }},
    "priceCurrency": {{ cart.currency.iso_code | json }},
    "price": {{ product.selected_or_first_available_variant.price | divided_by: 100.00 | json }},
    "itemCondition": "https://schema.org/NewCondition",
    "availability": "https://schema.org/{% if product.available %}InStock{% else %}OutOfStock{% endif %}",
    "seller": {
      "@type": "Organization",
      "name": {{ shop.name | json }}
    }
  }
}
</script>`
    }
  },

  // 2. REACT PROJECTS (5-7)
  {
    id: 'food-delivery-web-application',
    title: 'Food Delivery Web Application',
    category: 'React',
    categoryId: 'react',
    badge: 'React App',
    description:
      'QUICKEAT — A responsive food ordering platform engineered with React.js, Firebase Auth, contextual cart state management with useReducer, live search filtering, and instant checkout flow.',
    techStack: ['React JS', 'Firebase', 'useContext', 'useReducer', 'CSS Modules'],
    liveUrl: 'https://rajkumarraja-food-delivery-app.netlify.app/',
    githubUrl: 'https://github.com/RajkumarRaja06/food-delivery-app',
  },
  {
    id: 'full-stack-e-commerce-store',
    title: 'Full-Stack E-Commerce Store',
    category: 'React',
    categoryId: 'react',
    badge: 'React E-Commerce',
    description:
      'Dress Shop — Multi-category apparel retail storefront with dynamic category filters, product detail views, real-time cart ledger calculation, and persistent storage synchronization.',
    techStack: ['React JS', 'Context API', 'JavaScript ES6+', 'HTML5', 'Responsive CSS'],
    liveUrl: 'https://rajkumarraja-e-commerce.netlify.app/',
    githubUrl: 'https://github.com/RajkumarRaja06/e-commerce',
  },
  {
    id: 'react-publishing-blog-app',
    title: 'React Publishing & Blog App',
    category: 'React',
    categoryId: 'react',
    badge: 'React App',
    description:
      'Modern content publishing web application featuring secure user authentication, markdown content editor, dynamic post CRUD operations, tags, and category exploration.',
    techStack: ['React JS', 'REST API', 'JavaScript', 'HTML5/CSS3', 'Netlify Deploy'],
    liveUrl: 'https://rajkumarraja-blog.netlify.app/',
    githubUrl: 'https://github.com/RajkumarRaja06/react-blog',
  },

  // 3. HTML & CSS PROJECTS (8-21)
  {
    id: 'previous-personal-portfolio-website',
    title: 'Previous Personal Portfolio Website',
    category: 'HTML & CSS',
    categoryId: 'html-css',
    badge: 'Web Portfolio',
    description:
      'Initial personal portfolio showcasing earlier projects, smooth scrolling sections, clean modern layouts, and contact links built with pure semantic HTML5 and CSS3 styling.',
    techStack: ['HTML5', 'CSS3', 'JavaScript ES6+', 'Netlify'],
    liveUrl: 'https://rajkumarraja-portfolio.netlify.app/',
    githubUrl: 'https://github.com/RajkumarRaja06/portfolio',
  },
  {
    id: 'countries-flag-explorer',
    title: 'Countries Flag Explorer',
    category: 'HTML & CSS',
    categoryId: 'html-css',
    badge: 'REST API App',
    description:
      'Interactive geography web app consuming the REST Countries API. Features dynamic flag rendering, live region filtering, search by country name, and population statistics.',
    techStack: ['JavaScript', 'REST API', 'HTML5', 'CSS Flexbox/Grid'],
    liveUrl: 'https://rajkumarraja06.github.io/countries-flag/',
    githubUrl: 'https://github.com/RajkumarRaja06/countries-flag',
  },
  {
    id: 'interactive-resume-builder',
    title: 'Interactive Resume Builder',
    category: 'HTML & CSS',
    categoryId: 'html-css',
    badge: 'Productivity Tool',
    description:
      'Feature-rich client-side CV generator allowing users to enter career credentials, preview live formatted resume cards, and print or export to PDF formatted documents.',
    techStack: ['HTML5', 'CSS3', 'JavaScript DOM', 'Print Media CSS'],
    liveUrl: 'https://rajkumarraja06.github.io/resume-builder.github.io/',
    githubUrl: 'https://github.com/RajkumarRaja06/resume-builder.github.io',
  },
  {
    id: 'basic-resume-builder',
    title: 'Basic Resume Builder',
    category: 'HTML & CSS',
    categoryId: 'html-css',
    badge: 'Productivity Tool',
    description:
      'Minimalist resume creation application focused on instant data binding, clean typography hierarchy, and quick printable formatting for entry-level professionals.',
    techStack: ['HTML5', 'CSS3', 'JavaScript'],
    liveUrl: 'https://rajkumarraja06.github.io/basic-resume-builder/',
    githubUrl: 'https://github.com/RajkumarRaja06/basic-resume-builder',
  },
  {
    id: 'personal-expense-tracker',
    title: 'Personal Expense Tracker',
    category: 'HTML & CSS',
    categoryId: 'html-css',
    badge: 'Finance App',
    description:
      'Finance management tool allowing users to log credits and debits, calculate running balances in real-time, categorize expense items, and persist transaction logs.',
    techStack: ['JavaScript', 'HTML5', 'CSS3', 'LocalStorage API'],
    liveUrl: 'https://rajkumarraja06.github.io/expense-tracker.github.io/',
    githubUrl: 'https://github.com/RajkumarRaja06/expense-tracker.github.io',
  },
  {
    id: 'to-do-task-manager',
    title: 'To-Do Task Manager',
    category: 'HTML & CSS',
    categoryId: 'html-css',
    badge: 'Productivity App',
    description:
      'Intuitive task tracker featuring dynamic item creation, completion toggles, deletion workflows, and persistent client storage for daily productivity.',
    techStack: ['HTML5', 'CSS3', 'Vanilla JS', 'DOM Manipulation'],
    liveUrl: 'https://rajkumarraja06.github.io/to-do-app.github.io/',
    githubUrl: 'https://github.com/RajkumarRaja06/to-do-app.github.io',
  },
  {
    id: 'interactive-quiz-application',
    title: 'Interactive Quiz Application',
    category: 'HTML & CSS',
    categoryId: 'html-css',
    badge: 'Web App',
    description:
      'Timed web quiz application with multiple-choice questions, dynamic score calculation, visual feedback on correct/incorrect choices, and a final performance review.',
    techStack: ['JavaScript ES6+', 'HTML5', 'CSS Keyframes'],
    liveUrl: 'https://rajkumarraja06.github.io/quiz-app.github.io/',
    githubUrl: 'https://github.com/RajkumarRaja06/quiz-app.github.io',
  },
  {
    id: 'client-side-registration-form',
    title: 'Client-Side Registration Form',
    category: 'HTML & CSS',
    categoryId: 'html-css',
    badge: 'Form Validation',
    description:
      'Robust user registration form featuring real-time client-side regex validation, password strength indicators, accessible error alerts, and clean UI styling.',
    techStack: ['HTML5 Form API', 'CSS3', 'JavaScript Regex'],
    liveUrl: 'https://rajkumarraja06.github.io/registration-form-client-side.github.io/',
    githubUrl: 'https://github.com/RajkumarRaja06/registration-form-client-side.github.io',
  },
  {
    id: 'rate-calculator',
    title: 'Rate Calculator',
    category: 'HTML & CSS',
    categoryId: 'html-css',
    badge: 'Utility Tool',
    description:
      'Real-time currency and rate exchange calculator computing conversion rates dynamically across world currencies with responsive numeric input formatting.',
    techStack: ['JavaScript', 'HTML5', 'CSS3 Grid'],
    liveUrl: 'https://rajkumarraja06.github.io/rate-calculator.github.io/',
    githubUrl: 'https://github.com/RajkumarRaja06/rate-calculator.github.io',
  },
  {
    id: 'launch-countdown-timer',
    title: 'Launch Countdown Timer',
    category: 'HTML & CSS',
    categoryId: 'html-css',
    badge: 'UI Challenge',
    description:
      'Modern flip-card style event countdown timer tracking days, hours, minutes, and seconds remaining with fluid animations and responsive mobile viewports.',
    techStack: ['CSS 3D Transforms', 'HTML5', 'JavaScript Date API'],
    liveUrl: 'https://rajkumarraja06.github.io/launch-countdown-timer-main.github.io/',
    githubUrl: 'https://github.com/RajkumarRaja06/launch-countdown-timer-main.github.io',
  },
  {
    id: 'analog-clock',
    title: 'Analog Clock',
    category: 'HTML & CSS',
    categoryId: 'html-css',
    badge: 'UI Widget',
    description:
      'Sleek modern analog clock widget computing trigonometric hour, minute, and second angles with smooth CSS transitions and an architectural dark dial aesthetic.',
    techStack: ['CSS Transitions', 'SVG', 'JavaScript Intervals'],
    liveUrl: 'https://rajkumarraja06.github.io/analog-clock.github.io/',
    githubUrl: 'https://github.com/RajkumarRaja06/analog-clock.github.io',
  },
  {
    id: 'tic-tac-toe-game',
    title: 'Tic-Tac-Toe Game',
    category: 'HTML & CSS',
    categoryId: 'html-css',
    badge: 'Browser Game',
    description:
      'Classic two-player strategy game with interactive 3×3 grid, turn indicator, win line highlights, tie condition detection, and game state reset.',
    techStack: ['JavaScript Logic', 'HTML5', 'CSS Grid', 'Animation'],
    liveUrl: 'https://rajkumarraja06.github.io/tic-tac-toe-game.github.io/',
    githubUrl: 'https://github.com/RajkumarRaja06/tic-tac-toe-game.github.io',
  },
  {
    id: 'rock-paper-scissors-game',
    title: 'Rock Paper Scissors Game',
    category: 'HTML & CSS',
    categoryId: 'html-css',
    badge: 'Browser Game',
    description:
      'Interactive Rock-Paper-Scissors-Lizard-Spock game featuring step-by-step game state rules, animated outcome evaluation, and score persistence.',
    techStack: ['JavaScript ES6+', 'HTML5', 'CSS Flexbox', 'Sound effects'],
    liveUrl: 'https://rajkumarraja06.github.io/rock-paper-scissors-master.github.io/',
    githubUrl: 'https://github.com/RajkumarRaja06/rock-paper-scissors-master.github.io',
  },
  {
    id: 'pig-dice-game',
    title: 'Pig Dice Game',
    category: 'HTML & CSS',
    categoryId: 'html-css',
    badge: 'Browser Game',
    description:
      'Engaging two-player turn-based dice game with current round accumulator, hold score banking, winning threshold checks, and animated dice faces.',
    techStack: ['JavaScript Logic', 'HTML5 Canvas/DOM', 'CSS3 Theme'],
    liveUrl: 'https://rajkumarraja06.github.io/pig-game-main.github.io/',
    githubUrl: 'https://github.com/RajkumarRaja06/pig-game-main.github.io',
  },
];
