let tempChart = null;
let doChart = null;
let phChart = null;
let depthChart = null;
let comboChart = null;

//temperture data filter
function temp_filter(temps) {
    if (!temps || temps.length === 0) return [];
    // Tính mean
    const mean = temps.reduce((sum, v) => sum + v, 0) / temps.length;
    // Tính standard deviation
    const variance = temps.reduce((sum, v) => sum + Math.pow(v - mean, 2), 0) / temps.length;
    const stdDev = Math.sqrt(variance);
    const threshold = 2 * stdDev;
    // Lọc nhiễu
    return temps.map(v => {
        if (Math.abs(v - mean) > threshold) {
            return mean; // thay thế điểm nhiễu
        }
        return v;
    });
}


//depth data filter
function depth_filter(depths) {
    if (!depths || depths.length === 0) return [];

    const windowSize = 5;
    const halfWindow = Math.floor(windowSize / 2);
    const smoothed = [];

    for (let i = 0; i < depths.length; i++) {
        let sum = 0;
        let count = 0;

        for (let j = i - halfWindow; j <= i + halfWindow; j++) {
            if (j >= 0 && j < depths.length) {
                sum += depths[j];
                count++;
            }
        }

        smoothed.push(sum / count);
    }

    return smoothed;
};


export function updateCharts(labels, temps, dos, phs, depths) {

    let fil_temps = temp_filter(temps);
    let fil_depth = depth_filter(depths);

    //temp chart
    const ctxtemp = document.getElementById('tempChart').getContext('2d');
    if (!tempChart) {
        tempChart = new Chart(ctxtemp,{
            type: 'line',
            data: {
                labels, 
                datasets:[
                {
                    label:'Fil_temperature', 
                    data: fil_temps, 
                    borderColor:'', 
                    fill:false, 
                    tension:0.1
                },
                {
                    label:'Temperature', 
                    data:temps, 
                    borderColor:'red', 
                    fill:false, 
                    tension:0.1
                }
            ]
            },
            options: {
                responsive:true, 
                maintainAspectRatio:false,
                scales:
                    {
                    x:
                    {
                        ticks:
                        {
                        callback: function(value, index){
                            return index % 3 === 0 ? this.getLabelForValue(value) : '';
                        }
                        }
                    }
                    }
            }
        })
    }
    else {
        tempChart.data.labels = labels;
        tempChart.data.datasets[0].data = temps;
        tempChart.update();
    }

    //DO chart
    const ctxDO = document.getElementById('DOChart').getContext('2d');
    if (!doChart) {
        doChart = new Chart(ctxDO,{
            type: 'line',
            data: {
                labels, 
                datasets:[
                {
                    label:'DO (mg_L)', 
                    data:dos, 
                    borderColor:'blue', 
                    fill:false, 
                    tension:0.1
                }
            ]
            },
            options: {
                responsive:true, 
                maintainAspectRatio:false,
                scales:
                    {
                    x:
                    {
                        ticks:
                        {
                        callback: function(value, index){
                            return index % 3 === 0 ? this.getLabelForValue(value) : '';
                        }
                        }
                    }
                    }
            }
        })
    }
    else {
        doChart.data.labels = labels;
        doChart.data.datasets[0].data = dos;
        doChart.update();
    }

    //ph chart
    const ctxph = document.getElementById('phChart').getContext('2d');
    if (!phChart) {
        phChart = new Chart(ctxph,{
            type: 'line',
            data: {
                labels, 
                datasets:[
                {
                    label:'PH', 
                    data:phs, 
                    borderColor:'green', 
                    fill:false, 
                    tension:0.1
                }
            ]
            },
            options: {
                responsive:true, 
                maintainAspectRatio:false,
                scales:
                    {
                    x:
                    {
                        ticks:
                        {
                        callback: function(value, index){
                            return index % 3 === 0 ? this.getLabelForValue(value) : '';
                        }
                        }
                    }
                    }
            }
        })
    }
    else {
        phChart.data.labels = labels;
        phChart.data.datasets[0].data = phs;
        phChart.update();
    }

    //depth chart
    const ctxdepth = document.getElementById('depthChart').getContext('2d');
    if (!depthChart) {
        depthChart = new Chart(ctxdepth,{
            type: 'line',
            data: {
                labels, 
                datasets:[
                {
                    label:'Fil_depth', 
                    data:fil_depth, 
                    borderColor:'blue', 
                    fill:false, 
                    tension:0.1
                },
                {
                    label:'Depth', 
                    data:depths, 
                    borderColor:'grey', 
                    fill:false, 
                    tension:0.1
                }
            ]
            },
            options: {
                responsive:true, 
                maintainAspectRatio:false,
                scales:
                    {
                    x:
                    {
                        ticks:
                        {
                        callback: function(value, index){
                            return index % 3 === 0 ? this.getLabelForValue(value) : '';
                        }
                        }
                    }
                    }
            }
        })
    }
    else {
        depthChart.data.labels = labels;
        depthChart.data.datasets[0].data = depths;
        depthChart.update();
    }

    //combo chart
    const ctxcombo = document.getElementById('comboChart').getContext('2d');
    if (!comboChart) {
        comboChart = new Chart(ctxcombo,{
            type: 'line',
            data: {
                labels, 
                datasets:[
                {
                    label:'Temperature', 
                    data:temps, 
                    borderColor:'red', 
                    fill:false, 
                    tension:0.1
                },
                {
                    label:'DO (mg_L)', 
                    data:dos, 
                    borderColor:'blue', 
                    fill:false, 
                    tension:0.1
                },
                {
                    label:'PH', 
                    data:phs, 
                    borderColor:'green', 
                    fill:false, 
                    tension:0.1
                },
                {
                    label:'Depth', 
                    data:depths, 
                    borderColor:'grey', 
                    fill:false, 
                    tension:0.1
                }
            ]
            },
            options: {
                responsive:true, 
                maintainAspectRatio:false,
                scales:
                    {
                    x:
                    {
                        ticks:
                        {
                        callback: function(value, index){
                            return index % 3 === 0 ? this.getLabelForValue(value) : '';
                        }
                        }
                    }
                    }
            }
        })
    }
    else {
        comboChart.data.labels = labels;
        comboChart.data.datasets[0].data = temps;
        comboChart.data.datasets[1].data = dos;
        comboChart.data.datasets[2].data = phs;
        comboChart.data.datasets[3].data = depths;
        comboChart.update();
    }
}