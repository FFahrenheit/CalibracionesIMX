import { Routes } from "@angular/router";
import { EditGuard } from "../guards/edit.guard";
import { BeginComponent } from "./begin/begin.component";
import { CalibratorsResponsablesComponent } from "./calibrators-responsables/calibrators-responsables.component";
import { DetailsComponent } from "./details/details.component";

export const EditRoutes : Routes = [
    {
        path: '',
        canActivate: [ EditGuard ],
        children: [
            {
                path: 'empezar',
                component: BeginComponent,
                data: {
                    title: 'Vista previa editar equipo'
                }
            },
            {
                path: 'detalles',
                component: DetailsComponent,
                data: {
                    title: 'Editar detalles del equipo'
                }
            },
            {
                path: 'responsables',
                component: CalibratorsResponsablesComponent,
                data: {
                    title: 'Editar responsables y verificadores'
                }
            },
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'empezar'
            }
        ]
    }
]