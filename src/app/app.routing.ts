import { Routes } from "@angular/router";
import { Error403Component } from "./errors/error403/error403.component";
import { Error404Component } from "./errors/error404/error404.component";
import { Error500Component } from "./errors/error500/error500.component";
import { AdminGuard } from "./guards/admin.guard";
import { LenderGuard } from "./guards/lender.guard";
import { LoggedGuard } from "./guards/logged.guard";
import { LoginGuard } from "./guards/login.guard";
import { BlankComponent } from "./layouts/blank/blank.component";
import { DashboardComponent } from "./layouts/dashboard/dashboard.component";

export const AppRoutes: Routes = [
    {
        path: '',
        component: DashboardComponent,
        canActivate: [ LoggedGuard ],
        children: [
            {
                path: 'equipos',
                loadChildren: () =>
                import('./devices/devices.module').then(
                    (m) => m.DevicesModule
                )
            },
            {
                path: 'calibraciones',
                // canActivate: [ AdminGuard ],
                loadChildren: () =>
                import('./calibrations/calibrations.module').then(
                    (m) => m.CalibrationsModule
                )
            },
            {
                path: 'prestamos',
                canActivate: [ LenderGuard ],
                loadChildren: () =>
                import('./borrowings/borrowings.module').then(
                    (m) => m.BorrowingsModule
                )
            },
            {
                path: 'usuarios',
                loadChildren: () =>
                import('./crew/crew.module').then(
                    (m) => m.CrewModule
                )
            },
            {
                path: 'nuevo',
                canActivate: [ AdminGuard ],
                loadChildren: () =>
                import('./new-device/new-device.module').then(
                    (m) => m.NewDeviceModule
                )
            },
            {
                path: 'editar/:id',
                canActivate: [ AdminGuard ],
                loadChildren: ()=>
                import('./edit/edit.module').then(
                    (m) => m.EditModule
                )
            },
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'equipos'
            }
        ]
    },
    {
        path: '',
        component: BlankComponent,
        canActivate: [ LoginGuard ],
        children: [
            {
                path: 'inicio',
                loadChildren: ()=>
                import('./auth/auth.module').then(
                    (m) => m.AuthModule
                )
            },
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'inicio'
            }
        ]
    },
    {
        path: '500',
        component: Error500Component
    },
    {
        path: '403',
        component: Error403Component
    },
    {
        path: '**',
        component: Error404Component 
    }
];