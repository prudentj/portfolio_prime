"""Builds public/Jacob-Prudent-CV.docx from src/data/cv.json: plain, single column, Arial 10.5pt.
No relocation line; contact line says "Phone available on request". Requires python-docx."""
import json, shutil, pathlib
from docx import Document
from docx.shared import Pt, Mm, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH

root = pathlib.Path(__file__).resolve().parent.parent
BASE = json.loads((root / 'src/data/cv.json').read_text())

def cv_for(name=None):
    # Mirrors src/data/cv.js: a variant overrides top-level fields and, per org hash, the first role's bullets.
    cv = json.loads(json.dumps(BASE)); cv.pop('variants', None)
    if not name: return cv
    v = dict(BASE['variants'][name]); roles = v.pop('roles', {}); v.pop('_note', None)
    cv.update(v)
    for o in cv['orgs']:
        if o['hash'] in roles: o['roles'][0].update(roles[o['hash']])
    return cv

def build(cv):
  doc = Document()
  sec = doc.sections[0]
  sec.page_height, sec.page_width = Mm(297), Mm(210)
  sec.top_margin = sec.bottom_margin = Mm(15)
  sec.left_margin = sec.right_margin = Mm(18)
  base = doc.styles['Normal']
  base.font.name = 'Arial'; base.font.size = Pt(10.5)
  base.element.rPr.rFonts.set('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}eastAsia', 'Arial')
  base.paragraph_format.space_after = Pt(2)
  for name in ('List Bullet',):
      doc.styles[name].font.name = 'Arial'; doc.styles[name].font.size = Pt(10)

  def para(text='', size=None, bold=False, after=2, before=0, italic=False):
      p = doc.add_paragraph()
      p.paragraph_format.space_after = Pt(after); p.paragraph_format.space_before = Pt(before)
      if text:
          r = p.add_run(text); r.bold = bold; r.italic = italic
          if size: r.font.size = Pt(size)
      return p

  def heading(text):
      p = para(text.upper(), size=11, bold=True, before=8, after=3)
      return p

  def bullet(text):
      p = doc.add_paragraph(text, style='List Bullet')
      p.paragraph_format.space_after = Pt(1)
      return p

  strip = lambda u: u.replace('https://', '').replace('www.', '')
  para(cv['name'], size=20, bold=True, after=0)
  para(cv['title'], size=12, after=2)
  para(' · '.join([cv['location'], cv['email'], cv['phoneNote'], strip(cv['linkedin']), strip(cv['github']), strip(cv['site'])]), size=9.5, after=4)

  heading('Profile')
  para(cv['profile'])

  heading('Experience')
  for o in cv['orgs']:
      if o.get('earlier'):
          p = para(before=5); r = p.add_run('Earlier career'); r.bold = True
          para(o['roles'][0]['gist'])
          continue
      p = para(before=5, after=0)
      r = p.add_run(o['org']); r.bold = True; r.font.size = Pt(11)
      meta = ' · '.join(x for x in [o['context'], o['place']] if x)
      if meta: para(meta, size=9.5, italic=True, after=1)
      for role in o['roles']:
          p = para(after=1)
          r = p.add_run(role['title']); r.bold = True
          p.add_run(f"  {role['when']}" + (f" · {role['place']}" if role.get('place') else ''))
          if role.get('bullets'):
              for b in role['bullets']: bullet(b)
              if role.get('stack'): para(role['stack'].replace(' · ', ', '), size=9, after=2)
          else:
              para(role['gist'])

  heading('Education')
  for e in cv['education']:
      para(f"{e['text']}, {e['when']}")

  heading('Skills')
  for s in cv['skills']:
      p = para(after=1); r = p.add_run(f"{s['k']}: "); r.bold = True; p.add_run(s['v'])

  out = root / f"public/{cv['file']}.docx"
  doc.save(out)
  if (root / 'build').exists(): shutil.copy(out, root / f"build/{cv['file']}.docx")
  print(f'Wrote {out}')

for name in [None, *BASE.get('variants', {})]:
  build(cv_for(name))
