$(document).ready(function () {
    table = $("#table_splk").DataTable({
        ajax: {
            "url": "../Employee/GetMasterEmployee",
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
                    return `<div class="btn-group">
                                    <button type="button" class="btn btn-sm btn-circle btn-primary" data-bs-toggle="modal" onclick="detailSplk('${getNik}')" data-bs-target="#detailModal">
                                        <span class="fas fa-magnifying-glass"></span>
                                    </button>
                                    &nbsp;
                                    <button type="button" class="btn btn-sm btn-circle btn-warning" data-bs-toggle="modal" onclick="updateSplk('${getNik}')" data-bs-target="#updateModal">
                                        <span class="fas fa-edit"></span>
                                    </button>
                                    &nbsp;
                                    <button type="button" class="btn btn-sm btn-circle btn-danger" onclick="DeleteSpkl('${getNik}')" ">
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
});

//Validate Jquery Plugin
//Ver 0
$(document).ready(function () {
    $('#formSplk').validate({
        ignore: ":hidden",
        rules: {
            jenislembur: {
                required: true
            },
            tglmulai: {
                required: true
            },
            jammulai: {
                required: true
            },
            jamselesai: {
                required: true
            },
            deskripsi: {
                required: true
            },
            buktifile: {
                required: true
            }
        },

        messages: {
            jenislembur: {
                required: "<div style='font-size:15px; '>Jenis Lembur is required.</div>"
            },
            tglmulai: {
                required: "<div style='font-size:15px; '>Tanggal is required.</div>"
            },
            jammulai: {
                required: "<div style='font-size:15px; '>Jam Mulai is required.</div>"
            },
            jamselesai: {
                required: "<div style='font-size:15px; '>Jam Selesai is required.</div>"
            },
            deskripsi: {
                required: "<div style='font-size:15px; '>Deskripsi is required.</div>"
            },
            buktifile: {
                required: "<p style='font-size:15px; width:100%'>Bukti File is required.</p>"
            }
        },
        highlight: function (element) {
            $(element).addClass("is-invalid").removeClass("is-valid");
        },
        unhighlight: function (element) {
            $(element).addClass("is-valid").removeClass("is-invalid");
        },

        errorPlacement: function (error, element) {
            error.insertAfter(element);
        }
    });
});

// Action Function Insert & Update
$("#btnSaveSplk").click(function (e) {
    //e.preventDefault();
    //if ($("#formSplk").valid()) {
        var data_action = $(this).attr("data-name");
        if (data_action == "insert") {
            console.log("INI INSERT");
            InsertSplkForm();
        }
   // }
});

// Clear Modal Insert Employee
function InsertSplk() {
    $('#nik').val("");
    $('#jenislembur').val("");
    $('#tglmulai').val("");
    $('#jammulai').val("");
    $('#jamselesai').val("");
    $('#deskripsi').val("");
    $('#buktifile').val("");
    $('#btnSaveSplk').attr('data-name', 'insert').html("<span class='fas fa-save'>&nbsp;</span>Save");

    //get NIK
    $.ajax({
        url: '../Employee/GetNIK'
    }).done((result) => {
        $('#nik').val(result.nik);
        $('#nik').prop('readonly', true);
    })

};

function GetSPLKEmployee() {
    $.ajax({
        url: '../Employee/GetMasterEmployee'
    }).done((result) => {
        console.log(result);
        return result;
    })
}

const data = GetSPLKEmployee();
console.log("data baru", data);

//INSERT NEW 1
function InsertSplkForm() {
    let Start = $("#tglmulai").val() + 'T' + $("#jammulai").val();
    let End = $("#tglmulai").val() + 'T' + $("#jamselesai").val();
    let today = new Date();

    //Hitung selisih Jam
    let duration = (new Date(End)).getTime() - (new Date(Start)).getTime();
    let durationMinutes = duration / (1000 * 60);
    let hours = Math.floor(durationMinutes / 60);

    var fd = new FormData();
    fd.append('nik', $("#nik").val())
    fd.append('overtimeType', $('#jenislembur').val());
    fd.append('StartDate', Start);
    fd.append('EndDate', End);
    fd.append('description', $("#deskripsi").val());
    fd.append('JmlJam', hours);
    fd.append('file', $('#buktifile')[0].files[0]);

    if ((new Date(Start)).getTime() > today.getTime()) {
        alert("Tanggal tidak boleh melebihi hari ini!");
    }
    else if (hours < 1 || hours > 4) {
        alert("Pengambilan lembur min 1 jam atau max 4 jam!");
    } else {
        $.ajax({
            url: "../Splk/SplkForm",
            type: "POST",
            data: fd,
            processData: false,
            contentType: false,
        }).done((result) => {
            Swal.fire(
                'Success',
                "Data Berhasil ditambahkan",
                'success'
            )
            table.ajax.reload();
            $('.insertModal').modal('hide');
        })
    }
}

//UPDATE
function detailSplk(key) {
    console.log(key);
    $.ajax({
        url: 'https://localhost:7092/api/Splks/' + key
    }).done((result) => {
        console.log(result);

        //$('#detailnik').prop('readonly', true);
        //$('#detailnik').val(result.data.nik).readonly;
        document.getElementById('detailniks').innerHTML = result.data.nik;
        if (result.data.overtimeType == 0) {
            //$('#detailjenislembur').val("Kerja");
            document.getElementById('detailjenislemburs').innerHTML = "Work";
        } else {
            //$('#detailjenislembur').val("Libur");
            document.getElementById('detailjenislemburs').innerHTML = "Holiday";
        }

        startdate_modified = Tanggal(result.data.startDate);
        //$('#detailtglmulai').val(startdate_modified);
        document.getElementById('detailtglmulais').innerHTML = startdate_modified;

        st_modified = Waktu(result.data.startDate);
        //$('#detailjammulai').val(st_modified);
        document.getElementById('detailjammulais').innerHTML = st_modified;

        ed_modified = Waktu(result.data.endDate);
        //$('#detailjamselesai').val(ed_modified);
        document.getElementById('detailjamselesais').innerHTML = ed_modified;

        //$('#detaildeskripsi').val(result.data.description);
        document.getElementById('detaildeskripsis').innerHTML = result.data.description;

        imgElem.setAttribute('src', "data:image/jpg;base64," + result.data.proofOvertime);

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

var downloadButton = document.getElementById("download-image");
downloadButton.addEventListener("click", function (event) {
    event.preventDefault();
    var image = document.getElementById("imgElem");
    var base64string = image.src;
    var link = document.createElement("a");
    link.download = "image.jpg";
    link.href = base64string;
    link.click();
});

//Detele data
const DeleteSpkl = (key) => {
    Swal.fire({
        title: 'Are you sure?',
        text: 'You want able to revert this!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                type: 'DELETE',
                url: `https://localhost:7092/api/Splks/${key}`,
                success: () => {
                    Swal.fire(
                        'Deleted',
                        'Employee has been deleted.',
                        'success'
                    )
                    $('#table_splk').DataTable().ajax.reload()
                },
                error: () => {
                    Swal.fire(
                        'Failed',
                        'Error deleting splk employee',
                        'error'
                    )
                }
            })
        }
    })
}