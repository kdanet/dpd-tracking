import dpd from '../src/dpd';
const track = "RU031773238"
let res;
let eventsInfo;
describe("Tests DPD-TRACKING:", () => {
    test("Array data not empty.", async () => {
        const { info, trackInfo } = await dpd(track);
        res = info;
        eventsInfo = trackInfo
        expect(res).not.toBe(null);
    });
    test("Events validation.", async () => {
        expect(eventsInfo.search('✅Заказ оформлен.')).not.toBe(-1);
        expect(eventsInfo.search('✅Доставлено.')).not.toBe(-1);
    })
    test("Delivery variant validations.", () => {
        expect(res.deliveryVariant).toBe("до пункта выдачи");
    })
    test("Delivery dateIn validations.", () => {
        expect(res.deliveryDateIn).toBe("13.04.2020");
    });
    test("Delivery dateOut validations.", () => {
        expect(res.deliveryDateOut).toBe("23.04.2020");
    });
    test("Delivery city validations.", () => {
        expect(res.deliveryCity).toBe("Павлодар");
    });
    test("Catch errors.", async () => {
        dpd("ieovrevre").catch(e => {
            expect(e.message).toBe('Track number not found');
        });
    })
})