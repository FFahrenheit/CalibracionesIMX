export const profileOptions = [
    // {
    //     title: 'Mi perfil',
    //     icon: 'fas fa-user-circle pr-1',
    //     listener: ''
    // },
    {
        title: 'Cambiar contraseña',
        icon: 'fas fa-key pr-1',
        listener: 'change'
    },
    {
        title: 'Cerrar sesión',
        icon: 'fas fa-sign-out-alt pr-1',
        listener: 'logout'
    }
]

export const adminOptions = [
    {
        title: 'Administrar encargados',
        icon: 'fas fa-users-cog pr-1',
        listener: 'admins'
    },
    {
        title: 'Agregar usuarios',
        icon: 'fas fa-user-plus pr-1',
        listener: 'add'
    },
    {
        title: 'Borrar registros',
        icon: 'fas fa-tools pr-1',
        listener: 'delete'
    }
];