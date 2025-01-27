import 'CryptoJS', 'crypto-js'

def decode_base64()
  CryptoJS.enc.Base64.parse(self).to_string(CryptoJS.enc.Utf8)
end
String.prototype.decode_base64 = decode_base64

def encode_base64()
  CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(self))
end
String.prototype.encode_base64 = encode_base64

def encode_sha256()
  CryptoJS.SHA256(self).to_s
end
String.prototype.encode_sha256 = encode_sha256
