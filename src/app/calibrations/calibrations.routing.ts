import { Routes } from "@angular/router";
import { BeginCalibrationComponent } from "./begin-calibration/begin-calibration.component";

export const CalibrationsRoutes : Routes =  [
    {
        path: '',
        children: [
            {
                path: 'empezar/:id',
                component: BeginCalibrationComponent,
                data: {
                    title: 'Empezar proceso de calibración'
                }
            },
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'empezar'
            }
        ]
    }
]