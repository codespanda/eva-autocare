export type Status =
  | "Confirmed"
  | "Pending"
  | "In Progress"
  | "Completed"
  | "Cancelled"
  | "On Hold";

export type Priority = "Low" | "Medium" | "High";

export interface Person {
  name: string;
  phone: string;
  email: string;
  avatarSeed: string;
}

export interface Vehicle {
  id: string;
  model: string;
  type: string;
  fuel: string;
  year: number;
  plate: string;
  vin: string;
  color: string;
  owner: Person;
  status: "Active" | "In Service" | "Under Maintenance" | "Inactive";
  lastService: string;
  nextService: string;
  odometer: string;
  insurance: string;
  registrationDate: string;
}

export interface Appointment {
  id: string;
  bookingId: string;
  customer: Person;
  vehicleLabel: string;
  vehiclePlate: string;
  vehicleFuel: string;
  service: string;
  serviceTag: string;
  date: string;
  time: string;
  technician: string;
  technicianRole: string;
  status: Status;
  amount: number;
}

export interface ServiceRequest {
  id: string;
  createdOn: string;
  customer: Person;
  vehicleLabel: string;
  vehiclePlate: string;
  vehicleFuel: string;
  service: string;
  serviceTag: string;
  priority: Priority;
  status: Status;
  date: string;
  time: string;
  assignedTo: string | null;
  assignedRole: string;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
  vehicles: number;
  totalBookings: number;
  totalSpent: number;
  status: "Active" | "VIP" | "Inactive";
  lastVisit: string;
  avatarSeed: string;
  address: string;
  avgSpent: number;
  avgRating: number;
  vehicleList: { model: string; plate: string; primary: boolean }[];
  recentActivity: { type: string; label: string; date: string }[];
}

export interface WorkOrder {
  id: string;
  invoiceId: string;
  customer: Person;
  vehicleLabel: string;
  vehiclePlate: string;
  vehicleYear: number;
  vin: string;
  service: string;
  serviceTag: string;
  status: Status;
  priority: Priority;
  technician: string;
  technicianRole: string;
  createdOn: string;
  createdTime: string;
  total: number;
  paymentStatus: "Paid" | "Unpaid" | "Partial";
  nextService: string;
  timeline: { label: string; date: string; done: boolean }[];
}

const AVATARS = [
  "rohit-sharma",
  "priya-mehta",
  "vikram-singh",
  "neha-kapoor",
  "arjun-das",
  "karan-patel",
  "anjali-verma",
  "manish-gupta",
];

function avatarUrl(seed: string) {
  return `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}&backgroundColor=b6e3f4,c0aede,d1d4f9`;
}

export { avatarUrl, AVATARS };

export const customers: Customer[] = [
  {
    id: "CUS-1001",
    name: "Rohit Sharma",
    phone: "+91 98765 43210",
    email: "rohit.sharma@email.com",
    vehicles: 2,
    totalBookings: 12,
    totalSpent: 24560,
    status: "Active",
    lastVisit: "24 May 2025",
    avatarSeed: "rohit-sharma",
    address: "123, Green Park, Sector 45, Gurugram, Haryana - 122003",
    avgSpent: 2046,
    avgRating: 4.8,
    vehicleList: [
      { model: "Honda City", plate: "DL 01 AB 1234", primary: true },
      { model: "Hyundai Creta", plate: "DL 10 CD 4321", primary: false },
    ],
    recentActivity: [
      { type: "Appointment", label: "General Service", date: "24 May 2025" },
      { type: "Service Request", label: "AC not cooling", date: "20 May 2025" },
      { type: "Payment", label: "Paid ₹2,450", date: "20 May 2025" },
    ],
  },
  {
    id: "CUS-1002",
    name: "Priya Mehta",
    phone: "+91 87654 32109",
    email: "priya.mehta@email.com",
    vehicles: 1,
    totalBookings: 8,
    totalSpent: 18750,
    status: "Active",
    lastVisit: "23 May 2025",
    avatarSeed: "priya-mehta",
    address: "45, Sector 21, Noida, Uttar Pradesh - 201301",
    avgSpent: 2343,
    avgRating: 4.6,
    vehicleList: [{ model: "Maruti Swift", plate: "HR 26 BS 5678", primary: true }],
    recentActivity: [
      { type: "Appointment", label: "Brake Inspection", date: "23 May 2025" },
      { type: "Payment", label: "Paid ₹1,850", date: "23 May 2025" },
    ],
  },
  {
    id: "CUS-1003",
    name: "Vikram Singh",
    phone: "+91 76543 21098",
    email: "vikram.singh@email.com",
    vehicles: 2,
    totalBookings: 15,
    totalSpent: 31200,
    status: "VIP",
    lastVisit: "22 May 2025",
    avatarSeed: "vikram-singh",
    address: "78, Model Town, Chandigarh - 160009",
    avgSpent: 2080,
    avgRating: 4.9,
    vehicleList: [
      { model: "Hyundai Creta", plate: "PB 10 CD 4321", primary: true },
      { model: "Mahindra Thar", plate: "PB 65 EF 7890", primary: false },
    ],
    recentActivity: [
      { type: "Appointment", label: "Engine Check", date: "22 May 2025" },
      { type: "Payment", label: "Paid ₹3,200", date: "22 May 2025" },
    ],
  },
  {
    id: "CUS-1004",
    name: "Neha Kapoor",
    phone: "+91 65432 10987",
    email: "neha.kapoor@email.com",
    vehicles: 1,
    totalBookings: 6,
    totalSpent: 12450,
    status: "Active",
    lastVisit: "21 May 2025",
    avatarSeed: "neha-kapoor",
    address: "12, Civil Lines, Jaipur, Rajasthan - 302006",
    avgSpent: 2075,
    avgRating: 4.5,
    vehicleList: [{ model: "Tata Nexon", plate: "CH 01 EF 9876", primary: true }],
    recentActivity: [{ type: "Appointment", label: "AC Service", date: "21 May 2025" }],
  },
  {
    id: "CUS-1005",
    name: "Arjun Das",
    phone: "+91 54321 09876",
    email: "arjun.das@email.com",
    vehicles: 1,
    totalBookings: 4,
    totalSpent: 7850,
    status: "Inactive",
    lastVisit: "18 May 2025",
    avatarSeed: "arjun-das",
    address: "9, Salt Lake, Kolkata, West Bengal - 700091",
    avgSpent: 1962,
    avgRating: 4.3,
    vehicleList: [{ model: "Toyota Innova", plate: "RJ 14 GH 2468", primary: true }],
    recentActivity: [{ type: "Appointment", label: "Wheel Alignment", date: "18 May 2025" }],
  },
  {
    id: "CUS-1006",
    name: "Karan Patel",
    phone: "+91 43210 98765",
    email: "karan.patel@email.com",
    vehicles: 3,
    totalBookings: 20,
    totalSpent: 45600,
    status: "VIP",
    lastVisit: "17 May 2025",
    avatarSeed: "karan-patel",
    address: "56, Satellite, Ahmedabad, Gujarat - 380015",
    avgSpent: 2280,
    avgRating: 4.9,
    vehicleList: [
      { model: "Mahindra XUV300", plate: "UP 16 XY 7890", primary: true },
      { model: "Kia Seltos", plate: "UP 32 GH 1122", primary: false },
    ],
    recentActivity: [{ type: "Appointment", label: "General Service", date: "17 May 2025" }],
  },
  {
    id: "CUS-1007",
    name: "Anjali Verma",
    phone: "+91 32109 87654",
    email: "anjali.verma@email.com",
    vehicles: 1,
    totalBookings: 5,
    totalSpent: 9600,
    status: "Active",
    lastVisit: "16 May 2025",
    avatarSeed: "anjali-verma",
    address: "34, Andheri West, Mumbai, Maharashtra - 400058",
    avgSpent: 1920,
    avgRating: 4.4,
    vehicleList: [{ model: "Skoda Rapid", plate: "MH 12 KL 3456", primary: true }],
    recentActivity: [{ type: "Appointment", label: "Battery Check", date: "16 May 2025" }],
  },
  {
    id: "CUS-1008",
    name: "Manish Gupta",
    phone: "+91 21098 76543",
    email: "manish.gupta@email.com",
    vehicles: 2,
    totalBookings: 9,
    totalSpent: 16900,
    status: "Inactive",
    lastVisit: "15 May 2025",
    avatarSeed: "manish-gupta",
    address: "67, Rajouri Garden, Delhi - 110027",
    avgSpent: 1878,
    avgRating: 4.2,
    vehicleList: [
      { model: "MG Hector", plate: "DL 10 CA 6789", primary: true },
      { model: "Honda Amaze", plate: "DL 05 QW 3344", primary: false },
    ],
    recentActivity: [{ type: "Appointment", label: "Clutch Repair", date: "15 May 2025" }],
  },
];

export const vehicles: Vehicle[] = [
  {
    id: "VEH-1",
    model: "Honda City",
    type: "Sedan",
    fuel: "Petrol",
    year: 2019,
    plate: "DL 01 AB 1234",
    vin: "MAKGD56A1KP123456",
    color: "White",
    owner: { name: "Rohit Sharma", phone: "+91 98765 43210", email: "rohit.sharma@email.com", avatarSeed: "rohit-sharma" },
    status: "Active",
    lastService: "24 May 2025",
    nextService: "24 Nov 2025",
    odometer: "10,245 km",
    insurance: "Bajaj Allianz · Valid till 10 Dec 2025",
    registrationDate: "15 Jan 2019",
  },
  {
    id: "VEH-2",
    model: "Maruti Swift",
    type: "Hatchback",
    fuel: "Petrol",
    year: 2021,
    plate: "HR 26 BS 5678",
    vin: "MBHBGD6S7M1237890",
    color: "Red",
    owner: { name: "Priya Mehta", phone: "+91 87654 32109", email: "priya.mehta@email.com", avatarSeed: "priya-mehta" },
    status: "Active",
    lastService: "20 May 2025",
    nextService: "20 Nov 2025",
    odometer: "18,560 km",
    insurance: "HDFC Ergo · Valid till 5 Aug 2025",
    registrationDate: "3 Mar 2021",
  },
  {
    id: "VEH-3",
    model: "Hyundai Creta",
    type: "SUV",
    fuel: "Diesel",
    year: 2020,
    plate: "PB 10 CD 4321",
    vin: "MALPA81BLM1234567",
    color: "Grey",
    owner: { name: "Vikram Singh", phone: "+91 76543 21098", email: "vikram.singh@email.com", avatarSeed: "vikram-singh" },
    status: "In Service",
    lastService: "22 May 2025",
    nextService: "22 Nov 2025",
    odometer: "22,310 km",
    insurance: "ICICI Lombard · Valid till 14 Feb 2026",
    registrationDate: "20 Jun 2020",
  },
  {
    id: "VEH-4",
    model: "Tata Nexon",
    type: "SUV",
    fuel: "Petrol",
    year: 2022,
    plate: "CH 01 EF 9876",
    vin: "MAT6283GNN1234567",
    color: "Blue",
    owner: { name: "Neha Kapoor", phone: "+91 65432 10987", email: "neha.kapoor@email.com", avatarSeed: "neha-kapoor" },
    status: "Active",
    lastService: "18 May 2025",
    nextService: "18 Nov 2025",
    odometer: "12,450 km",
    insurance: "Bajaj Allianz · Valid till 1 Jan 2026",
    registrationDate: "9 Sep 2022",
  },
  {
    id: "VEH-5",
    model: "Toyota Innova",
    type: "MPV",
    fuel: "Diesel",
    year: 2018,
    plate: "RJ 14 GH 2468",
    vin: "MBJ11BR9JK1234567",
    color: "White",
    owner: { name: "Arjun Das", phone: "+91 54321 09876", email: "arjun.das@email.com", avatarSeed: "arjun-das" },
    status: "Under Maintenance",
    lastService: "16 May 2025",
    nextService: "16 Nov 2025",
    odometer: "34,120 km",
    insurance: "New India · Valid till 22 Oct 2025",
    registrationDate: "2 Apr 2018",
  },
  {
    id: "VEH-6",
    model: "Mahindra XUV300",
    type: "SUV",
    fuel: "Petrol",
    year: 2021,
    plate: "UP 16 XY 7890",
    vin: "MA1CA2FSNL1234567",
    color: "Blue",
    owner: { name: "Karan Patel", phone: "+91 43210 98765", email: "karan.patel@email.com", avatarSeed: "karan-patel" },
    status: "Inactive",
    lastService: "10 Feb 2025",
    nextService: "-",
    odometer: "8,930 km",
    insurance: "Tata AIG · Valid till 30 May 2025",
    registrationDate: "18 Aug 2021",
  },
  {
    id: "VEH-7",
    model: "Skoda Rapid",
    type: "Sedan",
    fuel: "Petrol",
    year: 2017,
    plate: "MH 12 KL 3456",
    vin: "TMBJP4NEB1234567",
    color: "White",
    owner: { name: "Anjali Verma", phone: "+91 32109 87654", email: "anjali.verma@email.com", avatarSeed: "anjali-verma" },
    status: "Active",
    lastService: "12 May 2025",
    nextService: "12 Nov 2025",
    odometer: "28,560 km",
    insurance: "SBI General · Valid till 11 Jul 2025",
    registrationDate: "5 Dec 2017",
  },
  {
    id: "VEH-8",
    model: "MG Hector",
    type: "SUV",
    fuel: "Petrol",
    year: 2021,
    plate: "DL 10 CA 6789",
    vin: "MEAAC2CA3ML1234567",
    color: "White",
    owner: { name: "Manish Gupta", phone: "+91 21098 76543", email: "manish.gupta@email.com", avatarSeed: "manish-gupta" },
    status: "In Service",
    lastService: "21 May 2025",
    nextService: "21 Nov 2025",
    odometer: "19,875 km",
    insurance: "Bajaj Allianz · Valid till 9 Sep 2025",
    registrationDate: "1 Jan 2021",
  },
];

function person(name: string, phone: string, email: string, avatarSeed: string): Person {
  return { name, phone, email, avatarSeed };
}

export const appointments: Appointment[] = [
  {
    id: "#APT-2456",
    bookingId: "#BK-4587",
    customer: person("Rohit Sharma", "+91 98765 43210", "rohit.sharma@email.com", "rohit-sharma"),
    vehicleLabel: "Honda City",
    vehiclePlate: "DL 01 AB 1234",
    vehicleFuel: "Petrol",
    service: "General Service",
    serviceTag: "Regular Maintenance",
    date: "24 May 2025",
    time: "10:00 AM",
    technician: "Rahul Verma",
    technicianRole: "Senior Technician",
    status: "Confirmed",
    amount: 2450,
  },
  {
    id: "#APT-2455",
    bookingId: "#BK-4586",
    customer: person("Priya Mehta", "+91 87654 32109", "priya.mehta@email.com", "priya-mehta"),
    vehicleLabel: "Maruti Swift",
    vehiclePlate: "HR 26 BS 5678",
    vehicleFuel: "Petrol",
    service: "Brake Inspection",
    serviceTag: "Brake System",
    date: "24 May 2025",
    time: "11:30 AM",
    technician: "Sandeep Kumar",
    technicianRole: "Technician",
    status: "Confirmed",
    amount: 1850,
  },
  {
    id: "#APT-2454",
    bookingId: "#BK-4585",
    customer: person("Vikram Singh", "+91 76543 21098", "vikram.singh@email.com", "vikram-singh"),
    vehicleLabel: "Hyundai Creta",
    vehiclePlate: "PB 10 CD 4321",
    vehicleFuel: "Diesel",
    service: "Engine Check",
    serviceTag: "Engine Service",
    date: "24 May 2025",
    time: "01:00 PM",
    technician: "Mohit Yadav",
    technicianRole: "Technician",
    status: "Pending",
    amount: 3200,
  },
  {
    id: "#APT-2453",
    bookingId: "#BK-4584",
    customer: person("Neha Kapoor", "+91 65432 10987", "neha.kapoor@email.com", "neha-kapoor"),
    vehicleLabel: "Tata Nexon",
    vehiclePlate: "CH 01 EF 9876",
    vehicleFuel: "Petrol",
    service: "AC Service",
    serviceTag: "Cooling System",
    date: "24 May 2025",
    time: "02:30 PM",
    technician: "Amit Singh",
    technicianRole: "Apprentice",
    status: "Confirmed",
    amount: 2150,
  },
  {
    id: "#APT-2452",
    bookingId: "#BK-4583",
    customer: person("Arjun Das", "+91 54321 09876", "arjun.das@email.com", "arjun-das"),
    vehicleLabel: "Mahindra Thar",
    vehiclePlate: "RJ 14 GH 2468",
    vehicleFuel: "Diesel",
    service: "Wheel Alignment",
    serviceTag: "Wheel Service",
    date: "24 May 2025",
    time: "04:00 PM",
    technician: "Rahul Verma",
    technicianRole: "Senior Technician",
    status: "Pending",
    amount: 1400,
  },
  {
    id: "#APT-2451",
    bookingId: "#BK-4582",
    customer: person("Karan Patel", "+91 43210 98765", "karan.patel@email.com", "karan-patel"),
    vehicleLabel: "Kia Seltos",
    vehiclePlate: "UP 16 XY 7890",
    vehicleFuel: "Petrol",
    service: "General Service",
    serviceTag: "Regular Maintenance",
    date: "25 May 2025",
    time: "10:30 AM",
    technician: "Sandeep Kumar",
    technicianRole: "Technician",
    status: "In Progress",
    amount: 2600,
  },
  {
    id: "#APT-2450",
    bookingId: "#BK-4581",
    customer: person("Anjali Verma", "+91 32109 87654", "anjali.verma@email.com", "anjali-verma"),
    vehicleLabel: "Toyota Innova",
    vehiclePlate: "MH 12 KL 3456",
    vehicleFuel: "Diesel",
    service: "Battery Check",
    serviceTag: "Electrical Service",
    date: "25 May 2025",
    time: "11:30 AM",
    technician: "Mohit Yadav",
    technicianRole: "Technician",
    status: "Completed",
    amount: 950,
  },
];

export const serviceRequests: ServiceRequest[] = [
  {
    id: "#SR-2456",
    createdOn: "24 May 2025",
    customer: person("Rohit Sharma", "+91 98765 43210", "rohit.sharma@email.com", "rohit-sharma"),
    vehicleLabel: "Honda City",
    vehiclePlate: "DL 01 AB 1234",
    vehicleFuel: "Petrol",
    service: "General Service",
    serviceTag: "Regular Maintenance",
    priority: "Medium",
    status: "In Progress",
    date: "24 May 2025",
    time: "10:00 AM",
    assignedTo: "Rahul Verma",
    assignedRole: "Senior Technician",
  },
  {
    id: "#SR-2455",
    createdOn: "24 May 2025",
    customer: person("Priya Mehta", "+91 87654 32109", "priya.mehta@email.com", "priya-mehta"),
    vehicleLabel: "Maruti Swift",
    vehiclePlate: "HR 26 BS 5678",
    vehicleFuel: "Petrol",
    service: "Brake Inspection",
    serviceTag: "Brake System",
    priority: "High",
    status: "Pending",
    date: "24 May 2025",
    time: "11:30 AM",
    assignedTo: "Sandeep Kumar",
    assignedRole: "Technician",
  },
  {
    id: "#SR-2454",
    createdOn: "24 May 2025",
    customer: person("Vikram Singh", "+91 76543 21098", "vikram.singh@email.com", "vikram-singh"),
    vehicleLabel: "Hyundai Creta",
    vehiclePlate: "PB 10 CD 4321",
    vehicleFuel: "Diesel",
    service: "Engine Check",
    serviceTag: "Engine Service",
    priority: "High",
    status: "In Progress",
    date: "24 May 2025",
    time: "01:00 PM",
    assignedTo: "Mohit Yadav",
    assignedRole: "Technician",
  },
  {
    id: "#SR-2453",
    createdOn: "24 May 2025",
    customer: person("Neha Kapoor", "+91 65432 10987", "neha.kapoor@email.com", "neha-kapoor"),
    vehicleLabel: "Tata Nexon",
    vehiclePlate: "CH 01 EF 9876",
    vehicleFuel: "Petrol",
    service: "AC Service",
    serviceTag: "Cooling System",
    priority: "Medium",
    status: "Pending",
    date: "24 May 2025",
    time: "02:30 PM",
    assignedTo: "Amit Singh",
    assignedRole: "Apprentice",
  },
  {
    id: "#SR-2452",
    createdOn: "24 May 2025",
    customer: person("Arjun Das", "+91 54321 09876", "arjun.das@email.com", "arjun-das"),
    vehicleLabel: "Mahindra Thar",
    vehiclePlate: "RJ 14 GH 2468",
    vehicleFuel: "Diesel",
    service: "Wheel Alignment",
    serviceTag: "Wheel Service",
    priority: "Low",
    status: "Completed",
    date: "24 May 2025",
    time: "04:00 PM",
    assignedTo: "Rahul Verma",
    assignedRole: "Senior Technician",
  },
  {
    id: "#SR-2451",
    createdOn: "23 May 2025",
    customer: person("Karan Patel", "+91 43210 98765", "karan.patel@email.com", "karan-patel"),
    vehicleLabel: "Kia Seltos",
    vehiclePlate: "UP 16 XY 7890",
    vehicleFuel: "Petrol",
    service: "Battery Check",
    serviceTag: "Electrical System",
    priority: "Low",
    status: "Completed",
    date: "23 May 2025",
    time: "10:30 AM",
    assignedTo: "Sandeep Kumar",
    assignedRole: "Technician",
  },
  {
    id: "#SR-2450",
    createdOn: "23 May 2025",
    customer: person("Anjali Verma", "+91 32109 87654", "anjali.verma@email.com", "anjali-verma"),
    vehicleLabel: "Toyota Innova",
    vehiclePlate: "MH 12 KL 3456",
    vehicleFuel: "Diesel",
    service: "Clutch Repair",
    serviceTag: "Transmission",
    priority: "High",
    status: "Cancelled",
    date: "23 May 2025",
    time: "11:30 AM",
    assignedTo: null,
    assignedRole: "",
  },
];

export const workOrders: WorkOrder[] = [
  {
    id: "#WO-2456",
    invoiceId: "INV-1024",
    customer: person("Rohit Sharma", "+91 98765 43210", "rohit.sharma@email.com", "rohit-sharma"),
    vehicleLabel: "Honda City",
    vehiclePlate: "DL 01 AB 1234",
    vehicleYear: 2019,
    vin: "MAKGD56A1KP123456",
    service: "General Service",
    serviceTag: "Regular Maintenance",
    status: "In Progress",
    priority: "Medium",
    technician: "Rahul Verma",
    technicianRole: "Senior Technician",
    createdOn: "24 May 2025",
    createdTime: "10:00 AM",
    total: 2450,
    paymentStatus: "Paid",
    nextService: "24 Nov 2025 or 15,000 km",
    timeline: [
      { label: "Work Order Created", date: "24 May 2025, 10:00 AM", done: true },
      { label: "Technician Assigned", date: "24 May 2025, 10:05 AM", done: true },
      { label: "Work In Progress", date: "24 May 2025, 10:10 AM", done: true },
      { label: "Estimated Completion", date: "24 May 2025, 02:00 PM", done: false },
    ],
  },
  {
    id: "#WO-2455",
    invoiceId: "INV-1023",
    customer: person("Priya Mehta", "+91 87654 32109", "priya.mehta@email.com", "priya-mehta"),
    vehicleLabel: "Maruti Swift",
    vehiclePlate: "HR 26 BS 5678",
    vehicleYear: 2021,
    vin: "MBHBGD6S7M1237890",
    service: "Brake Inspection",
    serviceTag: "Brake System",
    status: "Pending",
    priority: "High",
    technician: "Sandeep Kumar",
    technicianRole: "Technician",
    createdOn: "24 May 2025",
    createdTime: "11:30 AM",
    total: 1850,
    paymentStatus: "Unpaid",
    nextService: "20 Nov 2025 or 23,000 km",
    timeline: [
      { label: "Work Order Created", date: "24 May 2025, 11:30 AM", done: true },
      { label: "Technician Assigned", date: "24 May 2025, 11:35 AM", done: true },
      { label: "Work In Progress", date: "-", done: false },
      { label: "Estimated Completion", date: "24 May 2025, 03:00 PM", done: false },
    ],
  },
  {
    id: "#WO-2454",
    invoiceId: "INV-1022",
    customer: person("Vikram Singh", "+91 76543 21098", "vikram.singh@email.com", "vikram-singh"),
    vehicleLabel: "Hyundai Creta",
    vehiclePlate: "PB 10 CD 4321",
    vehicleYear: 2020,
    vin: "MALPA81BLM1234567",
    service: "Engine Check",
    serviceTag: "Engine Service",
    status: "In Progress",
    priority: "High",
    technician: "Mohit Yadav",
    technicianRole: "Technician",
    createdOn: "24 May 2025",
    createdTime: "01:00 PM",
    total: 3200,
    paymentStatus: "Unpaid",
    nextService: "22 Nov 2025 or 27,000 km",
    timeline: [
      { label: "Work Order Created", date: "24 May 2025, 01:00 PM", done: true },
      { label: "Technician Assigned", date: "24 May 2025, 01:05 PM", done: true },
      { label: "Work In Progress", date: "24 May 2025, 01:15 PM", done: true },
      { label: "Estimated Completion", date: "24 May 2025, 05:00 PM", done: false },
    ],
  },
  {
    id: "#WO-2453",
    invoiceId: "INV-1021",
    customer: person("Neha Kapoor", "+91 65432 10987", "neha.kapoor@email.com", "neha-kapoor"),
    vehicleLabel: "Tata Nexon",
    vehiclePlate: "CH 01 EF 9876",
    vehicleYear: 2022,
    vin: "MAT6283GNN1234567",
    service: "AC Service",
    serviceTag: "Cooling System",
    status: "In Progress",
    priority: "Medium",
    technician: "Amit Singh",
    technicianRole: "Apprentice",
    createdOn: "24 May 2025",
    createdTime: "02:30 PM",
    total: 2150,
    paymentStatus: "Paid",
    nextService: "18 Nov 2025 or 17,000 km",
    timeline: [
      { label: "Work Order Created", date: "24 May 2025, 02:30 PM", done: true },
      { label: "Technician Assigned", date: "24 May 2025, 02:35 PM", done: true },
      { label: "Work In Progress", date: "24 May 2025, 02:45 PM", done: true },
      { label: "Estimated Completion", date: "24 May 2025, 06:00 PM", done: false },
    ],
  },
  {
    id: "#WO-2452",
    invoiceId: "INV-1020",
    customer: person("Arjun Das", "+91 54321 09876", "arjun.das@email.com", "arjun-das"),
    vehicleLabel: "Mahindra Thar",
    vehiclePlate: "RJ 14 GH 2468",
    vehicleYear: 2018,
    vin: "MBJ11BR9JK1234567",
    service: "Wheel Alignment",
    serviceTag: "Wheel Service",
    status: "On Hold",
    priority: "Low",
    technician: "Rahul Verma",
    technicianRole: "Senior Technician",
    createdOn: "24 May 2025",
    createdTime: "04:00 PM",
    total: 1400,
    paymentStatus: "Unpaid",
    nextService: "16 Nov 2025 or 39,000 km",
    timeline: [
      { label: "Work Order Created", date: "24 May 2025, 04:00 PM", done: true },
      { label: "Technician Assigned", date: "24 May 2025, 04:05 PM", done: true },
      { label: "Work On Hold", date: "24 May 2025, 04:20 PM", done: true },
      { label: "Estimated Completion", date: "Pending", done: false },
    ],
  },
  {
    id: "#WO-2451",
    invoiceId: "INV-1019",
    customer: person("Karan Patel", "+91 43210 98765", "karan.patel@email.com", "karan-patel"),
    vehicleLabel: "Kia Seltos",
    vehiclePlate: "UP 16 XY 7890",
    vehicleYear: 2021,
    vin: "MA1CA2FSNL1234567",
    service: "Battery Check",
    serviceTag: "Electrical System",
    status: "Completed",
    priority: "Low",
    technician: "Sandeep Kumar",
    technicianRole: "Technician",
    createdOn: "23 May 2025",
    createdTime: "10:30 AM",
    total: 2600,
    paymentStatus: "Paid",
    nextService: "23 Nov 2025 or 20,000 km",
    timeline: [
      { label: "Work Order Created", date: "23 May 2025, 10:30 AM", done: true },
      { label: "Technician Assigned", date: "23 May 2025, 10:35 AM", done: true },
      { label: "Work In Progress", date: "23 May 2025, 10:45 AM", done: true },
      { label: "Completed", date: "23 May 2025, 01:00 PM", done: true },
    ],
  },
  {
    id: "#WO-2450",
    invoiceId: "INV-1018",
    customer: person("Anjali Verma", "+91 32109 87654", "anjali.verma@email.com", "anjali-verma"),
    vehicleLabel: "Toyota Innova",
    vehiclePlate: "MH 12 KL 3456",
    vehicleYear: 2017,
    vin: "TMBJP4NEB1234567",
    service: "Clutch Repair",
    serviceTag: "Transmission",
    status: "Completed",
    priority: "Medium",
    technician: "Mohit Yadav",
    technicianRole: "Technician",
    createdOn: "23 May 2025",
    createdTime: "11:30 AM",
    total: 4750,
    paymentStatus: "Paid",
    nextService: "23 Nov 2025 or 33,000 km",
    timeline: [
      { label: "Work Order Created", date: "23 May 2025, 11:30 AM", done: true },
      { label: "Technician Assigned", date: "23 May 2025, 11:35 AM", done: true },
      { label: "Work In Progress", date: "23 May 2025, 11:50 AM", done: true },
      { label: "Completed", date: "23 May 2025, 04:00 PM", done: true },
    ],
  },
  {
    id: "#WO-2449",
    invoiceId: "INV-1017",
    customer: person("Manish Gupta", "+91 21098 76543", "manish.gupta@email.com", "manish-gupta"),
    vehicleLabel: "MG Hector",
    vehiclePlate: "DL 10 CA 6789",
    vehicleYear: 2021,
    vin: "MEAAC2CA3ML1234567",
    service: "General Service",
    serviceTag: "Regular Maintenance",
    status: "Cancelled",
    priority: "Low",
    technician: "-",
    technicianRole: "",
    createdOn: "23 May 2025",
    createdTime: "12:15 PM",
    total: 0,
    paymentStatus: "Unpaid",
    nextService: "-",
    timeline: [
      { label: "Work Order Created", date: "23 May 2025, 12:15 PM", done: true },
      { label: "Cancelled by Customer", date: "23 May 2025, 12:30 PM", done: true },
    ],
  },
];

export const technicians = [
  { name: "Rahul Verma", role: "Senior Technician", jobs: 4, load: 80, avatarSeed: "rahul-verma" },
  { name: "Sandeep Kumar", role: "Technician", jobs: 3, load: 60, avatarSeed: "sandeep-kumar" },
  { name: "Mohit Yadav", role: "Technician", jobs: 2, load: 40, avatarSeed: "mohit-yadav" },
  { name: "Amit Singh", role: "Apprentice", jobs: 1, load: 20, avatarSeed: "amit-singh" },
];

export const serviceOverview = [
  { date: "18 May", appointments: 20, completed: 12, revenue: 18 },
  { date: "19 May", appointments: 25, completed: 18, revenue: 32 },
  { date: "20 May", appointments: 22, completed: 24, revenue: 28 },
  { date: "21 May", appointments: 30, completed: 20, revenue: 22 },
  { date: "22 May", appointments: 28, completed: 26, revenue: 18 },
  { date: "23 May", appointments: 35, completed: 28, revenue: 24 },
  { date: "24 May", appointments: 30, completed: 34, revenue: 30 },
];

export const revenueSummary = [
  { month: "Jan", value: 32 },
  { month: "Feb", value: 40 },
  { month: "Mar", value: 35 },
  { month: "Apr", value: 50 },
  { month: "May", value: 45 },
  { month: "Jun", value: 60 },
  { month: "Jul", value: 55 },
  { month: "Aug", value: 65 },
];

// ---------------- Technicians ----------------

export type DutyStatus = "On Duty" | "On Break" | "On Leave" | "-";

export interface TechnicianProfile {
  id: string;
  name: string;
  role: string;
  avatarSeed: string;
  skills: string[];
  phone: string;
  email: string;
  status: "Active" | "Inactive";
  onDuty: DutyStatus;
  onDutyNote?: string;
  workload: number;
  workloadMax: number;
  rating: number;
  branch: string;
  experience: string;
  joinedOn: string;
  skillLevels: { name: string; level: number }[];
  performance: { jobsCompleted: number; avgRating: number; onTimeCompletion: number; customerSatisfaction: number };
}

export const technicianDirectory: TechnicianProfile[] = [
  {
    id: "TECH-1001",
    name: "Rahul Verma",
    role: "Senior Technician",
    avatarSeed: "rahul-verma",
    skills: ["Engine", "AC Repair", "Diagnostics", "+2"],
    phone: "+91 98765 43210",
    email: "rahul.verma@email.com",
    status: "Active",
    onDuty: "On Duty",
    workload: 7,
    workloadMax: 10,
    rating: 4.8,
    branch: "Gurugram Service Center",
    experience: "6 Years",
    joinedOn: "15 Feb 2022",
    skillLevels: [
      { name: "Engine Repair", level: 95 },
      { name: "AC Repair", level: 88 },
      { name: "Diagnostics", level: 80 },
      { name: "Suspension", level: 79 },
    ],
    performance: { jobsCompleted: 18, avgRating: 4.8, onTimeCompletion: 98, customerSatisfaction: 96 },
  },
  {
    id: "TECH-1002",
    name: "Sandeep Kumar",
    role: "Technician",
    avatarSeed: "sandeep-kumar",
    skills: ["Brakes", "Suspension", "Clutch"],
    phone: "+91 87654 32109",
    email: "sandeep.kumar@email.com",
    status: "Active",
    onDuty: "On Duty",
    workload: 5,
    workloadMax: 10,
    rating: 4.7,
    branch: "Gurugram Service Center",
    experience: "4 Years",
    joinedOn: "3 Jun 2022",
    skillLevels: [
      { name: "Brakes", level: 90 },
      { name: "Suspension", level: 84 },
      { name: "Clutch", level: 76 },
    ],
    performance: { jobsCompleted: 14, avgRating: 4.7, onTimeCompletion: 95, customerSatisfaction: 93 },
  },
  {
    id: "TECH-1003",
    name: "Vikram Singh",
    role: "Technician",
    avatarSeed: "vikram-singh",
    skills: ["Electrical", "Battery", "Diagnostics", "+1"],
    phone: "+91 76543 21098",
    email: "vikram.singh@email.com",
    status: "Active",
    onDuty: "On Duty",
    workload: 9,
    workloadMax: 10,
    rating: 4.9,
    branch: "Noida Service Center",
    experience: "5 Years",
    joinedOn: "22 Jan 2021",
    skillLevels: [
      { name: "Electrical", level: 92 },
      { name: "Battery", level: 89 },
      { name: "Diagnostics", level: 85 },
    ],
    performance: { jobsCompleted: 19, avgRating: 4.9, onTimeCompletion: 97, customerSatisfaction: 98 },
  },
  {
    id: "TECH-1004",
    name: "Amit Singh",
    role: "Apprentice",
    avatarSeed: "amit-singh",
    skills: ["AC Repair", "Cooling System"],
    phone: "+91 65432 10987",
    email: "amit.singh@email.com",
    status: "Active",
    onDuty: "On Break",
    workload: 3,
    workloadMax: 10,
    rating: 4.6,
    branch: "Gurugram Service Center",
    experience: "1 Year",
    joinedOn: "10 Sep 2024",
    skillLevels: [
      { name: "AC Repair", level: 70 },
      { name: "Cooling System", level: 65 },
    ],
    performance: { jobsCompleted: 8, avgRating: 4.6, onTimeCompletion: 90, customerSatisfaction: 89 },
  },
  {
    id: "TECH-1005",
    name: "Neha Kapoor",
    role: "Technician",
    avatarSeed: "neha-kapoor",
    skills: ["Engine", "Diagnostics", "Scanning"],
    phone: "+91 54321 09876",
    email: "neha.kapoor@email.com",
    status: "Active",
    onDuty: "On Leave",
    onDutyNote: "24 May 2025 (On Leave)",
    workload: 0,
    workloadMax: 10,
    rating: 4.5,
    branch: "Noida Service Center",
    experience: "3 Years",
    joinedOn: "18 Apr 2023",
    skillLevels: [
      { name: "Engine", level: 78 },
      { name: "Diagnostics", level: 82 },
      { name: "Scanning", level: 74 },
    ],
    performance: { jobsCompleted: 11, avgRating: 4.5, onTimeCompletion: 92, customerSatisfaction: 90 },
  },
  {
    id: "TECH-1006",
    name: "Arjun Das",
    role: "Technician",
    avatarSeed: "arjun-das",
    skills: ["Transmission", "Gearbox"],
    phone: "+91 43210 98765",
    email: "arjun.das@email.com",
    status: "Active",
    onDuty: "On Duty",
    workload: 6,
    workloadMax: 10,
    rating: 4.7,
    branch: "Gurugram Service Center",
    experience: "4 Years",
    joinedOn: "9 Nov 2022",
    skillLevels: [
      { name: "Transmission", level: 86 },
      { name: "Gearbox", level: 81 },
    ],
    performance: { jobsCompleted: 15, avgRating: 4.7, onTimeCompletion: 94, customerSatisfaction: 92 },
  },
  {
    id: "TECH-1007",
    name: "Karan Patel",
    role: "Technician",
    avatarSeed: "karan-patel",
    skills: ["Body Repair", "Painting"],
    phone: "+91 32109 87654",
    email: "karan.patel@email.com",
    status: "Inactive",
    onDuty: "-",
    workload: 0,
    workloadMax: 10,
    rating: 4.3,
    branch: "Noida Service Center",
    experience: "2 Years",
    joinedOn: "5 Jul 2023",
    skillLevels: [
      { name: "Body Repair", level: 72 },
      { name: "Painting", level: 68 },
    ],
    performance: { jobsCompleted: 6, avgRating: 4.3, onTimeCompletion: 85, customerSatisfaction: 84 },
  },
  {
    id: "TECH-1008",
    name: "Rohit Sharma",
    role: "Technician",
    avatarSeed: "rohit-sharma-tech",
    skills: ["Brakes", "Suspension", "ABS"],
    phone: "+91 21098 76543",
    email: "rohit.sharma@email.com",
    status: "Active",
    onDuty: "On Duty",
    workload: 8,
    workloadMax: 10,
    rating: 4.8,
    branch: "Gurugram Service Center",
    experience: "5 Years",
    joinedOn: "12 Mar 2021",
    skillLevels: [
      { name: "Brakes", level: 90 },
      { name: "Suspension", level: 85 },
      { name: "ABS", level: 80 },
    ],
    performance: { jobsCompleted: 17, avgRating: 4.8, onTimeCompletion: 96, customerSatisfaction: 95 },
  },
];

// ---------------- Inventory ----------------

export interface InventoryItem {
  id: string;
  name: string;
  subtitle: string;
  sku: string;
  category: string;
  brand: string;
  stockQty: number;
  unitPrice: number;
  status: "In Stock" | "Low Stock" | "Out of Stock";
  onHand: number;
  reserved: number;
  reorderLevel: number;
  rating: number;
  reviews: number;
  supplier: { name: string; contact: string; lastPurchase: string; nextOrder: string };
  recentActivity: { type: "Stock Added" | "Used" | "Stock Adjusted"; label: string; delta: string; date: string }[];
  emoji: string;
}

export const inventoryItems: InventoryItem[] = [
  {
    id: "ITM-1",
    name: "Engine Oil 5W-30",
    subtitle: "Fully Synthetic",
    sku: "AC-EO-1001",
    category: "Engine & Lubricants",
    brand: "Castrol",
    stockQty: 48,
    unitPrice: 850,
    status: "In Stock",
    onHand: 48,
    reserved: 12,
    reorderLevel: 24,
    rating: 4.8,
    reviews: 124,
    supplier: { name: "Castrol India Ltd.", contact: "+91 98765 43210", lastPurchase: "10 May 2025", nextOrder: "28 May 2025" },
    recentActivity: [
      { type: "Stock Added", label: "Stock Added", delta: "+24 units", date: "10 May 2025" },
      { type: "Used", label: "Used in WO #2456", delta: "-4 units", date: "24 May 2025" },
      { type: "Stock Adjusted", label: "Stock Adjusted", delta: "+8 units", date: "20 May 2025" },
    ],
    emoji: "🛢️",
  },
  {
    id: "ITM-2",
    name: "Oil Filter",
    subtitle: "Engine Oil Filter",
    sku: "AC-OF-2045",
    category: "Filters",
    brand: "Bosch",
    stockQty: 32,
    unitPrice: 350,
    status: "In Stock",
    onHand: 32,
    reserved: 6,
    reorderLevel: 15,
    rating: 4.6,
    reviews: 88,
    supplier: { name: "Bosch India", contact: "+91 91234 56780", lastPurchase: "8 May 2025", nextOrder: "25 May 2025" },
    recentActivity: [{ type: "Stock Added", label: "Stock Added", delta: "+20 units", date: "8 May 2025" }],
    emoji: "🧴",
  },
  {
    id: "ITM-3",
    name: "Brake Pads",
    subtitle: "Front Brake Pads",
    sku: "AC-BP-3201",
    category: "Brake System",
    brand: "Bosch",
    stockQty: 10,
    unitPrice: 1250,
    status: "Low Stock",
    onHand: 10,
    reserved: 4,
    reorderLevel: 15,
    rating: 4.7,
    reviews: 56,
    supplier: { name: "Bosch India", contact: "+91 91234 56780", lastPurchase: "2 May 2025", nextOrder: "26 May 2025" },
    recentActivity: [{ type: "Used", label: "Used in WO #2455", delta: "-2 units", date: "23 May 2025" }],
    emoji: "🛑",
  },
  {
    id: "ITM-4",
    name: "Air Filter",
    subtitle: "Engine Air Filter",
    sku: "AC-AF-1102",
    category: "Filters",
    brand: "Mann Filter",
    stockQty: 4,
    unitPrice: 450,
    status: "Low Stock",
    onHand: 4,
    reserved: 1,
    reorderLevel: 10,
    rating: 4.5,
    reviews: 34,
    supplier: { name: "Mann Filter India", contact: "+91 90123 45678", lastPurchase: "1 May 2025", nextOrder: "27 May 2025" },
    recentActivity: [{ type: "Used", label: "Used in WO #2452", delta: "-1 unit", date: "22 May 2025" }],
    emoji: "🌬️",
  },
  {
    id: "ITM-5",
    name: "Spark Plug",
    subtitle: "Iridium Spark Plug",
    sku: "AC-SP-5507",
    category: "Ignition",
    brand: "NGK",
    stockQty: 0,
    unitPrice: 650,
    status: "Out of Stock",
    onHand: 0,
    reserved: 0,
    reorderLevel: 12,
    rating: 4.9,
    reviews: 142,
    supplier: { name: "NGK Spark Plugs", contact: "+91 89012 34567", lastPurchase: "18 Apr 2025", nextOrder: "30 May 2025" },
    recentActivity: [{ type: "Used", label: "Used in WO #2450", delta: "-6 units", date: "18 May 2025" }],
    emoji: "🔌",
  },
  {
    id: "ITM-6",
    name: "Battery 60Ah",
    subtitle: "Maintenance Free",
    sku: "AC-BT-7802",
    category: "Battery",
    brand: "Exide",
    stockQty: 18,
    unitPrice: 5200,
    status: "In Stock",
    onHand: 18,
    reserved: 2,
    reorderLevel: 8,
    rating: 4.6,
    reviews: 76,
    supplier: { name: "Exide Industries", contact: "+91 78901 23456", lastPurchase: "5 May 2025", nextOrder: "3 Jun 2025" },
    recentActivity: [{ type: "Stock Added", label: "Stock Added", delta: "+10 units", date: "5 May 2025" }],
    emoji: "🔋",
  },
  {
    id: "ITM-7",
    name: "Coolant 1L",
    subtitle: "Radiator Coolant",
    sku: "AC-CL-6603",
    category: "Fluids",
    brand: "Castrol",
    stockQty: 25,
    unitPrice: 320,
    status: "In Stock",
    onHand: 25,
    reserved: 5,
    reorderLevel: 12,
    rating: 4.5,
    reviews: 40,
    supplier: { name: "Castrol India Ltd.", contact: "+91 98765 43210", lastPurchase: "12 May 2025", nextOrder: "2 Jun 2025" },
    recentActivity: [{ type: "Stock Added", label: "Stock Added", delta: "+15 units", date: "12 May 2025" }],
    emoji: "🧊",
  },
  {
    id: "ITM-8",
    name: "Wiper Blades",
    subtitle: "Universal Fit",
    sku: "AC-WB-1205",
    category: "Wiper & Washer",
    brand: "Bosch",
    stockQty: 7,
    unitPrice: 550,
    status: "Low Stock",
    onHand: 7,
    reserved: 1,
    reorderLevel: 10,
    rating: 4.4,
    reviews: 29,
    supplier: { name: "Bosch India", contact: "+91 91234 56780", lastPurchase: "20 Apr 2025", nextOrder: "1 Jun 2025" },
    recentActivity: [{ type: "Used", label: "Used in WO #2448", delta: "-2 units", date: "19 May 2025" }],
    emoji: "🧹",
  },
];

// ---------------- Invoices ----------------

export interface Invoice {
  id: string;
  customer: Person;
  vehicleLabel: string;
  vehiclePlate: string;
  invoiceDate: string;
  dueDate: string;
  amount: number;
  status: "Paid" | "Sent" | "Overdue" | "Draft";
  paymentStatus: "Paid" | "Unpaid" | "Partial";
  subTotal: number;
  discount: number;
  tax: number;
  totalAmount: number;
  paidAmount: number;
  balanceDue: number;
  paymentHistory: { label: string; amount: number; date: string; method: string }[];
}

export const invoices: Invoice[] = [
  {
    id: "INV-2025-0256",
    customer: person("Rohit Sharma", "+91 98765 43210", "rohit.sharma@email.com", "rohit-sharma"),
    vehicleLabel: "Honda City",
    vehiclePlate: "DL 01 AB 1234",
    invoiceDate: "24 May 2025",
    dueDate: "31 May 2025",
    amount: 4250,
    status: "Overdue",
    paymentStatus: "Unpaid",
    subTotal: 4250,
    discount: 0,
    tax: 0,
    totalAmount: 4250,
    paidAmount: 0,
    balanceDue: 4250,
    paymentHistory: [],
  },
  {
    id: "INV-2025-0255",
    customer: person("Priya Mehta", "+91 87654 32109", "priya.mehta@email.com", "priya-mehta"),
    vehicleLabel: "Maruti Swift",
    vehiclePlate: "HR 26 BS 5678",
    invoiceDate: "24 May 2025",
    dueDate: "31 May 2025",
    amount: 2150,
    status: "Sent",
    paymentStatus: "Unpaid",
    subTotal: 2150,
    discount: 0,
    tax: 0,
    totalAmount: 2150,
    paidAmount: 0,
    balanceDue: 2150,
    paymentHistory: [],
  },
  {
    id: "INV-2025-0254",
    customer: person("Vikram Singh", "+91 76543 21098", "vikram.singh@email.com", "vikram-singh"),
    vehicleLabel: "Hyundai Creta",
    vehiclePlate: "PB 10 CD 4321",
    invoiceDate: "23 May 2025",
    dueDate: "30 May 2025",
    amount: 3780,
    status: "Sent",
    paymentStatus: "Partial",
    subTotal: 3780,
    discount: 0,
    tax: 0,
    totalAmount: 3780,
    paidAmount: 1500,
    balanceDue: 2280,
    paymentHistory: [{ label: "Payment received", amount: 1500, date: "23 May 2025, 04:10 PM", method: "Online" }],
  },
  {
    id: "INV-2025-0253",
    customer: person("Neha Kapoor", "+91 98765 43210", "neha.kapoor@email.com", "neha-kapoor"),
    vehicleLabel: "Tata Nexon",
    vehiclePlate: "CH 01 EF 9876",
    invoiceDate: "22 May 2025",
    dueDate: "29 May 2025",
    amount: 5640,
    status: "Paid",
    paymentStatus: "Paid",
    subTotal: 4780,
    discount: 480,
    tax: 1340,
    totalAmount: 5640,
    paidAmount: 5640,
    balanceDue: 0,
    paymentHistory: [
      { label: "Payment received", amount: 3000, date: "22 May 2025, 11:30 AM", method: "Online" },
      { label: "Payment received", amount: 2640, date: "22 May 2025, 03:45 PM", method: "UPI" },
    ],
  },
  {
    id: "INV-2025-0252",
    customer: person("Arjun Das", "+91 54321 09876", "arjun.das@email.com", "arjun-das"),
    vehicleLabel: "Toyota Innova",
    vehiclePlate: "RJ 14 GH 2468",
    invoiceDate: "22 May 2025",
    dueDate: "29 May 2025",
    amount: 1850,
    status: "Paid",
    paymentStatus: "Paid",
    subTotal: 1850,
    discount: 0,
    tax: 0,
    totalAmount: 1850,
    paidAmount: 1850,
    balanceDue: 0,
    paymentHistory: [{ label: "Payment received", amount: 1850, date: "22 May 2025, 10:15 AM", method: "Cash" }],
  },
  {
    id: "INV-2025-0251",
    customer: person("Karan Patel", "+91 43210 98765", "karan.patel@email.com", "karan-patel"),
    vehicleLabel: "Kia Seltos",
    vehiclePlate: "UP 16 XY 7890",
    invoiceDate: "21 May 2025",
    dueDate: "28 May 2025",
    amount: 6200,
    status: "Overdue",
    paymentStatus: "Unpaid",
    subTotal: 6200,
    discount: 0,
    tax: 0,
    totalAmount: 6200,
    paidAmount: 0,
    balanceDue: 6200,
    paymentHistory: [],
  },
  {
    id: "INV-2025-0250",
    customer: person("Anjali Verma", "+91 32109 87654", "anjali.verma@email.com", "anjali-verma"),
    vehicleLabel: "Skoda Rapid",
    vehiclePlate: "MH 12 KL 3456",
    invoiceDate: "20 May 2025",
    dueDate: "27 May 2025",
    amount: 3120,
    status: "Paid",
    paymentStatus: "Paid",
    subTotal: 3120,
    discount: 0,
    tax: 0,
    totalAmount: 3120,
    paidAmount: 3120,
    balanceDue: 0,
    paymentHistory: [{ label: "Payment received", amount: 3120, date: "20 May 2025, 01:20 PM", method: "Card" }],
  },
  {
    id: "INV-2025-0249",
    customer: person("Manish Gupta", "+91 21098 76543", "manish.gupta@email.com", "manish-gupta"),
    vehicleLabel: "Mahindra XUV300",
    vehiclePlate: "DL 10 CA 6789",
    invoiceDate: "19 May 2025",
    dueDate: "26 May 2025",
    amount: 2950,
    status: "Paid",
    paymentStatus: "Paid",
    subTotal: 2950,
    discount: 0,
    tax: 0,
    totalAmount: 2950,
    paidAmount: 2950,
    balanceDue: 0,
    paymentHistory: [{ label: "Payment received", amount: 2950, date: "19 May 2025, 09:05 AM", method: "Online" }],
  },
];

// ---------------- Reviews ----------------

export interface Review {
  id: string;
  customer: Person;
  service: string;
  vehicleLabel: string;
  vehiclePlate: string;
  rating: number;
  review: string;
  technician: string;
  technicianAvatarSeed: string;
  date: string;
  time: string;
}

export const reviews: Review[] = [
  {
    id: "REV-1",
    customer: person("Rohit Kumar", "+91 98765 43210", "rohit.kumar@email.com", "rohit-kumar"),
    service: "General Service",
    vehicleLabel: "Honda City",
    vehiclePlate: "DL 01 AB 1234",
    rating: 5,
    review: "Excellent service! Staff was polite and completed the work on time.",
    technician: "Rahul Verma",
    technicianAvatarSeed: "rahul-verma",
    date: "24 May 2025",
    time: "10:30 AM",
  },
  {
    id: "REV-2",
    customer: person("Priya Mehta", "+91 87654 32109", "priya.mehta@email.com", "priya-mehta"),
    service: "Brake Repair",
    vehicleLabel: "Maruti Swift",
    vehiclePlate: "HR 26 BS 5678",
    rating: 4,
    review: "Good service. Brakes working perfectly now. Waiting time was a bit long.",
    technician: "Sandeep Kumar",
    technicianAvatarSeed: "sandeep-kumar",
    date: "24 May 2025",
    time: "09:15 AM",
  },
  {
    id: "REV-3",
    customer: person("Vikram Sharma", "+91 76543 21098", "vikram.sharma@email.com", "vikram-sharma"),
    service: "AC Service",
    vehicleLabel: "Hyundai Creta",
    vehiclePlate: "PB 10 CD 4321",
    rating: 5,
    review: "Very professional and quick service. Highly recommended!",
    technician: "Vikram Singh",
    technicianAvatarSeed: "vikram-singh",
    date: "23 May 2025",
    time: "06:20 PM",
  },
  {
    id: "REV-4",
    customer: person("Neha Kapoor", "+91 98765 12345", "neha.kapoor2@email.com", "neha-kapoor2"),
    service: "Engine Repair",
    vehicleLabel: "Tata Nexon",
    vehiclePlate: "CH 01 EF 9876",
    rating: 3,
    review: "Service was okay but the cost could be more transparent.",
    technician: "Amit Singh",
    technicianAvatarSeed: "amit-singh",
    date: "23 May 2025",
    time: "03:45 PM",
  },
  {
    id: "REV-5",
    customer: person("Arjun Das", "+91 65432 10987", "arjun.das2@email.com", "arjun-das2"),
    service: "General Service",
    vehicleLabel: "Toyota Innova",
    vehiclePlate: "RJ 14 GH 2468",
    rating: 4,
    review: "Happy with the service quality and customer support.",
    technician: "Neha Kapoor",
    technicianAvatarSeed: "neha-kapoor",
    date: "22 May 2025",
    time: "02:10 PM",
  },
];

export const ratingDistribution = [
  { stars: 5, count: 176, pct: 69, color: "#22c55e" },
  { stars: 4, count: 48, pct: 19, color: "#3b82f6" },
  { stars: 3, count: 20, pct: 8, color: "#f59e0b" },
  { stars: 2, count: 8, pct: 3, color: "#f97316" },
  { stars: 1, count: 4, pct: 1, color: "#ef4444" },
];

export const ratingTrend = [
  { date: "01 May", rating: 4.2 },
  { date: "06 May", rating: 4.5 },
  { date: "11 May", rating: 4.3 },
  { date: "16 May", rating: 4.6 },
  { date: "21 May", rating: 4.4 },
  { date: "24 May", rating: 4.7 },
];

export const topRatedTechnicians = [
  { rank: 1, name: "Rahul Verma", avatarSeed: "rahul-verma", rating: 4.9, reviews: 126 },
  { rank: 2, name: "Sandeep Kumar", avatarSeed: "sandeep-kumar", rating: 4.8, reviews: 98 },
  { rank: 3, name: "Vikram Singh", avatarSeed: "vikram-singh", rating: 4.7, reviews: 82 },
  { rank: 4, name: "Amit Singh", avatarSeed: "amit-singh", rating: 4.6, reviews: 74 },
  { rank: 5, name: "Neha Kapoor", avatarSeed: "neha-kapoor", rating: 4.6, reviews: 68 },
];

// ---------------- Reports ----------------

export const revenueOverview = [
  { date: "01 May", value: 12 },
  { date: "06 May", value: 15 },
  { date: "11 May", value: 13 },
  { date: "16 May", value: 18 },
  { date: "21 May", value: 16 },
  { date: "24 May", value: 20 },
];

export const workOrderStatusBreakdown = [
  { name: "Completed", value: 1024, pct: 81, color: "#22c55e" },
  { name: "In Progress", value: 146, pct: 12, color: "#3b82f6" },
  { name: "Pending", value: 56, pct: 4, color: "#f59e0b" },
  { name: "Cancelled", value: 30, pct: 3, color: "#ef4444" },
];

export const revenueByServiceType = [
  { name: "General Service", value: 625000, pct: 34, color: "#3b82f6" },
  { name: "Repair & Maintenance", value: 545000, pct: 30, color: "#22c55e" },
  { name: "Diagnostics", value: 315000, pct: 17, color: "#f59e0b" },
  { name: "Others", value: 360600, pct: 19, color: "#a855f7" },
];

export const topPerformingTechnicians = [
  { name: "Rahul Verma", avatarSeed: "rahul-verma", workOrders: 168, completed: 152, revenue: 285400, rating: 4.8 },
  { name: "Sandeep Kumar", avatarSeed: "sandeep-kumar", workOrders: 142, completed: 130, revenue: 235600, rating: 4.7 },
  { name: "Vikram Singh", avatarSeed: "vikram-singh", workOrders: 128, completed: 121, revenue: 210300, rating: 4.6 },
  { name: "Amit Singh", avatarSeed: "amit-singh", workOrders: 110, completed: 98, revenue: 165200, rating: 4.5 },
  { name: "Neha Kapoor", avatarSeed: "neha-kapoor", workOrders: 98, completed: 92, revenue: 140800, rating: 4.4 },
];

export const revenueTrend = [
  { month: "Dec '24", value: 12 },
  { month: "Jan '25", value: 13.5 },
  { month: "Feb '25", value: 15 },
  { month: "Mar '25", value: 17.5 },
  { month: "Apr '25", value: 19 },
  { month: "May '25", value: 21.5 },
];

export const topServicesByRevenue = [
  { service: "General Service", workOrders: 520, revenue: 625000 },
  { service: "Engine Repair", workOrders: 236, revenue: 345000 },
  { service: "Brake Service", workOrders: 158, revenue: 225000 },
  { service: "AC Service", workOrders: 142, revenue: 195000 },
  { service: "Diagnostics", workOrders: 112, revenue: 155000 },
];

export const reportsCenter = [
  { title: "Service Reports", description: "Work orders, service performance and trends", icon: "clipboard" as const },
  { title: "Financial Reports", description: "Revenue, payments, dues and profitability", icon: "wallet" as const },
  { title: "Customer Reports", description: "Customer insights, retention and feedback", icon: "users" as const },
  { title: "Inventory Reports", description: "Stock, usage, valuation and consumables", icon: "package" as const },
  { title: "Technician Reports", description: "Performance, productivity and efficiency", icon: "user-cog" as const },
  { title: "Custom Reports", description: "Build and schedule custom reports", icon: "settings" as const },
];
