var _page = "project";
var info = $("#info").val();
if (info && info != "null") {
	alert(info);
}

function checkNum(obj) {
	var val = obj.value;
	if (isNaN(val)) {
		alert("必须填写数字！");
		$(obj).val("0");
		return false;
	}
}

function setImg(name) {
	var _html = "<img src='/files/" + name + "' style='height:60px;cursor:pointer;' /></a>";
	if ($("#picimg").html() == "") {
		name = name;
	} else {
		name = $("#imgname").val() + ";" + name;
	}
	_html = $("#picimg").html() + _html;
	$("#picimg").html(_html);
	$("#imgname").val(name);
}

function newDoc() {
	$("#proname").val("");
	$("#proaddress").val("");
	$("#salesoffice").val("");
	$("#developer").val("");
	$("#opening").val("");
	$("#others").val("");
	$("#property").val("");
	$("#households").val("");
	$("#parking").val("");
	$("#decoration").val("");
	$("#buildingtype").val("");
	$("#propertytype").val("");
	$("#reference").val("");
	$("#docid").val("0");

	$('#addModal').modal('show');
}

function toPage(i) {
	window.location = "/cms/project?p=" + i;
}

function editDoc(id) {
	//根据id读取字段
	$.ajax({
		type: "POST",
		url: "/" + _page + "/getinfo",
		data: {
			id: id
		},
		success: function(data) {
			$("#proname").val(data[0].proname);
			$("#proaddress").val(data[0].proaddress);
			$("#salesoffice").val(data[0].salesoffice);
			$("#developer").val(data[0].developer);
			$("#opening").val(data[0].opening);
			$("#others").val(data[0].others);
			$("#property").val(data[0].property);
			$("#households").val(data[0].households);
			$("#parking").val(data[0].parking);
			$("#decoration").val(data[0].decoration);
			$("#buildingtype").val(data[0].buildingtype);
			$("#propertytype").val(data[0].propertytype);
			$("#reference").val(data[0].reference);
			$("#docid").val(id);
		}
	});
	$('#addModal').modal('show');
}

function submitDoc() {
	if ($("#docid").val() == "0") {
		//insert
		$.ajax({
			type: "POST",
			url: "/" + _page + "/insert",
			data: {
				proname: $("#proname").val(),
				proaddress: $("#proaddress").val(),
				salesoffice: $("#salesoffice").val(),
				developer: $("#developer").val(),
				opening: $("#opening").val(),
				others: $("#others").val(),
				property: $("#property").val(),
				households: $("#households").val(),
				parking: $("#parking").val(),
				decoration: $("#decoration").val(),
				buildingtype: $("#buildingtype").val(),
				propertytype: $("#propertytype").val(),
				reference: $("#reference").val()
			},
			success: function(data) {
				if (data == 200) {
					$('#addModal').modal('hide');
					window.location.reload();
				}
			}
		});
	} else {
		//update
		$.ajax({
			type: "POST",
			url: "/" + _page + "/update",
			data: {
				proname: $("#proname").val(),
				proaddress: $("#proaddress").val(),
				salesoffice: $("#salesoffice").val(),
				developer: $("#developer").val(),
				opening: $("#opening").val(),
				others: $("#others").val(),
				property: $("#property").val(),
				households: $("#households").val(),
				parking: $("#parking").val(),
				decoration: $("#decoration").val(),
				buildingtype: $("#buildingtype").val(),
				propertytype: $("#propertytype").val(),
				reference: $("#reference").val(),
				docid: $("#docid").val()
			},
			success: function(data) {
				if (data == 200) {
					$('#addModal').modal('hide');
					window.location.reload();
				}
			}
		});
	}
}

function delinfo(id, state) {
	$.confirm({
		title: '请确认',
		content: '是否继续操作？',
		confirm: function() {
			$.ajax({
				type: "POST",
				url: "/" + _page + "/delinfo",
				data: {
					id: id,
					state: state
				},
				success: function(data) {
					if (data == 200) {
						window.location.reload();
					}
				}
			});
		}
	});
}

function setSpecial(id, sepical) {
	$.ajax({
		type: "POST",
		url: "/" + _page + "/setSpecial",
		data: {
			id: id,
			sepical: sepical
		},
		success: function(data) {
			if (data == 200) {
				window.location.reload();
			}
		}
	});
}