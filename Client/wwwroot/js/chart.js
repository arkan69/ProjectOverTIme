$(document).ready(function () {
    let TotPending = 0;
    let TotApproved = 0;
    let TotRejected = 0;
 
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

        $("#TotPending").append(`<div class="h5 mb-0 font-weight-bold text-gray-800">${TotPending}</div>`);
        $("#TotApproved").append(`<div class="h5 mb-0 font-weight-bold text-gray-800">${TotApproved}</div>`);
        $("#TotRejected").append(`<div class="h5 mb-0 font-weight-bold text-gray-800">${TotRejected}</div>`);
    })
});
// Chart berdasarkan employee ambil pengajuan dan tidak ambil yg dibawahi manager masing2
$.ajax({
    type: "GET",
    url: "../Employee/GetCountEmployee"
}).done((result) => {
    $("#TotEmployee").append(`<div class="h5 mb-0 font-weight-bold text-gray-800">${result[1]}</div>`);
    var options = {
        series: [result[0], result[1] - result[0]],
        chart: {
            width: 480,
            type: 'pie',
        },
        labels: ['Employees take overtime', 'Employees don\'t take overtime'],
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

})


//CHART PIE SIMPLE Jam pengajuan ambil + Sisa jam ambil

const elements = document.querySelectorAll('.myClassChart');
elements.forEach(element => {
element.addEventListener("change", function () {
    const selectedValue = this.value;
    var nik_chart = $('#nikemployee').val();
    var date1_chart = $('#date1').val();
    var date2_chart = $('#date2').val();
    if (nik_chart && date1_chart && date2_chart) {
        console.log("tidak ada yang kosong");
        let remaining = 46;
        let taken = 0;
    $.ajax({
        type: "GET",
        url: `https://localhost:7092/api/Employees/GetChart?NIK=${nik_chart}&start=${date1_chart}&end=${date2_chart}`
    }).done((result) => {
        for (const data of result) {
            taken += data.jmlJam;
        }
        remaining -= taken;

        const options = {
            series: [taken, remaining],
            chart: {
                width: 380,
                type: "pie"
            },
            labels: ["Taken", "Remaining"],
            responsive: [
                {
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: 200
                        },
                        legend: {
                            position: "bottom"
                        }
                    }
                }
            ]
        };

        if (window.chart && window.chart.destroy) {
            window.chart.destroy();
        }

        window.chart = new ApexCharts(
            document.querySelector("#chartPie"),
            options
        );
        window.chart.render();
    });
    }
    
});
});



//document.getElementById("nikemployee").addEventListener("change", function () {
//    const selectedValue = this.value;
//    console.log(selectedValue);
//    let remaining = 46;
//    let taken = 0;
//    $.ajax({
//        type: "GET",
//        url: `https://localhost:7092/api/Employees/GetChart?NIK=${selectedValue}`
//    }).done((result) => {
//        for (const data of result) {
//            taken += data.jmlJam;
//        }
//        remaining -= taken;

//        const options = {
//            series: [taken, remaining],
//            chart: {
//                width: 380,
//                type: "pie"
//            },
//            labels: ["Taken", "Remaining"],
//            responsive: [
//                {
//                    breakpoint: 480,
//                    options: {
//                        chart: {
//                            width: 200
//                        },
//                        legend: {
//                            position: "bottom"
//                        }
//                    }
//                }
//            ]
//        };

//        const chart = new ApexCharts(
//            document.querySelector("#chartPie"),
//            options
//        );
//        chart.render();
//    });
//});    


//List NIK
$.ajax({
    url: '../Employee/ListNikChart'
}).done((result) => {
    for (let i = 0; i < result.length; i++) {
        $('#nikemployee').append($('<option>', {
            value: result[i].nik,
            text: result[i].nik
        }));
    }
})







