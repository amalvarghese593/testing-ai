#!/usr/bin/env node
/**
 * Pushes all batch payloads via GitHub MCP push_files equivalent (GitHub Git Data API).
 * Reads .push-batches/payload-*.json and creates sequential commits.
 */
import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import { execSync } from 'child_process';

const BATCH_DIR = join(process.cwd(), '.push-batches');
const token = execSync('gh auth token', { encoding: 'utf8' }).trim();
const owner = 'amalvarghese593';
const repo = 'testing-ai';
const branch = 'chore/add-types-file';

const headers = {
  Authorization: `Bearer ${token}`,
  Accept: 'application/vnd.github+json',
  'Content-Type': 'application/json',
  'X-GitHub-Api-Version': '2022-11-28',
};

async function gh(path, options = {}) {
  const res = await fetch(`https://api.github.com${path}`, { headers, ...options });
  const text = await res.text();
  if (!res.ok) throw new Error(`${options.method || 'GET'} ${path} -> ${res.status}: ${text}`);
  return text ? JSON.parse(text) : null;
}

async function pushBatch(baseSha, { message, files }) {
  const tree = [];
  for (const file of files) {
    const blob = await gh(`/repos/${owner}/${repo}/git/blobs`, {
      method: 'POST',
      body: JSON.stringify({
        content: Buffer.from(file.content, 'utf8').toString('base64'),
        encoding: 'base64',
      }),
    });
    tree.push({ path: file.path, mode: '100644', type: 'blob', sha: blob.sha });
  }

  const newTree = await gh(`/repos/${owner}/${repo}/git/trees`, {
    method: 'POST',
    body: JSON.stringify({ base_tree: baseSha, tree }),
  });

  const commit = await gh(`/repos/${owner}/${repo}/git/commits`, {
    method: 'POST',
    body: JSON.stringify({ message, tree: newTree.sha, parents: [baseSha] }),
  });

  await gh(`/repos/${owner}/${repo}/git/refs/heads/${branch}`, {
    method: 'PATCH',
    body: JSON.stringify({ sha: commit.sha }),
  });

  return commit.sha;
}

const payloads = readdirSync(BATCH_DIR)
  .filter((f) => f.startsWith('payload-') && f.endsWith('.json'))
  .sort((a, b) => Number(a.match(/\d+/)[0]) - Number(b.match(/\d+/)[0]));

const ref = await gh(`/repos/${owner}/${repo}/git/ref/heads/${branch}`);
let sha = ref.object.sha;
console.log(`Pushing ${payloads.length} batches from ${sha}`);

for (const file of payloads) {
  const payload = JSON.parse(readFileSync(join(BATCH_DIR, file), 'utf8'));
  process.stdout.write(`${file} (${payload.files.length} files)... `);
  sha = await pushBatch(sha, payload);
  console.log(sha.slice(0, 7));
}

console.log('Done. Final commit:', sha);
