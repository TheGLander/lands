var amount_x = 15
var amount_y = 15;
var action = "tree";
var lands = document.getElementsByClassName('game__land');
var actions = document.getElementsByClassName("action");
var gamewrapper = document.getElementById("gamewrapper");
var body = document.getElementsByTagName("body");
var game = document.createElement("div");
game.classList.add("game");

var fields = [];

    function generate(type) {

        if(type == "blank") {

            for(i = 0; i < amount_y; i++) {
                var fieldrow = [];
                for(j = 0; j < amount_x; j++) {
                    var field = {};
                    field.x = j;
                    field.y = i;
                    field.content = "none";
                    field.state = "locked";
        
                    fieldrow.push(field);

                }
        
                fields.push(fieldrow)
            }

        } else if (type == "classic") {

            for(i = 0; i < amount_y; i++) {
                var fieldrow = [];
                for(j = 0; j < amount_x; j++) {
                    var field = {};
                    field.x = j;
                    field.y = i;
                    field.content = ((Math.floor(Math.random() * (+300 - 1)) + 1) == 1) ? "stone" : "grass";
                    if((field.x == 0)||(field.x == (amount_x)-1)||(field.y == 0)||(field.y == (amount_y)-1)) {
                        field.state = "locked";
                        field.content = ((Math.floor(Math.random() * (+10 - 1)) + 1) == 1) ? "stone" : "grass";
                        if(field.content == "grass") {
                            field.content = ((Math.floor(Math.random() * (+50 - 1)) + 1) == 1) ? "cleanstone" : "grass";
                            if(field.content == "grass") {
                                field.content = ((Math.floor(Math.random() * (+50 - 1)) + 1) == 1) ? "tree" : "grass";
                            }
                        }
                    } else {
                        field.state = "unlocked";
                    }
        
                    fieldrow.push(field);

                }
        
                fields.push(fieldrow)
            }

        } else if (type == "experimental") {

            for(i = 0; i < amount_y; i++) {
                var fieldrow = [];
                for(j = 0; j < amount_x; j++) {
                    var field = {};
                    field.x = j;
                    field.y = i;
                    field.content = ((Math.floor(Math.random() * (+30 - 1)) + 1) == 1) ? "dirt" : "grass";
                    field.state = "locked";
        
                    fieldrow.push(field);

                }
        
                fields.push(fieldrow)
            }

        }


    }


    function render(what) {
        if(what == "all") {
            game.innerHTML = "";
            for(ii = 0; ii < fields.length; ii++) {

                var fieldrow = document.createElement("div");
                fieldrow.classList.add("game__row");

                for(jj = 0; jj < fields[ii].length; jj++) {
                    var field = document.createElement("div");
                    field.dataset.x = fields[ii][jj].x;
                    field.dataset.y = fields[ii][jj].y;
                    field.classList.add("game__land");
                    field.classList.add("obj_" + fields[ii][jj].content);

                    fieldrow.appendChild(field);
                }

                game.appendChild(fieldrow);
            }
        }
        gamewrapper.innerHTML = "";
        gamewrapper.appendChild(game);

        listen("landsclick");
    }

    function listen (what) {

        if(what == "landsclick") {

            for (var oo = 0; oo < lands.length;  oo++) {
                let land = lands[oo];
    
                land.addEventListener("click", function() {
                    let x = land.dataset.x;
                    let y = land.dataset.y;

                    field = fields[y][x];

                    if(!((field.x == 0)||(field.x == (amount_x)-1)||(field.y == 0)||(field.y == (amount_y)-1))) {


                            if(land.classList.contains("obj_" + action)) {
                                land.classList.remove("obj_" + action);
                                field.content = "grass";
                            } else {
                                for(qq = 0; qq < actions.length; qq++) {
                                    land.classList.remove("obj_" + actions[qq].dataset.action);
                                    field.content = "grass";
                                }
                                land.classList.add("obj_" + action);
                                field.content = action;
                            }
                        

                        render("all");

                    }
                });
            }

        } else if (what = "actionclick") {

            for(pp = 0; pp < actions.length; pp++) {
                thisaction = actions[pp];

                thisaction.addEventListener("click", function(event) {
                    action = event.path[0].dataset.action;
                });


            }

        }
    }