
    // Initialize map
    var map = L.map('map').setView([-1.2864, 36.8172], 13); // Nairobi coordinates

    // Add tile layer (OpenStreetMap)
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

    // Load stations data
    let stations = JSON.parse(document.getElementById("stations_json").textContent);

    // Custom bus stop icon
    const busStopIcon = L.divIcon({
    className: 'custom-bus-stop',
    html: '<div style="background-color: #1a73e8; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white; box-shadow: 0 1px 3px rgba(0,0,0,0.3);"></div>',
    iconSize: [16, 16],
    iconAnchor: [8, 8]
});

    // Add station markers
    let stationMarkers = [];
    stations.forEach(station => {
    const marker = L.marker([station.latitude, station.longitude], {icon: busStopIcon}).addTo(map);

    // Create popup content
    const popupContent = `
                <div class="stop-popup">
                    <div class="stop-header">
                        <div class="stop-icon">
                            <i class="fas fa-bus"></i>
                        </div>
                        <div class="stop-name">${station.name || 'Bus Stop'}</div>
                    </div>
                    <div class="stop-details">
                        <div class="stop-address">${station.address || 'Nairobi, Kenya'}</div>
                        <div class="stop-routes">
                                                        ${station.routes ? station.routes.map(route => `<div class="route-tag">${route}</div>`).join('') : '<div class="route-tag">Route 111</div><div class="route-tag">Route 125</div><div class="route-tag">Route 237</div>'}
                        </div>
                    </div>
                    <div class="stop-actions">
                        <div class="stop-action directions">Directions</div>
                        <div class="stop-action save">Save</div>
                    </div>
                </div>
            `;

    marker.bindPopup(popupContent);
    stationMarkers.push(marker);
});

    // Handle map click for finding nearest station
    map.on('click', (event) => {
    let lat = event.latlng.lat;
    let lng = event.latlng.lng;

    // Add marker at clicked location
    const userMarker = L.marker([lat, lng]).addTo(map);

    // Find nearest station
    fetch(`/get-nearest-station?latitude=${lat}&longitude=${lng}`)
    .then(response => response.json())
    .then(result => {
    const station_coordinates = result.coordinates;
    const user_coordinates = [lat, lng];

    // Draw line to nearest station
    const polyline = L.polyline([user_coordinates, station_coordinates], {
    color: '#1a73e8',
    weight: 4,
    opacity: 0.7,
    dashArray: '10, 10'
}).addTo(map);

    // Create popup with distance info
    const popup = L.popup()
    .setLatLng([lat, lng])
    .setContent(`
                            <div style="text-align: center;">
                                <div style="font-weight: 500; margin-bottom: 5px;">Nearest Bus Stop</div>
                                <div style="color: #666; font-size: 0.9rem;">Distance: ${result.distance}</div>
                                <button style="background-color: #1a73e8; color: white; border: none; padding: 5px 10px; border-radius: 4px; margin-top: 10px; cursor: pointer;">Get Directions</button>
                            </div>
                        `)
    .openOn(map);
});
});

    // Sidebar toggle
    const sidebar = document.getElementById('sidebar');
    const menuButton = document.getElementById('menuButton');
    const closeSidebar = document.getElementById('closeSidebar');

    menuButton.addEventListener('click', () => {
    sidebar.classList.add('open');
});

    closeSidebar.addEventListener('click', () => {
    sidebar.classList.remove('open');
});

    // Sidebar tabs
    const tabs = document.querySelectorAll('.sidebar-tab');

    tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove active class from all tabs
        tabs.forEach(t => t.classList.remove('active'));

        // Add active class to clicked tab
        tab.classList.add('active');

        // Show corresponding tab content
        const tabName = tab.getAttribute('data-tab');
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(`${tabName}-tab`).classList.add('active');
    });
});

    // Floating action button
    const fabMain = document.getElementById('fabMain');
    const fabOptions = document.getElementById('fabOptions');

    fabMain.addEventListener('click', () => {
    fabOptions.classList.toggle('show');

    // Toggle icon between plus and minus
    const icon = fabMain.querySelector('i');
    if (icon.classList.contains('fa-plus')) {
    icon.classList.remove('fa-plus');
    icon.classList.add('fa-minus');
} else {
    icon.classList.remove('fa-minus');
    icon.classList.add('fa-plus');
}
});

    // Bus stops toggle
    let busStopsVisible = true;
    const showBusStops = document.getElementById('showBusStops');

    showBusStops.addEventListener('click', () => {
    busStopsVisible = !busStopsVisible;

    // Toggle visibility of bus stop markers
    stationMarkers.forEach(marker => {
    if (busStopsVisible) {
    map.addLayer(marker);
} else {
    map.removeLayer(marker);
}
});

    // Update button style
    const button = showBusStops.querySelector('.fab-button');
    if (busStopsVisible) {
    button.style.backgroundColor = '#1a73e8';
    button.style.color = 'white';
} else {
    button.style.backgroundColor = 'white';
    button.style.color = '#1a73e8';
}
});

    // Share location modal
    const shareLocation = document.getElementById('shareLocation');
    const shareModal = document.getElementById('shareModal');
    const closeModal = document.getElementById('closeModal');

    shareLocation.addEventListener('click', () => {
    shareModal.classList.add('show');
});

    closeModal.addEventListener('click', () => {
    shareModal.classList.remove('show');
});

    // Close modal when clicking outside
    shareModal.addEventListener('click', (e) => {
    if (e.target === shareModal) {
    shareModal.classList.remove('show');
}
});

    // Copy share link
    const copyOption = document.querySelector('.share-icon.copy');
    const shareLink = document.querySelector('.share-link');

    copyOption.addEventListener('click', () => {
    shareLink.select();
    document.execCommand('copy');

    // Show copied feedback
    const originalLabel = copyOption.nextElementSibling.textContent;
    copyOption.nextElementSibling.textContent = 'Copied!';

    setTimeout(() => {
    copyOption.nextElementSibling.textContent = originalLabel;
}, 2000);
});

    // Routes toggle - example implementation
    const showRoutes = document.getElementById('showRoutes');
    let routesVisible = false;
    let routeLines = [];

    showRoutes.addEventListener('click', () => {
    routesVisible = !routesVisible;

    if (routesVisible) {
    // Example: Create some sample routes
    const routes = [
{
    path: [[-1.2864, 36.8172], [-1.2900, 36.8200], [-1.2950, 36.8250], [-1.3000, 36.8300]],
    color: '#1a73e8'
},
{
    path: [[-1.2864, 36.8172], [-1.2800, 36.8100], [-1.2750, 36.8050], [-1.2700, 36.8000]],
    color: '#EA4335'
},
{
    path: [[-1.2864, 36.8172], [-1.2850, 36.8250], [-1.2830, 36.8350], [-1.2800, 36.8400]],
    color: '#34A853'
}
    ];

    // Add routes to map
    routes.forEach(route => {
    const line = L.polyline(route.path, {
    color: route.color,
    weight: 5,
    opacity: 0.7
}).addTo(map);
    routeLines.push(line);
});

    // Update button style
    const button = showRoutes.querySelector('.fab-button');
    button.style.backgroundColor = '#1a73e8';
    button.style.color = 'white';
} else {
    // Remove routes from map
    routeLines.forEach(line => map.removeLayer(line));
    routeLines = [];

    // Reset button style
    const button = showRoutes.querySelector('.fab-button');
    button.style.backgroundColor = 'white';
    button.style.color = '#1a73e8';
}
});

    // Search functionality
    const searchInput = document.querySelector('.search-input');

    searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
    const searchTerm = searchInput.value.trim();

    if (searchTerm) {
    // In a real app, you would search for locations here
    // For this example, we'll just add a marker at a fixed location

    // Clear previous search results
    map.eachLayer((layer) => {
    if (layer instanceof L.Marker && !stationMarkers.includes(layer)) {
    map.removeLayer(layer);
}
});

    // Add a marker for the search result
    const searchMarker = L.marker([-1.2800, 36.8200]).addTo(map);

    // Create popup for search result
    const popupContent = `
                        <div style="text-align: center; padding: 10px;">
                            <div style="font-weight: 500; margin-bottom: 5px;">${searchTerm}</div>
                            <div style="color: #666; font-size: 0.9rem;">Nairobi, Kenya</div>
                            <div style="display: flex; gap: 10px; margin-top: 10px;">
                                <button style="flex: 1; background-color: #1a73e8; color: white; border: none; padding: 5px 0; border-radius: 4px; cursor: pointer;">Directions</button>
                                <button style="flex: 1; background-color: #f5f5f5; color: #333; border: none; padding: 5px 0; border-radius: 4px; cursor: pointer;">Save</button>
                            </div>
                        </div>
                    `;

    searchMarker.bindPopup(popupContent).openPopup();

    // Pan to the search result
    map.panTo([-1.2800, 36.8200]);

    // Add to recent searches (in a real app, you would save this)
    const recentTab = document.getElementById('recent-tab');
    const newSearchItem = document.createElement('div');
    newSearchItem.className = 'location-item';
    newSearchItem.innerHTML = `
                        <div class="location-icon">
                            <i class="fas fa-history"></i>
                        </div>
                        <div class="location-details">
                            <div class="location-name">${searchTerm}</div>
                            <div class="location-address">Nairobi, Kenya</div>
                        </div>
                        <div class="location-actions">
                            <div class="location-action">
                                <i class="fas fa-directions"></i>
                            </div>
                            <div class="location-action">
                                <i class="fas fa-star"></i>
                            </div>
                        </div>
                    `;

    // Add at the beginning of the list
    recentTab.insertBefore(newSearchItem, recentTab.firstChild);
}
}
});

    // Initialize the map with some sample data if stations array is empty
    if (stations.length === 0) {
    // Sample bus stops
    const sampleStops = [
{ latitude: -1.2864, longitude: 36.8172, name: "CBD Terminal", address: "Central Business District, Nairobi" },
{ latitude: -1.2900, longitude: 36.8250, name: "Westlands Stop", address: "Westlands, Nairobi" },
{ latitude: -1.2750, longitude: 36.8100, name: "Eastleigh Terminal", address: "Eastleigh, Nairobi" },
{ latitude: -1.3000, longitude: 36.8300, name: "Kilimani Stop", address: "Kilimani, Nairobi" },
{ latitude: -1.2800, longitude: 36.8000, name: "South B Terminal", address: "South B, Nairobi" }
    ];

    sampleStops.forEach(stop => {
    const marker = L.marker([stop.latitude, stop.longitude], {icon: busStopIcon}).addTo(map);

    // Create popup content
    const popupContent = `
                    <div class="stop-popup">
                        <div class="stop-header">
                            <div class="stop-icon">
                                <i class="fas fa-bus"></i>
                            </div>
                            <div class="stop-name">${stop.name}</div>
                        </div>
                        <div class="stop-details">
                            <div class="stop-address">${stop.address}</div>
                            <div class="stop-routes">
                                <div class="route-tag">Route 111</div>
                                <div class="route-tag">Route 125</div>
                                <div class="route-tag">Route 237</div>
                            </div>
                        </div>
                        <div class="stop-actions">
                            <div class="stop-action directions">Directions</div>
                            <div class="stop-action save">Save</div>
                        </div>
                    </div>
                `;

    marker.bindPopup(popupContent);
    stationMarkers.push(marker);
});
}
