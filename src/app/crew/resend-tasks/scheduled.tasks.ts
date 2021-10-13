export const tasks = [
    {
        task: 'Calibraciones expiradas',
        description: 'Envía un correo sobre los equipos que expiran ' 
        + 'hoy y actualiza su estado en el sistema',
        frequency: 'Todos los días a las 7:05AM',
        trigger: 'Reenviar',
        link: 'expired',
        icon: 'far fa-envelope'
    },
    {
        task: 'Calibraciones próximas',
        description: 'Envía un correo sobre los equipos cuya calibración expira ' 
        + 'dentro de 20 días',
        frequency: 'Todos los días a las 7:10AM',
        trigger: 'Reenviar',
        link: 'notice',
        icon: 'far fa-envelope'
    },
    {
        task: 'Calibraciones del mes siguiente',
        description: 'Envía un correo sobre los equipos cuya calibración expira ' 
        + 'dentro del mes siguiente',
        frequency: 'Todos los días primero a las 7:15AM',
        trigger: 'Reenviar',
        link: 'monthly',
        icon: 'far fa-envelope'
    },
    {
        task: 'Calibraciones expiradas sin acción',
        description: 'Envía un correo sobre los equipos cuya calibración lleva 2 días ' 
        + 'expirada y aún no se han realizado acciones al respecto',
        frequency: 'Todos los días a las 7:20AM',
        trigger: 'Reenviar',
        link: 'advise',
        icon: 'far fa-envelope'
    },
    {
        task: 'Respaldo diario',
        description: 'Realiza un respaldo de la base de datos con la información actual, dicho ' 
        + 'respaldo se sobreescribe',
        frequency: 'Todos los días a las 0:00AM',
        trigger: 'Respaldar',
        link: 'backup/daily',
        icon: 'fas fa-history'
    },
    {
        task: 'Respaldo semanal',
        description: 'Realiza un respaldo de la base de datos con la información actual, dicho ' 
        + 'respaldo se mantiene. Si realiza un respaldo en un día que no sea lunes también se mantendrá ', 
        frequency: 'Cada lunes a las 0:15AM',
        trigger: 'Respaldar',
        link: 'backup/weekly',
        icon: 'fas fa-history'
    }
];