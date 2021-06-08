import { Routes } from "@angular/router";
import { DevicesListComponent } from "./devices-list/devices-list.component";
import { NextDevicesComponent } from "./next-devices/next-devices.component";
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