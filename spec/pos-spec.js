'use strict';

describe("formatTags",function(){
    it("formatTags",function () {
        let tags=[
            'ITEM000002-2',
            'ITEM000000',
            'ITEM000005'
        ];

        let result=formatTags(tags);

        let itemsTag = [
            {
                barcode:'ITEM000002',
                amount:2
            },
            {
                barcode:'ITEM000000',
                amount:1
            },
            {
                barcode:'ITEM000005',
                amount:1
            }
        ];
        expect(result).toEqual(itemsTag);
    });
});

describe("mergeBarcodes",function () {
    it("mergeBarces",function (){
        let barcodes=[

            {
                barcode:"0001",
                amount:1
            },

            {
                barcode:"0002",
                amount:1
            },

            {
                barcode:"0001",
                amount:2
            }
        ];

        let result=mergeBarcodes(barcodes);

        let items=[
            {
                barcode:"0001",
                amount:3
            },
            {
                barcode:"0002",
                amount:1
            }
        ]
        expect(result).toEqual(items);
    });
});

 describe("changeType",function ( ) {

    it("changeType",function () {
        let input=[
            {
                type:"333",
                barcodes:["001","002"]
            },
        ];
        let text=changeType(input);
        let result=[
            {
                type:"333",
                barcode:"001"
            },{
                type:"333",
                barcode:"002"
            }
        ];
        expect(text).toEqual(result);

    })
});

describe("addType",function (){
    it("addType",function () {
        let withType=[
            {
                barcode:"0001",
                type:"333"
            },
            {
                barcode:"0002"
            }

        ];
        let allItems=[{
            barcode:"0001",
            name:"li",
            price:3,
            util:"000"
        },
            {
                barcode:"0002",
                name:"wang",
                price:1,
                util:"000"
            }]
        let result=[{
            barcode:"0001",
            name:"li",
            price:3,
            util:"000",
            type:"333"
        },
            {
                barcode:"0002",
                name:"wang",
                price:1,
                util:"000",
                type:"null"
            }]

        let text=addType(withType,allItems);
        expect(text).toEqual(result);
    })
})

describe("getCartItems",function ( ) {

    it("getCartItems",function () {
        let allTypeItems=[{
            barcode:"0001",
            name:"li",
            price:3,
            util:"个",
            type:"000"
        },
            {
                barcode:"0002",
                name:"wang",
                price:1,
                util:"个",
                type:"undefined"
            }]
        let allAmount=[{
            barcode:"0001",
            name:"li",
            price:3,
            util:"个",
            amount:2
        },
            {
                barcode:"0002",
                name:"wang",
                price:1,
                util:"个",
                amount:3
            }]
        let result=[{
            barcode:"0001",
            name:"li",
            price:3,
            util:"个",
            type:"000",
            amount:2
        },
            {
                barcode:"0002",
                name:"wang",
                price:1,
                util:"个",
                type:"undefined",
                amount:3
            }]
        let text=getCartItems(allAmount,allTypeItems);
        expect(text).toEqual(result);
    })
});

describe("getPromotionSubtotal",function ( ) {

    it("getPromotionSubtotal",function () {
        let cartItems=[{
            barcode:"0001",
            name:"li",
            price:3,
            util:"个",
            type:"000",
            amount:2
        },
            {
                barcode:"0002",
                name:"wang",
                price:1,
                util:"个",
                type:"undefined",
                amount:3
            }]
        let result=[{
            barcode:"0001",
            name:"li",
            price:3,
            util:"个",
            type:"000",
            amount:2,
            promotionSubtotal:6
        },
            {
                barcode:"0002",
                name:"wang",
                price:1,
                util:"个",
                type:"undefined",
                amount:3,
                promotionSubtotal:2
            }]
        let text=getPromotionSubtotal(cartItems);

        expect(text).toEqual(result);
    })
});

describe("calculateTotal",function ( ) {

    it("calculateTotal",function () {
        let input=[{
            barcode:"0001",
            name:"li",
            price:3,
            util:"个",
            type:"000",
            amount:2,
            promotionSubtotal:6
        },
            {
                barcode:"0002",
                name:"wang",
                price:1,
                util:"个",
                type:"undefined",
                amount:3,
                promotionSubtotal:2
            }]
        let result=8;
        let text=calculateTotal(input);

        expect(result).toEqual(result);
    })
});

describe("getSubtotal",function ( ) {

    it("getSubtotal",function () {
        let input=[{
            barcode:"0001",
            name:"li",
            price:3,
            util:"个",
            type:"000",
            amount:2,
            promotionSubtotal:6,

        },
            {
                barcode:"0002",
                name:"wang",
                price:1,
                util:"个",
                type:"undefined",
                amount:3,
                promotionSubtotal:2,

            }]
        let result=[{
            barcode:"0001",
            name:"li",
            price:3,
            util:"个",
            type:"000",
            amount:2,
            promotionSubtotal:6,
            subtotal:6
        },
            {
                barcode:"0002",
                name:"wang",
                price:1,
                util:"个",
                type:"undefined",
                amount:3,
                promotionSubtotal:2,
                subtotal:3
            }]
        let text=calculateTotal(input);

        expect(result).toEqual(result);
    })
});

describe("calculateSaveMoney",function ( ) {

    it("calculateSaveMoney",function () {
        let input=[{
            barcode:"0001",
            name:"li",
            price:3,
            util:"个",
            type:"000",
            amount:2,
            promotionSubtotal:6,
            subtotal:6
        },
            {
                barcode:"0002",
                name:"wang",
                price:1,
                util:"个",
                type:"undefined",
                amount:3,
                promotionSubtotal:2,
                subtotal:3
            }]
        let result=1;
        let text=calculateSaveMoney(input);

        expect(text).toEqual(result);
    })
});

describe("print", function () {
    it("print", function () {

        let subtotal = [{barcode:'ITEM000001',
            name:'雪碧',
            unit:'瓶',
            price:3,
            amount:1,
            promotionSubtotal:2,
            subtotal:3
        }];
        let total = 3;
        let saveMoney = 1;

        spyOn(console, 'log');

        print(subtotal,total,saveMoney);

        let result = "***没钱赚商店***收据\n" +
            "商品:雪碧,单价:3元,件数:1,小计:2元\n" +
            "************\n" +
            "总计：3元,\n" +
            "节省：1元";

        expect(console.log).toHaveBeenCalledWith(result);
    })
})


