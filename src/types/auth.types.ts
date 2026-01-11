import { User } from './user.types';

export interface LoginRequest {
    email: string;
    password?: string; // Optional if using external providers
}

export interface LoginResponse {
    user: User;
    token: string;
}

export interface MeResponse extends User { }
