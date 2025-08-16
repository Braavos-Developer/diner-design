// Mock data for orders and KDS

export interface OrderItem {
  id: string;
  menuItemId: string;
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  variations?: {
    id: string;
    name: string;
    price: number;
  }[];
  extras?: {
    id: string;
    name: string;
    price: number;
  }[];
  specialInstructions?: string;
  allergens: string[];
}

export interface Order {
  id: string;
  tableNumber: number;
  tableToken: string;
  status: 'pending' | 'preparing' | 'ready' | 'delivered' | 'cancelled';
  station: 'kitchen' | 'bar' | 'dessert';
  items: OrderItem[];
  subtotal: number;
  serviceCharge: number;
  total: number;
  createdAt: Date;
  updatedAt: Date;
  estimatedTime: number; // minutes
  actualTime?: number; // minutes
  priority: 'low' | 'normal' | 'high' | 'urgent';
  customerNotes?: string;
}

export interface KDSTicket {
  id: string;
  orderId: string;
  tableNumber: number;
  status: 'pending' | 'preparing' | 'ready';
  station: 'kitchen' | 'bar' | 'dessert';
  items: OrderItem[];
  createdAt: Date;
  startedAt?: Date;
  completedAt?: Date;
  estimatedTime: number;
  elapsedTime: number; // calculated in minutes
  isOverdue: boolean;
  priority: 'low' | 'normal' | 'high' | 'urgent';
  specialInstructions?: string;
}

// Mock orders data
export const mockOrders: Order[] = [
  {
    id: 'order-001',
    tableNumber: 7,
    tableToken: 'mesa-7-abc123',
    status: 'preparing',
    station: 'kitchen',
    items: [
      {
        id: 'item-001',
        menuItemId: 'prato-1',
        name: 'Salmão Grelhado com Risotto',
        quantity: 1,
        unitPrice: 89.90,
        totalPrice: 89.90,
        variations: [
          { id: 'var-3', name: 'Risotto de camarão', price: 0 }
        ],
        specialInstructions: 'Salmão mal passado',
        allergens: ['peixe', 'crustáceos', 'lactose']
      },
      {
        id: 'item-002',
        menuItemId: 'entrada-1',
        name: 'Bruschetta Mediterrânea',
        quantity: 2,
        unitPrice: 32.90,
        totalPrice: 65.80,
        extras: [
          { id: 'extra-2', name: 'Rúcula', price: 3.00 }
        ],
        allergens: ['glúten', 'lactose']
      }
    ],
    subtotal: 155.70,
    serviceCharge: 15.57,
    total: 171.27,
    createdAt: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
    updatedAt: new Date(Date.now() - 5 * 60 * 1000),  // 5 minutes ago
    estimatedTime: 25,
    priority: 'normal',
    customerNotes: 'Aniversário - se possível, uma surpresa!'
  },
  {
    id: 'order-002',
    tableNumber: 3,
    tableToken: 'mesa-3-def456',
    status: 'pending',
    station: 'kitchen',
    items: [
      {
        id: 'item-003',
        menuItemId: 'carne-1',
        name: 'Picanha Premium 400g',
        quantity: 1,
        unitPrice: 124.90,
        totalPrice: 124.90,
        variations: [
          { id: 'var-6', name: 'Ao ponto', price: 0 }
        ],
        extras: [
          { id: 'extra-3', name: 'Queijo coalho', price: 12.00 },
          { id: 'extra-4', name: 'Mandioca frita', price: 8.00 }
        ],
        allergens: ['glúten']
      }
    ],
    subtotal: 144.90,
    serviceCharge: 14.49,
    total: 159.39,
    createdAt: new Date(Date.now() - 8 * 60 * 1000), // 8 minutes ago
    updatedAt: new Date(Date.now() - 8 * 60 * 1000),
    estimatedTime: 30,
    priority: 'high'
  },
  {
    id: 'order-003',
    tableNumber: 12,
    tableToken: 'mesa-12-ghi789',
    status: 'ready',
    station: 'bar',
    items: [
      {
        id: 'item-004',
        menuItemId: 'bebida-1',
        name: 'Caipirinha de Maracujá',
        quantity: 2,
        unitPrice: 24.90,
        totalPrice: 49.80,
        allergens: ['álcool']
      },
      {
        id: 'item-005',
        menuItemId: 'bebida-2',
        name: 'Suco Verde Detox',
        quantity: 1,
        unitPrice: 16.90,
        totalPrice: 16.90,
        allergens: []
      }
    ],
    subtotal: 66.70,
    serviceCharge: 6.67,
    total: 73.37,
    createdAt: new Date(Date.now() - 20 * 60 * 1000), // 20 minutes ago
    updatedAt: new Date(Date.now() - 2 * 60 * 1000),  // 2 minutes ago
    estimatedTime: 5,
    actualTime: 18,
    priority: 'normal'
  }
];

// Mock KDS tickets
export const mockKDSTickets: KDSTicket[] = [
  {
    id: 'ticket-001',
    orderId: 'order-001',
    tableNumber: 7,
    status: 'preparing',
    station: 'kitchen',
    items: mockOrders[0].items,
    createdAt: new Date(Date.now() - 15 * 60 * 1000),
    startedAt: new Date(Date.now() - 10 * 60 * 1000),
    estimatedTime: 25,
    elapsedTime: 15,
    isOverdue: false,
    priority: 'normal',
    specialInstructions: 'Salmão mal passado, aniversário!'
  },
  {
    id: 'ticket-002',
    orderId: 'order-002',
    tableNumber: 3,
    status: 'pending',
    station: 'kitchen',
    items: mockOrders[1].items,
    createdAt: new Date(Date.now() - 8 * 60 * 1000),
    estimatedTime: 30,
    elapsedTime: 8,
    isOverdue: false,
    priority: 'high'
  },
  {
    id: 'ticket-003',
    orderId: 'order-003',
    tableNumber: 12,
    status: 'ready',
    station: 'bar',
    items: mockOrders[2].items,
    createdAt: new Date(Date.now() - 20 * 60 * 1000),
    startedAt: new Date(Date.now() - 18 * 60 * 1000),
    completedAt: new Date(Date.now() - 2 * 60 * 1000),
    estimatedTime: 5,
    elapsedTime: 18,
    isOverdue: true,
    priority: 'normal'
  },
  {
    id: 'ticket-004',
    orderId: 'order-004',
    tableNumber: 5,
    status: 'pending',
    station: 'dessert',
    items: [
      {
        id: 'item-006',
        menuItemId: 'sobremesa-1',
        name: 'Petit Gâteau de Chocolate',
        quantity: 2,
        unitPrice: 28.90,
        totalPrice: 57.80,
        allergens: ['glúten', 'lactose', 'ovo']
      }
    ],
    createdAt: new Date(Date.now() - 5 * 60 * 1000),
    estimatedTime: 12,
    elapsedTime: 5,
    isOverdue: false,
    priority: 'normal'
  },
  {
    id: 'ticket-005',
    orderId: 'order-005',
    tableNumber: 9,
    status: 'preparing',
    station: 'kitchen',
    items: [
      {
        id: 'item-007',
        menuItemId: 'massa-1',
        name: 'Linguine alle Vongole',
        quantity: 1,
        unitPrice: 67.90,
        totalPrice: 67.90,
        specialInstructions: 'Extra picante',
        allergens: ['glúten', 'moluscos', 'álcool']
      }
    ],
    createdAt: new Date(Date.now() - 12 * 60 * 1000),
    startedAt: new Date(Date.now() - 8 * 60 * 1000),
    estimatedTime: 20,
    elapsedTime: 12,
    isOverdue: false,
    priority: 'normal',
    specialInstructions: 'Extra picante'
  }
];

// Helper functions
export const getTicketsByStation = (station: string): KDSTicket[] => {
  return mockKDSTickets.filter(ticket => ticket.station === station);
};

export const getTicketsByStatus = (status: string): KDSTicket[] => {
  return mockKDSTickets.filter(ticket => ticket.status === status);
};

export const getOverdueTickets = (): KDSTicket[] => {
  return mockKDSTickets.filter(ticket => ticket.isOverdue);
};

export const calculateElapsedTime = (createdAt: Date): number => {
  return Math.floor((Date.now() - createdAt.getTime()) / (1000 * 60));
};

export const formatElapsedTime = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  
  if (hours > 0) {
    return `${hours}h ${mins.toString().padStart(2, '0')}m`;
  }
  return `${mins}m`;
};