import docx
from docx.shared import Inches, Pt, Emu
from docx.oxml import OxmlElement, parse_xml
from docx.oxml.ns import nsdecls, qn
import os
import shutil

def add_link_row(doc_path, output_path, icon_path, url_text):
    doc = docx.Document(doc_path)
    cell0 = doc.tables[0].rows[0].cells[0]
    tbl0 = cell0.tables[0]
    
    # Add a new row
    new_tr = parse_xml(tbl0.rows[3]._element.xml)
    
    # We will modify new_tr
    # In new_tr, cell 0 has the drawing, cell 1 has the text
    # Let's add picture to a dummy paragraph first to get its rId and drawing XML
    dummy_p = doc.add_paragraph()
    run = dummy_p.add_run()
    pic = run.add_picture(icon_path, width=Emu(146050), height=Emu(156845))
    drawing_xml = run._r.xpath('.//w:drawing')[0]
    
    # Remove dummy paragraph from body
    p_elem = dummy_p._element
    p_elem.getparent().remove(p_elem)
    
    # In new_tr cell 0: replace drawing
    tc0 = new_tr.xpath('.//w:tc')[0]
    p0 = tc0.xpath('.//w:p')[0]
    # Remove existing drawings from p0
    for d in p0.xpath('.//w:drawing'):
        d.getparent().remove(d)
    for r in p0.xpath('.//w:r'):
        p0.remove(r)
    # Add new run with drawing
    new_r = parse_xml(f'<w:r {nsdecls("w")}/>')
    new_r.append(drawing_xml)
    p0.append(new_r)
    
    # In new_tr cell 1: set text and hyperlink / formatting
    tc1 = new_tr.xpath('.//w:tc')[1]
    p1 = tc1.xpath('.//w:p')[0]
    for r in p1.xpath('.//w:r'):
        p1.remove(r)
    for h in p1.xpath('.//w:hyperlink'):
        p1.remove(h)
        
    text_r = parse_xml(
        f'<w:r {nsdecls("w")}><w:rPr><w:rFonts w:ascii="Assistant" w:hAnsi="Assistant"/><w:sz w:val="18"/><w:szCs w:val="18"/><w:color w:val="2E2E52"/><w:u w:val="none"/></w:rPr><w:t>{url_text}</w:t></w:r>'
    )
    p1.append(text_r)
    
    # Append new_tr to tbl0
    tbl0._element.append(new_tr)
    
    doc.save(output_path)
    print(f"Saved {output_path}")

if __name__ == '__main__':
    add_link_row('Mark Sverker Saar CV.docx', 'scratch/CV_test_et.docx', 'scratch/icon_web.png', 'https://mssaar.github.io/CV/')
    add_link_row('Mark Sverker Saar CV ENG.docx', 'scratch/CV_test_en.docx', 'scratch/icon_web.png', 'https://mssaar.github.io/CV/')
