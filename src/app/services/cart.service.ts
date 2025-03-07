import { Injectable, signal } from '@angular/core';
import { Product } from '../pages/products/product.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItems = signal<{ product: Product; qty: number }[]>([]);
  cartItemCount = signal<number>(0);

  constructor() {
    this.loadCartFromLocalStorage(); 
  }

  private loadCartFromLocalStorage(): void {
    const savedCart = localStorage.getItem('cartItems');
    if (savedCart) {
      try {
        const parsedCart: { product: Product; qty: number }[] = JSON.parse(savedCart);
        this.cartItems.set(parsedCart);
      } catch (error) {
        console.error('Error parsing cart items from localStorage', error);
      }
    }
  }

  private saveCartToLocalStorage(): void {
    const cart = this.cartItems();
    localStorage.setItem('cartItems', JSON.stringify(cart)); 
  }

  addToCart(product: Product, quantity: number = 1): void {
    const currentCartItems = this.cartItems();
    const existingProduct = currentCartItems.find((item) => item.product.id === product.id);
  
    if (existingProduct) {
      existingProduct.qty += quantity;
    } else {
      currentCartItems.push({ product, qty: quantity });
    }
  
    this.cartItems.set(currentCartItems);
    this.cartItemCount.set(currentCartItems.length);
    this.saveCartToLocalStorage();
  }

  isAddedToCart(id: string): boolean {
    return this.cartItems().some((item) => item.product.id === id); 
  }

  removeFromCart(productId: string): void {
    const currentCartItems = this.cartItems();
    const updatedCartItems = currentCartItems.filter((item) => item.product.id !== productId); 

    this.cartItems.set(updatedCartItems);
    this.saveCartToLocalStorage(); 
  }

  updateQuantity(productId: string, newQuantity: number): void {
    const currentCartItems = this.cartItems();
    const updatedCartItems = currentCartItems.map((item) => {
      if (item.product.id === productId) {
        return { ...item, qty: Math.max(item.qty + newQuantity, 0) };
      }
      return item;
    }).filter(item => item.qty > 0); 
  
    this.cartItems.set(updatedCartItems); 
    this.saveCartToLocalStorage();
  }

  getCart(): { product: Product; qty: number }[] {
    return this.cartItems(); 
  }

  getTotal(): number {
    return this.cartItems().reduce((total, item) => total + Number(item.product.price) * item.qty, 0); 
  }

  getTotalQty(): number {
    return this.cartItems().reduce((total, item) => total + item.qty, 0); 
  }

  getCartItemCount(id: string){
    const cartItem = this.cartItems().find(item=>item.product.id === id);
    if(cartItem?.qty){
        return cartItem.qty;
    }
    else{
        return 0;
    }
  }

  clearCart(): void {
    this.cartItems.set([]); 
    localStorage.removeItem('cartItems'); 
  }
}
