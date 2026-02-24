import prisma from "#config/db";

export const registerForTeacher = async (teacherId, studentIds) => {
    if (!studentIds?.length) return null;

    await prisma.registration.createMany({
        data: studentIds.map((studentId) => ({
            teacherId,
            studentId,
        })),
        skipDuplicates: true, // equivalent to INSERT IGNORE for PK duplicates
    });

    return null;
};