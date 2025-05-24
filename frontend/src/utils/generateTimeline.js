import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const generateHustleReportPDF = ({ profile, events }) => {
  try {
    const doc = new jsPDF();

    // Title
    doc.setFontSize(18);
    doc.text("Hustle Timeline Report", 14, 20);

    // Profile Section
    doc.setFontSize(12);
    doc.text("Hustler Profile", 14, 35);
    doc.setFontSize(10);
    doc.text(`Hustle Period: ${profile.hustlePeriod || "N/A"}`, 14, 42);
    doc.text(`Last Job: ${profile.lastJob || "N/A"}`, 14, 48);
    doc.text(`Reason for Resigning: ${profile.resignReason || "N/A"}`, 14, 54);

    // Add a gap before the table
    let startY = 65;

    // Timeline Events Table
    if (events && events.length > 0) {
      const tableData = events.map((event, index) => [
        index + 1,
        event.title,
        event.type,
        new Date(event.period.start).toLocaleDateString(),
        new Date(event.period.end).toLocaleDateString(),
        event.description
      ]);

      autoTable(doc, {
        startY,
        head: [["#", "Title", "Type", "Start Date", "End Date", "Description"]],
        body: tableData,
        styles: { fontSize: 9, cellPadding: 2 },
        headStyles: { fillColor: [41, 128, 185] },
      });
    } else {
      doc.text("No timeline events found.", 14, startY);
    }

    // Save the PDF
    doc.save("Hustle_Timeline_Report.pdf");
  } catch (error) {
    console.error("Error generating PDF:", error);
    alert("Couldn't generate PDF. See console for details.");
  }
};

