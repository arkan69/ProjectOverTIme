//$(document).ready(function () {
    table_finance = $("#table_finance").DataTable({
        ajax: {
            "url": "../Employee/SplkFinance",
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
                "data": "jmlJam"
            },
            {
                "data": null,
                render: function (data, type, row, meta) {
                    return formatRupiah(parseInt(row['upahLembur']));
                }
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
                    //if (row['status'] == 3) {
                    //    var Status = 'Disabled';
                    //}
                    return `<div class="btn-group d-flex justify-content-center">
                                    <button type="button" class="btn btn-sm btn-primary" data-bs-toggle="modal" onclick="detailfinance('${getNik}')" data-bs-target="#detailModalFinance" title="Detail" >
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
                className: 'btn btn-danger mb-3',
                exportOptions: {
                    columns: [0, 1, 2, 3, 4, 5, 6, 7]
                }
            }
        ]
    });
//});



//UPDATE
function detailfinance(key) {
    $('#btnDoneFinance').attr('disabled', false);
    console.log(key);
    $.ajax({
        url: 'https://localhost:7092/api/Splks/' + key
    }).done((result) => {
        console.log(result);
        if (result.data.status == 3) {
            $('#btnDoneFinance').attr('disabled', true);
        }
        //$("#detailFormFinance").append(`<input type='hidden' id='hidden_id_finance' name='hidden_id_finance' value='${key}'>`);
        $('#hidden_id_finance').val(key).readonly;
        $('#detailFnik').prop('readonly', true);
        $('#detailFnik').val(result.data.nik).readonly;
        if (result.data.overtimeType == 0) {
            //$('#detailFjenislembur').val("Kerja");
            document.getElementById('detailFjenislembur').innerHTML = "Work";
        } else {
            //$('#detailFjenislembur').val("Libur");
            document.getElementById('detailFjenislembur').innerHTML = "Holiday";
        }

        startdate_modified = Tanggal(result.data.startDate);
        //$('#detailFtglmulai').val(startdate_modified);
        document.getElementById('detailFtglmulai').innerHTML = startdate_modified;

        st_modified = Waktu(result.data.startDate);
        //$('#detailFjammulai').val(st_modified);
        document.getElementById('detailFjammulai').innerHTML = st_modified;

        ed_modified = Waktu(result.data.endDate);
        //$('#detailFjamselesai').val(ed_modified);
        document.getElementById('detailFjamselesai').innerHTML = ed_modified;

        //$('#detailFdeskripsi').val(result.data.description);
        document.getElementById('detailFdeskripsi').innerHTML = result.data.description;

        imgElemF.setAttribute('src', "data:application/pdf;base64," + result.data.proofOvertime);

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
$("#btnDoneFinance").click(function (e) {
    Swal.fire({
        title: 'Sure about to finalize this request?',
        text: "Request form will be finalized.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes Finalized!',
        cancelButtonText: 'Cancel Finalized'

    }).then((result) => {
        if (result.isConfirmed) {
            // Object
            var fd = new FormData();
            fd.append('id', $("#hidden_id_finance").val());
            fd.append('nik', $("#detailFnik").val());
            fd.append('status', 3);
            $.ajax({
                type: "POST",
                url: "../Employee/UpdateSplk",
                data: fd,
                processData: false,
                contentType: false,
            }).done((result) => {
                Swal.fire(
                    'Finalized Success',
                    'SPLK Employee are Finalized',
                    'success'
                )
                table_finance.ajax.reload();
                $('.detailModalFinance').modal('hide');

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


var downloadButton = document.getElementById("download-pdf-finance");
if (downloadButton) {
    downloadButton.addEventListener("click", function (event) {
        event.preventDefault();
        var image = document.getElementById("imgElemF");
        var base64string = image.src;
        var link = document.createElement("a");
        link.download = "filebukti.pdf";
        link.href = base64string;
        link.click();
    })
} else {
    console.error('Element Not Found');
};