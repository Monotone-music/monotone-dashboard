export interface Account {
    id: string;
    username: string;
    email: string;
    role: 'admin' | 'user' | 'manager';
    isActive: boolean;
    createdAt: string;
    lastLogin: string;
}

export const mockAccounts: Account[] = [
    {
        id: '1',
        username: 'admin.user',
        email: 'admin@example.com',
        role: 'admin',
        isActive: true,
        createdAt: '2023-01-15T08:30:00Z',
        lastLogin: '2023-09-20T14:25:00Z',
    },
    {
        id: '2',
        username: 'john.doe',
        email: 'john.doe@example.com',
        role: 'user',
        isActive: true,
        createdAt: '2023-03-20T10:15:00Z',
        lastLogin: '2023-09-19T09:45:00Z',
    },
    {
        id: '3',
        username: 'sarah.manager',
        email: 'sarah.m@example.com',
        role: 'manager',
        isActive: true,
        createdAt: '2023-02-10T11:20:00Z',
        lastLogin: '2023-09-20T16:30:00Z',
    },
    {
        id: '4',
        username: 'inactive.user',
        email: 'inactive@example.com',
        role: 'user',
        isActive: false,
        createdAt: '2023-01-05T09:00:00Z',
        lastLogin: '2023-05-15T11:20:00Z',
    },
];