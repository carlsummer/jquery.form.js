$(function(){
	var html = '';
    var recordLists = '';
    var recordLength = 0;
    $.ajax({
        type: "get",
        url: 'json/getOrderList.json',
        async: false,
        data: {
            page: '1',
            limit: '50'
        },
        success:function(json) {
        	record = json;
            if(record.code == 0) {
                recordLength = record.data.length;
                recordLists = record.data;
            }
        }
    })

    for(var i = 0; i < recordLength; i++) {
        var form_to = recordLists[i].from_address + '-' + recordLists[i].to_address;
        // console.log(form_to.length);
        if(form_to.length > 17){
            form_to = form_to.slice(0,17) + '...';
        }
        var goods_desc = recordLists[i].goods_desc;
        if(goods_desc.length > 17) {
            goods_desc = goods_desc.slice(0,17) + '...';
        }
        var send_type_name = recordLists[i].send_type_name;
        var express_amount_desc = recordLists[i].express_amount_desc;
        var date_add_desc = recordLists[i].date_add_desc;
        html += '<div class="record-list">' + 
                        '<span class="record-td1">' + form_to + '<br/>' + goods_desc + '</span>' +
                        '<span class="record-td2">' + express_amount_desc + '</span>' +
                        '<span class="record-td3">' + date_add_desc + '</span>' +
                    '</div>';
    }
    $("#recordTable").append(html);  

    /*$(".record-con").slide({
        mainCell: ".record-table",
        autoPlay: true,
        effect: "topMarquee",
        vis: 8,
        interTime: 50
    }); */
    
    $("#submitForm").click(function(event) {
    	zengForm.submitFormToAction({
    		"province":{
        		"selector": "#sex",
        		"dataOption":"required",
        		"tipMsg":"发货省" 
        	},
    		"city":{
        		"selector": "#age",
        		"dataOption":"required",
        		"tipMsg":"发货城市" 
        	},
            "sex":{
        		"selector": "#province",
        		"dataOption":"required",
        		"tipMsg":"发货区" 
        	},
            "memo":{
        		"selector": "#city",
        		"dataOption":"required",
        		"tipMsg":"收货省" 
        	},
        	"memo2":{
        		"selector": "#memo",
        		"dataOption":"required",
        		"tipMsg":"收货城市" 
        	},
            "memo3":{
        		"selector": "#memo2",
        		"dataOption":"required",
        		"tipMsg":"收货区" 
        	},
        	"name": {
        		"selector": "#name",
        		"dataOption":"required",
        		"tipMsg":"货物重量体积" 
        	},
        	"phone":{
        		"selector": "#phone",
        		"dataOption":"phone,required",
        		"tipMsg":"手机号" 
        	},
        	"smscode":{
        		"selector": "#smscode",
        		"dataOption":"required",
        		"tipMsg":"验证码" 
        	},
            "needSmscode":true,  //需不需要发送手机验证
            //'convert_id':'83026373131',		//头条监控id
            //"callback":"monitor", //表单提交成功时回调的方法
            "formId":"fbb87873643238b20164640a401d280d",  //表单id
            "renderUrl":"ok01.html" //提交成功调整的url
        });
    });
});