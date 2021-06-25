import { Routes } from "@angular/router";
import { BorrowDetailsComponent } from "./borrow-details/borrow-details.component";
import { LendDeviceComponent } from "./lend-device/lend-device.component";
import { ReturnDeviceComponent } from "./return-device/return-device.component";

export const BorrowingsRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'detalles/:id',
                component: BorrowDetailsComponent,
                data: {
                    title: 'Préstamos del equipo'
                }
            },
            {
                path: 'empezar/:id',
                component: LendDeviceComponent,
                data: {
                    title: 'Prestar equipo'
                }
            },
            {
                path: 'regresar/:id',
                component: ReturnDeviceComponent,
                data: {
                    title: 'Regresar equipo'
                }
            },
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'detalles'
            }
        ]
    }
]