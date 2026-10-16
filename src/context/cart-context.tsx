"use client";

import {
  createContext,
  useContext,
  useReducer,
  useCallback,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { Product } from "@/lib/products";
import { toast } from "@/lib/toast";

export interface CartItem {
  variantId: number;
  productId: number;
  slug: string;
  name: string;
  image: string;
  priceCents: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

type CartAction =
  | { type: "HYDRATE"; payload: CartItem[] }
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "REMOVE_ITEM"; payload: number }
  | { type: "UPDATE_QUANTITY"; payload: { variantId: number; quantity: number } }
  | { type: "CLEAR" };

interface CartContextValue {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (variantId: number) => void;
  updateQuantity: (variantId: number, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalCents: number;
  shippingCents: number;
  freeShippingThreshold: number;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  hydrated: boolean;
}

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "semzi-cart";
/** PKR 5,000 free shipping (prices stored as paise / cents). */
const FREE_SHIPPING_THRESHOLD = 500_000;
const SHIPPING_CENTS = 80_000; // PKR 800

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "HYDRATE":
      return { items: action.payload };
    case "ADD_ITEM": {
      const existing = state.items.find((i) => i.variantId === action.payload.variantId);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.variantId === action.payload.variantId
              ? { ...i, quantity: i.quantity + action.payload.quantity }
              : i
          ),
        };
      }
      return { items: [...state.items, action.payload] };
    }
    case "REMOVE_ITEM":
      return { items: state.items.filter((i) => i.variantId !== action.payload) };
    case "UPDATE_QUANTITY":
      if (action.payload.quantity < 1) {
        return { items: state.items.filter((i) => i.variantId !== action.payload.variantId) };
      }
      return {
        items: state.items.map((i) =>
          i.variantId === action.payload.variantId
            ? { ...i, quantity: action.payload.quantity }
            : i
        ),
      };
    case "CLEAR":
      return { items: [] };
    default:
      return state;
  }
}

function parseStoredItems(raw: string | null): CartItem[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter(
        (item): item is CartItem =>
          typeof item === "object" &&
          item !== null &&
          typeof (item as CartItem).variantId === "number" &&
          typeof (item as CartItem).quantity === "number" &&
          (item as CartItem).quantity > 0
      )
      .map((item) => ({
        ...item,
        slug: typeof item.slug === "string" ? item.slug : String(item.productId),
      }));
  } catch {
    return [];
  }
}

export function formatPkr(cents: number) {
  return `PKR ${(cents / 100).toLocaleString("en-PK")}`;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    dispatch({ type: "HYDRATE", payload: parseStoredItems(localStorage.getItem(STORAGE_KEY)) });
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
  }, [state.items, hydrated]);

  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);
  const toggleCart = useCallback(() => setIsCartOpen((open) => !open), []);

  const addItem = useCallback((product: Product, quantity = 1) => {
    dispatch({
      type: "ADD_ITEM",
      payload: {
        variantId: product.id,
        productId: product.id,
        slug: product.slug,
        name: product.name,
        image: product.images[0] ?? "",
        priceCents: product.priceCents,
        quantity,
      },
    });
    setIsCartOpen(true);
    toast({
      title: "Added to cart",
      description:
        quantity > 1
          ? `${product.name} × ${quantity}`
          : product.name,
      variant: "success",
      action: {
        label: "View cart",
        onClick: () => setIsCartOpen(true),
      },
    });
  }, []);

  const removeItem = useCallback(
    (variantId: number) => {
      const item = state.items.find((i) => i.variantId === variantId);
      dispatch({ type: "REMOVE_ITEM", payload: variantId });
      if (item) toast.info("Removed from cart", item.name);
    },
    [state.items]
  );

  const updateQuantity = useCallback(
    (variantId: number, quantity: number) => {
      if (quantity < 1) {
        const item = state.items.find((i) => i.variantId === variantId);
        if (item) toast.info("Removed from cart", item.name);
      }
      dispatch({ type: "UPDATE_QUANTITY", payload: { variantId, quantity } });
    },
    [state.items]
  );

  const clearCart = useCallback(() => {
    if (state.items.length === 0) return;
    dispatch({ type: "CLEAR" });
    toast.info("Cart cleared", "Your bag is empty again.");
  }, [state.items.length]);

  const totalItems = state.items.reduce((sum, i) => sum + i.quantity, 0);
  const totalCents = state.items.reduce((sum, i) => sum + i.priceCents * i.quantity, 0);
  const shippingCents = totalCents >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_CENTS;

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        totalCents,
        shippingCents,
        freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
        isCartOpen,
        openCart,
        closeCart,
        toggleCart,
        hydrated,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
