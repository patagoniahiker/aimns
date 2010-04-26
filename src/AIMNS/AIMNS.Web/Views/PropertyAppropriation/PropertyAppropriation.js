/// <reference path="../../vswd-ext_2.2.js" />
Ext.onReady(function(){
    	var store = new Ext.data.Store({
	            proxy: new Ext.data .HttpProxy({
	            url:'/PropertyAppropriation.mvc/GetAllPerPage',	             
			    method : 'POST'}),
				remoteSort : false,
				reader : new Ext.data.JsonReader({
							id : 'ast_main_id',
							root: 'rows',
							totalProperty:'total',
							fields : [{
										name : 'ast_id',
										type : 'string'
									}, {
										name : 'DepartmentName',
										type : 'string'
									}, {
										name : 'ast_from_user',
										type : 'string'
									}, {
										name : 'ast_fit_date',
										type : 'string'
									}, {
										name : 'ast_fit_reason',
										type : 'string'
									}]
						})
			});

	store.setDefaultSort('ast_id', 'ASC');
	
	var nm = new Ext.grid.RowNumberer ();

	var cm = new Ext.grid.ColumnModel([nm, {
		header : "资产ID",
		dataIndex : 'ast_id',
		width : 50
		 
		}, {
		header : "资产原部门",
		dataIndex : 'DepartmentName',
		width : 50
	}, {
		header : "资产原使用人",
		dataIndex : 'ast_from_user',
		width : 50
	}, {
		header : "资产调拨日期",
		dataIndex : 'ast_fit_date',
		width : 50,
//		renderer: function(val) {
//            return new Date(parseInt(val.substring(6, val.length - 2))).format('yyyy/MM/dd')
//        }
	}, {
		header : "资产调拨原因",
		dataIndex : 'ast_fit_reason',
		width : 50
	}]);

	cm.defaultSortable = true;

	var grid = new Ext.grid.GridPanel({
				renderTo : document.body,
				height : 500,
				title : '分页和排序列表',
				store : store,
				cm : cm,
				trackMouseOver : false,
				loadMask : true,
				viewConfig : {
					forceFit : true,
					enableRowBody : true,
					showPreview : true,
					getRowClass : function(record, rowIndex, p, store) {
						return 'x-grid3-row-collapsed';
					}
				},
				tbar: [{
				            text: '查询',
				            tooltip: '检索用户',
				            iconCls: 'search',
				            handler: handleSearch
				        }],
				bbar : new Ext.PagingToolbar({
							pageSize : 25,
							store : store,
							displayInfo : true
						})
			});
	grid.render();
	
	var request = {
		start : 0,
		limit : 25
	};

    store.load({
				params : request
			});
	//获取部门列表
    var deptDs = new Ext.data.Store({
        url:'/Department.mvc/GetAll',
        reader: new Ext.data.JsonReader({
                    id: 'DepartmentID'
                    }, [ 'DepartmentID', 'DepartmentName']
                ),
        remoteSort: false
    });
    
    var combo = new Ext.form.ComboBox({
                    fieldLabel: '资产原部门',
                    name: 'DepartmentName',
                    hiddenName: 'DepartmentID',
                    store: deptDs,
                    valueField: 'DepartmentID',
                    displayField: 'DepartmentName',
                    typeAhead: true,
                    mode: 'remote',
                    triggerAction: 'all',
                    emptyText: '请选择部门',
                    selectOnFocus: true,
                    allowBlank: true 
                });
    var SUserForm = new Ext.FormPanel({
        frame: true,
        labelAlign: 'right',
        labelWidth: 120,
        width: 450,
        height: 250,
        items: new Ext.form.FieldSet({
            title: '资产调度信息',
            autoHeight: true,
            defaults: { width: 200 },
            defaultType: 'textfield',
            items: [{
                fieldLabel: '资产ID',
                name: 'ast_id',
                allowBlank: true 
            }, {
                fieldLabel: '资产原使用人',
                name: 'ast_from_user',
                allowBlank: true
            },
                combo,
            new Ext.form.DateField({
                  fieldLabel: '资产调拨日期',
                  name: 'ast_fit_date',
                  allowBlank:true
            })
                        ]
        })
    });

	var GetUserWin;
	function handleSearch() {
	    GetUserWin = new Ext.Window({
	        title: '检索资产调度信息',
	        layout: 'fit',
	        width: 500,
	        closeAction: 'hide',
	        height: 300,
	        modal: true,
	        autoDestroy: true,
	        plain: true,
	        items: SUserForm,
	        buttons: [{
	            text: '检索',
	            handler: SearchRecord
	        }, {
	            text: '取消',
	            handler: function() {
	                GetUserWin.hide();
	            }
            }]
	        });
	        GetUserWin.show(this);
	    }
	    

	function SearchRecord(btn) {
	    if (SUserForm.form.isValid()) {
	        btn.disabled = true;
	        Ext.MessageBox.show({
	            msg: '正在请求数据, 请稍侯',
	            progressText: '正在请求数据',
	            width: 300,
	            wait: true,
	            waitConfig: {
	                interval: 200
	            }
	        });

	        store.un("beforeload", All);
	        store.un("beforeload", Condition);
	        store.on("beforeload", Condition);

	        store.load({
	        params: request,
	        callback: function(r, options,success) {
	            btn.disabled = false ;
	            if (success) {
	                Ext.MessageBox.hide();
	                if (r.length == 0) {
	                    Ext.MessageBox.alert("消息", "资产调度信息不存在！");
	                } else {
	                    Ext.MessageBox.alert("消息", "检索成功！");
	                }
	               	SUserForm.form.reset();
	                GetUserWin.hide();
	            } else {
	                Ext.MessageBox.hide();
	                Ext.MessageBox.alert("失败，请重试！");
	            }
	        }});
	    }
	}
//	Date.prototype.format = function(format) {
//        var o = {
//        "M+": this.getMonth() + 1, //month
//        "d+": this.getDate(), //day
//        "h+": this.getHours(), //hour
//        "m+": this.getMinutes(), //minute
//        "s+": this.getSeconds(), //second
//        "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
//        "S": this.getMilliseconds() //millisecond
//        }
//        if (/(y+)/.test(format))
//        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
//        for (var k in o)
//        if (new RegExp("(" + k + ")").test(format))
//        format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
//        return format;
//    }

	var All = function(store) {
	    this.proxy.conn.url = '/PropertyAppropriation.mvc/GetAllPerPage';
	}

	var Condition = function(store) {
        this.proxy.conn.url = '/PropertyAppropriation.mvc/GetByConditionPerPage';
        var formvalues = SUserForm.form.getValues();
        this.baseParams["ast_id"] = formvalues["ast_id"];
        this.baseParams["ast_from_user"] = formvalues["ast_from_user"];
        this.baseParams["ast_fit_date"] = formvalues["ast_fit_date"];
        if(combo .getRawValue ()=="")
        {
            this.baseParams["DepartmentID"] = ""; 
        }else{
            this.baseParams["DepartmentID"] = formvalues["DepartmentID"]; 
        }
	}
});