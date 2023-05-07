// NOTE: This is not finished. The data needs to be connected to userData.

const PDFDocument = require('pdfkit');
const fs = require('fs');

// Data for the resume
const resumeData = {
  name: 'Jessie Galindo',
  city: 'Sioux City',
  state: 'IA',
  zip_code: '51103',
  phone: '(619) 755-2515',
  email: 'jgalindo1428@yahoo.com',
  links: [
    {
      linkedin: 'https://www.linkedin.com/in/jessie-galindo-09418092/',
      github: 'https://mrmessyface.github.io/jessie-galindo-portfolio/'
    }
  ],
  summary: 'Enthusiastic team member eager to contribute to team success through hard work, attention to detail, and excellent organizational skills. Motivated to learn, grow and excel. Natural leader.',
  skills: [
    {
      skill_1: 'Grayware, Malware, and Virus Removal Tools (Norton, Avast, AVG)',
      skill_2: 'Software: Microsoft Office 2003-Current (including Excel); Adobe Premiere Pro CS5+; Adobe Photoshop CS3+.',
      skill_3: 'Typing: 55 WPM',
      skill_4: 'Systems: Windows (98-11); Printers',
      skill_5: 'Customer Service via Phone, Live Chat, and Emails.',
      skill_6: 'Multi-Tasking'
    }
  ],
  work_history: [
    {
      job_title: 'Customer Service Representative',
      company: 'Principle Choice Solutions',
      work_dates: 'July 2020 - September 2022',
      work_tasks: 'Maintained customer satisfaction with forward-thinking strategies focused on addressing customer needs and resolving concerns. Offered advice and assistance to medical billing professionals, paying attention to special needs or wants in order to further assist veteran patients. Answered customer telephone calls promptly to avoid on-hold wait times.'
    },
    {
      job_title: 'Podcast Host',
      company: 'The Messed Up Wrestling Podcast',
      work_dates: 'June 2018 - April 2021',
      work_tasks: 'Preparing for upcoming episodes by conducting research in specific topics and writing story plans. Setting up and testing audio equipment for optimal sound. Performing on episodes while managing others involved in the episode. Editing and publishing episodes while maximizing exposure options. Monitoring trends and statistics showing downloads and consistent listeners from around the world and maintaining a social media presence with prompt responses to fan questions.'
    },
    {
      job_title: 'Accounts Payable Assistant',
      company: 'Conagra Brands',
      work_dates: 'June 2019 - January 2020',
      work_tasks: 'Handled and disposed of duplicate invoices in order to allow originals to be paid. Researched invoices that came in via Unknown Vendor so they could be sent to the designated vendor and be paid appropriately. Applied proper codes to invoices, files and receipts to keep records organized and easily searchable.'
    }
  ],
  education: [
    {
      degree: 'Web Development',
      school: 'Northwestern University',
      school_dates: 'January 2023 - July 2023'
    },
    {
      degree: 'Computer Systems Technology',
      school: 'UEI College',
      school_dates: 'October 2012 - June 2014'
    }
  ],
  accomplishments: 'I remembered to turn the oven off when I took the pizza out. Received a leadership trophy for helping my team for 2 years straight.'
};

// Create a new PDF document using PDFKit
const doc = new PDFDocument();

// Pipe the PDF document to a file or stream
doc.pipe(fs.createWriteStream('./resumes/resume-example.pdf'));

// Define the document properties
doc.fontSize(12);
doc.font('Helvetica');

// Add the name and contact information
doc.text(`${resumeData.name}\n`);
doc.text(`${resumeData.city}, ${resumeData.state} ${resumeData.zip_code} | ${resumeData.phone} | ${resumeData.email}\n\n`);

// Add the links section
doc.text('Links\n', { underline: true });
for (const links of resumeData.links) {
  doc.text(`${links.linkedin}\n`);
  doc.text(`${links.github}\n\n`);
}

// Add the professional summary section
doc.text('Professional Summary\n', { underline: true });
doc.text(`${resumeData.summary}\n\n`);

// Add the skills section
doc.text('Skills\n', { underline: true });
for (const skills of resumeData.skills) {
  doc.text(`${skills.skill_1}\n`);
  doc.text(`${skills.skill_2}\n`);
  doc.text(`${skills.skill_3}\n`);
  doc.text(`${skills.skill_4}\n`);
  doc.text(`${skills.skill_5}\n`);
  doc.text(`${skills.skill_6}\n\n`);
}

// Add the experience section
doc.text('Experience\n', { underline: true });
for (const work_history of resumeData.work_history) {
  doc.text(`${work_history.job_title} - ${work_history.company}\n`);
  doc.text(`${work_history.work_dates}\n`);
  doc.text(`${work_history.work_tasks}\n\n`);
}

// Add the education section
doc.text('Education\n', { underline: true });
for (const education of resumeData.education) {
  doc.text(`${education.degree} - ${education.school}\n`);
  doc.text(`${education.school_dates}\n\n`);
}

// Add the accomplishments section
doc.text('Accomplishments\n', { underline: true });
doc.text(`${resumeData.accomplishments}`);

// Finalize the PDF document
doc.end();
