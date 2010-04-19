/// <reference path="../../vswd-ext_2.2.js" />
Ext.onReady(function() {
	// create the Data Store
	var store = new Ext.data.Store({
	            url: '/User.mvc/GetAll',
			    method : 'POST',
				remoteSort : false,
				reader : new Ext.data.JsonReader({
							id : 'UserID',
							fields : [{
										name : 'UserID',
										type : 'string'
									}, {
										name : 'UserName',
										type : 'string'
									}, {
										name : 'ManagerName',
										type : 'string'
									}, {
										name : 'DepartmentName',
										type : 'string'
									}, {
										name : 'CompanyName',
										type : 'string'
									}, {
										name : 'ValidFrom',
										type : 'string'
									}, {
										name : 'ValidTo',
										type : 'string'
									}, {
										name : 'Telephone',
										type : 'string'
									}, {
										name : 'Mobile',
										type : 'string'
									}, {
										name : 'Email',
										type : 'string'
									}]
						})
			});

	store.setDefaultSort('UserID', 'ASC');

	
	var nm = new Ext.grid.RowNumberer ();
	var sm = new Ext.grid.CheckboxSelectionModel(); // add checkbox
	

	var cm = new Ext.grid.ColumnModel([nm, sm, {
		header : "用户ID",
		dataIndex : 'UserID',
		width : 100
		 
		}, {
		header : "姓名",
		dataIndex : 'UserName',
		width : 200
	}, {
		header : "公司名称",
		dataIndex : 'CompanyName',
		width : 200
	}, {
		header : "部门名称",
		dataIndex : 'DepartmentName',
		width : 200
	}, {
		header : "电话",
		dataIndex : 'Telephone',
		width : 200
	}, {
		header : "手机",
		dataIndex : 'Mobile',
		width : 200
	}, {
		header : "Email",
		dataIndex : 'Email',
		width : 200
	}]);

	// by default columns are sortable
	cm.defaultSortable = true;

	var grid = new Ext.grid.GridPanel({
				// el:'topic-grid',
				renderTo : document.body,
				height : 500,
				title : '分页和排序列表',
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
				tbar : [{
							text : '添加',
							tooltip : '添加一条记录',
							iconCls : 'add',
							handler : handleAdd
						}, '-', {
							text : '修改',
							tooltip : '修改',
							iconCls : 'option',
							handler : handleEdit
						}, '-', {
							text : '删除',
							tooltip : '删除记录',
							iconCls : 'remove',
							handler : handleDelete
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
                title: '用户资料',
                autoHeight: true,
                defaults: {width: 200},
                defaultType: 'textfield',
        items: [{
                fieldLabel: '帐号',
                name: 'UserID',
                allowBlank:false
            },{
                fieldLabel: '姓名',
                name: 'UserName',
                allowBlank:false
            }, new Ext.form.ComboBox({
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
                            allowBlank: false
                        }),{
                fieldLabel: 'Email',
                name: 'Email',
                vtype:'email',
                allowBlank:false
            },{
                fieldLabel: '联系电话',
                name: 'Telephone',
                allowBlank:false
            },{
                fieldLabel: '手机',
                name: 'Mobile',
                allowBlank:false
            }
            ]
         })
    });
   

    
    
	function handleDelete() {
		var selectedKeys = grid.selModel.selections.keys; // returns
		// array of
		// selected
		// rows ids
		// only
		if (selectedKeys.length > 0) {
			Ext.MessageBox.confirm('提示', '您确实要删除选定的记录吗？', deleteRecord);
		} else {
			Ext.MessageBox.alert('提示', '请至少选择一条记录！');
		}// end
	}

	function deleteRecord(btn) {
		if (btn == 'yes') {
			var selectedRows = grid.selModel.selections.items;
			var selectedKeys = grid.selModel.selections.keys;
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
						url : '/User.mvc/DeleteUser', 
						method : 'POST',
						params : {
							"userid" : selectedKeys
						},// the unique id(s)
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
						// the function to be called upon failure of the request
						// (server script, 404, or 403 errors)
						failure : function(response, options) {
							Ext.MessageBox.hide();
							ReturnValue = Ext.MessageBox.alert("警告",
									"出现异常错误！请联系管理员！");
						},
						success : function(response, options) {
							Ext.MessageBox.hide();
							store.reload();
						}
					})// end Ajax request
		}// end if click 'yes' on button
	} // end deleteRecord

	function handleAdd() {
		var AddUserWin = new Ext.Window({
					title : '增加新用户',
					layout : 'fit',
					width : 500,
				    closeAction: 'hide',
					height : 300,
				    modal : true,
				    autoDestroy : true,
					plain : true,
					items : UserForm,
					buttons : [{
								text : '保存',
								handler : AddRecord
							}, {
								text : '取消',
								handler : function() {
									AddUserWin.hide();
								}
							}]
				});
		AddUserWin.show(this);
	}
	
	
	function handleEdit() {
		var selectedKeys = grid.selModel.selections.keys; // returns array of
		// selected rows ids
		// only
		if (selectedKeys.length != 1) {
			Ext.MessageBox.alert('提示', '请选择一条记录！');
		} else {
			var EditUserWin = new Ext.Window({
						title : '修改员工资料',
						layout : 'fit',
						width : 500,
						height : 300,
					    closeAction: 'hide',
						plain : true,
					    autoDestroy : true,
						items : UserForm,
						buttons : [{
									text : '保存',
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
				url : '/User.mvc/GetUser', // url to server
				// side script
				method : 'POST',
				params : {UserID : selectedKeys[0]},// the unique id(s)
				callback : function(options, success, response) {
					if (success) {  
						Ext.MessageBox.hide();
						var formvalue = Ext.decode(response.responseText).Data;
						UserForm.form.setValues(formvalue);
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
			var formvalue = Ext.util.JSON.encode(UserForm.form.getValues());
		 
			Ext.Ajax.request({
						url : '/User.mvc/UpdateUser',
						method : 'POST',
						params : formvalue,// the unique
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
							store.reload();
						}
					})// end Ajax request
		}
	}

	function AddRecord(btn) {
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
			var formvalue = UserForm.form.getValues();
			Ext.Ajax.request({
						url : '/User.mvc/AddUser', 
						method : 'POST',
						params : Ext.util.JSON.encode(formvalue),
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
						// the function to be called upon failure of the request
						// (server script, 404, or 403 errors)
						failure : function(response, options) {
							Ext.MessageBox.hide();
							ReturnValue = Ext.MessageBox.alert("警告",
									"出现异常错误！请联系管理员！");
						},
						success : function(response, options) {
							Ext.MessageBox.hide();
							store.reload();
						}
					})// end Ajax request

		}
	}

});