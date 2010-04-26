/// <reference path="../../vswd-ext_2.2.js" />
Ext.onReady(function() {
	// create the Data Store
	var store = new Ext.data.Store({
	            proxy: new Ext.data.HttpProxy({
	                url:'/Property.mvc/GetAllPerPage',	             
			        method : 'POST'}),
				remoteSort : false,
				reader : new Ext.data.JsonReader({
							id : 'ast_id',
							root: 'rows',
							totalProperty:'total',
							fields : [{
										name : 'ast_id',
										type : 'string'
									}, {
										name : 'ast_name',
										type : 'string'
									}, {
										name : 'ast_model',
										type : 'string'
									}, {
										name : 'ast_std',
										type : 'string'
									},{
										name : 'DepartmentName',
										type : 'string'
									},{
										name : 'ast_user',
										type : 'string'
									}]
						})
			});

	store.setDefaultSort('ast_id', 'ASC');

	
	var nm = new Ext.grid.RowNumberer ();
	var sm = new Ext.grid.CheckboxSelectionModel(); // add checkbox
	

	var cm = new Ext.grid.ColumnModel([nm, sm, {
		header : "资产ID",
		dataIndex : 'ast_id',
		width : 100
		 
		}, {
		header : "资产名称",
		dataIndex : 'ast_name',
		width : 100
	}, {
		header : "资产型号",
		dataIndex : 'ast_model',
		width : 100
	}, {
		header : "资产规格",
		dataIndex : 'ast_std',
		width : 100
	}, {
		header : "所属部门",
		dataIndex : 'DepartmentName',
		width : 100
	},{
		header : "使用人",
		dataIndex : 'ast_user',
		width : 100
	}]);

	// by default columns are sortable
	cm.defaultSortable = true;

	var grid = new Ext.grid.GridPanel({
				// el:'topic-grid',
				renderTo : document.body,
				height : 500,
				title : '资产调拨信息表',
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
				            text: '查询',
				            tooltip: '资产检索',
				            iconCls: 'btnsearch',
				            handler: handleSearch
				        }, '-', {
							text : '调拨',
							tooltip : '资产调拨',
							iconCls : 'winconfig',
							handler : handleEdit
						}, '-', {
			                text: '导出',
			                tooltip: 'Excel出力',
			                iconCls: 'btnright',
			                handler: handleExport
			            }],
				bbar : new Ext.PagingToolbar({
							pageSize : 25,
							store : store,
							displayInfo : true
						})
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
			
	   //获取部门列表
      var deptDs = new Ext.data.Store({
        url:'/Department.mvc/GetAll',
        reader: new Ext.data.JsonReader({
                    id: 'DepartmentID'
                    }, [ 'DepartmentID', 'DepartmentName']
                ),
        remoteSort: false
      });   
      
 //用户信息窗口
     var  UserForm = new Ext.FormPanel({
        frame:true,
        labelAlign: 'right',
        labelWidth: 120,
        width: 450,
        height:250,
        items: new Ext.form.FieldSet({
                title: '资产调度信息',
                autoHeight: true,
                defaults: {width: 200},
                defaultType: 'textfield',
        items: [{
                fieldLabel: '资产ID',
                name: 'ast_id',
                style:'color:gray;background:aliceblue;', 
                allowBlank:false,
                readOnly:true
            },{
                fieldLabel: '资产名称',
                name: 'ast_name',
                style:'color:gray;background:aliceblue;', 
                allowBlank:false,
                readOnly:true
            },{
                fieldLabel: '资产型号',
                name: 'ast_model',
                style:'color:gray;background:aliceblue;', 
                allowBlank:false,
                readOnly:true
            },{
                fieldLabel: '资产规格',
                name: 'ast_std',
                style:'color:gray;background:aliceblue;', 
                allowBlank:false,
                readOnly:true
            }, new Ext.form.ComboBox({
                            id:'departID',
                            fieldLabel: '调拨所属部门',
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
                            allowBlank: false
                        }),
             {
                fieldLabel: '调拨使用人',
                name:'ast_user',
                allowBlank:false
            },{
                fieldLabel: '资产调拨原因',
                name: 'ast_fit_reason',
                allowBlank:false
            }]
         })
    });

    var combo = new Ext.form.ComboBox({
                            fieldLabel: '所属部门',
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
                title: '资产查询信息',
                autoHeight: true,
                defaults: {width: 200},
                defaultType: 'textfield',
        items: [{
                fieldLabel: '资产ID',
                name: 'ast_id',
                allowBlank:true 
            },{
                fieldLabel: '资产名称',
                name: 'ast_name',
                allowBlank:true
            },{
                fieldLabel: '资产型号',
                name: 'ast_model',
                allowBlank:true
            },{
                fieldLabel: '资产规格',
                name: 'ast_std',
                allowBlank:true
            }, combo,
             {
                fieldLabel:'使用人',
                name:'ast_user',
                allowBlank:true
            }]
         })
    });
    deptDs.load();

	var GetUserWin;
	function handleSearch() {
	    GetUserWin = new Ext.Window({
	        title: '资产检索',
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
	var EditUserWin;   
	function handleEdit() {
		var selectedKeys = grid.selModel.selections.keys; // returns array of
		// selected rows ids
		// only
		if (selectedKeys.length != 1) {
			Ext.MessageBox.alert('提示', '请选择一个要调度的资产！');
		} else {
			EditUserWin = new Ext.Window({
						title : '资产调度信息',
						layout : 'fit',
						width : 500,
						height : 300,
					    closeAction: 'hide',
						plain : true,
					    autoDestroy : true,
						items : UserForm,
						buttons : [{
									text : '调度',
									handler : UpdateRecord
								}, {
									text : '取消',
									handler : function() {
										EditUserWin.hide();
									}
								}]
					});
			EditUserWin.show(this);
			deptDs.load(); 
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
				url : '/Property.mvc/GetProperty', // url to server
				// side script
				method : 'POST',
				params : {propertyId : selectedKeys[0]},// the unique id(s)
				callback : function(options, success, response) {
					if (success) {  
						Ext.MessageBox.hide();
						var formvalue = Ext.decode(response.responseText).Data;
						UserForm.form.setValues(formvalue);
						Ext.get('departID').dom.value = formvalue["DepartmentName"];
					} else {
						Ext.MessageBox.hide();
						Ext.MessageBox.alert("失败，请重试", response.responseText);
					}
				},
				// the function to be called upon failure of the request (server
				// script, 404, or 403 errors)
				failure : function(response, options) {
					Ext.MessageBox.hide();
					ReturnValue = Ext.MessageBox.alert("警告", "出现异常错误！请联系管理员！");
				},
				success : function(response, options) {
					Ext.MessageBox.hide();
				}
			})// end Ajax request
		}
	}
	
	function UpdateRecord(btn) {
		if (UserForm.form.isValid()) {
			btn.disabled = true;
			Ext.MessageBox.show({
						msg : '正在请求数据, 请稍侯',
						progressText : '正在请求数据',
						width : 300,
						wait : true,
						waitConfig : {
							interval : 200
						}
					});
			var formvalues = UserForm.form.getValues();
			var paramsStr = {
			    ast_id:formvalues["ast_id"],
			    DepartmentID:formvalues["DepartmentID"],
			    ast_user:formvalues["ast_user"],
			    ast_fit_reason:formvalues["ast_fit_reason"]
			};
			Ext.Ajax.request({
						url : '/Property.mvc/UpdateProperty',
						method : 'POST',
						params : paramsStr ,// the unique
						// id(s)
						callback : function(options, success, response) {
							if (success) { 
								Ext.MessageBox.hide();
								var result = Ext.util.JSON.decode(response.responseText)
								Ext.MessageBox.alert("消息",result.Message);
							} else {
								Ext.MessageBox.hide();
								Ext.MessageBox.alert("失败，请重试",
										response.responseText);
							}
						},
						failure : function(response, options) {
							Ext.MessageBox.hide();
							ReturnValue = Ext.MessageBox.alert("警告",
									"出现异常错误！请联系管理员！");
						},
						success : function(response, options) {
							Ext.MessageBox.hide();
							UserForm.form.reset();
							EditUserWin.hide();
							sm.clearSelections ();
							store.reload();
						}
					})// end Ajax request
		}
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
	                    Ext.MessageBox.alert("消息", "资产不存在！");
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

	var All = function(store) {
	    this.proxy.conn.url = '/Property.mvc/GetAllPerPage';
	}

	var Condition = function(store) {
        this.proxy.conn.url = '/Property.mvc/GetByConditionPerPage';
        var formvalues = SUserForm.form.getValues();
        this.baseParams["ast_id"] = formvalues["ast_id"];
        this.baseParams["ast_name"] = formvalues["ast_name"];
        this.baseParams["ast_model"] = formvalues["ast_model"];
        this.baseParams["ast_std"] = formvalues["ast_std"];
        if(combo.getRawValue ()=="")
        {
            this.baseParams["DepartmentID"] = ""; 
        }else{
            this.baseParams["DepartmentID"] = formvalues["DepartmentID"]; 
        }
        this.baseParams["ast_user"] = formvalues["ast_user"];
	}
	
	function handleExport() {
	    if (grid.getStore().getTotalCount() == 0) {
	        Ext.MessageBox.alert('提示', '请先检索用户记录！');
	        return;
	    }
	    var config={
             store: null,//因为后续可能需要处理分页，因此此处一般不直接传递GridPanel的数据源
             title: ''//需要显示标题
           }; 
        ExportExcel(grid,config);
	}

});