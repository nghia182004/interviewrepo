import prisma from "#config/db";

export const findAllStudents = async () => {
    const student = await prisma.student.findFirst({
        select: { id: true },
        orderBy: { id: "asc" },
    });

    return student?.id ?? null;
};

export const findStudentByEmail = async (email) => {
    const student = await prisma.student.findUnique({
        where: { email },
        select: { id: true },
    });

    return student?.id ?? null;
};

export const createStudent = async (email) => {
    const created = await prisma.student.create({
        data: { email },
        select: { id: true },
    });

    return created.id;
};