const Desklet = imports.ui.desklet;
const St = imports.gi.St;
const GLib = imports.gi.GLib;
const Gio = imports.gi.Gio;
const ByteArray = imports.byteArray;

function HelloDesklet(metadata, desklet_id) {
    this._init(metadata, desklet_id);
}


function readFile(filePath) {
    let file = Gio.File.new_for_path(filePath);
    file.load_contents_async(null, (caller, res) => {
        try {
            let [success, contents, tags] = file.load_contents_finish(res);
            if success {
                text = contents;
                GLib.free(contents);
                return ByteArray.toString(text);
            }
        }
    });
}


HelloDesklet.prototype = {
    __proto__: Desklet.Desklet.prototype,

    _init: function(metadata, desklet_id) {
        Desklet.Desklet.prototype._init.call(this, metadata, desklet_id);
        this.sesssion = new Soup.Session();
        this.setupUI();
    },

    setupUI: function() {
        // main container for the desklet
        this.window = new St.Bin();
        this.text = new St.Label();
        this.text.set_text(readFile("./output.txt"));
        this.window.add_actor(this.text);
        this.setContent(this.window);
    }
}

function main(metadata, desklet_id) {
    return new HelloDesklet(metadata, desklet_id);
}


function init() {
    // Initialize your desklet here
    main();
}

function enable() {
    // Enable your desklet here
}

function disable() {
    // Disable your desklet here
}
