import { Injectable } from '@angular/core';
import { ValidatorFn, AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor() { }

  nonNegativeValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;
  
      if (value !== null && value !== undefined && value < 0) {
        return { 'negativeValue': { value } };
      }
  
      return null;
    };
  }
}
