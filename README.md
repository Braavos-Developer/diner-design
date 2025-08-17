# RestaurantOS - Sistema Completo de Gestão

Sistema moderno e completo para gestão de restaurantes com cardápio digital, KDS, gestão de mesas e muito mais.

## 🚀 Funcionalidades

### Para Clientes
- **Cardápio Digital** (`/m/:token`): Interface responsiva com categorias, busca, carrinho e pedidos
- QR Code único por mesa para acesso direto
- Sistema de carrinho com cálculo automático de totais
- Visualização detalhada de produtos com alérgenos e tempo de preparo
- Botão para chamar garçom integrado

### Para Cozinha (KDS)
- **Kitchen Display System** (`/kds`): Board em tempo real com colunas (Pendente, Em Preparo, Pronto)
- Tickets com informações completas do pedido
- Filtros por estação (cozinha, bar, sobremesas)
- Alertas visuais para pedidos em atraso
- Cronômetro automático por ticket

### Para Staff/Garçons
- **Gestão de Salão** (`/staff`): Overview completo das mesas
- Status em tempo real: livre, ocupada, precisa atendimento
- Sistema de chamadas de garçom com SLA
- Visão em grid ou lista das mesas
- Detalhes de comandas abertas

### Para Administração
- **Catálogo de Produtos** (`/admin/products`): CRUD completo de itens do menu
- Formulário avançado com categorias, tags, alérgenos, variações
- **Gerador de QR Codes** (`/admin/qr-codes`): Criação automática de códigos para mesas
- Upload de imagens e gestão de disponibilidade
- Sistema de flags (novo, mais vendido, vegetariano, etc.)

### Dashboard Executivo
- **Analytics** (`/dashboard`): KPIs principais de vendas e operação
- Gráficos de performance com dados em tempo real
- Métricas de tempo de atendimento e satisfação
- Visão consolidada do negócio

## 🎨 Design System

O sistema conta com um **Design System completo** (`/design-system`) com:

### Tokens de Design
- Paleta de cores terra-cotta/amber moderna
- Tipografia escalonada (12px-40px)
- Espaçamento consistente (4/8/12/16px)
- Radius personalizados (md, xl, 2xl)
- Sombras elegantes e gradientes

### Componentes
- **Átomos**: Button, Card, Badge, Input, etc.
- **Moléculas**: ProductCard, KDSTicket, TableTile, CategoryTabs
- **Organismos**: Layouts completos e seções especializadas

### Funcionalidades do Design
- Tema claro/escuro automático
- Responsive design mobile-first  
- Microinterações suaves (120-180ms)
- Acessibilidade (ARIA, navegação por teclado)
- Sistema de tokens semânticos

## 🛠️ Stack Tecnológica

- **React 18** + TypeScript
- **Vite** para build ultrarrápido
- **TailwindCSS** + **shadcn/ui** para UI
- **Radix UI** para acessibilidade
- **Framer Motion** para animações
- **Recharts** para gráficos
- **React Router** para navegação
- **Lucide React** para ícones

## 📱 Responsividade

- **Mobile-first**: Otimizado para smartphones e tablets
- **Desktop**: Layouts adaptados para telas maiores
- **Touch-friendly**: Botões e áreas de toque adequadas
- **Performance**: Loading otimizado e lazy loading de imagens

## 🔧 Como Executar

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn installed

### Instalação
```bash
# Execute o servidor de desenvolvimento
npm run dev
```

### Scripts Disponíveis
```bash
npm run dev          # Servidor de desenvolvimento
npm run build        # Build para produção  
npm run preview      # Preview do build
npm run lint         # Verificação de código
```

## 📂 Estrutura do Projeto

```
src/
├── components/           # Componentes shadcn/ui
├── design/              # Design System
│   ├── tokens.ts        # Tokens de design
│   └── components/      # Componentes customizados
│       ├── atoms/       # Button, Card, Badge
│       └── molecules/   # ProductCard, KDSTicket
├── mocks/              # Dados mockados
│   ├── menu.ts         # Cardápio e produtos
│   ├── orders.ts       # Pedidos e tickets KDS
│   ├── tables.ts       # Mesas e chamadas
│   └── dashboard.ts    # Métricas e KPIs  
├── pages/              # Páginas da aplicação
└── hooks/              # Hooks personalizados
```

## 🎯 Funcionalidades Implementadas

✅ **Sistema completo local-first** (sem backend necessário)  
✅ **Design responsivo** e acessível  
✅ **Tema claro/escuro** automático  
✅ **Navegação intuitiva** entre módulos  
✅ **Mocks realistas** para demonstração  
✅ **Microinterações** e feedback visual  
✅ **Performance otimizada** (lazy loading, code splitting)  
✅ **TypeScript** completo com tipagem rigorosa  

## 🚀 Próximos Passos

Para implementação em produção, considere:

- **Backend Integration**: APIs para persistência de dados
- **Sistema de Autenticação**: Login/logout para staff e admin  
- **Notificações Push**: Alertas em tempo real
- **Sistema de Pagamento**: Integração com gateways
- **Relatórios Avançados**: Exports e analytics detalhados
- **PWA**: Instalação como app nativo
- **Sincronização Offline**: Funcionalidade offline-first

---

**RestaurantOS** - Tecnologia moderna para a gestão completa do seu restaurante. 🍽️✨

## Project info

**URL**: https://lovable.dev/projects/f9f89cd5-aff5-4067-93d6-f7577e708c36

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/f9f89cd5-aff5-4067-93d6-f7577e708c36) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/f9f89cd5-aff5-4067-93d6-f7577e708c36) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
