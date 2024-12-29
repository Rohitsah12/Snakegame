document.addEventListener('DOMContentLoaded',function (){
    const gameArena = document.getElementById('game-arena')
    const arenaSize=600;
    const cellSize=20;
    let score=0;
    let gameStarted=false;
    let food={x:300,y:200}; // {x:15*20,y:10*20} // -> cell coordinate -> pixels
    let snake = [{x:160,y:200},{x:140,y:200},{x:120,y:200}];

    function drawDiv(x,y,className){
        const divElement=document.createElement('div');
        divElement.classList.add(className);
        divElement.style.top=`{y}px`;
        divElement.style.left=`{x}px`;
        return divElement
    }


    function drawFoodAndSnake(){
        gameArena.innerHTML='';//clear the game arena
        //wipe out everythin and redraw with new positions

        const foodELement = drawDiv(food.x,food.y,'food');
    }

    function runGame(){
        if(!gameStarted){
            gameStarted=true;
            //gameLoop: todo
        }
    }


    function initiateGame(){
        const scoreBoard=document.createElement('div');
        scoreBoard.id='score-board';
        document.body.insertBefore(scoreBoard,gameArena);//Insert score board before game arena
        const startButton=document.createElement('button');
        startButton.textContent='Start';
        startButton.classList.add('start-button');

        startButton.addEventListener('click',function startGame(){
            startButton.style.display='none'; //Hide start button

            runGame();
        });


        document.body.appendChild(startButton);
    }
    initiateGame();
});