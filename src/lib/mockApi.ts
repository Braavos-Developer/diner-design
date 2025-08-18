// Mock API with BroadcastChannel for real-time updates
import { generateId, hashPassword, verifyPassword, generateJWT, verifyJWT } from './utils';

// Types
export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  role: 'admin' | 'staff' | 'client';
  scope?: 'kitchen' | 'floor';
  createdAt: Date;
}

export interface Table {
  id: string;
  number: number;
  token: string;
  pin: string;
  qrCode?: string;
  status: 'free' | 'occupied' | 'reserved';
  capacity: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  available: boolean;
  allergens: string[];
  tags: string[];
  preparationTime: number;
}

export interface Order {
  id: string;
  tableId: string;
  items: {
    productId: string;
    quantity: number;
    observations?: string;
    extras?: string[];
  }[];
  status: 'new' | 'preparing' | 'ready' | 'delivered';
  total: number;
  createdAt: Date;
  updatedAt: Date;
  staffId?: string;
}

export interface Call {
  id: string;
  tableId: string;
  reason: 'water' | 'cutlery' | 'bill' | 'help' | 'other';
  message?: string;
  status: 'open' | 'accepted' | 'closed';
  createdAt: Date;
  acceptedBy?: string;
  acceptedAt?: Date;
  closedAt?: Date;
}

export interface Metrics {
  salesByDay: { date: string; amount: number }[];
  averageTicket: number;
  topItems: { productId: string; quantity: number }[];
  averagePrepTime: number;
  callsPerHour: { hour: number; count: number }[];
}

// In-memory database
class MockDatabase {
  private users: User[] = [];
  private tables: Table[] = [];
  private products: Product[] = [];
  private orders: Order[] = [];
  private calls: Call[] = [];
  
  // BroadcastChannels for real-time updates
  private ordersChannel = new BroadcastChannel('orders');
  private callsChannel = new BroadcastChannel('calls');
  private tablesChannel = new BroadcastChannel('tables');

  constructor() {
    this.seedData();
  }

  // Broadcast helpers
  private broadcastOrderUpdate(order: Order) {
    this.ordersChannel.postMessage({ type: 'ORDER_UPDATE', data: order });
  }

  private broadcastCallUpdate(call: Call) {
    this.callsChannel.postMessage({ type: 'CALL_UPDATE', data: call });
  }

  private broadcastTableUpdate(table: Table) {
    this.tablesChannel.postMessage({ type: 'TABLE_UPDATE', data: table });
  }

  // Auth
  async login(email: string, password: string): Promise<{ token: string; user: Omit<User, 'password'> }> {
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
    
    const user = this.users.find(u => u.email === email);
    if (!user || !verifyPassword(password, user.password)) {
      throw new Error('Credenciais inválidas');
    }

    const token = generateJWT({ userId: user.id, role: user.role, scope: user.scope });
    const { password: _, ...userWithoutPassword } = user;
    
    return { token, user: userWithoutPassword };
  }

  async loginTable(tableNumber: number, pin: string): Promise<{ token: string; table: Table }> {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const table = this.tables.find(t => t.number === tableNumber && t.pin === pin);
    if (!table) {
      throw new Error('Mesa ou PIN inválido');
    }

    const token = generateJWT({ tableId: table.id, role: 'client' });
    return { token, table };
  }

  async loginWithQR(tableToken: string): Promise<{ token: string; table: Table }> {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    try {
      const payload = verifyJWT(tableToken);
      const table = this.tables.find(t => t.id === payload.tableId);
      if (!table) {
        throw new Error('Token de mesa inválido');
      }

      const clientToken = generateJWT({ tableId: table.id, role: 'client' });
      return { token: clientToken, table };
    } catch {
      throw new Error('Token de mesa inválido ou expirado');
    }
  }

  // Products
  async getProducts(): Promise<Product[]> {
    await new Promise(resolve => setTimeout(resolve, 200));
    return [...this.products];
  }

  async createProduct(product: Omit<Product, 'id'>): Promise<Product> {
    await new Promise(resolve => setTimeout(resolve, 300));
    const newProduct: Product = { ...product, id: generateId() };
    this.products.push(newProduct);
    return newProduct;
  }

  async updateProduct(id: string, updates: Partial<Product>): Promise<Product> {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = this.products.findIndex(p => p.id === id);
    if (index === -1) throw new Error('Produto não encontrado');
    
    this.products[index] = { ...this.products[index], ...updates };
    return this.products[index];
  }

  async deleteProduct(id: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 200));
    const index = this.products.findIndex(p => p.id === id);
    if (index === -1) throw new Error('Produto não encontrado');
    this.products.splice(index, 1);
  }

  // Tables
  async getTables(): Promise<Table[]> {
    await new Promise(resolve => setTimeout(resolve, 200));
    return [...this.tables];
  }

  async updateTable(id: string, updates: Partial<Table>): Promise<Table> {
    await new Promise(resolve => setTimeout(resolve, 200));
    const index = this.tables.findIndex(t => t.id === id);
    if (index === -1) throw new Error('Mesa não encontrada');
    
    this.tables[index] = { ...this.tables[index], ...updates };
    this.broadcastTableUpdate(this.tables[index]);
    return this.tables[index];
  }

  // Orders
  async getOrders(): Promise<Order[]> {
    await new Promise(resolve => setTimeout(resolve, 200));
    return [...this.orders];
  }

  async createOrder(order: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>): Promise<Order> {
    await new Promise(resolve => setTimeout(resolve, 400));
    const newOrder: Order = {
      ...order,
      id: generateId(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    this.orders.push(newOrder);
    this.broadcastOrderUpdate(newOrder);
    return newOrder;
  }

  async updateOrder(id: string, updates: Partial<Order>): Promise<Order> {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = this.orders.findIndex(o => o.id === id);
    if (index === -1) throw new Error('Pedido não encontrado');
    
    this.orders[index] = { ...this.orders[index], ...updates, updatedAt: new Date() };
    this.broadcastOrderUpdate(this.orders[index]);
    return this.orders[index];
  }

  // Calls
  async getCalls(): Promise<Call[]> {
    await new Promise(resolve => setTimeout(resolve, 200));
    return [...this.calls];
  }

  async createCall(call: Omit<Call, 'id' | 'createdAt'>): Promise<Call> {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Check rate limit - only one open call per table
    const existingCall = this.calls.find(c => c.tableId === call.tableId && c.status === 'open');
    if (existingCall) {
      throw new Error('Já existe uma chamada aberta para esta mesa');
    }
    
    const newCall: Call = {
      ...call,
      id: generateId(),
      createdAt: new Date()
    };
    
    this.calls.push(newCall);
    this.broadcastCallUpdate(newCall);
    return newCall;
  }

  async updateCall(id: string, updates: Partial<Call>): Promise<Call> {
    await new Promise(resolve => setTimeout(resolve, 200));
    const index = this.calls.findIndex(c => c.id === id);
    if (index === -1) throw new Error('Chamada não encontrada');
    
    const updatedCall = { ...this.calls[index], ...updates };
    if (updates.status === 'accepted' && !this.calls[index].acceptedAt) {
      updatedCall.acceptedAt = new Date();
    }
    if (updates.status === 'closed' && !this.calls[index].closedAt) {
      updatedCall.closedAt = new Date();
    }
    
    this.calls[index] = updatedCall;
    this.broadcastCallUpdate(updatedCall);
    return updatedCall;
  }

  // Users
  async getUsers(): Promise<Omit<User, 'password'>[]> {
    await new Promise(resolve => setTimeout(resolve, 200));
    return this.users.map(({ password, ...user }) => user);
  }

  async createUser(user: Omit<User, 'id' | 'createdAt' | 'password'> & { password: string }): Promise<Omit<User, 'password'>> {
    await new Promise(resolve => setTimeout(resolve, 400));
    const newUser: User = {
      ...user,
      id: generateId(),
      password: hashPassword(user.password),
      createdAt: new Date()
    };
    
    this.users.push(newUser);
    const { password: _, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
  }

  // Metrics
  async getMetrics(): Promise<Metrics> {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Generate mock metrics based on orders
    const now = new Date();
    const salesByDay = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      const dayOrders = this.orders.filter(o => 
        o.createdAt.toDateString() === date.toDateString()
      );
      return {
        date: date.toISOString().split('T')[0],
        amount: dayOrders.reduce((sum, o) => sum + o.total, 0)
      };
    }).reverse();

    const averageTicket = this.orders.length > 0 
      ? this.orders.reduce((sum, o) => sum + o.total, 0) / this.orders.length 
      : 0;

    // Mock data for other metrics
    const topItems = [
      { productId: 'prod_1', quantity: 45 },
      { productId: 'prod_2', quantity: 32 },
      { productId: 'prod_3', quantity: 28 },
      { productId: 'prod_4', quantity: 25 },
      { productId: 'prod_5', quantity: 18 }
    ];

    const averagePrepTime = 18; // minutes

    const callsPerHour = Array.from({ length: 24 }, (_, hour) => ({
      hour,
      count: Math.floor(Math.random() * 10)
    }));

    return { salesByDay, averageTicket, topItems, averagePrepTime, callsPerHour };
  }

  // Seed initial data
  private seedData() {
    // Users
    this.users = [
      {
        id: 'user_admin',
        email: 'admin@rest.com',
        password: hashPassword('admin123'),
        name: 'Administrador',
        role: 'admin',
        createdAt: new Date()
      },
      {
        id: 'user_staff_floor',
        email: 'garcom@rest.com',
        password: hashPassword('staff123'),
        name: 'João Silva',
        role: 'staff',
        scope: 'floor',
        createdAt: new Date()
      },
      {
        id: 'user_staff_kitchen',
        email: 'cozinha@rest.com',
        password: hashPassword('kds123'),
        name: 'Maria Santos',
        role: 'staff',
        scope: 'kitchen',
        createdAt: new Date()
      }
    ];

    // Tables
    this.tables = Array.from({ length: 12 }, (_, i) => ({
      id: `table_${i + 1}`,
      number: i + 1,
      token: generateJWT({ tableId: `table_${i + 1}`, exp: Date.now() + 86400000 }),
      pin: String(i + 1).padStart(4, '0'),
      status: i === 6 ? 'occupied' : Math.random() > 0.7 ? 'occupied' : 'free',
      capacity: i < 4 ? 2 : i < 8 ? 4 : 6
    })) as Table[];

    // Special demo table (Mesa 7)
    this.tables[6].pin = '0007';

    // Products
    this.products = [
      {
        id: 'prod_1',
        name: 'Hambúrguer Artesanal',
        description: 'Hambúrguer 200g com queijo, bacon, alface e tomate',
        price: 32.90,
        category: 'Lanches',
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400',
        available: true,
        allergens: ['Glúten', 'Lactose'],
        tags: ['Novo', 'Mais Vendido'],
        preparationTime: 15
      },
      {
        id: 'prod_2',
        name: 'Pizza Margherita',
        description: 'Molho de tomate, mussarela, manjericão e azeite',
        price: 45.00,
        category: 'Pizzas',
        image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400',
        available: true,
        allergens: ['Glúten', 'Lactose'],
        tags: ['Vegetariano'],
        preparationTime: 20
      },
      {
        id: 'prod_3',
        name: 'Salada Caesar',
        description: 'Alface romana, croutons, parmesão e molho caesar',
        price: 28.50,
        category: 'Saladas',
        image: 'https://images.unsplash.com/photo-1551248429-40975aa4de74?w=400',
        available: true,
        allergens: ['Lactose'],
        tags: ['Vegetariano', 'Leve'],
        preparationTime: 8
      },
      {
        id: 'prod_4',
        name: 'Salmão Grelhado',
        description: 'Salmão grelhado com legumes no vapor',
        price: 58.90,
        category: 'Peixes',
        image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400',
        available: true,
        allergens: ['Peixe'],
        tags: ['Premium', 'Sem Glúten'],
        preparationTime: 25
      },
      {
        id: 'prod_5',
        name: 'Coca-Cola 350ml',
        description: 'Refrigerante gelado',
        price: 8.90,
        category: 'Bebidas',
        image: 'https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=400',
        available: true,
        allergens: [],
        tags: [],
        preparationTime: 2
      }
    ];

    // Sample orders
    this.orders = [
      {
        id: 'order_1',
        tableId: 'table_3',
        items: [
          { productId: 'prod_1', quantity: 2 },
          { productId: 'prod_5', quantity: 2 }
        ],
        status: 'preparing',
        total: 83.70,
        createdAt: new Date(Date.now() - 15 * 60 * 1000), // 15 min ago
        updatedAt: new Date(Date.now() - 10 * 60 * 1000)
      },
      {
        id: 'order_2',
        tableId: 'table_7',
        items: [
          { productId: 'prod_2', quantity: 1 },
          { productId: 'prod_3', quantity: 1 }
        ],
        status: 'ready',
        total: 73.50,
        createdAt: new Date(Date.now() - 25 * 60 * 1000), // 25 min ago
        updatedAt: new Date(Date.now() - 5 * 60 * 1000)
      }
    ];
  }
}

// Export singleton instance
export const mockApi = new MockDatabase();