import { prisma } from "../../../database/prismaClient";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

interface IAuthenticateDeliveryman {
 username: string;
 password: string;
}


export class AuthenticateDeliverymanUseCase {
 async execute({username, password}: IAuthenticateDeliveryman){
  //receber username e password
  const deliveryman = await prisma.deliverymam.findFirst({
   where: {
    username
   }
  })

  //verificar se username cadastrado
  if(!deliveryman){
   throw new Error("Username or password invalid!")
  }
  //verificar se senha corresponder ao username
  const passwordMatcher =  await compare(password, deliveryman.password);

  if(!passwordMatcher){
   throw new Error("Username or password invalid!")
  }
  //gerar o token
  const token = sign({username},"03b049037fd21e2f55cb7f222ae56087", {
   subject: deliveryman.id,
   expiresIn:"1d"
  })

  return token;

 }
}
