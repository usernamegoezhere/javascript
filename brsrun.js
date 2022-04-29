const puppeteer = require('puppeteer')
const fs = require('fs')

let uR, eM, fN, lN, sA, cI, zI, cC, nC, eX, cV = new String()

if (fs.existsSync('data.txt')) {
    //file exists
    fs.readFile('data.txt', function (err, data) {
        if (err) throw err;
        let array = data.toString().split("\n");
        for (i in array) {
            let index = array[i].indexOf(':') + 1

            array[i] = array[i].substring(index)

            console.log(array[i])

            uR = array[0]
            eM = array[1]
            fN = array[2]
            lN = array[3]
            sA = array[4]
            cI = array[5]
            zI = array[6]
            cC = array[7]
            nC = array[8]
            eX = array[9]
            cV = array[10]

        }
    });


    (async () => {
        const url = uR

        const browser = await puppeteer.launch({headless: false})
        const page = await browser.newPage()
        await page.goto(url)


        //add to cart
        await page.click('[name="add"]')
        await page.waitFor(2000)

        //checkout
        await page.click('[class="action_button right"]')
        await page.waitFor(500)
        await page.click('[class="action_button right"]')
        await page.waitForNavigation({waitUntil: 'networkidle0'})

        //enter info
        await page.type('[placeholder="Email"]', eM)
        await page.click('[type="checkbox"]')
        await page.type('[placeholder="First name"]', fN)
        await page.type('[placeholder="Last name"]', lN)
        await page.type('[placeholder="Address"]', sA)
        await page.type('[placeholder="City"]', cI)

        await page.keyboard.press("Tab")
        await page.keyboard.press("Tab")
        await page.keyboard.type("Ca")

        await page.type('[placeholder="ZIP code"]', zI)

        //continue to shipping
        await page.waitFor(500)
        await page.click('[type="submit"]')

        //wait for page load
        await page.waitFor(3000)
        await page.click('[type="submit"]')

        //cc num
        await page.waitForNavigation({waitUntil: "networkidle0"})

        for (let i = 0; i < 10; i++) {
            await page.keyboard.press("Tab")
        }

        await page.keyboard.type(cC)
        await page.keyboard.press("Tab")
        await page.keyboard.press("Tab")
        await page.waitFor(50)

        await page.keyboard.type(nC)
        await page.keyboard.press("Tab")
        await page.waitFor(50)

        await page.keyboard.type(eX)
        await page.keyboard.press("Tab")
        await page.waitFor(50)

        await page.keyboard.type(cV)

        await page.keyboard.press("Enter")

    })();
}
else {
    fs.writeFile('data.txt', 'URL:\nEmail:\nFirst Name:\nLast name:\nAddress:\nCity:\nZIP Code:\nCC#:\nExpiration:\nCCV:\n', function (err) {
        if (err) return console.log(err);
        console.log('file wrote');
    });
}



