let tg = window.Telegram.WebApp;

function random(min, max) {
    return Math.random() * (max - min) + min;
}

function createKhinkali() {
    const container = document.querySelector('.animation-container');
    const sheep = document.querySelector('.sheep');
    const sheepBox = sheep.getBoundingClientRect();
    const containerBox = container.getBoundingClientRect();
    
    const khinkali = document.createElement('div');
    khinkali.className = 'khinkali falling-khinkali';
    
    const startX = random(-5, 5);
    const endX = random(-10, 10);
    const rotation = random(-180, 180) + 'deg';
    
    const leftPosition = sheepBox.left - containerBox.left + sheepBox.width/2;
    khinkali.style.left = leftPosition + 'px';
    
    khinkali.style.setProperty('--start-x', startX + 'px');
    khinkali.style.setProperty('--end-x', endX + 'px');
    khinkali.style.setProperty('--rotation', rotation);
    
    container.appendChild(khinkali);
    
    setTimeout(() => {
        if (container.children.length > 30) {
            container.removeChild(container.querySelector('.khinkali'));
        }
    }, 2000);
}

function switchScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });

    document.getElementById(screenId + '-screen').classList.add('active');
    event.currentTarget.classList.add('active');
}

function showDishes(category) {
    document.getElementById('menu-categories').style.display = 'none';
    document.querySelectorAll('.dishes-list').forEach(list => {
        list.classList.remove('active');
    });
    document.getElementById(category).classList.add('active');
}

function showCategories() {
    document.getElementById('menu-categories').style.display = 'block';
    document.querySelectorAll('.dishes-list').forEach(list => {
        list.classList.remove('active');
    });
}

window.onload = function() {
    tg.ready();
    tg.expand();
    
    const khinkaliInterval = setInterval(createKhinkali, 500);
    
    setTimeout(() => {
        document.getElementById('loading-screen').style.opacity = '0';
        document.getElementById('content-container').style.opacity = '1';
        
        setTimeout(() => {
            document.getElementById('loading-screen').style.display = 'none';
            clearInterval(khinkaliInterval);
        }, 500);
    }, 3000);
}

function sendData(buttonId) {
    tg.sendData(buttonId);
    tg.close();
} 