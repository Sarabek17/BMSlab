# STATE — BMS Lab site

*Updated 2026-10-08. bmslab.uz live over HTTPS.*

## Where we are
- `/` — Digital Twin product landing (phase 1).
- `/outsourcing/` — BMS Lab as an IT outsourcing company (phase 2, `docs/phases/PHASE-2-outsourcing-site.md`).

## Deployment
| | |
|---|---|
| Live URL | https://bmslab.uz/outsourcing/ (product: https://bmslab.uz/) — direct: http://81.17.99.4:8095/ |
| TLS / proxy | `virtaks-caddy` (Let's Encrypt, auto-renew); our block `nginx/caddy-bmslab.caddy` appended to `/opt/virtaks/joylash/Caddyfile` between `BMSLAB BEGIN/END` (backup `Caddyfile.bak-*` next to it). If Virtaks is redeployed the block may be lost — re-append and `caddy reload`. |
| Host | shared Ubuntu 24.04 VPS (other prod stacks run there: virtaks, ombor, devpro-erp — do not touch) |
| Path | `/opt/bmslab` (plain file snapshot of `main`, not a git clone) |
| Stack | `docker compose -p bmslab`, container `bmslab-landing`, `.env`: `LANDING_PORT=8095` |
| Ports in use by others | 80/443 (virtaks-caddy), 8090/8443 (ombor), 8091/8444 (devpro-erp) |

**Redeploy:** `git archive --format=tar.gz -o bmslab.tar.gz main` → upload to `/tmp` →
`tar -xzf /tmp/bmslab.tar.gz -C /opt/bmslab && cd /opt/bmslab && docker compose -p bmslab up -d --build`.

**Rollback:** redeploy the previous commit's archive the same way (`git archive <prev-sha>`), or
`docker compose -p bmslab down` to remove the site entirely (affects nothing else).

## Next / deferred decisions
- Business must confirm numbers/promises in `src/outsourcing/config.ts` and page copy.
- English office address missing in `src/config.ts`.
- Whether `/outsourcing/` becomes `/`.
