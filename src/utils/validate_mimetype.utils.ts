export const validateMimeType = (fileName: string) => {
    const allowedFileTypes = ['image/jpeg', 'image/png', 'image/svg'];
    if (allowedFileTypes.includes(fileName)) {
        return true;
    }

    return false;
};
