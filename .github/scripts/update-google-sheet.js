const { GoogleSpreadsheet } = require('google-spreadsheet');
const {
  LHCI_GOOGLE_SPREAD_SHEET_ID,
  getLhciSheetIdFromPageName,
} = require('../../src/configs/lighthouse/Lighthouse.js');

// JSON 파싱 유틸 함수
const parseJSON = (value, name) => {
  try {
    if (!value) throw new Error(`${name} is missing or empty.`);
    return JSON.parse(value);
  } catch (err) {
    console.error(`❌ Failed to parse ${name}:`, err.message);
    process.exit(1);
  }
};

(async () => {
  const creds = {
    client_email: process.env.LHCI_GOOGLE_CLIENT_EMAIL,
    private_key: process.env.LHCI_GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  };

  // 필수 환경변수 검사 및 파싱
  const desktop = parseJSON(process.env.DESKTOP_SCORES, 'DESKTOP_SCORES');
  const mobile = parseJSON(process.env.MOBILE_SCORES, 'MOBILE_SCORES');
  const monitoringTime = process.env.MONITORING_TIME;
  const prUrl = process.env.PR_URL;
  const prNumber = process.env.PR_NUMBER;

  if (!monitoringTime || !prUrl || !prNumber) {
    console.error(
      '❌ Required environment variables (MONITORING_TIME, PR_URL, PR_NUMBER) are missing.',
    );
    process.exit(1);
  }

  const doc = new GoogleSpreadsheet(LHCI_GOOGLE_SPREAD_SHEET_ID);
  await doc.useServiceAccountAuth(creds);
  await doc.loadInfo();

  for (const pageName in desktop) {
    const sheetId = getLhciSheetIdFromPageName(pageName);
    const desktopScore = desktop[pageName];
    const mobileScore = mobile[pageName];

    const sheet = doc.sheetsById[sheetId];
    await sheet.loadHeaderRow();

    const hyperlink = `=HYPERLINK("${prUrl}", "#${prNumber}")`;

    const rows = await sheet.getRows();
    const previousRow = rows.find(row => row['PR url'] === `#${prNumber}`);

    if (previousRow) {
      previousRow['Monitoring Time'] = monitoringTime;
      previousRow['PR url'] = hyperlink;
      Object.keys(desktopScore).forEach(key => {
        previousRow[`${key} [D]`] = desktopScore[key];
        previousRow[`${key} [M]`] = mobileScore[key];
      });
      await previousRow.save();
    } else {
      const newRow = {
        'PR url': hyperlink,
        'Monitoring Time': monitoringTime,
      };
      Object.keys(desktopScore).forEach(key => {
        newRow[`${key} [D]`] = desktopScore[key];
        newRow[`${key} [M]`] = mobileScore[key];
      });
      await sheet.addRow(newRow);
    }
  }

  console.log('✅ Google Spreadsheet updated successfully!');
})();
