
snail = function(array) {

    const trail = [];

    const n = array[0] ? array[0].length : 0;

    const pointer = {
        x : 0,
        y: 0,
    }

    const vectors = {
        x : 1,
        y: 1
    }

    let borders = [0, n-1]

    let axis = 'x';


    for (let i = 0; i < (n * n); i++){
        const {x, y} = pointer;
        console.log(x, y);

        try {
            trail.push(array[pointer.y][pointer.x]);
        } catch (e) {
            debugger
        }




        const [low, hi] = borders;

        const isFullCircle =  x === low && y === low + 1;

        // console.log('isFullCircle', isFullCircle)
        if (isFullCircle){
            borders = [low + 1, hi - 1];
            pointer.x = borders[0];
            pointer.y = borders[1];
        } else {
            pointer[axis] += vectors[axis];
        }


        if ((vectors[axis] === 1 && pointer[axis] === hi) || (vectors[axis] === -1 && pointer[axis] === low) || isFullCircle){

            vectors[axis] *= -1;
            axis = axis === 'x' ? 'y' : 'x';
        }
    }

    console.log(trail)
    return trail;
}


// snail([[1]]); //[1, 2, 3, 6, 9, 8, 7, 4, 5]
snail([[1, 2, 3], [4, 5, 6], [7, 8, 9]]); //[1, 2, 3, 6, 9, 8, 7, 4, 5]
snail([[1, 2, 3, 4, 5], [6, 7, 8, 9, 10], [11, 12, 13, 14, 15], [16, 17, 18, 19, 20], [21, 22, 23, 24, 25]]); //[1, 2, 3, 6, 9, 8, 7, 4, 5]











// function woodCut(woods,n){
//     let len = Math.floor(woods.reduce((acc, c)=>acc + c, 0) / n) ;
//
//     while ( woods.reduce((acc, c)=>acc + Math.floor(c/len), 0) < n && len > 0){
//         len--;
//     }
//
//     return len
// }
//
// woodCut([232, 124, 456], 7); //,114)
// woodCut([232, 124, 456], 20); //,38)
// woodCut([232, 124, 456], 1); //456)
// woodCut([232, 124, 456], 2); //,232)
// woodCut([232, 124, 456], 3); //,228)
// woodCut([1, 1, 1], 4);//,0)
// woodCut([1, 1, 1], 3); //,1)
// // woodCut([200000000,2147483645,2147483646,2147483647], 4);//,1073741823)
// // woodCut([2000000000,2147483645,2147483646,2147483647], 4);//,2000000000)