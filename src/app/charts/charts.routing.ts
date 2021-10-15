import { Routes } from "@angular/router";
import { ChartsComponent } from "../layouts/charts/charts.component";
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
                path: '',
                pathMatch: 'full',
                redirectTo: 'proximos'
            }
        ]
    }
]