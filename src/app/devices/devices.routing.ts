import { Routes } from "@angular/router";
import { DevicesListComponent } from "./devices-list/devices-list.component";
import { NextDevicesComponent } from "./next-devices/next-devices.component";
import { PendingDevicesComponent } from "./pending-devices/pending-devices.component";
import { ProcessDevicesComponent } from "./process-devices/process-devices.component";
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
                path: 'proximos',
                component: NextDevicesComponent,
                data: {
                    title: 'Equipos próximos a calibrar'
                }
            },
            {
                path: 'proceso',
                component: ProcessDevicesComponent,
                data: {
                    title: 'Equipos en proceso de calibración'
                }
            },
            {
                path: 'pendientes',
                component: PendingDevicesComponent,
                data: {
                    title: 'Equipos con calibración pendiente'
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