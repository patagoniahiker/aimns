/// <reference path="../../vswd-ext_2.2.js" />
Ext.BLANK_IMAGE_URL = '/Content/Images/s.gif';
var cssMenu = '/Content/Ext/resources/css/';
var main, menu, header, bottom, onlineWindow;
var westMenuPanel;
var navtree;
Ext.QuickTips.init();
Ext.form.Field.prototype.msgTarget='side';

function addToTree( item, children ) {
  var length = children.length;
  for( var n = 0; n < length; n++ )
  {
    var sub=new Ext.tree.TreeNode({});
    sub.text = children[n].text;
    sub.id = children[n].id;
    sub.url = children[n].url;
    sub.leaf = children[n].leaf;
    sub.childNodes = children[n].childNodes;
    if(children[n].childNodes != null){
      addToTree( sub, children[n].childNodes );
    }

    item.appendChild(sub);
  }
}

function AddNewTab(id, text, url) {
	var existTab = main.findById(id);// 是否已经存在
	if (!existTab) {
		var tab = new Ext.Panel({
			id : id,
			title : text,
			autoScroll : true,
			closable : true,
			html : '<iframe src="'
					+ url
					+ '" width="100%" height="100%" frameborder="0" scrolling="auto"></iframe>'
		});
		main.add(tab).show();
	} else {
		existTab.show();
	}
}

MainPanel = function() {
	this.urls = [];
	this.homePage = "../../Default.aspx";
	this.currentUrl = this.homePage;
	this.openTab = function(panel, id) {
		var o = (typeof panel == "string" ? panel : id || panel.id);
		var tab = this.getComponent(o);
		if (tab) {
			this.setActiveTab(tab);
		} else if (typeof panel != "string") {
			panel.id = o;
			var p = this.add(panel);
			this.setActiveTab(p);
		}
	};
	this.back = function() {

	};
	this.forward = function() {

	};
	this.closeTab = function(panel, id) {
		var o = (typeof panel == "string" ? panel : id || panel.id);
		var tab = this.getComponent(o);
		if (tab) {
			this.remove(tab);
		}
	};
	this.closeAll = function(excep) {
		this.cascade(function(p) {
					if (p.closable && p != excep)
						this.closeTab(p);
				}, this);
	};
	this.openUrl = function(url, panlId, title) {
		var cmd = Ext.getCmp(panlId);
		var loader = {
			url : url,
			scripts : true
		};
		if (cmd == null)
			cmd = new Ext.Panel({
						id : panlId,
						title : title,
						autoLoad : loader,
						autoScroll : true,
						closable : true
					});
		else
			cmd.body.load(loader);
		this.openTab(cmd);
	}
	this.loadUrl = function(url, panelId, title) {
		var cmd = Ext.getCmp("homePage");
		if (this.urls.indexOf(url) < 0) {
			this.urls.push(url);
		}
		this.currentUrl = url;
		cmd.body.load({
					url : url,
					scripts : true
				});
		this.openTab(cmd);
	};
	this.refresh = function() {
		if (this.currentUrl) {
			this.loadUrl(this.currentUrl);
		}
	}
	this.menu = new Ext.menu.Menu({
				items : [{
							text : "关闭所有Tab",
							handler : this.closeAll,
							scope : this
						}, {
							text : "关闭其它Tab",
							handler : function() {
								this.closeAll(this.getActiveTab());
							},
							scope : this
						}]
			});
			
	Ext.apply(Ext.form.VTypes,{
    password:function(val,field){
       if(field.confirmTo){
           var pwd=Ext.get(field.confirmTo);
           return (val==pwd.getValue());
       }
       return true;
    }
  });

  var newTxt = new Ext.form.TextField({
      fieldLabel: '新密码',
      name: 'newPassword',
      id:'newPassword',
      inputType : 'password',
      allowBlank: false
  });
  
  var againTxt = new Ext.form.TextField({
      fieldLabel: '确认新密码',
      name: 'againPassword',
      id:'againPassword',
      inputType : 'password',
      vtype:"password",
      vtypeText:"两次密码不一致！",
      confirmTo:"newPassword",
      allowBlank: false
  });
			
	var PasswordForm = new Ext.FormPanel({
        frame: true,
        labelAlign: 'right',
        labelWidth: 120,
        width: 450,
        height: 250,
        items: new Ext.form.FieldSet({
            title: '设定新密码',
            autoHeight: true,
            defaults: { width: 200 },
            items: [newTxt, againTxt]
        })
  });
    		
	var SetPasswordWin;
	function handleSetPassword() {
	    SetPasswordWin = new Ext.Window({
	        title: '修改密码',
	        layout: 'fit',
	        width: 500,
	        closeAction: 'hide',
	        height: 300,
	        modal: true,
	        autoDestroy: true,
	        plain: true,
	        items: PasswordForm,
	        buttons: [{
	            text: '确定',
	            handler: SetPassword
	        }, {
	            text: '取消',
	            handler: function() {
	                SetPasswordWin.hide();
	            }
            }]
	        });
	        PasswordForm.form.reset();
	        SetPasswordWin.show(this);
	}
	
	function SetPassword(btn) {
		if (PasswordForm.form.isValid()) {
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

			var formvalue = PasswordForm.form.getValues();
			Ext.Ajax.request({
						url : '/User.mvc/UpdatePassword',
						method : 'POST',
						params : {password:formvalue["newPassword"]},
						callback: function(options, success, response) {
						  btn.disabled = true;
							if (success) { 
								Ext.MessageBox.hide();
								var result = Ext.util.JSON.decode(response.responseText)
								Ext.MessageBox.alert("消息", result.Message);
								SetPasswordWin.hide();
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
						}
					})
		}
	}   
	
	    
	MainPanel.superclass.constructor.call(this, {
		id : 'main',
		region : 'center',
		margins : '0 5 5 0',
		resizeTabs : true,
		minTabWidth : 65,
		tabWidth : 120,
		enableTabScroll : true,
		activeTab : 0,
		items : {
			id : 'homePage',
			title : '桌　面',
			closable : false,
			autoLoad : {
				url : this.homePage
			},
			autoScroll : true,
			tbar : [{
						text : '修改密码',
						handler : handleSetPassword
					  }]
		}
	});
	this.on("contextmenu", function(tabPanel, tab, e) {
				this.menu.showAt(e.getPoint());
			}, this);
};
Ext.extend(MainPanel, Ext.TabPanel);

Ext.onReady(function() {
	Ext.state.Manager.setProvider(new Ext.state.CookieProvider());

	if (Ext.state.Manager.getProvider()) {
		var theme = Ext.state.Manager.get('theme', 'ext-all.css');
		Ext.util.CSS.swapStyleSheet('windows', cssMenu + theme);
	}
	
	function logout() {
	  Ext.Msg.confirm("提示", "是否真的要注销当前用户?", function(btn) {
				if (btn == "yes") {
				  Ext.Ajax.request({
						url : '/User.mvc/Logout',
						method : "POST",
						waitMsg : "请等待!",
						callback: function(options, success, response) {
							if (success) { 
								window.location = '../../Default.aspx';  
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
						}
					});
				}
			});
  }

	header = new Ext.Panel({
				border : true,
				region : 'north',
				layout : 'anchor',
				height : 70,
				items : [{
							xtype : "box",
							border : true,
							el : "header",
							anchor : 'none -23'
						}, new Ext.Toolbar({
									items : ['文章查询:', {
												xtype : "textfield",
												width : 200,
												id : "search"
											}, {
												text : "搜索",
												iconCls : 'btnsearch'
											}, "->", {
												text : "退出",
												iconCls : 'btnwebqq',
												handler : logout
											}, "-", "更换皮肤:", {
												xtype : "combo",
												transform : "skins",
												lazyRender : true,
												editable : false,
												triggerAction : "all",
												listeners : {
													"select" : function(c) {
														changeSkin(c.getValue());
													}
												}
											}]
								})]
			});

	changeSkin = function(value) {
		Ext.util.CSS.swapStyleSheet('theme', cssMenu + value);

		for (var i = 0; i < window.frames.length; i++) {
			var doc = window.frames[i].document;
			var ss = doc.createElement("link");
			ss.setAttribute("rel", "stylesheet");
			ss.setAttribute("type", "text/css");
			ss.setAttribute("id", 'theme');
			ss.setAttribute("href", cssMenu + value);
			doc.getElementsByTagName("head")[0].appendChild(ss);
		}

		if (Ext.state.Manager.getProvider()) {
			Ext.state.Manager.set('theme', value);
		}
	};

    var now = new Date();
	var year = now.getFullYear();
	var month = now.getMonth()+1;
	var day = now.getDate();
	var nowdate = year + "年" + month + "月" + day + "日";
	bottom = new Ext.Toolbar({
				id : "bottom",
				frame : true,
				region : "south",
				height : 25,
				items: [new Ext.Toolbar.Fill(), nowdate]
			});

	main = new MainPanel();
	
	westMenuPanel = new Ext.Panel({
	  height : 470,
		region : 'west',
		title : "目录",
		split : false,// 一个小边缘（分割线）
		width : 200,
		minSize : 175,
		margins : '0 0 0 0',
		collapsible : true,// 可折叠
		defaults : {
			autoScroll : true
		},
		layoutConfig : {
			titleCollapse : true,
			animate : true
		},
		layout : 'accordion'// 折叠式菜单
	});
	
	var response = Ext.lib.Ajax.getConnectionObject().conn;    
  response.open("POST", '/User.mvc/GetMenuRootList', false);    
  response.send(null);   
  var treejsonData = Ext.util.JSON.decode(response.responseText);
    
  for(var m=0; m<treejsonData.length; m++){
    var div_id = treejsonData[m].id + "-tree";
    treejsonData[m].html = "<div id='" + div_id + "' style='overflow:auto;height:100%;'></div>";   
    westMenuPanel.add(treejsonData[m]);     
  }

  var viewport = new Ext.Viewport({
			layout : 'fit',
			items : [{
						id : "desktop",
						layout : "border",
						items : [header, westMenuPanel, main, bottom]
					}]
		});

  for(var i=0;i<treejsonData.length;i++){
    var mdiv_id = treejsonData[i].id + "-tree";

    var paramId = treejsonData[i].id;
    var tree = new Ext.tree.TreePanel({
	    autoShow:true, 
	    autoScroll : true,
	    animate : true,
	    enableDD : true,
	    containerScroll : true,
	    draggable : false,
	    rootVisible : false
    });

    var root=new Ext.tree.AsyncTreeNode({
        id: mdiv_id,
        text: mdiv_id,
        draggable : false
    });
    
    dataUrlName = "/User.mvc/GetMenuNodeList";
    var conn = Ext.lib.Ajax.getConnectionObject().conn;
    conn.open("POST", dataUrlName, false);
    conn.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=UTF-8"); 
    conn.send( "MenuID = " + treejsonData[i].id );
    
    var menuItems = Ext.util.JSON.decode(conn.responseText);
    for(var j=0; j<menuItems.length; j++){
        var node = new Ext.tree.TreeNode({});
        node.singleClickExpand = true;
        node.text = menuItems[j].text;
        node.id = menuItems[j].id;
        node.url = menuItems[j].url;
        node.leaf = menuItems[j].leaf;
        if(menuItems[j].childNodes != null){
          addToTree( node, menuItems[j].childNodes );
        }
        root.appendChild(node);
    }
    
    tree.setRootNode(root);
    
    tree.on("click", function(node) {
		  if (node.leaf) {
			  AddNewTab(node.id, node.text,
					  node.url);
		  }
	  });

    tree.render(mdiv_id);
    root.expand();
    tree.show();
  }
})