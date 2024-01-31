import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Provinsi, defaultProvinsi } from 'src/app/app.interface';

@Injectable({
  providedIn: 'root'
})
export class DataProvinsiService {
  provinsi = new BehaviorSubject<Provinsi[]>(defaultProvinsi);
  getProvinsi = this.provinsi.asObservable();
  constructor() { }

  updateUser(newProvinsi: Provinsi[]) {
    this.provinsi.next(newProvinsi);
  }
}
