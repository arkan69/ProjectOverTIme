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
document.getElementById("nikemployee").onchange = function () {
    var selectedValue = this.value;

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

    
 





