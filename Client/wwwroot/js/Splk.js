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
                    return meta.row + 1;
                }
            },
            {
                "data": "nik"
            },
            {
                "data": null,
                render: function (data, type, row, meta) {
                    if (row['overtimeType'] == 0) {
                        return "Weekdays"
                    } else {
                        return "Weekends"
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
                "data": "endDate"
            },
            {
                "data": "endDate"
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
                    var getNik = row['nik'];
                    return `<div class="btn-group">
                                    <button type="button" class="btn btn-sm btn-circle btn-primary" data-bs-toggle="modal" onclick="detailEmployee('${getNik}')" data-bs-target="#insertModal">
                                        <span class="fas fa-magnifying-glass"></span>
                                    </button>
                                    &nbsp;
                                    <button type="button" class="btn btn-sm btn-circle btn-warning" data-bs-toggle="modal" onclick="updateEmployee('${getNik}')" data-bs-target="#insertModal">
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


