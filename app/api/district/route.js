import locations from '../../../data/locations.json';

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const searchQuery = searchParams.get('search')?.toLowerCase() || '';

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
            { headers: { 'Content-Type': 'application/json' } }
        );
    }

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
            { headers: { 'Content-Type': 'application/json' } }
        );
    }

    let stationMatch = null;
    locations.districts.forEach((district) => {
        district.police_stations.forEach((ps) => {
            if (
                ps.name_en.toLowerCase().includes(searchQuery) ||
                ps.name_bn.includes(searchQuery)
            ) {
                stationMatch = {
                    district_id: district.id,
                    district_name_en: district.name_en,
                    district_name_bn: district.name_bn,
                    police_station: ps
                };
            }
        });
    });

    if (stationMatch) {
        return new Response(
            JSON.stringify({
                status: 200,
                success: true,
                data: stationMatch
            }),
            { headers: { 'Content-Type': 'application/json' } }
        );
    }

    return new Response(
        JSON.stringify({
            status: 404,
            success: false,
            message: 'No matching district or police station found'
        }),
        { headers: { 'Content-Type': 'application/json' }, status: 404 }
    );
}
