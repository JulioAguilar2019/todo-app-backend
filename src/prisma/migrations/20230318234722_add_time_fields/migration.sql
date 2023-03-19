/*
  Warnings:

  - The `end_time` column on the `task` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `start_time` column on the `task` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "task" DROP COLUMN "end_time",
ADD COLUMN     "end_time" VARCHAR(10),
DROP COLUMN "start_time",
ADD COLUMN     "start_time" VARCHAR(10);
