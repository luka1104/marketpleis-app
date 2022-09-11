/*
  Warnings:

  - Added the required column `deadline` to the `Lottery` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `Lottery` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Lottery" ADD COLUMN     "deadline" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "minters" TEXT[],
ADD COLUMN     "quantity" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "FCFS" (
    "id" SERIAL NOT NULL,
    "itemId" INTEGER NOT NULL,
    "minters" TEXT[],
    "quantity" INTEGER NOT NULL,
    "deadline" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FCFS_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FCFS" ADD CONSTRAINT "FCFS_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;
