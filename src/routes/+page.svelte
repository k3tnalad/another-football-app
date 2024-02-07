<script>
    import '../app.css';

    import {fly, fade} from 'svelte/transition';
    export let data;
    let PLAYED_WEEK = 23;
    let displayedWeek = 23;
    let visible = true;
    let gameweeks = {
            23: data.data[0].jsondata.response,   
            24: data.data[1].jsondata.response,
            22: data.data[2].jsondata.response,
            21: data.data[3].jsondata.response,
            20: data.data[4].jsondata.response,
            19: data.data[5].jsondata.response,
            18: data.data[6].jsondata.response,
            17: data.data[7].jsondata.response,
            16: data.data[8].jsondata.response,
            15: data.data[9].jsondata.response,
            14: data.data[10].jsondata.response,
            25: data.data[11].jsondata.response,
            26: data.data[12].jsondata.response,
        }
    const nameShortener = (string) => {
      if (string === 'Nottingham Forest') {
        return 'N. Forest'
        } else if (string === 'Manchester City') {
        return 'Man City'
        } else if (string === 'Manchester United') {
            return 'Man United'
        } else if (string === 'Crystal Palace') {
            return 'C. Palace';
        } else {
            return string;
      }
    }
    const changeWeek = (e) => {
        console.log(e.target.textContent)
        if (e.target.textContent.includes('Show previous')) {
            visible = !visible;
            displayedWeek = displayedWeek - 1;
            visible = !visible;
        } else if (e.target.textContent.includes('Show upcoming')) {
            visible = !visible;
            displayedWeek = displayedWeek + 1;
            visible = !visible;
        }
    }
    const nullHandler = (str) => {
        if (str == null) {
            return 'TBU'
        } else {
            return str.split(',')[0];
        }    
    }
    const dateHandler = (str) => {
        const date = new Date(str);
        let formattedDate = date.toUTCString();
        let parts = formattedDate.split(' ');
        let time = parts[4].slice(0,5);
        let day = parts[1] + ' ' + parts[2] + ', ' + parts[3];
        return [time, day];
    }
</script>

<main class="container">
    <section out:fade class="logo">
        <h2 >another one</h2>
        <span class="gwIndicator">Gameweek: {displayedWeek}</span>
    </section>

    <button class="prev" on:click={changeWeek}>&#10096; Show previous</button>
    <section class="fixtures">
        {#each gameweeks[displayedWeek] as fixture}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
           <article class="fixtureSlot">
                <section class="topSection">
                    <div class="home">
                        <img src="{fixture.teams.home.logo}" alt="team logo">
                        <span class="teamName">{nameShortener(fixture.teams.home.name)}</span>
                    </div>
                    <div class="score">
                        {#if fixture.score.fulltime.home == null}
                            <p class="time">{dateHandler(fixture.fixture.date)[0]}</p>
                            <p class="day">{dateHandler(fixture.fixture.date)[1]}</p>
                        {:else}
                        <p class="scoreParagraph">{fixture.score.fulltime.home} - {fixture.score.fulltime.away}</p>
                        {/if}
                    </div>
                    <div class="away">
                        <span class="teamName">{nameShortener(fixture.teams.away.name)}</span>
                        <img src="{fixture.teams.away.logo}" alt="team logo">
                    </div>
                </section>
                <section class="bottomSection">
                    <span>{nullHandler(fixture.fixture.referee)}</span>
                    <span>{fixture.fixture.venue.name}</span>
                    <span>Gameweek: {(fixture.league.round).split(' - ')[1]}</span>
                </section>
            </article>
        {/each}
    </section>
    <button class="next" on:click={changeWeek}>Show upcoming &#10097;</button>
</main>


<style>
main {
    padding: .5em;
}
section.logo {
    display: grid;
    place-items: center;
    padding: 1em 0;
    color: rgba(138, 236, 187, 0.74);
}
article.fixtureSlot {
    margin-bottom: 1em;
    font-weight: 300;
}
section.fixtures > article.fixtureSlot:last-of-type {
    margin-bottom: 0;
}
article.fixtureSlot > section.topSection {
    backdrop-filter: blur(15px);
    height: 40px;
    background-color: rgba(255, 255, 255, 0.2); 
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    align-items: center;
    padding: .3em 0;
    font-size: 14px;
    box-shadow: 0 15px 25px rgba(129, 124, 124, 0.2);
}
article.fixtureSlot > section.bottomSection {
    backdrop-filter: blur(15px);
    background-color: rgb(32, 32, 32); 
    font-size: 10px;
    display: grid;
    grid-template-columns: auto 1fr auto;
    text-align: center;
    padding: .3em 1em;
}
/* article.fixtureSlot > section.bottomSection > span:nth-of-type(1), 
article.fixtureSlot > section.bottomSection > span:nth-of-type(2) {
    border-right: 1px solid grey;
} */
div.home {
    display: flex;
    align-items: center;
    gap: .4em;
    padding-left: .3em;
}
div.away {
    display: flex;
    align-items: center;
    justify-content: right;
    gap: .4em;
    padding-right: .3em;
}
p.time, p.day {
    font-size: 12px;
    text-align: center;
}
button {
    border: none;
    background: none;
    color: rgba(138, 236, 187, 0.74);
    font-size: 18px;
    padding: .5em 0;
    transition: all 150ms ease-in;
    cursor: pointer;
}
button:hover {
    color: rgba(0, 255, 128, 0.74);
    transform: scale(1.05);
    transform-origin: center;
}

button.next {
    width: 100%;
    text-align: right;
}
span.gwIndicator {
    font-size: 15px;
}

</style>
