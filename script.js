document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("user-form");
  const inputs = form.querySelectorAll("input, select");
  const generatePdfButton = document.getElementById("generate-pdf");

  // Enable button when all fields are filled
  inputs.forEach(input => {
    input.addEventListener("input", () => {
      const allFilled = Array.from(inputs).every(field => field.value.trim() !== "");
      generatePdfButton.disabled = !allFilled;
      if (allFilled) {
        generatePdfButton.classList.add("active");
      } else {
        generatePdfButton.classList.remove("active");
      }
    });
  });

  generatePdfButton.addEventListener("click", () => {
    const name = document.getElementById("name").value;
    const address = document.getElementById("address").value;
    const area = document.getElementById("area").value;
    const floorSize = document.getElementById("floor-size").value;
    const model = document.getElementById("model").value;
    const landSpace = document.getElementById("land-space").value;
    const date = document.getElementById("date").value;

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Client Address (Top Left)
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(12);
    doc.text("Client Address:", 10, 10);
    doc.setFont("Helvetica", "normal");
    doc.text(address, 10, 20);

    // Title
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(16);
    doc.text("Civil Engineering Report", 105, 20, null, null, "center");

    // Table
    doc.autoTable({
      startY: 40,
      head: [["Field", "Details"]],
      body: [
        ["Client Name", name],
        ["House Area (sq. ft.)", area],
        ["Floor Size (in feet)", floorSize],
        ["Model Type", model],
        ["Free Land Space (sq. ft.)", landSpace]
      ],
    });

    // Panchavarna Contact Details (Bottom Right)
    doc.setFont("Helvetica", "normal");
    doc.text("Panchavarna Infrastructure", 140, 280, null, null, "right");
    doc.text("Contact: +91-9876543210", 140, 290, null, null, "right");

    // Save PDF
    doc.save("Civil_Engineering_Report.pdf");
  });
});
