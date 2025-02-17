import Papa from "papaparse";

class CSVParser {
  static csvToObject(csvText) {
    let options = {
      header: true,
      delimiter: CSVParser.DELIMITER,
      dynamicTyping: true,
      skipEmptyLines: true
    };

    return Papa.parse(csvText, options).data
  };

  static downloadCsv(data, filename="data.csv") {
    let options = {delimiter: CSVParser.DELIMITER};
    let csv = Papa.unparse(data, options);
    let blob = new Blob([csv], {type: "text/csv;charset=utf-8;"});
    let url = URL.createObjectURL(blob);
    let a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    return URL.revokeObjectURL(url)
  }
};

CSVParser.DELIMITER = ",";
window.CSVParser = CSVParser