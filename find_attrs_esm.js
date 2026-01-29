
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const walkSync = (dir, filelist = []) => {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        if (file === 'node_modules' || file === '.git' || file === 'dist' || file === '.convex') continue;
        const dirFile = path.join(dir, file);
        if (fs.statSync(dirFile).isDirectory()) {
            filelist = walkSync(dirFile, filelist);
        } else {
            if (file.endsWith('.jsx') || file.endsWith('.tsx')) {
                filelist.push(dirFile);
            }
        }
    }
    return filelist;
};

const findInvalidAttrs = () => {
    const searchPath = path.join(process.cwd(), 'src');
    const files = walkSync(searchPath);

    const results = [];

    files.forEach(file => {
        const content = fs.readFileSync(file, 'utf8');
        const lines = content.split('\n');
        lines.forEach((line, idx) => {
            let codeOnly = line;
            // Naive quote stripping (doesn't handle escaped quotes perfectly but good enough for this)
            codeOnly = codeOnly.replace(/"[^"]*"/g, '""');
            codeOnly = codeOnly.replace(/'[^']*'/g, "''");
            codeOnly = codeOnly.replace(/`[^`]*`/g, "``");

            // Check for jsx attribute
            const jsxRegex = /[\s]jsx([\s=}>/]|$)/;
            if (jsxRegex.test(codeOnly) && !line.includes("from ") && !line.includes("import ")) {
                results.push(`[jsx] ${file}:${idx + 1}`);
            }

            // Check for text-white attribute
            const twRegex = /[\s]text-white([\s=}>/]|$)/;
            if (twRegex.test(codeOnly)) {
                results.push(`[text-white] ${file}:${idx + 1}`);
            }
        });
    });

    fs.writeFileSync('attrs_log.txt', results.join('\n'));
};

findInvalidAttrs();
