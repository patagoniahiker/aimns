/// <reference path="../../vswd-ext_2.2.js" />
Ext.onReady(function() {

	var store = new Ext.data.Store({
	            proxy: new Ext.data .HttpProxy({
	            url:'/AssetAccept.mvc/GetAll',	             
			    method : 'POST'}),
				remoteSort : false,
				reader : new Ext.data.JsonReader({
							id : 'AplNo',
							//root: 'rows',
							//totalProperty:'total',
							fields : [{
										name : 'AplNo',
										type : 'int'
									}, {
										name : 'AplTypeName',
										type : 'string'
									}, {
										name : 'AplStatus',
										type : 'string'
									}, {
										name : 'AplDeptName',
										type : 'string'
									}, {
										name : 'AssetID',
										type : 'string'
									}, {
										name : 'AssetName',
										type : 'string'
									}, {
										name : 'AssetModel',
										type : 'string'
									}, {
										name : 'AssetSpec',
										type : 'string'
									}, {
										name : 'AplAmount',
										type : 'string'
									}, {
										name : 'AplReason',
										type : 'string'
									}]
						})
			});

	store.setDefaultSort('AplNo', 'DESC');
	
	var nm = new Ext.grid.RowNumberer ();
	var sm = new Ext.grid.CheckboxSelectionModel(); // add checkbox

	var cm = new Ext.grid.ColumnModel([nm, sm, {
		header : "#",
		dataIndex : 'AplNo',
		width : 10 
	}, {
		header : "申请类型",
		dataIndex : 'AplTypeName',
		width : 200
	}, {
		header : "状态",
		dataIndex : 'AplStatus',
		width : 200
	}, {
		header : "申请部门",
		dataIndex : 'AplDeptName',
		width : 200
	}, {
		header : "资产ID",
		dataIndex : 'AssetID',
		width : 250
	}, {
		header : "资产名称",
		dataIndex : 'AssetName',
		width : 300
	}, {
		header : "型号",
		dataIndex : 'AssetModel',
		width : 200
	}, {
		header : "规格",
		dataIndex : 'AssetSpec',
		width : 200
	}, {
		header : "申请数量",
		dataIndex : 'AplAmount',
		width : 200
	}, {
		header : "申请原因",
		dataIndex : 'AplReason',
		width : 500
	}]);

	// by default columns are sortable
	cm.defaultSortable = true;

    var pageBar = new Ext.PagingToolbar({
							pageSize : 25,
							store : store,
							displayInfo : true
			});
	pageBar.setVisible(true);
						
	var grid = new Ext.grid.GridPanel({
				// el:'topic-grid',
				renderTo : document.body,
				height : 500,
				title : '申请一览',
				store : store,
				cm : cm,
				trackMouseOver : false,
				sm : sm,
				loadMask : true,
				viewConfig : {
					forceFit : true,
					enableRowBody : true,
					showPreview : true,
					getRowClass : function(record, rowIndex, p, store) {
						return 'x-grid3-row-collapsed';
					}
				},
				// inline toolbars
				tbar: [{
				            text: '受理',
				            tooltip: '受理',
				            iconCls: 'search',
				            handler: showHandleWin
				        }],
				bbar : pageBar
			});

	// render it
	grid.render();

// trigger the data store load
	var request = {
		start : 0,
		limit : 25
	};

 store.load({
				params : request
			});

/* --------Form元素定义区-----------*/
//获取受理状态列表
    var statDs = new Ext.data.Store({
          url: '/AssetAccept.mvc/GetAplStatusDs',
          reader: new Ext.data.JsonReader({
              id: 'SubinfoCode'
          }, ['SubinfoCode', 'SubinfoName']
                ),
          remoteSort: false
      });
      
var  AplForm = new Ext.FormPanel({
        frame:true,
        labelAlign: 'right',
        labelWidth: 100,
        width: 400,
        height:400,
        items: new Ext.form.FieldSet({
                title: '申请信息',
                autoHeight: true,
                defaults: {width: 200},
                defaultType: 'textfield',
        items: [{
                id: 'apl_no',
                fieldLabel: '申请No.',
                name: 'AplNo',
                allowBlank:false,
                style:'color:gray;background:aliceblue;',
                readOnly:true
            }, {
                id: 'ast_id',
                fieldLabel: '资产ID',
                name: 'AssetID',
                allowBlank:true,
                style:'color:gray;background:aliceblue;',
                readOnly:true
            }, {
                id: 'ast_name',
                fieldLabel: '资产名称',
                name: 'AssetName',
                allowBlank:false,
                style:'color:gray;background:aliceblue;',
                readOnly:true
            }, {
                id: 'apl_status',
                fieldLabel: '申请状态',
                name: 'AplStatus',
                allowBlank:false,
                style:'color:gray;background:aliceblue;',
                readOnly:true
            }, new Ext.form.ComboBox({
                            id:'statList',
                            fieldLabel: '申请状态',
                            name: 'status',
                            hiddenName: 'statusCode',
                            store: statDs,
                            valueField: 'SubinfoCode',
                            displayField: 'SubinfoName',
                            typeAhead: true,
                            mode: 'remote',
                            triggerAction: 'all',
                            emptyText: '请选择状态',
                            selectOnFocus: true,
                            allowBlank: false
            }), {
                id: 'apl_reason',
                fieldLabel: '申请原因',
                name: 'AplReason',
                allowBlank:false,
                style:'color:gray;background:aliceblue;',
                readOnly:true
            }]
         })
    });

var AplFormWin = new Ext.Window({
    title: '申请受理',
	        layout: 'fit',
	        width: 420,
	        closeAction: 'hide',
	        height: 300,
	        modal: true,
	        autoDestroy: true,
	        plain: true,
	        items: AplForm,
	        buttons: [{
	            text: '确认',
	            handler: showHandleWin
	        }, {
	            text: '打印',
	            handler: showHandleWin
	        }, {
	            text: '取消',
	            handler: function() {
	                AplFormWin.hide();
	            }
            }]
});

/* --------函数定义区---------- */
//显示受理画面
function showHandleWin()
{
    var selectedKeys = grid.selModel.selections.keys;
    var selectedRow = grid.selModel.selections.items[0];
    
    if(selectedKeys.length < 1)
    {
        Ext.MessageBox.alert('提示', '请选择一条记录进行操作！');
    } else {
        AplFormWin.show(this);
        
        Ext.MessageBox.show({
						msg : '正在请求数据, 请稍侯',
						progressText : '正在请求数据',
						width : 300,
						wait : true,
						waitConfig : {
							interval : 200
						}
					});
			Ext.Ajax.request({
				url : '/AssetAccept.mvc/GetAssetApply',
				method : 'POST',
				params : {aplNo : selectedKeys[0]},
				callback : function(options, success, response) {
					if (success) {  
						Ext.MessageBox.hide();
						var formvalue = Ext.decode(response.responseText).Data;
						AplForm.form.setValues(formvalue);
						Ext.get("statList").dom.value = formvalue["AplStatus"];
					} else {
						Ext.MessageBox.hide();
						Ext.MessageBox.alert("失败，请重试", response.responseText);
					}
				},
				failure : function(response, options) {
					Ext.MessageBox.hide();
					ReturnValue = Ext.MessageBox.alert("警告", "出现异常错误！请联系管理员！");
				},
				success : function(response, options) {
					Ext.MessageBox.hide();
				}
			})// end Ajax request
    }// end if
}// end function

});