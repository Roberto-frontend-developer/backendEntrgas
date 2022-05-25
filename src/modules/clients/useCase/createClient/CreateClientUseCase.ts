import { prisma } from "../../../../database/prismaClient";
import { hash } from "bcrypt"


interface ICreateclient {
 username: string;
 password: string;
}


export class CreateClientUseCase {
 async execute ({password, username}: ICreateclient){
   //validar se usuário existe
   const clientExist = await prisma.clients.findFirst({
    where: {
     username:{
      mode: "insensitive"
     }
    }
   })

   if(clientExist) {
    throw new Error("Client already exists")
   }
   //Criptografa a senha
   const hashPassword = await hash(password, 10);
   //salvar o cliente
   const client = await prisma.clients.create({
    data:{
     username,
     password: hashPassword,
    }
   })
   return client;
 }
}