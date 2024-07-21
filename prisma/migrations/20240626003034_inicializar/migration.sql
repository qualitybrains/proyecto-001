-- CreateTable
CREATE TABLE "USERS" (
    "id" INT4 NOT NULL GENERATED BY DEFAULT AS IDENTITY,
    "email" STRING NOT NULL,
    "full_name" STRING,
    "password" STRING NOT NULL,

    CONSTRAINT "USERS_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "USERS_email_key" ON "USERS"("email");