CREATE TABLE D_ROLE(
	rol_id char(2) NOT NULL PRIMARY KEY,
	rol_name nvarchar(20)
);
CREATE TABLE D_ASSETS_SCRAP_LOG(
	ast_id nvarchar(30) NOT NULL PRIMARY KEY,
	ast_scr_reason nvarchar(40),
	ast_scr_date datetime
);
CREATE TABLE D_DEPARTMENT(
	dep_id char(8) NOT NULL PRIMARY KEY,
	dep_name nvarchar(20),
	dep_supdep char(8)
);
CREATE TABLE D_USER(
	usr_id char(15) NOT NULL PRIMARY KEY,
	usr_pwd varchar(20),
	usr_name nvarchar(10),
	usr_department char(8),
	usr_role char(2),
	usr_log_flg char(1)
);
CREATE TABLE D_ASSETS_FITTING(
	ast_id nvarchar(30),
	ast_from_dep char(8),
	ast_from_user char(15),
	ast_fit_date datetime,
	ast_fit_reason nvarchar(40)
);
CREATE TABLE D_SUPPLIER_DETAIL(
	sup_id char(6) NOT NULL PRIMARY KEY,
	sup_name nvarchar(30),
	sup_tel nvarchar(12),
	sup_web_addr nvarchar(40),
	sup_addr nvarchar(40),
	sup_person nvarchar(10),
	sup_mobile nvarchar(15),
	sup_service_tel nvarchar(12),
	sup_ope_scope nvarchar(40)
);
CREATE TABLE D_ASSETS(
	ast_id varchar(30) NOT NULL PRIMARY KEY,
	ast_name nvarchar(30),
	ast_model nvarchar(20),
	ast_std nvarchar(8),
	ast_unit char(4),
	ast_depart char(8),
	ast_user char(15),
	ast_class1 char(4),
	ast_class2 char(4),
	ast_state char(4),
	ast_diff char(1),
	ast_fa_id varchar(30),
	ast_buy_date datetime,
	ast_supplier char(6)
);
CREATE TABLE D_ASSETS_APPLY(
	apl_user_id char(8),
	apl_class char(4),
	apl_ast_id varchar(30),
	apl_ast_name nvarchar(50),
	apl_ast_model nvarchar(20),
	apl_ast_std char(3),
	ast_class1 char(4),
	ast_class2 char(4),
	apl_assets_cnt int,
	apl_state char(4),
	apl_reason nvarchar(40)
);
CREATE TABLE D_SUB_ASSETS(
	sub_ast_id varchar(10) NOT NULL PRIMARY KEY,
	sub_ast_name nvarchar(30),
	sub_ast_model nvarchar(20),
	sub_ast_std nvarchar(8),
	sub_ast_unit char(4),
	sub_ast_class1 char(4),
	sub_ast_class2 char(4),
	sub_ast_buy_date datetime,
	sub_ast_supplier char(6),
	sub_ast_cnt int
);
CREATE TABLE D_PERMISSION(
	fuc_id char(3) NOT NULL,
	role_id char(2) NOT NULL,
	per_flg char(1),
 PRIMARY KEY(fuc_id,role_id)
);
CREATE TABLE D_FUNCTION(
	fuc_id char(3) NOT NULL PRIMARY KEY,
	fuc_name nvarchar(20)
);
CREATE TABLE D_MASTER(
	mst_id char(2) NOT NULL,
	bra_mst_id char(4) NOT NULL,
	bra_mst_name nvarchar(20),
 PRIMARY KEY(mst_id,bra_mst_id)
);
insert into D_MASTER(mst_id, bra_mst_id, bra_mst_name) values('01', '0100', N'房屋和建筑');
insert into D_MASTER(mst_id, bra_mst_id, bra_mst_name) values('01', '0200', N'办公设备');
insert into D_MASTER(mst_id, bra_mst_id, bra_mst_name) values('01', '0300', N'动力设备');
insert into D_MASTER(mst_id, bra_mst_id, bra_mst_name) values('01', '0400', N'仪器仪表');
insert into D_MASTER(mst_id, bra_mst_id, bra_mst_name) values('01', '0500', N'制冷设备');
insert into D_MASTER(mst_id, bra_mst_id, bra_mst_name) values('01', '0600', N'通讯设备');
insert into D_MASTER(mst_id, bra_mst_id, bra_mst_name) values('01', '0700', N'运输设备');
insert into D_MASTER(mst_id, bra_mst_id, bra_mst_name) values('02', '0101', N'房产');
insert into D_MASTER(mst_id, bra_mst_id, bra_mst_name) values('02', '0102', N'装修');
insert into D_MASTER(mst_id, bra_mst_id, bra_mst_name) values('02', '0201', N'台式机');
insert into D_MASTER(mst_id, bra_mst_id, bra_mst_name) values('02', '0202', N'笔记本');
insert into D_MASTER(mst_id, bra_mst_id, bra_mst_name) values('02', '0203', N'打印机');
insert into D_MASTER(mst_id, bra_mst_id, bra_mst_name) values('02', '0204', N'复印机');
insert into D_MASTER(mst_id, bra_mst_id, bra_mst_name) values('02', '0205', N'交换机');
insert into D_MASTER(mst_id, bra_mst_id, bra_mst_name) values('02', '0206', N'24口交换机');
insert into D_MASTER(mst_id, bra_mst_id, bra_mst_name) values('02', '0207', N'防火墙');
insert into D_MASTER(mst_id, bra_mst_id, bra_mst_name) values('02', '0208', N'投影仪');
insert into D_MASTER(mst_id, bra_mst_id, bra_mst_name) values('03', '0001', N'库存中');
insert into D_MASTER(mst_id, bra_mst_id, bra_mst_name) values('03', '0002', N'使用中');
insert into D_MASTER(mst_id, bra_mst_id, bra_mst_name) values('03', '0003', N'维修中');
insert into D_MASTER(mst_id, bra_mst_id, bra_mst_name) values('03', '0004', N'已报废');
insert into D_MASTER(mst_id, bra_mst_id, bra_mst_name) values('04', '0001', N'台');
insert into D_MASTER(mst_id, bra_mst_id, bra_mst_name) values('04', '0002', N'只');
insert into D_MASTER(mst_id, bra_mst_id, bra_mst_name) values('04', '0003', N'米');
insert into D_MASTER(mst_id, bra_mst_id, bra_mst_name) values('04', '0004', N'平方米');
insert into D_MASTER(mst_id, bra_mst_id, bra_mst_name) values('04', '0005', N'本');
insert into D_MASTER(mst_id, bra_mst_id, bra_mst_name) values('04', '0006', N'千克');
insert into D_MASTER(mst_id, bra_mst_id, bra_mst_name) values('04', '0007', N'套');
insert into D_MASTER(mst_id, bra_mst_id, bra_mst_name) values('04', '0008', N'个');
insert into D_MASTER(mst_id, bra_mst_id, bra_mst_name) values('04', '0009', N'间');
insert into D_MASTER(mst_id, bra_mst_id, bra_mst_name) values('04', '0010', N'辆');
insert into D_MASTER(mst_id, bra_mst_id, bra_mst_name) values('04', '0011', N'册');
insert into D_MASTER(mst_id, bra_mst_id, bra_mst_name) values('04', '0012', N'行');
insert into D_MASTER(mst_id, bra_mst_id, bra_mst_name) values('04', '0013', N'支');
insert into D_MASTER(mst_id, bra_mst_id, bra_mst_name) values('04', '0014', N'条');
insert into D_MASTER(mst_id, bra_mst_id, bra_mst_name) values('05', '0001', N'增加');
insert into D_MASTER(mst_id, bra_mst_id, bra_mst_name) values('05', '0002', N'退还');
insert into D_MASTER(mst_id, bra_mst_id, bra_mst_name) values('05', '0003', N'报修');
insert into D_MASTER(mst_id, bra_mst_id, bra_mst_name) values('05', '0004', N'报废');
insert into D_MASTER(mst_id, bra_mst_id, bra_mst_name) values('06', '0001', N'已申请');
insert into D_MASTER(mst_id, bra_mst_id, bra_mst_name) values('06', '0002', N'受理中');
insert into D_MASTER(mst_id, bra_mst_id, bra_mst_name) values('06', '0003', N'已解决');