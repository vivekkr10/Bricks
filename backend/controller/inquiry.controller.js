const sheets = require("../config/googleApiConfig");

const submitInquiry = async (req, res) => {
  try {
    const { name, email, phone, message, productName, requiredQty, deliveryLoc, } = req.body;

    const inquiryId = `VR-${Date.now().toString().slice(-5)}`;

    const formattedDate = new Date().toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "Inquiries!A:I",   
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [[
          inquiryId,       
          formattedDate,   
          name,            
          phone,           
          email,           
          productName,     
          requiredQty,     
          deliveryLoc,     
          message
        ]],
      },
    });

    res.status(200).json({ success: true });

  } catch (error) {
    console.error("SHEET ERROR:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { submitInquiry };
