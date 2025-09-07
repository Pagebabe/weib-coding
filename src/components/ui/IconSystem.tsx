import { 
  Home, 
  MapPin, 
  Handshake, 
  Shield, 
  Users, 
  TrendingUp,
  Bed,
  Bath,
  Car,
  Ruler,
  Calendar,
  Star,
  Heart,
  Share2,
  Phone,
  Mail,
  Globe,
  Award,
  CheckCircle,
  ArrowRight,
  Search,
  Filter,
  SortAsc,
  Eye,
  Edit,
  Trash2,
  Plus,
  Minus,
  X,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Download,
  Upload,
  Settings,
  Menu,
  User,
  Lock,
  Unlock,
  Bell,
  MessageCircle,
  Camera,
  Image,
  File,
  Video,
  Music,
  Archive,
  Bookmark,
  Tag,
  Clock,
  DollarSign,
  Euro,
  CreditCard,
  Building,
  TreePine,
  Waves,
  Mountain,
  Sun,
  Moon,
  Cloud,
  Zap,
  Wifi,
  Tv,
  Coffee,
  Utensils,
  Dumbbell,
  Pool,
  Plane,
  Train,
  Bus,
  Bike,
  Walking,
  Compass,
  Navigation,
  Target,
  Flag,
  Map,
  Location,
  Pin,
  Route,
  Layers,
  Grid,
  List,
  Layout,
  Palette,
  Brush,
  Scissors,
  Wrench,
  Hammer,
  Key,
  AlertTriangle,
  Info,
  HelpCircle,
  Check,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  RotateCcw,
  RefreshCw,
  Save,
  Trash,
  Copy,
  Cut,
  Paste,
  Undo,
  Redo,
  ZoomIn,
  ZoomOut,
  Move,
  RotateCw,
  FlipHorizontal,
  FlipVertical,
  Crop,
  Focus,
  Blur,
  Contrast,
  Brightness,
  Saturation,
  Hue,
  Opacity,
  Sidebar,
  PanelLeft,
  PanelRight,
  PanelTop,
  PanelBottom,
  Split,
  Columns,
  Rows,
  Square,
  Circle,
  Triangle,
  Hexagon,
  Octagon,
  Diamond,
  Hash,
  AtSign,
  Percent,
  Infinity,
  Pi,
  Sigma,
  Alpha,
  Beta,
  Gamma,
  Delta,
  Epsilon,
  Zeta,
  Eta,
  Theta,
  Iota,
  Kappa,
  Lambda,
  Mu,
  Nu,
  Xi,
  Omicron,
  Rho,
  Tau,
  Upsilon,
  Phi,
  Chi,
  Psi,
  Omega,
  BarChart3,
  FileText,
  GraduationCap,
  Crown,
  ShoppingBag,
  BookOpen,
  Clipboard,
  Undo2
} from 'lucide-react';

// Property-specific icons
export const PropertyIcons = {
  // Basic property types
  villa: Home,
  house: Home,
  condo: Building,
  apartment: Building,
  townhouse: Building,
  land: TreePine,
  office: Building,
  
  // Features
  bedroom: Bed,
  bathroom: Bath,
  parking: Car,
  area: Ruler,
  year: Calendar,
  pool: Pool,
  garden: TreePine,
  beach: Waves,
  mountain: Mountain,
  city: Building,
  
  // Amenities
  wifi: Wifi,
  tv: Tv,
  ac: Zap,
  kitchen: Utensils,
  gym: Dumbbell,
  spa: Waves,
  security: Shield,
  elevator: ArrowUp,
  balcony: Sun,
  terrace: Sun,
  
  // Status
  available: CheckCircle,
  reserved: Clock,
  sold: X,
  rented: Key,
  
  // Actions
  favorite: Heart,
  share: Share2,
  view: Eye,
  edit: Edit,
  delete: Trash2,
  add: Plus,
  remove: Minus,
  
  // Navigation
  next: ChevronRight,
  prev: ChevronLeft,
  up: ChevronUp,
  down: ChevronDown,
  expand: Maximize2,
  collapse: Minus,
  
  // Contact
  phone: Phone,
  email: Mail,
  website: Globe,
  location: MapPin,
  
  // Services
  service: Handshake,
  consultation: Users,
  management: Shield,
  investment: TrendingUp,
  market: BarChart3,
  legal: FileText,
  translation: Globe,
  
  // UI Elements
  search: Search,
  filter: Filter,
  sort: SortAsc,
  menu: Menu,
  settings: Settings,
  user: User,
  lock: Lock,
  unlock: Unlock,
  bell: Bell,
  message: MessageCircle,
  
  // Media
  camera: Camera,
  image: Image,
  video: Video,
  file: File,
  download: Download,
  upload: Upload,
  
  // Financial
  price: DollarSign,
  euro: Euro,
  credit: CreditCard,
  payment: CreditCard,
  
  // Transportation
  car: Car,
  plane: Plane,
  train: Train,
  bus: Bus,
  bike: Bike,
  walk: Walking,
  
  // Weather
  sun: Sun,
  moon: Moon,
  cloud: Cloud,
  rain: Cloud,
  snow: Cloud,
  
  // Miscellaneous
  star: Star,
  award: Award,
  check: Check,
  cross: X,
  info: Info,
  warning: AlertTriangle,
  help: HelpCircle,
  question: HelpCircle,
  exclamation: AlertTriangle,
  success: CheckCircle,
  error: X,
  loading: RefreshCw,
  save: Save,
  copy: Copy,
  cut: Scissors,
  paste: Clipboard,
  undo: Undo2,
  redo: Redo2,
  zoomIn: ZoomIn,
  zoomOut: ZoomOut,
  move: Move,
  rotate: RotateCw,
  flip: FlipHorizontal,
  crop: Crop,
  focus: Focus,
  blur: Blur,
  contrast: Contrast,
  brightness: Brightness,
  saturation: Saturation,
  hue: Palette,
  opacity: Circle,
  layers: Layers,
  grid: Grid,
  layout: Layout,
  sidebar: Sidebar,
  panel: PanelLeft,
  split: Split,
  columns: Columns,
  rows: Rows,
  square: Square,
  circle: Circle,
  triangle: Triangle,
  hexagon: Hexagon,
  octagon: Octagon,
  diamond: Diamond,
  heart: Heart,
  bookmark: Bookmark,
  flag: Flag,
  tag: Tag,
  hash: Hash,
  at: AtSign,
  percent: Percent,
  infinity: Infinity,
  pi: Pi,
  sigma: Sigma,
  alpha: Alpha,
  beta: Beta,
  gamma: Gamma,
  delta: Delta,
  epsilon: Epsilon,
  zeta: Zeta,
  eta: Eta,
  theta: Theta,
  iota: Iota,
  kappa: Kappa,
  lambda: Lambda,
  mu: Mu,
  nu: Nu,
  xi: Xi,
  omicron: Omicron,
  rho: Rho,
  tau: Tau,
  upsilon: Upsilon,
  phi: Phi,
  chi: Chi,
  psi: Psi,
  omega: Omega
};

// Service icons
export const ServiceIcons = {
  sale: Home,
  rent: Key,
  management: Shield,
  consultation: Users,
  investment: TrendingUp,
  legal: FileText,
  translation: Globe,
  market: BarChart3,
  location: MapPin,
  service: Handshake
};

// District icons
export const DistrictIcons = {
  beach: Waves,
  city: Building,
  mountain: Mountain,
  forest: TreePine,
  lake: Waves,
  river: Waves,
  park: TreePine,
  commercial: Building,
  residential: Home,
  industrial: Building,
  tourist: Camera,
  cultural: BookOpen,
  educational: GraduationCap,
  medical: Heart,
  sports: Dumbbell,
  entertainment: Music,
  shopping: ShoppingBag,
  dining: Utensils,
  nightlife: Moon,
  family: Users,
  luxury: Crown,
  budget: DollarSign,
  modern: Zap,
  traditional: Home,
  international: Globe,
  local: MapPin
};

// Icon component with consistent styling
interface IconProps {
  name: keyof typeof PropertyIcons;
  size?: number;
  className?: string;
  color?: string;
}

export function Icon({ name, size = 20, className = '', color }: IconProps) {
  const IconComponent = PropertyIcons[name];
  
  if (!IconComponent) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }

  return (
    <IconComponent 
      size={size} 
      className={className}
      style={color ? { color } : undefined}
    />
  );
}

// Service Icon component
interface ServiceIconProps {
  name: keyof typeof ServiceIcons;
  size?: number;
  className?: string;
  color?: string;
}

export function ServiceIcon({ name, size = 20, className = '', color }: ServiceIconProps) {
  const IconComponent = ServiceIcons[name];
  
  if (!IconComponent) {
    console.warn(`Service Icon "${name}" not found`);
    return null;
  }

  return (
    <IconComponent 
      size={size} 
      className={className}
      style={color ? { color } : undefined}
    />
  );
}

// District Icon component
interface DistrictIconProps {
  name: keyof typeof DistrictIcons;
  size?: number;
  className?: string;
  color?: string;
}

export function DistrictIcon({ name, size = 20, className = '', color }: DistrictIconProps) {
  const IconComponent = DistrictIcons[name];
  
  if (!IconComponent) {
    console.warn(`District Icon "${name}" not found`);
    return null;
  }

  return (
    <IconComponent 
      size={size} 
      className={className}
      style={color ? { color } : undefined}
    />
  );
}
