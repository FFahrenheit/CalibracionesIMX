import { Routes } from "@angular/router";
import { BackupUsersComponent } from "./backup-users/backup-users.component";

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
                path: '',
                pathMatch: 'full',
                redirectTo: 'encargados'
            }
        ]
    }
]
