"""
import-from-docx.py — Extrae ponentes y fotos desde Ponentes.docx

Uso:
    python scripts/import-from-docx.py Ponentes.docx

Qué hace:
    1. Desempaqueta el .docx en un directorio temporal
    2. Extrae el orden de aparición de imágenes vs nombres de ponentes
    3. Copia las imágenes a ponentes/fotos/<id>.png
    4. Imprime un reporte de lo copiado (no sobreescribe ponentes.jsx ni programa.jsx)

Para actualizar bios o fotos de un ponente específico:
    - Foto: reemplazar ponentes/fotos/<id>.png con la nueva imagen
    - Bio: editar el campo `bio` en ponentes.jsx directamente
"""

import sys
import os
import shutil
import tempfile
import xml.etree.ElementTree as ET
import unicodedata
import re

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_DIR = os.path.dirname(SCRIPT_DIR)
FOTOS_DIR = os.path.join(PROJECT_DIR, 'ponentes', 'fotos')

NS = {
    'w':   'http://schemas.openxmlformats.org/wordprocessingml/2006/main',
    'r':   'http://schemas.openxmlformats.org/officeDocument/2006/relationships',
    'pic': 'http://schemas.openxmlformats.org/drawingml/2006/picture',
    'a':   'http://schemas.openxmlformats.org/drawingml/2006/main',
}


def slugify(text):
    text = unicodedata.normalize('NFD', text)
    text = ''.join(c for c in text if unicodedata.category(c) != 'Mn')
    text = text.lower()
    text = re.sub(r'[^a-z0-9]+', '-', text)
    return text.strip('-')


def unpack_docx(docx_path, tmp_dir):
    import zipfile
    with zipfile.ZipFile(docx_path, 'r') as z:
        z.extractall(tmp_dir)


def load_rels(tmp_dir):
    rels_path = os.path.join(tmp_dir, 'word', '_rels', 'document.xml.rels')
    tree = ET.parse(rels_path)
    rid_map = {}
    for rel in tree.getroot():
        if 'image' in rel.get('Type', ''):
            rid_map[rel.get('Id')] = rel.get('Target').replace('media/', '')
    return rid_map


def extract_events(tmp_dir, rid_map):
    """Walk document XML; yield ('text', str) or ('img', filename) in document order."""
    doc_path = os.path.join(tmp_dir, 'word', 'document.xml')
    tree = ET.parse(doc_path)
    root = tree.getroot()
    events = []

    def walk(el):
        for child in el:
            tag = child.tag.split('}')[-1] if '}' in child.tag else child.tag
            if tag == 't':
                txt = (child.text or '').strip()
                if txt:
                    events.append(('text', txt))
            elif tag == 'blip':
                rid = child.get(
                    '{http://schemas.openxmlformats.org/officeDocument/2006/relationships}embed'
                )
                if rid and rid in rid_map:
                    events.append(('img', rid_map[rid]))
            walk(child)

    walk(root.find('w:body', NS))
    return events


def find_speaker_images(events):
    """Return list of (speaker_name, image_filename) pairs in document order.

    Heuristic: find bold-looking names (followed by institution in parens) that
    appear just before an image event, within a 10-token window.
    """
    img_indices = [i for i, e in enumerate(events) if e[0] == 'img']
    pairs = []
    for idx in img_indices:
        # Gather text tokens before this image
        before = [e[1] for e in events[max(0, idx - 8):idx] if e[0] == 'text']
        if before:
            # The last "name-like" token before the image is usually the speaker
            # Filter out institution tokens (start with '(') and short tokens
            candidates = [t for t in before if not t.startswith('(') and len(t) > 5]
            if candidates:
                pairs.append((candidates[-1], events[idx][1]))
    return pairs


def main():
    if len(sys.argv) < 2:
        print('Uso: python scripts/import-from-docx.py <ruta/al/Ponentes.docx>')
        sys.exit(1)

    docx_path = os.path.abspath(sys.argv[1])
    if not os.path.exists(docx_path):
        print(f'Error: no existe {docx_path}')
        sys.exit(1)

    os.makedirs(FOTOS_DIR, exist_ok=True)

    with tempfile.TemporaryDirectory() as tmp_dir:
        print(f'Desempaquetando {os.path.basename(docx_path)}...')
        unpack_docx(docx_path, tmp_dir)
        rid_map = load_rels(tmp_dir)
        events = extract_events(tmp_dir, rid_map)
        pairs = find_speaker_images(events)

        media_dir = os.path.join(tmp_dir, 'word', 'media')
        copied = []
        skipped = []

        for name, img_file in pairs:
            slug = slugify(name)
            src = os.path.join(media_dir, img_file)
            dst = os.path.join(FOTOS_DIR, f'{slug}.png')
            if not os.path.exists(src):
                skipped.append((name, img_file, 'src no encontrado'))
                continue
            shutil.copy2(src, dst)
            copied.append((name, slug))

    print(f'\n✓ {len(copied)} fotos copiadas a ponentes/fotos/:')
    for name, slug in copied:
        print(f'  {slug}.png  ←  {name}')
    if skipped:
        print(f'\n⚠ {len(skipped)} omitidos:')
        for name, img, reason in skipped:
            print(f'  {name} ({img}): {reason}')
    print('\nRecuerda actualizar ponentes.jsx y programa.jsx si hay ponentes nuevos.')


if __name__ == '__main__':
    main()
