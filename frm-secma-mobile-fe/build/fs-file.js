/*
 * @Author: ly
 * @Date: 2020-03-20 19:19:22
 * @LastEditTime: 2020-04-21 14:49:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /产品定价2020_git/build/fs-file.js
 */
var fs = require('fs');
var path = require('path');
const compressing = require('compressing');
let n = 0;
var fsFile = function (command) {
    n++;
    if(n==1){
        setTimeout(() => {
            if(command.source&&command){
                fs.readFile(path.join(command.source), 'utf8', function (err, data) {
                    data=data.replace("\n","@")
                    let arr = data.split("@");
                    let arr_1 = arr[0].split(":");
                    arr[0] = 'Version:'+(parseFloat(arr_1[1])+0.01).toFixed(2);
                    let txt = arr.join('\n');
                    console.log("打包版本号："+arr[0])
                    if (err) throw err;
                    fs.writeFile(command.destination, txt, 'utf8', (err) => {
                        if (err) throw err;
                        // console.log('写入'+command.destination+"成功");
                    });
                    fs.writeFile(command.source, txt, 'utf8', (err) => {
                    if (err) throw err;
                        // setTimeout(() => {
                        //     compressing.zip.compressDir('offline-package/'+command.package,'offline-package/'+command.package+'.zip')
                        //     .then(() => {
                                
                        //     })
                        //     .catch(err => {
                        //         console.error(err);
                        //     });
                           
                        // }, 6000);
                       
                    });
                });
            }
        }, 0,false);
    }else{
        return false;
    }
    return fsFile;
};
module.exports = fsFile;