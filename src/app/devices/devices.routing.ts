import { Routes } from "@angular/router";
import { AdminDeviceGuard } from "../guards/admin-device.guard";
import { AdminGuard } from "../guards/admin.guard";
import { LenderGuard } from "../guards/lender.guard";
import { AdminDevicesComponent } from "./admin-devices/admin-devices.component";
import { AttachResourcesComponent } from "./attach-resources/attach-resources.component";
import { AttachToDeviceComponent } from "./attach-to-device/attach-to-device.component";
import { AttachmentDevicesComponent } from "./attachment-devices/attachment-devices.component";
import { BorrowDevicesComponent } from "./borrow-devices/borrow-devices.component";
import { BorrowedDevicesComponent } from "./borrowed-devices/borrowed-devices.component";
import { DevicesListComponent } from "./devices-list/devices-list.component";
import { NextDevicesComponent } from "./next-devices/next-devices.component";
import { PendingDevicesComponent } from "./pending-devices/pending-devices.component";
import { ProcessDevicesComponent } from "./process-devices/process-devices.component";
import { UpdateActiveComponent } from "./update-active/update-active.component";
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
                canActivate: [ AdminGuard ],
                data: {
                    title: 'Equipos próximos a calibrar'
                }
            },
            {
                path: 'adjuntar',
                component: AttachmentDevicesComponent,
                canActivate: [ AdminGuard] ,
                data: {
                    title: 'Adjuntar certificados'
                }
            },
            {
                path: 'referencias',
                component: AttachResourcesComponent,
                canActivate: [ AdminGuard ],
                data: {
                    title: 'Adjuntar archivos de referencia'
                }
            },
            {
                path: 'proceso',
                component: ProcessDevicesComponent,
                canActivate: [ AdminGuard ],
                data: {
                    title: 'Equipos en proceso de calibración'
                }
            },
            {
                path: 'pendientes',
                component: PendingDevicesComponent,
                canActivate: [ AdminGuard ],
                data: {
                    title: 'Equipos con Calibración Vencida'
                }
            },
            {
                path: 'modificar',
                component: UpdateActiveComponent,
                canActivate: [ AdminGuard ],
                data: {
                    title: 'Actualizar estado de los equipos'
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
                path: 'adjuntar/:id',
                component: AttachToDeviceComponent,
                canActivate: [ AdminDeviceGuard ],
                data:{
                    title: 'Adjuntar archivos de referencia'
                }
            },
            {
                path: 'actualizar',
                canActivate: [ AdminGuard ],
                component: UpdateDevicesComponent,
                data: {
                    title: 'Actualizar estado de calibración'
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