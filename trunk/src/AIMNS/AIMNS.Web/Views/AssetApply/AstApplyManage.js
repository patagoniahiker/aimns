/// <reference path="../../vswd-ext_2.2.js" />
Ext.onReady(function() {
	//----Global variables------
	var handleType;
	
	//-------------本部的所有申请(已关闭的除外)-------------------
	var myAllAplDs = new Ext.data.Store({
	            url: '/AssetApply.mvc/GetMyAll',
			    method : 'POST',
				remoteSort : false,
				reader : new Ext.data.JsonReader({
							id : 'AplNo',
							fields : [{
										name : 'AplTypeName',
										type : 'string'
									}, {
										name : 'AplStatus',
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
										name : 'AplNo',
										type : 'string'
									}]
						})
			});

	myAllAplDs.setDefaultSort('AplTypeName', 'ASC');
	
	var nm = new Ext.grid.RowNumberer ();
	var sm = new Ext.grid.CheckboxSelectionModel(); // 追加 checkbox
	var cm = new Ext.grid.ColumnModel([nm, sm, {
		header : "申请类别",
		dataIndex : 'AplTypeName',
		width : 200
		 
		}, {
		header : "申请状态",
		dataIndex : 'AplStatus',
		width : 200
	}, {
		header : "申请资产ID",
		dataIndex : 'AssetID',
		width : 300
	}, {
		header : "申请资产名称",
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
		header : "#",
		dataIndex : 'AplNo',
		width : 0
	}]);

	// by default columns are sortable
	cm.defaultSortable = true;

	var grid = new Ext.grid.GridPanel({
				// el:'topic-grid',
				renderTo : document.body,
				height : 500,
				title : '部门申请一览',
				store : myAllAplDs,
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
							text : '资产新增',
							tooltip : '为部门申请一个新的资产项目',
							iconCls : 'option',
							handler : showFreeAst
						}, '-', {
							text : '报修|退还|报废',
							tooltip : '报修|退还|报废',
							iconCls : 'option',
							handler : showDeptAst
						}],
				bbar : new Ext.PagingToolbar({
							pageSize : 25,
							store : myAllAplDs,
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

 myAllAplDs.load({
				params : request
			});
			
	   //-----------------部门列表-------------------------
      var deptDs = new Ext.data.Store({
        url:'/Department.mvc/GetAll',
        reader: new Ext.data.JsonReader({
                    id: 'DepartmentID'
                    }, [ 'DepartmentID', 'DepartmentName']
                ),
        remoteSort: false
      });

//-----------------空闲资产列表-----------------------------
var freeAstDs = new Ext.data.Store({
	            url: '/AssetApply.mvc/SearchFreeAssets',
			    method : 'POST',
				remoteSort : false,
				reader : new Ext.data.JsonReader({
							id : 'AssetID',
							fields : [{
										name : 'AssetName',
										type : 'string'
									}, {
										name : 'AssetModel',
										type : 'string'
									}, {
										name : 'AssetSpec',
										type : 'string'
									}, {
										name : 'AssetCls',
										type : 'string'
									}, {
										name : 'AssetID',
										type : 'string'
									}]
						})
			});

	freeAstDs.setDefaultSort('AssetID', 'ASC');
	
	var freeAstDsNm = new Ext.grid.RowNumberer ();
	var freeAstDsSm = new Ext.grid.CheckboxSelectionModel(); // add checkbox
	
	var freeAstDsCm = new Ext.grid.ColumnModel([freeAstDsNm, freeAstDsSm, {
		header : "资产ID",
		dataIndex : 'AssetID',
		width : 200
		 
		}, {
		header : "资产名称",
		dataIndex : 'AssetName',
		width : 300
	}, {
		header : "资产型号",
		dataIndex : 'AssetModel',
		width : 300
	}, {
		header : "资产规格",
		dataIndex : 'AssetSpec',
		width : 300
	}, {
		header : "资产区分",
		dataIndex : 'AssetCls',
		width : 200
	}]);

	// by default columns are sortable
	freeAstDsCm.defaultSortable = true;

	var freeAstGrid = new Ext.grid.GridPanel({
				height : 500,
				title : 'Free Asset Search',
				store : freeAstDs,
				cm : freeAstDsCm,
				trackMouseOver : false,
				sm : freeAstDsSm,
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
							text : '检索',
							tooltip : '根据检索条件查询在库资产',
							iconCls : 'add',
							handler : showAstSearchWin
						}, '-', {
							text : '申请所选',
							tooltip : '申请选中的资产项目',
							iconCls : 'option',
							handler : showConfirmWin // 显示申请确认窗口，并提示用户输入申请理由
						}, '-', {
							text : '申请',
							tooltip : '申请购入新资产',
							iconCls : 'remove',
							handler : handleAdd
						}],
				bbar : new Ext.PagingToolbar({
							pageSize : 25,
							store : freeAstDs,
							displayInfo : true
						})
			});

	
	//--------------本部资产列表--------------------
	var deptAstDs = new Ext.data.Store({
	            url: '/AssetApply.mvc/GetDeptAssets',
			    method : 'POST',
				remoteSort : false,
				reader : new Ext.data.JsonReader({
							id : 'AssetID',
							fields : [{
										name : 'AssetID',
										type : 'string'
									}, {
										name : 'AssetName',
										type : 'string'
									}, {
										name : 'User',
										type : 'string'
									}, {
										name : 'AssetModel',
										type : 'string'
									}, {
										name : 'AssetSpec',
										type : 'string'
									}]
						})
			});

	deptAstDs.setDefaultSort('AssetID', 'ASC');
	
	var deptAstDsNm = new Ext.grid.RowNumberer ();
	var deptAstDsSm = new Ext.grid.CheckboxSelectionModel(); // add checkbox
	
	var deptAstDsCm = new Ext.grid.ColumnModel([deptAstDsNm, deptAstDsSm, {
		header : "资产ID",
		dataIndex : 'AssetID',
		width : 200	 
	}, {
		header : "资产名称",
		dataIndex : 'AssetName',
		width : 300
	}, {
		header : "使用者",
		dataIndex : 'User',
		width : 200
	}, {
		header : "资产型号",
		dataIndex : 'AssetModel',
		width : 300
	}, {
		header : "资产规格",
		dataIndex : 'AssetSpec',
		width : 300
	}]);

	// by default columns are sortable
	deptAstDsCm.defaultSortable = true;

	var deptAstGrid = new Ext.grid.GridPanel({
				height : 500,
				title : 'Departmental Assets',
				store : deptAstDs,
				cm : deptAstDsCm,
				trackMouseOver : false,
				sm : deptAstDsSm,
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
							text : '报修',
							tooltip : '申请报修选中的资产项目',
							iconCls : 'option',
							handler : function(){showConfirmWin2(1)}
						}, '-', {
							text : '退还',
							tooltip : '申请退还选中的资产项目',
							iconCls : 'option',
							handler : function(){showConfirmWin2(2)}
						}, '-', {
							text : '报废',
							tooltip : '对选中的资产项目申请报废处理',
							iconCls : 'option',
							handler : function(){showConfirmWin2(3)}
						}],
				bbar : new Ext.PagingToolbar({
							pageSize : 25,
							store : deptAstDs,
							displayInfo : true
						})
			});

	
	//----------------获取资产大类别------------------
	var astTypeDs = new Ext.data.Store({
	            url: '/AssetApply.mvc/GetAssetTypes',
			    method : 'POST',
				remoteSort : false,
				reader : new Ext.data.JsonReader({
							fields : [{
										name : 'InfoCode',
										type : 'string'
									}, {
										name : 'SubinfoCode',
										type : 'string'
									}, {
										name : 'SubinfoName',
										type : 'string'
									}]
						})
			});

	//astTypeDs.setDefaultSort('SubinfoCode', 'ASC');
	
	//-----------------获取资产小类别-----------------------
	var astSubtypeDs = new Ext.data.Store({
	            url: '/AssetApply.mvc/GetAssetSubtypes',
			    method : 'POST',
				remoteSort : false,
				reader : new Ext.data.JsonReader({
							fields : [{
										name : 'InfoCode',
										type : 'string'
									}, {
										name : 'SubinfoCode',
										type : 'string'
									}, {
										name : 'SubinfoName',
										type : 'string'
									}]
						})
			});

	//astSubtypeDs.setDefaultSort('SubinfoCode', 'ASC');
	
	/* FormPanel 定义段 */
	// ------------资产信息画面(申请购入用)--------------------
     var  AstInfoForm = new Ext.FormPanel({
        frame:true,
        labelAlign: 'right',
        labelWidth: 100,
        width: 400,
        height:400,
        items: new Ext.form.FieldSet({
                title: '资产概要',
                autoHeight: true,
                defaults: {width: 200},
                defaultType: 'textfield',
        items: [{
                fieldLabel: '资产名称',
                name: 'AssetName',
                allowBlank:false
            },{
                fieldLabel: '资产型号',
                name: 'AssetModel',
                allowBlank:true
            },{
                fieldLabel: '资产规格',
                name: 'AssetSpec',
                allowBlank:true
            },{
                fieldLabel: '申请数量',
                name: 'ApplyAmount',
                emptyText: '1',
                allowBlank:true
            },{
                fieldLabel: '申请原因',
                name: 'ApplyReason',
                allowBlank:false
            }
            ]
         })
    });
	
	
	//-------------空闲资产检索条件输入表单-------------------
	var FreeAstCondiForm = new Ext.FormPanel({
        frame:true,
        labelAlign: 'right',
        labelWidth: 120,
        width: 320,
        height:400,
        items: new Ext.form.FieldSet({
                title: '检索条件',
                autoHeight: true,
                defaults: {width: 200},
                defaultType: 'textfield',
        items: [{
                fieldLabel: '资产ID',
                name: 'AssetID',
                allowBlank:true
            },{
                fieldLabel: '资产名称',
                name: 'AssetName',
                allowBlank:true
            },{
                fieldLabel: '资产型号',
                name: 'AssetModel',
                allowBlank:true
            },{
                fieldLabel: '资产规格',
                name: 'AssetSpec',
                allowBlank:true
            }]
         })
    });
	
	
	/* Window 定义段 */
	//-------------空闲资产检索画面---------------------
	var AstSearchWin = new Ext.Window({
	                    title : '空闲资产检索(资产申请用)',
						layout : 'fit',
						width : 400,
						height : 250,
					    closeAction: 'hide',
						plain : true,
					    autoDestroy : true,
						items : FreeAstCondiForm, //检索条件表单
						buttons : [{
									text : '检索',
									handler : handleSearch
								}, {
									text : '取消',
									handler : function() {
										AstSearchWin.hide();
									}
								}]
				});
	
	var AplConfirmForm = new Ext.FormPanel({
	    frame: true,
        labelAlign: 'right',
        labelWidth: 100,
        width: 400,
        height: 200,
        items: new Ext.form.FieldSet({
            autoHeight: true,
            defaults: { width: 200 },
            defaultType: 'textfield',
            items: [{
	            fieldLabel: '申请原因',
	            name: 'AplReason',
	            allowBlank: false
	        }]
        })
	});
	
	var AplConfirmForm2 = new Ext.FormPanel({
	    frame: true,
        labelAlign: 'right',
        labelWidth: 100,
        width: 400,
        height: 200,
        items: new Ext.form.FieldSet({
            autoHeight: true,
            defaults: { width: 200 },
            defaultType: 'textfield',
            items: [{
	            fieldLabel: '申请原因',
	            name: 'AplReason',
	            allowBlank: false
	        }]
        })
	});
    
    ////申请确认窗体（新增申请用）				
	var AplConfirmWin = new Ext.Window({
	    title : '申请确认',
	    layout : 'fit',
	    width : 400,
	    height : 160,
	    closeAction: 'hide',
	    plain : true,
	    autoDestroy : true,
	    items : AplConfirmForm,
	    buttons : [{
	        text : '申请',
	        handler : handleApply
	        }, {
	        text : '取消',
	        handler : function() {
	        AplConfirmWin.hide();
	        }
	    }]
	});
	
	//申请确认窗体（报修、退还、报废申请用）
	var AplConfirmWin2 = new Ext.Window({
	    title : '申请确认',
	    layout : 'fit',
	    width : 400,
	    height : 160,
	    closeAction: 'hide',
	    plain : true,
	    autoDestroy : true,
	    items : AplConfirmForm2,
	    buttons : [{
	        text : '申请',
	        handler : handleApply2
	        }, {
	        text : '取消',
	        handler : function() {
	            AplConfirmWin2.hide();
	        }
	    }]
	});
	
	//资产新增申请窗体
	var AstAddWin = new Ext.Window({
					title : '新增资产申请',
					layout : 'fit',
					width : 400,
					height : 280,
					closeAction: 'hide',
					plain : true,
					autoDestroy : true,
					items : AstInfoForm,
					buttons : [{
						text : '提交申请',
						handler : handleApplyOne
					}, {
						text : '取消',
						handler : function() {
							AstAddWin.hide();
						}
					}]
	});
	
	//部门资产一览窗体
	var deptAstWin = new Ext.Window({
					title : '部门资产一览',
						layout : 'fit',
						width : 600,
						height : 420,
					    closeAction: 'hide',
						plain : true,
					    autoDestroy : true,
						items : deptAstGrid,
						buttons : [{
									text : '取消',
									handler : function() {
										deptAstWin.hide();
									}
								}]
				}
	    );			
   
    /* function 定义段 */
    // 检索处理
    function handleSearch() {
        Ext.MessageBox.show({
            msg: '正在查询, 请稍侯',
            progressText: '正在请求数据',
            width: 300,
            wait: true,
            waitConfig: {
            interval: 200
        }
        });
        
        var formvalues = FreeAstCondiForm.form.getValues();
        freeAstDs.baseParams["id"] = formvalues["AssetID"];
        freeAstDs.baseParams["name"] = formvalues["AssetName"];
        freeAstDs.baseParams["model"] = formvalues["AssetModel"];
        freeAstDs.baseParams["spec"] = formvalues["AssetSpec"];
        
        freeAstDs.load({
            params: request,
            callback: function(r, options,success) {
                if (success) {
                    Ext.MessageBox.hide();
                    Ext.MessageBox.alert("消息", "检索成功！");
                    AstSearchWin.hide();
                } else {
                    Ext.MessageBox.hide();
                    Ext.MessageBox.alert("消息", "检索结果不存在或检索失败！");
                }
                FreeAstCondiForm.form.reset();
            }
 
        });
    }
    
    //显示申请确认窗体
    function showConfirmWin() {
        var selectedKeys = freeAstGrid.selModel.selections.keys;
        
        if(selectedKeys.length < 1)
        {
            Ext.MessageBox.alert('提示', '请选择至少一个资产项目！');
        } else {
            AplConfirmWin.show(this);
        }
    }
    function showConfirmWin2(flg) {
        var selectedKeys = deptAstGrid.selModel.selections.keys;
        
        if(selectedKeys.length < 1)
        {
            Ext.MessageBox.alert('提示', '请选择至少一个资产项目！');
        } else {
            if(selectedKeys.length > 1)
            {
                Ext.MessageBox.alert('提示', '只能选择一个资产项目！');
            } else {
                handleType = flg;
                AplConfirmWin2.show(this);
            }
        }
    }
    
    //用于报修 退还 报废的通用处理
    function handleApply2(btn) {
        var url;
        
        if(AplConfirmForm2.form.isValid()) {
            switch(handleType)
            {
                case 1:
                    url = "/AssetApply.mvc/ApplyRepair";
                    break;
                case 2:
                    url = "/AssetApply.mvc/ApplyReturn";
                    break;
                case 3:
                    url = "/AssetApply.mvc/ApplyDestroy";
                    break;
            }
            btn.disabled = true;
            
            var selectedRows = deptAstGrid.selModel.selections.items;
			var selectedKeys = deptAstGrid.selModel.selections.keys;
			
            Ext.MessageBox.show({
						msg : '正在提交申请, 请稍侯',
						progressText : '正在请求数据',
						width : 300,
						wait : true,
						waitConfig : {
							interval : 200
						}
					});
			var formvalue = AplConfirmForm2.form.getValues();
		 
			Ext.Ajax.request({
						url : url,
						method : 'POST',
						params :{ 
						    assetId : selectedKeys[0],
						    reason : formvalue["AplReason"]
						},
						callback : function(options, success, response) {
						    btn.disabled = false;
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
						// (server script, 404, or 403 errors)
						failure : function(response, options) {
							Ext.MessageBox.hide();
							ReturnValue = Ext.MessageBox.alert("警告",
									"出现异常错误！请联系管理员！");
						},
						success : function(response, options) {
							Ext.MessageBox.hide();
							
							//更新成功后的处理
							AplConfirmForm2.form.reset();
							deptAstDsSm.clearSelections();
							AplConfirmWin2.hide();
							deptAstDs.reload();// 空闲资产重新加载
							myAllAplDs.reload();// 本部申请重新加载
						}
			})// end of Ajax request
        }// end of if
    }// end of function
    
    
    //单个新增申请处理
    function handleApplyOne(btn) {
        if(AstInfoForm.form.isValid()) {
            btn.disabled = true;
            
            Ext.MessageBox.show({
						msg : '正在提交申请, 请稍侯',
						progressText : '正在请求数据',
						width : 300,
						wait : true,
						waitConfig : {
							interval : 200
						}
					});
			var formvalue = AstInfoForm.form.getValues();//获取表单上的数据
			
			Ext.Ajax.request({
						url : '/AssetApply.mvc/ApplyAdd',
						method : 'POST',
						params :{ 
						    astName : formvalue["AssetName"],
						    astModle : formvalue["AssetModel"],
						    astSpec : formvalue["AssetSpec"],
						    aplAmount : formvalue["ApplyAmount"],
						    reason : formvalue["ApplyReason"]
						},
						callback : function(options, success, response) {
						    btn.disabled = false;
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
							
							//更新成功后的处理
							AstInfoForm.form.reset();
							AstAddWin.hide();
							myAllAplDs.reload();// 本部申请重新加载
						}
			})//end of Ajax request
        }//end of if
    }
    
    
    //批量新增申请处理
    function handleApply(btn) {
        if(AplConfirmForm.form.isValid()) {
            btn.disabled = true;
            
            var selectedRows = freeAstGrid.selModel.selections.items;
			var selectedKeys = freeAstGrid.selModel.selections.keys;
			
            Ext.MessageBox.show({
						msg : '正在提交申请, 请稍侯',
						progressText : '正在请求数据',
						width : 300,
						wait : true,
						waitConfig : {
							interval : 200
						}
					});
			var formvalue = AplConfirmForm.form.getValues();
		 
			Ext.Ajax.request({
						url : '/AssetApply.mvc/ApplyAddBatch',
						method : 'POST',
						params :{ 
						    assetIds : selectedKeys,
						    reason : formvalue["AplReason"]
						},
						callback : function(options, success, response) {
						    btn.disabled = false;
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
						// (server script, 404, or 403 errors)
						failure : function(response, options) {
							Ext.MessageBox.hide();
							ReturnValue = Ext.MessageBox.alert("警告",
									"出现异常错误！请联系管理员！");
						},
						success : function(response, options) {
							Ext.MessageBox.hide();
							
							//更新成功后的处理
							AplConfirmForm.form.reset();
							freeAstDsSm.clearSelections();
							AplConfirmWin.hide();
							AstSearchWin.hide();
							freeAstDs.reload();// 空闲资产重新加载
							myAllAplDs.reload();// 本部申请重新加载
						}
			})// end Ajax request
        }// end if
    }// end function
    
    
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
	
	
	//-----------显示资产新增申请画面---------------
	function handleAdd() {
		AstAddWin.show(this);
		//astTypeDs.load();
		//astSubtypeDs.load();
	}
	
	//-----------显示空闲资产检索画面---------------
	function showFreeAst() {
		var freeAstWin = new Ext.Window({
					title : '空闲资产一览',
						layout : 'fit',
						width : 600,
						height : 420,
					    closeAction: 'hide',
						plain : true,
					    autoDestroy : true,
						items : freeAstGrid,
						buttons : [{
									text : '取消',
									handler : function() {
										freeAstWin.hide();
									}
								}]
				});
		freeAstWin.show(this);
	}
	
	
	//-----------显示资产检索画面------------------
	function showAstSearchWin() {
	
		AstSearchWin.show(this);
		//astTypeDs.load();
		//astSubtypeDs.load();
	}
	
	//-----------显示部门资产--------------
	function showDeptAst() {
	    deptAstWin.show(this);
	    deptAstDs.load({
				params : request
			});
	}

});