import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  private isLocked : boolean = true;

  constructor() {
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
}
