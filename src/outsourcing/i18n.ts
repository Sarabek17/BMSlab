/**
 * Three-language dictionary for /outsourcing/ (EN default, UZ Latin, RU).
 *
 * `en` is the source of truth for the key set; `uz` and `ru` are typed as `Record<Key, string>`,
 * so a missing or extra key is a compile error. The HTML carries the English text too (SEO and
 * no-JS), and elements opt in with `data-i18n="key"` / `data-i18n-attr="attr:key,attr:key"`.
 */

import { $$ } from '../utils/dom';
import { LANG_STORAGE_KEY } from './config';

export type Lang = 'en' | 'uz' | 'ru';
export const LANGS: Lang[] = ['en', 'uz', 'ru'];

const en = {
  'meta.title': 'BMS Lab — IT outsourcing, dedicated teams & AI engineering from Tashkent',
  'meta.description':
    'Senior engineering teams from Uzbekistan for US, UK, EU and Gulf companies: custom software, dedicated teams, outstaffing, AI & LLM engineering, QA and DevOps. First proposal within 48 hours.',

  skip: 'Skip to content',
  'preloader.label': 'Loading',
  'nav.services': 'Services',
  'nav.models': 'Models',
  'nav.process': 'Process',
  'nav.cases': 'Cases',
  'nav.why': 'Why Uzbekistan',
  'nav.contact': 'Contact',
  'nav.cta': 'Book a call',
  'nav.open': 'Open menu',
  'nav.close': 'Close menu',
  'nav.label': 'Main navigation',
  'lang.label': 'Language',
  'logo.label': 'BMS Lab — home of the outsourcing page',

  'hero.eyebrow': 'IT outsourcing · Dedicated teams · AI engineering',
  'hero.title1': 'Engineering teams from Tashkent.',
  'hero.title2': 'Built for the world.',
  'hero.lead':
    'We assemble senior developers, QA and AI engineers into teams that plug into your roadmap within two weeks — working your hours, in your language, under your NDA.',
  'hero.cta1': 'Book a discovery call',
  'hero.cta2': 'Explore services',
  'hero.chip': 'HQ · Tashkent · GMT+5',
  'hero.clocks': 'Live time across our delivery map',
  'hero.scroll': 'Scroll',
  'clock.on': 'Working hours',
  'clock.off': 'After hours',
  'city.tashkent': 'Tashkent',
  'city.london': 'London',
  'city.berlin': 'Berlin',
  'city.newyork': 'New York',
  'city.dubai': 'Dubai',

  'marquee.label': 'Technologies we ship with every day',

  'stats.eyebrow': 'Commitments, not slogans',
  'stats.title': 'Speed you can put in a contract.',
  'stats.s1': 'to your first proposal and estimate',
  'stats.s2': 'to a working team on your backlog',
  'stats.s3': 'of daily overlap with the EU working day',
  'stats.s4': 'to an AI pilot running on your data',
  'stats.s5': 'working languages: English, Russian, Uzbek',
  'stats.engineers': 'engineers on the team',
  'stats.projects': 'projects delivered',
  'unit.h': 'h',
  'unit.days': 'days',

  'services.eyebrow': 'Services',
  'services.title': 'Everything a product team needs — under one roof.',
  'services.lead':
    'Start with one engineer or a full cross-functional squad. Scale up or down month to month.',
  'services.hint': 'Keep scrolling',
  's1.title': 'Custom software development',
  's1.text':
    'Web platforms, internal tools and SaaS products — from architecture to production support.',
  's2.title': 'Web & mobile apps',
  's2.text':
    'Fast, accessible web apps and native-feel iOS and Android apps your users actually enjoy.',
  's3.title': 'AI & LLM engineering',
  's3.text':
    'Assistants, search over your documents, agents and automations — with evaluations, guardrails and cost control.',
  's4.title': 'Dedicated teams & outstaffing',
  's4.text':
    'Vetted engineers who join your stand-ups, tools and codebase. You direct the work; we handle hiring, HR and retention.',
  's5.title': 'QA & test automation',
  's5.text':
    'Manual and automated testing, from test strategy to CI pipelines that catch regressions before your users do.',
  's6.title': 'DevOps & cloud',
  's6.text':
    'Cloud architecture, CI/CD, infrastructure as code and observability on AWS, Azure or GCP.',
  's7.title': 'UI/UX design',
  's7.text': 'Research, user flows and design systems that make complex products feel simple.',
  's8.title': 'BPO & 24/7 support desk',
  's8.text':
    'Multilingual customer support and back-office teams covering your users around the clock.',

  'models.eyebrow': 'Engagement models',
  'models.title': 'Pick how we work together.',
  'models.lead': 'Every model starts the same way: a clear scope, a named team and a weekly demo.',
  'models.tabs': 'Engagement models',
  'models.best': 'Best for',
  'models.how': 'How it works',
  'models.billing': 'Billing',
  'models.cta': 'Discuss this model',
  'm1.tab': 'Dedicated team',
  'm1.title': 'Your own product team, fully run by us.',
  'm1.text':
    'A cross-functional squad — developers, QA, a tech lead and design if needed — working on your product only. You own the roadmap; we own delivery and team health.',
  'm1.best': 'Long-term products and roadmaps of six months or more.',
  'm1.b1': 'Team assembled for your stack and seniority mix',
  'm1.b2': 'Weekly demos, sprint reports and shared metrics',
  'm1.b3': 'Scale up or down with 30 days’ notice',
  'm1.billing': 'Monthly fee per team member.',
  'm2.tab': 'Staff augmentation',
  'm2.title': 'Senior engineers who join your team.',
  'm2.text':
    'Extend your in-house team with individual specialists. They work inside your processes, tools and hours — just like your own hires.',
  'm2.best': 'Closing skill gaps fast without growing headcount.',
  'm2.b1': 'Shortlisted CVs within days; you run the interviews',
  'm2.b2': 'Engineers attend your stand-ups and code reviews',
  'm2.b3': 'Free replacement if the fit is not right',
  'm2.billing': 'Monthly rate per engineer, no hiring fees.',
  'm3.tab': 'Fixed-scope project',
  'm3.title': 'A defined result for a defined budget.',
  'm3.text':
    'We agree on scope, milestones and acceptance criteria up front, then deliver in vertical slices you can see working every week.',
  'm3.best': 'MVPs, redesigns, integrations and well-scoped features.',
  'm3.b1': 'Discovery and a written specification first',
  'm3.b2': 'Fixed price per milestone',
  'm3.b3': 'Warranty period after launch',
  'm3.billing': 'Fixed price, paid by milestone.',
  'm4.tab': 'AI pilot in 30 days',
  'm4.title': 'From idea to a working AI pilot in 30 days.',
  'm4.text':
    'We pick one high-value use case, connect it to your real data and ship a pilot your team can test — with measured quality, not a demo video.',
  'm4.best': 'Teams exploring LLMs, assistants and automation.',
  'm4.b1': 'Week 1: use case, data and success metrics',
  'm4.b2': 'Weeks 2–3: build, evaluate, iterate',
  'm4.b3': 'Week 4: pilot in production and a go/no-go report',
  'm4.billing': 'Fixed price for the pilot.',

  'factory.eyebrow': 'AI-native delivery',
  'factory.title': 'A software factory, not a body shop.',
  'factory.lead':
    'AI speeds up every stage of our delivery — and every change is verified before it reaches you.',
  'f1.title': 'Idea',
  'f1.text': 'We capture the business goal and the constraints on a single page.',
  'f2.title': 'Research',
  'f2.text': 'Code, data, competitors and users — facts with sources, not guesses.',
  'f3.title': 'PRD',
  'f3.text': 'Problem, solution, decisions and what is out of scope — signed off by you.',
  'f4.title': 'Vertical slices',
  'f4.text': 'Work split into thin end-to-end slices, each one shippable on its own.',
  'f5.title': 'AI-assisted build',
  'f5.text': 'Engineers pair with AI agents to write, refactor and document faster.',
  'f6.title': '4-layer verification',
  'f6.text': 'Code, behaviour, user experience and operations checked on every slice.',
  'f7.title': 'Review',
  'f7.text': 'Senior code and security review before anything is merged.',
  'f8.title': 'Deploy',
  'f8.text': 'Automated, reversible releases, with secrets kept out of the code.',
  'f9.title': 'Observe',
  'f9.text': 'Logs, metrics and user feedback become the next items in the queue.',

  'case.eyebrow': 'Flagship case · built in-house',
  'case.title': 'BMS Lab Digital Twin',
  'case.lead':
    'We don’t only build for clients — we run our own AI product. Digital Twin turns an expert’s lectures, books and documents into an AI twin that answers in their words and proves every answer with the exact source.',
  'case.f1': 'Answers grounded in sources — down to the minute of the recording',
  'case.f2': 'A “board of directors” of AI advisors that debates your question',
  'case.f3': 'Uzbek and Russian, text and voice',
  'case.proof': 'Proof we ship: the same team and process are available for your product.',
  'case.link': 'See the product',
  'case.mock.title': 'Digital Twin',
  'case.mock.status': 'Live',
  'case.mock.q': 'How should I price my first consulting offer?',
  'case.mock.a':
    'Price the result, not the hours. Anchor it to the client’s outcome and offer three tiers so the middle one feels obvious.',
  'case.mock.source': 'Source · Lecture 12 · 14:32',
  'case.mock.board': 'Board of advisors',
  'case.mock.r1': 'Finance',
  'case.mock.r2': 'Marketing',
  'case.mock.r3': 'Strategy',
  'case.mock.label': 'Animated preview of the Digital Twin chat',

  'ind.eyebrow': 'Industries',
  'ind.title': 'Domain knowledge that shortens onboarding.',
  'i1.title': 'Fintech',
  'i1.text': 'Payments, lending, wallets and compliance-ready back offices.',
  'i2.title': 'E-commerce',
  'i2.text': 'Marketplaces, storefronts, logistics integrations and personalisation.',
  'i3.title': 'Healthcare',
  'i3.text': 'Patient portals, scheduling and careful handling of sensitive data.',
  'i4.title': 'EdTech',
  'i4.text': 'Learning platforms, assessments and AI tutors.',
  'i5.title': 'Logistics',
  'i5.text': 'Fleet tracking, warehouse systems and route optimisation.',
  'i6.title': 'GovTech',
  'i6.text': 'Citizen services, registries and digital public infrastructure.',
  'i7.title': 'Telecom',
  'i7.text': 'Self-care apps, billing integrations and support automation.',
  'i8.title': 'Your industry?',
  'i8.text': 'Tell us about your domain — we will bring the right people.',
  'i8.link': 'Let’s talk',

  'why.eyebrow': 'Why Uzbekistan · Why BMS Lab',
  'why.title': 'Nearshore quality. Offshore economics.',
  'why.lead':
    'Tashkent is one of the fastest-growing tech hubs between Europe and Asia — and a direct flight from both.',
  'w1.title': 'GMT+5, real overlap',
  'w1.text':
    '4–5 shared working hours with Europe, a full working day with the Gulf and early-morning handoffs with the US East Coast.',
  'w2.title': 'Cost efficiency',
  'w2.text':
    'Senior engineering at a fraction of Western rates — without the quality trade-offs of the cheapest bid.',
  'w3.title': 'IT Park incentives',
  'w3.text':
    'Uzbekistan’s IT Park programme gives IT export companies tax and currency incentives that keep rates competitive.',
  'w3.link': 'About IT Park',
  'w4.title': 'Multilingual teams',
  'w4.text': 'Our people work in English, Russian and Uzbek — with your team and with your users.',
  'w5.title': 'NDA & IP transfer',
  'w5.text': 'NDA before the first detailed call. All code and IP are assigned to you by contract.',
  'w6.title': 'Security by default',
  'w6.text':
    'Least-privilege access, secrets out of the code, reviewed changes and audit-friendly processes.',

  'cmp.title': 'How the models compare',
  'cmp.caption': 'Comparison of delivery models: global enterprise vendor, freelancers and BMS Lab',
  'cmp.criterion': 'Criterion',
  'cmp.vendor': 'Global enterprise vendor',
  'cmp.freelance': 'Freelancers',
  'cmp.bms': 'BMS Lab',
  'cmp.r1': 'Speed to start',
  'cmp.r1.v': 'Weeks to months',
  'cmp.r1.f': 'Days',
  'cmp.r1.b': 'Days to two weeks',
  'cmp.r2': 'Cost',
  'cmp.r2.v': 'Premium rates plus overhead',
  'cmp.r2.f': 'Low, but unpredictable',
  'cmp.r2.b': 'Efficient and predictable',
  'cmp.r3': 'Flexibility',
  'cmp.r3.v': 'Long contracts',
  'cmp.r3.f': 'High, but no backup',
  'cmp.r3.b': 'Scale monthly, with backup',
  'cmp.r4': 'AI-native delivery',
  'cmp.r4.v': 'Varies by team',
  'cmp.r4.f': 'Up to the individual',
  'cmp.r4.b': 'Built into every stage',
  'cmp.r5': 'Senior attention',
  'cmp.r5.v': 'Often junior-heavy teams',
  'cmp.r5.f': 'One person, one view',
  'cmp.r5.b': 'A tech lead on every team',

  'proc.eyebrow': 'Your first 14 days',
  'proc.title': 'From first call to first sprint in two weeks.',
  'p1.day': 'Day 1',
  'p1.title': 'Discovery call',
  'p1.text': '30 minutes about your goals, stack and team. NDA signed first if you need it.',
  'p2.day': 'Days 2–3',
  'p2.title': 'Proposal & estimate',
  'p2.text': 'Team composition, timeline and price in writing within 48 hours.',
  'p3.day': 'Days 4–7',
  'p3.title': 'Meet your engineers',
  'p3.text': 'Shortlisted CVs and technical interviews — you choose who joins.',
  'p4.day': 'Days 8–9',
  'p4.title': 'Contract & onboarding',
  'p4.text': 'Contract, IP assignment, access and tooling set up.',
  'p5.day': 'Days 10–14',
  'p5.title': 'First sprint',
  'p5.text': 'The team ships its first slice and you see it working in a live demo.',

  'faq.eyebrow': 'FAQ',
  'faq.title': 'Questions we hear every week.',
  'q1.q': 'How do you price your services?',
  'q1.a':
    'Three ways: a monthly rate per engineer for dedicated teams and staff augmentation, a fixed price per milestone for well-scoped projects, and a fixed price for a 30-day AI pilot. You get a written estimate within 48 hours of the discovery call.',
  'q2.q': 'Who owns the code and the IP?',
  'q2.a':
    'You do. Our contracts assign all intellectual property — source code, designs and documentation — to you. Repositories can live in your organisation from day one.',
  'q3.q': 'Do you sign an NDA?',
  'q3.a':
    'Yes — before the first detailed conversation if you prefer. Every engineer on your project is bound by confidentiality obligations as well.',
  'q4.q': 'How do you handle time zones?',
  'q4.a':
    'Tashkent is GMT+5. We overlap 4–5 hours with the EU working day and most of the day with the Gulf, and we schedule early-morning or late-evening syncs with the US. Dedicated teams can shift their hours.',
  'q5.q': 'How fast can you start?',
  'q5.a':
    'A proposal within 48 hours and, in most cases, a working team within two weeks. Individual engineers can often start sooner.',
  'q6.q': 'Can we start with a trial?',
  'q6.a':
    'Yes. Begin with a small paid pilot — one engineer for a few weeks or a 30-day AI pilot — and scale only when you are happy with the results.',

  'cta.eyebrow': 'Let’s talk',
  'cta.title1': 'Let’s build',
  'cta.title2': 'your next team.',
  'cta.lead':
    'Tell us what you are building. You will hear back within one business day and get a proposal within 48 hours.',
  'contact.phone': 'Phone',
  'contact.email': 'Email',
  'contact.address': 'Office',
  'contact.telegram': 'Telegram',
  'contact.telegramCta': 'Message us on Telegram',

  'form.title': 'Tell us about your project',
  'form.name': 'Name',
  'form.email': 'Work email',
  'form.company': 'Company',
  'form.optional': 'optional',
  'form.model': 'Engagement model',
  'form.model.any': 'Not sure yet',
  'form.message': 'What are you building?',
  'form.ph.name': 'Jane Smith',
  'form.ph.email': 'jane@company.com',
  'form.ph.company': 'Company Ltd',
  'form.ph.message': 'A few lines about your product, team and timeline',
  'form.submit': 'Send request',
  'form.note':
    'Sending opens your email app with the message pre-filled. Prefer chat? Message us on Telegram.',
  'form.err.required': 'Please fill in this field.',
  'form.err.email': 'Please enter a valid email address.',
  'form.err.summary': 'Please check the highlighted fields.',
  'form.ok': 'Your email app should open now. If it doesn’t, write to us directly:',
  'form.subject': 'Outsourcing request',

  'footer.tagline': 'Engineering teams from Tashkent, built for the world.',
  'footer.nav': 'Footer navigation',
  'footer.product': 'Digital Twin product',
  'footer.itpark': 'IT Park Uzbekistan',
  'footer.rights': 'All rights reserved.',
  'footer.top': 'Back to top',
} satisfies Record<string, string>;

export type Key = keyof typeof en;

const uz: Record<Key, string> = {
  'meta.title': 'BMS Lab — Toshkentdan IT autsorsing, maxsus jamoalar va AI muhandislik',
  'meta.description':
    'AQSh, Buyuk Britaniya, Yevropa va Fors koʻrfazi kompaniyalari uchun Oʻzbekistondan tajribali muhandislar jamoalari: maxsus dasturiy taʼminot, autstaffing, AI va LLM muhandisligi, QA va DevOps. Birinchi taklif — 48 soat ichida.',

  skip: 'Asosiy kontentga oʻtish',
  'preloader.label': 'Yuklanmoqda',
  'nav.services': 'Xizmatlar',
  'nav.models': 'Modellar',
  'nav.process': 'Jarayon',
  'nav.cases': 'Keyslar',
  'nav.why': 'Nega Oʻzbekiston',
  'nav.contact': 'Aloqa',
  'nav.cta': 'Qoʻngʻiroq belgilash',
  'nav.open': 'Menyuni ochish',
  'nav.close': 'Menyuni yopish',
  'nav.label': 'Asosiy navigatsiya',
  'lang.label': 'Til',
  'logo.label': 'BMS Lab — autsorsing sahifasi boshiga',

  'hero.eyebrow': 'IT autsorsing · Maxsus jamoalar · AI muhandislik',
  'hero.title1': 'Toshkentdan muhandislik jamoalari.',
  'hero.title2': 'Butun dunyo uchun.',
  'hero.lead':
    'Tajribali dasturchilar, QA va AI muhandislaridan jamoa yigʻamiz — ular ikki hafta ichida loyihangizga qoʻshiladi: sizning ish vaqtingizda, sizning tilingizda, sizning NDA shartlaringiz asosida.',
  'hero.cta1': 'Tanishuv qoʻngʻirogʻini belgilash',
  'hero.cta2': 'Xizmatlarni koʻrish',
  'hero.chip': 'Bosh ofis · Toshkent · GMT+5',
  'hero.clocks': 'Ish xaritamizdagi shaharlarda hozirgi vaqt',
  'hero.scroll': 'Pastga',
  'clock.on': 'Ish vaqti',
  'clock.off': 'Ishdan tashqari',
  'city.tashkent': 'Toshkent',
  'city.london': 'London',
  'city.berlin': 'Berlin',
  'city.newyork': 'Nyu-York',
  'city.dubai': 'Dubay',

  'marquee.label': 'Har kuni ishlatadigan texnologiyalarimiz',

  'stats.eyebrow': 'Shiorlar emas, majburiyatlar',
  'stats.title': 'Shartnomaga yozsa boʻladigan tezlik.',
  'stats.s1': 'ichida birinchi taklif va smeta',
  'stats.s2': 'ichida vazifalaringiz ustida ishlayotgan jamoa',
  'stats.s3': 'Yevropa ish kuni bilan kunlik umumiy vaqt',
  'stats.s4': 'ichida maʼlumotlaringiz bilan ishlaydigan AI pilot',
  'stats.s5': 'ish tili: ingliz, rus, oʻzbek',
  'stats.engineers': 'jamoadagi muhandislar',
  'stats.projects': 'topshirilgan loyihalar',
  'unit.h': 'soat',
  'unit.days': 'kun',

  'services.eyebrow': 'Xizmatlar',
  'services.title': 'Mahsulot jamoasiga kerak boʻlgan hamma narsa — bir joyda.',
  'services.lead':
    'Bitta muhandisdan yoki toʻliq jamoadan boshlang. Har oy jamoani kengaytirish yoki qisqartirish mumkin.',
  'services.hint': 'Davom eting',
  's1.title': 'Maxsus dasturiy taʼminot',
  's1.text':
    'Veb-platformalar, ichki tizimlar va SaaS mahsulotlar — arxitekturadan tortib production qoʻllab-quvvatlashgacha.',
  's2.title': 'Veb va mobil ilovalar',
  's2.text':
    'Tez va qulay veb-ilovalar hamda foydalanuvchilar yoqtiradigan iOS va Android ilovalari.',
  's3.title': 'AI va LLM muhandisligi',
  's3.text':
    'Assistentlar, hujjatlaringiz boʻyicha qidiruv, agentlar va avtomatlashtirish — sifat baholash, cheklovlar va xarajat nazorati bilan.',
  's4.title': 'Maxsus jamoalar va autstaffing',
  's4.text':
    'Tekshirilgan muhandislar sizning yigʻilishlaringiz, vositalaringiz va kodingizga qoʻshiladi. Ishni siz boshqarasiz; yollash, HR va ushlab qolish — bizda.',
  's5.title': 'QA va test avtomatlashtirish',
  's5.text':
    'Qoʻlda va avtomatik testlash: test strategiyasidan xatolarni foydalanuvchidan oldin ushlaydigan CI jarayonlarigacha.',
  's6.title': 'DevOps va bulut',
  's6.text':
    'AWS, Azure yoki GCP da bulut arxitekturasi, CI/CD, infratuzilma kod sifatida va monitoring.',
  's7.title': 'UI/UX dizayn',
  's7.text': 'Murakkab mahsulotni sodda his qildiradigan tadqiqot, foydalanuvchi yoʻllari va dizayn tizimlari.',
  's8.title': 'BPO va 24/7 qoʻllab-quvvatlash',
  's8.text':
    'Foydalanuvchilaringizga kecha-kunduz xizmat koʻrsatadigan koʻp tilli qoʻllab-quvvatlash va back-office jamoalari.',

  'models.eyebrow': 'Hamkorlik modellari',
  'models.title': 'Qanday ishlashni oʻzingiz tanlang.',
  'models.lead': 'Har bir model bir xil boshlanadi: aniq vazifa, nomi maʼlum jamoa va haftalik demo.',
  'models.tabs': 'Hamkorlik modellari',
  'models.best': 'Kimga mos',
  'models.how': 'Qanday ishlaydi',
  'models.billing': 'Toʻlov',
  'models.cta': 'Shu modelni muhokama qilish',
  'm1.tab': 'Maxsus jamoa',
  'm1.title': 'Sizning mahsulot jamoangiz — toʻliq bizning boshqaruvda.',
  'm1.text':
    'Dasturchilar, QA, texnik rahbar va kerak boʻlsa dizayner — faqat sizning mahsulotingiz ustida ishlaydigan jamoa. Yoʻl xaritasi sizda; natija va jamoa holati uchun biz javobgarmiz.',
  'm1.best': 'Olti oy va undan uzoq rejaga ega mahsulotlar.',
  'm1.b1': 'Jamoa texnologiyalaringiz va kerakli darajaga qarab yigʻiladi',
  'm1.b2': 'Haftalik demo, sprint hisobotlari va umumiy metrikalar',
  'm1.b3': '30 kun oldin ogohlantirib jamoani oʻzgartirish mumkin',
  'm1.billing': 'Har bir jamoa aʼzosi uchun oylik toʻlov.',
  'm2.tab': 'Autstaffing',
  'm2.title': 'Jamoangizga qoʻshiladigan tajribali muhandislar.',
  'm2.text':
    'Ichki jamoangizni alohida mutaxassislar bilan kuchaytiring. Ular sizning jarayonlaringiz, vositalaringiz va ish vaqtingizda — xuddi oʻz xodimingizdek ishlaydi.',
  'm2.best': 'Shtatni oshirmasdan yetishmayotgan koʻnikmalarni tez yopish.',
  'm2.b1': 'Bir necha kunda saralangan rezyumelar; suhbatni siz oʻtkazasiz',
  'm2.b2': 'Muhandislar yigʻilishlaringiz va kod tekshiruvlaringizda qatnashadi',
  'm2.b3': 'Mos kelmasa — bepul almashtirish',
  'm2.billing': 'Har bir muhandis uchun oylik stavka, yollash uchun haq yoʻq.',
  'm3.tab': 'Belgilangan loyiha',
  'm3.title': 'Aniq byudjetga aniq natija.',
  'm3.text':
    'Hajm, bosqichlar va qabul mezonlarini oldindan kelishamiz, keyin har hafta ishlayotganini koʻradigan vertikal qismlar bilan topshiramiz.',
  'm3.best': 'MVP, qayta dizayn, integratsiyalar va aniq belgilangan funksiyalar.',
  'm3.b1': 'Avval tahlil va yozma texnik topshiriq',
  'm3.b2': 'Har bir bosqich uchun qatʼiy narx',
  'm3.b3': 'Ishga tushirilgandan keyin kafolat muddati',
  'm3.billing': 'Qatʼiy narx, bosqichma-bosqich toʻlanadi.',
  'm4.tab': '30 kunda AI pilot',
  'm4.title': 'Gʻoyadan ishlaydigan AI pilotgacha — 30 kunda.',
  'm4.text':
    'Eng foydali bitta vazifani tanlaymiz, uni haqiqiy maʼlumotlaringizga ulaymiz va jamoangiz sinab koʻradigan pilotni topshiramiz — demo video emas, oʻlchangan sifat bilan.',
  'm4.best': 'LLM, assistentlar va avtomatlashtirishni oʻrganayotgan jamoalar.',
  'm4.b1': '1-hafta: vazifa, maʼlumotlar va muvaffaqiyat mezonlari',
  'm4.b2': '2–3-haftalar: qurish, baholash, takomillashtirish',
  'm4.b3': '4-hafta: production’dagi pilot va davom ettirish boʻyicha hisobot',
  'm4.billing': 'Pilot uchun qatʼiy narx.',

  'factory.eyebrow': 'AI asosidagi ish jarayoni',
  'factory.title': 'Odam ijarasi emas — dasturiy taʼminot fabrikasi.',
  'factory.lead':
    'AI ishimizning har bir bosqichini tezlashtiradi — va har bir oʻzgarish sizga yetib borishidan oldin tekshiriladi.',
  'f1.title': 'Gʻoya',
  'f1.text': 'Biznes maqsadi va cheklovlarni bir sahifada qayd etamiz.',
  'f2.title': 'Tadqiqot',
  'f2.text': 'Kod, maʼlumotlar, raqobatchilar va foydalanuvchilar — taxmin emas, manbali faktlar.',
  'f3.title': 'PRD',
  'f3.text': 'Muammo, yechim, qarorlar va doiradan tashqaridagilar — siz tasdiqlaysiz.',
  'f4.title': 'Vertikal qismlar',
  'f4.text': 'Ish har biri alohida ishga tushiriladigan yupqa, boshdan-oxir qismlarga boʻlinadi.',
  'f5.title': 'AI yordamida qurish',
  'f5.text': 'Muhandislar AI agentlar bilan birga kodni tezroq yozadi, yaxshilaydi va hujjatlaydi.',
  'f6.title': '4 qatlamli tekshiruv',
  'f6.text': 'Har bir qismda kod, xatti-harakat, foydalanuvchi tajribasi va ekspluatatsiya tekshiriladi.',
  'f7.title': 'Koʻrib chiqish',
  'f7.text': 'Birlashtirishdan oldin tajribali muhandis kod va xavfsizlikni tekshiradi.',
  'f8.title': 'Joylashtirish',
  'f8.text': 'Avtomatik va orqaga qaytariladigan relizlar, maxfiy kalitlar koddan tashqarida.',
  'f9.title': 'Kuzatish',
  'f9.text': 'Loglar, metrikalar va foydalanuvchi fikrlari navbatdagi vazifalarga aylanadi.',

  'case.eyebrow': 'Asosiy keys · oʻzimiz yaratganmiz',
  'case.title': 'BMS Lab Digital Twin',
  'case.lead':
    'Biz faqat mijozlar uchun qurmaymiz — oʻz AI mahsulotimizni ham yuritamiz. Digital Twin ekspertning darslari, kitoblari va hujjatlaridan uning soʻzlari bilan javob beradigan va har bir javobni aniq manba bilan isbotlaydigan raqamli egizak yaratadi.',
  'case.f1': 'Manbaga tayangan javoblar — yozuvning aynan oʻsha daqiqasigacha',
  'case.f2': 'Savolingizni muhokama qiladigan AI maslahatchilar “direktorlar kengashi”',
  'case.f3': 'Oʻzbek va rus tillarida, matn va ovoz bilan',
  'case.proof': 'Biz natija beramiz: xuddi shu jamoa va jarayon sizning mahsulotingiz uchun ham tayyor.',
  'case.link': 'Mahsulotni koʻrish',
  'case.mock.title': 'Digital Twin',
  'case.mock.status': 'Onlayn',
  'case.mock.q': 'Birinchi konsalting xizmatimga narxni qanday belgilay?',
  'case.mock.a':
    'Soatga emas, natijaga narx qoʻying. Uni mijoz oladigan foydaga bogʻlang va uch xil tarif taklif qiling — oʻrtadagisi eng tabiiy tanlov boʻladi.',
  'case.mock.source': 'Manba · 12-dars · 14:32',
  'case.mock.board': 'Maslahatchilar kengashi',
  'case.mock.r1': 'Moliya',
  'case.mock.r2': 'Marketing',
  'case.mock.r3': 'Strategiya',
  'case.mock.label': 'Digital Twin chatining animatsion koʻrinishi',

  'ind.eyebrow': 'Sohalar',
  'ind.title': 'Moslashish vaqtini qisqartiradigan soha bilimi.',
  'i1.title': 'Fintech',
  'i1.text': 'Toʻlovlar, kreditlash, hamyonlar va talablarga mos back-office tizimlari.',
  'i2.title': 'E-commerce',
  'i2.text': 'Marketpleyslar, onlayn doʻkonlar, logistika integratsiyalari va personallashtirish.',
  'i3.title': 'Sogʻliqni saqlash',
  'i3.text': 'Bemor portallari, qabulga yozilish va nozik maʼlumotlar bilan ehtiyotkor ishlash.',
  'i4.title': 'EdTech',
  'i4.text': 'Taʼlim platformalari, baholash tizimlari va AI repetitorlar.',
  'i5.title': 'Logistika',
  'i5.text': 'Transport kuzatuvi, ombor tizimlari va marshrutlarni optimallashtirish.',
  'i6.title': 'GovTech',
  'i6.text': 'Davlat xizmatlari, reyestrlar va raqamli davlat infratuzilmasi.',
  'i7.title': 'Telekom',
  'i7.text': 'Shaxsiy kabinet ilovalari, billing integratsiyalari va qoʻllab-quvvatlashni avtomatlashtirish.',
  'i8.title': 'Sizning sohangiz?',
  'i8.text': 'Sohangiz haqida aytib bering — kerakli mutaxassislarni topamiz.',
  'i8.link': 'Gaplashamiz',

  'why.eyebrow': 'Nega Oʻzbekiston · Nega BMS Lab',
  'why.title': 'Yaqin hamkor sifati. Offshor narxlari.',
  'why.lead':
    'Toshkent — Yevropa va Osiyo oraligʻidagi eng tez oʻsayotgan IT markazlaridan biri, ikkalasiga ham toʻgʻridan-toʻgʻri reys bor.',
  'w1.title': 'GMT+5 — haqiqiy umumiy vaqt',
  'w1.text':
    'Yevropa bilan 4–5 soat umumiy ish vaqti, Fors koʻrfazi bilan toʻliq ish kuni va AQSh sharqiy qirgʻogʻi bilan ertalabki uchrashuvlar.',
  'w2.title': 'Tejamkorlik',
  'w2.text':
    'Gʻarb stavkalarining bir qismiga tajribali muhandislik — eng arzon taklifdagi sifat yoʻqotishlarisiz.',
  'w3.title': 'IT Park imtiyozlari',
  'w3.text':
    'Oʻzbekistonning IT Park dasturi IT eksport qiluvchi kompaniyalarga soliq va valyuta imtiyozlarini beradi — bu narxlarni raqobatbardosh saqlaydi.',
  'w3.link': 'IT Park haqida',
  'w4.title': 'Koʻp tilli jamoalar',
  'w4.text': 'Xodimlarimiz ingliz, rus va oʻzbek tillarida ishlaydi — jamoangiz bilan ham, foydalanuvchilaringiz bilan ham.',
  'w5.title': 'NDA va IP huquqlari',
  'w5.text': 'Batafsil suhbatdan oldin NDA. Barcha kod va intellektual mulk shartnoma boʻyicha sizga oʻtadi.',
  'w6.title': 'Xavfsizlik — standart',
  'w6.text':
    'Minimal kirish huquqlari, maxfiy kalitlar koddan tashqarida, tekshirilgan oʻzgarishlar va auditga tayyor jarayonlar.',

  'cmp.title': 'Modellar qanday farq qiladi',
  'cmp.caption': 'Ish modellarini taqqoslash: global korporativ vendor, frilanserlar va BMS Lab',
  'cmp.criterion': 'Mezon',
  'cmp.vendor': 'Global korporativ vendor',
  'cmp.freelance': 'Frilanserlar',
  'cmp.bms': 'BMS Lab',
  'cmp.r1': 'Boshlash tezligi',
  'cmp.r1.v': 'Haftalar yoki oylar',
  'cmp.r1.f': 'Bir necha kun',
  'cmp.r1.b': 'Bir necha kundan ikki haftagacha',
  'cmp.r2': 'Narx',
  'cmp.r2.v': 'Yuqori stavka va qoʻshimcha xarajatlar',
  'cmp.r2.f': 'Past, lekin oldindan aytib boʻlmaydi',
  'cmp.r2.b': 'Tejamkor va oldindan maʼlum',
  'cmp.r3': 'Moslashuvchanlik',
  'cmp.r3.v': 'Uzoq muddatli shartnomalar',
  'cmp.r3.f': 'Yuqori, lekin zaxira yoʻq',
  'cmp.r3.b': 'Har oy oʻzgartirish, zaxira bilan',
  'cmp.r4': 'AI asosidagi ish',
  'cmp.r4.v': 'Jamoaga bogʻliq',
  'cmp.r4.f': 'Shaxsga bogʻliq',
  'cmp.r4.b': 'Har bir bosqichga kiritilgan',
  'cmp.r5': 'Tajribali mutaxassis eʼtibori',
  'cmp.r5.v': 'Koʻpincha yosh mutaxassislar',
  'cmp.r5.f': 'Bitta odam, bitta nuqtai nazar',
  'cmp.r5.b': 'Har bir jamoada texnik rahbar',

  'proc.eyebrow': 'Birinchi 14 kuningiz',
  'proc.title': 'Birinchi qoʻngʻiroqdan birinchi sprintgacha — ikki hafta.',
  'p1.day': '1-kun',
  'p1.title': 'Tanishuv qoʻngʻirogʻi',
  'p1.text': 'Maqsadlar, texnologiyalar va jamoa haqida 30 daqiqa. Kerak boʻlsa, avval NDA imzolanadi.',
  'p2.day': '2–3-kunlar',
  'p2.title': 'Taklif va smeta',
  'p2.text': 'Jamoa tarkibi, muddat va narx — 48 soat ichida yozma shaklda.',
  'p3.day': '4–7-kunlar',
  'p3.title': 'Muhandislar bilan tanishuv',
  'p3.text': 'Saralangan rezyumelar va texnik suhbatlar — kim qoʻshilishini siz tanlaysiz.',
  'p4.day': '8–9-kunlar',
  'p4.title': 'Shartnoma va moslashuv',
  'p4.text': 'Shartnoma, IP huquqlarini oʻtkazish, kirish huquqlari va vositalar sozlanadi.',
  'p5.day': '10–14-kunlar',
  'p5.title': 'Birinchi sprint',
  'p5.text': 'Jamoa birinchi qismni topshiradi va siz uni jonli demoda koʻrasiz.',

  'faq.eyebrow': 'Savollar',
  'faq.title': 'Har hafta beriladigan savollar.',
  'q1.q': 'Xizmatlaringiz narxi qanday belgilanadi?',
  'q1.a':
    'Uch xil: maxsus jamoa va autstaffing uchun har bir muhandisga oylik stavka, aniq belgilangan loyihalar uchun har bir bosqichga qatʼiy narx va 30 kunlik AI pilot uchun qatʼiy narx. Tanishuv qoʻngʻirogʻidan keyin 48 soat ichida yozma smeta olasiz.',
  'q2.q': 'Kod va intellektual mulk kimga tegishli?',
  'q2.a':
    'Sizga. Shartnomalarimiz boʻyicha barcha intellektual mulk — manba kodi, dizayn va hujjatlar — sizga oʻtadi. Repozitoriylar birinchi kundan sizning tashkilotingizda boʻlishi mumkin.',
  'q3.q': 'NDA imzolaysizmi?',
  'q3.a':
    'Ha — xohlasangiz, birinchi batafsil suhbatdan oldin. Loyihangizdagi har bir muhandis ham maxfiylik majburiyatlariga ega.',
  'q4.q': 'Vaqt mintaqalari farqi qanday hal qilinadi?',
  'q4.a':
    'Toshkent — GMT+5. Yevropa ish kuni bilan 4–5 soat, Fors koʻrfazi bilan deyarli butun kun mos keladi, AQSh bilan esa ertalab yoki kechqurun uchrashamiz. Maxsus jamoalar ish vaqtini moslashtirishi mumkin.',
  'q5.q': 'Qanchalik tez boshlay olasiz?',
  'q5.a':
    'Taklif — 48 soat ichida, koʻp hollarda ishlaydigan jamoa — ikki hafta ichida. Alohida muhandislar koʻpincha bundan ham tezroq boshlaydi.',
  'q6.q': 'Sinov bilan boshlasak boʻladimi?',
  'q6.a':
    'Ha. Kichik pullik pilotdan boshlang — bir necha haftaga bitta muhandis yoki 30 kunlik AI pilot — va natijadan mamnun boʻlganingizdagina kengaytiring.',

  'cta.eyebrow': 'Gaplashamiz',
  'cta.title1': 'Keling, quramiz —',
  'cta.title2': 'navbatdagi jamoangizni.',
  'cta.lead':
    'Nima qurayotganingizni yozing. Bir ish kuni ichida javob beramiz, 48 soat ichida taklif yuboramiz.',
  'contact.phone': 'Telefon',
  'contact.email': 'Email',
  'contact.address': 'Ofis',
  'contact.telegram': 'Telegram',
  'contact.telegramCta': 'Telegramda yozish',

  'form.title': 'Loyihangiz haqida yozing',
  'form.name': 'Ism',
  'form.email': 'Ish emaili',
  'form.company': 'Kompaniya',
  'form.optional': 'ixtiyoriy',
  'form.model': 'Hamkorlik modeli',
  'form.model.any': 'Hali aniq emas',
  'form.message': 'Nima qurayapsiz?',
  'form.ph.name': 'Aziza Karimova',
  'form.ph.email': 'aziza@company.uz',
  'form.ph.company': 'Kompaniya MChJ',
  'form.ph.message': 'Mahsulot, jamoa va muddatlar haqida bir necha qator',
  'form.submit': 'Soʻrov yuborish',
  'form.note':
    'Yuborish tugmasi email ilovangizni tayyor xat bilan ochadi. Chat qulayroqmi? Telegramda yozing.',
  'form.err.required': 'Iltimos, bu maydonni toʻldiring.',
  'form.err.email': 'Iltimos, toʻgʻri email manzilini kiriting.',
  'form.err.summary': 'Iltimos, belgilangan maydonlarni tekshiring.',
  'form.ok': 'Email ilovangiz hozir ochiladi. Ochilmasa, bizga toʻgʻridan-toʻgʻri yozing:',
  'form.subject': 'Autsorsing soʻrovi',

  'footer.tagline': 'Toshkentdan muhandislik jamoalari — butun dunyo uchun.',
  'footer.nav': 'Pastki navigatsiya',
  'footer.product': 'Digital Twin mahsuloti',
  'footer.itpark': 'IT Park Oʻzbekiston',
  'footer.rights': 'Barcha huquqlar himoyalangan.',
  'footer.top': 'Yuqoriga',
};

const ru: Record<Key, string> = {
  'meta.title': 'BMS Lab — IT-аутсорсинг, выделенные команды и AI-разработка из Ташкента',
  'meta.description':
    'Команды сильных инженеров из Узбекистана для компаний из США, Великобритании, ЕС и стран Залива: заказная разработка, выделенные команды, аутстаффинг, AI и LLM, QA и DevOps. Первое предложение — за 48 часов.',

  skip: 'Перейти к содержимому',
  'preloader.label': 'Загрузка',
  'nav.services': 'Услуги',
  'nav.models': 'Модели',
  'nav.process': 'Процесс',
  'nav.cases': 'Кейсы',
  'nav.why': 'Почему Узбекистан',
  'nav.contact': 'Контакты',
  'nav.cta': 'Назначить звонок',
  'nav.open': 'Открыть меню',
  'nav.close': 'Закрыть меню',
  'nav.label': 'Основная навигация',
  'lang.label': 'Язык',
  'logo.label': 'BMS Lab — в начало страницы аутсорсинга',

  'hero.eyebrow': 'IT-аутсорсинг · Выделенные команды · AI-разработка',
  'hero.title1': 'Инженерные команды из Ташкента.',
  'hero.title2': 'Для всего мира.',
  'hero.lead':
    'Собираем сильных разработчиков, QA и AI-инженеров в команды, которые подключаются к вашему продукту за две недели — в ваши часы, на вашем языке, по вашему NDA.',
  'hero.cta1': 'Назначить знакомство',
  'hero.cta2': 'Смотреть услуги',
  'hero.chip': 'Офис · Ташкент · GMT+5',
  'hero.clocks': 'Текущее время в городах нашей карты',
  'hero.scroll': 'Вниз',
  'clock.on': 'Рабочее время',
  'clock.off': 'Нерабочее время',
  'city.tashkent': 'Ташкент',
  'city.london': 'Лондон',
  'city.berlin': 'Берлин',
  'city.newyork': 'Нью-Йорк',
  'city.dubai': 'Дубай',

  'marquee.label': 'Технологии, с которыми мы работаем каждый день',

  'stats.eyebrow': 'Обязательства, а не лозунги',
  'stats.title': 'Скорость, которую можно записать в договор.',
  'stats.s1': 'до первого предложения и оценки',
  'stats.s2': 'до команды, работающей над вашими задачами',
  'stats.s3': 'ежедневного пересечения с рабочим днём ЕС',
  'stats.s4': 'до AI-пилота на ваших данных',
  'stats.s5': 'рабочих языка: английский, русский, узбекский',
  'stats.engineers': 'инженеров в команде',
  'stats.projects': 'реализованных проектов',
  'unit.h': 'ч',
  'unit.days': 'дней',

  'services.eyebrow': 'Услуги',
  'services.title': 'Всё, что нужно продуктовой команде, — в одном месте.',
  'services.lead':
    'Начните с одного инженера или полной кросс-функциональной команды. Масштабируйте каждый месяц.',
  'services.hint': 'Листайте дальше',
  's1.title': 'Заказная разработка',
  's1.text':
    'Веб-платформы, внутренние системы и SaaS-продукты — от архитектуры до поддержки в продакшене.',
  's2.title': 'Веб- и мобильные приложения',
  's2.text':
    'Быстрые и доступные веб-приложения и приложения для iOS и Android, которыми приятно пользоваться.',
  's3.title': 'AI и LLM-разработка',
  's3.text':
    'Ассистенты, поиск по вашим документам, агенты и автоматизация — с оценкой качества, ограничениями и контролем затрат.',
  's4.title': 'Выделенные команды и аутстаффинг',
  's4.text':
    'Проверенные инженеры входят в ваши созвоны, инструменты и кодовую базу. Задачи ставите вы; найм, HR и удержание — на нас.',
  's5.title': 'QA и автоматизация тестирования',
  's5.text':
    'Ручное и автоматизированное тестирование: от стратегии до CI-пайплайнов, которые ловят регрессии раньше пользователей.',
  's6.title': 'DevOps и облака',
  's6.text':
    'Облачная архитектура, CI/CD, инфраструктура как код и мониторинг в AWS, Azure или GCP.',
  's7.title': 'UI/UX-дизайн',
  's7.text': 'Исследования, пользовательские сценарии и дизайн-системы, которые делают сложное простым.',
  's8.title': 'BPO и поддержка 24/7',
  's8.text':
    'Многоязычные команды поддержки и бэк-офиса, которые обслуживают ваших пользователей круглосуточно.',

  'models.eyebrow': 'Модели сотрудничества',
  'models.title': 'Выберите, как нам работать вместе.',
  'models.lead': 'Каждая модель начинается одинаково: понятный объём, названная команда и еженедельное демо.',
  'models.tabs': 'Модели сотрудничества',
  'models.best': 'Подходит для',
  'models.how': 'Как это работает',
  'models.billing': 'Оплата',
  'models.cta': 'Обсудить эту модель',
  'm1.tab': 'Выделенная команда',
  'm1.title': 'Ваша продуктовая команда под нашим управлением.',
  'm1.text':
    'Кросс-функциональная команда — разработчики, QA, техлид и при необходимости дизайнер — работает только над вашим продуктом. Роадмап ваш; за поставку и здоровье команды отвечаем мы.',
  'm1.best': 'Долгосрочных продуктов с планами на полгода и больше.',
  'm1.b1': 'Команда под ваш стек и нужный уровень',
  'm1.b2': 'Еженедельные демо, отчёты по спринтам и общие метрики',
  'm1.b3': 'Изменение состава с уведомлением за 30 дней',
  'm1.billing': 'Ежемесячная оплата за каждого участника команды.',
  'm2.tab': 'Аутстаффинг',
  'm2.title': 'Сильные инженеры, которые входят в вашу команду.',
  'm2.text':
    'Усильте внутреннюю команду отдельными специалистами. Они работают в ваших процессах, инструментах и часах — как ваши собственные сотрудники.',
  'm2.best': 'Быстро закрыть нехватку компетенций без расширения штата.',
  'm2.b1': 'Подборка резюме за несколько дней; собеседования проводите вы',
  'm2.b2': 'Инженеры участвуют в ваших стендапах и код-ревью',
  'm2.b3': 'Бесплатная замена, если специалист не подошёл',
  'm2.billing': 'Ежемесячная ставка за инженера, без платы за найм.',
  'm3.tab': 'Проект с фиксированным объёмом',
  'm3.title': 'Определённый результат за определённый бюджет.',
  'm3.text':
    'Заранее согласуем объём, этапы и критерии приёмки, а затем поставляем вертикальными срезами, которые вы видите в работе каждую неделю.',
  'm3.best': 'MVP, редизайна, интеграций и чётко описанных функций.',
  'm3.b1': 'Сначала анализ и письменное ТЗ',
  'm3.b2': 'Фиксированная цена за каждый этап',
  'm3.b3': 'Гарантийный период после запуска',
  'm3.billing': 'Фиксированная цена, оплата по этапам.',
  'm4.tab': 'AI-пилот за 30 дней',
  'm4.title': 'От идеи до работающего AI-пилота за 30 дней.',
  'm4.text':
    'Выбираем один самый ценный сценарий, подключаем его к вашим реальным данным и поставляем пилот, который команда может проверить, — с измеренным качеством, а не демо-видео.',
  'm4.best': 'Команд, которые изучают LLM, ассистентов и автоматизацию.',
  'm4.b1': 'Неделя 1: сценарий, данные и метрики успеха',
  'm4.b2': 'Недели 2–3: разработка, оценка, итерации',
  'm4.b3': 'Неделя 4: пилот в продакшене и отчёт «продолжать или нет»',
  'm4.billing': 'Фиксированная цена за пилот.',

  'factory.eyebrow': 'AI-native разработка',
  'factory.title': 'Фабрика софта, а не аренда людей.',
  'factory.lead':
    'AI ускоряет каждый этап нашей работы — а каждое изменение проверяется, прежде чем попасть к вам.',
  'f1.title': 'Идея',
  'f1.text': 'Фиксируем бизнес-цель и ограничения на одной странице.',
  'f2.title': 'Исследование',
  'f2.text': 'Код, данные, конкуренты и пользователи — факты с источниками, а не догадки.',
  'f3.title': 'PRD',
  'f3.text': 'Проблема, решение, принятые решения и границы проекта — с вашим согласованием.',
  'f4.title': 'Вертикальные срезы',
  'f4.text': 'Работа делится на тонкие сквозные срезы, каждый из которых можно выпустить.',
  'f5.title': 'Разработка с AI',
  'f5.text': 'Инженеры работают в паре с AI-агентами: пишут, рефакторят и документируют быстрее.',
  'f6.title': 'Проверка в 4 слоя',
  'f6.text': 'Код, поведение, пользовательский опыт и эксплуатация проверяются в каждом срезе.',
  'f7.title': 'Ревью',
  'f7.text': 'Код-ревью и проверка безопасности старшим инженером до слияния.',
  'f8.title': 'Деплой',
  'f8.text': 'Автоматические обратимые релизы, секреты — вне кода.',
  'f9.title': 'Наблюдение',
  'f9.text': 'Логи, метрики и отзывы пользователей превращаются в следующие задачи.',

  'case.eyebrow': 'Флагманский кейс · собственный продукт',
  'case.title': 'BMS Lab Digital Twin',
  'case.lead':
    'Мы не только делаем проекты для клиентов — у нас есть собственный AI-продукт. Digital Twin превращает лекции, книги и документы эксперта в цифрового двойника, который отвечает его словами и подтверждает каждый ответ точным источником.',
  'case.f1': 'Ответы с опорой на источники — вплоть до минуты записи',
  'case.f2': '«Совет директоров» из AI-советников, обсуждающих ваш вопрос',
  'case.f3': 'Узбекский и русский, текст и голос',
  'case.proof': 'Доказательство, что мы доводим до результата: та же команда и процесс доступны для вашего продукта.',
  'case.link': 'Посмотреть продукт',
  'case.mock.title': 'Digital Twin',
  'case.mock.status': 'Онлайн',
  'case.mock.q': 'Как назначить цену на мою первую консалтинговую услугу?',
  'case.mock.a':
    'Продавайте результат, а не часы. Привяжите цену к выгоде клиента и предложите три тарифа — средний станет очевидным выбором.',
  'case.mock.source': 'Источник · Лекция 12 · 14:32',
  'case.mock.board': 'Совет советников',
  'case.mock.r1': 'Финансы',
  'case.mock.r2': 'Маркетинг',
  'case.mock.r3': 'Стратегия',
  'case.mock.label': 'Анимированный пример чата Digital Twin',

  'ind.eyebrow': 'Отрасли',
  'ind.title': 'Знание отрасли, которое сокращает погружение.',
  'i1.title': 'Финтех',
  'i1.text': 'Платежи, кредитование, кошельки и бэк-офис, готовый к требованиям регуляторов.',
  'i2.title': 'E-commerce',
  'i2.text': 'Маркетплейсы, интернет-магазины, интеграции с логистикой и персонализация.',
  'i3.title': 'Здравоохранение',
  'i3.text': 'Порталы пациентов, онлайн-запись и бережная работа с чувствительными данными.',
  'i4.title': 'EdTech',
  'i4.text': 'Образовательные платформы, системы оценки и AI-репетиторы.',
  'i5.title': 'Логистика',
  'i5.text': 'Мониторинг транспорта, складские системы и оптимизация маршрутов.',
  'i6.title': 'GovTech',
  'i6.text': 'Государственные услуги, реестры и цифровая государственная инфраструктура.',
  'i7.title': 'Телеком',
  'i7.text': 'Личные кабинеты, интеграции с биллингом и автоматизация поддержки.',
  'i8.title': 'Ваша отрасль?',
  'i8.text': 'Расскажите о своей сфере — мы подберём нужных людей.',
  'i8.link': 'Обсудить',

  'why.eyebrow': 'Почему Узбекистан · Почему BMS Lab',
  'why.title': 'Качество nearshore. Экономика offshore.',
  'why.lead':
    'Ташкент — один из самых быстрорастущих IT-хабов между Европой и Азией, с прямыми рейсами в обе стороны.',
  'w1.title': 'GMT+5 — реальное пересечение',
  'w1.text':
    '4–5 общих рабочих часов с Европой, полный рабочий день со странами Залива и утренние передачи задач с восточным побережьем США.',
  'w2.title': 'Экономическая эффективность',
  'w2.text':
    'Сильная инженерия за долю западных ставок — без потери качества, как у самого дешёвого подрядчика.',
  'w3.title': 'Льготы IT Park',
  'w3.text':
    'Программа IT Park Узбекистана даёт компаниям-экспортёрам IT-услуг налоговые и валютные льготы, которые помогают держать ставки конкурентными.',
  'w3.link': 'Об IT Park',
  'w4.title': 'Многоязычные команды',
  'w4.text': 'Наши специалисты работают на английском, русском и узбекском — с вашей командой и вашими пользователями.',
  'w5.title': 'NDA и передача IP',
  'w5.text': 'NDA до первого подробного разговора. Весь код и права на IP передаются вам по договору.',
  'w6.title': 'Безопасность по умолчанию',
  'w6.text':
    'Минимальные права доступа, секреты вне кода, проверенные изменения и процессы, готовые к аудиту.',

  'cmp.title': 'Сравнение моделей',
  'cmp.caption': 'Сравнение моделей работы: глобальный корпоративный подрядчик, фрилансеры и BMS Lab',
  'cmp.criterion': 'Критерий',
  'cmp.vendor': 'Глобальный корпоративный подрядчик',
  'cmp.freelance': 'Фрилансеры',
  'cmp.bms': 'BMS Lab',
  'cmp.r1': 'Скорость старта',
  'cmp.r1.v': 'От недель до месяцев',
  'cmp.r1.f': 'Несколько дней',
  'cmp.r1.b': 'От нескольких дней до двух недель',
  'cmp.r2': 'Стоимость',
  'cmp.r2.v': 'Высокие ставки и накладные расходы',
  'cmp.r2.f': 'Низкая, но непредсказуемая',
  'cmp.r2.b': 'Эффективная и предсказуемая',
  'cmp.r3': 'Гибкость',
  'cmp.r3.v': 'Долгие контракты',
  'cmp.r3.f': 'Высокая, но без замены',
  'cmp.r3.b': 'Масштабирование помесячно, с заменой',
  'cmp.r4': 'AI в процессе',
  'cmp.r4.v': 'Зависит от команды',
  'cmp.r4.f': 'Зависит от человека',
  'cmp.r4.b': 'Встроен в каждый этап',
  'cmp.r5': 'Внимание сеньоров',
  'cmp.r5.v': 'Часто команды из джуниоров',
  'cmp.r5.f': 'Один человек — один взгляд',
  'cmp.r5.b': 'Техлид в каждой команде',

  'proc.eyebrow': 'Ваши первые 14 дней',
  'proc.title': 'От первого звонка до первого спринта — две недели.',
  'p1.day': 'День 1',
  'p1.title': 'Знакомство',
  'p1.text': '30 минут о ваших целях, стеке и команде. При необходимости сначала подписываем NDA.',
  'p2.day': 'Дни 2–3',
  'p2.title': 'Предложение и оценка',
  'p2.text': 'Состав команды, сроки и стоимость — письменно в течение 48 часов.',
  'p3.day': 'Дни 4–7',
  'p3.title': 'Знакомство с инженерами',
  'p3.text': 'Подборка резюме и технические интервью — вы решаете, кто войдёт в команду.',
  'p4.day': 'Дни 8–9',
  'p4.title': 'Договор и онбординг',
  'p4.text': 'Договор, передача прав на IP, доступы и инструменты.',
  'p5.day': 'Дни 10–14',
  'p5.title': 'Первый спринт',
  'p5.text': 'Команда выпускает первый срез, и вы видите его в работе на живом демо.',

  'faq.eyebrow': 'Вопросы',
  'faq.title': 'Вопросы, которые нам задают каждую неделю.',
  'q1.q': 'Как формируется стоимость?',
  'q1.a':
    'Тремя способами: ежемесячная ставка за инженера для выделенных команд и аутстаффинга, фиксированная цена за этап для проектов с понятным объёмом и фиксированная цена за 30-дневный AI-пилот. Письменную оценку вы получите в течение 48 часов после знакомства.',
  'q2.q': 'Кому принадлежат код и права на IP?',
  'q2.a':
    'Вам. По нашим договорам вся интеллектуальная собственность — исходный код, дизайн и документация — передаётся вам. Репозитории могут с первого дня находиться в вашей организации.',
  'q3.q': 'Вы подписываете NDA?',
  'q3.a':
    'Да — если хотите, ещё до первого подробного разговора. Каждый инженер на вашем проекте также связан обязательствами о конфиденциальности.',
  'q4.q': 'Как вы работаете с часовыми поясами?',
  'q4.a':
    'Ташкент — GMT+5. Мы пересекаемся с рабочим днём ЕС на 4–5 часов, со странами Залива — почти весь день, а с США проводим созвоны рано утром или вечером. Выделенные команды могут сдвигать рабочие часы.',
  'q5.q': 'Как быстро вы можете начать?',
  'q5.a':
    'Предложение — за 48 часов, работающая команда — в большинстве случаев за две недели. Отдельные инженеры часто выходят ещё быстрее.',
  'q6.q': 'Можно начать с пробного периода?',
  'q6.a':
    'Да. Начните с небольшого платного пилота — один инженер на несколько недель или 30-дневный AI-пилот — и масштабируйтесь, только когда результат вас устроит.',

  'cta.eyebrow': 'Давайте обсудим',
  'cta.title1': 'Соберём',
  'cta.title2': 'вашу следующую команду.',
  'cta.lead':
    'Расскажите, что вы создаёте. Ответим в течение рабочего дня, предложение пришлём за 48 часов.',
  'contact.phone': 'Телефон',
  'contact.email': 'Email',
  'contact.address': 'Офис',
  'contact.telegram': 'Telegram',
  'contact.telegramCta': 'Написать в Telegram',

  'form.title': 'Расскажите о проекте',
  'form.name': 'Имя',
  'form.email': 'Рабочий email',
  'form.company': 'Компания',
  'form.optional': 'необязательно',
  'form.model': 'Модель сотрудничества',
  'form.model.any': 'Пока не знаю',
  'form.message': 'Что вы создаёте?',
  'form.ph.name': 'Анна Смирнова',
  'form.ph.email': 'anna@company.com',
  'form.ph.company': 'ООО «Компания»',
  'form.ph.message': 'Пара строк о продукте, команде и сроках',
  'form.submit': 'Отправить запрос',
  'form.note':
    'Кнопка откроет почтовое приложение с готовым письмом. Удобнее чат? Напишите нам в Telegram.',
  'form.err.required': 'Пожалуйста, заполните это поле.',
  'form.err.email': 'Пожалуйста, введите корректный email.',
  'form.err.summary': 'Пожалуйста, проверьте отмеченные поля.',
  'form.ok': 'Сейчас откроется почтовое приложение. Если этого не произошло, напишите нам напрямую:',
  'form.subject': 'Запрос на аутсорсинг',

  'footer.tagline': 'Инженерные команды из Ташкента — для всего мира.',
  'footer.nav': 'Навигация в подвале',
  'footer.product': 'Продукт Digital Twin',
  'footer.itpark': 'IT Park Узбекистан',
  'footer.rights': 'Все права защищены.',
  'footer.top': 'Наверх',
};

const dictionaries: Record<Lang, Record<Key, string>> = { en, uz, ru };

const HTML_LANG: Record<Lang, string> = { en: 'en', uz: 'uz-Latn', ru: 'ru' };
const OG_LOCALE: Record<Lang, string> = { en: 'en_US', uz: 'uz_UZ', ru: 'ru_RU' };

let current: Lang = 'en';
const listeners = new Set<(lang: Lang) => void>();

export function isKey(value: string | undefined | null): value is Key {
  return typeof value === 'string' && Object.prototype.hasOwnProperty.call(en, value);
}

function isLang(value: string | null): value is Lang {
  return value === 'en' || value === 'uz' || value === 'ru';
}

export function t(key: Key): string {
  return dictionaries[current][key];
}

export function getLang(): Lang {
  return current;
}

export function onLangChange(callback: (lang: Lang) => void): void {
  listeners.add(callback);
}

function readStored(): string | null {
  try {
    return window.localStorage.getItem(LANG_STORAGE_KEY);
  } catch {
    return null;
  }
}

function store(lang: Lang): void {
  try {
    window.localStorage.setItem(LANG_STORAGE_KEY, lang);
  } catch {
    /* private mode / storage disabled — the choice simply is not persisted */
  }
}

function detectLang(): Lang {
  const fromUrl = new URLSearchParams(window.location.search).get('lang');
  if (isLang(fromUrl)) return fromUrl;
  const stored = readStored();
  if (isLang(stored)) return stored;
  return 'en';
}

/** Keeps `?lang=` in the address bar in sync so a reload or a shared link keeps the choice. */
function syncUrl(lang: Lang): void {
  const url = new URL(window.location.href);
  if (lang === 'en') url.searchParams.delete('lang');
  else url.searchParams.set('lang', lang);
  if (url.href !== window.location.href) window.history.replaceState(null, '', url.href);
}

/** Translates every `[data-i18n]` and `[data-i18n-attr]` element inside `root`. */
export function translate(root: ParentNode = document): void {
  const dict = dictionaries[current];

  $$('[data-i18n]', root).forEach((el) => {
    const key = el.dataset.i18n;
    if (isKey(key)) el.textContent = dict[key];
  });

  $$('[data-i18n-attr]', root).forEach((el) => {
    (el.dataset.i18nAttr ?? '').split(',').forEach((pair) => {
      const [attr, key] = pair.split(':').map((part) => part.trim());
      if (attr && isKey(key)) el.setAttribute(attr, dict[key]);
    });
  });
}

function applyDocument(): void {
  const dict = dictionaries[current];
  document.documentElement.lang = HTML_LANG[current];
  document.title = dict['meta.title'];
  document.querySelector('meta[name="description"]')?.setAttribute('content', dict['meta.description']);
  document.querySelector('meta[property="og:locale"]')?.setAttribute('content', OG_LOCALE[current]);

  $$<HTMLButtonElement>('[data-lang]').forEach((button) => {
    button.setAttribute('aria-pressed', String(button.dataset.lang === current));
  });
}

export function setLang(lang: Lang, persist = true): void {
  current = lang;
  translate();
  applyDocument();
  if (persist) {
    store(lang);
    syncUrl(lang);
  }
  listeners.forEach((callback) => callback(lang));
}

export function initI18n(): void {
  $$<HTMLButtonElement>('[data-lang]').forEach((button) => {
    button.addEventListener('click', () => {
      const lang = button.dataset.lang ?? null;
      if (isLang(lang) && lang !== current) setLang(lang);
    });
  });

  const initial = detectLang();
  setLang(initial, false);
  if (initial !== 'en') store(initial);
}
