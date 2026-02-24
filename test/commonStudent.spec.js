
const { jest } = await import('@jest/globals');

const mockGet = jest.fn();
await jest.unstable_mockModule('#services/commonStudentService', () => ({
    default: {
        get: mockGet
    }
}));

const { GetCommonStudents } = await import("../src/controllers/management/commonStudentController.js");

describe('commonStudentController - GetCommonStudents', () => {
    let req, res, next;

    beforeEach(() => {
        jest.clearAllMocks();

        req = {
            validatedBody: {
                teacher: 'teacherken@gmail.com'
            }
        };

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        };

        next = jest.fn();
    });

    describe('Successful retrieval', () => {
        it('should get common students for single teacher and return 200 status', async () => {
            const mockStudents = [
                { email: 'student1@gmail.com' },
                { email: 'student2@gmail.com' }
            ];
            mockGet.mockResolvedValue(mockStudents);

            await GetCommonStudents(req, res, next);

            expect(mockGet).toHaveBeenCalledTimes(1);
            expect(mockGet).toHaveBeenCalledWith(['teacherken@gmail.com']);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                students: ['student1@gmail.com', 'student2@gmail.com']
            });
            expect(next).not.toHaveBeenCalled();
        });

        it('should handle single teacher as string', async () => {
            req.validatedBody.teacher = 'teacher@example.com';
            const mockStudents = [
                { email: 'student1@gmail.com' }
            ];
            mockGet.mockResolvedValue(mockStudents);

            await GetCommonStudents(req, res, next);

            expect(mockGet).toHaveBeenCalledWith(['teacher@example.com']);
            expect(res.status).toHaveBeenCalledWith(200);
        });

        it('should handle multiple teachers as array', async () => {
            req.validatedBody.teacher = [
                'teacher1@gmail.com',
                'teacher2@gmail.com'
            ];
            const mockStudents = [
                { email: 'commonstudent@gmail.com' }
            ];
            mockGet.mockResolvedValue(mockStudents);

            await GetCommonStudents(req, res, next);

            expect(mockGet).toHaveBeenCalledWith([
                'teacher1@gmail.com',
                'teacher2@gmail.com'
            ]);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                students: ['commonstudent@gmail.com']
            });
        });

        it('should pass correct teacher emails array to service', async () => {
            req.validatedBody.teacher = ['teacher1@gmail.com', 'teacher2@gmail.com'];
            const mockStudents = [];
            mockGet.mockResolvedValue(mockStudents);

            await GetCommonStudents(req, res, next);

            const [teacherEmailsArg] = mockGet.mock.calls[0];
            expect(teacherEmailsArg).toEqual([
                'teacher1@gmail.com',
                'teacher2@gmail.com'
            ]);
        });

        it('should return empty array when no common students found', async () => {
            mockGet.mockResolvedValue([]);

            await GetCommonStudents(req, res, next);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                students: []
            });
        });

        it('should map student objects to email strings correctly', async () => {
            const mockStudents = [
                { email: 'alice@gmail.com', name: 'Alice' },
                { email: 'bob@gmail.com', name: 'Bob' },
                { email: 'charlie@gmail.com', name: 'Charlie' }
            ];
            mockGet.mockResolvedValue(mockStudents);

            await GetCommonStudents(req, res, next);

            expect(res.json).toHaveBeenCalledWith({
                students: [
                    'alice@gmail.com',
                    'bob@gmail.com',
                    'charlie@gmail.com'
                ]
            });
        });
    });

    describe('Error handling', () => {
        it('should call next with error when service throws an error', async () => {
            const mockError = new Error('Database connection failed');
            mockGet.mockRejectedValue(mockError);

            await GetCommonStudents(req, res, next);

            expect(mockGet).toHaveBeenCalledTimes(1);
            expect(next).toHaveBeenCalledWith(mockError);
            expect(res.status).not.toHaveBeenCalled();
            expect(res.json).not.toHaveBeenCalled();
        });

        it('should handle teacher not found errors', async () => {
            const notFoundError = new Error('Teacher not found');
            notFoundError.statusCode = 404;
            mockGet.mockRejectedValue(notFoundError);

            await GetCommonStudents(req, res, next);

            expect(next).toHaveBeenCalledWith(notFoundError);
            expect(next.mock.calls[0][0].statusCode).toBe(404);
        });

        it('should handle service unavailable errors', async () => {
            const serviceError = new Error('Service temporarily unavailable');
            serviceError.statusCode = 503;
            mockGet.mockRejectedValue(serviceError);

            await GetCommonStudents(req, res, next);

            expect(next).toHaveBeenCalledWith(serviceError);
        });

        it('should handle database query errors', async () => {
            const dbError = new Error('Query execution failed');
            dbError.statusCode = 500;
            mockGet.mockRejectedValue(dbError);

            await GetCommonStudents(req, res, next);

            expect(next).toHaveBeenCalledWith(dbError);
        });
    });

    describe('Edge cases', () => {
        it('should handle single teacher in array format', async () => {
            req.validatedBody.teacher = ['singleteacher@gmail.com'];
            const mockStudents = [
                { email: 'student@gmail.com' }
            ];
            mockGet.mockResolvedValue(mockStudents);

            await GetCommonStudents(req, res, next);

            expect(mockGet).toHaveBeenCalledWith(['singleteacher@gmail.com']);
            expect(res.status).toHaveBeenCalledWith(200);
        });





        it('should keep array teacher as array', async () => {
            req.validatedBody.teacher = ['teacher1@gmail.com', 'teacher2@gmail.com'];
            mockGet.mockResolvedValue([]);

            await GetCommonStudents(req, res, next);

            const [teacherEmailsArg] = mockGet.mock.calls[0];
            expect(Array.isArray(teacherEmailsArg)).toBe(true);
            expect(teacherEmailsArg).toEqual([
                'teacher1@gmail.com',
                'teacher2@gmail.com'
            ]);
        });
    });
});