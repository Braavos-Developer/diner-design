// Mock data for tables and staff operations

export interface Table {
  id: string;
  number: number;
  capacity: number;
  status: 'available' | 'occupied' | 'reserved' | 'needs_service' | 'needs_cleaning' | 'out_of_order';
  section: string;
  position: {
    x: number;
    y: number;
  };
  currentOrder?: {
    id: string;
    total: number;
    startTime: Date;
    itemCount: number;
  };
  lastService?: Date;
  qrToken: string;
}

export interface WaiterCall {
  id: string;
  tableNumber: number;
  type: 'water' | 'utensils' | 'bill' | 'assistance' | 'complaint' | 'order_ready';
  message?: string;
  priority: 'low' | 'normal' | 'high' | 'urgent';
  status: 'pending' | 'attending' | 'resolved';
  createdAt: Date;
  respondedAt?: Date;
  resolvedAt?: Date;
  assignedWaiterId?: string;
  estimatedResponseTime: number; // minutes
  elapsedTime: number; // calculated
}

export interface Staff {
  id: string;
  name: string;
  role: 'waiter' | 'bartender' | 'chef' | 'manager';
  status: 'available' | 'busy' | 'break' | 'offline';
  assignedSection?: string;
  avatar?: string;
}

// Mock tables data (5x5 grid layout)
export const mockTables: Table[] = [
  // Row 1
  {
    id: 'table-01',
    number: 1,
    capacity: 2,
    status: 'available',
    section: 'A',
    position: { x: 1, y: 1 },
    qrToken: 'mesa-1-qr001'
  },
  {
    id: 'table-02',
    number: 2,
    capacity: 4,
    status: 'occupied',
    section: 'A',
    position: { x: 2, y: 1 },
    currentOrder: {
      id: 'order-001',
      total: 171.27,
      startTime: new Date(Date.now() - 45 * 60 * 1000), // 45 minutes ago
      itemCount: 3
    },
    qrToken: 'mesa-2-qr002'
  },
  {
    id: 'table-03',
    number: 3,
    capacity: 4,
    status: 'occupied',
    section: 'A',
    position: { x: 3, y: 1 },
    currentOrder: {
      id: 'order-002',
      total: 159.39,
      startTime: new Date(Date.now() - 25 * 60 * 1000), // 25 minutes ago
      itemCount: 1
    },
    qrToken: 'mesa-3-qr003'
  },
  {
    id: 'table-04',
    number: 4,
    capacity: 6,
    status: 'needs_service',
    section: 'A',
    position: { x: 4, y: 1 },
    qrToken: 'mesa-4-qr004'
  },
  {
    id: 'table-05',
    number: 5,
    capacity: 2,
    status: 'available',
    section: 'A',
    position: { x: 5, y: 1 },
    qrToken: 'mesa-5-qr005'
  },
  // Row 2
  {
    id: 'table-06',
    number: 6,
    capacity: 4,
    status: 'reserved',
    section: 'B',
    position: { x: 1, y: 2 },
    qrToken: 'mesa-6-qr006'
  },
  {
    id: 'table-07',
    number: 7,
    capacity: 4,
    status: 'occupied',
    section: 'B',
    position: { x: 2, y: 2 },
    currentOrder: {
      id: 'order-003',
      total: 73.37,
      startTime: new Date(Date.now() - 60 * 60 * 1000), // 1 hour ago
      itemCount: 2
    },
    qrToken: 'mesa-7-qr007'
  },
  {
    id: 'table-08',
    number: 8,
    capacity: 8,
    status: 'occupied',
    section: 'B',
    position: { x: 3, y: 2 },
    currentOrder: {
      id: 'order-004',
      total: 342.80,
      startTime: new Date(Date.now() - 35 * 60 * 1000), // 35 minutes ago
      itemCount: 6
    },
    qrToken: 'mesa-8-qr008'
  },
  {
    id: 'table-09',
    number: 9,
    capacity: 4,
    status: 'needs_cleaning',
    section: 'B',
    position: { x: 4, y: 2 },
    lastService: new Date(Date.now() - 10 * 60 * 1000), // 10 minutes ago
    qrToken: 'mesa-9-qr009'
  },
  {
    id: 'table-10',
    number: 10,
    capacity: 2,
    status: 'available',
    section: 'B',
    position: { x: 5, y: 2 },
    qrToken: 'mesa-10-qr010'
  },
  // Row 3
  {
    id: 'table-11',
    number: 11,
    capacity: 6,
    status: 'available',
    section: 'C',
    position: { x: 1, y: 3 },
    qrToken: 'mesa-11-qr011'
  },
  {
    id: 'table-12',
    number: 12,
    capacity: 4,
    status: 'occupied',
    section: 'C',
    position: { x: 2, y: 3 },
    currentOrder: {
      id: 'order-005',
      total: 89.50,
      startTime: new Date(Date.now() - 20 * 60 * 1000), // 20 minutes ago
      itemCount: 2
    },
    qrToken: 'mesa-12-qr012'
  },
  {
    id: 'table-13',
    number: 13,
    capacity: 4,
    status: 'available',
    section: 'C',
    position: { x: 3, y: 3 },
    qrToken: 'mesa-13-qr013'
  },
  {
    id: 'table-14',
    number: 14,
    capacity: 2,
    status: 'out_of_order',
    section: 'C',
    position: { x: 4, y: 3 },
    qrToken: 'mesa-14-qr014'
  },
  {
    id: 'table-15',
    number: 15,
    capacity: 4,
    status: 'available',
    section: 'C',
    position: { x: 5, y: 3 },
    qrToken: 'mesa-15-qr015'
  },
  // Row 4
  {
    id: 'table-16',
    number: 16,
    capacity: 2,
    status: 'reserved',
    section: 'D',
    position: { x: 1, y: 4 },
    qrToken: 'mesa-16-qr016'
  },
  {
    id: 'table-17',
    number: 17,
    capacity: 4,
    status: 'available',
    section: 'D',
    position: { x: 2, y: 4 },
    qrToken: 'mesa-17-qr017'
  },
  {
    id: 'table-18',
    number: 18,
    capacity: 6,
    status: 'needs_service',
    section: 'D',
    position: { x: 3, y: 4 },
    qrToken: 'mesa-18-qr018'
  },
  {
    id: 'table-19',
    number: 19,
    capacity: 4,
    status: 'available',
    section: 'D',
    position: { x: 4, y: 4 },
    qrToken: 'mesa-19-qr019'
  },
  {
    id: 'table-20',
    number: 20,
    capacity: 8,
    status: 'occupied',
    section: 'D',
    position: { x: 5, y: 4 },
    currentOrder: {
      id: 'order-006',
      total: 245.60,
      startTime: new Date(Date.now() - 40 * 60 * 1000), // 40 minutes ago
      itemCount: 4
    },
    qrToken: 'mesa-20-qr020'
  },
  // Row 5
  {
    id: 'table-21',
    number: 21,
    capacity: 2,
    status: 'available',
    section: 'E',
    position: { x: 1, y: 5 },
    qrToken: 'mesa-21-qr021'
  },
  {
    id: 'table-22',
    number: 22,
    capacity: 4,
    status: 'available',
    section: 'E',
    position: { x: 2, y: 5 },
    qrToken: 'mesa-22-qr022'
  },
  {
    id: 'table-23',
    number: 23,
    capacity: 4,
    status: 'needs_cleaning',
    section: 'E',
    position: { x: 3, y: 5 },
    lastService: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
    qrToken: 'mesa-23-qr023'
  },
  {
    id: 'table-24',
    number: 24,
    capacity: 6,
    status: 'available',
    section: 'E',
    position: { x: 4, y: 5 },
    qrToken: 'mesa-24-qr024'
  },
  {
    id: 'table-25',
    number: 25,
    capacity: 4,
    status: 'available',
    section: 'E',
    position: { x: 5, y: 5 },
    qrToken: 'mesa-25-qr025'
  }
];

// Mock waiter calls
export const mockWaiterCalls: WaiterCall[] = [
  {
    id: 'call-001',
    tableNumber: 4,
    type: 'water',
    priority: 'normal',
    status: 'pending',
    createdAt: new Date(Date.now() - 3 * 60 * 1000), // 3 minutes ago
    estimatedResponseTime: 5,
    elapsedTime: 3
  },
  {
    id: 'call-002',
    tableNumber: 7,
    type: 'bill',
    priority: 'high',
    status: 'attending',
    createdAt: new Date(Date.now() - 8 * 60 * 1000), // 8 minutes ago
    respondedAt: new Date(Date.now() - 2 * 60 * 1000), // 2 minutes ago
    assignedWaiterId: 'waiter-001',
    estimatedResponseTime: 3,
    elapsedTime: 8
  },
  {
    id: 'call-003',
    tableNumber: 18,
    type: 'assistance',
    message: 'Cliente precisa de ajuda com alergia alimentar',
    priority: 'urgent',
    status: 'pending',
    createdAt: new Date(Date.now() - 1 * 60 * 1000), // 1 minute ago
    estimatedResponseTime: 2,
    elapsedTime: 1
  },
  {
    id: 'call-004',
    tableNumber: 12,
    type: 'order_ready',
    priority: 'high',
    status: 'resolved',
    createdAt: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
    respondedAt: new Date(Date.now() - 12 * 60 * 1000), // 12 minutes ago
    resolvedAt: new Date(Date.now() - 10 * 60 * 1000), // 10 minutes ago
    assignedWaiterId: 'waiter-002',
    estimatedResponseTime: 2,
    elapsedTime: 15
  },
  {
    id: 'call-005',
    tableNumber: 20,
    type: 'utensils',
    priority: 'low',
    status: 'pending',
    createdAt: new Date(Date.now() - 6 * 60 * 1000), // 6 minutes ago
    estimatedResponseTime: 8,
    elapsedTime: 6
  }
];

// Mock staff
export const mockStaff: Staff[] = [
  {
    id: 'waiter-001',
    name: 'Ana Silva',
    role: 'waiter',
    status: 'busy',
    assignedSection: 'A',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=64&h=64&fit=crop&crop=face'
  },
  {
    id: 'waiter-002',
    name: 'Carlos Santos',
    role: 'waiter',
    status: 'available',
    assignedSection: 'B',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face'
  },
  {
    id: 'waiter-003',
    name: 'Maria Oliveira',
    role: 'waiter',
    status: 'available',
    assignedSection: 'C',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face'
  },
  {
    id: 'bartender-001',
    name: 'João Costa',
    role: 'bartender',
    status: 'available',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face'
  },
  {
    id: 'chef-001',
    name: 'Pedro Ferreira',
    role: 'chef',
    status: 'busy',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=64&h=64&fit=crop&crop=face'
  },
  {
    id: 'manager-001',
    name: 'Laura Mendes',
    role: 'manager',
    status: 'available',
    avatar: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?w=64&h=64&fit=crop&crop=face'
  }
];

// Helper functions
export const getTableByNumber = (number: number): Table | undefined => {
  return mockTables.find(table => table.number === number);
};

export const getTablesByStatus = (status: Table['status']): Table[] => {
  return mockTables.filter(table => table.status === status);
};

export const getTablesBySection = (section: string): Table[] => {
  return mockTables.filter(table => table.section === section);
};

export const getPendingCalls = (): WaiterCall[] => {
  return mockWaiterCalls.filter(call => call.status === 'pending');
};

export const getCallsByPriority = (priority: WaiterCall['priority']): WaiterCall[] => {
  return mockWaiterCalls.filter(call => call.priority === priority);
};

export const getOverdueCalls = (): WaiterCall[] => {
  return mockWaiterCalls.filter(call => 
    call.elapsedTime > call.estimatedResponseTime && call.status === 'pending'
  );
};

export const getAvailableStaff = (): Staff[] => {
  return mockStaff.filter(staff => staff.status === 'available');
};

export const getStaffBySection = (section: string): Staff[] => {
  return mockStaff.filter(staff => staff.assignedSection === section);
};

export const formatCallElapsedTime = (minutes: number): string => {
  if (minutes < 60) {
    return `${minutes}min`;
  }
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins.toString().padStart(2, '0')}min`;
};

export const getTableStatusColor = (status: Table['status']): string => {
  const colors = {
    'available': 'success',
    'occupied': 'primary',
    'reserved': 'accent',
    'needs_service': 'warning',
    'needs_cleaning': 'muted',
    'out_of_order': 'destructive'
  };
  return colors[status] || 'muted';
};

export const getCallPriorityColor = (priority: WaiterCall['priority']): string => {
  const colors = {
    'low': 'muted',
    'normal': 'primary',
    'high': 'warning',
    'urgent': 'destructive'
  };
  return colors[priority] || 'primary';
};