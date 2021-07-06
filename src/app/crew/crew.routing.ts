import { Routes } from "@angular/router";
import { AdminGuard } from "../guards/admin.guard";
import { RecoverPasswordGuard } from "../guards/recover-password.guard";
import { BackupUsersComponent } from "./backup-users/backup-users.component";
import { ChangePasswordComponent } from "./change-password/change-password.component";
import { ProviderListComponent } from "./provider-list/provider-list.component";
import { SeeProvidersComponent } from "./see-providers/see-providers.component";

export const CrewRoutes : Routes =  [
    {
        path: '',
        children: [
            {
                path: 'encargados',
                component: BackupUsersComponent,
                canActivate: [ AdminGuard ],
                data: {
                    title: 'Administrar encargados'
                }
            },
            {
                path: 'proveedores/administrar',
                component: ProviderListComponent,
                data: {
                    title: 'Administrar proveedores certificados'
                }
            },
            {
                path: 'proveedores/ver',
                component: SeeProvidersComponent,
                data: {
                    title: 'Ver proveedores certificados'
                }
            },
            {
                path: 'seguridad/cambiar',
                component: ChangePasswordComponent,
                canDeactivate: [ RecoverPasswordGuard ],
                data: {
                    title: 'Cambiar contraseña'
                }
            },
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'encargados'
            }
        ]
    }
]
