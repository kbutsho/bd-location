import locations from '../../../../data/locations.json';

export async function GET(req, { params }) {
    const { id } = params;

    const district = locations.districts.find(
        (d) => d.id.toString() === id.toString()
    );

    if (!district) {
        return new Response(
            JSON.stringify({
                status: 404,
                success: false,
                message: 'District not found'
            }),
            { headers: { 'Content-Type': 'application/json' }, status: 404 }
        );
    }

    return new Response(
        JSON.stringify({
            status: 200,
            success: true,
            id: district.id,
            name_en: district.name_en,
            name_bn: district.name_bn,
            police_stations: district.police_stations

        }),
        { headers: { 'Content-Type': 'application/json' } }
    );
}
