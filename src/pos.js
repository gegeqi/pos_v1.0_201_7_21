'use strict';

let tags = [
    'ITEM000000-2',
    'ITEM000002',
    'ITEM000005'
]
function loadAllItems() {
    return [
        {
            barcode: 'ITEM000000',
            name: '可口可乐',
            unit: '瓶',
            price: 3.00
        },
        {
            barcode: 'ITEM000001',
            name: '雪碧',
            unit: '瓶',
            price: 3.00
        },
        {
            barcode: 'ITEM000002',
            name: '苹果',
            unit: '斤',
            price: 5.50
        },
        {
            barcode: 'ITEM000003',
            name: '荔枝',
            unit: '斤',
            price: 15.00
        },
        {
            barcode: 'ITEM000004',
            name: '电池',
            unit: '个',
            price: 2.00
        },
        {
            barcode: 'ITEM000005',
            name: '方便面',
            unit: '袋',
            price: 4.50
        }
    ];
}
function loadPromotions() {

    return   [
        {
            type: 'BUY_TWO_GET_ONE_FREE',
            barcodes: [
                'ITEM000000',
                'ITEM000001',
                'ITEM000005'
            ]
        }
    ];
}
function formatTags(tags){
    return tags.map(function (items){
        let info=items.split("-");
        return {
            barcode:info[0],
            amount:parseFloat(info[1]) || 1
        }
    });
}


function mergeBarcodes(barcodes){
    let allAmount=[];
    for(let info of barcodes){
        let exist=allAmount.find(function (items) {
    return items.barcode===info.barcode;

        })
        if(exist){
            exist.amount+=info.amount;
        }else{
            allAmount.push(Object.assign({},info,{amount:info.amount}));
        }
        }
    return allAmount;
}

function changeType(allPromotions){
    let withType=[];
     for(let info of allPromotions){
         for(let i=0;i<info.barcodes.length;i++){
             if(info.type!=="null"){
                 withType.push(Object.assign({},{type:info.type},{barcode:info.barcodes[i]}));
             }else{
                 info.type="null";
             }
         }
         return withType;
    }

    function addType(withType,allItems){
        let allTypeItems=[];
        for(let info of withType){
            for(let sofo of allItems){
                if(info.barcode===sofo.barcode){
                    allTypeItems.push(Object.assign({},sofo,{type:info.type}))
                }else{
                    info.type="null";
                }
            }
        }
    }

    function getCartItems(allAmount,allTypeItems) {
        let cartItems = [];
        for (let i = 0; i < allAmount.length; i++) {
            for (let items of allTypeItems) {
                if (allAmount[i].barcode === items.barcode) {
                    cartItems.push(Object.assign({}, items.barcode, {amount: allAmount[i].amount}))
                }
            }
        }
        return cartItems;
    }}

function addType(withType,allItems){
    let allTypeItems=[];
    for(let info of withType){
        for(let sofo of allItems){
            if(info.barcode===sofo.barcode){
                allTypeItems.push(Object.assign({},sofo,{type:info.type}));
            }else{
                info.type="null";
            }
        }
    }
    return allTypeItems;
}

function getCartItems(allAmount,allTypeItems) {
    let cartItems=[];
    for (let info of allAmount){
        for(let sofo of allTypeItems){
            if(info.barcode===sofo.barcode){
                cartItems.push(Object.assign({},sofo,{amount:info.amount}));
            }
        }
    }
    return cartItems;
}

function getPromotionSubtotal(cartItems){
    let promotionSubtotal=[];
    for(let info of cartItems){
        if(info.type !== "null"){
            let result= info.price * (info.amount-(parseInt(info.amount / 3)));
            promotionSubtotal.push(Object.assign({},info,{promotionSubtotal:result}))
        }
    }
    return promotionSubtotal;

}

function calculateTotal(promotionSubtotal) {
    let total=0;
    for(let info of promotionSubtotal){
        total += info.promotionSubtotal;
    }
    return total;
}

function getSubtotal(promotionSubtotal){
    let subtotal=[];
    for(let info of promotionSubtotal){
        let result=0;
        result=info.price * info.amount;
        subtotal.push(Object.assign({},info,{subtotal:result}))
    }
    return subtotal;
}

function calculateSaveMoney(subtotal) {
    let saveMoney=0;
    for(let info of subtotal){
        saveMoney += (info.subtotal-info.promotionSubtotal);
    }
    return saveMoney;
}

function print( subtotal,total,saveMoney) {{
    let receipt = "***没钱赚商店***收据" + "\n";
    for (let i = 0; i < subtotal.length; i++) {
        receipt += "商品:" + subtotal[i].name +",单价:"+subtotal[i].price+
            "元"+",件数:"+subtotal[i].amount+",小计:"+subtotal[i].promotionSubtotal+"元"+"\n";
    }
    receipt+="************\n"+"总计："+total + "元,"+"\n"+"节省："+saveMoney + "元";
    console.log(receipt);
    return receipt;
}}

function printReceipt(tags) {
    let allItems=loadAllItems();
    let allPromotions=loadPromotions();
    let barcodes=formatTags(tags);
    let allAmount=mergeBarcodes(barcodes);
    let withType=changeType(allPromotions);
    let allTypeItems=addType(withType,allItems);
    let cartItems=getCartItems(allAmount,allTypeItems);
    let promotionSubtotal=getPromotionSubtotal(cartItems);
    let total=calculateTotal(promotionSubtotal);
    let subtotal=getSubtotal(promotionSubtotal);
    let saveMoney=calculateSaveMoney(subtotal);
    print(subtotal,total,saveMoney);
}
printReceipt(tags);


