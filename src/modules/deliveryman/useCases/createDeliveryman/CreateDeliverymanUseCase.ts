import { prisma } from "../../../../database/prismaClient";
import { hash } from "bcrypt"

interface ICreteDeliveryman {
 username: string;
 password: string;
}

export class CreateDeliverymanUseCase {
 async execute({username, password}: ICreteDeliveryman){
  const deliverymanExist = await prisma.deliverymam.findFirst({
   where: {
    username:{
     mode: "insensitive"
    }
   }
  })

  if(deliverymanExist) {
   throw new Error("Deliveryman already exists")
  }
  //Criptografa a senha
  const hashPassword = await hash(password, 10);
  //salvar o Deliveryman
  const deliveryman = await prisma.deliverymam.create({
   data:{
    username,
    password: hashPassword,
   }
  })
  return deliveryman;
}
}
