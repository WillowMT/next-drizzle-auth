#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const projectName = process.argv[2];

if (!projectName) {
    console.error('Please specify a project name:');
    console.error('  npx create-drizzle-app my-app');
    process.exit(1);
}

const targetDir = path.resolve(projectName);

if (fs.existsSync(targetDir)) {
    console.error(`Directory "${projectName}" already exists.`);
    process.exit(1);
}

console.log(`Creating a new Drizzle app in ${targetDir}...`);

try {
    // Create target directory
    fs.mkdirSync(targetDir, { recursive: true });

    // Get the template directory (parent of bin)
    const templateDir = path.dirname(path.dirname(__filename));

    // Files and directories to exclude from copying
    const exclude = [
        'node_modules',
        'bun.lock',
        '.git',
        'bin',
        '.DS_Store'
    ];

    // Copy template files
    function copyTemplate(src, dest) {
        const stats = fs.statSync(src);

        if (stats.isDirectory()) {
            const dirName = path.basename(src);
            if (exclude.includes(dirName)) return;

            if (!fs.existsSync(dest)) {
                fs.mkdirSync(dest, { recursive: true });
            }

            const files = fs.readdirSync(src);
            files.forEach(file => {
                copyTemplate(path.join(src, file), path.join(dest, file));
            });
        } else {
            fs.copyFileSync(src, dest);
        }
    }

    // Copy all template files
    const templateFiles = fs.readdirSync(templateDir);
    templateFiles.forEach(file => {
        if (!exclude.includes(file)) {
            copyTemplate(path.join(templateDir, file), path.join(targetDir, file));
        }
    });

    // Update package.json
    const packageJsonPath = path.join(targetDir, 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

    // Remove CLI-specific fields and update name
    delete packageJson.bin;
    delete packageJson.ignoreScripts;
    delete packageJson.trustedDependencies;
    packageJson.name = projectName;
    packageJson.version = '0.1.0';

    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

    console.log('Installing dependencies...');

    // Change to target directory and install dependencies
    process.chdir(targetDir);

    try {
        // Try pnpm first (as per user rules), then npm
        if (hasCommand('pnpm')) {
            execSync('pnpm install', { stdio: 'inherit' });
        } else if (hasCommand('bun')) {
            execSync('bun install', { stdio: 'inherit' });
        } else {
            execSync('npm install', { stdio: 'inherit' });
        }
    } catch (error) {
        console.warn('Failed to install dependencies automatically. Please run the install command manually.');
    }

    // Initialize git repository
    try {
        execSync('git init', { stdio: 'pipe' });
        execSync('git add .', { stdio: 'pipe' });
        execSync('git commit -m "Initial commit"', { stdio: 'pipe' });
    } catch (error) {
        console.warn('Failed to initialize git repository.');
    }

    console.log('\n🎉 Successfully created your Drizzle app!');
    console.log(`\nNext steps:`);
    console.log(`  cd ${projectName}`);
    console.log(`  npm run dev  # or pnpm dev, bun dev`);
    console.log(`\nHappy coding! 🚀`);

} catch (error) {
    console.error('An error occurred:', error.message);
    process.exit(1);
}

function hasCommand(command) {
    try {
        execSync(`${command} --version`, { stdio: 'pipe' });
        return true;
    } catch {
        return false;
    }
}
