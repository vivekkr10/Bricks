const sheets = require("../config/googleApiConfig");

const submitInquiry = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "Inquiries!A:E",   
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [[
          name,
          email,
          phone,
          message,
          new Date().toLocaleString()
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
