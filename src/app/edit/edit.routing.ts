import { Routes } from "@angular/router";

export const EditRoutes : Routes = [
    {
        path: '',
        children: [
            {
                
            },
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'detalles'
            }
        ]
    }
]