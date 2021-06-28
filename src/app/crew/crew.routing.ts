import { Routes } from "@angular/router";

export const CrewRoutes : Routes =  [
    {
        path: '',
        children: [
            {
                path: 'administradores',
                data: {
                    title: 'Administrar encargados'
                }
            }
        ]
    }
]
