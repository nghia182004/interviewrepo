// test/notification.spec.js

const { jest } = await import('@jest/globals');

const mockGetRecipients = jest.fn();
await jest.unstable_mockModule('../src/services/notificationService.js', () => ({
    default: {
        getRecipients: mockGetRecipients
    }
}));

const { getRecipients } = await import("../src/controllers/management/notificationController.js");

describe('notificationController - getRecipients', () => {
    let req, res, next;

    beforeEach(() => {
        jest.clearAllMocks();

        req = {
            validatedBody: {
                teacher: 'teacherken@gmail.com',
                notification: 'Hello students! @studentagnes@gmail.com @studentmiche@gmail.com'
            }
        };

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        };

        next = jest.fn();
    });

    describe('Successful retrieval', () => {
        it('should get notification recipients successfully and return 200 status', async () => {
            const mockResult = {
                recipients: [
                    { email: 'studentagnes@gmail.com' },
                    { email: 'studentmiche@gmail.com' }
                ]
            };
            mockGetRecipients.mockResolvedValue(mockResult);

            await getRecipients(req, res, next);

            expect(mockGetRecipients).toHaveBeenCalledTimes(1);
            expect(mockGetRecipients).toHaveBeenCalledWith(
                'teacherken@gmail.com',
                'Hello students! @studentagnes@gmail.com @studentmiche@gmail.com'
            );
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                recipients: ['studentagnes@gmail.com', 'studentmiche@gmail.com']
            });
            expect(next).not.toHaveBeenCalled();
        });

        it('should pass correct teacher and notification to service', async () => {
            const mockResult = { recipients: [] };
            mockGetRecipients.mockResolvedValue(mockResult);

            await getRecipients(req, res, next);

            const [teacherArg, notificationArg] = mockGetRecipients.mock.calls[0];
            expect(teacherArg).toEqual('teacherken@gmail.com');
            expect(notificationArg).toEqual('Hello students! @studentagnes@gmail.com @studentmiche@gmail.com');
        });

        it('should handle notification with single mentioned student', async () => {
            req.validatedBody.notification = 'Hello @student@gmail.com';
            const mockResult = {
                recipients: [
                    { email: 'student@gmail.com' }
                ]
            };
            mockGetRecipients.mockResolvedValue(mockResult);

            await getRecipients(req, res, next);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                recipients: ['student@gmail.com']
            });
        });

        it('should handle notification with no mentioned students', async () => {
            req.validatedBody.notification = 'Hello everyone!';
            const mockResult = {
                recipients: [
                    { email: 'student1@gmail.com' },
                    { email: 'student2@gmail.com' }
                ]
            };
            mockGetRecipients.mockResolvedValue(mockResult);

            await getRecipients(req, res, next);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                recipients: ['student1@gmail.com', 'student2@gmail.com']
            });
        });

        it('should return empty array when no recipients found', async () => {
            const mockResult = { recipients: [] };
            mockGetRecipients.mockResolvedValue(mockResult);

            await getRecipients(req, res, next);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                recipients: []
            });
        });

        it('should map recipient objects to email strings correctly', async () => {
            const mockResult = {
                recipients: [
                    { email: 'alice@gmail.com' },
                    { email: 'bob@gmail.com' },
                    { email: 'charlie@gmail.com' }
                ]
            };
            mockGetRecipients.mockResolvedValue(mockResult);

            await getRecipients(req, res, next);

            expect(res.json).toHaveBeenCalledWith({
                recipients: [
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
            mockGetRecipients.mockRejectedValue(mockError);

            await getRecipients(req, res, next);

            expect(mockGetRecipients).toHaveBeenCalledTimes(1);
            expect(next).toHaveBeenCalledWith(mockError);
            expect(res.status).not.toHaveBeenCalled();
            expect(res.json).not.toHaveBeenCalled();
        });

        it('should handle teacher not found errors', async () => {
            const notFoundError = new Error('Teacher not found');
            notFoundError.statusCode = 404;
            mockGetRecipients.mockRejectedValue(notFoundError);

            await getRecipients(req, res, next);

            expect(next).toHaveBeenCalledWith(notFoundError);
            expect(next.mock.calls[0][0].statusCode).toBe(404);
        });

        it('should handle service unavailable errors', async () => {
            const serviceError = new Error('Service temporarily unavailable');
            serviceError.statusCode = 503;
            mockGetRecipients.mockRejectedValue(serviceError);

            await getRecipients(req, res, next);

            expect(next).toHaveBeenCalledWith(serviceError);
        });

        it('should handle invalid notification format errors', async () => {
            const validationError = new Error('Invalid notification format');
            validationError.statusCode = 400;
            mockGetRecipients.mockRejectedValue(validationError);

            await getRecipients(req, res, next);

            expect(next).toHaveBeenCalledWith(validationError);
            expect(next.mock.calls[0][0].statusCode).toBe(400);
        });
    });


    describe('Response validation', () => {
        it('should always return 200 status on success', async () => {
            const mockResult = { recipients: [] };
            mockGetRecipients.mockResolvedValue(mockResult);

            await getRecipients(req, res, next);

            expect(res.status).toHaveBeenCalledWith(200);
        });

        it('should return recipients array in response', async () => {
            const mockResult = { recipients: [{ email: 'test@gmail.com' }] };
            mockGetRecipients.mockResolvedValue(mockResult);

            await getRecipients(req, res, next);

            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    recipients: expect.any(Array)
                })
            );
        });


    });
});