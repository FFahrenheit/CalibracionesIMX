import { Routes } from "@angular/router";
import { ViewDeviceComponent } from "./view-device/view-device.component";

export const DevicesRoutes : Routes =  [
    {
        path: '',
        children: [
            {
                path: 'ver',
                component: ViewDeviceComponent,
                data: {
                    title: 'Consultar equipo'
                }
            },
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'ver'
            }
        ]
    }
]