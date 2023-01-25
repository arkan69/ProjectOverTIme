$(document).ready(function () {
    table = $("#table_splk").DataTable({
        ajax: {
            "url": "https://localhost:7092/api/Splks/",
            "dataType": "Json",
            "dataSrc": ""
        },
        columns: [
            {
                "data": "id",
                render: function (data, type, row, meta) {
                    return meta.row + meta.settings._iDisplayStart + 1;
                }
            },
            {
                "data": "nik"
            },
            {
                "data": null,
                render: function (data, type, row, meta) {
                    if (row['overtimeType'] == 0) {
                        return "Kerja"
                    } else {
                        return "Libur"
                    }
                }
            },
            {
                "data": null,
                render: function (data, type, row, meta) {
                    var startdate = row['startDate'];
                    var tmp = new Date(startdate);
                    return ((tmp.getMonth() > 8) ? (tmp.getMonth() + 1) : ('0' + (tmp.getMonth() + 1))) + '/' + ((tmp.getDate() > 9) ? tmp.getDate() : ('0' + tmp.getDate())) + '/' + tmp.getFullYear();
                }
            },
            {
                "data": null,
                render: function (data, type, row, meta) {
                    var start_time = row['startDate'];
                    var tmp = Waktu(start_time);
                    return tmp;
                }
            },
            {
                "data": null,
                render: function (data, type, row, meta) {
                    var end_time = row['endDate'];
                    var tmp = Waktu(end_time);
                    return tmp;
                }
            },
            {
                "data": "description"
            },
            {
                "data": null,
                render: function (data, type, row, meta) {
                    switch (row['status']) {
                        case 0:
                            return "Pending"
                            break;
                        case 1:
                            return "Refuse"
                            break;
                        case 2:
                            return "Approved"
                            break;
                        default:
                            return "Done"
                    }

                }
            },
            {
                "data": null,
                "render": function (data, type, row) {
                    var getNik = row['id'];
                    return `<div class="btn-group">
                                    <button type="button" class="btn btn-sm btn-circle btn-primary" data-bs-toggle="modal" onclick="detailSplk('${getNik}')" data-bs-target="#detailModal">
                                        <span class="fas fa-magnifying-glass"></span>
                                    </button>
                                    &nbsp;
                                    <button type="button" class="btn btn-sm btn-circle btn-warning" data-bs-toggle="modal" onclick="updateSplk('${getNik}')" >
                                        <span class="fas fa-edit"></span>
                                    </button>
                                    &nbsp;
                                    <button type="button" class="btn btn-sm btn-circle btn-danger" onclick="Delete('${getNik}')" ">
                                        <span class="fas fa-trash"></span>
                                    </button>
                                </div>
                            `;
                },
                "orderable": false
            }
        ],

        dom: '<"top"Blf>rtip',
        buttons: [

            {
                extend: 'excelHtml5',
                className: 'btn btn-success mb-3',
                exportOptions: {
                    columns: [0, 1, 2, 3, 4, 5, 6, 7, 8]
                }
            },
            {
                extend: 'csvHtml5',
                className: 'btn btn-warning mb-3',
                exportOptions: {
                    columns: [0, 1, 2, 3, 4, 5, 6, 7, 8]
                }
            },
            {
                extend: 'pdfHtml5',
                className: 'btn btn-info mb-3',
                exportOptions: {
                    columns: [0, 1, 2, 3, 4, 5, 6, 7, 8]
                }
            }
        ]
    });
});


// Action Function Insert & Update
$("#btnSaveSplk").click(function (e) {
    e.preventDefault();
    //if ($("#form").valid()) {
        var data_action = $(this).attr("data-name");
        if (data_action == "insert") {
            console.log("INI INSERT");
            Insert();
        } else if (data_action == "update") {
            console.log("INI UPDATE");
            UpdatePostEmployee();
        }
    //}
});

// Clear Modal Insert Employee
function InsertSplk() {
    //$('#labelText').html("Create New Employee");
    //$('#nik').val("");
    //$('#nik').removeAttr('readonly');
    //$('#firstName').val("");
    //$('#lastName').val("");
    //$('#email').val("");
    //$('#phone').val("");
    //$('#salary').val("");
    //$("[name=gender]").attr('checked', false);
    //$('#birthDate').val("");
    $('#btnSaveSplk').attr('data-name', 'insert').html("<span class='fas fa-save'>&nbsp;</span>Save");
};

//INSERT NEW 1
function Insert() {

    var fd = new FormData();
    fd.append('nik', $("#nik").val())
    fd.append('file', $('#buktifile')[0].files[0]);

    //var obj = new FormData();
    //obj.NIK = $("#nik").val();
    //obj.OvertimeType = $("#jenislembur").val();
    //obj.StartDate = $("#tglmulai").val();
    //obj.EndDate = $("#tglmulai").val();
    //obj.Description = $("#deskripsi").val();
    //obj.file = $('#buktifile')[0].files[0];
    //console.log(obj);

    $.ajax({
        url: "../Splk/SplkForm",
        type: "POST",
        data: fd,
        processData: false,
        contentType: false,
    }).done((result) => {
        console.log(result);
        Swal.fire(
            'Success',
            "Data Berhasil ditambahkan",
            'success'
        )
    })
}

//UPDATE
function detailSplk(key) {
    console.log(key);
    $.ajax({
        url: 'https://localhost:7092/api/Splks/' + key
    }).done((result) => {
        console.log(result);
        //$('.createEmployee').modal('show');
        //$('#exampleModalLabel').html("Detail SPLK");
        $('#detailnik').prop('readonly', true);
        $('#detailnik').val(result.data.nik).readonly;
        if (result.data.overtimeType == 0) {
            $('#detailjenislembur').val("Kerja");
        } else {
            $('#detailjenislembur').val("Libur");
        }

        startdate_modified = Tanggal(result.data.startDate);
        $('#detailtglmulai').val(startdate_modified);

        st_modified = Waktu(result.data.startDate);
        $('#detailjammulai').val(st_modified);

        ed_modified = Waktu(result.data.endDate);
        $('#detailjamselesai').val(ed_modified);
        $('#detaildeskripsi').val(result.data.description);
        //$("#imagepreview").append("<img src='" + result.data.proofOvertime.imageBase64 + "' alt='' class='img-fluid'>");
        imgElem.setAttribute('src', "data:image/jpg;base64," + result.data.proofOvertime);
        //$('#salary').val(result.data.salary);
        //$("[name=gender][value=" + result.data.gender + "]").attr('checked', 'checked'); //setvalue
       
        //$('#btnInsertEmployee').attr('data-name', 'update').html("<span class='fas fa-save'>&nbsp;</span>Update");

    }).fail((error) => {
        console.log(error);
        Swal.fire(
            'Opps!',
            'Something went wrong!',
            'error'
        )
    });
}

function Tanggal(tgl) {
    var tmp = new Date(tgl);
    var startdate_modified = tmp.getFullYear() + '-' + ((tmp.getMonth() > 8) ? (tmp.getMonth() + 1) : ('0' + (tmp.getMonth() + 1))) + '-' + ((tmp.getDate() > 9) ? tmp.getDate() : ('0' + tmp.getDate()));
    return startdate_modified;
}

function Waktu(waktu) {
    var time = new Date(waktu);
    var time_modified = ((time.getHours() < 10) ? ('0' + time.getHours()) : (time.getHours())) + ":" + ((time.getMinutes() < 10) ? ('0' + time.getMinutes()) : (time.getMinutes()));
    return time_modified;
}


