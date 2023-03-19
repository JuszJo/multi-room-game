function parse2D(array) {
    const rows = [];
    const length = 64;
 
    for(let i = 0; i < array.length; i += length) {
       rows.push(array.slice(i, i + length))
    }
    return rows;
}

function createObjectsFrom2D(array) {
    const objects = [];
    array.forEach((value, y) => {
        value.forEach((value, x) => {
            if(value == 441) {
                objects.push(new CollisionBlock({
                    position: {
                        x: x * 16,
                        y: y * 16
                    }
                }))
            }
        })
    })
    return objects;
}

function turnOffBoxes() {
    player.turnOffBoxes();
}

function turnOnBoxes() {
    player.turnOnBoxes();
}