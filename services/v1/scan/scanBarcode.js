/**
 * Check if two barcodes match - multiple scanning usecases
 * @param {String} scanned - the scanned barcode
 * @param {String} target - the barcode it should match
 * @returns {Boolean} - true/false
 */
const scanBarcode = (scanned, target) => {
    // TODO:the scanner/phone's camera scans a barcode that needs to be decoded somehow

    return scanned === target;
};

module.exports = scanBarcode;
