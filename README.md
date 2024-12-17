# Dynamic Interactive Dashboard

## Project Overview

The **Dynamic Interactive Dashboard** built using HTML, CSS, JavaScript, and Bootstrap. It allows users to view key performance metrics, filter data interactively, and visualize real-time updates using charts.

## Features

1. **Navigation Sidebar**:
   - The sidebar contains links to different sections of the dashboard (i.e to Overview, Analytics, Reports, Settings).
   - A toggle button allows the sidebar to collapse/expand, creating a better user experience on different screen sizes.
   - Active section highlighting for better navigation visibility.

2. **Main Dashboard Area**:
   - **Overview Cards**: Display key metrics such as total sales, user count, and total orders.
   - **Interactive Charts**: 
     - A bar chart showing monthly sales.
     - A pie chart representing user demographics.
   - **Data Filtering Form**: A form to filter data by date range and user type.

3. **Real-Time Updates**:
   - The dashboard fetches new data every 5 seconds and updates the charts and metrics without reloading the page.
   - Simulated real-time data fetch using `setInterval()` and DOM manipulation.

4. **Responsive Design**:
   - The dashboard is fully responsive, adapting to both desktop and mobile devices.

5. **Modals and Alerts**:
   - A modal is triggered when a user clicks on the sales chart, showing detailed sales data.
   - An alert system provides notifications such as success or error messages to users in real-time.

## Technology Stack

- **HTML & CSS**: For structuring and styling the dashboard.
- **JavaScript**: For dynamic content rendering, event handling, and data manipulation.
- **Bootstrap**: For responsive design and layout.
- **Chart.js**: For creating the bar chart (monthly sales) and pie chart (user demographics).
- **External API** for user data: [https://mocki.io/v1/dcc8b88a-b8da-4bab-beaf-d19b7c10e716](https://mocki.io/v1/dcc8b88a-b8da-4bab-beaf-d19b7c10e716)

## Installation and Setup

1. Clone this repository to your local machine:
   ```bash
   git clone https://github.com/TejalPisal/interactive-dashboard.git
   cd interactive-dashboard
