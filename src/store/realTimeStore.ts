import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

interface Order {
  id: string;
  tableId: string;
  status: 'new' | 'preparing' | 'ready' | 'delivered';
  items: any[];
  total: number;
  createdAt: Date;
  updatedAt: Date;
}

interface Call {
  id: string;
  tableId: string;
  reason: string;
  status: 'open' | 'accepted' | 'closed';
  createdAt: Date;
  acceptedBy?: string;
}

interface Table {
  id: string;
  number: number;
  status: 'free' | 'occupied' | 'reserved';
}

interface RealTimeState {
  orders: Order[];
  calls: Call[];
  tables: Table[];
  soundEnabled: boolean;
}

interface RealTimeActions {
  setOrders: (orders: Order[]) => void;
  setCalls: (calls: Call[]) => void;
  setTables: (tables: Table[]) => void;
  updateOrder: (order: Order) => void;
  updateCall: (call: Call) => void;
  updateTable: (table: Table) => void;
  toggleSound: () => void;
  playNotificationSound: () => void;
}

export const useRealTimeStore = create<RealTimeState & RealTimeActions>()(
  subscribeWithSelector((set, get) => ({
    // State
    orders: [],
    calls: [],
    tables: [],
    soundEnabled: true,

    // Actions
    setOrders: (orders) => set({ orders }),
    setCalls: (calls) => set({ calls }),
    setTables: (tables) => set({ tables }),

    updateOrder: (order) => {
      set((state) => ({
        orders: state.orders.map(o => o.id === order.id ? order : o)
      }));
    },

    updateCall: (call) => {
      const { calls, soundEnabled } = get();
      const existingCall = calls.find(c => c.id === call.id);
      
      set((state) => ({
        calls: state.calls.map(c => c.id === call.id ? call : c)
      }));

      // Play sound for new calls
      if (!existingCall && call.status === 'open' && soundEnabled) {
        get().playNotificationSound();
      }
    },

    updateTable: (table) => {
      set((state) => ({
        tables: state.tables.map(t => t.id === table.id ? table : t)
      }));
    },

    toggleSound: () => {
      set((state) => ({ soundEnabled: !state.soundEnabled }));
    },

    playNotificationSound: () => {
      try {
        // Create audio context for notification sound
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.frequency.setValueAtTime(400, audioContext.currentTime + 0.1);
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.5);
      } catch (error) {
        console.warn('Could not play notification sound:', error);
      }
    }
  }))
);

// BroadcastChannel listeners
let ordersChannel: BroadcastChannel | null = null;
let callsChannel: BroadcastChannel | null = null;
let tablesChannel: BroadcastChannel | null = null;

export function initializeRealTime() {
  // Initialize BroadcastChannels
  try {
    ordersChannel = new BroadcastChannel('orders');
    callsChannel = new BroadcastChannel('calls');
    tablesChannel = new BroadcastChannel('tables');

    ordersChannel.onmessage = (event) => {
      if (event.data.type === 'ORDER_UPDATE') {
        useRealTimeStore.getState().updateOrder(event.data.data);
      }
    };

    callsChannel.onmessage = (event) => {
      if (event.data.type === 'CALL_UPDATE') {
        useRealTimeStore.getState().updateCall(event.data.data);
      }
    };

    tablesChannel.onmessage = (event) => {
      if (event.data.type === 'TABLE_UPDATE') {
        useRealTimeStore.getState().updateTable(event.data.data);
      }
    };
  } catch (error) {
    console.warn('BroadcastChannel not supported, falling back to polling');
    
    // Fallback: polling every 2 seconds
    setInterval(() => {
      // In a real app, you'd fetch updates from the server here
      // For now, we'll just update from the mock API periodically
    }, 2000);
  }
}

export function cleanupRealTime() {
  if (ordersChannel) {
    ordersChannel.close();
    ordersChannel = null;
  }
  if (callsChannel) {
    callsChannel.close();
    callsChannel = null;
  }
  if (tablesChannel) {
    tablesChannel.close();
    tablesChannel = null;
  }
}