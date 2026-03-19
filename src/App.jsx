import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  ArrowRight,
  Bot,
  BrainCircuit,
  CalendarDays,
  CheckCheck,
  ClipboardCheck,
  Database,
  FileCheck2,
  FileStack,
  Github,
  Globe2,
  Heart,
  Mail,
  Menu,
  Network,
  PanelTop,
  Shield,
  ShieldCheck,
  Sparkles,
  Users,
  Waypoints,
  X,
} from 'lucide-react';

const navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Live Demo', href: '#live-demo' },
  { label: 'Built With', href: '#built-with' },
];

const stats = [
  { value: 5, suffix: '', label: 'AI Agents Working in Parallel' },
  { value: 3, prefix: '~', suffix: 'hrs', label: 'Manual Work Eliminated Per Hire' },
  { value: 0.01, prefix: '$', suffix: '', decimals: 2, label: 'Cost Per Onboarding Run' },
  { value: 7, suffix: '', label: 'Regions Supported' },
  { value: 100, suffix: '%', label: 'Audit Trail Coverage' },
];

const timelineSteps = [
  {
    icon: Users,
    title: 'HR confirms new hire',
    description:
      'A single hire confirmation triggers OnboardIQ and packages the employee profile for orchestration.',
  },
  {
    icon: ClipboardCheck,
    title: 'Compliance Validator checks regional requirements',
    description:
      'Country-aware rules inspect tax, legal, and document requirements before the workflow can proceed.',
  },
  {
    icon: ShieldCheck,
    title: 'HR approves at the HITL checkpoint',
    description:
      'Responsible AI guardrails keep HR in control with one-click approval before any downstream action fires.',
  },
  {
    icon: Mail,
    title: 'WelcomeMessenger personalises outreach',
    description:
      'The system drafts and sends welcome communication tailored to role, manager, region, and start date.',
  },
  {
    icon: PanelTop,
    title: 'ITProvisioner opens role-specific access tickets',
    description:
      'Provisioning instructions, app bundles, and least-privilege access tasks are generated automatically.',
  },
  {
    icon: CalendarDays,
    title: 'Documents and scheduling run in parallel',
    description:
      'DocumentDispatcher and CalendarScheduler fan out together to compress onboarding into a single flow.',
  },
];

const featureCards = [
  {
    icon: Network,
    title: 'Multi-Agent Orchestration',
    description:
      '5 specialized AI agents working simultaneously - no single point of failure, maximum speed.',
  },
  {
    icon: ShieldCheck,
    title: 'Human-in-the-Loop (HITL)',
    description:
      'HR stays in control. One-click approval before any automated action fires. Responsible AI by design.',
  },
  {
    icon: ClipboardCheck,
    title: 'Compliance Validator',
    description:
      'Automatically validates regional compliance requirements for India, USA, UK, UAE, Canada, Australia, Singapore before proceeding.',
  },
  {
    icon: Waypoints,
    title: 'Knowledge Graph Audit Trail',
    description:
      'Every onboarding writes structured Employee -> Task nodes to an Apache AGE knowledge graph. Full audit trail, forever.',
  },
  {
    icon: Globe2,
    title: 'Region-Aware Intelligence',
    description:
      'Automatically selects correct compliance forms, tax documents, and legal requirements based on the employee country.',
  },
  {
    icon: Database,
    title: 'RAG-Powered Knowledge Base',
    description:
      'Agents reference policy documents, provisioning maps, and email templates using retrieval-augmented generation.',
  },
];

const builtWithCards = [
  { icon: Sparkles, name: 'Airia Platform' },
  { icon: BrainCircuit, name: 'GPT-4o' },
  { icon: Bot, name: 'GPT-4o mini' },
  { icon: Waypoints, name: 'Apache AGE Knowledge Graph' },
  { icon: Database, name: 'RAG' },
  { icon: Shield, name: 'Human-in-the-Loop' },
];

const demoPresets = [
  {
    id: 'ananya-india',
    label: 'Priya Sharma • Software Engineer • India',
    variables: {
      first_name: 'Ananya',
      last_name: 'Rao',
      email: 'ananya.rao@onboardiq.ai',
      role: 'Solutions Architect',
      department: 'Customer Success',
      start_date: '2026-04-08',
      manager_name: 'Rohit Mehta',
      manager_email: 'rohit.mehta@onboardiq.ai',
      region: 'India',
    },
  },
  {
    id: 'omar-uae',
    label: 'Ahmed Al-Rashid • Sales Manager • UAE',
    variables: {
      first_name: 'Omar',
      last_name: 'Farouk',
      email: 'omar.farouk@onboardiq.ai',
      role: 'Revenue Operations Lead',
      department: 'Operations',
      start_date: '2026-04-18',
      manager_name: 'Layla Nasser',
      manager_email: 'layla.nasser@onboardiq.ai',
      region: 'UAE',
    },
  },
  {
    id: 'maya-canada',
    label: 'Sofia Turner • Product Designer • Canada',
    variables: {
      first_name: 'Maya',
      last_name: 'Chen',
      email: 'maya.chen@onboardiq.ai',
      role: 'Product Marketing Manager',
      department: 'Marketing',
      start_date: '2026-05-12',
      manager_name: 'Daniel Brooks',
      manager_email: 'daniel.brooks@onboardiq.ai',
      region: 'Canada',
    },
  },
];

const heroFlowLines = [
  { d: 'M 140 184 L 198 184', style: 'solid' },
  { d: 'M 322 184 L 380 184', style: 'solid' },
  { d: 'M 504 184 L 562 184', style: 'solid' },
  { d: 'M 686 184 C 752 184 770 108 836 100', style: 'dashed' },
  { d: 'M 686 184 C 752 184 770 180 836 176', style: 'dashed' },
  { d: 'M 686 184 C 752 184 770 248 836 252', style: 'dashed' },
  { d: 'M 686 184 C 752 184 770 320 836 328', style: 'dashed' },
  { d: 'M 946 100 C 984 100 992 186 1002 218', style: 'dashed' },
  { d: 'M 946 176 C 982 176 992 204 1002 218', style: 'dashed' },
  { d: 'M 946 252 C 982 252 992 232 1002 218', style: 'dashed' },
  { d: 'M 946 328 C 984 328 992 250 1002 218', style: 'dashed' },
];

const architectureLines = [
  'M 346 118 C 446 118 496 164 560 180',
  'M 346 292 C 446 292 496 246 560 230',
  'M 840 180 C 904 164 954 118 1054 118',
  'M 840 230 C 904 246 954 292 1054 292',
];

const airiaEmbedConfig = {
  pipelineId: import.meta.env.VITE_AIRIA_PIPELINE_ID || '75e0a7ca-f7cd-4039-8608-340dd7c60a33',
  apiKey: import.meta.env.VITE_AIRIA_API_KEY || '',
  apiUrl: import.meta.env.VITE_AIRIA_API_URL || 'https://embed-api.airia.ai',
  greeting: import.meta.env.VITE_AIRIA_GREETING || 'Hello! How can I assist you today?',
  imagePath: import.meta.env.VITE_AIRIA_IMAGE_PATH || '',
  imageSize: import.meta.env.VITE_AIRIA_IMAGE_SIZE || 'small',
  imageBgColor: import.meta.env.VITE_AIRIA_IMAGE_BG_COLOR || '#534AB7',
  autoOpen: (import.meta.env.VITE_AIRIA_AUTO_OPEN || 'true') === 'true',
};

const airiaEmbedDocumentCss = `
  :root {
    color-scheme: dark;
    --brand-bg: #0B0F21;
    --brand-panel: #11142B;
    --brand-border: rgba(255, 255, 255, 0.08);
    --brand-purple: #6E62F6;
    --brand-teal: #1D9E75;
    --brand-text: #F8FAFC;
    --brand-muted: #94A3B8;
  }

  html, body, #root {
    margin: 0;
    height: 100%;
    width: 100%;
    overflow: hidden;
    background: var(--brand-bg);
  }

  body {
    font-family: Inter, sans-serif;
  }

  [data-radix-popper-content-wrapper] {
    position: absolute !important;
    inset: 0 !important;
    width: 100% !important;
    height: 100% !important;
    transform: none !important;
    pointer-events: auto !important;
  }

  [data-radix-popper-content-wrapper] > * {
    width: 100% !important;
    height: 100% !important;
    margin: 0 !important;
    max-height: none !important;
    border: 0 !important;
    border-radius: 24px !important;
    box-shadow: none !important;
  }
`;

const airiaEmbedShadowCss = `
  :host {
    display: block;
    height: 100%;
    width: 100%;
  }

  #chat-container,
  floating-chat {
    display: block !important;
    height: 100% !important;
    width: 100% !important;
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box !important;
  }

  .fixed {
    position: absolute !important;
    inset: 0 !important;
    width: 100% !important;
    height: 100% !important;
    z-index: 1 !important;
  }

  button.rounded-full {
    display: none !important;
  }

  [data-radix-popper-content-wrapper] {
    position: absolute !important;
    inset: 0 !important;
    width: 100% !important;
    height: 100% !important;
    transform: none !important;
  }

  [data-radix-popper-content-wrapper] > * {
    width: 100% !important;
    height: 100% !important;
    margin: 0 !important;
    max-height: none !important;
    border-radius: 24px !important;
    border: 1px solid rgba(255, 255, 255, 0.08) !important;
    background: #0B0F21 !important;
    box-shadow: none !important;
  }

  #popover-container,
  #popover-container > div,
  #popover-container [data-radix-popper-content-wrapper],
  #popover-container [data-radix-popper-content-wrapper] > * {
    height: 100% !important;
  }

  #popover-container .p-2[style] {
    height: calc(100% - 78px) !important;
    padding: 8px 10px 14px !important;
    overflow: visible !important;
  }

  #popover-container .p-2[style] > * {
    height: 100% !important;
  }

  .mr-1 {
    margin-right: 0 !important;
  }

  .bg-zinc-50,
  .bg-card,
  .bg-background {
    background: #0B0F21 !important;
  }

  .border,
  .border-b,
  .border-\\[1px\\],
  .border-input {
    border-color: rgba(255, 255, 255, 0.08) !important;
  }

  .text-foreground,
  .text-popover-foreground {
    color: #F8FAFC !important;
  }

  .overflow-auto {
    background: #0F1330 !important;
    border-color: rgba(255, 255, 255, 0.08) !important;
    border-radius: 18px !important;
    padding: 16px !important;
    margin-bottom: 8px !important;
  }

  textarea {
    display: block !important;
    width: 100% !important;
    min-height: 58px !important;
    border: 1px solid rgba(110, 98, 246, 0.42) !important;
    border-radius: 16px !important;
    background: #11142B !important;
    color: #F8FAFC !important;
    padding: 14px 16px !important;
    resize: none !important;
    margin-top: 4px !important;
    margin-bottom: 8px !important;
    box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.03) !important;
  }

  textarea::placeholder {
    color: #94A3B8 !important;
  }

  .bg-primary,
  .hover\\:bg-indigo-500:hover,
  .hover\\:bg-indigo-700:hover {
    background: #6E62F6 !important;
    color: #FFFFFF !important;
  }

  .text-primary {
    color: #6E62F6 !important;
  }

  .bg-secondary {
    background: rgba(29, 158, 117, 0.16) !important;
  }

  .text-secondary-foreground {
    color: #D1FAE5 !important;
  }

  .shadow,
  .shadow-md,
  .shadow-sm {
    box-shadow: none !important;
  }

  .cursor-ew-resize,
  .cursor-ns-resize,
  .cursor-nesw-resize,
  .cursor-nwse-resize {
    opacity: 0 !important;
    pointer-events: none !important;
  }
`;

const createAiriaEmbedDoc = (config) => `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Airia Embed</title>
    <style>
      ${airiaEmbedDocumentCss}
    </style>
  </head>
  <body>
    <div id="root"></div>
    <script type="module">
      const config = ${JSON.stringify(config)};
      const root = document.getElementById("root");
      const documentCss = ${JSON.stringify(airiaEmbedDocumentCss)};
      const shadowCss = ${JSON.stringify(airiaEmbedShadowCss)};

      const injectDocumentStyle = () => {
        if (document.getElementById("airia-inline-document-style")) return;
        const style = document.createElement("style");
        style.id = "airia-inline-document-style";
        style.textContent = documentCss;
        document.head.appendChild(style);
      };

      const normalizeAiriaLayout = () => {
        const host = Array.from(document.body.children).find((node) => node.shadowRoot);
        if (!host || !host.shadowRoot) return false;

        const shadow = host.shadowRoot;
        if (!shadow.getElementById("airia-inline-shadow-style")) {
          const style = document.createElement("style");
          style.id = "airia-inline-shadow-style";
          style.textContent = shadowCss;
          shadow.appendChild(style);
        }

        const fixedWrapper = shadow.querySelector(".fixed");
        if (fixedWrapper) {
          fixedWrapper.style.inset = "0";
          fixedWrapper.style.width = "100%";
          fixedWrapper.style.height = "100%";
        }

        return true;
      };

      if (!config.apiKey || !config.pipelineId) {
        root.innerHTML = \`
          <div style="height:100%;display:flex;align-items:center;justify-content:center;padding:24px;background:#0B0F21;color:#E5E7EB;font:14px Inter, sans-serif;">
            <div style="max-width:420px;border:1px solid rgba(255,255,255,0.12);background:rgba(255,255,255,0.04);border-radius:24px;padding:24px;">
              <div style="font-size:12px;letter-spacing:0.18em;text-transform:uppercase;color:#1D9E75;margin-bottom:12px;">Airia Embed</div>
              <div style="font-size:18px;font-weight:600;color:white;margin-bottom:8px;">Missing embed environment variables</div>
              <div style="line-height:1.7;color:#D1D5DB;">Set <code>VITE_AIRIA_API_KEY</code> and optionally <code>VITE_AIRIA_PIPELINE_ID</code> in your deploy environment or local <code>.env</code> file.</div>
            </div>
          </div>
        \`;
      } else {
        injectDocumentStyle();
        const { default: AiriaChat } = await import("https://embed-api.airia.ai/get-chat-embed.js");
        AiriaChat.init({
          pipelineId: config.pipelineId,
          apiKey: config.apiKey,
          apiUrl: config.apiUrl,
          greeting: config.greeting,
          ...(config.variables ? { variables: config.variables } : {}),
          ...(config.imagePath ? { imagePath: config.imagePath } : {}),
          imageSize: config.imageSize,
          imageBgColor: config.imageBgColor,
          autoOpen: config.autoOpen
        });

        normalizeAiriaLayout();
        const observer = new MutationObserver(() => {
          normalizeAiriaLayout();
        });
        observer.observe(document.body, { childList: true, subtree: true });
      }
    </script>
  </body>
</html>`;

function CountUp({ value, prefix = '', suffix = '', decimals = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;

    let frameId;
    const duration = 1400;
    const start = performance.now();

    const tick = (time) => {
      const progress = Math.min((time - start) / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      setDisplay(value * eased);
      if (progress < 1) frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [inView, value]);

  return (
    <span ref={ref}>
      {prefix}
      {display.toFixed(decimals)}
      {suffix}
    </span>
  );
}

function SectionHeading({ eyebrow, title, description, align = 'center' }) {
  const alignClass = align === 'left' ? 'items-start text-left' : 'items-center text-center';

  return (
    <div className={`mx-auto flex max-w-3xl flex-col gap-4 ${alignClass}`}>
      <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-brand-teal">
        <Sparkles className="h-3.5 w-3.5" />
        {eyebrow}
      </span>
      <h2 className="text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="max-w-2xl text-base leading-8 text-gray-300 sm:text-lg">{description}</p>
      ) : null}
    </div>
  );
}

function FlowNode({ x, y, width, height, label, fill, stroke = 'rgba(255,255,255,0.12)' }) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx="20"
        fill={fill}
        stroke={stroke}
        strokeWidth="1.2"
      />
      <text
        x={x + width / 2}
        y={y + height / 2 + 5}
        textAnchor="middle"
        fill="#F8FAFC"
        fontSize="16"
        fontWeight="600"
        fontFamily="Inter, sans-serif"
      >
        {label}
      </text>
    </g>
  );
}

function OnboardIQLogo({ compact = false, className = '', subtitle = 'Built on Airia' }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="relative flex h-12 w-12 shrink-0 items-center justify-center">
        <div className="absolute inset-1 rounded-full bg-brand-purple/25 blur-xl" />
        <svg viewBox="0 0 64 64" className="relative h-12 w-12" aria-hidden="true">
          <defs>
            <linearGradient id="onboardiq-logo-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#D78BFF" />
              <stop offset="48%" stopColor="#A9B5FF" />
              <stop offset="100%" stopColor="#8FF5D8" />
            </linearGradient>
            <filter id="onboardiq-logo-glow" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="2.2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <g fill="none" stroke="url(#onboardiq-logo-gradient)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" filter="url(#onboardiq-logo-glow)">
            <rect x="12" y="14" width="40" height="36" rx="11" />
            <path d="M32 6v10" />
            <path d="M32 50v8" />
            <path d="M6 32h6" opacity="0" />
            <path d="M52 32h6" opacity="0" />
            <circle cx="32" cy="6" r="4" fill="url(#onboardiq-logo-gradient)" stroke="none" />
            <circle cx="32" cy="58" r="4" fill="url(#onboardiq-logo-gradient)" stroke="none" />
            <circle cx="10" cy="32" r="4.5" fill="url(#onboardiq-logo-gradient)" stroke="none" opacity="0.9" />
            <circle cx="54" cy="32" r="4.5" fill="url(#onboardiq-logo-gradient)" stroke="none" opacity="0.9" />
            <circle cx="32" cy="32" r="5.5" fill="url(#onboardiq-logo-gradient)" stroke="none" />
            <path d="M32 16v8" opacity="0.8" />
            <path d="M22 24l5 3" opacity="0.8" />
            <path d="M42 24l-5 3" opacity="0.8" />
            <path d="M22 40l5-3" opacity="0.8" />
            <path d="M42 40l-5-3" opacity="0.8" />
            <circle cx="22" cy="24" r="3.2" fill="url(#onboardiq-logo-gradient)" stroke="none" />
            <circle cx="42" cy="24" r="3.2" fill="url(#onboardiq-logo-gradient)" stroke="none" />
            <circle cx="22" cy="40" r="3.2" fill="url(#onboardiq-logo-gradient)" stroke="none" />
            <circle cx="42" cy="40" r="3.2" fill="url(#onboardiq-logo-gradient)" stroke="none" />
            <circle cx="32" cy="24" r="3.2" fill="url(#onboardiq-logo-gradient)" stroke="none" />
            <circle cx="32" cy="40" r="3.2" fill="url(#onboardiq-logo-gradient)" stroke="none" />
          </g>
        </svg>
      </div>
      <div className="min-w-0">
        <div
          className={`bg-gradient-to-r from-[#D8A6FF] via-[#C89CFF] to-[#C586FF] bg-clip-text font-black tracking-tight text-transparent ${
            compact ? 'text-2xl leading-none' : 'text-[2rem] leading-none'
          }`}
        >
          OnboardIQ
        </div>
        {subtitle ? (
          <div className="mt-1 text-xs uppercase tracking-[0.24em] text-gray-400">{subtitle}</div>
        ) : null}
      </div>
    </div>
  );
}

function ArchitectureNode({
  className,
  tone = 'default',
  title,
  subtitle,
  icon,
  pulse = false,
  compact = false,
}) {
  const toneClasses = {
    default: 'border-white/16 bg-[#12162D]/95',
    purple: 'border-brand-purple/35 bg-brand-purple/14 shadow-glow',
    amber: 'border-amber-400/25 bg-amber-500/10',
    orange: 'border-orange-400/30 bg-orange-500/10',
    teal: 'border-brand-teal/25 bg-brand-teal/10',
  };

  const iconClasses = {
    default: 'bg-white/8 text-white',
    purple: 'bg-brand-purple/22 text-white',
    amber: 'bg-amber-500/14 text-amber-200',
    orange: 'bg-orange-500/14 text-orange-200',
    teal: 'bg-brand-teal/14 text-[#CFFAEF]',
  };

  return (
    <div
      className={`absolute rounded-[22px] backdrop-blur-xl ${compact ? 'px-3 py-3' : 'px-4 py-4'} ${toneClasses[tone]} ${className} ${
        pulse ? 'pulse-ring' : ''
      }`}
    >
      <div className={`flex ${compact ? 'items-start gap-2.5' : 'items-center gap-3'}`}>
        <div
          className={`flex shrink-0 items-center justify-center rounded-2xl ${iconClasses[tone]} ${
            compact ? 'h-9 w-9' : 'h-10 w-10'
          }`}
        >
          {icon}
        </div>
        <div>
          <div className={`${compact ? 'text-[0.92rem]' : 'text-sm'} font-semibold leading-tight text-white`}>
            {title}
          </div>
          <div className={`mt-1 ${compact ? 'text-[0.78rem] leading-4' : 'text-xs'} text-gray-400`}>
            {subtitle}
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [selectedPresetId, setSelectedPresetId] = useState(demoPresets[0].id);
  const selectedPreset = demoPresets.find((preset) => preset.id === selectedPresetId) ?? demoPresets[0];
  const selectedPresetEntries = Object.entries(selectedPreset.variables);
  const formatPresetLabel = (preset) =>
    `${preset.variables.first_name} ${preset.variables.last_name} - ${preset.variables.role} - ${preset.variables.region}`;
  const airiaEmbedDoc = createAiriaEmbedDoc({
    ...airiaEmbedConfig,
    variables: selectedPreset.variables,
  });
  const hasAiriaApiKey = Boolean(airiaEmbedConfig.apiKey);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const tagline = 'AI-powered onboarding orchestration on Airia.';
    let index = 0;
    setTypedText('');

    const interval = window.setInterval(() => {
      index += 1;
      setTypedText(tagline.slice(0, index));
      if (index === tagline.length) window.clearInterval(interval);
    }, 45);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-brand-navy text-white">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="orb absolute -left-24 top-16 h-80 w-80 rounded-full bg-brand-purple/40" />
        <div className="orb orb-delay absolute right-[-4rem] top-[20rem] h-[26rem] w-[26rem] rounded-full bg-brand-teal/30" />
        <div className="grid-surface absolute inset-0 opacity-30" />
        <div className="absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-brand-purple/10 to-transparent" />
      </div>

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled ? 'border-b border-white/10 bg-[#090914]/70 shadow-2xl shadow-black/20 backdrop-blur-2xl' : 'bg-transparent'
        }`}
      >
        <div className="section-shell">
          <div className="flex h-20 items-center justify-between">
            <a href="#top" className="shrink-0">
              <OnboardIQLogo compact className="gap-2.5" />
            </a>

            <nav className="hidden items-center gap-8 lg:flex">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-gray-300 transition hover:text-white"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="hidden items-center gap-4 lg:flex">
              <motion.a
                href="#live-demo"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="rounded-full bg-brand-gradient px-5 py-3 text-sm font-semibold text-white shadow-glow transition"
              >
                See Live Demo
              </motion.a>
            </div>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white lg:hidden"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

          {mobileMenuOpen ? (
            <div className="mb-5 rounded-3xl border border-white/10 bg-[#0E1022]/90 p-4 backdrop-blur-2xl lg:hidden">
              <div className="flex flex-col gap-3">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="rounded-2xl px-3 py-2 text-sm font-medium text-gray-300 transition hover:bg-white/5 hover:text-white"
                  >
                    {link.label}
                  </a>
                ))}
                <a
                  href="#live-demo"
                  onClick={() => setMobileMenuOpen(false)}
                  className="mt-2 rounded-full bg-brand-gradient px-5 py-3 text-center text-sm font-semibold text-white shadow-glow"
                >
                  See Live Demo
                </a>
              </div>
            </div>
          ) : null}
        </div>
      </header>

      <main id="top" className="relative z-10">
        <section className="section-shell flex min-h-screen flex-col justify-center pt-28 pb-20 lg:pt-36">
          <div className="grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="relative">
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-sm font-medium text-gray-200"
              >
                <span className="text-base">🏆</span>
                Built for Airia AI Hackathon 2026
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.08, ease: 'easeOut' }}
                className="mt-7"
              >
                <div className="min-h-[36px] text-sm font-semibold uppercase tracking-[0.32em] text-brand-teal">
                  {typedText}
                  <span className="ml-1 inline-block h-4 w-[2px] animate-pulse bg-brand-teal align-middle" />
                </div>
                <h1 className="mt-6 max-w-4xl text-balance text-5xl font-semibold tracking-[-0.04em] text-white sm:text-6xl lg:text-7xl">
                  Onboard Every Employee. Zero Manual Work.
                </h1>
                <p className="mt-7 max-w-2xl text-lg leading-8 text-gray-300">
                  OnboardIQ orchestrates 5 AI agents in parallel - welcome emails, IT provisioning,
                  compliance forms, calendar scheduling, and more. All triggered by a single hire
                  confirmation.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.18, ease: 'easeOut' }}
                className="mt-10 flex flex-col gap-4 sm:flex-row"
              >
                <motion.a
                  href="#live-demo"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-gradient px-7 py-4 text-base font-semibold text-white shadow-glow"
                >
                  See Live Demo
                  <ArrowRight className="h-4 w-4" />
                </motion.a>
                <motion.a
                  href="#footer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-7 py-4 text-base font-semibold text-white transition hover:border-white/25 hover:bg-white/[0.06]"
                >
                  View on GitHub
                  <Github className="h-4 w-4" />
                </motion.a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.28, ease: 'easeOut' }}
                className="mt-12 grid max-w-2xl gap-4 sm:grid-cols-3"
              >
                {[
                  'HITL approvals baked in',
                  'Region-aware compliance routing',
                  'Knowledge graph audit trail',
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-gray-300"
                  >
                    {item}
                  </div>
                ))}
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: 'easeOut' }}
              className="panel gradient-border relative overflow-hidden p-4 sm:p-6"
            >
              <div className="absolute inset-x-10 top-0 h-32 rounded-full bg-brand-purple/15 blur-3xl" />
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold text-white">Live Agent Flow</div>
                  <div className="mt-1 text-sm text-gray-400">Hire confirmation to Day 1 launch</div>
                </div>
                <div className="rounded-full border border-brand-teal/30 bg-brand-teal/10 px-3 py-1 text-xs font-semibold text-brand-teal">
                  5 agents active
                </div>
              </div>
              <svg viewBox="0 0 1120 430" className="w-full">
                <defs>
                  <linearGradient id="heroStroke" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#6E62F6" />
                    <stop offset="100%" stopColor="#1D9E75" />
                  </linearGradient>
                  <marker
                    id="heroArrow"
                    viewBox="0 0 10 10"
                    refX="8"
                    refY="5"
                    markerWidth="8.5"
                    markerHeight="8.5"
                    markerUnits="strokeWidth"
                    orient="auto-start-reverse"
                  >
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="#8CE7DA" opacity="1" />
                  </marker>
                </defs>
                <g fill="none" strokeLinecap="round">
                  {heroFlowLines.map((line) => (
                    <path
                      key={line.d}
                      d={line.d}
                      stroke={line.style === 'solid' ? '#8CE7DA' : 'url(#heroStroke)'}
                      strokeWidth={line.style === 'solid' ? '3.4' : '2.8'}
                      markerEnd="url(#heroArrow)"
                      className={line.style === 'solid' ? 'flow-link-solid' : 'dash-flow'}
                    />
                  ))}
                </g>

                <FlowNode x={24} y={148} width={104} height={72} label="Input" fill="rgba(83,74,183,0.28)" />
                <FlowNode x={210} y={148} width={100} height={72} label="CV" fill="rgba(245,158,11,0.18)" />
                <FlowNode x={392} y={148} width={100} height={72} label="HITL" fill="rgba(251,146,60,0.18)" />
                <FlowNode x={574} y={148} width={100} height={72} label="Route" fill="rgba(83,74,183,0.25)" />
                <FlowNode x={850} y={64} width={84} height={72} label="Mail" fill="rgba(29,158,117,0.16)" />
                <FlowNode x={850} y={140} width={84} height={72} label="IT" fill="rgba(29,158,117,0.16)" />
                <FlowNode x={850} y={216} width={84} height={72} label="Docs" fill="rgba(29,158,117,0.16)" />
                <FlowNode x={850} y={292} width={84} height={72} label="Cal" fill="rgba(29,158,117,0.16)" />
                <FlowNode x={1016} y={182} width={94} height={72} label="Summary" fill="rgba(83,74,183,0.25)" />
              </svg>
              <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                {[
                  ['Compliance Validator', 'Validating India forms'],
                  ['HITL Approval', 'Awaiting HR approval'],
                  ['Parallel Agents', 'Welcome, IT, docs, calendar'],
                  ['Summarizer', 'Writing audit summary'],
                ].map(([title, meta]) => (
                  <div key={title} className="rounded-2xl border border-white/10 bg-[#11142b]/70 p-4 xl:min-h-[96px]">
                    <div className="text-sm font-semibold text-white">{title}</div>
                    <div className="mt-1 text-sm leading-6 text-gray-400">{meta}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <section className="section-shell pb-24">
          <div className="panel gradient-border grid gap-5 px-6 py-8 sm:grid-cols-2 lg:grid-cols-5 lg:px-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.55, delay: index * 0.08 }}
                className="rounded-3xl border border-white/8 bg-black/10 px-5 py-6"
              >
                <div className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                  <CountUp
                    value={stat.value}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    decimals={stat.decimals}
                  />
                </div>
                <div className="mt-3 text-sm leading-6 text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="how-it-works" className="section-shell pb-28">
          <SectionHeading
            eyebrow="Workflow"
            title="From Hire to Day 1 in Seconds"
            description="A controlled orchestration layer turns one HR confirmation into a multi-agent onboarding run, with compliance checks, approvals, execution, and auditability built in."
          />

          <div className="relative mt-16">
            <div className="absolute left-5 top-6 bottom-6 hidden w-px bg-gradient-to-b from-brand-purple/70 via-brand-teal/60 to-transparent md:block" />
            <div className="grid gap-6">
              {timelineSteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.6, delay: index * 0.08 }}
                    className="relative grid gap-5 md:grid-cols-[64px_1fr]"
                  >
                    <div className="relative z-10 hidden md:flex">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full border border-brand-purple/40 bg-[#12132d] text-sm font-semibold text-white shadow-glow">
                        {index + 1}
                      </div>
                    </div>
                    <div className="panel gradient-border flex flex-col gap-5 p-6 sm:flex-row sm:items-start sm:justify-between">
                      <div className="flex gap-4">
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand-purple/15 text-brand-teal">
                          <Icon className="h-6 w-6" />
                        </div>
                        <div>
                          <div className="flex items-center gap-3 md:hidden">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-brand-purple/40 bg-[#12132d] text-xs font-semibold text-white">
                              {index + 1}
                            </div>
                            <span className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-teal">
                              Step {index + 1}
                            </span>
                          </div>
                          <h3 className="mt-2 text-xl font-semibold text-white">{step.title}</h3>
                          <p className="mt-3 max-w-3xl text-base leading-7 text-gray-300">
                            {step.description}
                          </p>
                        </div>
                      </div>
                      <div className="rounded-2xl border border-white/10 bg-black/10 px-4 py-3 text-sm text-gray-400 sm:max-w-xs">
                        {index < 3 ? 'Control layer' : 'Execution layer'}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        <section id="features" className="section-shell pb-28">
          <SectionHeading
            eyebrow="Platform Advantages"
            title="Enterprise onboarding without enterprise drag"
            description="Every component is designed for speed, governance, and regional correctness. The result feels instant to HR while still producing a complete operational record."
          />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
            className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-3"
          >
            {featureCards.map((card) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.title}
                  variants={{
                    hidden: { opacity: 0, y: 32 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
                  }}
                  className="panel gradient-border group p-7 transition duration-300 hover:border-white/20 hover:bg-white/[0.06]"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-purple/15 text-brand-teal transition duration-300 group-hover:scale-105 group-hover:shadow-teal">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-6 text-xl font-semibold text-white">{card.title}</h3>
                  <p className="mt-4 text-base leading-7 text-gray-300">{card.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </section>

        <section className="section-shell pb-28">
          <div className="panel gradient-border overflow-hidden px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-brand-teal">
                  <Waypoints className="h-3.5 w-3.5" />
                  Architecture
                </span>
                <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                  The OnboardIQ Agent Network
                </h2>
              </div>
              <p className="max-w-2xl text-base leading-7 text-gray-300">
                A simple agent view: one orchestrator at the center coordinating the four onboarding
                agents that run in parallel.
              </p>
            </div>

            <div className="mt-10 hidden overflow-hidden rounded-[28px] border border-white/10 bg-[#0D1024] p-5 xl:block">
              <div className="relative h-[360px]">
                <div className="pointer-events-none absolute inset-x-28 top-8 h-24 rounded-full bg-brand-purple/12 blur-3xl" />
                <svg
                  viewBox="0 0 1400 360"
                  className="absolute inset-0 h-full w-full"
                  aria-hidden="true"
                >
                  <defs>
                    <linearGradient id="archStroke" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#6E62F6" />
                      <stop offset="100%" stopColor="#1D9E75" />
                    </linearGradient>
                  </defs>
                  <g fill="none" stroke="url(#archStroke)" strokeWidth="2.4" strokeLinecap="round">
                    {architectureLines.map((line) => (
                      <path key={line} d={line} className="dash-flow" />
                    ))}
                  </g>
                </svg>

                <ArchitectureNode
                  className="left-[18%] top-[12%] w-[270px] -translate-x-1/2"
                  tone="purple"
                  title="WelcomeMessenger"
                  subtitle="Email agent"
                  icon={<Mail className="h-5 w-5" />}
                  compact
                />
                <ArchitectureNode
                  className="left-[50%] top-[34%] w-[272px] -translate-x-1/2"
                  tone="purple"
                  title="OnboardIQ Orchestrator"
                  subtitle="Routes all onboarding actions"
                  icon={<Sparkles className="h-5 w-5" />}
                  pulse
                />
                <ArchitectureNode
                  className="left-[18%] top-[60%] w-[280px] -translate-x-1/2"
                  tone="purple"
                  title="DocumentDispatcher"
                  subtitle="Forms + packets"
                  icon={<FileStack className="h-5 w-5" />}
                  compact
                />
                <ArchitectureNode
                  className="left-[82%] top-[12%] w-[248px] -translate-x-1/2"
                  tone="teal"
                  title="ITProvisioner"
                  subtitle="Access + tickets"
                  icon={<PanelTop className="h-5 w-5" />}
                  compact
                />
                <ArchitectureNode
                  className="left-[82%] top-[60%] w-[282px] -translate-x-1/2"
                  tone="teal"
                  title="CalendarScheduler"
                  subtitle="Day 1 coordination"
                  icon={<CalendarDays className="h-5 w-5" />}
                  compact
                />
              </div>
            </div>

            <div className="mt-8 grid gap-4 xl:hidden">
              {[
                'OnboardIQ Orchestrator at the center',
                'WelcomeMessenger and DocumentDispatcher on the left',
                'ITProvisioner and CalendarScheduler on the right',
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-3xl border border-white/10 bg-[#0D1024] px-5 py-4 text-sm text-gray-300"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="live-demo" className="section-shell pb-28">
          <SectionHeading
            eyebrow="Interactive Demo"
            title="Try OnboardIQ Live"
            description="Enter a new hire's details and watch all 5 agents execute in real time."
          />

          <div className="mt-14 panel gradient-border overflow-hidden p-5 sm:p-6">
            <div className="grid gap-5 xl:grid-cols-[1.58fr_0.42fr]">
              <div className="rounded-[28px] border border-white/10 bg-[#0B0F21] p-4 sm:p-5">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-gradient shadow-glow">
                      <Sparkles className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-white">Airia Live Demo</div>
                      <div className="text-sm text-gray-400">Embed-ready orchestration console</div>
                    </div>
                  </div>
                  <div
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      hasAiriaApiKey
                        ? 'border border-brand-teal/30 bg-brand-teal/10 text-brand-teal'
                        : 'border border-amber-400/30 bg-amber-500/10 text-amber-300'
                    }`}
                  >
                    {hasAiriaApiKey ? 'Configured' : 'Missing env'}
                  </div>
                </div>

                <div className="mt-4 rounded-3xl border border-white/10 bg-[#11142B] p-3.5 sm:p-4">
                  <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
                    <div>
                      <div className="text-xs uppercase tracking-[0.28em] text-gray-500">Preset Variables</div>
                      <div className="mt-1 text-xs text-gray-400">9 inputs loaded into a fresh Airia session.</div>
                    </div>
                    <div className="w-full xl:max-w-sm">
                      <select
                        value={selectedPresetId}
                        onChange={(event) => setSelectedPresetId(event.target.value)}
                        className="w-full rounded-2xl border border-brand-purple/30 bg-brand-purple/10 px-4 py-2.5 text-sm font-medium text-gray-100 outline-none transition focus:border-brand-purple/60"
                      >
                        {demoPresets.map((preset) => (
                          <option key={preset.id} value={preset.id} className="bg-[#11142B] text-white">
                            {formatPresetLabel(preset)}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="mt-3 grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
                    {selectedPresetEntries.map(([key, value]) => (
                      <div
                        key={key}
                        className="rounded-[18px] border border-white/8 bg-white/[0.03] px-3 py-2"
                      >
                        <div className="text-[9px] font-semibold uppercase tracking-[0.16em] text-gray-500">
                          {key.replaceAll('_', ' ')}
                        </div>
                        <div className="mt-1 truncate text-[13px] text-gray-100">{value}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 overflow-hidden rounded-[28px] border border-white/10 bg-black/20">
                  <iframe
                    key={selectedPresetId}
                    title="Airia OnboardIQ Demo"
                    srcDoc={airiaEmbedDoc}
                    className="h-[840px] w-full bg-[#0B0F21]"
                    sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <div className="rounded-[28px] border border-white/10 bg-[#0B0F21] p-4">
                  <div className="text-sm font-semibold text-white">Agent Activity</div>
                  <div className="mt-3 space-y-2.5">
                    {[
                      ['Compliance Validator', 'Complete', 'bg-amber-500'],
                      ['WelcomeMessenger', 'Running', 'bg-brand-teal'],
                      ['ITProvisioner', 'Running', 'bg-brand-teal'],
                      ['DocumentDispatcher', 'Running', 'bg-brand-teal'],
                      ['CalendarScheduler', 'Queued', 'bg-brand-purple'],
                    ].map(([name, state, color]) => (
                      <div
                        key={name}
                        className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3"
                      >
                        <span className="text-sm text-gray-200">{name}</span>
                        <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-gray-400">
                          <span className={`h-2.5 w-2.5 rounded-full ${color}`} />
                          {state}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-[28px] border border-white/10 bg-[#0B0F21] p-4">
                  <div className="text-sm font-semibold text-white">What HR sees</div>
                  <div className="mt-3 grid gap-2.5">
                    {[
                      'Regional compliance checklist',
                      'One-click HITL approval',
                      'Live parallel execution logs',
                      'Structured graph-backed audit summary',
                    ].map((item) => (
                      <div
                        key={item}
                        className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-gray-300"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="built-with" className="section-shell pb-24">
          <SectionHeading eyebrow="Ecosystem" title="Powered By" />
          <div className="mt-14 grid gap-4 sm:grid-cols-2 xl:grid-cols-6">
            {builtWithCards.map((card, index) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.5, delay: index * 0.06 }}
                  className="panel flex min-h-[144px] flex-col items-center justify-center gap-4 p-6 text-center"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 text-brand-teal">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="text-sm font-semibold text-gray-100">{card.name}</div>
                </motion.div>
              );
            })}
          </div>
        </section>
      </main>

      <footer id="footer" className="relative z-10 border-t border-white/10 bg-black/10">
        <div className="section-shell flex flex-col gap-8 py-10 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-4">
            <div>
              <OnboardIQLogo compact subtitle="" />
              <div className="mt-2 pl-[3.75rem] text-sm text-gray-400">Built for Airia AI Hackathon 2026</div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400">
            <a href="#footer" className="transition hover:text-white">
              GitHub
            </a>
            <a href="#footer" className="transition hover:text-white">
              Airia Community
            </a>
            <a href="#footer" className="transition hover:text-white">
              Devpost Submission
            </a>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-400">
            <span>Built by Rahul Singh</span>
            <Heart className="h-4 w-4 text-rose-400" />
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
