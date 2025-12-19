
import {
  GitCommit,
  Car,
  ShieldAlert,
  Users,
  BarChart3,
  Wind,
  Cog,
  Network,
  Layers,
  Factory,
  ShieldCheck,
  ScanLine,
  Zap,
  Leaf,
  BrainCircuit,
  Truck,
  type LucideIcon,
  Container,
  Mountain,
  Package,
} from "lucide-react";
import type { StatusPillStatus } from "@/components/shared/status-pill";
import { PeopleComplianceWidget } from "@/app/(dashboard)/hub/components/widgets/people-compliance-widget";
import { SmartRiskWidget } from "@/app/(dashboard)/hub/components/widgets/smart-risk-widget";
import { FleetWidget } from "@/app/(dashboard)/hub/components/widgets/fleet-widget";
import { TransportWidget } from "@/app/(dashboard)/hub/components/widgets/transport-widget";
import { SmartManagementWidget } from "@/app/(dashboard)/hub/components/widgets/smart-management-widget";
import { EnergyWidget } from "@/app/(dashboard)/hub/components/widgets/energy-widget";
import { EnvironmentalWidget } from "@/app/(dashboard)/hub/components/widgets/environmental-widget";
import { PredictiveWidget } from "@/app/(dashboard)/hub/components/widgets/predictive-widget";
import { SupplyChainWidget } from "@/app/(dashboard)/hub/components/widgets/supply-chain-widget";
import { BlastingWidget } from "@/app/(dashboard)/hub/components/widgets/blasting-widget";
import { DrillWidget } from "@/app/(dashboard)/hub/components/widgets/drill-widget";
import { StockpileWidget } from "@/app/(dashboard)/hub/components/widgets/stockpile-widget";
import { LoadPassportWidget } from "@/app/(dashboard)/hub/components/widgets/load-passport-widget";

export type UserRole = "Operator" | "Supervisor" | "Executive" | "Admin";

export interface ServiceDefinition {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  status: StatusPillStatus;
  kpis: { label: string; value: string; isAI?: boolean }[];
  enabled: boolean;
  rolesAllowed: UserRole[];
  widget?: React.ComponentType;
}

export const serviceCatalog: ServiceDefinition[] = [
  {
    id: "smart-operations",
    title: "Smart Operations",
    description: "Plant performance & maintenance monitoring.",
    icon: Factory,
    href: "/plant",
    status: "OK",
    kpis: [
      { label: "Plant Throughput", value: "850 t/h" },
      { label: "Recovery / Yield", value: "91.3%" },
      { label: "AI Risk Score", value: "58/100", isAI: true },
    ],
    enabled: true,
    rolesAllowed: ["Admin", "Supervisor", "Executive"],
    widget: DrillWidget,
  },
  {
    id: "blasting",
    title: "Blasting Optimization",
    description: "Vibration monitoring and blast records.",
    icon: Mountain,
    href: "/plant",
    status: "OK",
    kpis: [],
    enabled: true,
    rolesAllowed: ["Admin", "Supervisor"],
    widget: BlastingWidget,
  },
  {
    id: "stockpiles",
    title: "Stockpile Management",
    description: "Survey volumes and quality segregation.",
    icon: Container,
    href: "/plant",
    status: "OK",
    kpis: [],
    enabled: true,
    rolesAllowed: ["Admin", "Supervisor"],
    widget: StockpileWidget,
  },
  {
    id: "smart-transport",
    title: "Smart Transport",
    description: "Vehicle loading, tracking, and quality control.",
    icon: Car,
    href: "/fleet",
    status: "Warning",
    kpis: [
      { label: "Avg Payload/Rated", value: "98.2%" },
      { label: "Uplift vs Plan (ZAR)", value: "R85k", isAI: true },
      { label: "Total Idle Hours", value: "112 h" },
    ],
    enabled: true,
    rolesAllowed: ["Admin", "Supervisor", "Operator"],
    widget: TransportWidget,
  },
   {
    id: "load-passports",
    title: "Load Passports",
    description: "Lifecycle tracking for every haulage load.",
    icon: Package,
    href: "/load-passports",
    status: "OK",
    kpis: [
      { label: "Loads Today", value: "152" },
      { label: "Active Exceptions", value: "1" },
    ],
    enabled: true,
    rolesAllowed: ["Admin", "Supervisor"],
    widget: LoadPassportWidget,
  },
  {
    id: "smart-risk",
    title: "Smart Risk",
    description: "Automated risk, hazards, and emergency response.",
    icon: ShieldAlert,
    href: "/safety",
    status: "OK",
    kpis: [
      { label: "Near-Miss Events (7d)", value: "18" },
      { label: "AI Hotspot Risk", value: "72/100", isAI: true },
      { label: "CPS Interventions", value: "4" },
    ],
    enabled: true,
    rolesAllowed: ["Admin", "Supervisor", "Executive"],
    widget: SmartRiskWidget,
  },
  {
    id: "smart-people",
    title: "Smart People",
    description: "Compliance, training, and operator performance.",
    icon: Users,
    href: "/compliance",
    status: "OK",
    kpis: [
      { label: "Compliance %", value: "98.7%" },
      { label: "Blocked entries (MTD)", value: "42" },
      { label: "DMRE Audit Readiness", value: "95%", isAI: true },
    ],
    enabled: true,
    rolesAllowed: ["Admin", "Supervisor", "Executive", "Operator"],
    widget: PeopleComplianceWidget,
  },
  {
    id: "smart-management",
    title: "Smart Management",
    description: "Automated reporting for the executive layer.",
    icon: BarChart3,
    href: "/executive",
    status: "OK",
    kpis: [
      { label: "Cost per Tonne", value: "R385.10" },
      { label: "Tonnes Moved (MTD)", value: "188k" },
      { label: "Haulage Uplift", value: "+8.1%" },
    ],
    enabled: true,
    rolesAllowed: ["Admin", "Executive"],
    widget: SmartManagementWidget,
  },
  {
    id: "smart-geotech",
    title: "Smart Geotech",
    description: "High-precision grade control and site management.",
    icon: GitCommit,
    href: "/earthworks",
    status: "OK",
    kpis: [
      { label: "Haul roads in spec", value: "92%" },
      { label: "Rework hours (WTD)", value: "28.5" },
      { label: "AI Road Risk Index", value: "42/100", isAI: true },
    ],
    enabled: true,
    rolesAllowed: ["Admin", "Supervisor"],
    widget: BlastingWidget, // Example
  },
  {
    id: "smart-survey",
    title: "Smart Survey",
    description: "Aerial surveys, stockpile measurement, and security.",
    icon: Wind,
    href: "/drones",
    status: "Critical",
    kpis: [
      { label: "Missions flown (WTD)", value: "12/20" },
      { label: "Stockpile Variance", value: "-1.5%", isAI: true },
      { label: "Perimeter coverage", value: "78%" },
    ],
    enabled: true,
    rolesAllowed: ["Admin", "Supervisor"],
    widget: StockpileWidget,
  },
  {
    id: "smart-control",
    title: "Smart Control",
    description: "Real-time fleet and process optimization.",
    icon: Cog,
    href: "/supervisor",
    status: "OK",
    kpis: [
      { label: "Avg Cycle Time", value: "34.2 min" },
      { label: "Avg Queue Time", value: "4.8 min" },
      { label: "AI Anomalies", value: "3", isAI: true },
    ],
    enabled: true,
    rolesAllowed: ["Admin", "Supervisor"],
    widget: FleetWidget,
  },
  {
    id: "smart-network",
    title: "Smart Network",
    description: "Monitor and manage network infrastructure.",
    icon: Network,
    href: "/network",
    status: "OK",
    kpis: [
      { label: "Network Health", value: "Online" },
      { label: "Data Throughput", value: "98%" },
      { label: "Connected Devices", value: "215" },
    ],
    enabled: true,
    rolesAllowed: ["Admin"],
  },
  {
    id: "smart-scenarios",
    title: "Smart Scenarios",
    description: "Digital twin for simulating operational changes.",
    icon: Layers,
    href: "/twin",
    status: "OK",
    kpis: [
      { label: "Active Scenarios", value: "3" },
      { label: "Est. Tonnes Uplift", value: "+4%", isAI: true },
      { label: "Cost Reduction", value: "-2.5%", isAI: true },
    ],
    enabled: true,
    rolesAllowed: ["Admin", "Executive"],
  },
  {
    id: "smart-access",
    title: "Smart Access",
    description: "Access control and compliance.",
    icon: ShieldCheck,
    href: "/compliance",
    status: "OK",
    kpis: [
      { label: "% entries compliant", value: "98.7%" },
      { label: "Blocked entries (MTD)", value: "42" },
      { label: "DMRE audit readiness", value: "95%", isAI: true },
    ],
    enabled: true,
    rolesAllowed: ["Admin", "Supervisor"],
    widget: PeopleComplianceWidget,
  },
  {
    id: "smart-loadout",
    title: "Smart Loadout",
    description: "Accurate load volume scanning for haul trucks.",
    icon: ScanLine,
    href: "/fleet", // Points to fleet for now
    status: "Warning",
    kpis: [
      { label: "Overloads this shift", value: "8" },
      { label: "Uplift vs Plan (ZAR)", value: "R85k", isAI: true },
      { label: "Carryback tonnes", value: "1.2t" },
    ],
    enabled: true,
    rolesAllowed: ["Admin", "Supervisor", "Operator"],
    widget: TransportWidget,
  },
  {
    id: "smart-energy",
    title: "Smart Energy Management",
    description: "Optimize energy consumption across the site.",
    icon: Zap,
    href: "/energy",
    status: "OK",
    kpis: [
      { label: "Energy Cost (24h)", value: "R1.2M" },
      { label: "AI Savings", value: "4.1%", isAI: true },
      { label: "Grid Stability", value: "99.8%" },
    ],
    enabled: true,
    rolesAllowed: ["Admin", "Executive", "Supervisor"],
    widget: EnergyWidget,
  },
  {
    id: "smart-environmental",
    title: "Smart Environmental Compliance",
    description: "Track emissions, water, and dust compliance.",
    icon: Leaf,
    href: "/environmental",
    status: "OK",
    kpis: [
      { label: "Dust Levels", value: "Normal" },
      { label: "Water Quality", value: "Compliant" },
      { label: "CO2 Index", value: "98.5" },
    ],
    enabled: true,
    rolesAllowed: ["Admin", "Executive"],
    widget: EnvironmentalWidget,
  },
  {
    id: "smart-predictive",
    title: "Smart Predictive Analytics",
    description: "AI-driven forecasts and predictive models.",
    icon: BrainCircuit,
    href: "/predictive",
    status: "OK",
    kpis: [
      { label: "Failure Prediction Acc.", value: "92%", isAI: true },
      { label: "Production Forecast", value: "+2.5%", isAI: true },
      { label: "Safety Risk", value: "Low", isAI: true },
    ],
    enabled: true,
    rolesAllowed: ["Admin", "Executive", "Supervisor"],
    widget: PredictiveWidget,
  },
  {
    id: "smart-supply-chain",
    title: "Smart Supply Chain & Inventory",
    description: "Manage inventory, logistics, and supply chain.",
    icon: Truck,
    href: "/supply-chain",
    status: "OK",
    kpis: [
      { label: "Inventory Levels", value: "Optimal" },
      { label: "Delivery ETA", value: "On Time" },
      { label: "Stockout Risk", value: "Low", isAI: true },
    ],
    enabled: true,
    rolesAllowed: ["Admin", "Supervisor"],
    widget: SupplyChainWidget,
  },
];
