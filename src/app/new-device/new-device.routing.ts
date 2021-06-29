import { Routes } from "@angular/router";
import { DetailsComponent } from "./details/details.component";

export const NewDeviceRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'detalles',
                component: DetailsComponent,
                data: {
                    title: 'Nuevo equipo'
                }
            }
        ]
    }
]