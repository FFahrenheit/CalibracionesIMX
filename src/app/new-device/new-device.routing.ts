import { Routes } from "@angular/router";

export const NewDeviceRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'detalles',
                data: {
                    title: ''
                }
            }
        ]
    }
]