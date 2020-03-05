const { Schema } = require('mongoose');
const puppeteer = require('puppeteer');

const db = 'GrabbingEmails';
const connections = require('./connection')(db);

const GrabbingSchema = new Schema(
    {
        email: {
            type: Array,
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

const test = connections.model('test', GrabbingSchema);

const readableDate = new Date().toLocaleString();

/**
 * Grabbing emails from page via puppeteer
 * @function
 */
(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('http://localhost:3000/v1/users');
    const allEmail = await page.$$eval('.email', (email) => email.map((item) => item.innerHTML));
    test.create({
        email: allEmail,
        date: readableDate,
    });
    await browser.close();
})();
