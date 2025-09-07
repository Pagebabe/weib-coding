SHELL := /bin/bash
.ONESHELL:

include .env.local

archive-migration:
	@chmod +x scripts/import-archive.sh
	@export ARCHIVE_PATH && ./scripts/import-archive.sh
	@node scripts/migrate-archive.mjs || true
	@git add -A
	@git commit -m "chore: archive migration run" || echo "no changes to commit"

ui-polish:
	@echo "UI polish folgt nach Migration (shadcn/ui)."

vercel-deploy:
	@vercel --prod

import-csv:
	@node scripts/csv-to-properties.mjs
	@git add -A
	@git commit -m "feat: import properties from CSV" || echo no changes
