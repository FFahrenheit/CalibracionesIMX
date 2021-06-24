import { Routes } from "@angular/router";
import { BorrowDetailsComponent } from "./borrow-details/borrow-details.component";

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
            }
        ]
    }
]