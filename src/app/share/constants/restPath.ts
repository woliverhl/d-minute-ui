export class restPath {
    public APP: string = '/api/dminute';
    //public APP: string = 'https://dminutezuul.herokuapp.com/api/dminutems';
    //public APP: string = 'https://dminuteapi.herokuapp.com';
    public logIn: string = '/token/generate-token';
    public listProyects = '/proyecto/listarProyectoUsuario';
    public listUsers = '/usuario/listaUsuarios';
    public addProyect = '/proyecto/nuevoProyecto';
    public addActa = '/acta/guardarActa';
    public projectById = '/proyecto/proyectoid/';
    public guardarReunion = '/acta/guardarActa';
    public listarReuniones = '/acta/listarActaProyecto/';
    public getUser = '/usuario/user?username=';
    public getAttendantList = '/acta/getUsuariosActa/';
    public getMeetingById = '/acta/getActa/';
    public usuarioGuardar = '/token/usuarioGuardar';
}
