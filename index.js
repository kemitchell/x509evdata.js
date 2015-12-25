module.exports = x509evdata

var tls = require('tls')

function x509evdata(host, callback) {
  var options = {
    host: host,
    port: 443,
    requestOCSP: true }
  var result = { }
  var certificate
  var socket = tls.connect(options)
    .on('OCSPResponse', function(response) {
      result.ocsp = ( response ? response.toString() : false ) })
    .on('secureConnect', function() {
      certificate = socket.getPeerCertificate(false)
      socket.destroy() })
    .on('close', function() {
      if (socket.autorizationError) {
        callback(socket.autorizationError) }
      else {
        result.serialNumber = certificate.serialNumber
        result.valid_from = certificate.valid_from
        result.valid_to = certificate.valid_to
        result.subject = certificate.subject
        callback(null, result) } }) }
