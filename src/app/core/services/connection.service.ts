import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs'; 
import { catchError, retry, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  constructor(private http: HttpClient, private router: Router) { }

  mainUrl: string = 'https://repo.foodini.net.pl/bifrost';

  httpOptions = {};

  setToken(token: string){
    localStorage.setItem('token', token);

    this.httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.getToken(),
        'Content-Type': 'application/json;charset=utf-8'
      })
    }
  }

  getToken(){
    return localStorage.getItem('token');
  }

  login(login: string, password: string){
    
    var post_data = {
        username: login,
        password: password,
        client_id: 2,
        client_secret: 'LWFdjnXvILc1tXPiaxnrP8mrldIomjAFYB4yuT2u',
        grant_type: 'password',
        scope: 'iBASA'
    }
    
    return this.http.post(this.mainUrl + 'oauth/token', post_data)
    .pipe(/*(data => {
        if(data && data['access_token']){
          this.setToken(data['access_token']);
        }
        console.log(data.subscribe);
        return data;
    }),*/
    map(data =>{

      //console.log(data['access_token']);
      if(data && data['access_token']){
        this.setToken(data['access_token']);
      }
      
      return data;
    }),
    catchError(error => {
      
      if(error.status == 404){
        this.showError(error.statusText);
      }else if(error.staatus == 500){
        this.showError(error.statusText);
      }
      return throwError(error);
    }));
  }

  getDataByPost(url: String, post_data: any){

    return this.http.post(this.mainUrl + url, post_data, this.httpOptions)
      .pipe(
        (data => {
          return data;
        }),
        catchError(error => {
          if(error.status == 401){
            this.showError(error.statusText);
          }else if(error.status == 404){
            this.showError(error.statusText);
          }else if(error.staatus == 500){
            this.showError(error.statusText);
          }else{
            this.showError(error.statusText);
          }
          return throwError(error);
        })
      );
  }

  getDataByGet(url: String){
    
    return this.http.get(this.mainUrl + url, this.httpOptions)
      .pipe((data => {
          return data;
        }),
        catchError(error => {
          if(error.status == 401){
            this.showError(error.statusText);
          }else if(error.status == 404){
            this.showError(error.statusText);
          }else if(error.status == 500){
            this.showError(error.statusText);
          }else{
            this.showError(error.statusText);
          }
          return throwError(error);
        })
      );

  }

  logout(){
    return this.getDataByGet('/logout')
              .subscribe(data => {
                  this.router.navigateByUrl('');
              });
  }

  showError(message) {
    Swal.fire({
      title: 'Error!',
      text: message,
      icon: 'error',
      confirmButtonText: 'Cool'
    })
  }

}
