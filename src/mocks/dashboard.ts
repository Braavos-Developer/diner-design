// Mock data for dashboard analytics

export interface KPI {
  id: string;
  title: string;
  value: number;
  unit: string;
  change: number; // percentage
  changeType: 'increase' | 'decrease' | 'neutral';
  icon: string;
  color: 'primary' | 'success' | 'warning' | 'accent';
}

export interface ChartDataPoint {
  name: string;
  value: number;
  label?: string;
  date?: string;
  hour?: number;
}

export interface HeatmapData {
  table: number;
  intensity: number; // 0-100
  revenue: number;
  orders: number;
}

// Mock KPIs
export const mockKPIs: KPI[] = [
  {
    id: 'revenue',
    title: 'Vendas Hoje',
    value: 12450.80,
    unit: 'R$',
    change: 8.2,
    changeType: 'increase',
    icon: '💰',
    color: 'primary'
  },
  {
    id: 'orders',
    title: 'Pedidos',
    value: 147,
    unit: '',
    change: 12.5,
    changeType: 'increase',
    icon: '📋',
    color: 'success'
  },
  {
    id: 'avg_ticket',
    title: 'Ticket Médio',
    value: 84.70,
    unit: 'R$',
    change: -3.1,
    changeType: 'decrease',
    icon: '🎫',
    color: 'accent'
  },
  {
    id: 'prep_time',
    title: 'Tempo Médio',
    value: 18.5,
    unit: 'min',
    change: -5.2,
    changeType: 'decrease',
    icon: '⏱️',
    color: 'warning'
  },
  {
    id: 'customer_satisfaction',
    title: 'Satisfação',
    value: 4.7,
    unit: '/5.0',
    change: 2.1,
    changeType: 'increase',
    icon: '⭐',
    color: 'success'
  },
  {
    id: 'tables_occupied',
    title: 'Ocupação',
    value: 68,
    unit: '%',
    change: 15.3,
    changeType: 'increase',
    icon: '🪑',
    color: 'primary'
  }
];

// Mock sales by hour data
export const mockSalesByHour: ChartDataPoint[] = [
  { name: '08:00', value: 245, hour: 8 },
  { name: '09:00', value: 380, hour: 9 },
  { name: '10:00', value: 520, hour: 10 },
  { name: '11:00', value: 890, hour: 11 },
  { name: '12:00', value: 1450, hour: 12 },
  { name: '13:00', value: 1890, hour: 13 },
  { name: '14:00', value: 1620, hour: 14 },
  { name: '15:00', value: 980, hour: 15 },
  { name: '16:00', value: 650, hour: 16 },
  { name: '17:00', value: 420, hour: 17 },
  { name: '18:00', value: 780, hour: 18 },
  { name: '19:00', value: 1250, hour: 19 },
  { name: '20:00', value: 1680, hour: 20 },
  { name: '21:00', value: 1420, hour: 21 },
  { name: '22:00', value: 890, hour: 22 },
  { name: '23:00', value: 320, hour: 23 }
];

// Mock sales by day (last 7 days)
export const mockSalesByDay: ChartDataPoint[] = [
  { name: 'Seg', value: 8450, date: '2024-01-15' },
  { name: 'Ter', value: 9200, date: '2024-01-16' },
  { name: 'Qua', value: 7800, date: '2024-01-17' },
  { name: 'Qui', value: 10500, date: '2024-01-18' },
  { name: 'Sex', value: 13200, date: '2024-01-19' },
  { name: 'Sáb', value: 15800, date: '2024-01-20' },
  { name: 'Dom', value: 12450, date: '2024-01-21' }
];

// Mock top 10 items
export const mockTopItems: ChartDataPoint[] = [
  { name: 'Picanha Premium', value: 34, label: '34 vendas' },
  { name: 'Salmão Grelhado', value: 28, label: '28 vendas' },
  { name: 'Petit Gâteau', value: 22, label: '22 vendas' },
  { name: 'Linguine Vongole', value: 19, label: '19 vendas' },
  { name: 'Bruschetta', value: 17, label: '17 vendas' },
  { name: 'Tiramisù', value: 15, label: '15 vendas' },
  { name: 'Caipirinha Maracujá', value: 45, label: '45 vendas' },
  { name: 'Bowl Vegano', value: 12, label: '12 vendas' },
  { name: 'Coxinha Costela', value: 25, label: '25 vendas' },
  { name: 'Gnocchi Abóbora', value: 14, label: '14 vendas' }
];

// Mock ABC curve data
export const mockABCCurve: ChartDataPoint[] = [
  { name: 'Picanha Premium', value: 4180, label: '33.6%' },
  { name: 'Salmão Grelhado', value: 6696, label: '53.8%' },
  { name: 'Caipirinha Maracujá', value: 7816, label: '62.8%' },
  { name: 'Coxinha Costela', value: 8288, label: '66.6%' },
  { name: 'Petit Gâteau', value: 8924, label: '71.7%' },
  { name: 'Linguine Vongole', value: 10214, label: '82.1%' },
  { name: 'Bruschetta', value: 10774, label: '86.6%' },
  { name: 'Tiramisù', value: 11178, label: '89.8%' },
  { name: 'Gnocchi Abóbora', value: 11946, label: '96.0%' },
  { name: 'Bowl Vegano', value: 12450, label: '100.0%' }
];

// Mock response time data
export const mockResponseTimes: ChartDataPoint[] = [
  { name: '08:00', value: 3.2, hour: 8 },
  { name: '09:00', value: 2.8, hour: 9 },
  { name: '10:00', value: 2.5, hour: 10 },
  { name: '11:00', value: 4.1, hour: 11 },
  { name: '12:00', value: 6.8, hour: 12 },
  { name: '13:00', value: 8.2, hour: 13 },
  { name: '14:00', value: 5.9, hour: 14 },
  { name: '15:00', value: 3.4, hour: 15 },
  { name: '16:00', value: 2.1, hour: 16 },
  { name: '17:00', value: 1.9, hour: 17 },
  { name: '18:00', value: 3.7, hour: 18 },
  { name: '19:00', value: 5.5, hour: 19 },
  { name: '20:00', value: 7.1, hour: 20 },
  { name: '21:00', value: 6.3, hour: 21 },
  { name: '22:00', value: 4.2, hour: 22 },
  { name: '23:00', value: 2.8, hour: 23 }
];

// Mock table heatmap data (5x5 grid)
export const mockTableHeatmap: HeatmapData[] = [
  // Row 1
  { table: 1, intensity: 25, revenue: 180, orders: 3 },
  { table: 2, intensity: 85, revenue: 520, orders: 8 },
  { table: 3, intensity: 75, revenue: 450, orders: 6 },
  { table: 4, intensity: 40, revenue: 220, orders: 4 },
  { table: 5, intensity: 30, revenue: 160, orders: 2 },
  // Row 2
  { table: 6, intensity: 60, revenue: 380, orders: 5 },
  { table: 7, intensity: 90, revenue: 680, orders: 9 },
  { table: 8, intensity: 100, revenue: 850, orders: 12 },
  { table: 9, intensity: 20, revenue: 120, orders: 2 },
  { table: 10, intensity: 35, revenue: 200, orders: 3 },
  // Row 3
  { table: 11, intensity: 50, revenue: 320, orders: 4 },
  { table: 12, intensity: 80, revenue: 580, orders: 7 },
  { table: 13, intensity: 45, revenue: 280, orders: 4 },
  { table: 14, intensity: 0, revenue: 0, orders: 0 }, // out of order
  { table: 15, intensity: 55, revenue: 350, orders: 5 },
  // Row 4
  { table: 16, intensity: 40, revenue: 240, orders: 3 },
  { table: 17, intensity: 30, revenue: 180, orders: 2 },
  { table: 18, intensity: 65, revenue: 420, orders: 6 },
  { table: 19, intensity: 70, revenue: 480, orders: 7 },
  { table: 20, intensity: 95, revenue: 720, orders: 10 },
  // Row 5
  { table: 21, intensity: 25, revenue: 150, orders: 2 },
  { table: 22, intensity: 35, revenue: 210, orders: 3 },
  { table: 23, intensity: 15, revenue: 90, orders: 1 },
  { table: 24, intensity: 60, revenue: 400, orders: 5 },
  { table: 25, intensity: 45, revenue: 290, orders: 4 }
];

// Helper functions
export const calculateGrowthRate = (current: number, previous: number): number => {
  if (previous === 0) return 0;
  return ((current - previous) / previous) * 100;
};

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
};

export const formatNumber = (value: number): string => {
  return new Intl.NumberFormat('pt-BR').format(value);
};

export const formatPercentage = (value: number): string => {
  return `${value.toFixed(1)}%`;
};

export const getKPIIcon = (id: string): string => {
  const icons = {
    revenue: '💰',
    orders: '📋',
    avg_ticket: '🎫',
    prep_time: '⏱️',
    customer_satisfaction: '⭐',
    tables_occupied: '🪑'
  };
  return icons[id as keyof typeof icons] || '📊';
};

export const getTrendColor = (changeType: 'increase' | 'decrease' | 'neutral'): string => {
  const colors = {
    increase: 'success',
    decrease: 'destructive',
    neutral: 'muted'
  };
  return colors[changeType];
};

export const getHeatmapColor = (intensity: number): string => {
  if (intensity === 0) return 'bg-muted';
  if (intensity <= 20) return 'bg-primary/20';
  if (intensity <= 40) return 'bg-primary/40';
  if (intensity <= 60) return 'bg-primary/60';
  if (intensity <= 80) return 'bg-primary/80';
  return 'bg-primary';
};

export const getBusyHours = (): number[] => {
  return mockSalesByHour
    .filter(hour => hour.value > 1000)
    .map(hour => hour.hour)
    .sort((a, b) => a - b);
};

export const getPeakHour = (): number => {
  return mockSalesByHour.reduce((peak, current) => 
    current.value > peak.value ? current : peak
  ).hour;
};

export const getTotalRevenue = (): number => {
  return mockSalesByHour.reduce((total, hour) => total + hour.value, 0);
};

export const getAverageOrderValue = (): number => {
  const totalRevenue = getTotalRevenue();
  const totalOrders = mockKPIs.find(kpi => kpi.id === 'orders')?.value || 0;
  return totalOrders > 0 ? totalRevenue / totalOrders : 0;
};