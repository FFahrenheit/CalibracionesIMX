export interface Device {
    id? : string 
    serie? : string,
    descripcion? : string,
    ubicacion? : string,
    error? : string,
    resInf? : string,
    resSup? : string,
    calibracion? : string,
    periodo? : string,
    ultima? : Date,
    calibraciones? : Calibracion[],
    responsables? : Responsable[],
    verificadores? : string[],
    proveedores? : Proveedor[]
}

export interface Calibracion {
    calibrador? : string, 
    fecha? : Date,
    verificador? : string,
}

export interface Responsable {
    name? : string,
    username? : string,
    email? : string
}

export interface Proveedor {

}