/// <reference path="../../vswd-ext_2.2.js" />
Ext.QuickTips.init();
Ext.form.Field.prototype.msgTarget='side';

function LoginItems() {
  //获取部门列表
  var deptDs = new Ext.data.Store({
    url:'/Department.mvc/GetAll',
    reader: new Ext.data.JsonReader({
                id: 'DepartmentID'
                }, [ 'DepartmentID', 'DepartmentName']
            ),
    remoteSort: false
  });
  
  //获取用户列表
  var userDs = new Ext.data.Store({
    url:'/User.mvc/GetAll',
    reader: new Ext.data.JsonReader({
                id: 'UserID'
                }, [ 'UserID', 'DepartmentID', 'UserName']
            ),
    remoteSort: false
  });
      
	return [
  new Ext.form.ComboBox({
      fieldLabel: '部门',
      name: 'DepartmentName',
      hiddenName: 'DepartmentID',
      store: deptDs,
      valueField: 'DepartmentID',
      displayField: 'DepartmentName',
      typeAhead: true,
      mode: 'remote',
      readOnly : true,
      triggerAction: 'all',
      emptyText: '请选择部门',
      selectOnFocus: true,
      allowBlank: false,
      listeners:{select:{fn:function(combo, value) {   
          var comboCity = Ext.getCmp('user_combo');           
          comboCity.clearValue();   
          comboCity.store.filter('DepartmentID', combo.getValue());   
          }}   
      }
  }), 
  new Ext.form.ComboBox({
      id : 'user_combo',
      fieldLabel: '用户名',
      name: 'UserName',
      hiddenName: 'UserID',
      store: userDs,
      readOnly : true,
      valueField: 'UserID',
      displayField: 'UserName',
      typeAhead: true,
      mode: 'remote',
      triggerAction: 'all',
      emptyText: '请选择用户',
      selectOnFocus: false,
      allowBlank: false
  }),
  	{
		xtype : 'textfield',
		id : 'password',
		fieldLabel : "密码",
		inputType : 'password',
		name : 'UserPassword',
		allowBlank : false
	}]
}

Login = function() {
	var win, form, submitUrl = '/user.mvc/login';  
	return {
		Init : function() {
			var logoPanel = new Ext.Panel({
				baseCls : 'x-plain',
				id : 'login-logo',
				region : 'center'
			});
		
			var formPanel = new Ext.form.FormPanel({
				baseCls : 'x-plain',
				defaults : {
					width : 200
				},
				frame : false,
				height : 100,
				id : 'login-form',
				items : LoginItems(),
				labelWidth : 120,
				region : 'south'
			});
  
			win = new Ext.Window({
				buttons : [{
					scope : Login,
					text : "登陆",
					handler : function CheckLogin() {
						if (form.isValid()) {
							var formvalue = form.getValues();
							Ext.Ajax.request({
								url : submitUrl,
								method : "POST",
								waitMsg : "请等待!",
								params : {
									userid : formvalue.UserID,
									password : formvalue.UserPassword
								},
								success : function(response, options) {
									var responseMessage = Ext.util.JSON
											.decode(response.responseText);
									if (responseMessage.Result) {
										win.destroy();
										window.location = "/Home.mvc/Index";
									} else {	
										Ext.MessageBox.alert("消息",
												responseMessage.Message);
										Ext.getCmp( "password" ).focus(true,true);
									}
								},
								failure : function(response, options) {
									Ext.MessageBox.hide();
									Ext.MessageBox.show({
										title :"登陆失败",
										msg : response.responseText								
									});
									Ext.getCmp( "password" ).focus(true,true);
								}
							});
						} else {
							form.markInvalid();
							Ext.MessageBox.alert("消息", "输入错误");
							Ext.getCmp( "password" ).focus(true,true);
						}
					}
				}],
				buttonAlign : 'right',
				closable : false,
				draggable : false,
				height : 250,
				id : 'login-win',
				layout : 'border',
				minHeight : 250,
				minWidth : 530,
				plain : false,
				resizable : false,
				items : [logoPanel, formPanel],
				title : 'Login',
				width : 530
			});
			form = formPanel.getForm();
			win.show();
		}
	};
}();

Ext.BasicForm.prototype.afterAction = function(action, success) {
	this.activeAction = null;
	var o = action.options;
	if (o.waitMsg) {
		Ext.MessageBox.updateProgress(1);
		Ext.MessageBox.hide();
	}
	if (success) {
		if (o.reset) {
			this.reset();
		}
		Ext.callback(o.success, o.scope, [this, action]);
		this.fireEvent('actioncompleted', this, action);
	} else {
		Ext.callback(o.failure, o.scope, [this, action]);
		this.fireEvent('actionfailed', this, action);
	}
}

function ConvertFormValue(formvalue) {
	var ResultObject = new Object();
	for (var prop in formvalue) {
		ResultObject[prop] = formvalue[prop];
	}
	return ResultObject;
}

Ext.onReady(Login.Init, Login, true);