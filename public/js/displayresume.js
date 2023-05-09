// base64 string
var pdfPath = async () => {
      try {
        const result = await fetch('/api/data/pdf', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json; charset=utf-8' }
        });
        const data = await result.json();
        return data;
      } catch (err) {
          console.error(err);
      };
}

const embed = document.createElement('embed');
embed.setAttribute('src','./assets/resumes/resume-example.pdf');
embed.setAttribute('type','application/pdf');
embed.setAttribute('width','200%');
embed.setAttribute('height','800px');
document.querySelector('#end-screen').appendChild(embed);