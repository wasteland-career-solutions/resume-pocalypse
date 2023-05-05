// NOTE: This is not finished. The text is running off the side of the page instead of wrapping.

const { PDFDocument, StandardFonts, rgb } = require('pdf-lib');
const fs = require('fs');
// const data = require('...');

async function createPDF() {
  // Create a new PDF document
  const pdfDoc = await PDFDocument.create();

  // Set the font and font size
  const fontSize = 12;
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  // Set the page size and margins
  const pageWidth = 612;
  const pageHeight = 792;
  const pageMargins = {
    top: 72,
    right: 72,
    bottom: 72,
    left: 72,
  };

  // Calculate the maximum text width based on the page size and margins
  const maxTextWidth = pageWidth - pageMargins.left - pageMargins.right;

  //Split the resume text into lines and columns
  const lines = resumeText.split(/\r?\n/);
  const chunks = [];

  for (let i = 0; i < lines.length; i++) {
    const words = lines[i].split (' ');
    let chunk = '';

    for (let j = 0; j < words.length; j++) {
      const testChunk = chunk + ' ' + words[j];

      if (font.widthOfTextAtSize(testChunk, fontSize) > maxTextWidth) {
        chunks.push(chunk.trim());
        chunk = words[j] + ' ';
      } else {
        chunk = testChunk;
      }
    }

    chunks.push(chunk.trim());
  }

  // Calculate the height of the text block
  const lineHeight = font.heightAtSize(fontSize) * 1.2;
  const numLinesPerPage = Math.floor((pageHeight - pageMargins.top - pageMargins.bottom) / lineHeight);
  const numPages = Math.ceil(chunks.length / numLinesPerPage);

  // Add text to each page
  let chunkIndex = 0;

  for (let i = 0; i < numPages; i++) {
    // Add a new page to the PDF document
    const page = pdfDoc.addPage ([pageWidth, pageHeight]);

    // Add the header
    page.drawText('Name', {
      x: pageMargins.left,
      y: pageHeight - pageMargins.top + lineHeight,
      size: 18,
      font: font,
      color: rgb (0, 0, 0),
    });

    // Add the text block to the page
    let text = `Jessie Galindo
Sioux City, IA 51103, (619) 755-2515, jgalindo1428@yahoo.com
       
LINKS
https://www.linkedin.com/in/jessie-galindo-09418092/
https://mrmessyface.github.io/jessie-galindo-portfolio/
       
PROFESSIONAL SUMMARY
Enthusiastic team member eager to contribute to team success through hard work, attention to detail, and excellent organizational skills. Motivated to learn, grow and excel. Natural leader.
       
SKILLS
Grayware, Malware, and Virus Removal Tools (Norton, Avast, AVG)
Software: Microsoft Office 2003-Current (including Excel); Adobe Premiere Pro CS5+; Adobe Photoshop CS3+.
Typing: 55 WPM
Systems: Windows (98-11); Printers
Customer Service via Phone, Live Chat, and Emails.
Multi-Tasking
       
WORK HISTORY
Customer Service Representative - Principle Choice Solutions
July 2020 - September 2022
Maintained customer satisfaction with forward-thinking strategies focused on addressing customer needs and resolving concerns. Offered advice and assistance to medical billing professionals, paying attention to special needs or wants in order to further assist veteran patients. Answered customer telephone calls promptly to avoid on-hold wait times.
       
Podcast Host - The Messed Up Wrestling Podcast
June 2018 - April 2021
Preparing for upcoming episodes by conducting research in specific topics and writing story plans. Setting up and testing audio equipment for optimal sound. Performing on episodes while managing others involved in the episode. Editing and publishing episodes while maximizing exposure options. Monitoring trends and statistics showing downloads and consistent listeners from around the world and maintaining a social media presence with prompt responses to fan questions.
       
Accounts Payable Assistant - Conagra Brands
June 2019 - January 2020
Handled and disposed of duplicate invoices in order to allow originals to be paid. Researched invoices that came in via Unknown Vendor so they could be sent to the designated vendor and be paid appropriately. Applied proper codes to invoices, files and receipts to keep records organized and easily searchable.
       
EDUCATION
Web Development - Northwestern University
January 2023 - July 2023
       
Computer Systems Technology - UEI College
October 2012 - June 2014
       
ACCOMPLISHMENTS
I remembered to turn the oven off when I took the pizza out. Received a leadership trophy for helping my team for 2 years straight.`;
    let numLinesAdded = 0;

    while (chunkIndex < chunks.length && numLinesAdded < numLinesPerPage) {
      text += chunks[chunkIndex] + ' ';
      chunkIndex++;

      const testText = text + chunks[chunkIndex];
      const testNumLines = testText.split(/\r?\n/).length;

      if (testNumLines > numLinesPerPage) {
        break;
      } else {
        text = testText;
        chunkIndex++;
        numLinesAdded = testNumLines;
      }
    }

    page.drawText(text.trim(), {
      x: pageMargins.left,
      y: pageHeight - pageMargins.top - (numLinesAdded * lineHeight),
      size: fontSize,
      font: font,
      color: rgb (0, 0, 0),
      maxWidth: maxTextWidth,
      lineHeight: lineHeight,
      textAlign: 'justify',
    });
  }

  // Serialize the PDF document to a buffer
  const pdfBytes = await pdfDoc.save();

  // Write the buffer to a file
  fs.writeFileSync('./resumes/resume-example.pdf', pdfBytes);
}

createPDF();
