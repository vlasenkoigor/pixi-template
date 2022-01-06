
import * as WebFont from 'webfontloader';

export function loadFonts() {
    return new Promise((resolve, reject)=>{
        WebFont.load({
        //     google: {
        //         families: ['Fira Sans']
        //     },

            custom: {
                families: ['Fira Sans', 'Skranji', 'RobotoCondensed-Regular'],
                urls: ['/fonts/fonts.css']
            },
            active : ()=>{
                resolve();
            },
            inactive : ()=>{
                reject('fonts');
            }
        });
    })

}
