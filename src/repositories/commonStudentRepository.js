import prisma from "#config/db";

export const findCommonStudents = async (teacherIds) => {
    const teacherId = teacherIds[0];

    return prisma.student.findMany({
        where: {
            registrations: {
                some: { teacherId }
            }
        },
        select: {
            id: true,
            email: true,
            isSuspended: true
        },
        orderBy: { email: "asc" }
    });
};

export const findCommonStudentsOfMany = async (teacherIds) => {

    return prisma.student.findMany({
        where: {
            AND: teacherIds.map((tid) => ({
                registrations: { some: { teacherId: tid } }
            }))
        },
        select: {
            id: true,
            email: true,
            isSuspended: true
        },
        orderBy: { email: "asc" }
    });
};
