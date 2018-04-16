$(document).ready(function() {
    let canvas = $('#canvas')[0];
    let context = canvas.getContext('2d');
    let width = $('#canvas').width();
    let height = $('#canvas').height();

    let cell_width = 10;
    let run;
    let food;
    let snake_array;
    let score;
        
    // create snake
    let create_snake = () => {
        let snake_size = 5;
        snake_array = [];
        for (let i = snake_size-1; i >= 0; i--) {
            snake_array.push({x:i, y:0});   
        }
    };

    //create food
    let create_food = () => {
        food = {
            x: Math.round(Math.random() * (width - cell_width) / cell_width),
            y: Math.round(Math.random() * (height - cell_width) / cell_width)
        }
    };

    // paint the stage
    let stage_color = () => {
        context.fillStyle = 'white';
        context.fillRect(0, 0, width, height);
		context.strokeStyle = "black";	
		context.strokeRect(0, 0, width, height);
    };

    // paint function
    let paint_cell = (x, y) => {
		context.fillStyle = "black";
		context.fillRect(x * cell_width, y * cell_width, cell_width, cell_width);
		context.strokeStyle = "white";	
		context.strokeRect(x * cell_width, y * cell_width, cell_width, cell_width);
    };


    let config = () => {
        
        stage_color();

        let nx = snake_array[0].x;
        let ny = snake_array[0].y;

        switch(run) {
            case 'right':
                nx++;
                break;
            case 'left':
                nx--;
                break;
            case 'down':
                ny++;
                break;
            case 'up':
                ny--;
                break;        
        }

        if(nx == -1 || nx == width/cell_width || ny ==-1 || ny == height/cell_width || collision(nx, ny, snake_array)) {
            start();
            $('#nilai').text(score);
            return;
        }

        if(nx==food.x && ny == food.y) {
            let tail = {x: nx, y:ny};
            score++;
            create_food();
            $('#nilai').text(score);
        }
        else{
            snake_array.pop();
        }

        let next_head = {x: nx, y: ny};
        snake_array.unshift(next_head);
        

        for (let i = 0; i < snake_array.length; i++) {
            let c = snake_array[i];
            paint_cell(c.x, c.y);
        }

        paint_cell(food.x, food.y);
    }

    let collision = (x, y, array) => {
        for (let i = 0; i < array.length; i++) {
            if(array[i].x == x && array[i].y == y) {
                return true;
            }
        }
        return false;
    }

    $(document).keydown((e) => {
        let key = e.which;

        if(key == "37" && run != "right") run = "left";
		else if(key == "38" && run != "down") run = "up";
		else if(key == "39" && run != "left") run = "right";
		else if(key == "40" && run != "up") run = "down";
    });

    let start = () => {
        run = 'right';
        score = 0;
        create_food();
        create_snake();
        if(typeof game_loop != "undefined") clearInterval(game_loop);
        game_loop = setInterval(config, 60);
    }

    start();

});