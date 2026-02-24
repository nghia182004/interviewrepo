
const { jest } = await import('@jest/globals');


const mockRegister = jest.fn();
await jest.unstable_mockModule('../src/services/registrationService.js', () => ({
    default: {
        register: mockRegister
    }
}));


const { registerForTeacher } = await import("../src/controllers/management/registrationController.js");

describe('registrationController - registerForTeacher', () => {
    let req, res, next;

    beforeEach(() => {
        jest.clearAllMocks();

        req = {
            validatedBody: {
                teacher:
                    'john@example.com'
                ,
                students: [
                    "studentjon@gmail.com",
                    "studenthon@gmail.com"
                ]
            }
        };

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        };

        next = jest.fn();
    });

    describe('Successful registration', () => {
        it('should register teacher and students successfully and return 201 status', async () => {
            const mockResult = {
                message: 'Registration successful'
            };
            mockRegister.mockResolvedValue(mockResult);

            await registerForTeacher(req, res, next);

            expect(mockRegister).toHaveBeenCalledTimes(1);
            expect(mockRegister).toHaveBeenCalledWith(
                req.validatedBody.teacher,
                req.validatedBody.students
            );
            expect(res.status).toHaveBeenCalledWith(204);

            expect(next).not.toHaveBeenCalled();
        });

        it('should pass correct teacher and students data to service', async () => {
            const mockResult = { message: 'Success' };
            mockRegister.mockResolvedValue(mockResult);

            await registerForTeacher(req, res, next);

            const [teacherArg, studentsArg] = mockRegister.mock.calls[0];
            expect(teacherArg).toEqual(req.validatedBody.teacher);
            expect(studentsArg).toEqual(req.validatedBody.students);
        });
    });

    describe('Error handling', () => {
        it('should call next with error when service throws an error', async () => {
            const mockError = new Error('Database connection failed');
            mockRegister.mockRejectedValue(mockError);

            await registerForTeacher(req, res, next);

            expect(mockRegister).toHaveBeenCalledTimes(1);
            expect(next).toHaveBeenCalledWith(mockError);
            expect(res.status).not.toHaveBeenCalled();
            expect(res.json).not.toHaveBeenCalled();
        });

        it('should handle validation errors from service', async () => {
            const validationError = new Error('Invalid teacher data');
            validationError.statusCode = 400;
            mockRegister.mockRejectedValue(validationError);

            await registerForTeacher(req, res, next);

            expect(next).toHaveBeenCalledWith(validationError);
            expect(next.mock.calls[0][0].statusCode).toBe(400);
        });

        it('should handle service unavailable errors', async () => {
            const serviceError = new Error('Service temporarily unavailable');
            serviceError.statusCode = 503;
            mockRegister.mockRejectedValue(serviceError);

            await registerForTeacher(req, res, next);

            expect(next).toHaveBeenCalledWith(serviceError);
        });
    });

    describe('Edge cases', () => {
        it('should handle empty students array', async () => {
            req.validatedBody.students = [];
            const mockResult = { message: 'Teacher registered without students' };
            mockRegister.mockResolvedValue(mockResult);

            await registerForTeacher(req, res, next);

            expect(mockRegister).toHaveBeenCalledWith(
                req.validatedBody.teacher,
                []
            );
            expect(res.status).toHaveBeenCalledWith(204);
        });
    });
});