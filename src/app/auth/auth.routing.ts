import { Routes } from "@angular/router";
import { AdLoginComponent } from "./ad-login/ad-login.component";
import { LoginComponent } from "./login/login.component";
import { RecoverComponent } from "./recover/recover.component";

export const AuthRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'login',
                component: LoginComponent,
                data: {
                    title: 'Iniciar sesión'
                }
            },
            {
                path: 'recuperar',
                component: RecoverComponent,
                data: {
                    title: 'Recuperar contraseña'
                }
            },
            {
                path: 'windows',
                component: AdLoginComponent,
                data: {
                    title: 'Iniciar sesión con Active Directory'
                }
            },
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'login'
            }
        ]
    }
]