/// <reference path="../../vswd-ext_2.2.js" />
function LoginItems() {
	return [{
		xtype : 'textfield',
		fieldLabel : "用户名",
		id : 'UserID',
		name : 'UserID',
		allowBlank : false
	}, {
		xtype : 'textfield',
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
		//	Ext.state.Manager.setProvider(new Ext.state.CookieProvider());
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
									}
								},
								failure : function(response, options) {
									Ext.MessageBox.hide();
									Ext.MessageBox.show({
										title :"登陆失败",
										msg : response.responseText
									});

								}
							});
						} else {
							form.markInvalid();
							Ext.MessageBox.alert("消息", "输入错误");
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