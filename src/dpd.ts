const fetch = require("node-fetch");
const jsdom = require("jsdom");
interface ItrackDetails {
    orderNum: string
}
interface Info {
    deliveryVariant: string,
    deliveryDateIn: string,
    deliveryDateOut: string,
    deliveryCity: string
}

const dpd = async (track: string) => {
    let trackInfo: string = "";
    const formBody: Array<string> = [];
    const details: ItrackDetails = {
        "orderNum": '' + track
    }
    if (details.orderNum != '') {
        let property: string
        for (property in details) {
            let encodedKey = encodeURIComponent(property);
            let encodedValue = encodeURIComponent(details.orderNum);
            formBody.push(encodedKey + "=" + encodedValue);
        }
    }
    try {
        const res = await fetch("https://www.dpd.ru/ols/trace2/standard.do2?method:search", {
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            },
            body: formBody + ''
        })
        const html = await res.text();
        if (res.status != 200)
            throw Error("DPD-Server is not responding");
        else if (html.trim().search(/не найдена/gm) !== -1)
            throw Error("Track number not found");
        const htmls = "<!DOCTYPE html><html><head></head><body>" + html + "</body></html>";
        const dom = new jsdom.JSDOM(htmls);
        //Parse track status
        const table = dom.window.document.getElementById("trackHistory").textContent.trim();
        //const arrEvents = table.match(/[\d].+|[аА-яЯ].+/gmi).slice(2); //Table with date
        const arrEvents = table.match(/[аА-яЯ].+/gmi).slice(2).forEach(item => {
            trackInfo += `✅${item}.\n`
        });
        //! -------------------------------------------------------------------------------------
        //Parse order info
        const arrInfo = dom.window.document.getElementById("tracing_table").textContent.trim().replace(/\n | \t | \s+/gmi, "  ").split("   ");
        const info: Info = {
            deliveryVariant: arrInfo[3].trim(),
            deliveryDateIn: arrInfo[8].trim(),
            deliveryDateOut: arrInfo[14].trim(),
            deliveryCity: arrInfo[12].trim()
        }
        return { trackInfo, info }
    }
    catch (e) {
        throw e
    }
}

export default dpd;