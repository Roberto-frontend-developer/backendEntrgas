/*
  Warnings:

  - Made the column `id_deliveryman` on table `deliveries` required. This step will fail if there are existing NULL values in that column.
  - Made the column `end_at` on table `deliveries` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "deliveries" DROP CONSTRAINT "deliveries_id_deliveryman_fkey";

-- AlterTable
ALTER TABLE "deliveries" ALTER COLUMN "id_deliveryman" SET NOT NULL,
ALTER COLUMN "end_at" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "deliveries" ADD CONSTRAINT "deliveries_id_deliveryman_fkey" FOREIGN KEY ("id_deliveryman") REFERENCES "deliveryman"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
