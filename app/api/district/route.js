import locations from '../../../data/locations.json';

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const searchQuery = searchParams.get('search')?.toLowerCase() || '';

    const headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*', // allow all origins
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
    };

    // Handle OPTIONS request for preflight
    if (req.method === 'OPTIONS') {
        return new Response(null, { headers });
    }

    // If no search query, return districts only
    if (!searchQuery) {
        const districtsOnly = locations.districts.map(({ id, name_en, name_bn }) => ({
            id,
            name_en,
            name_bn
        }));
        return new Response(
            JSON.stringify({
                status: 200,
                success: true,
                data: districtsOnly
            }),
            { headers }
        );
    }

    // Search for district
    const districtMatch = locations.districts.find(
        (district) =>
            district.name_en.toLowerCase().includes(searchQuery) ||
            district.name_bn.includes(searchQuery)
    );

    if (districtMatch) {
        return new Response(
            JSON.stringify({
                status: 200,
                success: true,
                data: {
                    id: districtMatch.id,
                    name_en: districtMatch.name_en,
                    name_bn: districtMatch.name_bn,
                    police_stations: districtMatch.police_stations
                }
            }),
            { headers }
        );
    }

    // Search for police station
    for (const district of locations.districts) {
        const psMatch = district.police_stations.find(
            (ps) =>
                ps.name_en.toLowerCase().includes(searchQuery) ||
                ps.name_bn.includes(searchQuery)
        );

        if (psMatch) {
            return new Response(
                JSON.stringify({
                    status: 200,
                    success: true,
                    data: {
                        district_id: district.id,
                        district_name_en: district.name_en,
                        district_name_bn: district.name_bn,
                        police_stations: [psMatch]
                    }
                }),
                { headers }
            );
        }
    }

    // No match found
    return new Response(
        JSON.stringify({
            status: 404,
            success: false,
            message: 'No matching district or police station found'
        }),
        { headers, status: 404 }
    );
}
