    var scene = new THREE.Scene();
    // カメラ設定 ------------------------------------------
        var fov = 60;

        var width = $(window).width(); // 横幅
        var height = $(window).height(); // 縦幅

        var aspect = width/height;// aspect: アスペクト比、カメラで撮影したものの縦横比
        var near = 1;//カメラからの撮影開始位置、これより近いものは撮影しない
        var far = 20000;//カメラからの撮影終了位置、これより遠いものは撮影しない
    //カメラ作成---------------------------------------------
        // camera 1
        IcosCamera = new THREE.PerspectiveCamera( fov, aspect, near, far);
        IcosCamera.position.set(0,0,0);
        IcosCamera.lookAt(new THREE.Vector3(25,0,0));
        // camera 2
        Icos2Camera = new THREE.PerspectiveCamera( fov, aspect, near, far);
        Icos2Camera.position.set(0,0,0);
        Icos2Camera.lookAt(new THREE.Vector3(0,0,25));
        // camera 2
        topCamera = new THREE.PerspectiveCamera( 170, aspect, near, far);
        topCamera.position.set(2000,0,0);
        topCamera.lookAt(new THREE.Vector3(0,0,0));
    // レンダラー追加 ----------------------------------------
        var renderer = new THREE.WebGLRenderer({antialias:true});
        renderer.setSize(width,height); // canvasのサイズ設定
        renderer.autoClear = false;
        THREEx.WindowResize(renderer, IcosCamera);
        THREEx.WindowResize(renderer, Icos2Camera);
        THREEx.WindowResize(renderer, topCamera);
        $("body").append(renderer.domElement);
    // オブジェクト追加 ----------------------------------------
        var IcosGeometry = new THREE.IcosahedronGeometry( 2.5, 1 );
        var IcosMaterial = new THREE.MeshBasicMaterial( {color: 0x00c8ff, wireframe:true, wireframeLinewidth:1, opacity:0.1} );//lightいらない
        var Icos = new THREE.Mesh(IcosGeometry, IcosMaterial);
        Icos.position.set(25,0,0);
        scene.add(Icos);

        var Icos2Geometry = new THREE.IcosahedronGeometry( 2.5, 0 );
        var Icos2Material = new THREE.MeshBasicMaterial( {color: 0x00ffc8, wireframe:true, wireframeLinewidth:1, opacity:0.1} );//lightいらない
        var Icos2 = new THREE.Mesh(Icos2Geometry, Icos2Material);
        Icos2.position.set(0,0,25);
        //scene.add(Icos2);

        var ringGeometry = new THREE.RingGeometry( 5, 5.05, 12);//内側の半径,外側の半径,頂点の数
        var ringMaterial = new THREE.MeshBasicMaterial( { color: 0x00c8ff, side: THREE.DoubleSide } );
        var ring = new THREE.Mesh( ringGeometry, ringMaterial );
        ring.position.set(Icos.position.x,Icos.position.y,Icos.position.z);
        ring.lookAt(IcosCamera.position);
        //scene.add(ring);

        var ringAGeometry = new THREE.RingGeometry( 7, 7.05, 12 );//内側の半径,外側の半径,頂点の数
        var ringA = new THREE.Mesh( ringAGeometry, ringMaterial );
        ringA.position.set(Icos.position.x,Icos.position.y,Icos.position.z);
        ringA.lookAt(IcosCamera.position);
        //scene.add(ringA);

        var ring2Geometry = new THREE.RingGeometry( 5, 5.05, 6 );//内側の半径,外側の半径,頂点の数
        var ring2Material = new THREE.MeshBasicMaterial( { color: 0x00ffc8, side: THREE.DoubleSide } );
        var ring2 = new THREE.Mesh( ring2Geometry, ring2Material );
        ring2.position.set(Icos2.position.x,Icos2.position.y,Icos2.position.z);
        ring2.lookAt(Icos2Camera.position);
        //scene.add(ring2);

        var ringA2Geometry = new THREE.RingGeometry( 7, 7.05, 6 );//内側の半径,外側の半径,頂点の数
        var ringA2 = new THREE.Mesh( ringA2Geometry, ring2Material );
        ringA2.position.set(Icos2.position.x,Icos2.position.y,Icos2.position.z);
        ringA2.lookAt(Icos2Camera.position);
        //scene.add(ringA2);

    var speedy = 0.1;
    var speedx = 0.1;
    var preIcosPosition = {};
    var preIcos2Position = {};
    var ringAddCounter = 0;

    // レンダリング ----------------------------------------
    function render() {

        requestAnimationFrame(render);



        Icos.rotation.y -= speedy/8*Math.random();
        Icos.rotation.x += speedx/8;
        Icos2.rotation.y -= speedy/16*Math.random();
        Icos2.rotation.x += speedx/16;

        var ringRamdom = Math.random();
        ringRotation("ring",speedx/16,speedy/16*ringRamdom,speedx/16)

        var ring2Ramdom = Math.random();
        ringRotation("ring2",speedx/16,speedy/16*ring2Ramdom,speedx/16)



        if(difference > 0.01){

            ringScale(1+difference/50*2);

            Icos.rotation.y -= speedy*Math.random()*difference;
            Icos.rotation.x += speedx*difference*(Math.random()+1);
            Icos2.rotation.y -= speedy*Math.random()*difference;
            Icos2.rotation.x += speedx*difference*(Math.random()+0.5);
        }



        if(difference > 1){
            //IcosMaterial.color.set('#'+Math.floor(Math.random() * 0xFFFFFF).toString(16));
            //Icos2Material.color.set('#'+Math.floor(Math.random() * 0xFFFFFF).toString(16));
        }



        if (difference > 5){//ring判定
            ringAddCounter++;

            if(ringAddCounter === 50){//最初にringを描画
                scene.add(ring);
                scene.add(ring2);
            }else{
                if(ringAddCounter === 60 && difference > 10){
                    scene.add(ringA);
                    scene.add(ringA2);
                }else{
                    if(ringAddCounter > 70 && difference > 10){
                        //scene.add(Icos);
                    }
                }
            }
        }



        if (difference > 10){//test!!!!!
            console.log("differrence : "+difference);
        }

        if(difference > 2){//Icos

            //lineを引くため
            preIcosPosition.x = Icos.position.x;
            preIcosPosition.y = Icos.position.y;
            preIcosPosition.z = Icos.position.z;
            //動き
            move(Icos,IcosCamera,difference,3,-3);
            //chaseLine
            addLine(Icos,preIcosPosition,0x00c8ff);

            ring.position.set(Icos.position.x,Icos.position.y,Icos.position.z);
            ringA.position.set(Icos.position.x,Icos.position.y,Icos.position.z);


        }



        if(difference > 1){//Icos2
            //lineを引くため
            preIcos2Position.x = Icos2.position.x;
            preIcos2Position.y = Icos2.position.y;
            preIcos2Position.z = Icos2.position.z;

            move(Icos2,Icos2Camera,difference,3,-3);

            if(ringAddCounter >= 10){//カメラ1つのときは緑の線引かない
                addLine(Icos2,preIcos2Position,0x00ffc8);
            }

            ring2.position.set(Icos2.position.x,Icos2.position.y,Icos2.position.z);
            ringA2.position.set(Icos2.position.x,Icos2.position.y,Icos2.position.z);

            ring2.scale.x += difference/100;
            ring2.scale.y += difference/100;
            ring2.scale.z += difference/100;

            ringA2.scale.x += difference/100;
            ringA2.scale.y += difference/100;
            ringA2.scale.z += difference/100;
        }

        if(ringAddCounter < 10){//最初はカメラ1つだけ
            renderer.clear();
            renderer.render( scene, IcosCamera );
        }else{//カメラ追加
            scene.add(Icos2);

            var SCREEN_WIDTH = $(window).width(), SCREEN_HEIGHT = $(window).height();
        IcosCamera.aspect = 0.5 * SCREEN_WIDTH / SCREEN_HEIGHT;
        Icos2Camera.aspect = 0.5 * SCREEN_WIDTH / SCREEN_HEIGHT;
        topCamera.aspect = 0.5 * SCREEN_WIDTH / SCREEN_HEIGHT;

        IcosCamera.updateProjectionMatrix();
        Icos2Camera.updateProjectionMatrix();
        topCamera.updateProjectionMatrix();

        // setViewport parameters:
        //  lower_left_x, lower_left_y, viewport_width, viewport_height
        renderer.setViewport( 0, 0, SCREEN_WIDTH, SCREEN_HEIGHT );
        renderer.clear();

        // シーンとカメラを渡してレンダリング
            // left side
            renderer.setViewport( 1, 1,   0.5 * SCREEN_WIDTH - 2, SCREEN_HEIGHT - 2 );
            renderer.render( scene, Icos2Camera );
            //renderer.render( scene, topCamera );

            // right side
            renderer.setViewport( 0.5 * SCREEN_WIDTH + 1, 1,   0.5 * SCREEN_WIDTH - 2, SCREEN_HEIGHT - 2 );
            renderer.render( scene, IcosCamera );

        }
    }

    $(function(){
        render();
    });
    //-----------------------------------------------
    function move(object,camera,difference,moveMax,moveMin){//カメラ追従ない場合、camera : null
        var addPositionX = Math.round(difference*100)/10*Math.random()*(2 - 0.5+1)+0.5;
        var addPositionY = -1+Math.round(difference*100)/10*Math.random()*(1.5 - 0.5+1)+0.5;
        var addPositionZ = Math.round((Math.random() * (moveMax - moveMin + 1) + moveMin)*difference*1000)/1000;

        //マイナスが少ない気がするので付け足し
        if (Math.random() >= 0.4){
            addPositionX *= -1;
        }
        if (Math.random() >= 0.4){
            addPositionY *= -1;
        }
        if (Math.random() >= 0.4){
            addPositionZ *= -1;
        }

        //x,y,zどの方向に動くか
        var randomMovingJudge = Math.floor( Math.random() * (2 - 0 + 1) ) + 0;//JudgeMax:2, JudgeMin:0
        if (difference > 0.01) {
            switch(randomMovingJudge){
                    case 0:object.position.x -= addPositionX;break;
                    case 1:object.position.y -= addPositionY;break;
                    case 2:object.position.z -= addPositionZ;break;
                    default:alert("randomMovingJudge("+object+"):無効な値");
            }

            if(camera !== null){
                switch(randomMovingJudge){
                    case 0:camera.position.x -= addPositionX;break;
                    case 1:camera.position.y -= addPositionY;break;
                    case 2:camera.position.z -= addPositionZ;break;
                    default:alert("randomMovingJudge("+camera+"):無効な値");
                }
            }
        }
    }
    //-----------------------------------------------
    function addLine(object,prePosition,color){
        var lineGeometry = new THREE.Geometry();
        var lineMaterial = new THREE.LineBasicMaterial({color: color});
        lineGeometry.vertices.push(new THREE.Vector3(prePosition.x, prePosition.y, prePosition.z));
        lineGeometry.vertices.push(new THREE.Vector3(object.position.x, object.position.y, object.position.z));
        var line = new THREE.Line(lineGeometry, lineMaterial);
        scene.add(line);
    }
    //-----------------------------------------------
    function ringScale(scale){
        ring.scale.set(scale,scale,scale);
        ringA.scale.set(scale,scale,scale);
        ring2.scale.set(scale,scale,scale);
        ringA2.scale.set(scale,scale,scale);
    }
    //-----------------------------------------------
    function ringRotation(object,speedx,speedy,speedz){
        if(object == "ring"){
            ring.rotation.y += speedy;
            ring.rotation.x -= speedx;
            ring.rotation.z += speedz;

            ringA.rotation.y += speedy;
            ringA.rotation.x -= speedx;
            ringA.rotation.z += speedz;
        }else{
            if(object == "ring2"){
                ring2.rotation.y -= speedy;
                ring2.rotation.x += speedx;
                ring2.rotation.z -= speedz;

                ringA2.rotation.y -= speedy;
                ringA2.rotation.x += speedx;
                ringA2.rotation.z -= speedz;
            }
        }
    }


    // 3次元リサージュの座標データを用意
    //             1.0 y
    //              ^  -1.0
    //              | / z
    //              |/       x
    // -1.0 -----------------> +1.0
    //            / |
    //      +1.0 /  |
    //           -1.0
