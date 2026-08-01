import {
  Percent, Calendar, Ruler, Landmark, HeartPulse, Code2, Sparkles,
  Calculator, Clock, Cake, Scale, Thermometer, Wallet, Receipt,
  KeyRound, QrCode, Hash, FileJson, Type, Divide, TrendingUp,
  type LucideProps,
} from "lucide-react";
import type { ComponentType } from "react";

const registry: Record<string, ComponentType<LucideProps>> = {
  percent: Percent,
  calendar: Calendar,
  ruler: Ruler,
  landmark: Landmark,
  "heart-pulse": HeartPulse,
  code: Code2,
  sparkles: Sparkles,
  calculator: Calculator,
  clock: Clock,
  cake: Cake,
  scale: Scale,
  thermometer: Thermometer,
  wallet: Wallet,
  receipt: Receipt,
  key: KeyRound,
  qrcode: QrCode,
  hash: Hash,
  json: FileJson,
  type: Type,
  divide: Divide,
  trending: TrendingUp,
};

export function IconRenderer({ name, ...props }: { name: string } & LucideProps) {
  const Icon = registry[name] ?? Calculator;
  return <Icon {...props} />;
}
