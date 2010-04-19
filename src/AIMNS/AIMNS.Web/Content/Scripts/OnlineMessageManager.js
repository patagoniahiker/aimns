OnlineMessageManager = {
	me : {
		id : "",
		name : ""
	},
	wins : [],
	period : 5000,
	stopRecive : false,
	popMessage : true,
	audioMessage : false,
	picMessage : false,
	config : function() {
		if (!this.configWin)
			this.configWin = new Ext.Window({
				title : "对话信息设置",
				width : 200,
				height : 200,
				closeAction : "hide",
				modal : true,
				items : {
					layout : "form",
					frame : true,
					defaults : {
						labelAlign : "top",
						width : 10
					},
					items : [{
						xtype : "numberfield",
						width : 50,
						minValue : 5000,
						fieldLabel : "刷新周期",
						id : "period",
						value : this.period
					}, {
						xtype : "checkbox",
						fieldLabel : "暂停接收信息",
						id : "pause",
						checked : this.stopRecive
					}, {
						xtype : "checkbox",
						fieldLabel : "自动弹出",
						id : "pop",
						checked : this.popMessage,
						disabled : true
					}, {
						xtype : "checkbox",
						fieldLabel : "声音提示",
						id : "audio",
						checked : this.audioMessage,
						disabled : true
					}, {
						xtype : "checkbox",
						fieldLabel : "闪动图标",
						id : "pic",
						checked : this.picMessage,
						disabled : true
					}]
				},
				buttons : [{
					text : "确定",
					handler : this.saveConfig,
					scope : this
				}, {
					text : "取消",
					handler : function() {
						this.configWin.hide()
					},
					scope : this
				}]
			});
		this.configWin.show()
	},
	saveConfig : function() {
		this.popMessage = this.configWin.findById("pop").getValue();
		this.audioMessage = this.configWin.findById("audio").getValue();
		this.picMessage = this.configWin.findById("pic").getValue();
		this.period = this.configWin.findById("period").getValue();
		if (this.period < 5000) {
			this.period = 5000;
			this.configWin.findById("period").setValue(5000)
		}
		var st = this.configWin.findById("pause").getValue();
		if (st != this.stopRecive) {
			this.stopRecive = st;
			if (this.stopRecive)
				this.stop();
			else
				this.start()
		}
		this.configWin.hide()
	},
	openMessage : function(message) {
		if ((!message.sender && !message.sender.id) || message.status > 0) {
			if (message.id)
				Ext.Ajax.request({
					url : "onlineUser.ejf?cmd=readMessage",
					params : {
						mulitId : message.id
					}
				});
			return
		}
		var winId = "messageWin_" + message.sender.id;
		var msgWin = Ext.getCmp(winId);
		if (msgWin) {
			msgWin.show()
		} else {
			msgWin = new MessageWindow({
				id : winId,
				reciver : message.sender
			});
			if (this.wins.length > 10) {
				this.wins[0].close();
				this.wins.remove(this.wins[0])
			}
			this.wins.push(msgWin);
			msgWin.show()
		}
		if (message.content) {
			var obj = {
				msg : message.content,
				date : message.inputTime,
				user : message.sender,
				cls : "yourMsg"
			};
			msgWin.addMessage(obj);
			if (message.id)
				Ext.Ajax.request({
					url : "onlineUser.ejf?cmd=readMessage",
					params : {
						mulitId : message.id
					}
				})
		}
	},
	loadMessage : function() {
		if (this.me.id && !this.stopRecive) {
			Ext.Ajax.request({
				url : "onlineUser.ejf?cmd=loadMessage",
				callback : function(options, success, response) {
					if (success) {
						var pageList = Ext.decode(response.responseText);
						if (pageList && pageList.rowCount > 0
								&& pageList.result) {
							var list = pageList.result;
							for (var i = 0; i < list.length; i++) {
								this.openMessage(list[i])
							}
						}
					}
					if (!this.stopRecive)
						this.loadMessage.defer(this.period, this)
				},
				scope : this
			})
		}
	},
	start : function() {
		this.stopRecive = false;
		if (this.me.id)
			this.loadMessage.defer(this.period, this);
		else
			this.start.defer(this.period, this)
	},
	stop : function() {
		this.stopRecive = true
	},
	showUserInfo : function(id, name) {
		if (!this.userInfoWin) {
			this.userInfoWin = new Ext.Window({
				title : "查看用户资料",
				width : 250,
				closeAction : "hide",
				autoScroll : true,
				manager : OnlineMessageManager.winMgr,
				height : 200,
				buttons : [{
					text : "更新",
					handler : function() {
						this.refreshUserInfo(id, name)
					},
					scope : this
				}, {
					text : "关闭",
					handler : function() {
						this.userInfoWin.hide()
					},
					scope : this
				}]
			})
		}
		this.userInfoWin.show();
		this.userInfoWin.body.update("正在加载用户信息...");
		this.refreshUserInfo(id, name)
	},
	refreshUserInfo : function(id, name) {
		var params = id ? {
			id : id
		} : {
			name : name
		};
		Ext.Ajax.request({
			url : "onlineUser.ejf?cmd=readUser",
			params : params,
			success : function(response) {
				var ret = Ext.decode(response.responseText);
				var s = "<div>用户名:<b>" + ret.name + "</b></div>";
				s += "<div>登录次数：<b>" + ret.loginTimes + "</b></div>";
				s += "<div>头衔：<b>" + ret.title + "</b></div>";
				var vipStatus = "否";
				if (ret.customerStatus)
					vipStatus = ret.applyTime
							? "<font color=blue>是</font>"
							: "<font color=red>已申请</font>";
				s += "<div>是否VIP：<b>" + vipStatus + "</b></div>";
				if (ret.applyTime)
					s += "<div>VIP申请时间：<b>"
							+ ret.applyTime.format("Y-m-d H:i:s")
							+ "</b></div>";
				if (ret.checkedTime)
					s += "<div>VIP通过时间：<b>"
							+ ret.checkedTime.format("Y-m-d H:i:s")
							+ "</b></div>";
				if (ret.expireTime)
					s += "<div>VIP到期时间：<b>"
							+ ret.expireTime.format("Y-m-d H:i:s")
							+ "</b></div>";
				s += "<div>简介：<b>" + ret.intro + "</b></div>";
				this.userInfoWin.body.update(s)
			},
			scope : this
		})
	},
	winMgr : new Ext.WindowGroup()
};
EmoteSelect = Ext.extend(Ext.Panel, {
	baseUrl : "images/emote/",
	layout : "table",
	layoutConfig : {
		columns : 14
	},
	select : function(img) {
		emoteSelectWin.editor.insertAtCursor("<img src=" + this.baseUrl + img
				+ ">");
		emoteSelectWin.hide()
	},
	initComponent : function() {
		EmoteSelect.superclass.initComponent.call(this);
		for (var i = 0; i < 95; i++)
			this.add({
				xtype : "button",
				cls : "x-btn-icon",
				icon : this.baseUrl + i + ".gif",
				handler : this.select.createDelegate(this, [i + ".gif"]),
				scope : this
			})
	}
});
var emoteSelectWin = new Ext.Window({
	width : 353,
	height : 170,
	modal : true,
	layout : "fit",
	closable : false,
	items : new EmoteSelect()
});
MessageWindow = Ext.extend(Ext.Window, {
	reciver : null,
	autoClose : true,
	title : "发送消息",
	width : 520,
	height : 470,
	minWidth : 300,
	closeAction : "hide",
	iconCls : "im",
	layout : "anchor",
	maximizable : true,
	shim : false,
	animCollapse : false,
	manager : OnlineMessageManager.winMgr,
	constrainHeader : true,
	loadHistory : function() {
	},
	cleanHistory : function() {
		var msgPanel = this.findById("msgArea" + this.reciver.id);
		msgPanel.body.update("")
	},
	addMessage : function(obj) {
		var msgPanel = this.findById("msgArea" + this.reciver.id);
		var m = "<div><div class='" + obj.cls + "'><b>" + obj.user.name
				+ "</b>(" + obj.user.id + ")　" + obj.date.format("Y-m-d H:i:s")
				+ "</div><div>　";
		m += obj.msg + "</div></div>";
		msgPanel.body.insertHtml("beforeEnd", m);
		msgPanel.body.scroll("bottom", 100)
	},
	sendMessage : function() {
		var msg = this.findById("editor" + this.reciver.id);
		var m = msg.getValue();
		if (m != "") {
			if (!msg.isValid())
				return;
			var obj = {
				msg : m,
				date : new Date(),
				user : OnlineMessageManager.me,
				cls : "myMsg"
			};
			Ext.Ajax.request({
				url : "onlineUser.ejf?cmd=sendMessage",
				params : {
					reciver : this.reciver.id,
					content : m
				},
				success : function() {
				},
				failure : function() {
				}
			});
			this.addMessage(obj);
			this.lastMsg = m;
			msg.setValue("");
			if (this.autoClose)
				this.hide()
		}
		msg.focus()
	},
	initComponent : function() {
		this.tbar = [this.reciver.name, {
			text : "查看资料",
			handler : OnlineMessageManager.showUserInfo.createDelegate(
					OnlineMessageManager, [this.reciver.id])
		}, {
			text : "加为好友"
		}];
		this.title = "与" + this.reciver.name + "对话";
		if (this.reciver) {
			this.id = "message" + this.reciver.id
		}
		MessageWindow.superclass.initComponent.call(this);
		this.add({
			anchor : "100% 60%",
			layout : "fit",
			items : {
				id : "msgArea" + this.reciver.id,
				autoScroll : true,
				tbar : this.tbar
			}
		});
		this.editor = new ChatEditor({
			id : "editor" + this.reciver.id,
			name : "editor" + this.reciver.id,
			maxLength : 2000,
			listeners : {
				"activate" : function() {
				}
			},
			keys : [{
				key : Ext.EventObject.ENTER,
				ctrl : true,
				fn : this.sendMessage,
				scope : this
			}, {
				key : 's',
				alt : true,
				fn : this.sendMessage,
				scope : this
			}, {
				key : 'cx',
				alt : true,
				fn : function() {
					this.hide()
				},
				scope : this
			}]
		});
		this.add({
			anchor : "100% 40%",
			tbar : [{
				text : "聊天记录",
				handler : this.loadHistory,
				scope : this
			}, {
				text : "清空记录",
				handler : this.cleanHistory,
				scope : this
			}, {
				text : "传递附件"
			}, "是否自动关闭", {
				xtype : "checkbox",
				checked : this.autoClose,
				listeners : {
					"check" : function(c, chk) {
						this.autoClose = chk
					},
					scope : this
				}
			}],
			layout : "fit",
			items : this.editor,
			buttons : [{
				text : "发送",
				handler : this.sendMessage,
				scope : this
			}, {
				text : "关闭",
				handler : function() {
					this.hide()
				},
				scope : this
			}]
		})
	},
	listeners : {
		"show" : function(win) {
			var c = Ext.getCmp("editor" + this.reciver.id);
			c.getEditorBody().focus();
			Ext.get(c.getEditorBody()).on("focus", function() {
				this.show()
			}, this)
		}
	}
});
HTMLEditor = Ext.extend(Ext.form.HtmlEditor, {
	codeStyle : '<br/><pre style="border-right: #999999 1px dotted; padding-right: 5px; border-top: #999999 1px dotted; padding-left: 5px; font-size: 12px; padding-bottom: 5px; margin-left: 10px; border-left: #999999 1px dotted; margin-right: 10px; padding-top: 5px; border-bottom: #999999 1px dotted; background-color: #eeeeee">{0}</pre><br/>',
	onRender : function(ct, position) {
		HTMLEditor.superclass.onRender.call(this, ct, position);
		if (this.keys) {
			if (!this.keys.length) {
				this.keyMap = new Ext.KeyMap(this.getEditorBody(), this.keys)
			} else {
				this.keyMap = new Ext.KeyMap(this.getEditorBody(), this.keys[0]);
				for (var i = 1; i < this.keys.length; i++)
					this.keyMap.addBinding(this.keys[i])
			}
			this.keyMap.stopEvent = true
		}
	},
	showEmoteSelect : function() {
		emoteSelectWin.editor = this;
		emoteSelectWin.show()
	},
	addImage : function() {
		function insertImage() {
			var editor = this;
			win.upload(function(ret) {
				if (ret) {
					s = "<br/><img src=" + ret.path;
					if (ret.width)
						s += " width=" + ret.width;
					if (ret.height)
						s += " height=" + ret.height;
					s += " /><br/>";
					editor.insertAtCursor(s);
					win.close()
				}
			})
		};
		var win = new UploadImageWindow({
			modal : true,
			buttons : [{
				text : "确定",
				handler : insertImage,
				scope : this
			}, {
				text : "取消",
				handler : function() {
					win.close()
				}
			}]
		});
		win.show()
	},
	addCode : function() {
		function insertCode() {
			var value = win.getComponent("codes").getValue();
			this.insertAtCursor(String.format(this.codeStyle, value));
			win.close()
		};
		var win = new Ext.Window({
			title : "添加代码",
			width : 500,
			height : 300,
			modal : true,
			layout : "fit",
			items : {
				xtype : "textarea",
				id : "codes"
			},
			buttons : [{
				text : "确定",
				handler : insertCode,
				scope : this
			}, {
				text : "取消",
				handler : function() {
					win.close()
				}
			}]
		});
		win.show()
	},
	createToolbar : function(editor) {
		HTMLEditor.superclass.createToolbar.call(this, editor);
		this.tb.insertButton(16, {
			cls : "x-btn-icon",
			icon : "images/img.jpg",
			handler : this.addImage,
			scope : this
		});
		this.tb.insertButton(17, {
			cls : "x-btn-icon",
			icon : "images/code.jpg",
			handler : this.addCode,
			scope : this
		});
		this.tb.insertButton(18, {
			cls : "x-btn-icon",
			icon : "images/emote/main.jpg",
			handler : this.showEmoteSelect,
			scope : this
		})
	},
	validateValue : function(value) {
		if (value.length > this.maxLength) {
			var s = String.format(this.maxLengthText, this.maxLength);
			this.markInvalid(s);
			return false
		}
		return true
	}
});
Ext.reg('myhtmleditor', HTMLEditor);
ChatEditor = Ext.extend(HTMLEditor, {
	enableFont : false,
	maxLength : 1000,
	maxLengthText : "The maximum length for this field is {0}",
	onRender : function(ct, position) {
		ChatEditor.superclass.onRender.call(this, ct, position);
		if (this.keys) {
			if (!this.keys.length) {
				this.keyMap = new Ext.KeyMap(this.getEditorBody(), this.keys)
			} else {
				this.keyMap = new Ext.KeyMap(this.getEditorBody(), this.keys[0]);
				for (var i = 1; i < this.keys.length; i++)
					this.keyMap.addBinding(this.keys[i])
			}
			this.keyMap.stopEvent = true
		}
	},
	validateValue : function(value) {
		if (value.length > this.maxLength) {
			var s = String.format(this.maxLengthText, this.maxLength);
			this.markInvalid(s);
			return false
		}
		return true
	}
});
OnlineUserWindow = Ext.extend(Ext.Window, {
	title : "在线用户",
	width : 200,
	height : 500,
	closeAction : "hide",
	minWidth : 100,
	iconCls : "im",
	maximizable : true,
	minimizable : true,
	shim : false,
	animCollapse : false,
	constrainHeader : true,
	show : function() {
		if (!this.isVisible()) {
			OnlineUserWindow.superclass.show.call(this);
			this.refreshUser()
		}
	},
	minimize : function() {
		this.hide()
	},
	render : function() {
		OnlineUserWindow.superclass.render.apply(this, arguments);
		this.setPosition(720, 60)
	},
	layout : "accordion",
	layoutConfig : {
		hideCollapseTool : true
	},
	refreshUser : function() {
		this.findById("userList1").root.reload();
		this.findById("userList2").root.reload();
		this.findById("resentUser").root.reload()
	},
	chat : function(node) {
		if (node.id.indexOf("ext") < 0) {
			if (node.attributes.login && node.id != OnlineMessageManager.me.id) {
				var obj = {
					sender : {
						id : node.id,
						name : node.text
					}
				};
				OnlineMessageManager.openMessage(obj)
			}
		}
	},
	initComponent : function() {
		this.tbar = [{
			text : "刷新",
			handler : this.refreshUser,
			scope : this
		}, "-", "查找"];
		OnlineUserWindow.superclass.initComponent.call(this);
		this.add({
			title : "在线用户",
			layout : "fit",
			collapsed : true,
			items : {
				id : "userList1",
				xtype : "treepanel",
				autoScroll : true,
				clearOnLoad : false,
				rootVisible : false,
				lines : false,
				loader : new Ext.tree.TreeLoader({
					url : "onlineUser.ejf?cmd=list&pageSize=-1&treeData=true"
				}),
				root : new Ext.tree.AsyncTreeNode({
					text : "根"
				}),
				listeners : {
					"render" : function(tree) {
						tree.root.expand()
					},
					"dblclick" : this.chat,
					scope : this
				}
			}
		});
		this.add({
			title : "最近联系人",
			layout : "fit",
			collapsed : true,
			items : {
				id : "resentUser",
				xtype : "treepanel",
				autoScroll : true,
				clearOnLoad : false,
				rootVisible : false,
				lines : false,
				loader : new Ext.tree.TreeLoader({
					url : "onlineUser.ejf?cmd=recentChatUser"
				}),
				root : new Ext.tree.AsyncTreeNode({
					text : "根"
				}),
				listeners : {
					"render" : function(tree) {
						tree.root.expand()
					},
					"dblclick" : this.chat,
					scope : this
				}
			}
		});
		this.add({
			title : "顾问团队",
			layout : "fit",
			items : {
				id : "userList2",
				xtype : "treepanel",
				autoScroll : true,
				rootVisible : false,
				lines : false,
				loader : new Ext.tree.TreeLoader({
					url : "onlineUser.ejf?cmd=loadUser"
				}),
				root : new Ext.tree.AsyncTreeNode({
					text : "根"
				}),
				listeners : {
					"render" : function(tree) {
						tree.root.expand()
					},
					"dblclick" : this.chat,
					scope : this
				}
			}
		})
	}
});
MettingManager = {};
Ext.apply(MettingManager, OnlineMessageManager);
Ext.apply(MettingManager, {
	currentWin : null,
	removeMetting : function(id) {
		Ext.Ajax.request({
			url : "chatRoom.ejf?cmd=remove&id=" + id,
			success : function(response, options) {
				var obj = Ext.decode(response.responseText);
				if (!obj) {
					Ext.Msg.alert("提示!", "您没有删除在线课堂的权限!")
				} else
					Ext.Msg.alert("提示!", "删除成功!")
			},
			scope : this
		})
	},
	stopMetting : function(id) {
		Ext.Ajax.request({
			url : "chatRoom.ejf?cmd=close&id=" + id,
			success : function(response, options) {
				var obj = Ext.decode(response.responseText);
				if (!obj) {
					Ext.Msg.alert("提示!", "您没有关闭在线课堂的权限!")
				} else
					Ext.Msg.alert("提示!", "操作成功!")
			},
			scope : this
		})
	},
	startMetting : function(id) {
		Ext.Ajax.request({
			url : "chatRoom.ejf?cmd=start&id=" + id,
			success : function(response, options) {
				var obj = Ext.decode(response.responseText);
				if (!obj) {
					Ext.Msg.alert("提示!", "您没有启动在线课堂的权限!")
				} else
					Ext.Msg.alert("提示!", "操作成功!")
			},
			scope : this
		})
	},
	joinMeeting : function(id) {
		var winId = "messageWin_" + id;
		var msgWin = Ext.getCmp(winId);
		if (msgWin) {
			msgWin.show();
			return
		}
		Ext.Ajax.request({
			url : "chat.ejf?cmd=main&id=" + id,
			success : function(response, options) {
				var obj = Ext.decode(response.responseText);
				if (obj.success) {
					this.openMessage.call(MettingManager, {
						room : obj.data
					})
				} else {
					Ext.Msg.alert("提示", obj.errors.msg)
				}
			},
			scope : this
		})
	},
	openMessage : function(message) {
		var winId = "messageWin_" + message.room.id;
		var msgWin = Ext.getCmp(winId);
		if (msgWin) {
			msgWin.show()
		} else {
			msgWin = new MettingMessageWindow({
				id : winId,
				room : message.room
			});
			if (this.wins.length > 10) {
				this.wins[0].close();
				this.wins.remove(this.wins[0])
			}
			this.wins.push(msgWin);
			msgWin.show();
			if (msgWin.firstLoad) {
				msgWin.loadMessage.call(msgWin);
				msgWin.announce.body.update(message.room.announce);
				if (message.room.beginTime)
					msgWin.beginTime.el.innerHTML = "<font color=blue>"
							+ message.room.beginTime + "</font>";
				if (message.room.endTime)
					msgWin.endTime.el.innerHTML = "<font color=blue>"
							+ message.room.endTime + "</font>";
				if (message.room.teacher)
					msgWin.teacher.el.innerHTML = "<font color=blue>"
							+ message.room.teacher + "</font>";
				msgWin.firstLoad = false
			}
		}
		if (message.content) {
			var obj = {
				msg : message.content,
				date : message.vdate,
				reciver : message.reciver,
				user : {
					name : message.sender,
					id : message.sender
				},
				cls : message.sender == OnlineMessageManager.me.name
						? "myMsg"
						: "yourMsg"
			};
			msgWin.addMessage(obj);
			msgWin.lastReadId = message.id
		}
	},
	talkTo : function(name) {
		if (this.currentWin) {
			this.currentWin.msgTarget.el.innerHTML = "<font color=blue>" + name
					+ "</font>";
			this.currentWin.allPerson.setDisabled(false);
			this.currentWin.reciver = name
		}
	},
	showUserInfo : function(name) {
		var fn = OnlineMessageManager.showUserInfo.createDelegate(
				OnlineMessageManager, [null, name]);
		fn()
	},
	winMgr : new Ext.WindowGroup()
});
MettingMessageWindow = Ext.extend(Ext.Window, {
	reciver : "所有人",
	firstLoad : true,
	room : {},
	autoClose : false,
	haveExit : false,
	lastReadId : -1,
	manager : MettingManager.winMgr,
	title : "会议室",
	width : 780,
	height : 540,
	layout : "border",
	minWidth : 300,
	closeAction : "hide",
	iconCls : "im",
	maximizable : true,
	minimizable : true,
	shim : false,
	animCollapse : false,
	constrainHeader : true,
	showMessage : function(ret) {
		var msgList = ret.msgList;
		if (msgList && msgList.length > 0) {
			for (var i = 0; i < msgList.length; i++) {
				var m = msgList[i];
				Ext.apply(m, {
					room : {
						id : m.roomId
					}
				});
				MettingManager.openMessage(m);
				if (i == msgList.length - 1)
					this.lastReadId = m.id
			}
		}
		var userList = ret.userList;
		if (userList && userList.length > 0) {
			while (this.onlineList.root.firstChild)
				this.onlineList.root.firstChild.remove();
			for (var i = 0; i < userList.length; i++) {
				this.onlineList.root.appendChild(new Ext.tree.TreeNode({
					text : userList[i].userName,
					icon : "images/user.gif"
				}))
			}
		}
	},
	loadMessage : function() {
		if (OnlineMessageManager.me.id && !OnlineMessageManager.stopRecive
				&& !this.haveExit) {
			Ext.Ajax.request({
				url : "chat.ejf?cmd=recive",
				params : {
					id : this.room.id,
					lastReadId : this.lastReadId
				},
				callback : function(options, success, response) {
					if (success) {
						var ret = Ext.decode(response.responseText);
						if (ret && ret.msgList && ret.msgList.length > 0) {
							this.showMessage(ret)
						}
					}
					if (!OnlineMessageManager.stopRecive)
						this.loadMessage.defer(OnlineMessageManager.period,
								this)
				},
				scope : this
			})
		}
	},
	loadHistory : function() {
	},
	exit : function() {
		Ext.Msg.confirm("请确认", "真的要退出当前课堂吗？", function(btn) {
			if (btn == "yes") {
				Ext.Ajax.request({
					url : "chat.ejf?cmd=exit&id=" + this.room.id,
					success : function(response) {
						this.haveExit = true;
						this.close();
						MettingManager.wins.remove(this)
					},
					scope : this
				})
			}
		}, this)
	},
	cleanHistory : function() {
		var msgPanel = this.findById("msgArea" + this.room.id);
		msgPanel.body.update("")
	},
	addMessage : function(obj) {
		var msgPanel = this.findById("msgArea" + this.room.id);
		var m = "<div><div class='" + obj.cls
				+ "'><span onclick='MettingManager.talkTo(\"" + obj.user.name
				+ "\")' ondblclick='MettingManager.showUserInfo(\""
				+ obj.user.name + "\")' style='cursor:pointer'><b>"
				+ obj.user.name
				+ "</b></span> 对 <span onclick='MettingManager.talkTo(\""
				+ obj.reciver
				+ "\")' ondblclick='MettingManager.showUserInfo(\""
				+ obj.reciver + "\")' style='cursor:pointer'><b>" + obj.reciver
				+ "</b></span>　" + obj.date.format("Y-m-d H:i:s")
				+ "</div><div>　";
		m += obj.msg + "</div></div>";
		msgPanel.body.insertHtml("beforeEnd", m);
		msgPanel.body.scroll("bottom", 100)
	},
	sendMessage : function() {
		var msg = this.findById("editor" + this.room.id);
		var m = msg.getValue();
		if (m != "") {
			if (!msg.isValid())
				return;
			var obj = {
				msg : m,
				date : new Date(),
				user : OnlineMessageManager.me,
				cls : "myMsg"
			};
			Ext.Ajax.request({
				url : "chat.ejf?cmd=send",
				params : {
					id : this.room.id,
					reciver : this.reciver,
					lastReadId : this.lastReadId,
					content : m
				},
				scope : this,
				success : function(response, options) {
					var ret = Ext.decode(response.responseText);
					this.showMessage(ret)
				},
				failure : function() {
				}
			});
			this.lastMsg = m;
			msg.setValue("");
			if (this.autoClose)
				this.hide()
		}
		msg.focus()
	},
	initComponent : function() {
		this.beginTime = new Ext.Toolbar.TextItem("<font color=blue>未知</font>");
		this.endTime = new Ext.Toolbar.TextItem("<font color=blue>未知</font>");
		this.teacher = new Ext.Toolbar.TextItem("<font color=blue>Vifir顾问</font>");
		this.tbar = ["主讲:", this.teacher, {
			text : "查看详情"
		}, "-", "开始时间:", this.beginTime, "-", "结束时间:", this.endTime, "->", {
			text : "申请发言",
			disabled : true
		}, {
			text : "退出课堂",
			handler : this.exit,
			scope : this
		}];
		this.title = "Vifir在线课堂：" + this.room.title;
		if (this.room) {
			this.id = "message" + this.room.id
		}
		MettingMessageWindow.superclass.initComponent.call(this);
		this.onlineList = new Ext.tree.TreePanel({
			title : "参与人员",
			height : "100%",
			autoScroll : true,
			root : new Ext.tree.TreeNode(),
			rootVisible : false,
			lines : false
		});
		this.onlineList.on("click", function(node) {
			this.msgTarget.el.innerHTML = "<font color=blue>" + node.text
					+ "</font>";
			this.allPerson.setDisabled(false);
			this.reciver = node.text
		}, this);
		this.announce = new Ext.Panel({
			title : "课堂公告",
			html : "",
			anchor : "100% 30%"
		});
		this.historyList = new Ext.tree.TreePanel({
			title : "会议记录",
			height : "100%",
			autoScroll : true,
			root : new Ext.tree.AsyncTreeNode(),
			loader : new Ext.tree.TreeLoader({
				url : "chatRoom.ejf?cmd=listHistory&id=" + this.room.id
			}),
			rootVisible : false
		});
		this.historyList.on("click", function(node) {
			if (!node.attributes.dir) {
				window
						.open("chatRoom.ejf?cmd=showHistory&id=" + this.room.id
								+ "&fileName=" + node.parentNode.text + "/"
								+ node.text)
			}
		}, this);
		this.left = new Ext.Panel({
			region : "east",
			width : 180,
			layout : "anchor",
			items : [this.announce, {
				xtype : "tabpanel",
				anchor : "100% 70%",
				activeTab : 0,
				items : [this.onlineList, this.historyList]
			}]
		});
		this.center = new Ext.Panel({
			region : "center",
			layout : "anchor"
		});
		this.center.add({
			anchor : "100% 60%",
			layout : "fit",
			items : {
				id : "msgArea" + this.room.id,
				autoScroll : true,
				tbar : this.tbar
			}
		});
		this.editor = new ChatEditor({
			id : "editor" + this.room.id,
			name : "editor" + this.room.id,
			maxLength : 2000,
			listeners : {
				"activate" : function() {
				}
			},
			keys : [{
				key : Ext.EventObject.ENTER,
				ctrl : true,
				fn : this.sendMessage,
				scope : this
			}, {
				key : 's',
				alt : true,
				fn : this.sendMessage,
				scope : this
			}, {
				key : 'cx',
				alt : true,
				fn : function() {
					this.hide()
				},
				scope : this
			}]
		});
		this.msgTarget = new Ext.Toolbar.TextItem("<font color=blue>所有人</font>");
		this.allPerson = new Ext.Toolbar.Button({
			text : "所有人",
			disabled : true,
			handler : function() {
				this.msgTarget.el.innerHTML = "<font color=blue>所有人</font>";
				this.allPerson.setDisabled(true);
				this.reciver = "所有人"
			},
			scope : this
		});
		this.center.add({
			frame : true,
			anchor : "100% 40%",
			tbar : [{
				text : "清空记录",
				handler : this.cleanHistory,
				scope : this
			}, "-", {
				text : "传递附件",
				disabled : true
			}, "是否自动关闭", {
				xtype : "checkbox",
				checked : this.autoClose,
				listeners : {
					"check" : function(c, chk) {
						this.autoClose = chk
					},
					scope : this
				}
			}, "-", "发言对象：", this.msgTarget, this.allPerson],
			layout : "fit",
			items : this.editor,
			buttons : [{
				text : "发送",
				handler : this.sendMessage,
				scope : this
			}, {
				text : "关闭",
				handler : function() {
					this.hide()
				},
				scope : this
			}]
		});
		this.add(this.center);
		this.add(this.left)
	},
	listeners : {
		"show" : function(win) {
			var c = Ext.getCmp("editor" + this.room.id);
			c.getEditorBody().focus();
			MettingManager.currentWin = this;
			Ext.get(c.getEditorBody()).on("focus", function() {
				this.show()
			}, this)
		}
	}
});
Ext.data.DWRProxy = function(fn) {
	Ext.data.DWRProxy.superclass.constructor.call(this);
	this.fn = fn
};
Ext.extend(Ext.data.DWRProxy, Ext.data.DataProxy, {
	load : function(params, reader, callback, scope, arg) {
		params = params || {};
		if (this.fireEvent("beforeload", this, params) !== false) {
			var proxy = this;
			this.fn(params, function(ret) {
				var result;
				try {
					result = reader.readRecords(ret)
				} catch (e) {
					this.fireEvent("loadexception", this, arg, null, e);
					callback.call(scope, null, arg, false);
					return
				}
				callback.call(scope, result, arg, true)
			})
		}
	}
});
Ext.data.DWRStore = function(c) {
	Ext.data.DWRStore.superclass.constructor.call(this, Ext.apply(c, {
		proxy : c.fn ? new Ext.data.DWRProxy(c.fn) : undefined,
		reader : new Ext.data.JsonReader(c, c.fields)
	}))
};
Ext.extend(Ext.data.DWRStore, Ext.data.Store);
