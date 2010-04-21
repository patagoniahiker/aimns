/// <reference path="../../vswd-ext_2.2.js" />
Ext.BLANK_IMAGE_URL = '/Content/Images/s.gif';
var cssMenu = '/Content/Ext/resources/css/';
var main, menu, header, bottom, onlineWindow;
var westMenuPanel;
var navtree;
Ext.QuickTips.init();
function logout() {
	Ext.Msg.confirm("友情提示", "是否真的要注销当前用户?", function(btn) {
				if (btn == "yes") {
				    window.location = '../Login/Login.aspx';
					//Ext.Ajax.request({
								// url :
								// EasyBridge.ClientProxy.RenderUrl('UserAccount',
								// 'Logout'),
								//url : '../../TestDataHandler.ashx?action=Logout',
								//success : function() {
								//	window.location = '../Login/Login.aspx';
								//}
							//});
				}
			});
}

function buildTree() {
	var tree = new Ext.tree.TreePanel({
				el : 'nav-tree',
				autoScroll : true,
				animate : true,
				enableDD : true,
				containerScroll : true,
				draggable : false,
				rootVisible : false
			});
	var rootid = Ext.encode('nav-tree').toString();

	var root = new Ext.tree.AsyncTreeNode({
				text : 'nav-tree',
				draggable : false,
				id : 'nav-tree'
			});

	tree.setRootNode(root);

	root.appendChild(new Ext.tree.TreeNode({
				text : "用户管理",
				id : "1",
				url : "/User.mvc/Index",
				leaf : true
    }));
    
    root.appendChild(new Ext.tree.TreeNode({
        text: "部门管理",
        id: "2",
        url: "/Department.mvc/Index",
        leaf: true
    }));
			
	tree.on("click", function(node) {
				if (node.attributes.leaf) {
					AddNewTab(node.attributes.id, node.attributes.text,
							node.attributes.url);
				}
			});

	tree.render();
	root.expand();
	tree.show();
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
			// if(tab.lazyClose)tab.hide();
			// else
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
						text : '主页',
						handler : function() {
							main.loadUrl(this.homePage);
						},
						scope : this
					}, {
						text : '前进',
						handler : this.forward,
						scope : this
					}, {
						text : '后退',
						handler : this.back,
						scope : this
					}, {
						text : '刷新',
						handler : this.refresh,
						scope : this
					}, {
						text : '消息设置',
						handler : OnlineMessageManager.config,
						scope : OnlineMessageManager
					}, {
						text : '请与我联系',
						handler : function() {
							window
									.open("http://cnblogs.com/lonely7345")
						}
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
												handler : function() {
												    window.location = '../../Default.aspx';  
												}
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
		region : 'west',
		title : "目录",
		split : false,// 一个小边缘（分割线）
		width : 200,
		minSize : 175,
		margins : '0 0 0 0',
		collapsible : true,// 可折叠
		items : [{
			title : '用户管理',
			autoScroll : true,
			border : false,
			iconCls : 'nav',
			html : '<div id="nav-tree" style="overflow:auto;height:100%;border:0px solid c3daf9;"></div>'
		}, {
			title : '基础信息管理',
			html : '<div id="set-tree"></div>',
			border : false,
			autoScroll : true,
			iconCls : 'settings'
		}],
		defaults : {
			autoScroll : true
		},
		layoutConfig : {
			titleCollapse : true,
			animate : true
		},
		layout : 'accordion'// 折叠式菜单
	});

	var viewport = new Ext.Viewport({
				layout : 'fit',
				items : [{
							id : "desktop",
							layout : "border",
							items : [header, westMenuPanel, main, bottom]
						}]
			});
	buildTree();
})