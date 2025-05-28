import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const exportToExcel = (exportArray) => {
  const wb = XLSX.utils.book_new();

  // Writes Versuch und Zeit as column headers
  const dataForSheet = exportArray.map((time, index) => ({ Versuch: index + 1, Zeit: time }));

  const ws = XLSX.utils.json_to_sheet(dataForSheet);

  XLSX.utils.book_append_sheet(wb, ws, 'Reaktionszeiten');

  const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

  const blob = new Blob([wbout], { type: 'application/octet-stream' });
  saveAs(blob, 'reaction_speed_data.xlsx');
};

export default exportToExcel;