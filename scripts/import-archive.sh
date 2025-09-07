#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SRC="${ARCHIVE_PATH:-}"
DEST="$ROOT/imports/old_html"
TMP="$ROOT/.tmp_archive_extract"

if [[ -z "${SRC}" ]]; then
  echo "ERROR: ARCHIVE_PATH ist leer. Setze in archive-config.env den Pfad zur ZIP/Ordner."
  exit 1
fi

mkdir -p "$DEST"
rm -rf "$TMP" && mkdir -p "$TMP"

if [[ -d "$SRC" ]]; then
  echo ">> Kopiere HTML aus Ordner: $SRC"
  rsync -a --include='*/' --include='*.html' --include='*.htm' --exclude='*' "$SRC"/ "$DEST"/
elif [[ -f "$SRC" ]]; then
  case "$SRC" in
    *.zip)
      echo ">> Entpacke ZIP: $SRC"
      unzip -q "$SRC" -d "$TMP"
      rsync -a --include='*/' --include='*.html' --include='*.htm' --exclude='*' "$TMP"/ "$DEST"/
      ;;
    *)
      echo "ERROR: Unbekannter Archivtyp: $SRC"
      exit 1
      ;;
  esac
else
  echo "ERROR: ARCHIVE_PATH existiert nicht: $SRC"
  exit 1
fi

COUNT=$(find "$DEST" -type f \( -iname '*.html' -o -iname '*.htm' \) | wc -l | tr -d ' ')
echo "OK: $COUNT HTML-Dateien in $DEST bereit."
