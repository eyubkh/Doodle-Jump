'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    const doodler = document.createElement('div');
    let doodelerLeftSpace = 0;
    let startPoint = 150;
    let doodelerBottomSpace = startPoint;
    let isGameOver = false;
    let plataform = [];
    let plataformCount = 5;
    let upTimerId;
    let downTimerId;
    let isJumping = true;
    let points = 0;

    // plus

    const btn = document.getElementById('btn');
    const btnOver = document.getElementById('btnOver');
    const gameOverConteiner = document.querySelector('.gameOver');
    const counter = document.getElementById('counter');
    const allPlataforms = document.querySelectorAll('.gird_platform');

    function createDoodler() {
        grid.appendChild(doodler);
        doodler.classList.add('gird_doodler');
        doodler.style.left = doodelerLeftSpace + 'px';
        doodler.style.bottom = doodelerBottomSpace + 'px';
        setInterval(() => {
            doodler.style.left = doodelerLeftSpace + 'px';
        }, 0);
    }

    // doodlor moves

    function jump() {
        isJumping = true;
        clearInterval(downTimerId);
        upTimerId = setInterval(() => {
            doodelerBottomSpace += 5;
            doodler.style.bottom = `${doodelerBottomSpace}px`;
            if (doodelerBottomSpace > startPoint + 130) {
                fall();
            }
        }, 30);
    }

    function fall() {
        isJumping = false;
        clearInterval(upTimerId);
        downTimerId = setInterval(() => {
            doodelerBottomSpace -= 5;
            doodler.style.bottom = `${doodelerBottomSpace}px`;
            if (doodelerBottomSpace <= 0) {
                GameOver();
            }

            plataform.map(plataform => {
                if (
                    doodelerLeftSpace >= plataform.left - 60 &&
                    doodelerLeftSpace <= plataform.left + 85 &&
                    doodelerBottomSpace > plataform.bottom &&
                    doodelerBottomSpace <= plataform.bottom + 15 &&
                    !isJumping
                ) {
                    startPoint = doodelerBottomSpace;
                    jump();
                }
            });
        });
    }

    // Controls
    function control(event) {
        if (event.keyCode == 37 && doodelerLeftSpace >= 10) {
            doodelerLeftSpace -= 10;
        }
        if (event.keyCode == 39 && doodelerLeftSpace <= 340) {
            doodelerLeftSpace += 10;
        }
    }

    // Plataforms Base

    class Plataform {
        constructor(GapBottom) {
            this.bottom = GapBottom;
            this.left = Math.floor(Math.random() * 315);
            this.visual = document.createElement('div');
            const visual = this.visual;
            visual.classList.add('gird_platform');
            visual.style.left = `${this.left}px`;
            visual.style.bottom = `${this.bottom}px`;
            grid.appendChild(visual);
        }
    }

    function createPlatforms() {
        for (let i = 0; i < plataformCount; i++) {
            let platGap = 600 / plataformCount;
            let platGapBottom = 100 + i * platGap;
            let newPlataform = new Plataform(platGapBottom);
            plataform.push(newPlataform);
        }
    }

    // Plataform animation

    function movePlataforms() {
        plataform.map(plataform => {
            if (doodelerBottomSpace > 200) {
                plataform.bottom -= 4;
                plataform.visual.style.bottom =
                    plataform.bottom + 'px';
            }
        });
        if (plataform[0].bottom < 0) {
            plataform[0].visual.remove();
            plataform.shift();
            let newPlat = new Plataform(600);
            plataform.push(newPlat);
            points++;
        }
    }

    // Start the  game

    function start() {
        if (!isGameOver) {
            createPlatforms();
            createDoodler();
            setInterval(movePlataforms, 30);
            jump();
            window.addEventListener('keydown', control);
        }
    }

    function GameOver() {
        isGameOver = false;
        clearInterval(upTimerId);
        clearInterval(downTimerId);
        gameOverConteiner.style.display = 'flex';
        doodler.remove();
        counter.innerHTML = points;
    }

    //  Plus

    btn.addEventListener('click', () => {
        btn.style.marginLeft = 1000 + 'px';
        setTimeout(() => {
            start();
        }, 300);
    });

    btnOver.addEventListener('click', () => {
        location.reload();
        // gameOverConteiner.style.display = 'none';
        // start();
    });
});
