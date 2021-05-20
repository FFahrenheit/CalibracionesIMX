import { Routes } from "@angular/router";
import { LoginGuard } from "./guards/login.guard";
import { BlankComponent } from "./layouts/blank/blank.component";
import { DashboardComponent } from "./layouts/dashboard/dashboard.component";

export const AppRoutes: Routes = [
    {
        path: '',
        component: DashboardComponent,
        canActivate: [ LoginGuard ], //temp
        children: [
            {
                path: 'equipos',
                loadChildren: () =>
                import('./devices/devices.module').then(
                    (m) => m.DevicesModule
                )
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
        path: '**',
        component: BlankComponent 
    }
];