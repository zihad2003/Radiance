
const fs = require('fs');
const path = require('path');

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
    const files = walkSync(path.join(process.cwd(), 'src'));

    files.forEach(file => {
        const content = fs.readFileSync(file, 'utf8');
        const lines = content.split('\n');
        lines.forEach((line, idx) => {
            // Simple regex to find " text-white" or " jsx" NOT preceded by quote or eq or className
            // This is heuristic and might flag false positives inside strings if quotes are unbalanced on line
            // But let's try to find " text-white=" or " text-white " or " text-white>"

            // Remove strings "..." and '...' and `...` to inspect only code
            let codeOnly = line.replace(/"[^"]*"/g, '""').replace(/'[^']*'/g, "''").replace(/`[^`]*`/g, "``");

            if (/\s+text-white[\s=>/]/.test(codeOnly)) {
                console.log(`[text-white] ${file}:${idx + 1} -> ${line.trim()}`);
            }
            if (/\s+jsx[\s=>/]/.test(codeOnly)) {
                // 'jsx' is also a file extension, ensure it's an attribute
                // check for lhs of = or boolean
                if (/\s+jsx[=>\s]/.test(codeOnly) && !line.includes("from ")) {
                    console.log(`[jsx] ${file}:${idx + 1} -> ${line.trim()}`);
                }
            }
        });
    });
};

findInvalidAttrs();
