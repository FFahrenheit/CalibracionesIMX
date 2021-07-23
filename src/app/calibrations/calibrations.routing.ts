import { Routes } from "@angular/router";
import { AttachFilesComponent } from "./attach-files/attach-files.component";
import { BeginCalibrationComponent } from "./begin-calibration/begin-calibration.component";
import { ConfirmCalibrationComponent } from "./confirm-calibration/confirm-calibration.component";
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
                path: 'adjuntar/:id',
                component: AttachFilesComponent,
                data: {
                    title: 'Adjuntar archivos a calibración'
                }
            },
            {
                path: 'confirmar/:id',
                component: ConfirmCalibrationComponent,
                data: {
                    title: 'Confirmar calibración'
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