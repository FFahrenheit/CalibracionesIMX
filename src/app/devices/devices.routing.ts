import { Routes } from "@angular/router";
import { DevicesListComponent } from "./devices-list/devices-list.component";
import { ViewDeviceComponent } from "./view-device/view-device.component";

export const DevicesRoutes : Routes =  [
    {
        path: '',
        children: [
            {
                path: 'ver',
                component: DevicesListComponent,
                data: {
                    title: 'Lista de equipos'
                }
            },
            {
                path: 'detalles/:id',
                component: ViewDeviceComponent,
                data: {
                    title: 'Detalles de equipo'
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