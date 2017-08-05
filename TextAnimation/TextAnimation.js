"use strict";

class TextAnimation {
    constructor() {
        this.is_initialized = false;
        this.lock = false;

        this.messages_list = [];
        this.element;

        this.message_current = {
            text: "",
            length: 0,
            id: -1
        };

        this.message_new = {
            text: [],
            length: 0,
            chars_left: 0
        };


        this.change_time_per_char;
        this.attemps_max;
        this.attemps_min;
        this.dealy;
        this.loop;

        this.timer = {
            PAUSE: 0,
            DEALY: 1,
            GENERATE: 2,
            CHANGE: 3,
            RESIZE: 4,

            status: null,
            counter: 0
        };

        this.random_characters = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm1234567890";
    }




    init(settings) {
        ////////////////////////////////////////////////////////////////////////////////
        // Validate:

        if (this.is_initialized === true) {
            console.error("[TextAnimation] Unable to initialize, already initialized.");
            return;
        }

        if (settings === null || settings === undefined) {
            console.error("[TextAnimation] Unable to initialize, settings are null.");
            return;
        }



        if (settings.id === null || settings.id === undefined) {
            console.error("[TextAnimation] Unable to initialize, settings.id is null.");
            return;
        }

        if (!document.getElementById(settings.id)) {
            console.error("[TextAnimation] Unable to initialize, cannot find id '" + settings.id + "' at the site.");
            return;
        }



        if (settings.messages === null || settings.messages === undefined) {
            console.error("[TextAnimation] Unable to initialize, settings.messages is null.");
            return;
        }

        if (!(settings.messages instanceof Array)) {
            console.error("[TextAnimation] Unable to initialize, settings.messages is not an array.");
            return;
        }

        if (settings.messages.length === 0) {
            console.error("[TextAnimation] Unable to initialize, settings.messages is empty.");
            return;
        }


        ////////////////////////////////////////////////////////////////////////////////
        // Initialize:

        this.element = document.getElementById(settings.id);

        var default_dealy = 700;
        if (settings.dealy === null || settings.dealy === undefined) {
            this.dealy = default_dealy;
            console.info("[TextAnimation] Initialize with default value, settings.dealy is not defined. \nDealy has been set to '" + default_dealy + "'.");
        } else {
            this.dealy = settings.dealy;
        }
        this.dealy *= 10;


        for (var m in settings.messages) {
            this.messages_list.push(settings.messages[m]);
        }


        if (settings.start_message === null || settings.start_message === undefined) {
            this.message_current.text = this.messages_list[0].slice(0);
            this.message_current.id = 0;
            this.element.innerHTML = this.message_current.text;
        } else {
            this.message_current.text = settings.start_message.slice(0);
            this.message_current.id = -1;
            this.message_current.length = this.message_current.text.length;
            this.element.innerHTML = this.message_current.text;
        }


        var default_change_time_per_char = 9;
        if (settings.change_time_per_char === null || settings.change_time_per_char === undefined) {
            this.change_time_per_char = default_change_time_per_char;
            console.info("[TextAnimation] Initialize with default value, settings.change_time_per_char is not defined. \Change_time_per_char has been set to '" + default_change_time_per_char + "'.");
        } else {
            this.change_time_per_char = settings.change_time_per_char;
        }
        this.change_time_per_char *= 10;



        var default_attemps_max = 5;
        if (settings.attemps_max === null || settings.attemps_max === undefined) {
            this.attemps_max = default_attemps_max;
            console.info("[TextAnimation] Initialize with default value, settings.attemps_max is not defined. \Attemps_max has been set to '" + default_attemps_max + "'.");
        } else {
            this.attemps_max = settings.attemps_max;
        }


        var default_attemps_min = 3;
        if (settings.attemps_min === null || settings.attemps_min === undefined) {
            this.attemps_min = default_attemps_min;
            console.info("[TextAnimation] Initialize with default value, settings.attemps_max is not defined. \Attemps_max has been set to '" + default_attemps_min + "'.");
        } else {
            this.attemps_min = settings.attemps_min;
        }
        this.attemps_min = (this.attemps_max > this.attemps_min) ? this.attemps_min : (this.attemps_max - 1);
        this.attemps_min = (this.attemps_min < 0) ? 0 : this.attemps_min;


        this.timer.counter = 0;
        this.timer.status = this.timer.DEALY;
        if (settings.force_start === null || settings.force_start === undefined) {} else {
            if (settings.force_start == true) {
                this.timer.status = this.timer.GENERATE;
            }
        }



        this.is_initialized = true;

        this.loop();
    }




    display_message() {
        this.element.innerHTML = this.message_current.text;
    }




    loop() {
        if (this.lock === true) return;

        this.timer.counter += 10;

        switch (this.timer.status) {
            case this.timer.DEALY:
                if (this.timer.counter > this.dealy) {
                    this.timer.counter = 0;
                    this.timer.status = this.timer.GENERATE;
                }

                break;


            case this.timer.GENERATE:
                this.generate();
                this.timer.counter = 0;
                this.timer.status = this.timer.CHANGE;

                break;



            case this.timer.CHANGE:
                if (this.timer.counter > this.change_time_per_char) {
                    this.change_text();
                    this.timer.counter = 0;

                    if (this.message_new.chars_left == 0) {
                        this.timer.status = this.timer.RESIZE;
                    }
                }

                break;


            case this.timer.RESIZE:
                this.resize();
                this.timer.counter = 0;
                this.timer.status = this.timer.DEALY;

                break;



            case this.timer.PAUSE:
                break;
        }


        setTimeout(() => {
            this.loop();
        }, 10);
    }




    generate() {
        this.message_current.id++;
        if (this.message_current.id >= this.messages_list.length) this.message_current.id = 0;
        var m = this.messages_list[this.message_current.id];
        this.message_new.length = m.length;

        var greates = (this.message_current.length > m.length) ? this.message_current.length : m.length;
        this.message_new.chars_left = greates;
        var delta = this.attemps_max - this.attemps_min + 1;

        this.message_new.text = new Array(greates);
        this.message_new.length = greates;
        for (var i = 0; i < greates; i++) {
            var l = Math.floor((Math.random() * delta) + this.attemps_min);
            this.message_new.text[i] = new Array(l);
            l--;

            if (i < this.message_current.length) {
                this.message_new.text[i][0] = this.message_current.text[i];
            } else {
                this.message_new.text[i][0] = undefined;
            }

            for (var j = 1; j < l; j++) {
                this.message_new.text[i][j] = this.get_random_character();
            }

            if (i < this.message_new.length) {
                this.message_new.text[i][l] = m[i];
            } else {
                this.message_new.text[i][l] = undefined;
            }

        }
    }




    get_random_character() {
        return this.random_characters[Math.floor((Math.random() * this.random_characters.length))];
    }





    resize() {
        for (var i = 0; i < this.message_new.length; i++) {
            if (this.message_new.text[i][0] !== undefined)
                this.message_current.length = i + 1;
        }
    }





    change_text() {
        if (this.message_new.chars_left <= 0) return;

        var index = Math.floor((Math.random() * this.message_new.length));
        while (this.message_new.text[index].length <= 1) {
            index++;
            index = (index % this.message_new.length);
        }

        this.message_new.text[index].splice(0, 1);

        if (this.message_new.text[index].length <= 1) this.message_new.chars_left--;

        var msg = "";
        for (var i = 0; i < this.message_new.length; i++) {
            if (this.message_new.text[i][0] !== undefined)
                msg += this.message_new.text[i][0];
        }
        this.message_current.text = msg;

        this.display_message();
    }




    stop() {
        if (this.lock === true) return;
        this.lock = true;
    }




    start() {
        if (this.lock === false) return;
        this.lock = false;
        this.loop();
    }





    remove() {
        this.lock = true;
        this.element.parentElement.removeChild(this.element);
    }



    set_messages(new_messages, force_start = false) {
        if (!(new_messages instanceof Array)) {
            console.error("[TextAnimation] Unable to change messages, new_messages is not an array.");
            return;
        }

        this.messages_list = [];
        for (var m in new_messages) {
            this.messages_list.push(new_messages[m]);
        }

        if (force_start == true) {
            this.timer.status = this.timer.GENERATE;
        }
    }
}