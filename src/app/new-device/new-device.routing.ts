import { Routes } from "@angular/router";
import { CalibratorsResponsablesComponent } from "./calibrators-responsables/calibrators-responsables.component";
import { CalibratorsComponent } from "./calibrators/calibrators.component";
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
            },
            {
                path: 'responsables',
                component: CalibratorsResponsablesComponent,
                data: {
                    title: 'Responsables y calibradores'
                }
            },
            {
                path: 'proveedores',
                component: CalibratorsComponent,
                data: {
                    title: 'Proveedores certificados'
                }
            },
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'detalles'
            }
        ]
    }
]