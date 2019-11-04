var amount_x = 15;
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
            fields = [];
            for(i = 0; i < amount_x; i++) {
                var fieldrow = [];
                for(j = 0; j < amount_y; j++) {
                    var field = {};
                    field.x = i;
                    field.y = j;
                    field.content = "none";
                    field.state = "unlocked";
        
                    fieldrow.push(field);

                }
        
                fields.push(fieldrow)
            }

        } else if (type == "classic") {
            fields = [];
            for(i = 0; i < amount_x; i++) {
                var fieldrow = [];
                for(j = 0; j < amount_y; j++) {
                    var field = {};
                    field.x = i;
                    field.y = j;
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
        
                fields.push(fieldrow);
            }

        } else if (type == "experimental") {
            fields = [];
            for(i = 0; i < amount_x; i++) {
                var fieldrow = [];
                for(j = 0; j < amount_y; j++) {
                    var field = {};
                    field.x = i;
                    field.y = j;
                    field.content = ((Math.floor(Math.random() * (+30 - 1)) + 1) == 1) ? "dirt" : "grass";
                    field.state = "unlocked";
        
                    fieldrow.push(field);

                }
        
                fields.push(fieldrow)
            }

        } else if (type == "json") {
            fields = type;
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

                    field = fields[x][y];

                    if(!(field.state == "locked")) {


                            if(land.classList.contains("obj_" + action)) {
                                field.content = "grass";
                            } else {
                                for(qq = 0; qq < actions.length; qq++) {
                                    field.content = "grass";
                                }
                                field.content = action;
                            }
                        

                        render("all");

                    }
                });
            }

        } else if (what == "actionclick") {

            for(pp = 0; pp < actions.length; pp++) {
                thisaction = actions[pp];

                thisaction.addEventListener("click", function(event) {
                    action = event.path[0].dataset.action;
                });


            }

        } else if (what == "options") {

            var options = document.getElementsByClassName("options");

            for(aaa = 0; aaa < options.length; aaa++) {
                let option = options[aaa];
                option.addEventListener("click", function(event) {
                    let option = event.path[0].dataset.for;
                    document.getElementById(option).classList.toggle("shown");
                    if(option == "save") {
                        document.getElementById(option + "textarea").innerHTML = JSON.stringify(fields);
                    }
                });
            }
        }
    }