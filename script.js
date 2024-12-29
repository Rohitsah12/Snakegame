document.addEventListener('DOMContentLoaded',function (){
    const gameArena = document.getElementById('game-arena')
    const arenaSize=600;
    const cellSize=20;
    let score=0;
    let gameStarted=false;
    let food={x:300,y:200}; // {x:15*20,y:10*20} // -> cell coordinate -> pixels top left pixels for food
    let snake = [{x:160,y:200},{x:140,y:200},{x:120,y:200}];//[head,body,body,tail]

    let dx=cellSize; //+20
    let dy=0;


    function updateSnake(){
        const newHead={x : snake[0].x+dx,y: snake[0].y+dy};
        snake.unshift(newHead);//Add new head to the snake

        //check collision with food
        if(newHead.x===food.x && newHead.y===food.y){
            score+=10;
            // TODO: move food
        }
        else{
            snake.pop();//remove tail
        }
    }

    function changeDirection(e){
        console.log('Key pressed',e);
        const isGoingDown=dy===cellSize;
        const isGoingUp=dy===-cellSize;
        const isGoingRight=dx===cellSize;
        const isGoingleft=dx===-cellSize;
        if(e.key==='Arrowup' && !isGoingDown){
            dx=0;
            dy=-cellSize;
        }else if(e.key==='ArrowDown' && !isGoingUp){
            dx=0;
            dy=cellSize;
        }
        else if(e.key==='ArrowLeft' && !isGoingRight){
            dx=-cellSize;
            dy=0;
        }
        else if(e.key==='ArrowRight' && !isGoingleft){
            dx=cellSize;
            dy=0;
        }
    }


    function drawDiv(x,y,className){
        const divElement=document.createElement('div');
        divElement.classList.add(className);
        divElement.style.top=`${y}px`;
        divElement.style.left=`${x}px`;
        return divElement
    }


    function drawFoodAndSnake(){
        gameArena.innerHTML='';//clear the game arena
        //wipe out everythin and redraw with new positions


        snake.forEach((snakeCell)=>{
            const snakeElement=drawDiv(snakeCell.x,snakeCell.y,'snake');
            gameArena.appendChild(snakeElement);
        })

        const foodELement = drawDiv(food.x,food.y,'food');
        gameArena.appendChild(foodELement);
    }


    function gameLoop(){
        setInterval(()=>{
            updateSnake();
            drawFoodAndSnake();
        },200);
    }

    function runGame(){
        if(!gameStarted){
            gameStarted=true;
            //gameLoop: todo
            document.addEventListener('keydown',changeDirection);
            gameLoop();
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