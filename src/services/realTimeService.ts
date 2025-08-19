// Real-time service using localStorage and events for cross-tab communication

export interface RealtimeOrder {
  id: string;
  tableNumber: number;
  items: any[];
  status: 'pending' | 'preparing' | 'ready' | 'delivered';
  station: 'kitchen' | 'bar' | 'dessert';
  total: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface RealtimeCall {
  id: string;
  tableNumber: number;
  type: 'water' | 'utensils' | 'bill' | 'assistance' | 'complaint';
  message?: string;
  priority: 'low' | 'normal' | 'high' | 'urgent';
  status: 'pending' | 'attending' | 'resolved';
  createdAt: Date;
}

class RealTimeService {
  private static instance: RealTimeService;
  private listeners: Map<string, Function[]> = new Map();

  private constructor() {
    // Listen to storage changes from other tabs
    window.addEventListener('storage', this.handleStorageChange.bind(this));
    
    // Initialize with empty arrays if not exists
    this.initializeStorage();
  }

  static getInstance(): RealTimeService {
    if (!RealTimeService.instance) {
      RealTimeService.instance = new RealTimeService();
    }
    return RealTimeService.instance;
  }

  private initializeStorage() {
    if (!localStorage.getItem('restaurant_orders')) {
      localStorage.setItem('restaurant_orders', JSON.stringify([]));
    }
    if (!localStorage.getItem('restaurant_calls')) {
      localStorage.setItem('restaurant_calls', JSON.stringify([]));
    }
  }

  private handleStorageChange(e: StorageEvent) {
    if (e.key === 'restaurant_orders') {
      this.emit('orders_updated', this.getOrders());
    }
    if (e.key === 'restaurant_calls') {
      this.emit('calls_updated', this.getCalls());
    }
  }

  // Event system
  on(event: string, callback: Function) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event)!.push(callback);
  }

  off(event: string, callback: Function) {
    const eventListeners = this.listeners.get(event);
    if (eventListeners) {
      const index = eventListeners.indexOf(callback);
      if (index > -1) {
        eventListeners.splice(index, 1);
      }
    }
  }

  private emit(event: string, data: any) {
    const eventListeners = this.listeners.get(event);
    if (eventListeners) {
      eventListeners.forEach(callback => callback(data));
    }
  }

  // Orders management
  getOrders(): RealtimeOrder[] {
    try {
      const orders = JSON.parse(localStorage.getItem('restaurant_orders') || '[]');
      return orders.map((order: any) => ({
        ...order,
        createdAt: new Date(order.createdAt),
        updatedAt: new Date(order.updatedAt)
      }));
    } catch {
      return [];
    }
  }

  addOrder(order: Omit<RealtimeOrder, 'id' | 'createdAt' | 'updatedAt'>): RealtimeOrder {
    const newOrder: RealtimeOrder = {
      ...order,
      id: 'order-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9),
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const orders = this.getOrders();
    orders.push(newOrder);
    localStorage.setItem('restaurant_orders', JSON.stringify(orders));
    
    // Emit to current tab
    this.emit('orders_updated', orders);
    
    // Force storage event for same tab
    window.dispatchEvent(new StorageEvent('storage', {
      key: 'restaurant_orders',
      newValue: JSON.stringify(orders)
    }));

    return newOrder;
  }

  updateOrderStatus(orderId: string, status: RealtimeOrder['status']) {
    const orders = this.getOrders();
    const orderIndex = orders.findIndex(o => o.id === orderId);
    
    if (orderIndex > -1) {
      orders[orderIndex].status = status;
      orders[orderIndex].updatedAt = new Date();
      localStorage.setItem('restaurant_orders', JSON.stringify(orders));
      
      // Emit to current tab
      this.emit('orders_updated', orders);
      
      // Force storage event for same tab
      window.dispatchEvent(new StorageEvent('storage', {
        key: 'restaurant_orders',
        newValue: JSON.stringify(orders)
      }));
    }
  }

  // Calls management
  getCalls(): RealtimeCall[] {
    try {
      const calls = JSON.parse(localStorage.getItem('restaurant_calls') || '[]');
      return calls.map((call: any) => ({
        ...call,
        createdAt: new Date(call.createdAt)
      }));
    } catch {
      return [];
    }
  }

  addCall(call: Omit<RealtimeCall, 'id' | 'createdAt'>): RealtimeCall {
    const newCall: RealtimeCall = {
      ...call,
      id: 'call-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9),
      createdAt: new Date()
    };

    const calls = this.getCalls();
    calls.push(newCall);
    localStorage.setItem('restaurant_calls', JSON.stringify(calls));
    
    // Emit to current tab
    this.emit('calls_updated', calls);
    
    // Force storage event for same tab
    window.dispatchEvent(new StorageEvent('storage', {
      key: 'restaurant_calls',
      newValue: JSON.stringify(calls)
    }));

    return newCall;
  }

  updateCallStatus(callId: string, status: RealtimeCall['status']) {
    const calls = this.getCalls();
    const callIndex = calls.findIndex(c => c.id === callId);
    
    if (callIndex > -1) {
      calls[callIndex].status = status;
      localStorage.setItem('restaurant_calls', JSON.stringify(calls));
      
      // Emit to current tab
      this.emit('calls_updated', calls);
      
      // Force storage event for same tab
      window.dispatchEvent(new StorageEvent('storage', {
        key: 'restaurant_calls',
        newValue: JSON.stringify(calls)
      }));
    }
  }

  // Utility methods
  clearAll() {
    localStorage.removeItem('restaurant_orders');
    localStorage.removeItem('restaurant_calls');
    this.initializeStorage();
    this.emit('orders_updated', []);
    this.emit('calls_updated', []);
  }
}

export const realTimeService = RealTimeService.getInstance();