import prisma from "#config/db";

export const suspendStudent = async (email) => {
    await prisma.student.update({
        where: { email },
        data: { isSuspended: true },
    });

    return null;
};