import 'Papa', 'papaparse'

class CSVParser
  DELIMITER = ','

  def self.csv_to_object(csv_text)
    options = {
      header: true,
      delimiter: DELIMITER,
      dynamicTyping: true,
      skipEmptyLines: true
    }

    Papa.parse(csv_text, options).data
  end

  def self.download_csv(data, filename = "data.csv")
    options = {
      delimiter: DELIMITER
    }

    csv  = Papa.unparse(data, options)
    blob = Blob.new([csv], { type: "text/csv;charset=utf-8;" })
    url  = URL.create_objectURL(blob)

    a = document.create_element("a")
    a.href     = url
    a.download = filename
    a.click()

    URL.revoke_objectURL(url)
  end
end
window.CSVParser = CSVParser