$(document).ready(function () {
    table = $("#table_employee").DataTable({
        ajax: {
            "url": "../employee/GetAll",
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
                    return row['firstName'] + " " + row['lastName']
                }
            },
            {
                "data": null,
                render: function (data, type, row, meta) {
                    var phones = row['phone'];
                    var tmp = "";
                    if (phones.substring(0, 1) == "0") {
                        tmp = phones.replace(phones.substring(0, 1), "+62");
                    } else {
                        tmp = phones;
                    }
                    return tmp;
                }
            },
            {
                "data": null,
                render: function (data, type, row, meta) {
                    var birthdate = row['birthDate'];
                    var tmp = new Date(birthdate);

                    return ((tmp.getMonth() > 8) ? (tmp.getMonth() + 1) : ('0' + (tmp.getMonth() + 1))) + '/' + ((tmp.getDate() > 9) ? tmp.getDate() : ('0' + tmp.getDate())) + '/' + tmp.getFullYear();
                }
            },
            {
                "data": null,
                render: function (data, type, row, meta) {
                    return formatRupiah(row['salary']);
                }
            },
            {
                "data": null,
                render: function (data, type, row, meta) {
                    if (row['gender'] == 0) {
                        return "Laki - Laki"
                    } else {
                        return "Perempuan"
                    }

                }
            },
            {
                "data": null,
                "render": function (data, type, row) {
                    var getNik = row['nik'];
                    return `<div class="btn-group">
                                    <button type="button" class="btn  btn-warning" data-bs-toggle="modal" onclick="updateEmployee('${getNik}')" data-bs-target="#insertModal">
                                        Edit
                                    </button>
                                    &nbsp;
                                    <button type="button" class="btn  btn-danger" onclick="Delete('${getNik}')" ">
                                       Delete
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


// Action Function Insert & Update
$("#btnSaveEmployee").click(function (e) {
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

// formatRupiah
function formatRupiah(angka) {
    const format = angka.toString().split('').reverse().join('');
    const convert = format.match(/\d{1,3}/g);
    const rupiah = 'Rp ' + convert.join('.').split('').reverse().join('')
    return rupiah;
}

