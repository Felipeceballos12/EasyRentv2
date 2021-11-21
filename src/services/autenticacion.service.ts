//Concección con loopback y la generación de claves de correo electronico
import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import {repository} from '@loopback/repository';
import {Cliente} from '../models';
import {ClienteRepository} from '../repositories';
const generador = require("password-generator")
const cryptoJS = require("crypto.js")
const jwt = require("jsonwebtoken")

@injectable({scope: BindingScope.TRANSIENT})
export class AutentificacionService {
  constructor(
    @repository(ClienteRepository)
    public clienteRepository: ClienteRepository
  ) { }


  /*
   * Add service methods here
   */
  GenerarClave() {
    let clave = generador(6, false)
    return clave;
  }

  CifrarClave(clave: string) {
    let ClaveCifrada = cryptoJS.MD5(clave).toString();
    return ClaveCifrada
  }

  IdentificarPersona(usuario: string, clave: string) {
    try {
      let p = this.clienteRepository.findOne({where: {Correo: usuario, Clave: clave}});
      if (p) {
        return p;
      }
      return false;
    } catch {
      return false;
    }

    //Generador de token (Minuto 7:30 video JWT)


  }
}
