import { Routes } from "@angular/router";
import { ProveedoresGuard } from "../guards/create/proveedores.guard";
import { ResponsablesGuard } from "../guards/create/responsables.guard";
import { NavigationGuard } from "../guards/navigation.guard";
import { CalibratorsResponsablesComponent } from "./calibrators-responsables/calibrators-responsables.component";
import { CalibratorsComponent } from "./calibrators/calibrators.component";
import { ConfirmComponent } from "./confirm/confirm.component";
import { DetailsComponent } from "./details/details.component";

export const NewDeviceRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'detalles',
                component: DetailsComponent,
                canDeactivate: [ NavigationGuard ],
                data: {
                    title: 'Nuevo equipo'
                }
            },
            {
                path: 'responsables',
                component: CalibratorsResponsablesComponent,
                canActivate: [ ResponsablesGuard ],
                canDeactivate: [ NavigationGuard ],
                data: {
                    title: 'Responsables y calibradores'
                }
            },
            {
                path: 'confirmar',
                component: ConfirmComponent,
                canActivate: [ ResponsablesGuard ],
                canDeactivate: [ NavigationGuard ],
                data: {
                    title: 'Confirmar nuevo dispositivo'
                }
            },
            {
                path: 'proveedores',
                component: CalibratorsComponent,
                canActivate: [ ProveedoresGuard ],
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