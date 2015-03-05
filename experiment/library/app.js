/*global THREE , requestAnimationFrame, Stats, cancelAnimationFrame, requestAnimFrame, ge1doot*/

/* 
* @Author: Jiyun
* @Date:   2015-02-17 14:23:54
* @Last Modified by:   Jiyun
* @Last Modified time: 2015-02-17 19:43:04
*/

/* =======================================================
 *  ---- HTML5 CANVAS box2D demo ----
 * script: Gerard Ferrandez - 28 April 2013
 * Adapted from a C# demo by Paul Firth
 * http://www.wildbunny.co.uk/blog/2011/03/25/speculative-contacts-an-continuous-collision-engine-approach-part-1/
 * ------------------------------------------------------
 * JavaScript code released under the MIT license
 * http://www.dhteumeuleu.com/LICENSE.html
 * ======================================================= */
 
 // "use strict";

(function () {
    
    // private variables
    var scr, ctx, pointer, boxes, dropc = 0, frames = 0, PHY2D, V2, zoom;
    
    var clean = function () {
        
        frames++;
        if (frames / 20 === Math.round(frames / 20)) {
            var k = PHY2D.objects.length;
            // console.log('PHY2D.objects.length', PHY2D.objects.length);
            // console.log('k--', k--);
            // while (k--) {
            //     console.log(1);
            //     if (PHY2D.objects[k].pos[1] > scr.height) {
            //         console.log('消失');
            //         PHY2D.deleteObject(k);
            //     }
            // }
            if (PHY2D.objects.length < 8 - dropc) {
                // console.log(3);
                drop();
            }
        }
    };
    
    var newBox = function (x, y) {
        
        if (!x) {
            x = pointer.X;
            y = -Math.random() * 512;
        }
            
        // 三角形
        // if (Math.random() > 0.8) {
        // // if (1 === 1) {
        //     var img = document.getElementById("triangle");
        //     PHY2D.triangle(img, x, y - img.height * 2, img.width * 0.5 * zoom, img.height * 0.7 * zoom, (img.width * img.height), Math.random() * 3 - 1.5)
        // } else {
        var img = boxes[Math.floor(Math.random() * boxes.length)];
        PHY2D.rectangle(img, x, y - img.height * 2, img.width * zoom, img.height * zoom, (img.width * img.height), Math.random() * 3 - 1.5);
        // }
        
    };
    
    var resize = function () {
        
        zoom = Math.max(0.5, Math.min(scr.width / 1366, 1));
        PHY2D.deleteStatic();
        // 齿轮转动
        var img = document.getElementById('blade');
        // PHY2D.rectangle(img, scr.width * 0.9, scr.height * 0.9, img.width * zoom, img.height * zoom, 0, -1, Math.PI / 2); // blade
        // // PHY2D.rectangle(img, scr.width * 0.9, scr.height * 0.9, img.width * zoom, img.height * zoom, 0, -1, 0); // blade
        // PHY2D.rectangle(img, scr.width * 0.1, scr.height * 0.9, img.width * zoom, img.height * zoom, 0, 1, Math.PI / 2); // blade
        // // PHY2D.rectangle(img, scr.width * 0.1, scr.height * 0.9, img.width * zoom, img.height * zoom, 0, 1, 0); // blade

        PHY2D.rectangle(img, scr.width * 1 + ((img.height * zoom) / 2), scr.height * 1, scr.height * 2, img.height * zoom, 0, 0, Math.PI / 2); // blade
        PHY2D.rectangle(img, scr.width * 0 - ((img.height * zoom) / 2), scr.height * 1, scr.height * 2, img.height * zoom, 0, 0, Math.PI / 2); // blade

        // PHY2D.rectangle(false, scr.width * 0.5, scr.height, scr.width * 0.7, 4, 0, 0, 0); // floor

        PHY2D.rectangle(false, scr.width * 0.5, scr.height, scr.width, 1, 0, 0, 0); // floor
        
    };
    
    var drop = function () {
        
        for (var i = 0; i < 5; i++) {
            dropc++;
            ss();
        }
        
        function ss() {
            setTimeout(function () {
                dropc--;
                newBox(128 + (Math.random() * (scr.width - 256)), 0);
            }, i * 1000);
        }

        // console.log('dropc = ', dropc);
    };
    
    // ==== init script ====
    
    var init = function (data) {
        
        // screen
        scr = new ge1doot.Screen({
            container: 'screen',
            resize: function () {
                resize();
            }
        });
        ctx = scr.ctx;

        boxes = document.getElementById('textures').getElementsByTagName('img');
        
        // pointer events
        pointer = new ge1doot.Pointer({
            down: function () {
                newBox();
            },
            
            up: function () {
                PHY2D.drag(false);
            }
        });
        
        // load physics engine
        PHY2D = ge1doot.PHY2D();
        PHY2D.init(data, ctx, pointer);
        
        scr.resize();
        run();
    };
    
    // ======== main loop ========
    
    var run = function () {

        requestAnimFrame(run);
        ctx.clearRect(0, 0, scr.width, scr.height);
        clean();
        PHY2D.render();
        // drop();
        
    };
    return {
        
        // ---- onload event ----
        load : function (data) {
            window.addEventListener('load', function () {
                init(data);
            }, false);
        }
        
    };
})().load({
    numIterations: 6,
    kTimeStep: 1 / 60,
    kGravity: 24,
    kFriction: 0.2
    // numIterations: 50,
    // kTimeStep: 1 / 100,
    // kGravity: 10,
    // kFriction: 5
});