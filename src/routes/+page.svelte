<script>
    import '../app.css';
    export let data;
    let fixtures = data.days[0].jsondata;
    console.log(fixtures)
    let PLAYED_WEEK = 23;
    let displayedWeek = 23;
    let NOW = new Date().getMilliseconds();
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
    const changeDay = (e) => {
        console.log(e.target.textContent)
        if (e.target.textContent.includes('Show previous')) {
            displayedWeek = displayedWeek - 1;
        } else if (e.target.textContent.includes('Show upcoming')) {
            displayedWeek = displayedWeek + 1;
        }
    }
    const nullHandler = (str) => {
        if (str == null) {
            return 'TBU'
        } else {
            return str.split(',')[0];
        }    
    }
    const getTime = (date) => {
        const newDate = new Date(date).toUTCString();
        const parts = newDate.split(' ');
        return parts[4].slice(0, 5);
    }
    const getDay = (date) => {
        const newDate = new Date(date).toUTCString();
        const parts = newDate.split(' ')
        return parts[0] + ' ' + parts[1] + ' ' + parts[2] + ', ' + parts[3];
    }

</script>

<main class="container">
    <h2>fixtures</h2>
    <section class="logo">
        <span class="dateIndicator">{getDay(fixtures[0].fixture.date)}</span>
    </section>
    <!-- <form method="POST">
        <button  class="prev" >&#10096; Show previous</button>
        <button class="next" >Show upcoming &#10097;</button>
    </form> -->
    <section class="fixtures">
        {#each fixtures.sort((a,b) => a.fixture.timestamp - b.fixture.timestamp) as fixture}
           <article class="fixtureSlot">
                <section class="topSection">
                    <div class="home">
                        <img src="{fixture.teams.home.logo}" alt="team logo">
                        <span class="teamName">{nameShortener(fixture.teams.home.name)}</span>
                    </div>
                    <div class="score">
                        {#if fixture.score.fulltime.home == null}
                            <p class="time">{getTime(fixture.fixture.date)}</p>
                        {:else}
                        <p class="scoreParagraph">{fixture.score.fulltime.home} - {fixture.score.fulltime.away}</p>
                        {/if}
                    </div>
                    <div class="away">
                        <span class="teamName">{nameShortener(fixture.teams.away.name)}</span>
                        <img src="{fixture.teams.away.logo}" alt="team logo">
                    </div>
            </article>
        {/each}
    </section>
</main>


<style>
main {
    margin-top: 3em;
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
p.time {
    font-size: 12px;
    text-align: center;
}
/* button {
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
} */
span.dateIndicator {
    font-size: 15px;
}

</style>
