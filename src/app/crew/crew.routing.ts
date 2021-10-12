import { Routes } from "@angular/router";
import { AdminGuard } from "../guards/admin.guard";
import { RecoverPasswordGuard } from "../guards/recover-password.guard";
import { AddUserComponent } from "./add-user/add-user.component";
import { BackupUsersComponent } from "./backup-users/backup-users.component";
import { ChangePasswordComponent } from "./change-password/change-password.component";
import { DeleteRecordsComponent } from "./delete-records/delete-records.component";
import { ProviderListComponent } from "./provider-list/provider-list.component";
import { ResendTasksComponent } from "./resend-tasks/resend-tasks.component";
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
                path: 'nuevo',
                component: AddUserComponent,
                canActivate: [ AdminGuard ],
                data: {
                    title: 'Agregar nuevo usuario'
                }
            },
            {
                path: 'admin/eliminar',
                canActivate: [ AdminGuard ],
                component: DeleteRecordsComponent,
                data: {
                    title: 'Eliminar registros'
                }
            },
            {
                path: 'proveedores/administrar',
                component: ProviderListComponent,
                canActivate: [ AdminGuard ],
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
                path: 'eventos',
                component: ResendTasksComponent,
                canActivate: [ AdminGuard ],
                data: {
                    title: 'Reenviar tareas o eventos programados'
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
