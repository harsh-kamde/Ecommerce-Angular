import { Injectable, Signal, signal } from '@angular/core';
import { User, signinData } from './auth.model';
const savedUsers = 'SavedUsers';
const currentUser = 'CurrentUser';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn = signal<boolean>(false);

  get isLoggedIn(): Signal<boolean> {
    console.log('islogin called value is: ', this.loggedIn());
    return this.loggedIn;
  }

  login(): void {
    this.loggedIn.set(true);
    localStorage.setItem('isLoggedIn', 'true');
  }

  logout(): void {
    this.loggedIn.set(false);
    localStorage.removeItem('isLoggedIn');
  }

  user() {
    const user = localStorage.getItem(currentUser);
    if (user) {
      const currUser = JSON.parse(user);
      return currUser;
    }
  }

  checkLoginStatus(): void {
    const status = localStorage.getItem('isLoggedIn') === 'true';
    this.loggedIn.set(status);
  }

  signin(formData: signinData) {
    let users: User[] = [];
    const data = localStorage.getItem(savedUsers);
    if (data) {
      users = JSON.parse(data);
      const user = users.find((user) => user.email === formData.email);
      if (user) {
        if (user.password === formData.password) {
          localStorage.setItem(currentUser, JSON.stringify(user));
          return 200;
        }
        return 401;
      }
    }
    return 404;
  }

  signup(formData: User) {
    let users: User[] = [];
    const savedData = localStorage.getItem(savedUsers);
    if (savedData) {
      users = JSON.parse(savedData);
    }
    const user = users.find((user) => user.email === formData.email);
    if (user) {
      return 409;
    }
    users.push(formData);
    localStorage.setItem(savedUsers, JSON.stringify(users));
    localStorage.setItem(currentUser, JSON.stringify(formData));
    return 200;
  }
}
