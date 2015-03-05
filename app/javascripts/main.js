/*global p2 */

/*
* @Author: Jiyun
* @Date:   2015-03-03 14:59:01
* @Last Modified by:   Jiyun
* @Last Modified time: 2015-03-04 11:50:34
*/


// // Create demo application
// var app = new p2.WebGLRenderer(function () {

//     var world = new p2.World({
//         // doProfiling : true,
//         gravity : [0, -5],
//         broadphase : new p2.SAPBroadphase(),
//     });

//     this.setWorld(world);

//     world.solver.tolerance = 0.001;

//     var bodies = [];
//     var N = 10,
//         M = 10,
//         timeStep = 1 / 60,
//         k = 1000,
//         d = 10,
//         l = 0.35,
//         m = 1;

//     var vec2 = p2.vec2;

//     // // Create particle bodies
//     // var particleShape = new p2.Particle();
//     // for (var i = 0; i < N; i++) {
//     //     bodies.push([]);
//     //     for (var j = 0; j < M; j++) {
//     //         var p = new p2.Body({
//     //             mass: m,//j==M-1 ? 0 : m,
//     //             position : [(i - N / 2) * l * 1.05, (j - M / 2) * l * 1.05]
//     //         });
//     //         p.addShape(particleShape);
//     //         bodies[i].push(p);
//     //         world.addBody(p);
//     //     }
//     // }

//     // // Vertical springs
//     // for (var q = 0; q < 10; q++) {
//     //     for (var e = 0; e < 10 - 1; e++) {
//     //         var bodyA = bodies[q][e];
//     //         var bodyB = bodies[q][e + 1];
//     //         var spring1 = new p2.LinearSpring(bodyA, bodyB, {
//     //             stiffness: k,
//     //             restLength: l,
//     //             damping : d
//     //         });
//     //         world.addSpring(spring1);
//     //     }
//     // }

//     // // Horizontal springs
//     // for (var w = 0; w < N - 1; w++) {
//     //     for (var r = 0; r < M; r++) {
//     //         var bodyC = bodies[w][r];
//     //         var bodyD = bodies[w + 1][r];
//     //         var spring2 = new p2.LinearSpring(bodyC, bodyD, {
//     //             stiffness: k,
//     //             restLength: l,
//     //             damping : d
//     //         });
//     //         world.addSpring(spring2);
//     //     }
//     // }

//     // // Diagonal right/down springs
//     // for (var t = 0; t < N - 1; t++) {
//     //     for (var y = 0; y < M - 1; y++) {
//     //         var a = bodies[t][y];
//     //         var b = bodies[t + 1][y + 1];
//     //         var spring3 = new p2.LinearSpring(a, b, {
//     //             stiffness: k,
//     //             restLength: Math.sqrt(l * l + l * l)
//     //         });
//     //         world.addSpring(spring3);
//     //     }
//     // }

//     // // Diagonal left/down springs
//     // for (var u = 0; u < N - 1; u++) {
//     //     for (var v = 0; v < M - 1; v++) {
//     //         var f = bodies[u + 1][v];
//     //         var x = bodies[u][v + 1];
//     //         var spring4 = new p2.LinearSpring(f, x, {
//     //             stiffness: k,
//     //             restLength: Math.sqrt(l * l + l * l)
//     //         });
//     //         world.addSpring(spring4);
//     //     }
//     // }

//     // Create ground
//     var planeShape = new p2.Plane();
//     var plane = new p2.Body({
//         position : [0, (- M / 2) * l * 1.05 - 0.1]
//     });
//     plane.addShape(planeShape);
//     world.addBody(plane);

//     // // Create circle
//     // var radius = 1;
//     // var circleShape = new p2.Circle(radius);
//     // var circle = new p2.Body({
//     //     mass : 1,
//     //     position : [0, (M / 2) * l * 1.05 + radius],
//     //     angularVelocity: 1,
//     // });
//     // circle.addShape(circleShape);
//     // world.addBody(circle);


//     // Create connected boxes
//     var boxShape = new p2.Rectangle(1, 1);
//     var box1 = new p2.Body({
//         mass : 1,
//         position : [2, (M / 2) * l * 1.05 + 1],
//         angularVelocity : 2.1
//     });
//     var box2 = new p2.Body({
//         mass : 1,
//         position : [-2, (M / 2) * l * 1.05 + 1],
//         angularVelocity : -2.4
//     });
//     var box3 = new p2.Body({
//         mass : 1,
//         position : [-4, (M / 2) * l * 1.05 + 1],
//         angularVelocity : -2.4
//     });
//     box1.addShape(boxShape);
//     box2.addShape(boxShape);
//     box3.addShape(boxShape);
//     world.addBody(box1);
//     world.addBody(box2);
//     world.addBody(box3);
//     var s = new p2.LinearSpring(box1, box2, {
//         restLength : 1,
//         stiffness : 5,
//         localAnchorA : [0, 0.5],
//         localAnchorB : [0, 0.5]
//     });
//     world.addSpring(s);
//     var sp = new p2.LinearSpring(box3, box2, {
//         restLength : 1,
//         stiffness : 10,
//         localAnchorA : [0, 0.5],
//         localAnchorB : [0, 0.5]
//     });
//     world.addSpring(sp);


//     // // Create capsule
//     // var capsuleShape = new p2.Capsule(1, 0.25);
//     // var capsuleBody = new p2.Body({
//     //     mass: 1,
//     //     position : [4, 1]
//     // });
//     // capsuleBody.addShape(capsuleShape);
//     // world.addBody(capsuleBody);
//     // var n = new p2.LinearSpring(capsuleBody, plane, {
//     //     restLength : 1,
//     //     stiffness : 10,
//     //     localAnchorA : [- capsuleShape.length / 2, 0],
//     //     worldAnchorB : [4 - capsuleShape.length / 2, 2],
//     // });
//     // world.addSpring(n);


//     // // Create capsules connected with angular spring
//     // var capsuleShapeA = new p2.Capsule(1, 0.2);
//     // var capsuleShapeB = new p2.Capsule(1, 0.2);
//     // var capsuleBodyA = new p2.Body({
//     //     mass: 1,
//     //     position : [5, 0]
//     // });
//     // var capsuleBodyB = new p2.Body({
//     //     mass: 1,
//     //     position : [6, 0]
//     // });
//     // capsuleBodyA.addShape(capsuleShapeA);
//     // capsuleBodyB.addShape(capsuleShapeB);
//     // world.addBody(capsuleBodyA);
//     // world.addBody(capsuleBodyB);
//     // var rotationalSpring = new p2.RotationalSpring(capsuleBodyA, capsuleBodyB, {
//     //     stiffness : 10,
//     //     damping: 0.01
//     // });
//     // world.addSpring(rotationalSpring);
//     // var revolute = new p2.RevoluteConstraint(capsuleBodyA, capsuleBodyB, {
//     //     localPivotA: [0.5, 0],
//     //     localPivotB: [-0.5, 0],
//     //     collideConnected: false
//     // });
//     // world.addConstraint(revolute);


//     // this.frame(3, 0, 8, 8);
//     this.frame(0, 0, 8, 8);
// });

var enablePositionNoise = true, // Add some noise in circle positions
    N = 1,         // Number of circles in x direction
    M = 1,         // and in y
    r = 1,       // circle radius
    d = 4.5;        // Distance between circle centers

// Create demo application
var app = new p2.WebGLRenderer(function () {

    // Create the world
    var world = new p2.World({
        doProfiling: true,
        gravity : [0, -5],
        broadphase : new p2.SAPBroadphase(),
    });

    this.setWorld(world);

    // Set stiffness of all contacts and constraints
    world.setGlobalStiffness(1e8);

    // Max number of solver iterations to do
    world.solver.iterations = 10;

    // Solver error tolerance
    world.solver.tolerance = 0;

    // Enables sleeping of bodies
    world.sleepMode = p2.World.BODY_SLEEPING;

    // Create circle bodies
    var shape = new p2.Rectangle(r, r);
    for (var i = 0; i < N; i++) {
        for (var j = M - 1; j >= 0; j--) {
            // var x = (i - N / 2) * r * d + (enablePositionNoise ? Math.random() * r : 0);
            var x = 0;
            // var y = (j - M / 2) * r * d;
            var y = 0;
            var p = new p2.Body({
                mass: 1,
                position: [x, y],
            });
            p.addShape(shape);
            p.allowSleep = true;
            p.sleepSpeedLimit = 1;  // Body will feel sleepy if speed<1 (speed is the norm of velocity)
            p.sleepTimeLimit = 1;   // Body falls asleep after 1s of sleepiness
            world.addBody(p);
        }
    }

    // Compute max/min positions of circles
    var xmin = (- N / 2 * r * d),
        xmax = (N / 2 * r * d),
        ymin = (-M / 2 * r * d),
        ymax = (M / 2 * r * d);



    // Create bottom plane
    var planeShape = new p2.Plane();

    var planeBottom = new p2.Body({
        position: [0, ymin]
    });
    planeBottom.addShape(planeShape);
    world.addBody(planeBottom);

    // // Create top plane
    // var planeTop = new p2.Body({
    //     position: [5, 0]
    // });
    // planeTop.addShape(planeShape);
    // world.addBody(planeTop);

    // Left plane
    var planeLeft = new p2.Body({
        angle: -Math.PI / 2,
        position: [xmin, 0]
    });
    planeLeft.addShape(planeShape);
    world.addBody(planeLeft);

    // Right plane
    var planeRight = new p2.Body({
        angle: Math.PI / 2,
        position: [xmax, 0]
    });
    planeRight.addShape(planeShape);
    world.addBody(planeRight);

    // Start demo
    this.frame(0, 0, 14, 14);
});











