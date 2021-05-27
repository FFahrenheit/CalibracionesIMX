import { Routes } from "@angular/router";
import { Error500Component } from "./errors/error500/error500.component";
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
        path: '**',
        component: BlankComponent 
    }
];