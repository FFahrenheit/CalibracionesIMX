import { Routes } from "@angular/router";
import { BeginCalibrationComponent } from "./begin-calibration/begin-calibration.component";
import { UpdateStatusComponent } from "./update-status/update-status.component";

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
                path: 'actualizar/:id',
                component: UpdateStatusComponent,
                data: {
                    title: 'Actualizar estado de calibración'
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