const dropboxV2Api = require('dropbox-v2-api');
const fs = require('fs');
const { Schema } = require('mongoose');
const puppeteer = require('puppeteer');

// dropbox access token
const token = 'PASTE_YOUR_TOKEN_HERE';

const db = 'Screenshots';
const connections = require('./connection')(db);

const webAddress = 'http://localhost:3000/v1/users';

// unique filename for dropbox
const filename = `${Date.now().toString()}.png`;

// date of the screenshot in human readable format
const readableDate = new Date().toLocaleString();

const ScreenshotSchema = new Schema(
    {
        link: {
            type: String,
            required: true,
        },
        date: {
            type: String,
        },
    },
    {
        db,
        versionKey: false,
    },
);

// connect to db
const screeshotLink = connections.model('screenshot', ScreenshotSchema);

const dropbox = dropboxV2Api.authenticate({
    token,
});

/**
 * Gets dropbox public link and saved it to database
 * @function
 */
const createLinkAndSaveToDatabase = () => {
    dropbox({
        resource: 'sharing/create_shared_link_with_settings',
        parameters: {
            path: `/${filename}`,
        },
    }, (err, result) => {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        screeshotLink.create({
            link: result.url,
            date: readableDate,
        });
    });
};

/**
 * Uploads file to dropbox
 * @function
 */
function uploadFile() {
    dropbox({
        resource: 'files/upload',
        parameters: {
            path: `/${filename}`,
        },
        readStream: fs.createReadStream('temp.png'),
    }, (err) => {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        createLinkAndSaveToDatabase();
    });
}

/**
 * Makes screenshots from target site by means of puppeteer
 * @function
 */
(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(webAddress);
    await page.screenshot({ path: 'temp.png' });
    await browser.close();
})().then(() => {
    uploadFile();
});
