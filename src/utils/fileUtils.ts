/**
 * Utility to trigger a browser download for a given Blob or URL
 * @param blob The data blob to download
 * @param filename The desired filename for the downloaded file
 */
export const downloadBlob = (blob: Blob, filename: string): void => {
    // Create a URL for the blob
    const url = window.URL.createObjectURL(blob);

    // Create a temporary anchor element
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);

    // Append to the document, click it, and remove it
    document.body.appendChild(link);
    link.click();

    // Cleanup
    if (link.parentNode) {
        link.parentNode.removeChild(link);
    }
    window.URL.revokeObjectURL(url);
};

/**
 * Normalizes a string into a valid filename
 * @param str The string to normalize
 */
export const normalizeFilename = (str: string): string => {
    return str.replace(/[^a-z0-9]/gi, '_').toLowerCase();
};
