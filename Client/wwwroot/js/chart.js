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


document.getElementById("nikemployee").addEventListener("change", function () {
    const selectedValue = this.value;
    console.log(selectedValue);
    let remaining = 46;
    let taken = 0;
    $.ajax({
        type: "GET",
        url: `https://localhost:7092/api/Employees/GetChart?NIK=${selectedValue}`
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

        const chart = new ApexCharts(
            document.querySelector("#chartPie"),
            options
        );
        chart.render();
    });
});    


//List NIK
$.ajax({
    url: '../Employee/ListNikChart'
}).done((result) => {
    //console.log("coba",result);


})







