const buildResume = (name, email, phone, skills, experience, education) => {
    return `
      <div class="resume">
        <h1>${name}</h1>
        <hr>
        <div class="contact-info">
          <p>Email: ${email}</p>
          <p>Phone: ${phone}</p>
        </div>
        <hr>
        <div class="skills">
          <h3>Skills</h3>
          <ul>
            ${skills.map(skill => `<li>${skill}</li>`).join("")}
          </ul>
        </div>
        <hr>
        <div class="experience">
          <h3>Experience</h3>
          ${experience.map(exp => `
            <div class="job">
              <h4>${exp.title} - ${exp.company}</h4>
              <p>${exp.startDate} - ${exp.endDate}</p>
              <ul>
                ${exp.highlights.map(h => `<li>${h}</li>`).join("")}
              </ul>
            </div>
          `).join("")}
        </div>
        <hr>
        <div class="education">
          <h3>Education</h3>
          ${education.map(edu => `
            <div class="school">
              <h4>${edu.degree} - ${edu.school}</h4>
              <p>${edu.startDate} - ${edu.endDate}</p>
              <p>GPA: ${edu.gpa}</p>
            </div>
          `).join("")}
        </div>
      </div>
    `;
  };