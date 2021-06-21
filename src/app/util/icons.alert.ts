export class IconsAlert {
    public static icons = {
        'ok': 'fas fa-check-circle ok-icon-st',
        'warning': 'fas fa-exclamation-circle warning-icon-st',
        'not-ok': 'fas fa-exclamation-circle not-ok-icon-st',
        'unknown': 'fas fa-question-circle',
        'waiting': 'fas fa-clock warning-icon-st'
    };

    constructor() {
    }

    public static calibrado(fecha){
        return (Date.parse(fecha) - Date.parse((new Date()).toString()) < 0) ? this.icons['not-ok'] : this.icons['ok'];
    }

    public static estado(estado){
        return this.icon(this.getStatus(estado));
    }

    public static activo(activo){
        return this.icon(this.getActive(activo));
    }

    public static icon(icon){
        return this.icons[icon];
    }

    public static getStatus(status): string {
        if (status == null) {
            return ''
        };

        switch (status) {
            case 'Calibración Aceptada':
            case 'Referencia':
                return 'ok';
            case 'En Proceso de Calibración':
            case 'Reparacion':
                return 'waiting';
            case 'Calibración Pendiente':
                return 'warning';
            case 'Desactivado':
            case 'Baja':
                return 'not-ok';
            default:
                return 'unknown';
        }
    }

    public static getActive(active) {
        if (active == null) {
            return ''
        };

        switch (active) {
            case 'Activo':
                return 'ok';
            case 'Reparacion':
            case 'Inactivo':
                return 'waiting';
            case 'Baja':
            case 'Desactivado':
            case 'Extraviado':
                return 'not-ok';
            default:
                return 'unknown';
        }
    }
}