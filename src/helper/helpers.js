import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

export const exportToExcelMultiplayer = (exportArray, filename) => {
  const wb = XLSX.utils.book_new();

  const dataForSheet = [];

for (let i = 0; i < exportArray.length; i += 2) {
  const entry1 = exportArray[i];
  const entry2 = exportArray[i + 1];

  const row = {
    Versuch: i / 2 + 1,
    ...entry1,
    ...entry2
  };

  dataForSheet.push(row);
}

  const ws = XLSX.utils.json_to_sheet(dataForSheet);

  XLSX.utils.book_append_sheet(wb, ws, 'Reaktionszeiten');

  const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

  const blob = new Blob([wbout], { type: 'application/octet-stream' });

  const formData = new FormData();
  formData.append('file', blob, filename);

  saveAs(blob, filename);
  return formData;
};

export const exportToExcelSingleplayer = (exportArray, filename) => {
  const wb = XLSX.utils.book_new();

  const dataForSheet = exportArray.map((entry, index) => {
    return {
      Versuch: Math.ceil(index + 1),
      [entry['name']]: entry['reactionTime'],
    };
  });

  const ws = XLSX.utils.json_to_sheet(dataForSheet);

  XLSX.utils.book_append_sheet(wb, ws, 'Reaktionszeiten');

  const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

  const blob = new Blob([wbout], { type: 'application/octet-stream' });

  const formData = new FormData();
  formData.append('file', blob, filename);

  saveAs(blob, filename);
  return formData;
};
