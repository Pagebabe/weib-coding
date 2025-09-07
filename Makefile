SHELL := /bin/bash
.ONESHELL:

include archive-config.env

archive-migration:
	@chmod +x scripts/import-archive.sh
	@./scripts/import-archive.sh
	@node scripts/migrate-archive.mjs || true
	@git add -A
	@git commit -m "chore: archive migration run" || echo "no changes to commit"

ui-polish:
	@echo "UI polish folgt nach Migration (shadcn/ui)."

vercel-deploy:
	@vercel --prod
