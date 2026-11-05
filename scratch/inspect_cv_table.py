import docx
import re

for filename in ['Mark Sverker Saar CV.docx', 'Mark Sverker Saar CV ENG.docx']:
    print("=" * 20, filename, "=" * 20)
    doc = docx.Document(filename)
    cell0 = doc.tables[0].rows[0].cells[0]
    tbl0 = cell0.tables[0]
    for r_idx, row in enumerate(tbl0.rows):
        cell_icon = row.cells[0]
        cell_text = row.cells[1]
        xml = cell_icon._element.xml
        blips = re.findall(r'r:embed="([^"]+)"', xml)
        
        # Check font size, formatting of text
        p = cell_text.paragraphs[0]
        fonts = [r.font.name for r in p.runs]
        sizes = [r.font.size.pt if r.font.size else None for r in p.runs]
        
        print(f"Row {r_idx}: text='{p.text}' blip={blips} font={fonts} size={sizes}")
        
    print("Spacing between tbl0 and IT skills:")
    # Look at paragraphs between tbl0 and IT skills
    # Let's inspect the children of cell0._element
    for child in cell0._element:
        tag = child.tag.split('}')[-1]
        text = child.text if hasattr(child, 'text') else ""
        if tag == 'p':
            p_obj = docx.text.paragraph.Paragraph(child, cell0)
            print(f"  P text='{p_obj.text.strip()}' spacing_after={p_obj.paragraph_format.space_after}")
