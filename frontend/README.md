# YaYa Wallet Dashboard

A modern, responsive React frontend for the YaYa Wallet transaction management system. Built with TypeScript, Tailwind CSS, and React Router for a seamless user experience across all devices.

## Features

### 🏦 Transaction Management
- **Real-time Transaction History**: View all transactions with proper pagination and search functionality
- **Transaction Direction Indicators**: Visual indicators for incoming (green ↓) and outgoing (red ↑) transactions
- **Smart Transaction Detection**: Automatically identifies transaction direction based on current user account
- **Top-up Transaction Support**: Special handling for self-transactions (top-ups) marked as incoming

### 🎨 Modern UI/UX
- **Dark/Light Mode**: System preference detection with manual toggle
- **Responsive Design**: Optimized for mobile, tablet, and desktop screens
- **Professional Styling**: Clean, modern interface with consistent color scheme
- **Loading States**: Skeleton screens and loading indicators for better UX

### 📊 Dashboard Features
- **Balance Overview**: Real-time balance display with currency formatting
- **Recent Activity**: Quick view of latest transactions with "View All" navigation
- **Quick Actions**: Easy access to transfer and other wallet operations
- **Transaction Search**: Real-time search across sender, receiver, cause, and transaction ID

### 🔧 Technical Features
- **TypeScript**: Full type safety with proper interfaces and type definitions
- **API Integration**: Seamless connection to YaYa Wallet backend API
- **Error Handling**: Graceful fallback to mock data when API is unavailable
- **Security**: Environment variable management for API credentials
- **Performance**: Optimized rendering with proper state management

## Project Structure

\`\`\`
src/
├── api/                    # API integration and data fetching
│   └── transactions.ts     # Transaction API with type definitions
├── components/             # Reusable UI components
│   ├── dashboard/          # Dashboard-specific components
│   │   ├── BalanceCard.tsx
│   │   ├── QuickActions.tsx
│   │   └── RecentTransactions.tsx
│   ├── layout/             # Layout components
│   │   ├── Header.tsx
│   │   ├── Layout.tsx
│   │   └── Sidebar.tsx
│   ├── pagination/         # Pagination component
│   │   └── Pagination.tsx
│   ├── search/             # Search functionality
│   │   └── SearchBar.tsx
│   └── table/              # Table components
│       └── TransactionTable.tsx
├── contexts/               # React contexts
│   └── ThemeContext.tsx    # Theme management
├── hooks/                  # Custom React hooks
│   ├── useSearchParam.ts   # URL search parameter management
│   └── useTheme.ts         # Theme hook
├── pages/                  # Page components
│   ├── Dashboard.tsx       # Main dashboard
│   ├── History.tsx         # Transaction history
│   ├── Profile.tsx         # User profile
│   ├── Settings.tsx        # App settings
│   └── Transfer.tsx        # Money transfer
└── App.tsx                 # Main app component with routing
\`\`\`

## Installation & Setup

### Prerequisites
- Node.js 18+ and npm/yarn
- YaYa Wallet backend API running on localhost:5000

### Environment Variables
Create a `.env` file in the root directory:
\`\`\`env
VITE_API_BASE_URL=http://localhost:5000
\`\`\`

### Installation
\`\`\`bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
\`\`\`

## API Integration

### Transaction Interface
\`\`\`typescript
interface Transaction {
  id: string
  sender: string | TransactionParty
  receiver: string | TransactionParty
  amount: number
  currency: string
  cause: string
  created_at: string
}

interface TransactionParty {
  name: string
  account: string
}
\`\`\`

### API Endpoints
- `GET /transactions?p={page}` - Fetch paginated transactions
- `GET /search?q={query}&p={page}` - Search transactions

### Transaction Direction Logic
- **Incoming**: Receiver account matches current user OR sender equals receiver (top-up)
- **Outgoing**: Sender account matches current user
- **Visual Indicators**: Green ↓ for incoming, Red ↑ for outgoing

## Component Architecture

### Core Components

#### TransactionTable
- Displays transactions in a responsive table format
- Handles transaction direction indicators
- Supports pagination and search
- Mobile-optimized with proper column priorities

#### RecentTransactions
- Shows latest 3-5 transactions on dashboard
- Compact card format with essential information
- "View All" navigation to full history page

#### ThemeProvider
- Manages dark/light mode state
- Persists theme preference in localStorage
- Provides theme context to all components

### State Management
- React Context for theme management
- Local state for transaction data and pagination
- URL parameters for search and page state

## Responsive Design

### Breakpoints
- **Mobile**: < 768px - Single column layout, compact cards
- **Tablet**: 768px - 1024px - Two column layout, medium cards
- **Desktop**: > 1024px - Full layout with sidebar navigation

### Mobile Optimizations
- Collapsible sidebar navigation
- Touch-friendly button sizes
- Optimized table scrolling
- Compact transaction cards

## Security Considerations

### API Security
- Environment variables for API endpoints
- No hardcoded credentials in source code
- Proper error handling without exposing sensitive data

### Data Handling
- Type-safe API responses
- Input validation for search queries
- Secure JSON parsing with error handling

## Performance Features

### Optimization Techniques
- Lazy loading for route components
- Efficient re-rendering with proper key props
- Debounced search to reduce API calls
- Pagination to limit data transfer

### Error Handling
- Graceful API failure handling
- Fallback to mock data during development
- User-friendly error messages
- Loading states for better perceived performance

## Development Guidelines

### Code Standards
- TypeScript strict mode enabled
- ESLint and Prettier for code formatting
- Consistent naming conventions
- Comprehensive type definitions

### Component Patterns
- Functional components with hooks
- Props interfaces for type safety
- Consistent error boundaries
- Reusable utility functions

## Browser Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing
1. Follow TypeScript best practices
2. Maintain responsive design principles
3. Add proper error handling
4. Include type definitions for all props
5. Test on multiple screen sizes

## License
Private project for YaYa Wallet integration.
