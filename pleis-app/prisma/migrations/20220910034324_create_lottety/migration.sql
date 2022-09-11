-- CreateTable
CREATE TABLE "Lottery" (
    "id" SERIAL NOT NULL,
    "itemId" INTEGER NOT NULL,
    "participants" TEXT[],

    CONSTRAINT "Lottery_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Lottery" ADD CONSTRAINT "Lottery_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;
