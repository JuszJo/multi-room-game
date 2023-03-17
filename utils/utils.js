function parse2D(array) {
    const rows = [];
 
    for(let i = 0; i < array.length; i += 30) {
       rows.push(array.slice(i, i + 30))
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