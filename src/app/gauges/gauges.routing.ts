import { Routes } from "@angular/router";
import { LenderGuard } from "../guards/lender.guard";
import { DetailsComponent } from "./details/details.component";
import { ReturnComponent } from "./return/return.component";
import { StartComponent } from "./start/start.component";

export const GaugesRoutes : Routes = [
    {
        path: '',
        canActivate: [ LenderGuard ],
        children: [
            {
                path: 'prestar',
                component: StartComponent,
                data: {
                    title: 'Préstamo de Guages'
                }
            },
            {
                path: 'regresar',
                component: ReturnComponent,
                data: {
                    title: 'Regresar Gauges prestados'
                }
            },
            {
                path: 'detalles',
                component: DetailsComponent,
                data: {
                    title: 'Detalles de Guage'
                }
            },
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'prestar'   
            }
        ]
    }
];