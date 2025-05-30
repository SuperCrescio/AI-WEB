import fs from 'fs';
import path from 'path';
// Import the parser directly to avoid executing the package's
// debug routine that runs when using the default entry point in
// ESM mode.
import pdfParse from 'pdf-parse/lib/pdf-parse.js';
import AdmZip from 'adm-zip';
import XLSX from 'xlsx';
import Tesseract from 'tesseract.js';

export async function extractTextFromFile(filePath, mimeType) {
  const ext = path.extname(filePath).toLowerCase();
  try {
    if (mimeType === 'application/pdf' || ext === '.pdf') {
      const dataBuffer = fs.readFileSync(filePath);
      const pdfData = await pdfParse(dataBuffer);
      return pdfData.text;
    }
    if (
      mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
      mimeType === 'application/msword' ||
      ext === '.docx' || ext === '.doc'
    ) {
      const zip = new AdmZip(filePath);
      const xml = zip.readAsText('word/document.xml');
      const text = xml.replace(/<[^>]+>/g, ' ');
      return text;
    }
    if (
      mimeType === 'application/vnd.ms-excel' ||
      mimeType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
      ext === '.xls' || ext === '.xlsx' || ext === '.csv'
    ) {
      const workbook = XLSX.readFile(filePath);
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const csvText = XLSX.utils.sheet_to_csv(sheet);
      return csvText;
    }
    if (
      mimeType === 'image/png' || mimeType === 'image/jpeg' ||
      ext === '.png' || ext === '.jpg' || ext === '.jpeg'
    ) {
      const { data: { text } } = await Tesseract.recognize(filePath, 'eng');
      return text;
    }
    return '';
  } catch (err) {
    console.error('Errore estrazione testo da file:', err);
    return '';
  }
}
