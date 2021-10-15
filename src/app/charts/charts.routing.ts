import { Routes } from "@angular/router";
import { ChartsComponent } from "../layouts/charts/charts.component";
import { DoneCalibrationsComponent } from "./done-calibrations/done-calibrations.component";
import { NextCalibrationsComponent } from "./next-calibrations/next-calibrations.component";

export const ChartsRoutes : Routes =  [
    {
        path: '',
        component: ChartsComponent,
        children: [
            {
                path: 'proximos',
                component: NextCalibrationsComponent,
                data: {
                    title: 'Equipos próximos a calibrar'
                }
            },
            {
                path: 'hechas',
                component: DoneCalibrationsComponent,
                data: {
                    title: 'Equipos calibrados recientemente'
                }
            },
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'proximos'
            }
        ]
    }
]