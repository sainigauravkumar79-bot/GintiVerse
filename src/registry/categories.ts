import type { CategoryMeta } from "./types";

export const categories: CategoryMeta[] = [
  {
    id: "calculators",
    name: "Calculators",
    path: "/calculators",
    description: "Percentages, ratios, averages and everyday math, solved instantly.",
  },
  {
    id: "finance",
    name: "Finance",
    path: "/finance",
    description: "Loans, interest, tips and bills — know the number before you commit.",
  },
  {
    id: "date-time",
    name: "Date & Time",
    path: "/date-time",
    description: "Ages, countdowns and the days between any two dates.",
  },
  {
    id: "converters",
    name: "Converters",
    path: "/converters",
    description: "Length, weight, temperature and more, converted both ways.",
  },
  {
    id: "health",
    name: "Health",
    path: "/health",
    description: "Informational estimates like BMI and calories — never medical advice.",
  },
  {
    id: "developer-tools",
    name: "Developer Tools",
    path: "/developer-tools",
    description: "Encoders, formatters and generators for everyday dev work.",
  },
  {
    id: "generators",
    name: "Generators",
    path: "/generators",
    description: "Passwords, QR codes and random picks, generated on the spot.",
  },
];

export const getCategory = (id: string) => categories.find((c) => c.id === id);
