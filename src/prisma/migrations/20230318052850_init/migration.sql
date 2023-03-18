-- CreateTable
CREATE TABLE "task" (
    "task_id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" TEXT,
    "start_date" TIMESTAMP NOT NULL,
    "end_date" TIMESTAMP,
    "status" VARCHAR(20) NOT NULL,
    "task_category_id" INTEGER NOT NULL,
    "user_profile_id" INTEGER NOT NULL,

    CONSTRAINT "task_pkey" PRIMARY KEY ("task_id")
);

-- CreateTable
CREATE TABLE "task_category" (
    "task_category_id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "color" VARCHAR(20) NOT NULL,

    CONSTRAINT "task_category_pkey" PRIMARY KEY ("task_category_id")
);

-- CreateTable
CREATE TABLE "user_profile" (
    "user_profile_id" SERIAL NOT NULL,
    "first_name" VARCHAR(50) NOT NULL,
    "last_name" VARCHAR(50) NOT NULL,
    "photo" TEXT,
    "email" VARCHAR(100) NOT NULL,
    "password" VARCHAR(100) NOT NULL,
    "confirm_password" VARCHAR(100) NOT NULL,
    "tel" VARCHAR(20),

    CONSTRAINT "user_profile_pkey" PRIMARY KEY ("user_profile_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_profile_email_key" ON "user_profile"("email");

-- AddForeignKey
ALTER TABLE "task" ADD CONSTRAINT "fk_task_category_id" FOREIGN KEY ("task_category_id") REFERENCES "task_category"("task_category_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "task" ADD CONSTRAINT "fk_user_profile_id" FOREIGN KEY ("user_profile_id") REFERENCES "user_profile"("user_profile_id") ON DELETE NO ACTION ON UPDATE NO ACTION;
