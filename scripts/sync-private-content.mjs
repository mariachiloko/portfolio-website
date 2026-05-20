import { mkdir, readdir, rm, copyFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const privateRootCandidates = [
  path.resolve(repoRoot, '..', 'portfolio-content', 'private-content'),
  path.join(repoRoot, 'private-content'),
];
const websiteRoot = path.join(repoRoot, 'website');

const targetDataDir = path.join(websiteRoot, 'src', 'data');
const targetMediaDir = path.join(websiteRoot, 'public', 'media', 'personal');
const targetResumeDir = path.join(websiteRoot, 'public', 'resume');
const publicMediaExtensions = new Set(['.avif', '.gif', '.jpeg', '.jpg', '.png', '.svg', '.webp']);

async function pathExists(targetPath) {
  try {
    await stat(targetPath);
    return true;
  } catch {
    return false;
  }
}

async function ensureParentDirectory(targetPath) {
  await mkdir(path.dirname(targetPath), { recursive: true });
}

async function removeFileIfExists(targetPath) {
  if (await pathExists(targetPath)) {
    await rm(targetPath, { force: true });
  }
}

async function clearDirectoryContents(targetDir, keepNames = []) {
  if (!(await pathExists(targetDir))) {
    return;
  }

  const entries = await readdir(targetDir, { withFileTypes: true });
  await Promise.all(
    entries.map(async (entry) => {
      if (keepNames.includes(entry.name)) {
        return;
      }

      await rm(path.join(targetDir, entry.name), {
        force: true,
        recursive: true,
      });
    }),
  );
}

async function copyTree(sourceDir, targetDir, options = {}) {
  if (!(await pathExists(sourceDir))) {
    return 0;
  }

  const entries = await readdir(sourceDir, { withFileTypes: true });
  await mkdir(targetDir, { recursive: true });

  const results = await Promise.all(
    entries.map(async (entry) => {
      const sourcePath = path.join(sourceDir, entry.name);
      const targetPath = path.join(targetDir, entry.name);

      if (entry.isDirectory()) {
        return copyTree(sourcePath, targetPath, options);
      }

      if (entry.name === '.DS_Store') {
        return 0;
      }

      if (options.allowedExtensions && !options.allowedExtensions.has(path.extname(entry.name).toLowerCase())) {
        return 0;
      }

      await ensureParentDirectory(targetPath);
      await copyFile(sourcePath, targetPath);
      return 1;
    }),
  );

  return results.reduce((total, copied) => total + copied, 0);
}

async function syncPrivateContent() {
  let privateRoot = privateRootCandidates[0];
  for (const candidate of privateRootCandidates) {
    if (await pathExists(candidate)) {
      privateRoot = candidate;
      break;
    }
  }

  const sourceDataDir = path.join(privateRoot, 'data');
  const sourceMediaDir = path.join(privateRoot, 'media', 'personal');
  const sourceResumeDir = path.join(privateRoot, 'resume');

  await mkdir(targetDataDir, { recursive: true });
  await mkdir(targetMediaDir, { recursive: true });
  await mkdir(targetResumeDir, { recursive: true });

  await removeFileIfExists(path.join(targetDataDir, 'profile.local.json'));
  await removeFileIfExists(path.join(targetDataDir, 'projects.local.json'));
  await clearDirectoryContents(targetMediaDir);
  await clearDirectoryContents(targetResumeDir, ['README.md']);

  const copiedData = [];

  for (const fileName of [
    'profile.local.json',
    'projects.local.json',
    'experience.local.json',
    'education.local.json',
    'certifications.local.json',
  ]) {
    const sourcePath = path.join(sourceDataDir, fileName);
    const targetPath = path.join(targetDataDir, fileName);

    if (await pathExists(sourcePath)) {
      await copyFile(sourcePath, targetPath);
      copiedData.push(fileName);
    }
  }

  const mediaCopied = await copyTree(sourceMediaDir, targetMediaDir, {
    allowedExtensions: publicMediaExtensions,
  });

  const resumeCopied = await copyTree(sourceResumeDir, targetResumeDir);

  if (copiedData.length === 0 && mediaCopied === 0 && resumeCopied === 0) {
    console.log('No private content source found. Using public example content.');
    return;
  }

  console.log(
    [
      copiedData.length ? `Copied data: ${copiedData.join(', ')}` : null,
      mediaCopied > 0 ? 'Copied media' : null,
      resumeCopied > 0 ? 'Copied resume' : null,
    ]
      .filter(Boolean)
      .join(' | '),
  );
}

await syncPrivateContent();
