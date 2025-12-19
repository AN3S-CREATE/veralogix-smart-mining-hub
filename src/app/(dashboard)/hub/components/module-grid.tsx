import { ModuleTile, ModuleTileProps } from "./module-tile";
import { GitCommit, ScanLine, Car, ShieldCheck, Cog, Wind, Users, BarChart3, Factory, Network, Layers, ShieldAlert } from "lucide-react";

const modules: ModuleTileProps[] = [
  {
    title: "Smart Operations",
    description: "Plant performance & maintenance monitoring.",
    status: "OK",
    kpis: [
      { label: "Plant Throughput", value: "850 t/h" },
      { label: "Recovery / Yield", value: "91.3%" },
      { label: "AI Risk Score", value: "58/100", isAI: true },
    ],
    link: "/plant",
    icon: Factory,
  },
  {
    title: "Smart Transport",
    description: "Vehicle loading, tracking, and quality control.",
    status: "Warning",
    kpis: [
      { label: "Avg Payload/Rated", value: "98.2%" },
      { label: "Uplift vs Plan (ZAR)", value: "R85k", isAI: true },
      { label: "Total Idle Hours", value: "112 h" },
    ],
    link: "/fleet",
    icon: Car,
  },
  {
    title: "Smart Risk",
    description: "Automated risk, hazards, and emergency response.",
    status: "OK",
    kpis: [
      { label: "Near-Miss Events (7d)", value: "18" },
      { label: "AI Hotspot Risk", value: "72/100", isAI: true },
      { label: "CPS Interventions", value: "4" },
    ],
    link: "/safety",
    icon: ShieldAlert,
  },
  {
    title: "Smart People",
    description: "Compliance, training, and operator performance.",
    status: "OK",
    kpis: [
      { label: "Compliance %", value: "98.7%" },
      { label: "Blocked entries (MTD)", value: "42" },
      { label: "DMRE Audit Readiness", value: "95%", isAI: true },
    ],
    link: "/compliance",
    icon: Users,
  },
  {
    title: "Smart Management",
    description: "Automated reporting for the executive layer.",
    status: "OK",
    kpis: [
      { label: "Cost per Tonne", value: "R385.10" },
      { label: "Tonnes Moved (MTD)", value: "188k" },
      { label: "Haulage Uplift", value: "+8.1%" },
    ],
    link: "/executive",
    icon: BarChart3,
  },
  {
    title: "Smart Geotech",
    description: "High-precision grade control and site management.",
    status: "OK",
    kpis: [
      { label: "Haul roads in spec", value: "92%" },
      { label: "Rework hours (WTD)", value: "28.5" },
      { label: "AI Road Risk Index", value: "42/100", isAI: true },
    ],
    link: "/earthworks",
    icon: GitCommit,
  },
    {
    title: "Smart Survey",
    description: "Aerial surveys, stockpile measurement, and security.",
    status: "Critical",
    kpis: [
      { label: "Missions flown (WTD)", value: "12/20" },
      { label: "Stockpile Variance", value: "-1.5%", isAI: true },
      { label: "Perimeter coverage", value: "78%" },
    ],
    link: "/drones",
    icon: Wind,
  },
  {
    title: "Smart Control",
    description: "Real-time fleet and process optimization.",
    status: "OK",
    kpis: [
      { label: "Avg Cycle Time", value: "34.2 min" },
      { label: "Avg Queue Time", value: "4.8 min" },
      { label: "AI Anomalies", value: "3", isAI: true },
    ],
    link: "/supervisor",
    icon: Cog,
  },
  {
    title: "Smart Network",
    description: "Monitor and manage Bioniq network infrastructure.",
    status: "OK",
    kpis: [
      { label: "Network Health", value: "Online" },
      { label: "Data Throughput", value: "98%" },
      { label: "Connected Devices", value: "215" },
    ],
    link: "/network",
    icon: Network,
  },
  {
    title: "Smart Scenarios",
    description: "Digital twin for simulating operational changes.",
    status: "OK",
    kpis: [
        { label: "Active Scenarios", value: "3" },
        { label: "Est. Tonnes Uplift", value: "+4%", isAI: true },
        { label: "Cost Reduction", value: "-2.5%", isAI: true },
    ],
    link: "/twin",
    icon: Layers,
  },
  {
    title: "Smart Access",
    description: "SentryMine™ access control and compliance.",
    status: "OK",
    kpis: [
      { label: "% entries compliant", value: "98.7%" },
      { label: "Blocked entries (MTD)", value: "42" },
      { label: "DMRE audit readiness", value: "95%", isAI: true },
    ],
    link: "/compliance",
    icon: ShieldCheck,
  },
   {
    title: "Smart Loadout",
    description: "Accurate load volume scanning for haul trucks.",
    status: "Warning",
    kpis: [
      { label: "Overloads this shift", value: "8" },
      { label: "Uplift vs Plan (ZAR)", value: "R85k", isAI: true },
      { label: "Carryback tonnes", value: "1.2t" },
    ],
    link: "/fleet",
    icon: ScanLine,
  },
];

export function ModuleGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {modules.map((module) => (
        <ModuleTile key={module.title} {...module} />
      ))}
    </div>
  );
}
