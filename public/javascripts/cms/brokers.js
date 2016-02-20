var _page = "brokers";
var info = $("#info").val();
if (info && info != "null") {
	alert(info);
}

function setImg(name) {
	var _html = "<img src='/files/" + name + "' style='height:60px;cursor:pointer;' /></a>";
	$("#picimg").html(_html);
	$("#imgname").val(name);
}

function newDoc() {
	$("#name").val("");
	$("#job").val("");
	$("#store").val("");
	$("#tel").val("");
	$("#plate").val("");
	$("#keycell").val("");
	$("#history").val("");
	$("#selfrating").html("");
	$("#imgname").val("");
	$("#picimg").html("");
	$("#docid").val("0");
	$('#addModal').modal('show');
}

function checkNum(obj) {
	var val = obj.value;
	console.log(val);
	if (isNaN(val)) {
		alert("必须填写数字！");
		$(obj).val("0");
		return false;
	}
}

function toPage(i) {
	window.location = "/cms/brokers?p=" + i;
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
			$("#name").val(data[0].name);
			$("#job").val(data[0].job);
			$("#history").val(data[0].history);
			$("#store").val(data[0].store);
			$("#tel").val(data[0].tel);
			$("#plate").val(data[0].plate);
			$("#keycell").val(data[0].keycell);
			$("#selfrating").html(data[0].selfrating);
			$("#picimg").html("");
			$("#imgname").val("");
			setImg(data[0].img);
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
				name: $("#name").val(),
				job: $("#job").val(),
				history: $("#history").val(),
				store: $("#store").val(),
				tel: $("#tel").val(),
				plate: $("#plate").val(),
				keycell: $("#keycell").val(),
				selfrating: $("#selfrating").val(),
				img: $("#imgname").val()
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
				name: $("#name").val(),
				job: $("#job").val(),
				history: $("#history").val(),
				store: $("#store").val(),
				tel: $("#tel").val(),
				plate: $("#plate").val(),
				keycell: $("#keycell").val(),
				selfrating: $("#selfrating").val(),
				img: $("#imgname").val(),
				docid: $("#docid").val(),
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

function delinfo(id) {
	$.confirm({
		title: '请确认',
		content: '是否确认删除？',
		confirm: function() {
			$.ajax({
				type: "POST",
				url: "/" + _page + "/delinfo",
				data: {
					id: id
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