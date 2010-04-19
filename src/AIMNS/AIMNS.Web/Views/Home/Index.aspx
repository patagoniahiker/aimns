<%@ Page Language="C#" MasterPageFile="~/Views/Shared/Site.Master" AutoEventWireup="true" CodeBehind="Index.aspx.cs" Inherits="AIMNS.Web.Views.Home.Index" %>

<asp:Content ID="head" ContentPlaceHolderID="HeadContextPlaceHolder" runat="server">

    <script src="../../../Content/Scripts/miframe.js" type="text/javascript"></script>

    <script src="../../../Content/Scripts/OnlineMessageManager.js" type="text/javascript"></script>

    <script src="../../../Content/Scripts/Protal.js" type="text/javascript"></script>

    <script type="text/javascript" src="/Views/Home/Home.js"></script>

</asp:Content>
<asp:Content ID="main" ContentPlaceHolderID="MainContentPlaceHolder" runat="server">
    <div id="header" style="background-color: #1C3A71">
    </div>
    <select id="skins" style="display: none">
        <option value="xtheme-slate.css">默认风格</option>
        <option value="ext-all.css">海蓝风格</option>
        <option value="xtheme-gray.css">银白风格</option>
        <option value="xtheme-purple.css">浅紫风格</option>
        <option value="xtheme-olive.css">草绿风格</option>
        <option value="xtheme-darkgray.css">灰色风格</option>
        <option value="xtheme-black.css">黑色风格</option>
        <option value="xtheme-green.css">青绿风格</option>
        <option value="xtheme-indigo.css">靛青风格</option>
        <option value="xtheme-silverCherry.css">银红风格</option>
    </select>
    <div id="north">
    </div>
    <div id="center">
    </div>
</asp:Content>
