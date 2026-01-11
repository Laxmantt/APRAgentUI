export interface UploadedFile {
    id: string;
    fileName: string;
    date: string;
    size: string;
    timestamp: number;
    status: 'success' | 'error' | 'uploading';
    type: string;
}

export const initialUploadedFiles: UploadedFile[] = [
    {
        id: '1',
        fileName: 'application_inventory_v1.csv',
        date: '2024-03-20',
        size: '2.4 MB',
        timestamp: 1710931200000,
        status: 'success',
        type: 'text/csv'
    },
    {
        id: '2',
        fileName: 'server_logs_q1.json',
        date: '2024-03-22',
        size: '15.8 MB',
        timestamp: 1711104000000,
        status: 'success',
        type: 'application/json'
    },
    {
        id: '3',
        fileName: 'legacy_systems_export.xml',
        date: '2024-03-15',
        size: '450 KB',
        timestamp: 1710499200000,
        status: 'error',
        type: 'text/xml'
    }
];
