-- CreateTable
CREATE TABLE `teachers` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(255) NOT NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `email`(`email`),
    INDEX `idx_teacher_email`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `students` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(255) NOT NULL,
    `is_suspended` BOOLEAN NOT NULL DEFAULT false,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `email`(`email`),
    INDEX `idx_student_email`(`email`),
    INDEX `idx_student_suspended`(`is_suspended`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `registrations` (
    `teacher_id` INTEGER NOT NULL,
    `student_id` INTEGER NOT NULL,

    INDEX `idx_reg_teacher`(`teacher_id`),
    INDEX `idx_reg_student`(`student_id`),
    PRIMARY KEY (`teacher_id`, `student_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `registrations` ADD CONSTRAINT `registrations_ibfk_1` FOREIGN KEY (`teacher_id`) REFERENCES `teachers`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `registrations` ADD CONSTRAINT `registrations_ibfk_2` FOREIGN KEY (`student_id`) REFERENCES `students`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
