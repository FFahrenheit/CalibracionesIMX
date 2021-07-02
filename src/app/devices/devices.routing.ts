import { Routes } from "@angular/router";
import { AdminGuard } from "../guards/admin.guard";
import { LenderGuard } from "../guards/lender.guard";
import { AdminDevicesComponent } from "./admin-devices/admin-devices.component";
import { BorrowDevicesComponent } from "./borrow-devices/borrow-devices.component";
import { BorrowedDevicesComponent } from "./borrowed-devices/borrowed-devices.component";
import { DevicesListComponent } from "./devices-list/devices-list.component";
import { NextDevicesComponent } from "./next-devices/next-devices.component";
import { PendingDevicesComponent } from "./pending-devices/pending-devices.component";
import { ProcessDevicesComponent } from "./process-devices/process-devices.component";
import { UpdateDevicesComponent } from "./update-devices/update-devices.component";
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
                // canActivate: [ AdminGuard ],
                data: {
                    title: 'Equipos próximos a calibrar'
                }
            },
            {
                path: 'proceso',
                component: ProcessDevicesComponent,
                // canActivate: [ AdminGuard ],
                data: {
                    title: 'Equipos en proceso de calibración'
                }
            },
            {
                path: 'pendientes',
                component: PendingDevicesComponent,
                // canActivate: [ AdminGuard ],
                data: {
                    title: 'Equipos con Calibración Vencida'
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
                path: 'actualizar',
                // canActivate: [ AdminGuard ],
                component: UpdateDevicesComponent,
                data: {
                    title: 'Actualizar estado de equipos'
                }
            },
            {
                path: 'prestar',
                canActivate: [ LenderGuard ],
                component: BorrowDevicesComponent,
                data: {
                    title: 'Préstamo de equipos'
                }
            },
            {
                path: 'prestados',
                component: BorrowedDevicesComponent,
                canActivate: [ LenderGuard ],
                data: {
                    title: 'Equipos prestados'
                }
            },
            {
                path: 'administrar',
                component: AdminDevicesComponent,
                canActivate: [ AdminGuard ],
                data: {
                    title: 'Agregar o modificar equipos'
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