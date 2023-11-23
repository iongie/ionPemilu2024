import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User, defaultUser } from 'src/app/app.interface';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user = new BehaviorSubject<User>(defaultUser)
  getUser = this.user.asObservable();
  constructor(
    private storage: Storage
  ) { 
    this.initializeStorage();
  }
  private async initializeStorage() {
    await this.storage.create();
    const storedToken = await this.storage.get('user');
    this.user.next(storedToken || '');
  }
  updateUser(newUser: User) {
    this.user.next(newUser);
    this.storage.set('user', newUser);
  }
}
