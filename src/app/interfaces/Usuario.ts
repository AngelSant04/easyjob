export interface Usuario{
    id?:string,
    nombres: string ,
    apellidos: string,
    celular: string,
    fechaNacimiento: string,
    usuario: string,
    correo: string,
    clave: string
    imgUsuario?:string,
    dni:string
}
// Generated by https://quicktype.io

export interface DNIResponse {
    success: boolean;
    data:    DataDNI;
    source:  string;
}
export interface DataDNI {
    numero:           string;
    nombre_completo:  string;
    nombres:          string;
    apellido_paterno: string;
    apellido_materno: string;
    ubigeo_sunat:     null;
    ubigeo:           null[];
}
