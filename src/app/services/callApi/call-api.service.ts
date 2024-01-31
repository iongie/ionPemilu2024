import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CallApiService {
  url = 'https://apipilkada.tangerangselatankota.go.id/'
  constructor(
    private http: HttpClient
  ) { }


  post(data: any, param: any, token?:any){
    const cekToken = token !== undefined
    ? {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token
      })
    }
    : undefined
    return this.http.post(this.url+param, data, cekToken).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    )
  }

  get(param: string, token:string){
    return this.http.get(this.url+param,{
      headers: new HttpHeaders({
        // 'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      })
    }).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    )
  }

  getPagination(param: string, token:string, page: number, length: number, cari = ""){
    return this.http.get(this.url+param,{
      headers: new HttpHeaders({
        // 'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      }),
      params: new HttpParams()
      .set('page', page.toString())
      .set('length', length.toString())
      .set('cari', cari)
    }).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    )
  }

  search(param: string, token:string, cari: string){
    return this.http.get(this.url+param,{
      headers: new HttpHeaders({
        // 'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      }),
      params: new HttpParams().set('cari', cari)
    }).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    )
  }

  chekFotoPemilu (url: string){
    return this.http.get(url).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    )
  }

  getPaslon(param: string, token:string, provinsi_id: string, kota_id: string, kecamatan_id: string, kelurahan_id: string){
    return this.http.get(this.url+param,{
      headers: new HttpHeaders({
        // 'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      }),
      params: new HttpParams()
      .set('provinsi_id', provinsi_id)
      .set('kota_id', kota_id)
      .set('kecamatan_id', kecamatan_id)
      .set('kelurahan_id', kelurahan_id)
    }).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    )
  }
}
