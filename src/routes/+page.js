import { supabase } from "$lib/supabaseClient";

export async function load({fetch}) {
    // const url = 'https://api-football-v1.p.rapidapi.com/v3/fixtures?league=39&season=2023&round=Regular%20Season%20-%2026&timezone=Europe%2FKyiv';
    // const options = {
    //     method: 'GET',
    //     headers: {
    //         'X-RapidAPI-Key': '9b629c4000msh5f1e9f22f14de23p12cb4cjsn5860dd1d131a',
    //         'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
    //     }
    // };
    try {
        // const response = await fetch(url, options);
        // const result = await response.json();
        // const { data, error } = await supabase
        //     .from('gameweeks')
        //     .insert([
        //                 { id: '26', gameweek: '26', jsondata: result},
        //             ])
        //     .select()
        
        let { data: gameweeks, error } = await supabase
            .from('gameweeks')
            .select('*')
        
        return {
            data:gameweeks
        }
    }
    catch (error) {
        console.error(error);
    }
}