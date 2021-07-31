const rewire = require("rewire")
const admin = rewire("./admin")
const fetchdatamenu = admin.__get__("fetchdatamenu")
const listmenu = admin.__get__("listmenu")
// @ponicode
describe("fetchdatamenu", () => {
    test("0", () => {
        fetchdatamenu()
    })
})

// @ponicode
describe("listmenu", () => {
    test("0", () => {
        let object = [{ fields: { menuTitle: -10, id: 0, menuUrl: -10 }, id: "bar" }, { fields: { menuTitle: "Tokyo", id: -10, menuUrl: "www.google.com" }, id: 10 }, { fields: { menuTitle: 1, id: 0, menuUrl: "Www.GooGle.com" }, id: -1 }, { fields: { menuTitle: "Tokyo", id: -1, menuUrl: "Www.GooGle.com" }, id: 1 }, { fields: { menuTitle: 10, id: 1, menuUrl: 1 }, id: "bar" }, { fields: { menuTitle: 1, id: 1, menuUrl: 10 }, id: 0 }, { fields: { menuTitle: 10, id: "myDIV", menuUrl: 0.0 }, id: "bar" }, { fields: { menuTitle: -1, id: 0, menuUrl: "www.google.com" }, id: -10 }]
        let callFunction = () => {
            listmenu({ records: object })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let object = [{ fields: { menuTitle: 1, id: 0, menuUrl: 0.0 }, id: 10 }, { fields: { menuTitle: 0.0, id: 0, menuUrl: "http://www.example.com/route/123?foo=bar" }, id: "bar" }, { fields: { menuTitle: -1, id: 0, menuUrl: -10 }, id: 0.0 }, { fields: { menuTitle: 1, id: -10, menuUrl: 1 }, id: 1 }, { fields: { menuTitle: 1, id: -10, menuUrl: 1 }, id: -1 }, { fields: { menuTitle: 1, id: "myDIV", menuUrl: -10 }, id: -1 }, { fields: { menuTitle: 0, id: 10, menuUrl: 0 }, id: "bar" }, { fields: { menuTitle: -1, id: 0.0, menuUrl: -1 }, id: 0 }]
        let callFunction = () => {
            listmenu({ records: object })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let object = [{ fields: { menuTitle: "New York", id: -1, menuUrl: 1 }, id: -1 }, { fields: { menuTitle: "Roma", id: -1, menuUrl: "https://twitter.com/path?abc" }, id: 10 }, { fields: { menuTitle: 0, id: -1, menuUrl: 10 }, id: "bar" }, { fields: { menuTitle: 0, id: "myDIV", menuUrl: -1 }, id: "myDIV" }, { fields: { menuTitle: -1, id: 0, menuUrl: 0 }, id: 1 }, { fields: { menuTitle: -10, id: 1, menuUrl: -10 }, id: 10 }, { fields: { menuTitle: -1, id: 0, menuUrl: 1 }, id: -10 }, { fields: { menuTitle: -10, id: 10, menuUrl: "http://base.com" }, id: "bar" }]
        let callFunction = () => {
            listmenu({ records: object })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let object = [{ fields: { menuTitle: -1, id: -1, menuUrl: 1 }, id: -10 }, { fields: { menuTitle: 0, id: 1, menuUrl: "http://www.example.com/route/123?foo=bar" }, id: 0.0 }, { fields: { menuTitle: "Paris", id: 0, menuUrl: 10 }, id: 1 }, { fields: { menuTitle: 10, id: 10, menuUrl: -10 }, id: -1 }, { fields: { menuTitle: "Skhirat", id: 0, menuUrl: 1 }, id: 10 }, { fields: { menuTitle: -10, id: 0.0, menuUrl: -1 }, id: "bar" }, { fields: { menuTitle: 0.0, id: 0, menuUrl: "https://" }, id: 0 }, { fields: { menuTitle: "Saint-Denis", id: -1, menuUrl: 0.0 }, id: 10 }]
        let callFunction = () => {
            listmenu({ records: object })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let object = [{ fields: { menuTitle: -10, id: -1, menuUrl: -1 }, id: -10 }, { fields: { menuTitle: "Paris", id: 0.0, menuUrl: -10 }, id: 0.0 }, { fields: { menuTitle: 10, id: -1, menuUrl: 0.0 }, id: -10 }, { fields: { menuTitle: -1, id: -1, menuUrl: 0 }, id: 1 }, { fields: { menuTitle: "Tokyo", id: -1, menuUrl: "www.google.com" }, id: 0.0 }, { fields: { menuTitle: 0, id: -10, menuUrl: "http://www.example.com/route/123?foo=bar" }, id: 0.0 }, { fields: { menuTitle: -1, id: -10, menuUrl: "http://base.com" }, id: 1 }, { fields: { menuTitle: 10, id: 0, menuUrl: 10 }, id: 0 }]
        let callFunction = () => {
            listmenu({ records: object })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            listmenu(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})
