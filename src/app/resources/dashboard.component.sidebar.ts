
export const publicSidebar = [
    {
        name: 'Consultar equipos',
        route: ['equipos','ver'],
        detail: 'Ver equipos'
    },
];

export const adminSidebar = [
    {
        name: 'Calibraciones próximas',
        route: ['equipos','proximos'],
        detail: 'Equipos próximos'
    },
    {
        name: 'En proceso de calibración',
        route: ['equipos','proceso'],
        detail: 'Equipos en proceso'
    },
    {
        name: 'Calibraciones vencidas',
        route: ['equipos','pendientes'],
        detail: 'Equipos con Calibración Vencida'
    },
    {
        name: 'Actualizar calibración',
        route: ['equipos','actualizar'],
        detail: 'Estado de calibración'
    },
    {
        name: 'Adjuntar archivos',
        route: ['equipos','adjuntar'],
        detail: 'Certificados de calibración'
    },
    {
        name: 'Actualizar estado',
        route: ['equipos','modificar'],
        detail: 'Estado de equipo'
    },
    {
        name: 'Administrar equipos',
        route: ['equipos','administrar'],
        detail: 'Modificar y agregar equipos'
    },
    {
        name: 'Adjuntar referencias',
        route: ['equipos', 'referencias'],
        detail: 'Agregar archivos de referencia' 
    },
    {
        name: 'Administrar proveedores',
        route: ['usuarios','proveedores','ver'],
        detail: 'Agregar y ver proveedores certificados'
    }
];

export const mediumSidebar = [
    {
        name: 'Prestar equipos',
        route: ['equipos','prestar'],
        detail: 'Prestar equipos'
    },
    {
        name: 'Equipos prestados',
        route: ['equipos','prestados'],
        detail: 'Equipos prestados'
    },
];