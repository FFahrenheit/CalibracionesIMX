import { Routes } from "@angular/router";
import { EditGuard } from "../guards/edit.guard";
import { NavigationGuard } from "../guards/navigation.guard";
import { ActiveUpdateComponent } from "./active-update/active-update.component";
import { BeginComponent } from "./begin/begin.component";
import { CalibratorsResponsablesComponent } from "./calibrators-responsables/calibrators-responsables.component";
import { ConfirmComponent } from "./confirm/confirm.component";
import { DetailsComponent } from "./details/details.component";
import { ProvidersComponent } from "./providers/providers.component";

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
                canDeactivate: [NavigationGuard],
                data: {
                    title: 'Editar detalles del equipo'
                }
            },
            {
                path: 'responsables',
                canDeactivate: [NavigationGuard],
                component: CalibratorsResponsablesComponent,
                data: {
                    title: 'Editar responsables y verificadores'
                }
            },
            {
                path: 'proveedores',
                component: ProvidersComponent,
                data: {
                    title: 'Editar proveedores certificados'
                }
            },
            {
                path: 'confirmar',
                component: ConfirmComponent,
                canDeactivate: [NavigationGuard],
                data: {
                    title: 'Confirmar cambios'
                }
            },
            {
                path: 'estado',
                component: ActiveUpdateComponent,
                data: {
                    title: 'Cambiar estado del equipo'
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