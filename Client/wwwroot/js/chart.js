$(document).ready(function () {
    let TotEmployee = 0;
    let TotPending = 0;
    let TotApproved = 0;
    let TotRejected = 0;
    var arrNik = [];
    $.ajax({
        "dataType": "Json",
        url: "../Employee/SplkEmployee"
    }).done((result) => {
        for (var i = 0; i < result.length; i++) {
            if (result[i].status == 0) {
                TotPending += 1;
            } else if (result[i].status == 1) {
                TotRejected += 1;
            } else if (result[i].status == 2) {
                TotApproved += 1;
            }
        }

        //for (let i = 0; i < result.length; i++) {
        //    for (let j = i + 1; j < result.length; j++) {
        //        if (result[i].nik === result[j].nik) {
        //            console.log("ID duplikat ditemukan:", result[i].nik);
        //            arrNik.push(result[i].nik);
        //        }
        //    }
        //}
        //console.log("ArrNIK", arrNik);
        $("#TotPending").append(`<div class="h5 mb-0 font-weight-bold text-gray-800">${TotPending}</div>`);
        $("#TotApproved").append(`<div class="h5 mb-0 font-weight-bold text-gray-800">${TotApproved}</div>`);
        $("#TotRejected").append(`<div class="h5 mb-0 font-weight-bold text-gray-800">${TotRejected}</div>`);
    })
});
//
var options = {
    series: [44, 55],
    chart: {
        type: 'donut',
    },
    responsive: [{
        breakpoint: 480,
        options: {
            chart: {
                width: 200
            },
            legend: {
                position: 'bottom'
            }
        }
    }]
};

var chart = new ApexCharts(document.querySelector("#chart"), options);
chart.render();

//CHART PIE SIMPLE Jam pengajuan ambil + Sisa jam ambil

// JavaScript
//document.getElementById("nikemployee").addEventListener("change", function () {
//    // Make the AJAX call
//    var selectedValue = this.value;
//    $.ajax({
//        url: 'https://localhost:7092/api/Employees/GetChart?NIK=' + selectedValue,
//        success: function (data) {
//            console.log("data",data)
//            chart.updateSeries([{
//                data: data
//            }]);
//        }
//    });
//});

//document.getElementById("nikemployee").onchange = function () {
//    var selectedValue = this.value;
//    console.log('tes', selectedValue);
//    var arr = [];
//    let sisa = 46;
//    let ambil = 0;
//    $.ajax({
//        type: "GET",
//        url: 'https://localhost:7092/api/Employees/GetChart?NIK=' + selectedValue
//    }).done((result) => {
//       console.log("ini res",result)
//        for (var i = 0; i < result.length; i++) {
//            ambil += result[i].jmlJam;
//        }
//        sisa -= ambil;
//        arr.push(ambil);
//        arr.push(sisa);
//        chart.updateSeries([{
//                data: arr
//            }]);
//    })
//};

//// Initialize the chart
//var chart = new ApexCharts(document.querySelector("#chartPie"), {
//    series: [{
//        data: [30, 40]
//    }], 
//    chart: {
//        width: 380,
//        type: 'pie',
//    },
//    labels: ['Ambil', 'Sisa'],
//    responsive: [{
//        breakpoint: 480,
//        options: {
//            chart: {
//                width: 200
//            },
//            legend: {
//                position: 'bottom'
//            }
//        }
//    }]
//});
//chart.render();


document.getElementById("nikemployee").onchange = function () {
    var selectedValue = this.value;
    console.log('tes', selectedValue);
    let sisa = 46;
    let ambil = 0;
    $.ajax({
        type: "GET",
        url: 'https://localhost:7092/api/Employees/GetChart?NIK=' + selectedValue
    }).done((result) => {
        global = result;
        for (var i = 0; i < result.length; i++) {
            ambil += result[i].jmlJam;
        }
        sisa -= ambil;

        var options = {
            series: [ambil, sisa],
            chart: {
                width: 380,
                type: 'pie',
            },
            labels: ['Ambil', 'Sisa'],
            responsive: [{
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }]
        };

        var chart = new ApexCharts(document.querySelector("#chartPie"), options);
        chart.render();

    })
};

    
 





