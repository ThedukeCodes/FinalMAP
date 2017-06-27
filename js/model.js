//Hard coded marker location data
var myLocs = [{
        title: 'Home',
        location: {
            lat: 50.831522,
            lng: 4.499684
        }
    },
    {
        title: 'IPM Group SA',
        location: {
            lat: 50.837327,
            lng: 4.399765
        }
    },
    {
        title: 'Jims Evere',
        location: {
            lat: 50.878124,
            lng: 4.410598
        }
    },
    {
        title: 'Royal Golf Ravenstein',
        location: {
            lat: 50.814035,
            lng: 4.482312
        }
    },
    {
        title: 'Girlfriend',
        location: {
            lat: 50.801519,
            lng: 4.367821
        }
    },
    {
        title: 'Café Belga',
        location: {
            lat: 50.827278,
            lng: 4.367821
        }
    },
    {
        title: 'Jeux d hivers',
        location: {
            lat: 50.811551,
            lng: 4.372967
        }
    }
];



// Create a styles array to use with the map.
var styles = [{
    featureType: 'water',
    stylers: [{
        color: '#19a0d8'
    }]
}, {
    featureType: 'administrative',
    elementType: 'labels.text.stroke',
    stylers: [{
            color: '#ffffff'
        },
        {
            weight: 6
        }
    ]
}, {
    featureType: 'administrative',
    elementType: 'labels.text.fill',
    stylers: [{
        color: '#e85113'
    }]
}, {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{
            color: '#efe9e4'
        },
        {
            lightness: -40
        }
    ]
}, {
    featureType: 'transit.station',
    stylers: [{
            weight: 9
        },
        {
            hue: '#e85113'
        }
    ]
}, {
    featureType: 'road.highway',
    elementType: 'labels.icon',
    stylers: [{
        visibility: 'off'
    }]
}, {
    featureType: 'water',
    elementType: 'labels.text.stroke',
    stylers: [{
        lightness: 100
    }]
}, {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{
        lightness: -100
    }]
}, {
    featureType: 'poi',
    elementType: 'geometry',
    stylers: [{
            visibility: 'on'
        },
        {
            color: '#f0e4d3'
        }
    ]
}, {
    featureType: 'road.highway',
    elementType: 'geometry.fill',
    stylers: [{
            color: '#efe9e4'
        },
        {
            lightness: -25
        }
    ]
}];