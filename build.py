#!/usr/bin/env python3
"""
Build script for converting markdown chapters to HTML.
Uses Python's markdown library with extensions.

Usage:
    python build.py

Requirements:
    pip install markdown
"""

import os
import re
import markdown
from pathlib import Path

# Paths
BOOK_ROOT = Path(__file__).parent.parent
MD_SOURCES = {
    'front_matter': BOOK_ROOT / 'front_matter' / 'preface_and_introduction.md',
    'part_i': BOOK_ROOT / 'part_i_the_question' / 'chapters_1_2_revised.md',
    'part_ii': BOOK_ROOT / 'part_ii_the_philosophy' / 'chapters_3_4_5_6.md',
    'part_ii_protocol': BOOK_ROOT / 'part_ii_the_philosophy' / 'chapter_6b_the_first_life_protocol.md',
    'part_iii': BOOK_ROOT / 'part_iii_the_global_context' / 'chapters_7_8_9_revised.md',
    'part_iv': BOOK_ROOT / 'part_iv_the_architecture' / 'chapters_10_11_12.md',
    'part_v': BOOK_ROOT / 'part_v_the_applications' / 'chapters_13_14_15.md',
    'part_vi': BOOK_ROOT / 'part_vi_the_principles' / 'chapters_16_17_18.md',
    'part_vii': BOOK_ROOT / 'part_vii_the_vision' / 'chapters_19_20.md',
    'vignettes': BOOK_ROOT / 'additional_vignettes.md',
}

HTML_OUTPUT = Path(__file__).parent / 'chapters'

# HTML template
HTML_TEMPLATE = '''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{title} - The First Life</title>
    <link rel="stylesheet" href="../css/book.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap" rel="stylesheet">
    <style>
        :root {{
            --font-body: 'EB Garamond', 'et-book', Palatino, 'Palatino Linotype', Georgia, serif;
        }}
    </style>
</head>
<body>
    <div class="progress-bar" id="progress"></div>

    <nav class="book-nav">
        <a href="../index.html" class="book-title">The First Life</a>
        <ul>
            <li><a href="../index.html">Contents</a></li>
        </ul>
    </nav>

    <article>
        {content}
    </article>

    <nav class="chapter-nav">
        <a href="{prev_link}" class="prev">{prev_title}</a>
        <a href="{next_link}" class="next">{next_title}</a>
    </nav>

    <script src="../js/reader.js"></script>
</body>
</html>
'''


def convert_md_to_html(md_content):
    """Convert markdown to HTML with styling enhancements."""
    # Configure markdown with extensions
    md = markdown.Markdown(extensions=[
        'extra',
        'smarty',
        'toc',
    ])

    html = md.convert(md_content)

    # Add newthought class to first words of sections
    html = re.sub(
        r'<p>([A-Z][^<]{0,50})</p>',
        lambda m: f'<p><span class="newthought">{m.group(1)[:20]}</span>{m.group(1)[20:]}</p>',
        html,
        count=1
    )

    # Wrap sections
    html = f'<section>\n{html}\n</section>'

    return html


def build_chapter(source_key, output_filename, title, prev_link, prev_title, next_link, next_title):
    """Build a single chapter HTML file."""
    source_path = MD_SOURCES.get(source_key)
    if not source_path or not source_path.exists():
        print(f"Warning: Source not found for {source_key}")
        return

    with open(source_path, 'r', encoding='utf-8') as f:
        md_content = f.read()

    html_content = convert_md_to_html(md_content)

    output_html = HTML_TEMPLATE.format(
        title=title,
        content=html_content,
        prev_link=prev_link,
        prev_title=prev_title,
        next_link=next_link,
        next_title=next_title,
    )

    output_path = HTML_OUTPUT / output_filename
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(output_html)

    print(f"Built: {output_path}")


def main():
    """Build all chapters."""
    # Ensure output directory exists
    HTML_OUTPUT.mkdir(parents=True, exist_ok=True)

    # Define chapter sequence: (source_key, output_filename, title, prev_link, prev_title, next_link, next_title)
    chapters = [
        ('part_i', '01-part-i.html', 'Part I: The Question', '00-front-matter.html', 'Front Matter', '02-part-ii.html', 'Part II'),
        ('part_ii', '02-part-ii.html', 'Part II: The Philosophy', '01-part-i.html', 'Part I', '03-part-iii.html', 'Part III'),
        ('part_iii', '03-part-iii.html', 'Part III: The Global Context', '02-part-ii.html', 'Part II', '04-part-iv.html', 'Part IV'),
        ('part_iv', '04-part-iv.html', 'Part IV: The Architecture', '03-part-iii.html', 'Part III', '05-part-v.html', 'Part V'),
        ('part_v', '05-part-v.html', 'Part V: The Applications', '04-part-iv.html', 'Part IV', '06-part-vi.html', 'Part VI'),
        ('part_vi', '06-part-vi.html', 'Part VI: The Principles', '05-part-v.html', 'Part V', '07-part-vii.html', 'Part VII'),
        ('part_vii', '07-part-vii.html', 'Part VII: The Vision', '06-part-vi.html', 'Part VI', '08-vignettes.html', 'Vignettes'),
        ('vignettes', '08-vignettes.html', 'Additional Vignettes', '07-part-vii.html', 'Part VII', '../index.html', 'Contents'),
    ]

    for chapter_args in chapters:
        build_chapter(*chapter_args)

    print("\nBuild complete!")
    print(f"Open {HTML_OUTPUT.parent / 'index.html'} to view the book.")


if __name__ == '__main__':
    main()
