const fs = require('fs');
const { GoogleSpreadsheet } = require('google-spreadsheet');
const {
  LHCI_GOOGLE_SPREAD_SHEET_ID,
  getLhciSheetIdFromPageName,
} = require('../../src/configs/lighthouse/Lighthouse.js');

(async () => {
  const creds = {
    client_email: process.env.LHCI_GOOGLE_CLIENT_EMAIL,
    private_key: process.env.LHCI_GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  };

  const desktop = JSON.parse(process.env.DESKTOP_SCORES);
  const mobile = JSON.parse(process.env.MOBILE_SCORES);
  const monitoringTime = process.env.MONITORING_TIME;
  const prUrl = process.env.PR_URL;
  const prNumber = process.env.PR_NUMBER;

  const doc = new GoogleSpreadsheet(LHCI_GOOGLE_SPREAD_SHEET_ID);
  await doc.useServiceAccountAuth(creds);
  await doc.loadInfo();

  for (const pageName in desktop) {
    const sheetId = getLhciSheetIdFromPageName(pageName);
    const desktopScore = desktop[pageName];
    const mobileScore = mobile[pageName];

    const sheet = doc.sheetsById[sheetId];
    await sheet.loadHeaderRow();

    const hyperlink = '=HYPERLINK("' + prUrl + '", "#' + prNumber + '")';

    const rows = await sheet.getRows();
    const previousRow = rows.find(row => row['PR url'] === `#${prNumber}`);

    if (previousRow) {
      previousRow['Monitoring Time'] = monitoringTime;
      previousRow['PR url'] = hyperlink;
      Object.keys(desktopScore).forEach(key => {
        previousRow[key + ' [D]'] = desktopScore[key];
        previousRow[key + ' [M]'] = mobileScore[key];
      });
      await previousRow.save();
    } else {
      const newRow = { 'PR url': hyperlink, 'Monitoring Time': monitoringTime };
      Object.keys(desktopScore).forEach(key => {
        newRow[key + ' [D]'] = desktopScore[key];
        newRow[key + ' [M]'] = mobileScore[key];
      });
      await sheet.addRow(newRow);
    }
  }
})();
