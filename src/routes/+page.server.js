import { supabase } from "$lib/supabaseClient";
// import {API_KEY} from '$env/static/public';

export async function load({fetch}) {
    const today = new Date().toISOString().split('T')[0];
    console.log('THIS IS TODAY ON DB:');
    console.log(today)
    const url = `https://api-football-v1.p.rapidapi.com/v3/fixtures?date=${today}&league=39&season=2023&timezone=Europe%2FKyiv`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': "9b629c4000msh5f1e9f22f14de23p12cb4cjsn5860dd1d131a",
            'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
        }
    };
    // * DB CHECK FOR AVAILABILITY OF TODAY's DATA
    let { data: days} = await supabase
        .from('days')
        .select('*')
        // console.log('this is the CHECK BEFORE API CALL:',days)
    if (days.length === 0) {                                        // * IF NO DATA IS FOUND, MAKE AN API FETCH
        const response = await fetch(url, options);
        const result = await response.json();
        // console.log('THIS DATA HAS BEEN FETCHED FROM API DUE TO ABSENSE OF IT ON DB')
        // console.log(result.response)
    // * PASSING FETCHED DATA TO DB
        const { data } = await supabase
        .from('days')
        .insert([
            { created_at: today, jsondata: result.response },
        ])
    // * READING THIS VERY DATA FROM DB
        let { data: days } = await supabase
        .from('days')
        .select({'created_at': today})
            return {days};
    } else { // * IF THERE IS DATA ON THE DB -- GET IT.
        let { data: days } = await supabase
        .from('days')
        .select('*')
        // console.log('THIS DATA HAS BEEN FETCHED FROM DB, AS IT HAS BEEN ALREADY TAKEN FROM API PREVIOUSLY')
        // console.log(days);
        return {days};
    }
}

// export const actions = {
//     default: async ({request}) => {
//         console.log()
//         console.log(request)
//         const formData = await request.formData();
//         console.log(formData);
//     }
// }