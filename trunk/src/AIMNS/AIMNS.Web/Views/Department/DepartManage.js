Ext.onReady(function() {
        // 创建Data Store，获取部门信息
        var store = new Ext.data.Store({
            proxy: new Ext.data.HttpProxy({
            url: '/Department.mvc/GetPageRecords',
            method: 'POST'
            }),
            remoteSort: false,
            reader: new Ext.data.JsonReader({
                id: 'DepartmentID',
                root: 'root',
                totalProperty: 'total',
                fields: [{
                    name: 'DepartmentID',
                    type: 'string'
                }, {
                    name: 'DepartmentName',
                    type: 'string'
                }, {
                    name: 'ParentDepartmentName',
                    type: 'string'
                }, {
                    name: 'ManagerName',
                    type: 'string'
                }]
            })
        });

        //设置store默认的排序
        store.setDefaultSort('DepartmentID', 'ASC');


        //创建自动生成数字的列
        var nm = new Ext.grid.RowNumberer();
        //创建checkbox列
        var sm = new Ext.grid.CheckboxSelectionModel();

        // create reusable renderer
        Ext.util.Format.comboRenderer = function(combo) {
            return function(value) {
                return "子部门列表";
            }
        }


        //创建Grid的列模型实例
        var cm = new Ext.grid.ColumnModel([nm, sm, {
            header: "部门ID",
            dataIndex: 'DepartmentID',
            width: 100

        }, {
            header: "部门名",
            dataIndex: 'DepartmentName',
            width: 200
        }, {
            header: "直属部门名",
            dataIndex: 'ParentDepartmentName',
            width: 200
        }]);

        // 设置Grid是否默认排序
        cm.defaultSortable = true;

        //设置工具栏显示的信息
        var pagebar = new Ext.PagingToolbar({
            pageSize: 10,
            store: store,
            displayInfo: true,
            displayMsg: '显示第{0}条到{1}条记录,一共{2}条.',
            emptyMsg: '没有记录'
        });

        //创建可编辑的GridPanel
        var grid = new Ext.grid.EditorGridPanel({
            renderTo: document.body,
            height: 500,
            title: '分页和排序列表',
            store: store,
            cm: cm,
            trackMouseOver: false,
            sm: sm,
            loadMask: true,
            viewConfig: {
                forceFit: true,
                enableRowBody: true,
                showPreview: true,
                getRowClass: function(record, rowIndex, p, store) {
                    return 'x-grid3-row-collapsed';
                }
            },
            // 设置面板顶部的工具条
            tbar: [{
                text: '查询',
                tooltip: '查询记录',
                iconCls: 'search',
                handler: handleSearch
            }, '-', {
                text: '登录',
                tooltip: '登录一条记录',
                iconCls: 'add',
                handler: handleAdd
            }, '-', {
                text: '修改',
                tooltip: '修改',
                iconCls: 'option',
                handler: handleEdit
            }, '-', {
                text: '删除',
                tooltip: '删除记录',
                iconCls: 'remove',
                handler: handleDelete
            }],
                bbar: pagebar
        });//创建可编辑的GridPanel end

                // render it
                grid.render();

                //
                var request = {
                    start: 0,
                    limit: 10
                };

                store.load({
                    params: request,
                    callback: function(r, options, success) {
                    }
                });

                //获取部门列表
                var deptDs = new Ext.data.Store({
                    url: '/Department.mvc/GetAll',
                    reader: new Ext.data.JsonReader({
                        id: 'DepartmentID'
                    }, ['DepartmentID', 'DepartmentName']
                    ),
                    remoteSort: false
                });


                //部门登录信息窗口部门号文本框
                var idTxtL = new Ext.form.TextField({
                     fieldLabel: '部门号',
                     name: 'DepartmentID',
                     allowBlank: false
                });
                
                //部门登录信息窗口部门名文本框
                var nameTxtL = new Ext.form.TextField({
                     fieldLabel: '部门名',
                     name: 'DepartmentName',
                     allowBlank: false
                });
                
                //部门登录信息窗口直属部门列表框
                var deptComboL = new Ext.form.ComboBox({
                            fieldLabel: '直属部门',
                            name: 'ParentDepartmentName',
                            hiddenName: 'ParentDepartmentId',
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
                
                //部门登录信息窗口
                var DepartForm = new Ext.FormPanel({
                    frame: true,
                    labelAlign: 'right',
                    labelWidth: 120,
                    width: 450,
                    height: 250,
                    items: new Ext.form.FieldSet({
                        title: '部门资料',
                        autoHeight: true,
                        defaults: { width: 200 },
                        defaultType: 'textfield',
                        items: [idTxtL,nameTxtL,deptComboL]
                    })
                });
                
                //部门检索信息窗口部门号文本框
                var idTxt = new Ext.form.TextField({
                     fieldLabel: '部门号',
                     name: 'DepartmentID'
                });
                
                //部门检索信息窗口部门名文本框
                var nameTxt = new Ext.form.TextField({
                     fieldLabel: '部门名',
                     name: 'DepartmentName'
                });
                
                //部门检索信息窗口直属部门列表框
                var deptCombo = new Ext.form.ComboBox({
                            fieldLabel: '直属部门',
                            name: 'ParentDepartmentName',
                            hiddenName: 'ParentDepartmentId',
                            store: deptDs,
                            valueField: 'DepartmentID',
                            displayField: 'DepartmentName',
                            typeAhead: true,
                            mode: 'remote',
                            triggerAction: 'all',
                            emptyText: '请选择部门',
                            selectOnFocus: true
                        });
                        
                //部门检索信息窗口
                var SDepartForm = new Ext.FormPanel({
                    frame: true,
                    labelAlign: 'right',
                    labelWidth: 120,
                    width: 450,
                    height: 250,
                    items: new Ext.form.FieldSet({
                        title: '部门资料',
                        autoHeight: true,
                        defaults: { width: 200 },
                        defaultType: 'textfield',
                        items: [idTxt, nameTxt, deptCombo]
                    })
                });


                //按条件进行查询
                var Condition = function(store) {
                    this.proxy.conn.url = '/Department.mvc/GetDepartment';
                    var formvalue = SDepartForm.form.getValues();
                    this.baseParams["DepartmentID"] = formvalue["DepartmentID"];
                    this.baseParams["DepartmentName"] = formvalue["DepartmentName"];
                    this.baseParams["ParentDepartmentId"] = formvalue["ParentDepartmentId"];
                }


                //查询所有的部门
                var All = function(store) {                 
                    this.proxy.conn.url = '/Department.mvc/GetPageRecords';
                }


                //按下删除按钮时
                function handleDelete() {
                    var selectedKeys = grid.selModel.selections.keys; 
                    if (selectedKeys.length > 0) {
                        Ext.MessageBox.confirm('提示', '您确实要删除选定的记录吗？', deleteRecord);
                    } else {
                        Ext.MessageBox.alert('提示', '请至少选择一条记录！');
                    }
                }


                //删除数据
                function deleteRecord(btn) {
                    if (btn == 'yes') {
                        var selectedRows = grid.selModel.selections.items;
                        var selectedKeys = grid.selModel.selections.keys;
                        Ext.MessageBox.show({
                            msg: '正在请求数据, 请稍侯',
                            progressText: '正在请求数据',
                            width: 300,
                            wait: true,
                            waitConfig: {
                                interval: 200
                            }
                        });
                        Ext.Ajax.request({
                            url: '/Department.mvc/DeleteDepart',
                            method: 'POST',
                            params: {
                                "DepartmentID": selectedKeys
                            }, // the unique id(s)
                            callback: function(options, success, response) {
                                if (success) {
                                    Ext.MessageBox.hide();
                                    var result = Ext.util.JSON.decode(response.responseText)
                                    Ext.MessageBox.alert("消息", result.Message);
                                } else {
                                    Ext.MessageBox.hide();
                                    Ext.MessageBox.alert("失败，请重试",
										response.responseText);
                                }
                            },
                            failure: function(response, options) {
                                Ext.MessageBox.hide();
                                ReturnValue = Ext.MessageBox.alert("警告",
									"出现异常错误！请联系管理员！");
                            },
                            success: function(response, options) {
                                Ext.MessageBox.hide();
                                store.un('beforeload', Condition);
                                store.un('beforeload', All);
                                store.on('beforeload', All);
                                store.reload();
                            }
                        })// end Ajax request
                    } // end if click "yes" on button
                } // end deleteRecord            
                                  
                        
                //按下修改按钮时
                function handleEdit() {
                    var selectedKeys = grid.selModel.selections.keys;
                    if (selectedKeys.length != 1) {
                        Ext.MessageBox.alert('提示', '请选择一条记录！');
                    } else {
                        ////创建修改部门资料画面
                        var EditDepartWin = new Ext.Window({
                            title: '修改部门资料',
                            layout: 'fit',
                            width: 500,
                            height: 300,
                            closeAction: 'hide',
                            plain: true,
                            autoDestroy: true,
                            items: DepartForm,
                            buttons: [{
                                text: '保存',
                                handler: UpdateRecord
                            }, {
                                text: '取消',
                                handler: function() {
                                EditDepartWin.hide();
                                }
                            }]
                        });
                        EditDepartWin.show(this);
                        deptDs.load();
                        Ext.MessageBox.show({
                            msg: '正在请求数据, 请稍侯',
                            progressText: '正在请求数据',
                            width: 300,
                            wait: true,
                            waitConfig: {
                                interval: 200
                            }
                        });
                        Ext.Ajax.request({
                            url: '/Department.mvc/GetDepart',
                            method: 'POST',
                            params: { DepartmentID: selectedKeys[0] },
                            callback: function(options, success, response) {
                                if (success) {
                                    Ext.MessageBox.hide();
                                    var formvalue = Ext.decode(response.responseText);
                                    DepartForm.form.setValues(formvalue);
                                } else {
                                    Ext.MessageBox.hide();
                                    Ext.MessageBox.alert("失败，请重试", response.responseText);
                                }
                            },              
                            failure: function(response, options) {
                                Ext.MessageBox.hide();
                                ReturnValue = Ext.MessageBox.alert("警告", "出现异常错误！请联系管理员！");
                            },
                            success: function(response, options) {
                                Ext.MessageBox.hide();
                            }
                        })
                    }
                }

                            
                //更新数据
                function UpdateRecord(btn) {
                    if (DepartForm.form.isValid()) {
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
                        var formvalue = Ext.util.JSON.encode(DepartForm.form.getValues());

                        Ext.Ajax.request({
                            url: '/Department.mvc/UpdateDepart',
                            method: 'POST',
                            params: formvalue, // the unique
                            callback: function(options, success, response) {
                                if (success) {
                                    Ext.MessageBox.hide();
                                    var result = Ext.util.JSON.decode(response.responseText)
                                    Ext.MessageBox.alert("消息", result.Message);
                                } else {
                                    Ext.MessageBox.hide();
                                    Ext.MessageBox.alert("失败，请重试",
							response.responseText);
                                }
                            },
                            failure: function(response, options) {
                                Ext.MessageBox.hide();
                                ReturnValue = Ext.MessageBox.alert("警告",
						"出现异常错误！请联系管理员！");
                            },
                            success: function(response, options) {
                                Ext.MessageBox.hide();
                                store.reload();
                            }
                        })// end Ajax request
                    }
                }

                            
                //按下登录按钮时
                function handleAdd() {
                    //创建增加新部门画面
                    var AddDepartWin = new Ext.Window({
                        title: '增加新部门',
                        layout: 'fit',
                        width: 500,
                        closeAction: 'hide',
                        height: 300,
                        modal: true,
                        autoDestroy: true,
                        plain: true,
                        items: DepartForm,
                        buttons: [{
                            text: '保存',
                            handler: AddRecord
                        }, {
                            text: '取消',
                            handler: function() {
                                AddDepartWin.hide();
                            }
                        }]
                        });
                        idTxtL .reset ();
                        nameTxtL .reset ();
                        deptComboL.reset();
                        AddDepartWin.show(this);
                    }
                            
                            
                    //登录数据
                    function AddRecord(btn) {
                        if (DepartForm.form.isValid()) {
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
                            var formvalue = DepartForm.form.getValues();
                            Ext.Ajax.request({
                                url: '/Department.mvc/AddDepart',
                                method: 'POST',
                                params: Ext.util.JSON.encode(formvalue),
                                callback: function(options, success, response) {
                                    if (success) {
                                        Ext.MessageBox.hide();
                                        var result = Ext.util.JSON.decode(response.responseText)
                                        Ext.MessageBox.alert("消息", result.Message);
                                    } else {
                                        Ext.MessageBox.hide();
                                        Ext.MessageBox.alert("失败，请重试",
						    	response.responseText);
                                    }
                                },
                                failure: function(response, options) {
                                    Ext.MessageBox.hide();
                                    ReturnValue = Ext.MessageBox.alert("警告",
							"出现异常错误！请联系管理员！");
                                },
                                success: function(response, options) {
                                    Ext.MessageBox.hide();
                                    store.un('beforeload', Condition);
                                    store.un('beforeload', All);
                                    store.on('beforeload', All);
                                    store.reload();
                                }
                            })// end Ajax request
                        }
                    }
                        
                    //按下查询按钮时
                    var SDepartWin;
                    function handleSearch() {
                        //创建查询部门条件画面
                        SDepartWin = new Ext.Window({
                            title: '查询部门条件',
                            layout: 'fit',
                            width: 500,
                            closeAction: 'hide',
                            height: 300,
                            modal: true,
                            autoDestroy: true,
                            plain: true,
                            items: SDepartForm ,
                            buttons: [{
                                text: '查询',
                                handler: SearchRecords
                            }, {
                                text: '取消',
                                handler: function() {
                                    SDepartWin.hide();
                                }
                            }]
                        });
                        idTxt .reset ();
                        nameTxt .reset ();
                        deptCombo.reset();
                        SDepartWin.show(this);
                    }

                            
                            
                    //查询数据
                    function SearchRecords(btn) {
                        if (DepartForm.form.isValid()) {
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
                                    
                            //表格数据加载之前事件       
                            store.un('beforeload', Condition);
                            store.un('beforeload', All);
                            store.on('beforeload', Condition);

                            store.load({
                                params: request,
                                callback:function (r,options,succss){
                                    btn.disable=false;
                                    if(succss){
                                        Ext .MessageBox .hide ();
                                        if(r.length==0){
                                            Ext .MessageBox .alert ("消息","部门不存在！");
                                        }else{
                                            Ext .MessageBox .alert ("消息","查询成功！");
                                        }
                                        SDepartWin.hide();
                                    }else{
                                        Ext.MessageBox.hide();
	                                    Ext.MessageBox.alert("失败，请重试！");
                                    }
                                },
                                failure: function(response, options) {
                                    Ext.MessageBox.hide();
                                    ReturnValue = Ext.MessageBox.alert("警告",
							   "出现异常错误！请联系管理员！");
                                },
                                success: function(response, options) {
                                    Ext.MessageBox.hide();
                                }
                            });//load end
                        }//if end
                    }//SearchRecords end

});