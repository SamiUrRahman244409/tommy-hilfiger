"use client"

import { createContext, useContext, useReducer, useEffect, useState, type ReactNode } from "react"

export interface CartItem {
  id: string
  productId: string
  name: string
  image: string
  price: number
  originalPrice?: number
  quantity: number
  size: string
  color: string
}

interface CartState {
  items: CartItem[]
  itemCount: number
  total: number
  isSidebarOpen: boolean
}

type CartAction =
  | { type: "ADD_ITEM"; payload: Omit<CartItem, "id"> }
  | { type: "REMOVE_ITEM"; payload: string }
  | { type: "UPDATE_QUANTITY"; payload: { id: string; quantity: number } }
  | { type: "CLEAR_CART" }
  | { type: "LOAD_CART"; payload: CartItem[] }
  | { type: "OPEN_SIDEBAR" }
  | { type: "CLOSE_SIDEBAR" }

interface CartContextType {
  state: CartState
  addToCart: (item: Omit<CartItem, "id">) => void
  removeFromCart: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  openSidebar: () => void
  closeSidebar: () => void
  isSidebarOpen: boolean
}

const CartContext = createContext<CartContextType | null>(null)

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingItemIndex = state.items.findIndex(
        (item) =>
          item.productId === action.payload.productId &&
          item.size === action.payload.size &&
          item.color === action.payload.color,
      )

      let newItems: CartItem[]

      if (existingItemIndex > -1) {
        // Update existing item quantity
        newItems = state.items.map((item, index) =>
          index === existingItemIndex ? { ...item, quantity: item.quantity + action.payload.quantity } : item,
        )
      } else {
        // Add new item
        const newItem: CartItem = {
          ...action.payload,
          id: `${action.payload.productId}-${action.payload.size}-${action.payload.color}-${Date.now()}`,
        }
        newItems = [...state.items, newItem]
      }

      const newState = {
        items: newItems,
        itemCount: newItems.reduce((sum, item) => sum + item.quantity, 0),
        total: newItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
        isSidebarOpen: state.isSidebarOpen,
      }

      // Save to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(newItems))
      }

      return newState
    }

    case "REMOVE_ITEM": {
      const newItems = state.items.filter((item) => item.id !== action.payload)
      const newState = {
        items: newItems,
        itemCount: newItems.reduce((sum, item) => sum + item.quantity, 0),
        total: newItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
        isSidebarOpen: state.isSidebarOpen,
      }

      // Save to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(newItems))
      }

      return newState
    }

    case "UPDATE_QUANTITY": {
      if (action.payload.quantity <= 0) {
        return cartReducer(state, { type: "REMOVE_ITEM", payload: action.payload.id })
      }

      const newItems = state.items.map((item) =>
        item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item,
      )

      const newState = {
        items: newItems,
        itemCount: newItems.reduce((sum, item) => sum + item.quantity, 0),
        total: newItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
        isSidebarOpen: state.isSidebarOpen,
      }

      // Save to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(newItems))
      }

      return newState
    }

    case "CLEAR_CART": {
      if (typeof window !== "undefined") {
        localStorage.removeItem("cart")
      }
      return {
        items: [],
        itemCount: 0,
        total: 0,
        isSidebarOpen: state.isSidebarOpen,
      }
    }

    case "LOAD_CART": {
      return {
        items: action.payload,
        itemCount: action.payload.reduce((sum, item) => sum + item.quantity, 0),
        total: action.payload.reduce((sum, item) => sum + item.price * item.quantity, 0),
        isSidebarOpen: state.isSidebarOpen,
      }
    }

    case "OPEN_SIDEBAR":
      return { ...state, isSidebarOpen: true }

    case "CLOSE_SIDEBAR":
      return { ...state, isSidebarOpen: false }

    default:
      return state
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    itemCount: 0,
    total: 0,
    isSidebarOpen: false,
  })

  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  // Load cart from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedCart = localStorage.getItem("cart")
      if (savedCart) {
        try {
          const parsedCart = JSON.parse(savedCart)
          dispatch({ type: "LOAD_CART", payload: parsedCart })
        } catch (error) {
          console.error("Error loading cart from localStorage:", error)
        }
      }
    }
  }, [])

  const addToCart = (item: Omit<CartItem, "id">) => {
    dispatch({ type: "ADD_ITEM", payload: item })
    dispatch({ type: "OPEN_SIDEBAR" })
  }

  const removeFromCart = (id: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: id })
  }

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } })
  }

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" })
  }

  const openSidebar = () => {
    dispatch({ type: "OPEN_SIDEBAR" })
  }

  const closeSidebar = () => {
    dispatch({ type: "CLOSE_SIDEBAR" })
  }

  return (
  <CartContext.Provider
    value={{
      state,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      openSidebar,
      closeSidebar,
      isSidebarOpen,
    }}
  >
    {children}
  </CartContext.Provider>
);return (
  <CartContext.Provider
    value={{
      state,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      openSidebar,
      closeSidebar,
      isSidebarOpen,
    }}
  >
    {children}
  </CartContext.Provider>
);
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
