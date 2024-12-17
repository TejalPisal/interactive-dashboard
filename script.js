// Toggle Sidebar 
document.getElementById('toggleButton').addEventListener('click', function () {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('closed'); 
});

// Active Link Hightlight
const links = document.querySelectorAll('.sidebar-link');
links.forEach(link => {
    link.addEventListener('click', () => {
        links.forEach(l => l.classList.remove('active')); 
        link.classList.add('active'); 
    });
});

let salesData = []; 
let userDemographics = {}; 

// Fetching data
function fetchOverviewData() {
    fetch('https://mocki.io/v1/dcc8b88a-b8da-4bab-beaf-d19b7c10e716') 
        .then(response => response.json())
        .then(data => {
            // Update the overview section with fetched data
            document.getElementById('totalSales').textContent = `$${data.overview.total_sales.toLocaleString()}`;
            document.getElementById('userCount').textContent = data.overview.user_count.toLocaleString();
            document.getElementById('totalOrders').textContent = data.overview.total_orders.toLocaleString();

            // Store monthly sales and demographics data for charts
            salesData = data.monthly_sales;
            userDemographics = data.user_demographics;

            // Update sales and user demographics charts with the new data
            updateSalesChart(data.monthly_sales);
            updateUserDemographicsChart(data.user_demographics);

            // Update filtered user demographics dynamically
            updateFilteredUserDemographics();
        })
        .catch(error => {
            console.error('Error fetching data:', error); 
            showAlert('Error fetching data. Please try again.', 'danger'); 
        });
}

fetchOverviewData();

// Set an interval to fetch updated data every 5 seconds for real-time updates
setInterval(fetchOverviewData, 5000);

// Initialize the bar chart for monthly sales using Chart.js
const salesCtx = document.getElementById('salesChart').getContext('2d');
let salesChart = new Chart(salesCtx, {
    type: 'bar',
    data: {
        labels: [], 
        datasets: [{
            label: 'Monthly Sales',
            data: [], 
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true 
            }
        }
    }
});

// Update the bar chart with new monthly sales data
function updateSalesChart(monthlySales) {
    const months = monthlySales.map(sale => sale.month); 
    const salesData = monthlySales.map(sale => sale.sales); 

    salesChart.data.labels = months; 
    salesChart.data.datasets[0].data = salesData; 
    salesChart.update(); 
}

// Initialize the pie chart for user demographics using Chart.js
const demographicsCtx = document.getElementById('demographicsChart').getContext('2d');
let demographicsChart = new Chart(demographicsCtx, {
    type: 'pie',
    data: {
        labels: ['Male', 'Female', 'Other'], 
        datasets: [{
            label: 'User Demographics',
            data: [], 
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)', // Color for Male
                'rgba(54, 162, 235, 0.2)', // Color for Female
                'rgba(255, 206, 86, 0.2)' // Color for Other
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)'
            ],
            borderWidth: 1
        }]
    }
});

// Pie chart update with new user demographic data
function updateUserDemographicsChart(demographics) {
    const demographicData = [demographics.male, demographics.female, demographics.other]; 
    demographicsChart.data.datasets[0].data = demographicData; 
    demographicsChart.update(); 
}

// Filter sales data based on date range
function filterSalesData(startDate, endDate) {
    return salesData.filter(data => {
        const monthIndex = new Date(data.month + " 1, 2024").getMonth(); 
        const startMonth = new Date(startDate).getMonth(); 
        const endMonth = new Date(endDate).getMonth(); 
        
        return monthIndex >= startMonth && monthIndex <= endMonth; 
    });
}

// Dynamically update filtered user demographics in the UI
function updateFilteredUserDemographics() {
    const filteredUserDemographicsDiv = document.getElementById('filteredUserDemographics');
    filteredUserDemographicsDiv.innerHTML = ''; 

    const demographicsData = userDemographics;
    const demographicsHTML = `
        <h3>Filtered User Demographics (all):</h3>
        <p>Male: ${demographicsData.male}</p>
        <p>Female: ${demographicsData.female}</p>
        <p>Other: ${demographicsData.other}</p>
    `;
    filteredUserDemographicsDiv.innerHTML = demographicsHTML;
}

// Show detailed sales data in a modal when the chart is clicked
document.getElementById('salesChart').addEventListener('click', function (event) {
    const modalBodyContent = document.getElementById('modalContent');
    
    modalBodyContent.innerHTML = '';

    let chartDetails = '<ul>';
    salesData.forEach(sale => {
        chartDetails += `<li>${sale.month}: $${sale.sales.toLocaleString()}</li>`; 
    });
    chartDetails += '</ul>';
    
    modalBodyContent.innerHTML = chartDetails;
    const detailModal = new bootstrap.Modal(document.getElementById('detailModal'));
    detailModal.show();
});

// Event listener for the filter form submission
document.getElementById('filterForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const startDate = document.getElementById('startDate').value; 
    const endDate = document.getElementById('endDate').value; 
    const userType = document.getElementById('userType').value; 

    // Filter sales data based on selected dates
    if (startDate && endDate) {
        const filteredData = filterSalesData(startDate, endDate); 
        updateSalesChart(filteredData); 
        showAlert('Sales data filtered successfully!', 'success'); 
    } else {
        showAlert("Please select both start and end dates.", 'warning'); 
    }

    if (userType) {
        let filteredData = { ...userDemographics }; 

        if (userType === 'male' || userType === 'female' || userType === 'other') {
            filteredData = { [userType]: userDemographics[userType] }; 
        }

        const filteredUserDemographicsDiv = document.getElementById('filteredUserDemographics');
        filteredUserDemographicsDiv.innerHTML = `<h3>Filtered User Demographics (${userType} : ${filteredData[userType]})</h3>`;
    }
});

// Function to show alert messages in the UI
function showAlert(message, type) {
    const alertMessageDiv = document.getElementById('alertMessage');
    alertMessageDiv.textContent = message; 
    alertMessageDiv.className = `alert alert-${type}`; 
    alertMessageDiv.style.display = 'block'; 

    setTimeout(() => {
        alertMessageDiv.style.display = 'none';
    }, 3000);
}

// Fetch and display alerts when the page loads
fetchAndDisplayAlerts();
