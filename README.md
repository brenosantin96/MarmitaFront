# 🍱 MarmitaDelivery Frontend

A modern **Next.js** frontend application for the MarmitaDelivery frozen meal delivery service. This application provides a seamless user experience for browsing meals, managing shopping carts, and handling user authentication.

![Next.js](https://img.shields.io/badge/Next.js-15.0-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-18.2-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)

## ✨ Features

### 🔐 Authentication & User Management
- **User Registration & Login** - Secure authentication system
- **Google OAuth Integration** - Social login functionality
- **Admin Role Management** - Differentiated access controls
- **User Context** - Global user state management

### 🛍️ Shopping Experience
- **Product Catalog** - Browse available lunchboxes and meal kits
- **Shopping Cart** - Add, remove, and manage items
- **Real-time Cart Updates** - Instant cart state synchronization
- **Side Cart Menu** - Slide-out cart for easy access

### 👨‍💼 Admin Features
- **Admin Dashboard** - Administrative area
- **Product CRUD Operations** - Create, read, update, delete lunchboxes
- **Category Management** - Organize products by categories

### 🎨 UI/UX Features
- **Responsive Design** - Mobile-first approach
- **Custom Icon System** - Reusable SVG icon components
- **Modal System** - Address selection and other modals
- **Side Navigation** - Collapsible menu system

## 🏗️ Project Structure

```
src/
├── components/          # Reusable components
│   ├── svg/           # Icon system
│   ├── Button01.tsx   # Custom button component
│   ├── CardItem01.tsx # Product card component
│   ├── CartSideMenu.tsx
│   ├── SideMenu.tsx
│   └── ModalAddress.tsx
├── context/           # React context providers
│   ├── CartContext.tsx
│   └── UserContext.tsx
├── types/            # TypeScript type definitions
├── app/              # Next.js app directory
│   ├── page.tsx     # Home page
│   ├── menu/        # Menu page
│   └── ...other pages
└── Icons/           # SVG icon collection
```

## 📋 Type Definitions

### Core Types

```typescript
// User management
export type User = {
  id: number;
  name: string;
  email: string;
  isAdmin: boolean;
}

// Shopping cart
export type Cart = {
  userId: number;
  createdAt: Date;
  isCheckedOut: boolean;
  cartItems: CartItem[];
}

export type CartItem = {
  cartItem: Kit | Lunchbox;
  quantity: number;
}

// Products
export type Lunchbox = {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string | File;
  categoryId: number;
  portionGram: number;
}

export type Kit = {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string | File;
  categoryId: number;
  portionGram: number;
}

export type Category = {
  id: number;
  name: string;
}
```

## 🎯 Key Components

### Icon System
A centralized icon management system with 17+ customizable SVG icons:

```typescript
// Usage example
<Icon svg="cart" width="24px" height="24px" fillColor="#000" />
<Icon svg="user" width="20px" height="20px" />
```

**Available Icons:** `backward`, `search`, `menu`, `user`, `cart`, `cart2`, `logo`, `logo2`, `close`, `close2`, `rightarrow`, `leftarrow`, `location`, `location2`, `littlex`, `facebook`, `google`, `eyeclosed`, `eyeopened`

### CardItem01 Component
Product card with add/remove functionality:
- Displays product image, name, price, and portion size
- Add to cart with quantity management
- Responsive grid layout

### CartSideMenu
Slide-out cart featuring:
- Real-time cart updates
- Item quantity adjustments
- Checkout preparation

### Modal System
Address selection and other modal dialogs with smooth animations.

## 🚀 Pages

### Home Page (`/`)
- Welcome banner and promotional content
- Address delivery selector
- Navigation to full menu
- Responsive design for all devices

### Menu Page (`/menu`)
- Grid layout of all available lunchboxes
- Add/remove items from cart
- Real-time cart synchronization
- Loading states and error handling

## 🚀 Pages

### Home Page (`/`)
- Welcome banner and promotional content
- Address delivery selector with interactive modal
- Navigation to full menu
- Responsive design for all devices
- Integration with side cart and navigation menus

### Menu Page (`/menu`)
- Grid layout of all available lunchboxes
- Add/remove items from cart with real-time updates
- Real-time cart synchronization across components
- Loading states and error handling
- Product cards with images, prices, and portion sizes
- Direct integration with cart context

### Authentication Pages

#### Login Page (`/login`)
- **Traditional Email/Password Login** - Secure credential-based authentication
- **Google OAuth Integration** - One-click social authentication using Google's auth-code flow
- **Social Media Options** - Ready for Facebook integration (UI prepared)
- **Password Visibility Toggle** - Enhanced user experience with eye icons
- **Automatic Cart Synchronization** - Cart loads automatically after login
- **Responsive Layout** - Split-screen design with food imagery on larger screens
- **User State Management** - Immediate context update upon successful authentication

#### Registration Page (`/signup`)
- **User Registration Form** - Complete signup with name, email, and password
- **Google OAuth Registration** - Social signup using same Google auth flow
- **Password Confirmation** - Secure password validation
- **Success Modal** - User feedback with email confirmation instructions
- **Social Media Integration** - Prepared for multiple OAuth providers
- **Automatic Login** - Users are logged in immediately after registration
- **Session Management** - HTTP-only cookies for secure authentication

#### 🔐 Authentication Features
- **Google OAuth Ready** - Fully implemented using `@react-oauth/google`
- **Secure Token Handling** - Auth-code flow for enhanced security
- **HTTP-only Cookies** - Protected session management
- **Automatic Context Updates** - User state synchronized across app
- **Logout Functionality** - Complete session cleanup
- **Admin Role Support** - Differentiated access based on user roles

All authentication pages feature:
- **Mobile-responsive designs**
- **Consistent component reuse** (FormUserPassword, social buttons)
- **Error handling and user feedback**
- **Seamless navigation between auth states**
- **Integration with global user and cart contexts**

## 🔧 Context Management

### Cart Context
```typescript
const cartContext = useCartContext();
// Methods: openAndCloseCart(), setCart(), etc.
```

### User Context
```typescript
const userContext = useUserContext();
// Provides: user data, authentication status, admin privileges
```

## 🛠️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd marmitadelivery-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment setup**
   ```bash
   # .env.local
   NEXT_PUBLIC_BASE_URL=your_backend_api_url
   NEXT_PUBLIC_API_BASE_URL=your_asset_base_url
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

## 📱 Responsive Design

- **Mobile-first** approach using Tailwind CSS
- **Flexible grid systems** for product displays
- **Touch-friendly** interface elements
- **Optimized navigation** for all screen sizes

## 🔄 State Management

- **React Context API** for global state
- **Local state** for component-specific data
- **Real-time cart synchronization** across components
- **Persistent user sessions**

## 🎨 Styling

- **Tailwind CSS** for utility-first styling
- **Custom component styles** for brand consistency
- **Responsive breakpoints** for all devices
- **Accessible color schemes** and contrast ratios

## 🔒 Security Features

- **HTTP-only cookies** for authentication
- **Protected admin routes**
- **Input validation** and error handling
- **Secure API communication**

## 🚧 Development Roadmap

- [ ] Checkout process implementation
- [ ] Order history and tracking
- [ ] Payment integration (PIX, credit card)
- [ ] User profile management
- [ ] Advanced filtering and search
- [ ] Wishlist functionality
- [ ] Push notifications
- [ ] PWA capabilities

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 👨‍💻 Author

**Breno Santin**  
[GitHub: brenosantin96](https://github.com/brenosantin96)

---

**Built with ❤️ using Next.js, React, and TypeScript**