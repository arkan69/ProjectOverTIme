//$(document).ready(function () {
    table_manager = $("#table_manager").DataTable({
        ajax: {
            "url": "../Employee/SplkEmployee",
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
                        return "Weekdays"
                    } else {
                        return "Weekends/Holiday"
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
                            return `<div class="badge bg-secondary text-wrap" style="width: 6rem;">
                                      Pending
                                    </div>`
                            break;
                        case 1:
                            return `<div class="badge bg-danger text-wrap" style="width: 6rem;">
                                      Refuse
                                    </div>`
                            break;
                        case 2:
                            return `<div class="badge bg-info text-wrap" style="width: 6rem;">
                                      Approve
                                    </div>`
                            break;
                        default:
                            return `<div class="badge bg-success text-wrap" style="width: 6rem;">
                                      Done
                                    </div>`
                    }

                }
            },
            {
                "data": null,
                "render": function (data, type, row) {
                    var getNik = row['id'];
                    return `<div class="btn-group d-flex justify-content-center">
                                    <button type="button" class="btn btn-sm btn-primary" data-bs-toggle="modal" onclick="detailmanager('${getNik}')" data-bs-target="#detailModalManager" title="Detail">
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
                    columns: [0, 1, 2, 3, 4, 5, 6, 7]
                }
            },
            {
                extend: 'csvHtml5',
                className: 'btn btn-warning mb-3',
                exportOptions: {
                    columns: [0, 1, 2, 3, 4, 5, 6, 7]
                }
            },
            {
                extend: 'pdfHtml5',
                className: 'btn btn-info mb-3',
                exportOptions: {
                    columns: [0, 1, 2, 3, 4, 5, 6, 7]
                }
            }
        ]
    });
//});



//UPDATE
function detailmanager(key) {
    $('#btnApprovedManager').attr('disabled', false);
    $('#btnRejectedManager').attr('disabled', false);
    console.log(key);
    $.ajax({
        url: 'https://localhost:7092/api/Splks/' + key
    }).done((result) => {
        console.log(result);
        console.log(result.data.status != 0);
        if (result.data.status != 0) {
            $('#btnApprovedManager').attr('disabled', true);
            $('#btnRejectedManager').attr('disabled', true);
        }
        //$('.createEmployee').modal('show');
        //$("#detailFormManager").append(`<input type='hidden' id='hidden_id' name='hidden_id' value='${key}'>`);
        $('#hidden_id').val(key).readonly;
        $('#detailMnik').prop('readonly', true);
        $('#detailMnik').val(result.data.nik).readonly;
        if (result.data.overtimeType == 0) {
            //$('#detailMjenislembur').val("Kerja");
            document.getElementById('detailMjenislembur').innerHTML = "Work";
        } else {
            //$('#detailMjenislembur').val("Libur");
            document.getElementById('detailMjenislembur').innerHTML = "Holiday";
        }

        startdate_modified = Tanggal(result.data.startDate);
        //('#detailMtglmulai').val(startdate_modified);
        document.getElementById('detailMtglmulai').innerHTML = startdate_modified;

        st_modified = Waktu(result.data.startDate);
        //$('#detailMjammulai').val(st_modified);
        document.getElementById('detailMjammulai').innerHTML = st_modified;

        ed_modified = Waktu(result.data.endDate);
        //$('#detailMjamselesai').val(ed_modified);
        document.getElementById('detailMjamselesai').innerHTML = ed_modified;

        //$('#detailMdeskripsi').val(result.data.description);
        document.getElementById('detailMdeskripsi').innerHTML = result.data.description;

        imgElemM.setAttribute('src', "data:application/pdf;base64," + result.data.proofOvertime);

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

// Action Function Approved
$("#btnApprovedManager").click(function (e) {
    Swal.fire({
        title: 'Sure to Approved this request?',
        text: "Request form will be approved.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Approved!',
        cancelButtonText: 'Cancel Approved'

    }).then((result) => {
        if (result.isConfirmed) {
            // Object
            var fd = new FormData();
            fd.append('id', $("#hidden_id").val());
            fd.append('nik', $("#detailMnik").val());
            fd.append('status', 2);
            $.ajax({
                type: "POST",
                url: "../Employee/UpdateSplk",
                data: fd,
                processData: false,
                contentType: false,
            }).done((result) => {
                Swal.fire(
                    'Approved',
                    'SPLK Employee Approved',
                    'success'
                )
                table_manager.ajax.reload();
                $('.detailModalManager').modal('hide');

            }).fail((error) => {
                console.log(error);
                Swal.fire(
                    'Opps!',
                    'Something went wrong!',
                    'error'
                )
            })
        }
    })
});

// Action Function Rejected
$("#btnRejectedManager").click(function (e) {
    e.preventDefault();
    Swal.fire({
        title: 'Sure want to Rejected this request?',
        text: "Request form will be Rejected.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Reject!',
        cancelButtonText: 'Cancel Rejected'

    }).then((result) => {
        if (result.isConfirmed) {
            // Object
            var fd = new FormData();
            fd.append('id', $("#hidden_id").val());
            fd.append('nik', $("#detailMnik").val());
            fd.append('status', 1);
            $.ajax({
                type: "POST",
                url: "../Employee/UpdateSplk",
                data: fd,
                processData: false,
                contentType: false,

            }).done((result) => {
                Swal.fire(
                    'Rejected',
                    'SPLK Employee are Rejected',
                    'success'
                )
                table_manager.ajax.reload();
                $('.detailModalManager').modal('hide');

            }).fail((error) => {
                console.log(error);
                Swal.fire(
                    'Opps!',
                    'Something went wrong!',
                    'error'
                )
            })
        }
    })
});


var downloadButton = document.getElementById("download-pdf-manager");
if (downloadButton) {
    downloadButton.addEventListener("click", function (event) {
        event.preventDefault();
        var image = document.getElementById("imgElemM");
        var base64string = image.src;
        var link = document.createElement("a");
        link.download = "filebukti.pdf";
        link.href = base64string;
        link.click();
    });
} else {
    console.error('Element Not Found');
}

