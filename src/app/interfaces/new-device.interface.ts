export interface Device {
    tipo? : string,
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
    siguiente? : Date,
    aviso? : Date,
    calibraciones? : Calibracion[],
    responsables? : Responsable[],
    verificadores? : Verificacion[],
    proveedores? : Proveedor[]
    estado ? : string,
    activo ? : string,
    _responsables ? : Responsable[],
    _proveedores ? : _Proveedor[],
    _calibraciones ? :Calibracion[],
    certificate ? : File,
    ryr ? : File,
    resource ? : File
}

export interface _Responsable{
    usuario ? : string
}

export interface _Proveedor{
    nombre ? : string
}

export interface _Calibracion{
    calibrador? : string, 
    fecha? : Date,
    verificador? : string,
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
    nombre? : string,
    usuario? : string,
    email? : string
}

export interface Proveedor {
    nombre? : string,
    certificado? : File
}