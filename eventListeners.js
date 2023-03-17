window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'w':
            if(square.velocity.y === 0) {
                square.velocity.y = -20;
            }
            break;
        case 'a':
            keys.a.pressed = true;

            break;
        case 's':
            
            break;
        case 'd':
            keys.d.pressed = true;
            
            break;
    
        default:
            break;
    }
})

window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'a':
            keys.a.pressed = false;
            
            break;
        case 'd':
            keys.d.pressed = false;
            
            break;
    
        default:
            break;
    }
})