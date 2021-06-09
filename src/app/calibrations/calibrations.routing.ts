import { Routes } from "@angular/router";

export const CalibrationsRoutes : Routes =  [
    {
        path: '',
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: '.'
            }
        ]
    }
]