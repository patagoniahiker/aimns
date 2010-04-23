/// <reference path="../../vswd-ext_2.2.js" />
Ext.onReady(function() {
	// create the Data Store
	var store = new Ext.data.Store({
	            proxy: new Ext.data .HttpProxy({
	                url:'/User.mvc/GetAllPerPage',	             
			        method : 'POST'}),
				remoteSort : false,
				reader : new Ext.data.JsonReader({
							id : 'UserID',
							root: 'rows',
							totalProperty:'total',
							fields : [{
										name : 'UserID',
										type : 'string'
									}, {
										name : 'UserName',
										type : 'string'
									}, {
										name : 'DepartmentName',
										type : 'string'
									}, {
										name : 'RoleName',
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
		header : "用户名",
		dataIndex : 'UserName',
		width : 200
	}, {
		header : "角色",
		dataIndex : 'RoleName',
		width : 200
	}, {
		header : "所属部门",
		dataIndex : 'DepartmentName',
		width : 200
	}]);

	// by default columns are sortable
	cm.defaultSortable = true;

    var pageBar = new Ext.PagingToolbar({
							pageSize : 25,
							store : store,
							displayInfo : true
			});
	pageBar.setVisible(false );
						
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
				tbar: [{
				            text: '查询',
				            tooltip: '检索用户',
				            iconCls: 'search',
				            handler: handleSearch
				        }, '-', {
							text : '登录',
							tooltip : '添加用户',
							iconCls : 'add',
							handler : handleAdd
						}, '-', {
							text : '修改',
							tooltip : '修改用户信息',
							iconCls : 'option',
							handler : handleEdit
						}, '-', {
							text : '删除',
							tooltip : '删除用户信息',
							iconCls : 'remove',
							handler : handleDelete
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

// store.load({
//				params : request
//			});
			
	   //获取部门列表
      var deptDs = new Ext.data.Store({
        autoLoad:true,
        url:'/Department.mvc/GetAll',   
        reader: new Ext.data.JsonReader({
                    id: 'DepartmentID'
                    }, [ 'DepartmentID', 'DepartmentName']
                ),
        remoteSort: false
      });

      //获取角色列表
      var rolDs = new Ext.data.Store({
          url: '/Role.mvc/GetAll',
          reader: new Ext.data.JsonReader({
              id: 'RoleId'
          }, ['RoleId', 'RoleName']
                ),
          remoteSort: false
      });



      //用户信息窗口
      var usrIdLbl = new Ext.form.TextField({
          fieldLabel: '用户ID',
          readOnly:true,
          style:'border:0px'
      });

      var usrIdTxt = new Ext.form.TextField({
          fieldLabel: '用户ID',
          name: 'UserID',
          allowBlank: false,
          maxLength:15
      });
      
     var  UserForm = new Ext.FormPanel({
        frame:true,
        labelAlign: 'right',
        labelWidth: 120,
        width: 450,
        height:250,
        items: new Ext.form.FieldSet({
                title: '用户信息',
                autoHeight: true,
                defaults: {width: 200},
                defaultType: 'textfield',
        items: [usrIdLbl,usrIdTxt ,
            {
                fieldLabel: '用户名',
                name: 'UserName',
                allowBlank:false,
                maxLength:10
            }, new Ext.form.ComboBox({
                            id:'roleList',
                            fieldLabel: '角色',
                            name: 'RoleName',
                            hiddenName: 'RoleId',
                            store: rolDs,
                            valueField: 'RoleId',
                            displayField: 'RoleName',
                            typeAhead: true,
                            mode: 'remote',
                            triggerAction: 'all',
                            emptyText: '请选择角色',
                            selectOnFocus: true,
                            allowBlank: false
                        }),
                new Ext.form.ComboBox({
                            id:'deptList',
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
                        })
                        ]
         })
    });

    var roleCombo = new Ext.form.ComboBox({
        fieldLabel: '角色',
        name: 'RoleName',
        hiddenName: 'RoleId',
        store: rolDs,
        valueField: 'RoleId',
        displayField: 'RoleName',
        typeAhead: true,
        mode: 'remote',
        triggerAction: 'all',
        emptyText: '请选择角色',
        selectOnFocus: true,
        allowBlank: true
    });

    var deptCombo = new Ext.form.ComboBox({
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

    var idTxt = new Ext.form.TextField({
        fieldLabel: '用户ID',
        name: 'UserID',
        allowBlank: true
    });

    var nameTxt = new Ext.form.TextField({
        fieldLabel: '用户名',
        name: 'UserName',
        allowBlank: true
    });

    var SUserForm = new Ext.FormPanel({
        frame: true,
        labelAlign: 'right',
        labelWidth: 120,
        width: 450,
        height: 250,
        items: new Ext.form.FieldSet({
            title: '用户信息',
            autoHeight: true,
            defaults: { width: 200 },
            items: [idTxt, nameTxt, roleCombo, deptCombo]
        })
    });
    
    
	function handleDelete() {
		var selectedKeys = grid.selModel.selections.keys; // returns
		// array of
		// selected
		// rows ids
		// only
		if (selectedKeys.length > 0) {
			Ext.MessageBox.confirm('提示', '您确实要删除选定的用户吗？', deleteRecord);
		} else {
			Ext.MessageBox.alert('提示', '请至少选择一个用户！');
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
							store.un("beforeload", All);
							store.un("beforeload", Condition);
							store.on("beforeload", All);
							store.reload();
						}
					})// end Ajax request
		}// end if click 'yes' on button
	} // end deleteRecord

	var AddUserWin;
	function handleAdd() {
		AddUserWin = new Ext.Window({
					title : '登录新用户',
					layout : 'fit',
					width : 500,
				    closeAction: 'hide',
					height : 300,
				    modal : true,
				    autoDestroy : true,
					plain : true,
					items : UserForm,
					buttons : [{
								text : '登录',
								handler : AddRecord
							}, {
								text : '取消',
								handler : function() {
									AddUserWin.hide();
								}
							}]
			});
		AddUserWin.show(this);
		usrIdLbl.setVisible(false);
		usrIdLbl.getEl().up('.x-form-item').setDisplayed(false);
		usrIdTxt.setVisible(true); // for validation
		usrIdTxt.getEl().up('.x-form-item').setDisplayed(true); // hide label
		UserForm.form.reset();
	}

	var GetUserWin;
	function handleSearch() {
	    GetUserWin = new Ext.Window({
	        title: '检索用户',
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
	        idTxt.reset();
	        nameTxt.reset();
	        roleCombo.reset();
	        deptCombo.reset();
	        GetUserWin.show(this);
	    }

	var EditUserWin;  
	function handleEdit() {
		var selectedKeys = grid.selModel.selections.keys; // returns array of
		// selected rows ids
		// only
		if (selectedKeys.length != 1) {
			Ext.MessageBox.alert('提示', '请选择一个用户！');
		} else {
			EditUserWin = new Ext.Window({
						title : '修改用户信息',
						layout : 'fit',
						width : 500,
						height : 300,
					    closeAction: 'hide',
						plain : true,
					    autoDestroy : true,
						items : UserForm,
						buttons : [{
									text : '修改',
									handler : UpdateRecord
								}, {
									text : '取消',
									handler : function() {
										EditUserWin.hide();
									}
								}]
					});
			EditUserWin.show(this);
			usrIdLbl.setVisible(true);
			usrIdLbl.getEl().up('.x-form-item').setDisplayed(true);
			usrIdTxt.setVisible(false); // for validation
			usrIdTxt.getEl().up('.x-form-item').setDisplayed(false); // hide label
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
						usrIdLbl.getEl().dom.value = usrIdTxt.getValue();
						Ext.get("roleList").dom.value = formvalue["RoleName"];
						Ext.get("deptList").dom.value = formvalue["DepartmentName"];
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
						callback: function(options, success, response) {
						    btn.disabled = true;
							if (success) { 
								Ext.MessageBox.hide();
								var result = Ext.util.JSON.decode(response.responseText)
								Ext.MessageBox.alert("消息", result.Message);
								EditUserWin.hide();
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
						callback: function(options, success, response) {
						    btn.disabled = true;
							if (success) {
								Ext.MessageBox.hide();
								var result = Ext.util.JSON.decode(response.responseText)
								Ext.MessageBox.alert("消息", result.Message);
								AddUserWin.hide();
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
							store.un("beforeload", All);
							store.un("beforeload", Condition);
							store.on("beforeload", Condition);
						    store.baseParams["RoleId"] = "";
						    store.baseParams["DepartmentID"] = "";
						    store.baseParams["UserID"] = formvalue["UserID"];
						    store.baseParams["UserName"] = "";
						    pageBar.setVisible(true);
						    store.load({
						        params: request
						    });
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

	        var formvalues = SUserForm.form.getValues();
	        if (roleCombo.getRawValue() == "") {
	            store.baseParams["RoleId"] = "";
	        } else {
	            store.baseParams["RoleId"] = formvalues["RoleId"];
	        }
	        if (deptCombo.getRawValue() == "") {
	            store.baseParams["DepartmentID"] = "";
	        } else {
	            store.baseParams["DepartmentID"] = formvalues["DepartmentID"];
	        }
	        store.baseParams["UserID"] = formvalues["UserID"];
	        store.baseParams["UserName"] = formvalues["UserName"];
	        pageBar.setVisible(true);
	        store.load({
	        params: request,
	        callback: function(r, options,success) {
	            btn.disabled = false ;
	            if (success) {
	                Ext.MessageBox.hide();
	                if (r.length == 0) {
	                    Ext.MessageBox.alert("消息", "用户不存在！");
	                } else {
	                    Ext.MessageBox.alert("消息", "检索成功！");
	                }
	                GetUserWin.hide();
	            } else {
	                Ext.MessageBox.hide();
	                Ext.MessageBox.alert("失败，请重试！");
	            }
	        }});
	    }
	}

	var All = function(store) {
	    this.proxy.conn.url = '/User.mvc/GetAllPerPage';
	}

	var Condition = function(store) {
        this.proxy.conn.url = '/User.mvc/GetByConditionPerPage';   
	}

});