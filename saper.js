let fild = document.querySelectorAll('button')
var nt
var cnt
function gg(){
    nt = restart()
}
gg()
function restart() {
    cnt = 0
	fild.forEach( (b) => {
        b.innerText = ""
        b.disabled = false;
    })
    let board = Array(10).fill().map(() => Array(10).fill(0));
    let counter = 0;
    let cache = [];
    while (counter < 10) {
        let x = Math.floor(Math.random() * 10);
        let y = Math.floor(Math.random() * 10);
        if (board[x][y] !== "💣") {
            cache.push({ x: x, y: y });
            board[x][y] = "💣";
            counter++;
        }
    }
    for (let bomb of cache) {
        let x = bomb.x;
        let y = bomb.y;
        for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {
                if (dx === 0 && dy === 0) continue;
                let ddx = x + dx;
                let ddy = y + dy;
                if (ddx >= 0 && ddx < 10 && ddy >= 0 && ddy < 10 && board[ddx][ddy] !== "💣") {
                    board[ddx][ddy]++;
                }
            }
        }
    }
    return board
}
function open(button,i){
    function open0(arr) {
        let cache = [];
        for (let e of arr) {
            for (let i = -1; i <= 1; i++) {
                for (let j = -1; j <= 1; j++) {
                    if (i === 0 && j === 0) continue;
                    let dx = e.x + i;
                    let dy = e.y + j;
                    if (dx >= 0 && dx < 10 && dy >= 0 && dy < 10) {
                        let target = fild[dx * 10 + dy];
                        target.disabled = true
                        if (target.innerText === "" || target.innerText === "🚩") {
                            target.innerText = nt[dx][dy];
                            cnt++
                            if (nt[dx][dy] === 0) {
                                cache.push({ x: dx, y: dy });
                            }
                        }
                    }
                }
            }
        }
        if (cache.length > 0) open0(cache);
    }
	button.addEventListener( "click", () => {
        cnt++
        button.innerText = nt[Math.floor(i / 10)][i % 10]
        button.disabled = true
        if(nt[Math.floor(i / 10)][i % 10] === "💣"){
            fild.forEach( (b,index) => {
                b.innerText = nt[Math.floor(index / 10)][index % 10];
                b.disabled = true;
            })
        }
        if(nt[Math.floor(i / 10)][i % 10] === 0){
            open0([{x:Math.floor(i / 10),y:i % 10}])
        }
        if(cnt === 90){
            nt = restart()
        }
    })
    button.addEventListener("contextmenu",(e) => { 
        e.preventDefault();
        if(button.innerText === '🚩' || button.innerText === '') {
            button.innerText = button.innerText === '🚩' ? "" : '🚩';
            button.disabled = button.disabled ? false : true;
        }
    })
}


fild.forEach( (button,i) => open(button,i) )