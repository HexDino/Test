//function to get current date
function getCurrentDate() {
    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    return day + "/" + month + "/" + year;
}
function updateDate() {
    const date = getCurrentDate();
    document.getElementById('current-date').textContent = date;
  }

//function to change color of class when hover and back to normal when mouse leave
function changeColor() {
    var classes = ["menu-item1", "menu-item2", "menu-item3"];
    classes.forEach(function(className) {
        var elements = document.getElementsByClassName(className);
        for (var i = 0; i < elements.length; i++) {
            elements[i].addEventListener("mouseover", function () {
                this.style.backgroundColor = "lightgrey";
            });
            elements[i].addEventListener("mouseout", function () {
                this.style.backgroundColor = "white";
            });
        }
    });
}
//function to click on menu item 1 and go to HomePage
function goToHomePage() {
    var elements = document.getElementsByClassName("menu-item1");
    for (var i = 0; i < elements.length; i++) {
        elements[i].addEventListener("click", function () {
            window.location.href = "/HomePage/index.html";
        });
    }
}

//function to click on menu item 2 and go to BrowseHomePage
function goToBrowseHomePage() {
    var elements = document.getElementsByClassName("menu-item2");
    for (var i = 0; i < elements.length; i++) {
        elements[i].addEventListener("click", function () {
            window.location.href = "/BrowseHomePage/index.html";
        });
    }
}

//function to click on menu item 3 and go to StaticHomePage
function goToStaticHomePage() {
    var elements = document.getElementsByClassName("menu-item3");
    for (var i = 0; i < elements.length; i++) {
        elements[i].addEventListener("click", function () {
            window.location.href = "/StaticHomePage/index.html";
        });
    }
}

function changeYear(direction) {
    const yearElement = document.getElementById('chart-year');
    let currentYear = parseInt(yearElement.textContent);
    currentYear += direction;
    yearElement.textContent = currentYear;
    updateChart(document.getElementById('chart-date-selector').value);
}

let myChart;

function initializeChart() {
    const ctx = document.getElementById('myChart').getContext('2d');
    myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [], // Khởi tạo trống
            datasets: [] // Khởi tạo trống
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed.y !== null) {
                                label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed.y);
                            }
                            return label;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return '$' + value / 1000 + 'k';
                        }
                    }
                }
            }
        }
    });

    // Initialize the chart with the default selection
    updateChart(document.getElementById('chart-date-selector').value);
}

function updateChart(selectedValue) {
    const currentDate = new Date();
    let labels = [];
    let datasets = [];

    switch (selectedValue) {
        case 'today':
            labels = [currentDate.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit' })];
            datasets = [
                {
                    label: 'Today',
                    data: [Math.random() * 10000 + 20000], // Example data
                    borderColor: 'blue',
                    backgroundColor: 'rgba(0, 0, 255, 0.1)',
                    fill: true,
                    tension: 0.4
                },
                {
                    label: 'Yesterday',
                    data: [Math.random() * 10000 + 20000], // Example data
                    borderColor: 'red',
                    backgroundColor: 'rgba(255, 0, 0, 0.1)',
                    fill: true,
                    borderDash: [5, 5],
                    tension: 0.4
                }
            ];
            break;
        case 'week':
            for (let i = 6; i >= 0; i--) {
                const date = new Date(currentDate);
                date.setDate(currentDate.getDate() - i);
                labels.push(date.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit' }));
            }
            datasets = [
                {
                    label: 'This Week',
                    data: Array.from({ length: 7 }, () => Math.random() * 10000 + 15000),
                    borderColor: 'blue',
                    backgroundColor: 'rgba(0, 0, 255, 0.1)',
                    fill: true,
                    tension: 0.4
                },
                {
                    label: 'Last Week',
                    data: Array.from({ length: 7 }, () => Math.random() * 10000 + 10000),
                    borderColor: 'red',
                    backgroundColor: 'rgba(255, 0, 0, 0.1)',
                    fill: true,
                    borderDash: [5, 5],
                    tension: 0.4
                }
            ];
            break;
        case 'month':
            const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
            for (let i = 1; i <= daysInMonth; i++) {
                labels.push(`${i.toString().padStart(2, '0')}/${(currentDate.getMonth() + 1).toString().padStart(2, '0')}`);
            }
            datasets = [
                {
                    label: 'This Month',
                    data: Array.from({ length: daysInMonth }, () => Math.random() * 10000 + 15000),
                    borderColor: 'blue',
                    backgroundColor: 'rgba(0, 0, 255, 0.1)',
                    fill: true,
                    tension: 0.4
                },
                {
                    label: 'Last Month',
                    data: Array.from({ length: daysInMonth }, () => Math.random() * 10000 + 10000),
                    borderColor: 'red',
                    backgroundColor: 'rgba(255, 0, 0, 0.1)',
                    fill: true,
                    borderDash: [5, 5],
                    tension: 0.4
                }
            ];
            break;
        case 'year':
            labels = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
            datasets = [
                {
                    label: 'This Year',
                    data: Array.from({ length: 12 }, () => Math.random() * 10000 + 20000),
                    borderColor: 'blue',
                    backgroundColor: 'rgba(0, 0, 255, 0.1)',
                    fill: true,
                    tension: 0.4
                },
                {
                    label: 'Last Year',
                    data: Array.from({ length: 12 }, () => Math.random() * 10000 + 15000),
                    borderColor: 'red',
                    backgroundColor: 'rgba(255, 0, 0, 0.1)',
                    fill: true,
                    borderDash: [5, 5],
                    tension: 0.4
                }
            ];
            break;
        default:
            console.error('Invalid selection');
            return;
    }

    myChart.data.labels = labels;
    myChart.data.datasets = datasets;
    myChart.update();
}

function changeYear(direction) {
    const yearElement = document.getElementById('chart-year');
    let currentYear = parseInt(yearElement.textContent);
    currentYear += direction;
    yearElement.textContent = currentYear;
}