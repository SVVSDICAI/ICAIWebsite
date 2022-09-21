window.onload = function() {
  drawInitialGraph()
};

async function drawInitialGraph() {

    // fetch data from our github repo the analysis pi uploads data to
    let response = await fetch('https://raw.githubusercontent.com/cogrpar/FishLadderStreamCapture/master/convertjson.txt');

    // if we can load json data
    if (response.status === 200) {
        let FishCountedData = await response.json();
        // Draw chart
        const ctx = document.querySelector('canvas').getContext('2d');

        const myLineChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: FishCountedData.lables,
                datasets: [{

                    label: 'Amount Of Fish',
                    backgroundColor: 'rgb(80, 87, 89)',
                    borderColor: 'rgb(63, 68, 68)',
                    backgroundColor: 'rgba(80, 87, 89, 0.8)',
                    fill: true,
                    data: FishCountedData.data,
                    animations: false 
                }]
            },
            options: {
                plugins: {
                    title: {
                        display: true,
                        text: 'Fish Counted By Day'
                    }
                }
            }


        });
    }

    
}




// Redraw the chart with an added record
function updateData(event) {
  event.target.disabled = true;

  data2 = {
    "Dates" : [
      "2021-08-02",
      "2021-08-03",
      "2021-08-04",
      "2021-08-05",
      "2021-08-06",
      "2021-08-07"
    ],
    "Users": [
      6,
      4,
      3,
      8,
      2,
      12
    ]
  };

  // assign programmatically the datasets again, otherwise data changes won't show
  myLineChart.data.labels = data2.Dates;
  myLineChart.data.datasets[0].data = data2.Users;

  myLineChart.update();
};
