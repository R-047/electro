
const { createApp } = Vue

createApp({
    props: [],
    components: {},
    data: function () {
        return {
            values: [],
            chart: null,
            chart_element: null,
            data: [["Time", "Power"]],
            power: 0,
            sse: null,
            options: null
        }
    },
    mounted() {
        this.chart_element = document.getElementById('power_graph')
        google.charts.load('current', {packages: ['corechart']});
        google.charts.setOnLoadCallback(this.drawChart);
        this.sse = new EventSource("https://electro.onrender.com/fetchPowerGraph?filter=LAST_30_MINS");
        this.sse.onmessage = this.updateGraph
        this.opitons = {
            title: 'Power Consumption over time',
            curveType: 'function',
            legend: { position: 'bottom' },
            hAxis: {
                title: 'Time',
                format: 'yyyy mm dd HH:mm',
              },
        };
    },
    updated(){
        
    },
    destroyed(){
        if(this.sse){
            this.sse.close()
        }
        
    },

    methods: {
        updateGraph(response) {
            this.values = JSON.parse(response.data)
            this.values.forEach(ele => {
                this.data.push([ele.created_time, parseInt(ele.power)])
            })
            var data = google.visualization.arrayToDataTable(this.data);

            this.chart.draw(data, this.options);
            console.log(this.data)
        },
        
        drawChart(){
            this.chart = new google.visualization.LineChart(document.getElementById('power_graph'));
            
        }
            
    },
    
}).mount('#app')