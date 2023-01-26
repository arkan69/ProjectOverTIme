$(document).ready(function () {
    table = $("#table_manager").DataTable({
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
                                    <button type="button" class="btn btn-sm btn-circle btn-primary" data-bs-toggle="modal" onclick="detailmanager('${getNik}')" data-bs-target="#detailModalManager">
                                        <span class="fas fa-magnifying-glass"></span>
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



//UPDATE
function detailmanager(key) {
    console.log(key);
    $.ajax({
        url: 'https://localhost:7092/api/Splks/' + key
    }).done((result) => {
        console.log(result);
        //$('.createEmployee').modal('show');
        //$('#exampleModalLabel').html("Detail SPLK");
        $('#detailMnik').prop('readonly', true);
        $('#detailMik').val(result.data.nik).readonly;
        if (result.data.overtimeType == 0) {
            $('#detailMjenislembur').val("Kerja");
        } else {
            $('#detailMjenislembur').val("Libur");
        }

        startdate_modified = Tanggal(result.data.startDate);
        $('#detailMtglmulai').val(startdate_modified);

        st_modified = Waktu(result.data.startDate);
        $('#detailMjammulai').val(st_modified);

        ed_modified = Waktu(result.data.endDate);
        $('#detailMjamselesai').val(ed_modified);
        $('#detail,deskripsi').val(result.data.description);
        //$("#imagepreview").append("<img src='" + result.data.proofOvertime.imageBase64 + "' alt='' class='img-fluid'>");
        imgElemM.setAttribute('src', "data:image/jpg;base64," + result.data.proofOvertime);
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