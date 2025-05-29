import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const exportToExcel = (exportArray) => {
  const wb = XLSX.utils.book_new();

  const dataForSheet = exportArray.map((entry, index) => {
    const key = Object.keys(entry)[0];
    return {
      Versuch: Math.ceil((index + 1) / 2),
      Spieler: key,
      Zeit: entry[key]
    };
  });

  const ws = XLSX.utils.json_to_sheet(dataForSheet);

  XLSX.utils.book_append_sheet(wb, ws, 'Reaktionszeiten');

  const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

  const blob = new Blob([wbout], { type: 'application/octet-stream' });
  saveAs(blob, 'reaction_speed_data.xlsx');
};

export default exportToExcel;
