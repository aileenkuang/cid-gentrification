// Load GeoJSON data
const fs = require('fs');

const builtUnitsFile = 'assets/built-units-since-2010.geojson';

fs.readFile(builtUnitsFile, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading GeoJSON file:', err);
        return;
    }

    const builtUnitsData = JSON.parse(data);

    function cleanGeoJSON(data) {
        var unneccesaryProperties = ['LOT_SIZE', 'PRMT_NR', 'MUP_APNO', 'STGLSTTITL', 'SLEEPING_ROOMS',
                            'COMMENTS', 'APP_DATE', 'ISS_DATE', 'YEAR_ISSUED', 'VILLNUMB',
                            'NAME', 'TYPE_NAME', 'COMP_PLAN_NAME', 'COMP_PLAN_TYPE', 'CRA_NO',
                            'CRA', 'SOURCE', 'MAF_ID', 'DEVSITE_ID', 'RECORDNUMBER', 'STATUS_COLOR',
                            'FINAL_DATE', 'EXPIRE_DATE', 'ZONING_FULL', 'ZONING_PRIMARY', 'ZONING_REPORT',
                            'CATEGORY', 'CONSTR_PRMT_PARENT', 'Q_ISSUED', 'Q_Y_ISSUED', 'Q_FINAL',
                            'Q_Y_FINAL', 'INSPECTION_DATE', 'INSPECTION_TYPE'
                        ]
        data.features.forEach(feature => {
            for (let i = 0; i < unneccesaryProperties.length; i++) {
                delete feature.properties[unneccesaryProperties[i]]
            }
        });
        return data
    }

    const cleanedBuiltUnitsData = cleanGeoJSON(builtUnitsData)

    const cleanedDataString = JSON.stringify(cleanedBuiltUnitsData, null, 2);
    fs.writeFile('assets/built-units-since-2010.geojson', cleanedDataString, (writeErr) => {
        if (writeErr) {
            console.error('Error writing cleaned GeoJSON file:', writeErr);
        } else {
            console.log('GeoJSON file cleaned and daved successfully.');
        }
    });
})

