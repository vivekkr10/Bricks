const { google } = require("googleapis");

const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      specifications,
      usageArea,
      status
    } = req.body;

    const productId = Date.now().toString(); 

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.SHEET_ID,
      range: "Products!A:G",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [[
          productId,
          name,
          description,
          specifications,
          usageArea,
          status,
          new Date().toLocaleString()
        ]]
      }
    });

    res.json({ success: true });
  } catch (error) {
    console.error("Add Product Error:", error);
    res.status(500).json({ success: false });
  }
};


module.exports = { addProduct };
