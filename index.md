<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="author" content="Jiadi Tao">
    <meta name="description" content="BEAT DASH | Online Rhythm Based Web Game">
    <title>BEAT DASH</title>
    <link rel="stylesheet" href="css/styles.css">
</head>

<body>
    <img src="images\Y1CdY87.png">
    <header class="menu">
        <h1>🎶</h1>
        <div>
            <h1 class="run">BEAT DASH</h1>
            <h1 class="ins_button">INSTRUCTION</h1>
        </div>
        <h1>🔥</h1>
    </header>
    <aside class="invisible" id="health">
        <h1>Health</h1>
        <h1>10</h1>
    </aside>
    <header class="gameWindow invisible">
        <div class="gameboard">
            <div class="tile" id="a">
            </div>
            <div class="tile" id="d">
            </div>
            <div class="tile" id="j">
            </div>
            <div class="tile" id="l">
            </div>

            <div class="detect"></div>
            <div class="detect"></div>
            <div class="detect"></div>
            <div class="detect"></div>

            <div class="control">
                A
            </div>
            <div class="control">
                D
            </div>
            <div class="control">
                J
            </div>
            <div class="control">
                L
            </div>
        </div>
    </header>
    <aside class="invisible" id="score">
        <h1>Score</h1>
        <h1>0</h1>
    </aside>
    <div class="instruction invisible">
        <h2>
            🎵🎵 Game Instruction 🎵🎵
        </h2>
        <h3>
            Welcome to BEAT DASH. This is a rhythm game where you try to time you key at the moment the beat bars lands in the 
            grey slots. The controls for this game are A, D, J, and L, each is responsible for the four columns. Whenever a beat bar is missed
            one health point will be deducted. When the health drops to the zero the game is over.
            Lets see what is the highest score you can get!
        </h3>
        <h1 id="got_it">
            GOT IT!
        </h1>
    </div>
    <div id="ready">
        <h1 class="invisible">
            3
        </h1>
        <h1 class="invisible">
            2
        </h1>
        <h1 class="invisible">
            1
        </h1>
        <h1 class="invisible">
            GO!
        </h1>
    </div>
    <script src="./js/main.js"></script>
</body>
