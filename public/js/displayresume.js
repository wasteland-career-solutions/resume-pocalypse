// base64 string
var base64 = async () => {
      try {
        const result = await fetch('/api/data/test', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        const data = await result.json();
        return data.result;
      } catch (err) {
          console.error(err);
      };
}

// decode base64 string, remove space for IE compatibility
let base64str = JSON.stringify(base64());

// create the blob object with content-type "application/pdf"               
var blob = new Blob( [base64str], { type: "application/pdf" });
var url = URL.createObjectURL(blob);