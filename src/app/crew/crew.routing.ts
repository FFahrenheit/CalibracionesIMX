import { Routes } from "@angular/router";
import { RecoverPasswordGuard } from "../guards/recover-password.guard";
import { BackupUsersComponent } from "./backup-users/backup-users.component";
import { ChangePasswordComponent } from "./change-password/change-password.component";

export const CrewRoutes : Routes =  [
    {
        path: '',
        children: [
            {
                path: 'encargados',
                component: BackupUsersComponent,
                data: {
                    title: 'Administrar encargados'
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
