import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import { execSync } from 'child_process';

const BATCH_DIR = join(process.cwd(), '.push-batches');
const token = execSync('gh auth token', { encoding: 'utf8' }).trim();
const owner = 'amalvarghese593';
const repo = 'testing-ai';
const branch = 'chore/add-types-file';

async function getRefSha() {
  const res = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/git/ref/heads/${branch}`,
    { headers: { Authorization: `Bearer ${token}`, Accept: 'application/vnd.github+json' } },
  );
  if (!res.ok) throw new Error(`Failed to get ref: ${res.status} ${await res.text()}`);
  const data = await res.json();
  return data.object.sha;
}

async function createCommit(baseSha, message, files) {
  const blobShas = [];
  for (const file of files) {
    const content = Buffer.from(file.content, 'utf8').toString('base64');
    const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/blobs`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content, encoding: 'base64' }),
    });
    if (!res.ok) throw new Error(`Blob failed for ${file.path}: ${await res.text()}`);
    const blob = await res.json();
    blobShas.push({ path: file.path, mode: '100644', type: 'blob', sha: blob.sha });
  }

  const treeRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/trees`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ base_tree: baseSha, tree: blobShas }),
  });
  if (!treeRes.ok) throw new Error(`Tree failed: ${await treeRes.text()}`);
  const tree = await treeRes.json();

  const commitRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/commits`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message, tree: tree.sha, parents: [baseSha] }),
  });
  if (!commitRes.ok) throw new Error(`Commit failed: ${await commitRes.text()}`);
  return (await commitRes.json()).sha;
}

async function updateRef(sha) {
  const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/refs/heads/${branch}`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ sha, force: false }),
  });
  if (!res.ok) throw new Error(`Ref update failed: ${await res.text()}`);
}

const payloads = readdirSync(BATCH_DIR)
  .filter((f) => f.startsWith('payload-') && f.endsWith('.json'))
  .sort((a, b) => Number(a.match(/\d+/)[0]) - Number(b.match(/\d+/)[0]);

let refSha = await getRefSha();
console.log(`Starting from ${refSha}, pushing ${payloads.length} batches...`);

for (const payloadFile of payloads) {
  const payload = JSON.parse(readFileSync(join(BATCH_DIR, payloadFile), 'utf8'));
  console.log(`Pushing ${payloadFile}: ${payload.files.length} files...`);
  const commitSha = await createCommit(refSha, payload.message, payload.files);
  await updateRef(commitSha);
  refSha = commitSha;
  console.log(`  -> ${commitSha}`);
}

console.log('All batches pushed successfully.');
