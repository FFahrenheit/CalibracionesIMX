import { Routes } from "@angular/router";
import { BeginComponent } from "./begin/begin.component";

export const EditRoutes : Routes = [
    {
        path: '',
        children: [
            {
                path: 'empezar',
                component: BeginComponent,
                data: {
                    title: 'Vista previa editar equipo'
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