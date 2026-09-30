import "dotenv/config";
import { PrismaClient } from "@/src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { categories } from "./data/categories";
import { products } from "./data/products";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

async function main() {

    try {
        
        await prisma.category.createMany({ data: categories }); //inserta categories
        await prisma.product.createMany({ data: products }); //inserta products, deebe estar despues de categories porque primero se necesita categories
        console.log("Seed completado con éxito.");
    } catch (error) {
        console.log(error)
    }



}

main()
  .then(async () => {
    await prisma.$disconnect();
  }) //si se ecjecuta correctamente la parte del try se ejecuta el then sino el catch
  .catch(async (e) => {
    console.error("Error durante el seed:", e);
    await prisma.$disconnect(); //esto desconecta prisma
    process.exit(1); //sacamos el proceso porque termina con error, le pongo 0 termina el script pero con exito
  });