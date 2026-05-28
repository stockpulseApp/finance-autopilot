/**
 * Creates/links Vercel project and triggers production deploy from GitHub.
 * Requires: VERCEL_TOKEN from https://vercel.com/account/tokens
 *
 * Usage:
 *   set VERCEL_TOKEN=...
 *   node scripts/setup-vercel-project.mjs
 */
const TEAM_ID = "team_r9nIL3r5TuTOOKIr1Egdi0nQ";
const PROJECT_NAME = "wealthy-brainiac";
const GITHUB_REPO = "stockpulseApp/finance-autopilot";
const PRODUCTION_URL = "https://www.wealthybrainiac.com";

const token = process.env.VERCEL_TOKEN;
if (!token) {
  console.error("Missing VERCEL_TOKEN. Create one at https://vercel.com/account/tokens");
  process.exit(1);
}

async function api(path, options = {}) {
  const res = await fetch(`https://api.vercel.com${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...options.headers,
    },
  });
  const text = await res.text();
  let body;
  try {
    body = text ? JSON.parse(text) : {};
  } catch {
    body = { raw: text };
  }
  if (!res.ok) {
    throw new Error(`${res.status} ${path}: ${JSON.stringify(body)}`);
  }
  return body;
}

async function main() {
  let project;
  try {
    project = await api(`/v9/projects/${PROJECT_NAME}?teamId=${TEAM_ID}`);
    console.log(`Project exists: ${project.id}`);
  } catch {
    project = await api(`/v11/projects?teamId=${TEAM_ID}`, {
      method: "POST",
      body: JSON.stringify({
        name: PROJECT_NAME,
        framework: "nextjs",
        gitRepository: {
          type: "github",
          repo: GITHUB_REPO,
        },
      }),
    });
    console.log(`Created project: ${project.id}`);
  }

  await api(`/v10/projects/${project.id}/env?teamId=${TEAM_ID}&upsert=true`, {
    method: "POST",
    body: JSON.stringify([
      {
        key: "NEXT_PUBLIC_SITE_URL",
        value: PRODUCTION_URL,
        type: "plain",
        target: ["production", "preview", "development"],
      },
    ]),
  });
  console.log("Environment variables set.");

  const deployment = await api(`/v13/deployments?teamId=${TEAM_ID}`, {
    method: "POST",
    body: JSON.stringify({
      name: PROJECT_NAME,
      target: "production",
      gitSource: {
        type: "github",
        org: "stockpulseApp",
        repo: "finance-autopilot",
        ref: "main",
      },
    }),
  });

  console.log(`Deployment started: ${deployment.id}`);
  console.log(`Inspector: https://vercel.com/stock-pulse1/${PROJECT_NAME}/${deployment.id}`);
  console.log(`URL (when ready): https://${PROJECT_NAME}.vercel.app`);
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
