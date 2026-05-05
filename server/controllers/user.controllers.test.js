import { getCurrentUser } from './user.controllers.js';
import { jest } from '@jest/globals';

describe('getCurrentUser Controller', () => {
    let req, res;

    beforeEach(() => {
        req = {
            user: null
        };
        res = {
            json: jest.fn().mockReturnThis(),
            status: jest.fn().mockReturnThis()
        };
    });

    test('should return user when req.user exists', async () => {
        const mockUser = { id: '123', name: 'Test User' };
        req.user = mockUser;

        await getCurrentUser(req, res);

        expect(res.json).toHaveBeenCalledWith(mockUser);
    });

    test('should return user:null when req.user does not exist', async () => {
        req.user = null;

        await getCurrentUser(req, res);

        expect(res.json).toHaveBeenCalledWith({ user: null });
    });

    test('should return 500 status when an error occurs', async () => {
        // Mocking an error by making res.json throw
        const error = new Error('Database Error');
        res.json.mockImplementationOnce(() => {
            throw error;
        });

        await getCurrentUser(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            message: expect.stringContaining('get current user error')
        });
    });
});
