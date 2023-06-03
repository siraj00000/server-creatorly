import fs from 'fs';
export const removeTmp = (path) => {
    fs.unlinkSync(path);
};
//# sourceMappingURL=removeFolder.js.map