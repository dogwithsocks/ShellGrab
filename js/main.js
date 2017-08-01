window.onload = function() {
    "use strict";
    
    var game = new Phaser.Game(90, 160, Phaser.AUTO, 'game', { init: init, preload: preload, create: create, update: update, render: render } );
    
    var pixel = { scale: 6, canvas: null, context: null, width: 0, height: 0 }
    
    function init() {
        game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
        //game.scale.setUserScale(4, 4);
        game.renderer.renderSession.roundPixels = true;
        Phaser.Canvas.setImageRenderingCrisp(game.canvas);
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
        game.scale.setScreenSize(true);
        game.inputEnabled = true;
    }
    
    function preload() {
        game.load.image('man', 'assets/man.png');
        game.load.spritesheet('player', 'assets/mansheet.png', 5, 7);
        game.load.image('ground', 'assets/ground.png');
        game.load.image('target', 'assets/target.png');
    }
    
    var player;
    var platform;
    var cursors;
    var target;
    var tween;
    var tweenTarget;

    function create() {
        game.stage.backgroundColor = 0xada9a6;
        game.physics.startSystem(Phaser.Physics.ARCADE);

        platform = game.add.group();
        platform.enableBody = true;
        for (var x = 0; x < game.width; x ++) 
        {
            var groundBlock = game.add.sprite(x, game.height - 1, 'ground');
            game.physics.enable(groundBlock, Phaser.Physics.ARCADE);
            groundBlock.body.immovable = true;
            groundBlock.body.allowGravity = false;
            platform.add(groundBlock);
        }
        
        target = game.add.image(-10, -10, 'target');
        target.anchor.setTo(0.5, 0.5);
        
        player = game.add.sprite(10, 40, 'player');
        game.physics.arcade.enable(player);
        player.anchor.setTo(0.5, 1);
        player.body.maxVelocity.setTo(100, 100);
        player.body.collideWorldBounds = true;
        player.animations.add('standD', [0], 12, true);
        player.animations.add('standU', [1], 12, true);
        player.animations.add('runD', [2, 3], 18, true);
        player.animations.add('runU', [4, 5], 18, true);
        
        game.input.onDown.add(moveSprite, this);
        game.input.onTap.add(moveSprite, this);
        
        
    }

    
    function update() {
        
//        player.animations.play('runD');
//        if(tween.isRunning)
//        {
//            player.animations.play('runD');
//        }
//        else;
//        {
//            player.animations.play('standD');
//        }
        
        
//        game.physics.arcade.collide(player, platform);
        
        
//        if (cursors.left.isDown) {
//            player.body.acceleration.x = -1000; }
//        else if (cursors.right.isDown) {
//            player.body.acceleration.x = 1000; }
//        else if (player.body.touching.down) {
//        player.body.acceleration.x = 0; };
//        
//        if (cursors.up.isDown && player.body.touching.down) { //
//            player.body.velocity.y = -200; };
        
//        if (game.input.mousePointer.isDown)
//            {
//                game.physics.arcade.moveToPointer(player, 100);
//            }
//        else
//            {
//                player.body.velocity.setTo(0, 0);
//            }
        
        
    }

    function render() {
    }
    
    function moveSprite (pointer) {   
        if (tween && tween.isRunning)    {tween.stop();}    

        var duration = (game.physics.arcade.distanceToPointer(player, pointer)) * 20;
        
        
        if (duration != 0) {
            player.animations.play('runD');
            tween = game.add.tween(player).to({ x: pointer.x, y: pointer.y }, duration, Phaser.Easing.Linear.None, true);
            tweenTarget = game.add.tween(target).to({ x: pointer.x, y: pointer.y }, duration * .5, Phaser.Easing.Quadratic.Out, true);
            target.alpha = 1;}
    
        tween.onComplete.add(stopAnimation, this);
        
    }
    
    function stopAnimation() {
        player.animations.play('standD');
        target.alpha = 0;
    }
    
    };
    

