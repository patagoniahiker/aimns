/// <reference path="../../vswd-ext_2.2.js" />
Ext.onReady(function() {
    // create the Data Store
    var store = new Ext.data.Store({
        proxy: new Ext.data.HttpProxy({
            url: '/Department.mvc/GetPageRecords',
            method: 'POST'
        }),
        //params: { start: 0, limit: 10 },
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

        store.setDefaultSort('DepartmentID', 'ASC');


        var nm = new Ext.grid.RowNumberer();
        var sm = new Ext.grid.CheckboxSelectionModel(); // add checkbox

        // create reusable renderer
        Ext.util.Format.comboRenderer = function(combo) {
            return function(value) {
                //var record = combo.findRecord('DepartmentID', value);
                //return record ? record.get('DepartmentName') : "子部门列表";
                return "子部门列表";
            }
        }

        // create the combo instance
        var combo = new Ext.form.ComboBox({
            typeAhead: true,
            triggerAction: 'all',
            //{@link #lazyRender}:true,
            mode: 'remote',
            store: new Ext.data.Store({
                url: '/Department.mvc/GetAll',
                reader: new Ext.data.JsonReader({
                    id: 'DepartmentID'
                }, ['DepartmentID', 'DepartmentName']
                    ),
                remoteSort: false
            }),
            valueField: 'DepartmentID',
            displayField: 'DepartmentName',
            listeners: {
                // delete the previous query in the beforequery event or set
                // combo.lastQuery = null (this will reload the store the next time it expands)
                beforequery: function(qe) {
                    delete qe.combo.lastQuery;
                    //combo.set
                }
            }
        });

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

            // by default columns are sortable
            cm.defaultSortable = true;

            var pagebar = new Ext.PagingToolbar({
                pageSize: 10,
                store: store,
                displayInfo: true,
                displayMsg: '显示第{0}条到{1}条记录,一共{2}条.',
                emptyMsg: '没有记录'
            });

            var grid = new Ext.grid.EditorGridPanel({
                // el:'topic-grid',
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
                // inline toolbars
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
                });

                // render it
                grid.render();

                // trigger the data store load
                var request = {
                    start: 0,
                    limit: 10
                };

                store.load({
                    params: request,
                    callback: function(r, options, success) {
                        //                        if (success == false) {
                        //                            Ext.Msg.alert("ERROR", "数据加载出现错误!");
                        //                        } else {
                        //                            Ext.Msg.alert("ERROR", "数据加载成功!");
                        //                        }
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



                //部门信息窗口
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
                        items: [{
                            fieldLabel: '部门号',
                            name: 'DepartmentID',
                            allowBlank: false
                        }, {
                            fieldLabel: '部门名',
                            name: 'DepartmentName',
                            allowBlank: false
                        }, new Ext.form.ComboBox({
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
                            allowBlank: false
                        })
                        ]
                    })
                });

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
                        items: [{
                            fieldLabel: '部门号',
                            name: 'DepartmentID'
                        }, {
                            fieldLabel: '部门名',
                            name: 'DepartmentName'
                        }, new Ext.form.ComboBox({
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
                        })
                        ]
                    })
                });


                var Condition = function(store) {
                    //Ext.Msg.alert("ERROR", "before load");
                    //this.proxy.url = '/Department.mvc/GetDepartment';
                    //Ext.apply(this.url, '/Department.mvc/GetDepartment');
                    this.proxy.conn.url = '/Department.mvc/GetDepartment';
                    //pagebar.hide();
                    //this.proxy.conn.params = Ext.util.JSON.encode(formvalue);
                    //Ext.apply(this.baseParams, {
                    //    start: encodeURIComponent("0"),//追加一个参数 (areaName)
                    //    limit: encodeURIComponent("25")
                    //});
                    var formvalue = SDepartForm.form.getValues();
                    this.baseParams["DepartmentID"] = formvalue["DepartmentID"];
                    this.baseParams["DepartmentName"] = formvalue["DepartmentName"];
                    this.baseParams["ParentDepartmentId"] = formvalue["ParentDepartmentId"];
                }

                var All = function(store) {
                    //Ext.Msg.alert("ERROR", "before load");
                    //this.proxy.url = '/Department.mvc/GetDepartment';
                    //Ext.apply(this.url, '/Department.mvc/GetDepartment');
                    this.proxy.conn.url = '/Department.mvc/GetPageRecords';
                    //pagebar.hide();
                    //this.proxy.conn.params = Ext.util.JSON.encode(formvalue);
                    //Ext.apply(this.baseParams, {
                    //    start: encodeURIComponent("0"),//追加一个参数 (areaName)
                    //    limit: encodeURIComponent("25")
                    //});
                }

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
                    } // end
                }

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
                            // the function to be called upon failure of the request
                            // (server script, 404, or 403 errors)
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
                    } // end if click 'yes' on button
                } // end deleteRecord

                function handleAdd() {
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
                        AddDepartWin.show(this);
                    }

                    var SDepartWin;
                    function handleSearch() {
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
                            SDepartWin.show(this);
                        }

                        function handleEdit() {
                            var selectedKeys = grid.selModel.selections.keys; // returns array of
                            // selected rows ids
                            // only
                            if (selectedKeys.length != 1) {
                                Ext.MessageBox.alert('提示', '请选择一条记录！');
                            } else {
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
                                        url: '/Department.mvc/GetDepart', // url to server
                                        // side script
                                        method: 'POST',
                                        params: { DepartmentID: selectedKeys[0] }, // the unique id(s)
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
                                        // the function to be called upon failure of the request (server
                                        // script, 404, or 403 errors)
                                        failure: function(response, options) {
                                            Ext.MessageBox.hide();
                                            ReturnValue = Ext.MessageBox.alert("警告", "出现异常错误！请联系管理员！");
                                        },
                                        success: function(response, options) {
                                            Ext.MessageBox.hide();
                                        }
                                    })// end Ajax request
                                }
                            }

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
                                        // id(s)
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
                                        // the function to be called upon failure of the request
                                        // (server script, 404, or 403 errors)
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
                                    //var formvalue = DepartForm.form.getValues();

                                    /** 
                                    *@see 表格数据加载之前事件 
                                    */
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
                                        GetUserWin.hide();
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
                                    });


                                }
                            }

                        });