-- CreateTable
CREATE TABLE "Veteran" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "rank" TEXT NOT NULL,
    "branch" TEXT NOT NULL,
    "startYear" INTEGER,
    "endYear" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Ship" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "ServiceRecord" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "unit" TEXT NOT NULL,
    "startYear" INTEGER,
    "endYear" INTEGER,
    "veteranId" TEXT NOT NULL,
    CONSTRAINT "ServiceRecord_veteranId_fkey" FOREIGN KEY ("veteranId") REFERENCES "Veteran" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ServiceRecordShip" (
    "serviceRecordId" TEXT NOT NULL,
    "shipId" TEXT NOT NULL,

    PRIMARY KEY ("serviceRecordId", "shipId"),
    CONSTRAINT "ServiceRecordShip_serviceRecordId_fkey" FOREIGN KEY ("serviceRecordId") REFERENCES "ServiceRecord" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ServiceRecordShip_shipId_fkey" FOREIGN KEY ("shipId") REFERENCES "Ship" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Ship_name_key" ON "Ship"("name");
