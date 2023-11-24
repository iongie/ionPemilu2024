import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  token = new BehaviorSubject<string>('')
  constructor(
    private storage: Storage
  ) { 
    this.initializeStorage();
  }
  private async initializeStorage() {
    await this.storage.create();
    const storedToken = await this.storage.get('token');
    this.token.next(storedToken || '');
  }
  updateToken(newToken: string) {
    this.token.next(newToken)
    this.storage.set('token', newToken);
  }

  async clearToken(){
    await this.token.next('');
    await this.storage.remove('token');
  }

  getToken = this.token.asObservable();
}
