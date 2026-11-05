import docx
from docx.shared import Emu
from docx.oxml import parse_xml
from docx.oxml.ns import nsdecls
from docx.opc.constants import RELATIONSHIP_TYPE
import subprocess

def create_linked_cv(src_path, dst_path, icon_path, url_text):
    doc = docx.Document(src_path)
    cell0 = doc.tables[0].rows[0].cells[0]
    tbl0 = cell0.tables[0]
    
    # 1. Hyperlink relationship
    rel_id = doc.part.relate_to(url_text, RELATIONSHIP_TYPE.HYPERLINK, is_external=True)
    
    # 2. Add picture to get drawing XML
    dummy_p = doc.add_paragraph()
    run = dummy_p.add_run()
    pic = run.add_picture(icon_path, width=Emu(146050), height=Emu(156845))
    drawing_xml = run._r.xpath('.//w:drawing')[0]
    dummy_p._element.getparent().remove(dummy_p._element)
    
    # 3. New table row
    new_tr = parse_xml(tbl0.rows[3]._element.xml)
    
    # Cell 0 (icon)
    tc0 = new_tr.xpath('.//w:tc')[0]
    p0 = tc0.xpath('.//w:p')[0]
    for r in p0.xpath('.//w:r'): p0.remove(r)
    new_r = parse_xml(f'<w:r {nsdecls("w")}/>')
    new_r.append(drawing_xml)
    p0.append(new_r)
    
    # Cell 1 (link)
    tc1 = new_tr.xpath('.//w:tc')[1]
    p1 = tc1.xpath('.//w:p')[0]
    for r in p1.xpath('.//w:r'): p1.remove(r)
    for h in p1.xpath('.//w:hyperlink'): p1.remove(h)
    
    hyperlink_elem = parse_xml(
        f'<w:hyperlink {nsdecls("w")} {nsdecls("r")} r:id="{rel_id}" w:history="1">'
        f'<w:r><w:rPr><w:rFonts w:ascii="Assistant" w:hAnsi="Assistant"/><w:sz w:val="18"/><w:szCs w:val="18"/><w:color w:val="2E2E52"/><w:u w:val="none"/></w:rPr>'
        f'<w:t>{url_text}</w:t></w:r>'
        f'</w:hyperlink>'
    )
    p1.append(hyperlink_elem)
    
    tbl0._element.append(new_tr)
    doc.save(dst_path)
    print(f"Saved {dst_path}")

create_linked_cv('Mark Sverker Saar CV.docx', 'scratch/cv_et_linked.docx', 'scratch/icon_web.png', 'https://mssaar.github.io/CV/')
create_linked_cv('Mark Sverker Saar CV ENG.docx', 'scratch/cv_en_linked.docx', 'scratch/icon_web.png', 'https://mssaar.github.io/CV/')
