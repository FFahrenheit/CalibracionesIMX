import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-begin',
  templateUrl: './begin.component.html',
  styleUrls: ['./begin.component.scss']
})
export class BeginComponent implements OnInit {

  public id : string;
  public show = false; 

  constructor(private route   : ActivatedRoute,
              private router  : Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params=> {
      this.id = params.get('id');
    });
  }

  exists($event){
    this.show = $event != null;
  }

  edit(){
    this.router.navigate(['editar',this.id,'detalles']);
  }

  providers(){
    this.router.navigate(['editar',this.id,'proveedores']);
  }

}
