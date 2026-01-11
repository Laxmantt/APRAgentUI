export interface ApiErrorDetails {
    code?: string;
    message: string;
    details?: Record<string, any>;
    fieldErrors?: Record<string, string[]>;
}

export interface PageMeta {
    currentPage: number;
    pageSize: number;
    totalPages: number;
    totalItems: number;
    hasNext: boolean;
    hasPrevious: boolean;
}

export interface ApiResponse<T> {
    success: boolean;
    data: T;
    message?: string;
    meta?: PageMeta;
    error?: ApiErrorDetails;
    timestamp: string;
}

export interface IdResponse {
    id: string | number;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
    meta: PageMeta;
}

// Common Request Types
export interface PaginationParams {
    page?: number;
    limit?: number;
    sortBy?: string;
    sortDir?: 'asc' | 'desc';
}

export interface DateRangeParams {
    startDate?: string;
    endDate?: string;
}
