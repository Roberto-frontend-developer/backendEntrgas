import { prisma } from "../../../database/prismaClient";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

interface IAuthenticateClient {
 username: string;
 password: string;
}


export class AuthenticateClientUseCase {
 async execute({username, password}: IAuthenticateClient){
  //receber username e password
  const client = await prisma.clients.findFirst({
   where: {
    username
   }
  })

  //verificar se username cadastrado
  if(!client){
   throw new Error("Username or password invalid!")
  }
  //verificar se senha corresponder ao username
  const passwordMatcher =  await compare(password, client.password);

  if(!passwordMatcher){
   throw new Error("Username or password invalid!")
  }
  //gerar o token
  const token = sign({username},"03b049037fd21e2fafcb7f222ae56087", {
   subject:client.id,
   expiresIn:"1d"
  })

  return token;

 }
}
