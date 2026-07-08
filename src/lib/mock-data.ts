// Realistic mock data for the Clothing Brand Management System.
// This module is the seam where future Antigravity API calls will be wired in.

export type OrderStatus =
  | "pending"
  | "processing"
  | "packed"
  | "shipped"
  | "delivered"
  | "returned"
  | "cancelled";

export interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  brand: string;
  price: number;
  cost: number;
  discount: number;
  stock: number;
  minStock: number;
  status: "active" | "draft" | "archived";
  sizes: string[];
  colors: string[];
  sold: number;
  image: string;
}

export interface Order {
  id: string;
  customer: string;
  email: string;
  total: number;
  items: number;
  status: OrderStatus;
  date: string;
  payment: "paid" | "pending" | "refunded";
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  orders: number;
  spent: number;
  tier: "Bronze" | "Silver" | "Gold" | "Platinum";
  location: string;
  lastOrder: string;
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  role: "Owner" | "Manager" | "Inventory Staff" | "Accountant" | "Marketing Team";
  status: "active" | "on-leave" | "inactive";
  joined: string;
  avatar: string;
}

export interface Supplier {
  id: string;
  name: string;
  contact: string;
  email: string;
  products: number;
  rating: number;
  status: "active" | "paused";
  totalOrders: number;
  outstanding: number;
}

export interface Notification {
  id: string;
  title: string;
  description: string;
  time: string;
  type: "inventory" | "order" | "employee" | "finance";
  priority: "low" | "medium" | "high";
  read: boolean;
}

const cats = ["Outerwear", "Tops", "Bottoms", "Dresses", "Footwear", "Accessories"];
const brandNames = ["Maison Noir", "Atelier 21", "North Field", "Verde Studio"];
const productNames = [
  "Wool Overcoat", "Merino Turtleneck", "Cashmere Scarf", "Silk Slip Dress",
  "Oversized Denim Jacket", "Pleated Trousers", "Ribbed Knit Sweater", "Leather Loafers",
  "Linen Shirt", "Tailored Blazer", "Cotton Tee", "High-Rise Jeans",
  "Suede Chelsea Boots", "Cropped Cardigan", "Wide-Leg Pants", "Puffer Jacket",
  "Silk Blouse", "A-Line Midi Skirt", "Bomber Jacket", "Cable Knit Pullover",
  "Tortoise Sunglasses", "Structured Tote", "Belted Trench", "Corduroy Overshirt",
];

const rand = (seed: number) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

export const products: Product[] = productNames.map((name, i) => ({
  id: `PRD-${(1000 + i).toString()}`,
  name,
  sku: `SKU-${(2400 + i).toString().padStart(5, "0")}`,
  category: cats[i % cats.length],
  brand: brandNames[i % brandNames.length],
  price: Math.round(80 + rand(i + 1) * 420),
  cost: Math.round(30 + rand(i + 2) * 180),
  discount: [0, 0, 10, 15, 20, 0][i % 6],
  stock: Math.round(rand(i + 3) * 240),
  minStock: 20,
  status: (["active", "active", "active", "draft", "archived"] as const)[i % 5],
  sizes: ["XS", "S", "M", "L", "XL"].slice(0, 3 + (i % 3)),
  colors: ["Onyx", "Ivory", "Camel", "Forest", "Ink"].slice(0, 2 + (i % 3)),
  sold: Math.round(rand(i + 4) * 800),
  image: `https://images.unsplash.com/photo-15${(60000000 + i * 137).toString().slice(0, 8)}?w=200&h=200&fit=crop`,
}));

const firstNames = ["Amara", "Jonas", "Priya", "Elena", "Kwame", "Yuki", "Sofia", "Marcus", "Ines", "Rafael", "Zara", "Theo", "Nadia", "Oskar", "Leila", "Dmitri"];
const lastNames = ["Okafor", "Lindqvist", "Kapoor", "Rossi", "Mensah", "Tanaka", "Vega", "Chen", "Silva", "Moreau", "Aziz", "Bauer", "Haddad", "Nowak", "Rahimi", "Volkov"];

export const customers: Customer[] = Array.from({ length: 32 }, (_, i) => {
  const name = `${firstNames[i % firstNames.length]} ${lastNames[(i + 3) % lastNames.length]}`;
  const orders = Math.round(1 + rand(i + 10) * 24);
  const spent = Math.round(orders * (120 + rand(i + 11) * 380));
  return {
    id: `CUS-${(500 + i).toString()}`,
    name,
    email: `${name.toLowerCase().replace(" ", ".")}@mail.com`,
    orders,
    spent,
    tier: spent > 8000 ? "Platinum" : spent > 4000 ? "Gold" : spent > 1500 ? "Silver" : "Bronze",
    location: ["New York", "London", "Paris", "Tokyo", "Berlin", "Milan", "Copenhagen"][i % 7],
    lastOrder: new Date(Date.now() - i * 86400000 * 2).toISOString().slice(0, 10),
  };
});

const orderStatuses: OrderStatus[] = ["pending", "processing", "packed", "shipped", "delivered", "returned", "cancelled"];
export const orders: Order[] = Array.from({ length: 48 }, (_, i) => ({
  id: `#ORD-${(10240 + i).toString()}`,
  customer: customers[i % customers.length].name,
  email: customers[i % customers.length].email,
  total: Math.round(80 + rand(i + 20) * 640),
  items: 1 + Math.round(rand(i + 21) * 5),
  status: orderStatuses[i % orderStatuses.length],
  date: new Date(Date.now() - i * 86400000 * 0.7).toISOString().slice(0, 10),
  payment: (["paid", "paid", "paid", "pending", "refunded"] as const)[i % 5],
}));

export const employees: Employee[] = [
  { id: "E-01", name: "Alexandra Reyes", email: "alex@brand.co", role: "Owner", status: "active", joined: "2019-03-14", avatar: "AR" },
  { id: "E-02", name: "Daniel Osei", email: "daniel@brand.co", role: "Manager", status: "active", joined: "2020-07-02", avatar: "DO" },
  { id: "E-03", name: "Mika Larsen", email: "mika@brand.co", role: "Inventory Staff", status: "active", joined: "2021-11-19", avatar: "ML" },
  { id: "E-04", name: "Priya Shah", email: "priya@brand.co", role: "Accountant", status: "active", joined: "2022-02-08", avatar: "PS" },
  { id: "E-05", name: "Julien Marchand", email: "julien@brand.co", role: "Marketing Team", status: "on-leave", joined: "2022-09-30", avatar: "JM" },
  { id: "E-06", name: "Hana Ito", email: "hana@brand.co", role: "Inventory Staff", status: "active", joined: "2023-05-12", avatar: "HI" },
  { id: "E-07", name: "Omar Farouk", email: "omar@brand.co", role: "Marketing Team", status: "active", joined: "2023-08-21", avatar: "OF" },
  { id: "E-08", name: "Clara Bianchi", email: "clara@brand.co", role: "Manager", status: "inactive", joined: "2021-01-05", avatar: "CB" },
];

export const suppliers: Supplier[] = [
  { id: "SUP-01", name: "Milano Textiles Co.", contact: "Francesca Conti", email: "sales@milanotex.it", products: 42, rating: 4.8, status: "active", totalOrders: 218, outstanding: 12400 },
  { id: "SUP-02", name: "Kyoto Silk House", contact: "Ren Nakamura", email: "hello@kyotosilk.jp", products: 18, rating: 4.9, status: "active", totalOrders: 96, outstanding: 3200 },
  { id: "SUP-03", name: "Porto Leather Works", contact: "Miguel Ferreira", email: "orders@portolw.pt", products: 27, rating: 4.6, status: "active", totalOrders: 154, outstanding: 8750 },
  { id: "SUP-04", name: "Copenhagen Knits", contact: "Sigrid Holm", email: "sigrid@cphknits.dk", products: 33, rating: 4.7, status: "active", totalOrders: 172, outstanding: 0 },
  { id: "SUP-05", name: "Mumbai Cotton Mills", contact: "Arjun Desai", email: "arjun@mumbaicotton.in", products: 51, rating: 4.4, status: "paused", totalOrders: 289, outstanding: 21300 },
  { id: "SUP-06", name: "Lisbon Denim Studio", contact: "Beatriz Alves", email: "beatriz@lxdenim.pt", products: 15, rating: 4.5, status: "active", totalOrders: 74, outstanding: 4900 },
];

export const notifications: Notification[] = [
  { id: "n1", title: "Low stock: Wool Overcoat", description: "Only 8 units left. Restock recommended.", time: "2 min ago", type: "inventory", priority: "high", read: false },
  { id: "n2", title: "New order #ORD-10287", description: "Elena Rossi placed a $412 order.", time: "18 min ago", type: "order", priority: "medium", read: false },
  { id: "n3", title: "Payment received", description: "Milano Textiles invoice #INV-0921 paid.", time: "1 hr ago", type: "finance", priority: "low", read: false },
  { id: "n4", title: "Employee attendance", description: "Julien Marchand marked on leave.", time: "3 hr ago", type: "employee", priority: "low", read: true },
  { id: "n5", title: "Return request", description: "#ORD-10241 requested a return.", time: "5 hr ago", type: "order", priority: "medium", read: true },
  { id: "n6", title: "Slow-moving stock", description: "12 SKUs haven't sold in 60+ days.", time: "yesterday", type: "inventory", priority: "medium", read: true },
];

export const revenueTrend = [
  { month: "Jan", revenue: 42100, expenses: 28400, orders: 312 },
  { month: "Feb", revenue: 48200, expenses: 30100, orders: 348 },
  { month: "Mar", revenue: 51800, expenses: 31900, orders: 372 },
  { month: "Apr", revenue: 58400, expenses: 34200, orders: 401 },
  { month: "May", revenue: 61200, expenses: 35800, orders: 428 },
  { month: "Jun", revenue: 67300, expenses: 37600, orders: 462 },
  { month: "Jul", revenue: 71900, expenses: 39400, orders: 488 },
  { month: "Aug", revenue: 78200, expenses: 41200, orders: 512 },
  { month: "Sep", revenue: 74600, expenses: 40100, orders: 496 },
  { month: "Oct", revenue: 82400, expenses: 43600, orders: 538 },
  { month: "Nov", revenue: 91800, expenses: 47200, orders: 601 },
  { month: "Dec", revenue: 104300, expenses: 51400, orders: 672 },
];

export const categoryRevenue = cats.map((c, i) => ({
  category: c,
  revenue: Math.round(28000 + rand(i + 30) * 62000),
}));

export const kpis = {
  totalRevenue: 832400,
  monthlyRevenue: 104300,
  totalOrders: 5810,
  totalCustomers: customers.length * 47,
  totalProducts: products.length,
  lowStock: products.filter((p) => p.stock < 40).length,
  pendingOrders: orders.filter((o) => o.status === "pending").length,
  totalEmployees: employees.length,
};

export const aiInsights = [
  { title: "Restock best-sellers", description: "Wool Overcoat & Cashmere Scarf are 90% likely to sell out in 11 days.", impact: "High", tag: "Inventory" },
  { title: "Reduce slow-movers", description: "12 SKUs have <5% sell-through in 60 days. Consider markdown of 20-30%.", impact: "Medium", tag: "Merchandising" },
  { title: "Revenue forecast", description: "Q1 revenue projected +18% YoY based on current trend and seasonality.", impact: "High", tag: "Finance" },
  { title: "Customer segment", description: "Platinum tier grew 24% — consider a private-sale campaign.", impact: "Medium", tag: "Marketing" },
];
