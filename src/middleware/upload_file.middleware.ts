import multer from 'multer';

export const upload = multer({
    dest: './uploads/',
    limits: {
        files: 1 // limit to one file
    }
});
