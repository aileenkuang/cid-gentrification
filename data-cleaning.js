// Load GeoJSON data
const fs = require('fs');

const builtUnitsFile = 'assets/built-units-since-2010.geojson';

fs.readFile(builtUnitsFile, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading GeoJSON file:', err);
        return;
    }

    const builtUnitsData = JSON.parse(data);

    function deleteUnecessaryProperties(data) {
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

    // Function to delete entries that are duplicated
    function deleteDuplicateEntries(data, addressProperty, yearProperty,
        permitProperty) {
        const uniqueFeatures = {};

        data.features.forEach(feature => {
            const address = feature.properties[addressProperty];
            const year = feature.properties[yearProperty];
            const permit = feature.properties[permitProperty]
            const key = `${address}-${year}-${permit}`;

            if (!uniqueFeatures[key]) {
                uniqueFeatures[key] = feature;
            } else {
                return;
            }
        });

        const uniqueFeaturesArray = Object.values(uniqueFeatures);

        data.features = uniqueFeaturesArray;

        return data;
    }

    const cleanedBuiltUnitsData = deleteUnecessaryProperties(builtUnitsData)
    const dataWithoutDuplicates = deleteDuplicateEntries(cleanedBuiltUnitsData, 
        "ADDRESS", "YEAR", "APTYPE")

    const cleanedDataString = JSON.stringify(dataWithoutDuplicates, null, 2);
    
    fs.writeFile('assets/built-units-since-2010.geojson', cleanedDataString, (writeErr) => {
        if (writeErr) {
            console.error('Error writing cleaned GeoJSON file:', writeErr);
        } else {
            console.log('GeoJSON file cleaned and saved successfully.');
        }
    });

})

const cleanedFile = 'assets/built-units-since-2010.geojson';

fs.readFile(cleanedFile, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading GeoJSON file:', err);
        return;
    }

    const cleanedData = JSON.parse(data);

    // Get the number of features
    const numberOfFeatures = cleanedData.features.length;

    console.log(`Number of features in the GeoJSON: ${numberOfFeatures}`);
});