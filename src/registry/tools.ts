import type { ToolMeta } from "./types";
import PercentageCalculator from "@/tools/calculators/PercentageCalculator";
import AgeCalculator from "@/tools/dateTime/AgeCalculator";
import DateDifference from "@/tools/dateTime/DateDifference";
import BMICalculator from "@/tools/health/BMICalculator";
import EMICalculator from "@/tools/finance/EMICalculator";
import DiscountCalculator from "@/tools/finance/DiscountCalculator";
import TipCalculator from "@/tools/finance/TipCalculator";
import LengthConverter from "@/tools/converters/LengthConverter";
import PasswordGenerator from "@/tools/generators/PasswordGenerator";
import WordCounter from "@/tools/generators/WordCounter";

/**
 * THE TOOL REGISTRY
 * ------------------
 * Every tool the site knows about is one entry here. Nothing else needs to
 * change to add a tool: the homepage, category pages, /tools, the sitemap,
 * the smart search, and the tool page itself all read from this array.
 *
 * To add tool #11:
 *   1. Build the calculator component under src/tools/<category>/.
 *   2. Add one ToolMeta entry below.
 *   That's it — it appears everywhere automatically.
 */
export const tools: ToolMeta[] = [
  {
    id: "percentage",
    slug: "/calculators/percentage",
    name: "Percentage Calculator",
    category: "calculators",
    description: "Find what X% of a number is, instantly.",
    longDescription:
      "Work out any percentage of any number. Enter the percentage and the value, and see the result along with the exact calculation steps.",
    keywords: ["percentage", "percent", "%", "of", "discount percent"],
    relatedTools: ["discount", "tip"],
    icon: "percent",
    component: PercentageCalculator,
    examples: [
      { input: "15% of 750", output: "112.5" },
      { input: "18% of 850", output: "153" },
    ],
    faq: [
      {
        question: "How do I calculate a percentage of a number?",
        answer: "Divide the percentage by 100, then multiply by the number. For 15% of 750: (15 ÷ 100) × 750 = 112.5.",
      },
    ],
  },
  {
    id: "age",
    slug: "/date-time/age",
    name: "Age Calculator",
    category: "date-time",
    description: "Get an exact age in years, months and days from a birth date.",
    longDescription: "Enter a date of birth to see the exact age today, broken down into years, months and days, plus the total number of days lived.",
    keywords: ["age", "how old", "birthday", "years old"],
    relatedTools: ["date-difference"],
    icon: "cake",
    component: AgeCalculator,
    examples: [{ input: "Born 12 March 2005", output: "21 years, 4 months, 20 days" }],
  },
  {
    id: "date-difference",
    slug: "/date-time/days-between",
    name: "Days Between Dates",
    category: "date-time",
    description: "Count the exact number of days between any two dates.",
    longDescription: "Pick a start and end date to see the number of days, weeks and approximate months between them.",
    keywords: ["days between", "date difference", "how many days until", "countdown"],
    relatedTools: ["age"],
    icon: "calendar",
    component: DateDifference,
    examples: [{ input: "1 Jan 2026 to 1 Aug 2026", output: "212 days" }],
  },
  {
    id: "bmi",
    slug: "/health/bmi",
    name: "BMI Calculator",
    category: "health",
    description: "Estimate Body Mass Index from height and weight.",
    longDescription: "Calculate an estimated Body Mass Index (BMI) using height and weight. This is a general population screening estimate, not a diagnosis.",
    keywords: ["bmi", "body mass index", "weight", "height"],
    relatedTools: ["percentage"],
    icon: "heart-pulse",
    component: BMICalculator,
    isHealthTool: true,
    faq: [
      {
        question: "Is BMI an accurate health measure?",
        answer: "BMI is a general screening estimate and doesn't account for muscle mass, body composition or individual health factors. Talk to a clinician for a full picture.",
      },
    ],
  },
  {
    id: "emi",
    slug: "/finance/emi",
    name: "EMI Calculator",
    category: "finance",
    description: "Work out the monthly payment on a loan.",
    longDescription: "Calculate the equal monthly installment (EMI) for a loan given the principal, annual interest rate and tenure in years, plus total interest paid.",
    keywords: ["emi", "loan calculator", "monthly payment", "installment", "mortgage"],
    relatedTools: ["discount"],
    icon: "landmark",
    component: EMICalculator,
    examples: [{ input: "500,000 at 8.5% for 5 years", output: "≈ 10,258 per month" }],
  },
  {
    id: "discount",
    slug: "/finance/discount",
    name: "Discount Calculator",
    category: "finance",
    description: "See the final price and savings after a percentage discount.",
    longDescription: "Enter an original price and a discount percentage to see exactly what you'll pay and how much you save.",
    keywords: ["discount", "sale price", "percent off", "savings"],
    relatedTools: ["percentage", "tip"],
    icon: "receipt",
    component: DiscountCalculator,
  },
  {
    id: "tip",
    slug: "/finance/tip",
    name: "Tip Calculator",
    category: "finance",
    description: "Work out a tip and split the bill between any number of people.",
    longDescription: "Calculate a tip on a bill and split the total evenly between however many people are paying.",
    keywords: ["tip calculator", "split bill", "gratuity"],
    relatedTools: ["discount"],
    icon: "wallet",
    component: TipCalculator,
  },
  {
    id: "length-converter",
    slug: "/converters/length",
    name: "Length Converter",
    category: "converters",
    description: "Convert between meters, feet, inches, miles and more.",
    longDescription: "Convert any length or distance between metric and imperial units — millimeters up to miles.",
    keywords: ["length", "convert", "feet to cm", "inches to cm", "meters to feet", "distance"],
    relatedTools: ["percentage"],
    icon: "ruler",
    component: LengthConverter,
    examples: [{ input: "5 feet to cm", output: "152.4 cm" }],
  },
  {
    id: "password-generator",
    slug: "/generators/password",
    name: "Password Generator",
    category: "generators",
    description: "Generate a strong, random password with custom character rules.",
    longDescription: "Create a cryptographically random password of any length, choosing which character types to include. Nothing is sent to a server.",
    keywords: ["password generator", "random password", "strong password"],
    relatedTools: ["word-counter"],
    icon: "key",
    component: PasswordGenerator,
  },
  {
    id: "word-counter",
    slug: "/developer-tools/word-counter",
    name: "Word Counter",
    category: "developer-tools",
    description: "Count words, characters and sentences in any text.",
    longDescription: "Paste text to instantly see word count, character count (with and without spaces) and sentence count.",
    keywords: ["word counter", "character counter", "text length"],
    relatedTools: ["password-generator"],
    icon: "type",
    component: WordCounter,
  },
];

export const getToolBySlug = (slug: string) => tools.find((t) => t.slug === slug);
export const getToolById = (id: string) => tools.find((t) => t.id === id);
export const getToolsByCategory = (category: string) => tools.filter((t) => t.category === category);
