#!/usr/bin/env bash
# Despliega la landing (export estático de Next.js) en el VPS: https://portfolio.deveps.dev
# Compila, empaqueta out/ + contacto.php y lo publica con /usr/local/bin/deploy-site,
# que guarda antes una copia para rollback.
#
# Uso:  ./deploy.sh            (desde Git Bash, con el agente SSH de Windows activo)
#       ./deploy.sh --dry-run  (compila y solo lista lo que se enviaría)
set -euo pipefail
cd "$(dirname "$0")"

# El ssh de Git Bash no usa el agente de Windows: se llama al de Windows.
SSH="${SSH:-/c/Windows/System32/OpenSSH/ssh.exe}"
[ -x "$SSH" ] || SSH=ssh

[ -f contacto.php ] || { echo "Falta contacto.php (no está en git: cópialo antes de desplegar)" >&2; exit 1; }

npm run build

STAGE=$(mktemp -d)
trap 'rm -rf "$STAGE"' EXIT
cp -r out/. "$STAGE"/
cp contacto.php "$STAGE"/

if [ "${1:-}" = "--dry-run" ]; then
  (cd "$STAGE" && find . -type f | sort)
  exit 0
fi

tar -czf - -C "$STAGE" . | "$SSH" vps "sudo /usr/local/bin/deploy-site portfolio.deveps.dev"
