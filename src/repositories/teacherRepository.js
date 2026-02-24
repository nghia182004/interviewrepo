import prisma from "#config/db";

export const findAllTeachers = async () => {
    const teacher = await prisma.teacher.findFirst({
        select: { id: true },
        orderBy: { id: "asc" },
    });

    return teacher?.id ?? null;
};

export const findTeacherByEmail = async (email) => {
    const teacher = await prisma.teacher.findUnique({
        where: { email },
        select: { id: true },
    });

    return teacher?.id ?? null;
};

export const createTeacher = async (email) => {
    const created = await prisma.teacher.create({
        data: { email },
        select: { id: true },
    });

    return created.id;
};