/**
 * JONTOR MONTOR — order inbox
 * Paste this into Google Apps Script (Extensions ▸ Apps Script) from your
 * orders spreadsheet, then Deploy ▸ New deployment ▸ Web app.
 * Full step-by-step is in SETUP-ORDERS.txt
 */

// ▼ EDIT: where you want the "new order" email to land. Leave "" for no email.
var NOTIFY_EMAIL = "jontormontor.official@gmail.com";

var SHEET_NAME = "Orders";

var HEADERS = [
  "Placed at", "Order ID", "Status",
  "Name", "Phone", "Alt phone", "Email",
  "Address", "Area / Thana", "District", "Zone",
  "Payment", "Sender number", "Transaction ID",
  "Items", "Item count", "Subtotal", "Delivery", "Total",
  "Notes", "Source"
];

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    var p = (e && e.parameter) ? e.parameter : {};
    var sheet = getSheet_();

    sheet.appendRow([
      p.placedAt || new Date(),
      p.orderId || "",
      "NEW",
      p.name || "", p.phone || "", p.altPhone || "", p.email || "",
      p.address || "", p.area || "", p.district || "", p.zone || "",
      p.payment || "", p.senderNo || "", p.trxId || "",
      p.items || "", p.itemCount || "", p.subtotal || "", p.delivery || "", p.total || "",
      p.notes || "", p.source || ""
    ]);

    notify_(p);

    return json_({ ok: true, orderId: p.orderId || "" });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

// Lets you check the deployment is alive by opening the /exec URL in a browser.
function doGet() {
  return json_({ ok: true, message: "Jontor Montor order endpoint is live." });
}

function getSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = ss.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    var head = sheet.getRange(1, 1, 1, HEADERS.length);
    head.setFontWeight("bold").setBackground("#0a3a1c").setFontColor("#f4c20d");
    sheet.setFrozenRows(1);
    sheet.setColumnWidth(15, 320); // Items
    sheet.setColumnWidth(8, 260);  // Address
  }
  return sheet;
}

function notify_(p) {
  if (!NOTIFY_EMAIL) return;
  try {
    var body =
      "New order: " + (p.orderId || "") + "\n" +
      "Placed: " + (p.placedAt || "") + "\n\n" +
      "ITEMS\n" + String(p.items || "").split(" | ").join("\n") + "\n\n" +
      "Subtotal: " + p.subtotal + " BDT\n" +
      "Delivery (" + p.zone + "): " + p.delivery + " BDT\n" +
      "TOTAL: " + p.total + " BDT\n\n" +
      "CUSTOMER\n" +
      p.name + "\n" + p.phone + (p.altPhone ? " / " + p.altPhone : "") + "\n" +
      (p.email ? p.email + "\n" : "") +
      p.address + "\n" + p.area + ", " + p.district + "\n\n" +
      "PAYMENT: " + p.payment +
      (p.trxId ? ("\nTransaction ID: " + p.trxId + "\nSent from: " + p.senderNo) : "") + "\n\n" +
      (p.notes ? ("NOTES\n" + p.notes + "\n") : "");

    MailApp.sendEmail({
      to: NOTIFY_EMAIL,
      subject: "🖨️ New order " + (p.orderId || "") + " — " + p.total + " BDT — " + p.name,
      body: body
    });
  } catch (err) {
    // Never let a mail failure lose the order row.
  }
}

function json_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
