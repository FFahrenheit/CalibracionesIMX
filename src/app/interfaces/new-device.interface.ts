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
    verificadores? : Verificacion[],
    proveedores? : Proveedor[]
}

export interface Verificacion {
    nombre? : string,
}

export interface Calibracion {
    calibrador? : string, 
    fecha? : Date,
    verificador? : string,
    verifico? : string
}

export interface Responsable {
    name? : string,
    username? : string,
    email? : string
}

export interface Proveedor {
    nombre? : string,
    certificado? : File
}