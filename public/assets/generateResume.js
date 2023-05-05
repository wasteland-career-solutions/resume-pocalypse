// const buildResume = (first_name, last_name, city, state, zip_code, phone_number, email, linkedin_url, github_url, answer_2, answer_4, answer_5, answer_6, answer_7, answer_8, answer_9, answer_12, answer_13, answer_14, answer_15, answer_17, answer_18, answer_19, answer_20, answer_22, answer_23, answer_24, answer_25, answer_28, answer_29, answer_30, answer_33, answer_34, answer_35, answer_38, answer_39, answer_40, answer_42) => {
//   return `
//   <div class="resume">
//     <h1>${first_name} ${last_name}</h1>
//     <hr>
//     <div class="contact-info">
//       <p>${city}, ${state} ${zip_code}</p>
//       <p>${phone_number}</p>
//       <p>${email}</p>
//     </div>
//     <hr>
//     <div class="links">
//       <h3>Links</h3>
//       <ul>
//         <li>${linkedin_url}</li>
//         <li>${github_url}</li>
//       </ul>
//     </div>
//     <hr>
//     <div class="summary">
//       <h3>Professional Summary</h3>
//       <p>${answer_2}</p>
//     </div>
//     <hr>
//     <div class="skills">
//       <h3>Skills</h3>
//       <ul>
//         <li>${answer_4}</li>
//         <li>${answer_5}</li>
//         <li>${answer_6}</li>
//         <li>${answer_7}</li>
//         <li>${answer_8}</li>
//         <li>${answer_9}</li>
//       </ul>
//     </div>
//     <hr>
//     <div class="experience">
//       <h3>Experience</h3>
//       <div class="job">
//         <h4>${answer_12} - ${answer_13}</h4>
//         <p>${answer_14}</p>
//         <p>${answer_15}</p>
//       </div>
//       <div class="job">
//         <h4>${answer_17} - ${answer_18}</h4>
//         <p>${answer_19}</p>
//         <p>${answer_20}</p>
//       </div>
//       <div class="job">
//         <h4>${answer_22} - ${answer_23}</h4>
//         <p>${answer_24}</p>
//         <p>${answer_25}</p>
//       </div>
//     </div>
//     <hr>
//     <div class="education">
//       <h3>Education</h3>
//       <div class="school">
//         <h4>${answer_29} - ${answer_28}</h4>
//         <p>${answer_30}</p>
//       </div>
//       <div class="school">
//         <h4>${answer_34} - ${answer_33}</h4>
//         <p>${answer_35}</p>
//       </div>
//       <div class="school">
//         <h4>${answer_39} - ${answer_38}</h4>
//         <p>${answer_40}</p>
//       </div>
//     </div>
//     <div class="accomplishments">
//       <h3>Accomplishments</h3>
//       <p>${answer_42}</p>
//     </div>
//   </div>
//   `;
// };

const { PDFDocument, StandardFonts, rgb } = require('pdf-lib');
const fs = require('fs');
// const data = require('...');

async function createPDF() {
  // Create a new PDF document
  const pdfDoc = await PDFDocument.create();

  // Add a new page to the PDF document
  const page = pdfDoc.addPage();

  // Get the standard Helvetica font
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  // Set the font size and color
  const fontSizeHeader = 20;
  const fontColor = rgb(0.2, 0.2, 0.2);

  // Add some text to the page
  page.drawText(`${data.first_name} ${data.last_name}`, {
    x: 50,
    y: page.getHeight() - 50,
    size: fontSizeHeader,
    font: font,
    color: fontColor,
  });

  // Serialize the PDF document to a buffer
  const pdfBytes = await pdfDoc.save();

  // Write the buffer to a file
  fs.writeFileSync('./resumes/resume-example.pdf', pdfBytes);
}

createPDF();
