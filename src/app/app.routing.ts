import { Routes } from "@angular/router";
import { BlankComponent } from "./layouts/blank/blank.component";

export const AppRoutes: Routes = [
    {
        path: '',
        component: BlankComponent,
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