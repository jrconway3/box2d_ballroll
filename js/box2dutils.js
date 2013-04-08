/**
  * Initialization
  *
  * @author David A Conway Jr.
  *
  * Based on tutorial by Emanuele Feronato
  * http://www.emanueleferonato.com/2012/12/03/introducing-box2dweb-create-box2d-projects-in-html5/
  *
  * Based on example by Ivan K.
  * http://lib.ivank.net/?p=demos&d=box2D
  */

function box2dutils() {
    // Initialize Variables
    var world;
    var stage;
    var bodies = []; // instances of b2Body (from Box2D)
    var actors = []; // instances of Bitmap (from IvanK)
    var up;
    var scale = 100;

    // Initialize Classes
    var     b2Vec2          = Box2D.Common.Math.b2Vec2,
            b2BodyDef       = Box2D.Dynamics.b2BodyDef,
            b2Body          = Box2D.Dynamics.b2Body,
            b2FixtureDef    = Box2D.Dynamics.b2FixtureDef,
            b2World         = Box2D.Dynamics.b2World,
            b2PolygonShape  = Box2D.Collision.Shapes.b2PolygonShape;
            b2CircleShape   = Box2D.Collision.Shapes.b2CircleShape;

    // Create World
    world = new b2World(new b2Vec2(0, 10),  true);
    up    = new b2Vec2(0, -5);
    stage = new Stage("game");


    /**
      * Update Actions
      */
    function update() { 
        // Step World
        world.Step(1 / 60, 3, 3);
        world.ClearForces();

        // Scroll if Required


        // Update Actor Positions
        for(var i=0; i < actors.length; i++) {
            // Create Actors
            var body  = bodies[i];
            var actor = actors[i];
            var p = body.GetPosition();

            // Set Actor Position
            actor.x = p.x *scale; // updating actor
            actor.y = p.y *scale;
            actor.rotation = body.GetAngle()*180/Math.PI;
        }
    };


    /**
      * Create Box
      */
    function createBox(width,height,x,y,type,color,opacity,bitmap){
        // Set Body Type
        var bodyType;
        if(type == 'dynamic') {
            bodyType = b2Body.b2_dynamicBody;
        }
        else {
            bodyType = b2Body.b2_staticBody   
        }

        // Create Body
        var bodyDef = new b2BodyDef;
            bodyDef.type = bodyType;
            bodyDef.position.Set(x/scale,y/scale);

        // Create Polygon
        var polygonShape = new b2PolygonShape;
            polygonShape.SetAsBox(width/2/scale, height/2/scale);

        // Create Fixture
        var fixtureDef = new b2FixtureDef;
            fixtureDef.density = 1.0;
            fixtureDef.friction = 0.5;
            fixtureDef.restitution = 0.5;
            fixtureDef.shape = polygonShape;

        // Add Body to World
        var body = world.CreateBody(bodyDef);
            body.CreateFixture(fixtureDef);

        // Create Sprite 
        var actor = new Sprite();

        // Bitmap Specified?
        if(bitmap != undefined) {
            // Create Bitmap
            var bm = new Bitmap(bitmap);
                bm.x = bm.y = -100;

            // Add child
            actor.addChild(bm);
        }
        // Fill Color
        else {
            // Color is Undefined
            if(color == undefined) {
                // Set Color
                color = 0x000000;
            }

            // Opacity is Undefined
            if(opacity == undefined) {
                // Set Opacity
                opacity = 1;
            }
            console.log(color);

            // Fill Color
            actor.graphics.beginFill(color, opacity);
            actor.graphics.drawRect(-100, -100, width, height);
        }

        // Scale Actor
        actor.scaleX = width;
        actor.scaleY = height;

        // Add To Array
        bodies.push(body);
        actors.push(actor);
    }

    /**
      * Create Ball
      */
    function createBall(size,x,y,type,color,opacity,bitmap){
        // Set Body Type
        var bodyType;
        if(type == 'dynamic') {
            bodyType = b2Body.b2_dynamicBody;
        }
        else {
            bodyType = b2Body.b2_staticBody   
        }

        // Create Body
        var bodyDef = new b2BodyDef;
            bodyDef.type = bodyType;
            bodyDef.position.Set(x/scale, y/scale);

        // Create Polgygon
        var circleShape = new b2CircleShape;
            circleShape.SetRadius(size/2/scale);

        // Create Fixture
        var fixtureDef = new b2FixtureDef;
            fixtureDef.density = 1.0;
            fixtureDef.friction = 0.5;
            fixtureDef.restitution = 0.5;
            fixtureDef.shape = circleShape;

        // Add Body to World
        var body = world.CreateBody(bodyDef);
            body.CreateFixture(fixtureDef);

        // Create Sprite 
        var actor = new Sprite();

        // Bitmap Specified?
        if(bitmap != undefined) {
            // Create Bitmap
            var bm = new Bitmap(bitmap);
                bm.x = bm.y = -100;

            // Add child
            actor.addChild(bm);
        }
        // Fill Color
        else {
            // Color is Undefined
            if(color == undefined) {
                // Set Color
                color = 0x000000;
            }

            // Opacity is Undefined
            if(opacity == undefined) {
                // Set Opacity
                opacity = 1;
            }

            // Fill Color
            actor.graphics.beginFill(color, opacity);
            actor.graphics.drawCircle(-100, -100, size);
        }

        // Scale Actor
        actor.scaleX = actor.scaleY = size;

        // Add To Array
        bodies.push(body);
        actors.push(actor);
    }

    /**
      * Create Main Child
      */
    function Main() {
        Sprite.apply(this);

        this.graphics.beginFill(0xccff88);
        this.graphics.drawRect(0,0,stage.stageWidth, stage.stageHeight);
    }
    Main.prototype = new Sprite();


    // Create Stage
    stage.addEventListener(Event.ENTER_FRAME, update);
    stage.addChild(new Main());

    // Add Background
    /*var bg = new Bitmap( new BitmapData("winter2.jpg") );
        bg.scaleX = bg.scaleY = stage.stageHeight/512;
        stage.addChild(bg);*/

    // Create Walls
    createBox(10, 1, 9, stage.stageHeight/scale + 1, 'static');
    createBox(1, scale, -1, 3, 'static');
    createBox(1, scale, 1, 3, 'static');

    // Create Player
    createBall(5, 1, 1, 'dynamic');

};