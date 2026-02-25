import prisma from "#config/db";


export const findAllUnsuspendedStudentsByTeacherId = async (teacherId) => {
    return prisma.student.findMany({
        where: {
            isSuspended: false,
            registrations: {
                some: { teacherId },
            },
        },
        select: { email: true },
        orderBy: { email: "asc" },
    });
};

export const findMentionedStudents = async (emails) => {
    if (!emails?.length) return [];

    return prisma.student.findMany({
        where: {
            isSuspended: false,
            email: { in: emails },
        },
        select: { email: true },
        orderBy: { email: "asc" },
    });
};