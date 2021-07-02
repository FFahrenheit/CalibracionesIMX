import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChangePasswordService {

  private isLocked = false;

  constructor(private http  : HttpClient) {
    this.isLocked = localStorage.getItem('locked') == '1';
   }

   public activateGuard(){
     this.isLocked = true;
     localStorage.setItem('locked','1');
   }

   public deactivateGuard(){
    this.isLocked = false;
    localStorage.removeItem('locked');
  }

  public canNavigate(){
    return !this.isLocked;
  }
}
