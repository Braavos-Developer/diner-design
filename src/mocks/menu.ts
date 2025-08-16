// Mock data for restaurant menu

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  tags: string[];
  allergens: string[];
  isNew?: boolean;
  isBestSeller?: boolean;
  isVegetarian?: boolean;
  isVegan?: boolean;
  isGlutenFree?: boolean;
  spicyLevel?: 1 | 2 | 3;
  preparationTime: number; // minutes
  calories?: number;
  variations?: {
    id: string;
    name: string;
    priceModifier: number;
  }[];
  extras?: {
    id: string;
    name: string;
    price: number;
    category: 'sauce' | 'side' | 'protein' | 'topping';
  }[];
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  icon: string;
  order: number;
}

export const categories: Category[] = [
  {
    id: 'entradas',
    name: 'Entradas',
    description: 'Para começar bem',
    icon: '🥗',
    order: 1
  },
  {
    id: 'pratos',
    name: 'Pratos Principais',
    description: 'Nossos melhores pratos',
    icon: '🍽️',
    order: 2
  },
  {
    id: 'massas',
    name: 'Massas',
    description: 'Frescas e artesanais',
    icon: '🍝',
    order: 3
  },
  {
    id: 'carnes',
    name: 'Carnes',
    description: 'Grelhadas na perfeição',
    icon: '🥩',
    order: 4
  },
  {
    id: 'bebidas',
    name: 'Bebidas',
    description: 'Refrescantes e especiais',
    icon: '🥤',
    order: 5
  },
  {
    id: 'sobremesas',
    name: 'Sobremesas',
    description: 'Finalize com doçura',
    icon: '🍰',
    order: 6
  }
];

export const menuItems: MenuItem[] = [
  // Entradas
  {
    id: 'entrada-1',
    name: 'Bruschetta Mediterrânea',
    description: 'Pão artesanal com tomate confitado, mussarela de búfala, manjericão fresco e azeite extra virgem',
    price: 32.90,
    image: 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=400&h=300&fit=crop',
    category: 'entradas',
    tags: ['vegetariano', 'mediterrâneo'],
    allergens: ['glúten', 'lactose'],
    isNew: true,
    isVegetarian: true,
    preparationTime: 8,
    calories: 280,
    extras: [
      { id: 'extra-1', name: 'Queijo extra', price: 5.00, category: 'topping' },
      { id: 'extra-2', name: 'Rúcula', price: 3.00, category: 'topping' }
    ]
  },
  {
    id: 'entrada-2',
    name: 'Coxinha de Costela',
    description: 'Nossa famosa coxinha recheada com costela desfiada e catupiry, empanada na hora',
    price: 18.90,
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop',
    category: 'entradas',
    tags: ['tradicional', 'frito'],
    allergens: ['glúten', 'lactose', 'ovo'],
    isBestSeller: true,
    preparationTime: 12,
    calories: 350,
    variations: [
      { id: 'var-1', name: 'Tradicional (2 unidades)', priceModifier: 0 },
      { id: 'var-2', name: 'Combo (4 unidades)', priceModifier: 14.00 }
    ]
  },

  // Pratos Principais
  {
    id: 'prato-1',
    name: 'Salmão Grelhado com Risotto',
    description: 'Filé de salmão grelhado com ervas finas, acompanhado de risotto de camarão e legumes salteados',
    price: 89.90,
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop',
    category: 'pratos',
    tags: ['peixe', 'gourmet'],
    allergens: ['peixe', 'crustáceos', 'lactose'],
    isBestSeller: true,
    preparationTime: 25,
    calories: 650,
    variations: [
      { id: 'var-3', name: 'Risotto de camarão', priceModifier: 0 },
      { id: 'var-4', name: 'Risotto de cogumelos', priceModifier: -5.00 }
    ]
  },
  {
    id: 'prato-2',
    name: 'Bowl Vegano Power',
    description: 'Quinoa, grão-de-bico, abacate, tomate cereja, pepino, brócolis no vapor e tahine',
    price: 42.90,
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop',
    category: 'pratos',
    tags: ['vegano', 'saudável', 'bowl'],
    allergens: ['gergelim'],
    isVegan: true,
    isGlutenFree: true,
    preparationTime: 15,
    calories: 420
  },

  // Massas
  {
    id: 'massa-1',
    name: 'Linguine alle Vongole',
    description: 'Massa fresca com moluscos, alho, vinho branco, salsa e pimenta calabresa',
    price: 67.90,
    image: 'https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?w=400&h=300&fit=crop',
    category: 'massas',
    tags: ['italiana', 'frutos-do-mar'],
    allergens: ['glúten', 'moluscos', 'álcool'],
    spicyLevel: 2,
    preparationTime: 20,
    calories: 580
  },
  {
    id: 'massa-2',
    name: 'Gnocchi de Abóbora',
    description: 'Nhoque artesanal de abóbora com molho de gorgonzola, nozes e sálvia',
    price: 54.90,
    image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=400&h=300&fit=crop',
    category: 'massas',
    tags: ['italiana', 'vegetariano'],
    allergens: ['glúten', 'lactose', 'nozes'],
    isVegetarian: true,
    preparationTime: 18,
    calories: 520
  },

  // Carnes
  {
    id: 'carne-1',
    name: 'Picanha Premium 400g',
    description: 'Picanha maturada grelhada no ponto, acompanha farofa, vinagrete e pão de alho',
    price: 124.90,
    image: 'https://images.unsplash.com/photo-1558030006-450675393462?w=400&h=300&fit=crop',
    category: 'carnes',
    tags: ['churrasco', 'premium'],
    allergens: ['glúten'],
    isBestSeller: true,
    preparationTime: 30,
    calories: 850,
    variations: [
      { id: 'var-5', name: 'Mal passada', priceModifier: 0 },
      { id: 'var-6', name: 'Ao ponto', priceModifier: 0 },
      { id: 'var-7', name: 'Bem passada', priceModifier: 0 }
    ],
    extras: [
      { id: 'extra-3', name: 'Queijo coalho', price: 12.00, category: 'side' },
      { id: 'extra-4', name: 'Mandioca frita', price: 8.00, category: 'side' }
    ]
  },

  // Bebidas
  {
    id: 'bebida-1',
    name: 'Caipirinha de Maracujá',
    description: 'Cachaça artesanal, maracujá fresco, açúcar mascavo e gelo',
    price: 24.90,
    image: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=400&h=300&fit=crop',
    category: 'bebidas',
    tags: ['coquetéis', 'tradicional'],
    allergens: ['álcool'],
    preparationTime: 5,
    calories: 180
  },
  {
    id: 'bebida-2',
    name: 'Suco Verde Detox',
    description: 'Couve, maçã verde, gengibre, limão e água de coco',
    price: 16.90,
    image: 'https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=400&h=300&fit=crop',
    category: 'bebidas',
    tags: ['saudável', 'detox', 'sem açúcar'],
    allergens: [],
    isVegan: true,
    isGlutenFree: true,
    preparationTime: 3,
    calories: 85
  },

  // Sobremesas
  {
    id: 'sobremesa-1',
    name: 'Petit Gâteau de Chocolate',
    description: 'Bolinho quente de chocolate com recheio cremoso, acompanha sorvete de baunilha',
    price: 28.90,
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&h=300&fit=crop',
    category: 'sobremesas',
    tags: ['chocolate', 'quente'],
    allergens: ['glúten', 'lactose', 'ovo'],
    isBestSeller: true,
    preparationTime: 12,
    calories: 420
  },
  {
    id: 'sobremesa-2',
    name: 'Tiramisù da Casa',
    description: 'Receita tradicional italiana com café espresso, mascarpone e cacau',
    price: 26.90,
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop',
    category: 'sobremesas',
    tags: ['italiano', 'café'],
    allergens: ['glúten', 'lactose', 'ovo', 'álcool'],
    preparationTime: 8,
    calories: 380
  }
];

// Helper functions
export const getItemsByCategory = (categoryId: string): MenuItem[] => {
  return menuItems.filter(item => item.category === categoryId);
};

export const getItemById = (id: string): MenuItem | undefined => {
  return menuItems.find(item => item.id === id);
};

export const filterItemsByTags = (items: MenuItem[], tags: string[]): MenuItem[] => {
  if (tags.length === 0) return items;
  return items.filter(item => 
    tags.some(tag => item.tags.includes(tag))
  );
};

export const getNewItems = (): MenuItem[] => {
  return menuItems.filter(item => item.isNew);
};

export const getBestSellers = (): MenuItem[] => {
  return menuItems.filter(item => item.isBestSeller);
};