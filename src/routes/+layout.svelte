<script>
    import '../app.css'
    
    const closeBurger = (e) => {
      return e.target.parentElement.parentElement.parentElement.previousElementSibling.previousElementSibling.checked = false;   
    }
</script>

<main>
    <header>
        <h2>another one</h2>
            <input type="checkbox" class="toggle" id="nav-toggle">
            <label for="nav-toggle" id="nav-toggle-label">
                <div class="bar"></div>
                <div class="bar"></div>
                <div class="bar"></div>
              </label>
        <nav>
            <ul>
                <li>
                  <a on:click={closeBurger} href="/">fixtures</a>
                </li>
                <li>
                  <a on:click={closeBurger} href="/standings">standings</a>
                </li>
                <li>
                  <a on:click={closeBurger} href="/stats">stats</a>
                </li>
              </ul>
        </nav>
    </header>
    <slot></slot>
</main>
<style>
    header {
        padding-left: 1em;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        height: 3rem;
        font-size: 1rem;
        background: rgba(84, 118, 101, 0.74);
        color: #fffdfd;
        box-shadow: -2px 2px 8px 0px rgb(0 0 0 / 80%);
        z-index: 1;

        display: grid;
        align-items: center;
        justify-content: center;
        grid-auto-flow: column;
        grid-auto-columns: max-content;
    }
    header > h2 {
        justify-self: flex-start;
        font-size: small;
    }
    header ul {
        display: grid;
        grid-auto-flow: column;
        grid-auto-columns: max-content;
        grid-template-rows: 1fr;
        gap: 0.5rem;

        padding: 0rem 1.5rem;

        list-style-type: none;
    }
    header ul > li {
        display: grid;

        padding: 0.5rem;
    }   
    header a {
        display: flex;
        align-items: center;

        padding: 0rem 1.5rem;
        border-radius: 0.25rem;

        color: white;
        background-color: rgba(0, 0, 0, 0.1);

        text-decoration: none;

        transition: background-color 250ms ease-out;
    }

        header a:hover {
        background-color: rgba(28, 73, 30, 0.1);
    }
    #nav-toggle-label {
        display: none;
        cursor: pointer;
    }

    #nav-toggle {
    display: none;
    }
    @media screen and (max-width: 768px) {
        header nav {
            position: fixed;
            top: 0;
            bottom: 0;
            width: 24rem;
            right: 0rem;

            padding-top: 3rem;
            background: linear-gradient(300deg, #018a3a76, rgba(186, 74, 255, 0) 70%), 
                        linear-gradient(227deg, #013a1f24, rgba(0, 138, 255, 0) 70%),
                        linear-gradient(104deg, #043f3311, rgba(0, 255, 198, 0) 74%);
            box-shadow: -2px 2px 8px 0px rgb(0 0 0 / 80%);

            transition: clip-path 200ms ease-in, 
            background-color 200ms ease-in;
            clip-path: circle(
                        calc(3rem / 3)
                        at 
                        calc(100% - 3rem / 2) 
                        calc(0% + 3rem / 2)
                        );
            transition: clip-path 200ms ease-in, 
            background-color 200ms ease-in;
        }
    }
    @media screen and (max-width: 768px) {
        header {
            justify-content: space-between;
            align-items: center;
        }
        header ul {
            grid-auto-flow: row;
            grid-template-columns: 1fr;
            grid-template-rows: none;
            grid-auto-rows: max-content;
            gap: 0.5rem;

            padding: 0;
        }
        header a {
        place-content: flex-start;

        padding: 0.5rem 1.5rem;
        }

        header a:hover {
        background-color: #2b2b2b;
        }
    }

@media screen and (max-width: 768px) {
  #nav-toggle-label {
        --size: calc(3rem / 3);
        --bar-height: 2px;

        display: flex;
        flex-direction: column;
        justify-content: space-between;
        flex-basis: auto;

        width: var(--size);
        height: var(--size);
        margin-right: calc(3rem / 3);

        z-index: 2;
    }
    #nav-toggle-label .bar {
        --size: calc(3rem / 3);
        --bar-height: 2px;
        display: inline-block;
        height: var(--bar-height);
        border-radius: 1px;
        width: 100%;
        background-color: #ffffff;
        transition: transform 200ms ease-out;
    }

    /* ANIMATION OF THE BURGER */
    #nav-toggle:checked + #nav-toggle-label > .bar:nth-child(1) {
        transform: 
        translate(0, calc(var(--size) / 2 - var(--bar-height) / 2)) 
        rotate(225deg);
    }

    #nav-toggle:checked + #nav-toggle-label > .bar:nth-child(2) {
        transform: scaleX(0);
    }

    #nav-toggle:checked + #nav-toggle-label > .bar:nth-child(3) {
        transform: 
        translate(0, calc(-1 * var(--size) / 2 + var(--bar-height) / 2)) 
        rotate(135deg);
    }
    #nav-toggle:checked + * + nav {
        clip-path: circle(125vmax at 100% 0%);

        background-color: #2b2b2b;
    }
}

</style>