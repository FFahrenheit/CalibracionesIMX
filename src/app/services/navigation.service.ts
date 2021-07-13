import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  private isLocked : boolean = true;

  constructor(private router  : Router) {
    this.isLocked = true;
   }

   public canNavigate(): boolean{
     return ! this.isLocked;
   }

   public reactivate() : void{
     console.log('Relocked');
     this.isLocked = true;
   }

   public deactivate() : void{
     console.log('Not locked');
     this.isLocked = false;
   }

   public navigateWithPermission(route : string[]){
     let lastState = this.isLocked;
     this.isLocked = false;
     this.router.navigate(route);
     setTimeout(() => {
       this.isLocked = lastState;
     }, 1000);
   }
}
