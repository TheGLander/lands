var fields = [];
class Field {

    constructor(actionelems, gamewrapper, lands, action, gameclass) {
        this.action = action;
        var gamewrapper = document.getElementById(gamewrapper);
        this.lands = document.getElementsByClassName(lands);
        this.actions = document.getElementsByClassName(actionelems);
        this.game = document.createElement("div");
        this.game.classList.add(gameclass);
    }

    
    generate (type, x, y) {

        if(type == "blank") {
            fields = [];
            for(i = 0; i < x; i++) {
                var fieldrow = [];
                for(j = 0; j < y; j++) {
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
            for(let i = 0; i < x; i++) {
                var fieldrow = [];
                for(let j = 0; j < y; j++) {
                    var field = {};
                    field.x = i;
                    field.y = j;
                    field.content = ((Math.floor(Math.random() * (+300 - 1)) + 1) == 1) ? "stone" : "grass";
                    if((field.x == 0)||(field.x == (x)-1)||(field.y == 0)||(field.y == (y)-1)) {
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
            for(i = 0; i < x; i++) {
                let fieldrow = [];
                for(j = 0; j < y; j++) {
                    let field = {};
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

    render (what) {
        if(what == "all") {
            this.game.innerHTML = "";
            for(let ii = 0; ii < fields.length; ii++) {

                let fieldrow = document.createElement("div");
                fieldrow.classList.add("game__row");

                for(let jj = 0; jj < fields[ii].length; jj++) {
                    let field = document.createElement("div");
                    field.dataset.x = fields[ii][jj].x;
                    field.dataset.y = fields[ii][jj].y;
                    field.classList.add("game__land");
                    field.classList.add("obj_" + fields[ii][jj].content);

                    fieldrow.appendChild(field);
                }

                this.game.appendChild(fieldrow);
            }
        }
        gamewrapper.innerHTML = "";
        gamewrapper.appendChild(this.game);
    }

    listen (what, elem) {

        if(what == "landsclick") {

            for (let oo = 0; oo < this.lands.length;  oo++) {
                let land = this.lands[oo];

                land.addEventListener("click", (e) => {
                    let x = land.dataset.x;
                    let y = land.dataset.y;

                    let field = fields[x][y];

                    if(!(field.state == "locked")) {


                            if(land.classList.contains("obj_" + this.action)) {
                                field.content = "grass";
                            } else {
                                for(let qq = 0; qq < this.actions.length; qq++) {
                                    field.content = "grass";
                                }
                                field.content = this.action;
                            }
                        

                        this.render("all");
                        this.listen("landsclick");

                    }
                });
            }

        } else if (what == "actionclick") {

            for(let pp = 0; pp < this.actions.length; pp++) {
                let thisaction = this.actions[pp];

                thisaction.addEventListener("click", (e) => {
                    this.action = e.path[0].dataset.action;
                });


            }

        } else if (what == "options") {

            var options = document.getElementsByClassName("options");

            for(let aaa = 0; aaa < options.length; aaa++) {
                let option = options[aaa];
                option.addEventListener("click", (event) => {
                    let option = event.path[0].dataset.for;
                    document.getElementById(option).classList.toggle("shown");
                    if(option == "save") {
                        document.getElementById(option + "textarea").innerHTML = JSON.stringify(fields);
                    }
                });
            }

        } else if (what == "loadbutton") {
            let loadbutton = document.getElementsByClassName(elem);
            for(let i = 0; i < loadbutton.length; i++) {
                loadbutton = loadbutton[i];
                loadbutton.addEventListener("click", (event) => {
                    fields = JSON.parse(document.getElementById("loadtextarea").value);
                    this.render("all");
                    this.listen("landsclick");
                });
            }
        }
    }





}
