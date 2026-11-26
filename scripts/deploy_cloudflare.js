/**
 * scripts/deploy_cloudflare.js — Despliegue Directo a Cloudflare Pages sin requerir GitHub (MOCA)
 * Utiliza Wrangler Direct Upload para subir los activos estáticos verificados directamente a la red Edge de Cloudflare.
 */
import { spawnSync } from 'node:child_process';

const projectName = process.env.CLOUDFLARE_PROJECT_NAME || "moca-smash-burgers";
const isWin = process.platform === 'win32';
const npxCmd = isWin ? 'npx.cmd' : 'npx';

const result = spawnSync(
  npxCmd,
  ['wrangler', 'pages', 'deploy', '.', `--project-name=${projectName}`, '--branch=main'],
  { stdio: 'inherit', shell: isWin }
);

if (result.status !== 0) {
  process.exit(result.status ?? 1);
}
