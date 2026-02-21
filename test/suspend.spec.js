// test/suspendStudent.spec.js

const { jest } = await import('@jest/globals');

const mockSuspend = jest.fn();
await jest.unstable_mockModule('../src/services/suspendStudentService.js', () => ({
    default: {
        suspend: mockSuspend
    }
}));

const { suspendStudent } = await import("../src/controllers/api/suspendStudentController.js");

describe('suspendStudentController - suspendStudent', () => {
    let req, res, next;

    beforeEach(() => {
        jest.clearAllMocks();

        req = {
            validatedBody: {
                student: 'studentjon@gmail.com'
            }
        };

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        };

        next = jest.fn();
    });

    describe('Successful suspension', () => {
        it('should suspend student successfully and return 204 status', async () => {
            const mockResult = {
                message: 'Student suspended successfully'
            };
            mockSuspend.mockResolvedValue(mockResult);

            await suspendStudent(req, res, next);

            expect(mockSuspend).toHaveBeenCalledTimes(1);
            expect(mockSuspend).toHaveBeenCalledWith('studentjon@gmail.com');
            expect(res.status).toHaveBeenCalledWith(204);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Student suspended successfully'
            });
            expect(next).not.toHaveBeenCalled();
        });

        it('should pass correct student email to service', async () => {
            const mockResult = { message: 'Success' };
            mockSuspend.mockResolvedValue(mockResult);

            await suspendStudent(req, res, next);

            const [studentArg] = mockSuspend.mock.calls[0];
            expect(studentArg).toEqual('studentjon@gmail.com');
        });

        it('should handle different student emails', async () => {
            req.validatedBody.student = 'alice@example.com';
            const mockResult = { message: 'Student suspended' };
            mockSuspend.mockResolvedValue(mockResult);

            await suspendStudent(req, res, next);

            expect(mockSuspend).toHaveBeenCalledWith('alice@example.com');
            expect(res.status).toHaveBeenCalledWith(204);
        });

        it('should return service message in response', async () => {
            const mockResult = {
                message: 'Student account has been suspended'
            };
            mockSuspend.mockResolvedValue(mockResult);

            await suspendStudent(req, res, next);

            expect(res.json).toHaveBeenCalledWith({
                message: 'Student account has been suspended'
            });
        });
    });

    describe('Error handling', () => {
        it('should call next with error when service throws an error', async () => {
            const mockError = new Error('Database connection failed');
            mockSuspend.mockRejectedValue(mockError);

            await suspendStudent(req, res, next);

            expect(mockSuspend).toHaveBeenCalledTimes(1);
            expect(next).toHaveBeenCalledWith(mockError);
            expect(res.status).not.toHaveBeenCalled();
            expect(res.json).not.toHaveBeenCalled();
        });

        it('should handle student not found errors', async () => {
            const notFoundError = new Error('Student not found');
            notFoundError.statusCode = 404;
            mockSuspend.mockRejectedValue(notFoundError);

            await suspendStudent(req, res, next);

            expect(next).toHaveBeenCalledWith(notFoundError);
            expect(next.mock.calls[0][0].statusCode).toBe(404);
        });

        it('should handle already suspended student errors', async () => {
            const alreadySuspendedError = new Error('Student is already suspended');
            alreadySuspendedError.statusCode = 409;
            mockSuspend.mockRejectedValue(alreadySuspendedError);

            await suspendStudent(req, res, next);

            expect(next).toHaveBeenCalledWith(alreadySuspendedError);
            expect(next.mock.calls[0][0].statusCode).toBe(409);
        });

        it('should handle service unavailable errors', async () => {
            const serviceError = new Error('Service temporarily unavailable');
            serviceError.statusCode = 503;
            mockSuspend.mockRejectedValue(serviceError);

            await suspendStudent(req, res, next);

            expect(next).toHaveBeenCalledWith(serviceError);
        });

        it('should handle database update errors', async () => {
            const dbError = new Error('Failed to update student status');
            dbError.statusCode = 500;
            mockSuspend.mockRejectedValue(dbError);

            await suspendStudent(req, res, next);

            expect(next).toHaveBeenCalledWith(dbError);
        });
    });




    describe('Response validation', () => {
        it('should always return 204 status on success', async () => {
            const mockResult = { message: 'Any message' };
            mockSuspend.mockResolvedValue(mockResult);

            await suspendStudent(req, res, next);

            expect(res.status).toHaveBeenCalledWith(204);
        });

        it('should include message in response body', async () => {
            const mockResult = { message: 'Custom suspension message' };
            mockSuspend.mockResolvedValue(mockResult);

            await suspendStudent(req, res, next);

            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    message: expect.any(String)
                })
            );
        });


    });
});