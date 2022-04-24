import jsPDF from "jspdf";
import "jspdf-autotable";
import { format } from "date-fns";
import { AddShoppingCartRounded } from "@mui/icons-material";

//sponsor reports
export function driverPoints(items) {
    const doc = new jsPDF();
    const tableColumn = ["Driver Name", "Total Points", "Point Change", "Date of Point Change", "Sponsor Changing", "Reasoning"];
    const tableRows = [];
    items.forEach(driver => {
        const pointData = [
            driver.name,
            driver.total,
            driver.change,
            driver.date,
            driver.sponsor,
            driver.reasoning,
        ];
        tableRows.push(pointData);
    });
    doc.autoTable(tableColumn, tableRows, { startY: 20 });
    const date = Date().split(" ");
    const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
    doc.text("Driver Point Tracking", 14, 15);
    doc.save(`report_${dateStr}.pdf`);
    //doc.save(`report_${dateStr}.csv`);
};
export function sponsAuditLog(items) {
    const doc = new jsPDF();
    const tableColumn = ["Driver Name", "Total Points", "Point Change", "Date of Point Change", "Sponsor Changing", "Reasoning"];
    const tableRows = [];
    items.forEach(driver => {
        const pointData = [
            driver.name,
            driver.total,
            driver.change,
            driver.date,
            driver.sponsor,
            driver.reasoning,
            format(new Date(driver.updated_at), "yyyy-MM-dd")
        ];
        tableRows.push(pointData);
    });
    doc.autoTable(tableColumn, tableRows, { startY: 20 });
    const date = Date().split(" ");
    const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
    doc.text("Sponsor Audit Log", 14, 15);
    doc.save(`report_${dateStr}.pdf`);
};

// admin reports
export function sponsSalesSummary(items) {
    const doc = new jsPDF();
    const tableColumn = ["Sponsor Name", "Total Sales"];
    const tableRows = [];
    items.forEach(sponsor => {
        const salesData = [
            sponsor.name,
            sponsor.total,
        ];
        tableRows.push(salesData);
    });
    doc.autoTable(tableColumn, tableRows, { startY: 20 });
    const date = Date().split(" ");
    const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
    doc.text("Summary of Sponsor Sales", 14, 15);
    doc.save(`report_${dateStr}.pdf`);
};
export function sponsSalesDetailed(items) {
    const doc = new jsPDF();
    doc.addPage();
    const tableColumn = ["Sponsor Name", "Total Sales"];
    const tableRows = [];
    items.forEach(sponsor => {
        const salesData = [
            sponsor.name,
            sponsor.total,
        ];
        tableRows.push(salesData);
    });
    doc.autoTable(tableColumn, tableRows, { startY: 20 });
    doc.setPage(1);
    const detailtableColumn = ["Driver Name", "Item Name", "Price", "Date"];
    const detailtableRows = [];
    items.forEach(item => {
        const itemData = [
            item.driver,
            item.name,
            item.total,
            item.date,
        ];
        detailtableRows.push(itemData);
    });
    doc.autoTable(detailtableColumn, detailtableRows, { startY: 20 });
    doc.setPage(2);
    const date = Date().split(" ");
    const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
    doc.text("Detailed Sales Report", 14, 15);
    doc.save(`report_${dateStr}.pdf`);
};
export function driverSalesSummary(items) {
    const doc = new jsPDF();
    const tableColumn = ["Sponsor Name", "Driver Name", "Total Sales"];
    const tableRows = [];
    items.forEach(driver => {
        const salesData = [
            driver.sponsor,
            driver.name,
            driver.total,
        ];
        tableRows.push(salesData);
    });
    doc.autoTable(tableColumn, tableRows, { startY: 20 });
    const date = Date().split(" ");
    const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
    doc.text("Summary of Driver Sales", 14, 15);
    doc.save(`report_${dateStr}.pdf`);
};
export function driverSalesDetailed(items) {
    const doc = new jsPDF();
    const tableColumn = ["Sponsor Name", "Driver Name", "Total Sales"];
    const tableRows = [];
    items.forEach(driver => {
        const salesData = [
            driver.sponsor,
            driver.name,
            driver.total,
        ];
        tableRows.push(salesData);
    });
    doc.autoTable(tableColumn, tableRows, { startY: 20 });
    doc.setPage(1);
    const detailtableColumn = ["Item Name", "Price", "Date"];
    const detailtableRows = [];
    items.forEach(item => {
        const itemData = [
            item.name,
            item.total,
            item.date,
        ];
        detailtableRows.push(itemData);
    });
    doc.autoTable(detailtableColumn, detailtableRows, { startY: 20 });
    doc.setPage(2);
    const date = Date().split(" ");
    const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
    doc.text("Detailed Sales Report", 14, 15);
    doc.save(`report_${dateStr}.pdf`);
};
export function invoice(items) {
    const doc = new jsPDF();
    const tableColumn = ["Sponsor Name", "Driver Name", "Driver Fee", "Sponsor Fee Due"];
    const tableRows = [];
    items.forEach(sponsor => {
        const salesData = [
            sponsor.name,
            sponsor.driver,
            sponsor.driverfee,
            sponsor.feedue,
        ];
        tableRows.push(salesData);
    });
    doc.autoTable(tableColumn, tableRows, { startY: 20 });
    const date = Date().split(" ");
    const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
    doc.text("Invoice for Sponsor", 14, 15);
    doc.save(`report_${dateStr}.pdf`);
};
export function adminAuditLog(items) {
    const doc = new jsPDF();
    const tableColumn = ["Sponsor Name", "Driver Name", "Driver Fee", "Sponsor Fee Due"];
    const tableRows = [];
    items.forEach(sponsor => {
        const salesData = [
            sponsor.name,
            sponsor.driver,
            sponsor.driverfee,
            sponsor.feedue,
        ];
        tableRows.push(salesData);
    });
    doc.autoTable(tableColumn, tableRows, { startY: 20 });
    const date = Date().split(" ");
    const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
    doc.text("Sponsor Audit Log", 14, 15);
    doc.save(`report_${dateStr}.pdf`);
};