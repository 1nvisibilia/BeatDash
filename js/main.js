// Global Constants & Variables
const NUM_INPUT = 4;
const CONTROL_BAR = document.querySelectorAll(".gameWindow .gameboard .control");
const PATH_BAR = document.querySelectorAll(".gameWindow .gameboard .tile");
const INIT_LEFT = 30.3;
const INIT_WIDTH = 9;
const EMPTY_SLOT = -10;
let all_top_styles = [];
let all_hits = [];
let lost_game = false;
let game_started = false;


// Listners
document.querySelector(".ins_button").addEventListener("click", () =>
{
    let instruct_window = document.querySelector("body div.instruction");

    instruct_window.style.opacity = "0.0";
    instruct_window.classList.remove("invisible");

    setTimeout(() =>
    {
        instruct_window.classList.remove("appear");
        instruct_window.style.opacity = "1.0";
    }, 670);

    instruct_window.classList.add("appear");
});

document.querySelector("#got_it").addEventListener("click", () =>
{
    let instruct_window = document.querySelector("body div.instruction");

    setTimeout(() =>
    {
        instruct_window.classList.remove("disappear");
        instruct_window.style.opacity = "0.0";
        instruct_window.classList.add("invisible");
    }, 670);

    instruct_window.classList.add("disappear");
});

document.querySelector(".run").addEventListener("click", () =>
{
    let background = document.querySelector("body img");
    let startMenu = document.querySelector("header.menu");
    let gameWindow = document.querySelector("header.gameWindow");
    let all_texts = document.querySelectorAll("header.menu h1");

    setTimeout(() =>
    {
        all_texts.forEach(e => e.classList.add("invisible"));
        all_texts.forEach(e => e.classList.remove("fade"));
        startMenu.style.margin = "auto";
        startMenu.classList.add("remove-menu");
    }, 470);

    setTimeout(() =>
    {
        startMenu.classList.add("invisible");
        gameWindow.classList.remove("invisible");
        startMenu.classList.remove("remove-menu");
        background.classList.add("darken-screen");
        gameWindow.classList.add("expand-game");
    }, 1170);

    setTimeout(() =>
    {
        background.classList.remove("darken-screen");
        background.style.opacity = "0.6";
        gameWindow.style.height = "100vh";
        get_ready();
    }, 1870);

    all_texts.forEach(e => e.classList.add("fade"));
});

document.addEventListener('keypress', logKey);


// Methods
function logKey(e)
{
    var keynum;

    if(window.event)
    {
        keynum = e.keyCode;
    }
    else if (e.which)
    {
        keynum = e.which;
    }
    let input = String.fromCharCode(keynum);

    if (input == "A" || input == "a")
    {
        result("a");
        flash(CONTROL_BAR[0], "rgb(25, 72, 78)", "red");
    } 
    else if (input == "D" || input == "d")
    {
        result("d");
        flash(CONTROL_BAR[1], "rgb(25, 72, 78)", "purple");
    } 
    else if (input == "J" || input == "j")
    {
        result("j");
        flash(CONTROL_BAR[2], "rgb(25, 72, 78)", "green");
    } 
    else if (input == "L" || input == "l")
    {
        result("l");
        flash(CONTROL_BAR[3], "rgb(25, 72, 78)", "blue");
    }
}

function reset ()
{
    document.querySelectorAll("#score h1")[1].innerHTML = "0";
    document.querySelector("#score").classList.add("invisible");
    document.querySelector("#health").classList.add("invisible");
    document.querySelector("body img").style.opacity = 0.0;
    document.querySelector("header.gameWindow").classList.add("invisible");;
    document.querySelector("header.menu").classList.remove("invisible");
    let all_h1 = document.querySelectorAll(".menu * ");
    lost_game = false;

    all_h1.forEach(element =>
    {
        element.classList.remove("invisible");
    });
}

function result (bar_class)
{
    if (game_started) {
        let current_beats = document.querySelectorAll(".gameboard div#" + bar_class + " div");
        let current_score = document.querySelectorAll("#score h1")[1].innerHTML;
        let current_health = document.querySelectorAll("#health h1")[1].innerHTML;
        let success_hit = false;
        let top_style_index = 0;

        for (let i = 0; i < current_beats.length; i ++)
        {
            top_style_index = Number(current_beats[i].id);
            if (all_top_styles[top_style_index] > 78)
            {
                all_hits[top_style_index] = true;
                success_hit = true;
                break;
            }
        }
        if (success_hit)
        {
            document.querySelectorAll("#score h1")[1].innerHTML = parseInt(current_score, 10) + 1;
        }
        else
        {
            document.querySelectorAll("#health h1")[1].innerHTML = parseInt(current_health, 10) - 1;
            if (document.querySelectorAll("#health h1")[1].innerHTML == "0")
            {
                lost_game = true;
            }
        }
    }
}


function pending_delete (element, index)
{
    let i = index;
    setTimeout(() =>
    {
        console.log(all_top_styles[index]);
        if (!all_hits[index])
        {
            let current_health = document.querySelectorAll("#health h1")[1].innerHTML;
            document.querySelectorAll("#health h1")[1].innerHTML = parseInt(current_health, 10) - 1;
            if (document.querySelectorAll("#health h1")[1].innerHTML == "0")
            {
                lost_game = true;
            }
        }
        all_top_styles[index] = EMPTY_SLOT;
        all_hits[index] = false;
        element.remove();
    }, 3620);
}

function generate_index ()
{
    for (let i = 0; i < all_top_styles.length; i ++)
    {
        if (all_top_styles[i] == EMPTY_SLOT)
        {
            return i;
        }
    }
    all_top_styles.push(EMPTY_SLOT);
    all_hits.push(false);
    return all_top_styles.length - 1;
}

function fall_down (beat, index)
{
    all_top_styles[index] = -6.5;

    let falling = setInterval(() =>
    {
        if (all_top_styles[index] < 83)
        {
            all_top_styles[index] += 0.10;
            beat.style.top = all_top_styles[index] + "%";
        }
        else
        {
            clearInterval(falling);
        }
    }, 4);
}

function run_game (time_int)
{
    setTimeout(() =>
    {
        let slot = 0;
        let path = null;
        let beat = null;
        let falling_index = 0;
        
        slot = Math.floor(Math.random() * 4);
        path = PATH_BAR[slot];

        beat = document.createElement("div");
        beat.style.left = (INIT_LEFT + slot * 10) + "%";
        beat.style.width = INIT_WIDTH + "%";
        if (slot == 0)
        {
            beat.style.backgroundImage = "linear-gradient(white, red)";
            beat.style.borderColor = "red";
            beat.style.top = "-7%";
        }
        else if (slot == 1)
        {
            beat.style.backgroundImage = "linear-gradient(white, purple)";
            beat.style.borderColor = "purple";
            beat.style.top = "-7%";
        }
        else if (slot == 2)
        {
            beat.style.backgroundImage = "linear-gradient(white, green)";
            beat.style.borderColor = "green";
            beat.style.top = "-7%";
        }
        else
        {
            beat.style.backgroundImage = "linear-gradient(white, blue)";
            beat.style.borderColor = "blue";
            beat.style.top = "-7%";
        }

        path.appendChild(beat);
        falling_index = generate_index();
        beat.setAttribute("id", "" + falling_index);
        fall_down(beat, falling_index);
        pending_delete(beat, falling_index);
        if (!lost_game)
        {
            run_game(Math.random() * 600 + 400);
        }
        else
        {
            document.querySelectorAll("#score h1")[1].innerHTML = "0";
            alert("You lost. Your final score is " + document.querySelectorAll("#score h1")[1].innerHTML + ".");
            reset();
        }
    }, time_int);
}

function flash (element, original, newCol)
{
    element.style.backgroundColor = newCol;
    setTimeout(() =>
    {
        element.style.backgroundColor = original;
    }, 200);
}

function count_down ()
{
    let signal = document.querySelectorAll("#ready h1");
    let current_idx = 0;
    let signal_message = setInterval(() =>
    {
        if (current_idx < signal.length)
        {
            signal[current_idx].classList.remove("invisible");
            setTimeout(() =>
            {
                signal[current_idx - 1].classList.add("invisible");
            }, 650);
            current_idx ++;
        }
        else
        {
            clearInterval(signal_message);
            let score = document.querySelector("#score");
            let health = document.querySelector("#health");
            score.classList.remove("invisible");
            health.classList.remove("invisible");
            document.querySelectorAll("#health h1")[1].innerHTML = "10";
            game_started = true;
            run_game(0);
        }
    }, 700);
}

function get_ready ()
{
    let keypad = document.querySelectorAll("body header div.detect");
    let current_pad = 0;
    let ready_flash = setInterval(() =>
    {
        if (current_pad < NUM_INPUT)
        {
            flash(keypad[current_pad], "rgb(161, 159, 159)", "yellow");
            current_pad ++;
        }
        else
        {
            clearInterval(ready_flash);
            count_down();
        }
    }, 400);
}