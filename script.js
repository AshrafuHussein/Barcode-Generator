function generateBarcode() {
    let productName = document.getElementById("productName").value.trim();
    let price = document.getElementById("price").value.trim();
    let expiryDate = document.getElementById("expiryDate").value;

    if (!productName || !price || !expiryDate) {
        alert("Please fill in all fields!");
        return;
    }

    // Generate a unique 12-digit code from product details
    let nameCode = productName.charCodeAt(0).toString().padStart(3, "0"); // First letter ASCII
    let priceCode = price.replace(/\D/g, '').padStart(4, "0"); // Numeric price
    let dateCode = expiryDate.replace(/-/g, '').slice(-5); // Last 5 digits of date

    let baseCode = (nameCode + priceCode + dateCode).slice(0, 12); // Ensure it's 12 digits
    let ean13Code = baseCode + calculateEAN13Checksum(baseCode); // Append checksum

    // Generate barcode
    JsBarcode("#barcodeCanvas", ean13Code, {
        format: "EAN13",
        width: 2,
        height: 100,
        displayValue: true,
        fontSize: 20,
        marginBottom: 15,
        lineColor: "#000",
        background: "#fff"
    });
}

// Function to calculate the EAN-13 checksum
function calculateEAN13Checksum(code) {
    let sum = 0;
    for (let i = 0; i < 12; i++) {
        sum += parseInt(code[i]) * (i % 2 === 0 ? 1 : 3);
    }
    let checksum = (10 - (sum % 10)) % 10;
    return checksum.toString();
}

function downloadBarcode() {
    let canvas = document.getElementById("barcodeCanvas");
    let link = document.createElement("a");
    link.download = "barcode.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
}
