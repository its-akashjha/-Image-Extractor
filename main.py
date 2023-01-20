import re

import fitz
import PIL.Image
import io
import tabula

from pdfminer.high_level import extract_pages, extract_text
tables = tabula.read_pdf("sampleTB.pdf")
df = tables[0]
print(tables)

for page_layout in extract_pages("sample.pdf"):
    for element in page_layout:
        print(element)


text = extract_text("sample.pdf")
print(text)

pattern = re.compile(r"[a-zA-Z]+,{1}\s{1}")
matches = pattern.findall(text)
names = [n[:-2] for n in matches]
print(names)



# Images code
pdf = fitz.open("sampleIM.pdf")
counter = 1
for i in range(len(pdf)):
    page = pdf[i]
    images = page.get_images()
    for image in images:
        base_img = pdf.extract_image(image[0])
        image_data = base_img["image"]
        img = PIL.Image.open(io.BytesIO(image_data))
        extension = base_img["ext"]
        img.save(open(f"image{counter}.{extension}", "wb"))
        counter += 1

