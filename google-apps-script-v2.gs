/**
 * JONTOR MONTOR — order inbox  ·  version 2
 *
 * New in this version:
 *   - customers can look up their order status from the website
 *   - customers can cancel their own order within CANCEL_HOURS
 *
 * SAFE TO PASTE OVER YOUR CURRENT SCRIPT. It finds your existing
 * Orders tab and keeps every row you already have.
 *
 * After pasting:  Deploy ▸ Manage deployments ▸ pencil ▸
 *                 Version: "New version" ▸ Deploy
 */

// ▼ Leave "" if this script lives INSIDE your spreadsheet
//   (the normal case). Only fill it in for a standalone script.
var SHEET_ID = "";

// ▼ Where "new order" and "cancelled" emails go. "" for no email.
var NOTIFY_EMAIL = "jontormontor.official@gmail.com";

// ▼ How many hours a customer may cancel their own order.
//   MUST match cancelHours in js/app.js or the two will disagree.
var CANCEL_HOURS = 1;

var SHEET_NAME = "Orders";

var HEADERS = [
  "Placed at", "Order ID", "Status",
  "Name", "Phone", "Alt phone", "Email",
  "Address", "Area / Thana", "District", "Zone",
  "Payment", "Sender number", "Transaction ID",
  "Items", "Item count", "Subtotal", "Delivery", "Total",
  "Notes", "Source"
];

/* Default column positions. These are only a fallback — the script
   actually finds each column by its header name, so inserting or
   reordering columns in the sheet will not break anything. */
var COL = { placedAt:1, orderId:2, status:3, name:4, phone:5, items:15, total:19 };

/** Locate each column by reading the header row. */
function cols_(sheet) {
  var width = Math.max(sheet.getLastColumn(), HEADERS.length);
  var head = sheet.getRange(1, 1, 1, width).getValues()[0];
  function find(label, fallback) {
    for (var i = 0; i < head.length; i++) {
      if (String(head[i]).trim().toLowerCase() === label.toLowerCase()) return i + 1;
    }
    return fallback;
  }
  return {
    placedAt: find("Placed at", COL.placedAt),
    orderId:  find("Order ID",  COL.orderId),
    status:   find("Status",    COL.status),
    name:     find("Name",      COL.name),
    phone:    find("Phone",     COL.phone),
    items:    find("Items",     COL.items),
    total:    find("Total",     COL.total),
    width:    width
  };
}

/* ================= receiving an order ================= */

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    var p = (e && e.parameter) ? e.parameter : {};
    writeRow_(p);
    notifyNew_(p);
    return json_({ ok: true, orderId: p.orderId || "" }, null);
  } catch (err) {
    return json_({ ok: false, error: String(err) }, null);
  } finally {
    lock.releaseLock();
  }
}

/* ================= status, cancel, test ================= */

function doGet(e) {
  var q = (e && e.parameter) ? e.parameter : {};
  var cb = q.callback || null;   // set when the website is asking

  try {
    if (q.action === "status") return json_(lookup_(q.orderId, q.phone), cb);
    if (q.action === "cancel") return json_(cancel_(q.orderId, q.phone), cb);

    if (q.test) {
      writeRow_({
        orderId: "TEST-" + Math.random().toString(36).slice(2, 6).toUpperCase(),
        placedAt: stamp_(), name: "TEST ROW — delete me", phone: "01600000000",
        address: "Written by the ?test=1 check", area: "Test", district: "Test",
        zone: "Inside Dhaka", payment: "Cash on delivery",
        items: "Test item x1", itemCount: 1, subtotal: 1, delivery: 0, total: 1,
        notes: "If you can see this, the script and sheet are connected.",
        source: "browser test"
      });
      return json_({ ok: true, message: "Test row written. Delete it afterwards." }, cb);
    }

    var sheet = getSheet_();
    return json_({
      ok: true,
      connectedTo: sheet.getParent().getName() + " > " + sheet.getName(),
      orders: Math.max(0, sheet.getLastRow() - 1),
      cancelHours: CANCEL_HOURS,
      message: "Endpoint is live. If you can see version v2 above, the new script IS deployed."
    }, cb);

  } catch (err) {
    return json_({ ok: false, error: String(err) }, cb);
  }
}

/** Find an order. Requires the phone number to match, so one customer
 *  can never read another customer's details. */
function lookup_(orderId, phone) {
  var row = findRow_(orderId, phone);
  if (!row) return { ok: false, reason: "not_found" };
  var sheet = getSheet_();
  var C = cols_(sheet);
  var v = sheet.getRange(row, 1, 1, C.width).getValues()[0];
  return {
    ok: true,
    orderId: v[C.orderId - 1],
    status:  String(v[C.status - 1] || "NEW").trim(),
    items:   v[C.items - 1],
    total:   v[C.total - 1],
    placedAt: String(v[C.placedAt - 1])
  };
}

/** Cancel, but only inside the allowed window and only with the right phone. */
function cancel_(orderId, phone) {
  var lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    var row = findRow_(orderId, phone);
    if (!row) return { ok: false, reason: "not_found" };

    var sheet = getSheet_();
    var C = cols_(sheet);
    var current = String(sheet.getRange(row, C.status).getValue() || "NEW").toUpperCase();

    if (current.indexOf("CANCEL") > -1) return { ok: true, status: "CANCELLED BY CUSTOMER", already: true };
    if (current.indexOf("SHIP") > -1 || current.indexOf("DELIVER") > -1 || current.indexOf("DONE") > -1) {
      return { ok: false, reason: "too_late_stage", status: current };
    }

    var placed = new Date(sheet.getRange(row, C.placedAt).getValue());
    if (!isNaN(placed.getTime())) {
      var hrs = (Date.now() - placed.getTime()) / 36e5;
      if (hrs > CANCEL_HOURS) return { ok: false, reason: "window_closed", status: current };
    }

    sheet.getRange(row, C.status).setValue("CANCELLED BY CUSTOMER");
    sheet.getRange(row, 1, 1, C.width).setBackground("#fee2e2");

    notifyCancel_(sheet.getRange(row, 1, 1, C.width).getValues()[0], C);
    return { ok: true, status: "CANCELLED BY CUSTOMER" };
  } finally {
    lock.releaseLock();
  }
}

/** Match on Order ID plus the last 6 digits of the phone number, so a
 *  leading zero or +88 typed differently still finds the order. */
function findRow_(orderId, phone) {
  if (!orderId || !phone) return 0;
  var sheet = getSheet_();
  var last = sheet.getLastRow();
  if (last < 2) return 0;

  var C = cols_(sheet);
  var want = String(orderId).trim().toUpperCase();
  var tail = String(phone).replace(/\D/g, "").slice(-6);
  if (tail.length < 6) return 0;

  var data = sheet.getRange(2, 1, last - 1, C.width).getValues();
  for (var i = 0; i < data.length; i++) {
    var id = String(data[i][C.orderId - 1] || "").trim().toUpperCase();
    var ph = String(data[i][C.phone - 1] || "").replace(/\D/g, "");
    if (id === want && ph.slice(-6) === tail) return i + 2;
  }
  return 0;
}

/* ================= sheet plumbing ================= */

function getBook_() {
  return SHEET_ID ? SpreadsheetApp.openById(SHEET_ID) : SpreadsheetApp.getActiveSpreadsheet();
}

/** Finds your existing orders tab even if it was renamed: first by name,
 *  then by looking for the "Order ID" header, then the first tab. */
function getSheet_() {
  var ss = getBook_();
  if (!ss) throw new Error("No spreadsheet. If this script is standalone, fill in SHEET_ID at the top.");

  var sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    var tabs = ss.getSheets();
    for (var i = 0; i < tabs.length; i++) {
      if (tabs[i].getLastRow() > 0) {
        var head = tabs[i].getRange(1, 1, 1, Math.min(4, tabs[i].getLastColumn())).getValues()[0];
        if (head.join("|").indexOf("Order ID") > -1) { sheet = tabs[i]; break; }
      }
    }
  }
  if (!sheet) sheet = ss.getSheets()[0] || ss.insertSheet(SHEET_NAME);

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length)
         .setFontWeight("bold").setBackground("#0a3a1c").setFontColor("#f4c20d");
    sheet.setFrozenRows(1);
    sheet.setColumnWidth(COL.items, 320);
    sheet.setColumnWidth(8, 260);
  }
  return sheet;
}

function writeRow_(p) {
  getSheet_().appendRow([
    p.placedAt || stamp_(),
    p.orderId || "",
    "NEW",
    p.name || "", p.phone || "", p.altPhone || "", p.email || "",
    p.address || "", p.area || "", p.district || "", p.zone || "",
    p.payment || "", p.senderNo || "", p.trxId || "",
    p.items || "", p.itemCount || "", p.subtotal || "", p.delivery || "", p.total || "",
    p.notes || "", p.source || ""
  ]);
}

function stamp_() {
  return new Date().toLocaleString("en-GB", { timeZone: "Asia/Dhaka" });
}

/* ================= email ================= */

function notifyNew_(p) {
  if (!NOTIFY_EMAIL) return;
  try {
    MailApp.sendEmail({
      to: NOTIFY_EMAIL,
      subject: "New order " + (p.orderId || "") + " — " + p.total + " BDT — " + p.name,
      body:
        "New order: " + (p.orderId || "") + "\n" +
        "Placed: " + (p.placedAt || "") + "\n\n" +
        "ITEMS\n" + String(p.items || "").split(" | ").join("\n") + "\n\n" +
        "Subtotal: " + p.subtotal + " BDT\n" +
        "Delivery (" + p.zone + "): " + p.delivery + " BDT\n" +
        "TOTAL: " + p.total + " BDT\n\n" +
        "CUSTOMER\n" + p.name + "\n" +
        p.phone + (p.altPhone ? " / " + p.altPhone : "") + "\n" +
        (p.email ? p.email + "\n" : "") +
        p.address + "\n" + p.area + ", " + p.district + "\n\n" +
        "PAYMENT: " + p.payment +
        (p.trxId ? ("\nTransaction ID: " + p.trxId + "\nSent from: " + p.senderNo) : "") + "\n\n" +
        (p.notes ? ("NOTES\n" + p.notes + "\n") : "")
    });
  } catch (err) { /* never let a mail failure lose the row */ }
}

function notifyCancel_(v, C) {
  if (!NOTIFY_EMAIL) return;
  C = C || COL;
  try {
    MailApp.sendEmail({
      to: NOTIFY_EMAIL,
      subject: "CANCELLED by customer — " + v[C.orderId - 1] + " — " + v[C.total - 1] + " BDT",
      body:
        "The customer cancelled this order from the website.\n\n" +
        "Order: " + v[C.orderId - 1] + "\n" +
        "Placed: " + v[C.placedAt - 1] + "\n" +
        "Customer: " + v[C.name - 1] + " · " + v[C.phone - 1] + "\n" +
        "Items: " + v[C.items - 1] + "\n" +
        "Total: " + v[C.total - 1] + " BDT\n\n" +
        "The row is now marked CANCELLED BY CUSTOMER and highlighted red.\n" +
        "If you had already started printing, call them."
    });
  } catch (err) { /* ignore */ }
}

/* ================= response helper ================= */

/** Plain JSON for POSTs; JavaScript wrapped in a callback for the website,
 *  which is how the browser reads a reply from Apps Script without CORS. */
var SCRIPT_VERSION = "v2";

function json_(obj, callback) {
  if (obj && typeof obj === "object") obj.version = SCRIPT_VERSION;
  var text = JSON.stringify(obj);
  if (callback) {
    return ContentService
      .createTextOutput(callback + "(" + text + ");")
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }
  return ContentService.createTextOutput(text).setMimeType(ContentService.MimeType.JSON);
}


/* ================= one-click sheet setup ================= */

/**
 * Run this ONCE from the editor (pick setupStatusDropdown, press Run).
 * It puts a proper dropdown on the whole Status column and colours each
 * stage, so you can never mistype a status again.
 */
function setupStatusDropdown() {
  var sheet = getSheet_();
  var options = ["NEW", "CONFIRMED", "PRINTING", "SHIPPED", "DELIVERED",
                 "CANCELLED BY CUSTOMER", "CANCELLED BY US"];

  var range = sheet.getRange(2, cols_(sheet).status, Math.max(sheet.getMaxRows() - 1, 500), 1);
  var rule = SpreadsheetApp.newDataValidation()
    .requireValueInList(options, true)
    .setAllowInvalid(true)     // typing still works, you just get a warning
    .setHelpText("Pick a stage. The customer's tracking page follows this.")
    .build();
  range.setDataValidation(rule);

  var colours = {
    "NEW": "#fff7d6", "CONFIRMED": "#e3f0e6", "PRINTING": "#dbeafe",
    "SHIPPED": "#dcfce7", "DELIVERED": "#bbf7d0",
    "CANCELLED BY CUSTOMER": "#fee2e2", "CANCELLED BY US": "#fee2e2"
  };
  var rules = [];
  Object.keys(colours).forEach(function (k) {
    rules.push(SpreadsheetApp.newConditionalFormatRule()
      .whenTextEqualTo(k)
      .setBackground(colours[k])
      .setRanges([range])
      .build());
  });
  sheet.setConditionalFormatRules(rules);

  Logger.log("Done. The Status column now has a dropdown with: " + options.join(", "));
}

/**
 * Run this to check a real order the way the website does.
 * Edit the two values first, then press Run and read the log.
 */
function testLookup() {
  var ORDER_ID = "JM-000000-XXXX";   // <- paste a real Order ID from the sheet
  var PHONE    = "01700000000";      // <- and that customer's phone

  var found = findRow_(ORDER_ID, PHONE);
  if (!found) {
    Logger.log("NOT FOUND. Check the Order ID and phone match a row exactly.");
    return;
  }
  Logger.log("Found on row " + found);
  Logger.log(JSON.stringify(lookup_(ORDER_ID, PHONE)));
}

/* ================= run this from the editor to check setup ============ */

function testSetup() {
  var sheet = getSheet_();
  Logger.log("Script version: " + SCRIPT_VERSION);
  Logger.log("Connected to: " + sheet.getParent().getName() + " > " + sheet.getName());
  Logger.log("Orders so far: " + Math.max(0, sheet.getLastRow() - 1));
  Logger.log("Status column detected at column " + cols_(sheet).status);
  Logger.log("Cancellation window: " + CANCEL_HOURS + " hour(s)");
}
