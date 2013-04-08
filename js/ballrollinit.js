/**
  * Ball Roll Box2D Web Game
  *
  * @author David A Conway Jr.
  *
  * Based on tutorial by Emanuele Feronato
  * http://www.emanueleferonato.com/2012/12/03/introducing-box2dweb-create-box2d-projects-in-html5/
  *
  * Based on example by Ivan K.
  * http://lib.ivank.net/?p=demos&d=box2D
  */

function ballrollinit() {
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
            actor.rotation = body.GetAngle() * 180/Math.PI;
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
            bodyDef.position.Set(x, y);

        // Create Polygon
        var polygonShape = new b2PolygonShape;
            polygonShape.SetAsBox(width, height);

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
            var bm = new Bitmap( new BitmapData(bitmap) );
                bm.x = bm.y = -1*scale;

            // Add child
            actor.addChild(bm);
        }
        // Fill Color
        else {
            // Color is Undefined
            if(color == undefined) {
                // Set Color
                color = 0;
            }

            // Opacity is Undefined
            if(opacity == undefined) {
                // Set Opacity
                opacity = 1;
            }

            // Fill Color
            actor.graphics.beginFill(color, opacity);
            actor.graphics.drawRect(-1 * scale, -1 * scale, width*scale, height*scale);
        }

        // Scale Actor
        actor.scaleX = width;
        actor.scaleY = height;

        // Add To Array
        stage.addChild(actor);
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
            bodyDef.position.Set(x, y);

        // Create Polgygon
        var circleShape = new b2CircleShape;
            circleShape.SetRadius(size);

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
            var bm = new Bitmap( new BitmapData(bitmap) );
                bm.x = bm.y = -1*scale;

            // Add child
            actor.addChild(bm);
        }
        // Fill Color
        else {
            // Color is Undefined
            if(color == undefined) {
                // Set Color
                color = 0;
            }

            // Opacity is Undefined
            if(opacity == undefined) {
                // Set Opacity
                opacity = 1;
            }

            // Fill Color
            actor.graphics.beginFill(color, opacity);
            actor.graphics.drawCircle(0, 0, scale);
        }

        // Scale Actor
        actor.scaleX = actor.scaleY = size;

        // Add To Array
        stage.addChild(actor);
        bodies.push(body);
        actors.push(actor);
    }

    /**
      * Create Main Child
      */
    function Main() {
        Sprite.apply(this);

        this.graphics.beginFill(0xb1e4ff);
        this.graphics.drawRect(0, 0, stage.stageWidth, stage.stageHeight);
    }
    Main.prototype = new Sprite();

    // Create Stage
    stage.addEventListener(Event.ENTER_FRAME, update);
    stage.addChild(new Main());

    // Create Walls
    createBox(100, 1, 0, stage.stageHeight/100 + 1, 'static');
    createBox(1, 100, -1, 3, 'static');
    createBox(1, 100, stage.stageWidth/100 + 1, 3, 'static');

    // Create Player
    createBall(0.25, 0, 0, 'dynamic', 0xcccccc, 1);

};