import prisma from "#config/db";

export const findAllUnsuspendedStudentsByTeacher = async (email) => {
    const students = await prisma.student.findMany({
        where: {
            isSuspended: false,
            registrations: {
                some: {
                    teacher: { email }
                }
            }
        },
        select: { email: true }
    });

    return students;
};

export const findMentionedStudents = async (emails) => {
    if (!emails?.length) return [];

    const students = await prisma.student.findMany({
        where: {
            isSuspended: false,
            email: { in: emails }
        },
        select: { email: true }
    });

    return students;
};