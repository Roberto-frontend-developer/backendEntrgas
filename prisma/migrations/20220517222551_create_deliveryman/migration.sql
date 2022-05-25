-- CreateTable
CREATE TABLE "Deliverymam" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Deliverymam_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Deliverymam_username_key" ON "Deliverymam"("username");
