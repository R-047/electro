
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
        // const host = "http://localhost:3000"
        const host = "https://electro.onrender.com"
        this.chart_element = document.getElementById('power_graph')
        google.charts.load('current', {packages: ['corechart']});
        
        google.charts.setOnLoadCallback(this.drawChart);
        this.sse = new EventSource(`${host}/fetchPowerGraph?filter=LAST_30_MINS`);
        this.sse.onmessage = this.updateGraph
        
    },
    updated(){
        
    },
    destroyed(){
        if(this.sse){
            console.log("closing sse...")
            this.sse.close()
        }
        
    },

    methods: {
        updateGraph(response) {
            this.values = JSON.parse(response.data)

            var coords = this.values.map(ele => {
                return [ele.created_time, parseInt(ele.power)]
            })
            var data = google.visualization.arrayToDataTable(this.data.concat(coords));

            var options = {
                title: 'Power Consumption over time',
                curveType: 'function',
                legend: { position: 'bottom' },
                hAxis: {
                    title: 'Time',
                    format: 'yyyy mm dd HH:mm',
                  },
            };

            this.chart.draw(data, options);
        },
        
        drawChart(){
            this.chart = new google.visualization.LineChart(document.getElementById('power_graph'));
            
        }
            
    },
    
}).mount('#app')