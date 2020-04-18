import moment from "moment";

Date.prototype.startOfDay = function () {
    return this.setHours(1,0,0,0); // day starts at 1am
};

Date.prototype.addDays = function (days) {
    let date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
};

Date.prototype.getDayOfWeek = function(){
    return ["Dimanche","Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi"][ this.getDay() ];
};

Date.prototype.getFormated = function () {
    var mm = this.getMonth() < 9 ? "0" + (this.getMonth() + 1) : (this.getMonth() + 1); // getMonth() is zero-based
    var dd  = this.getDate() < 10 ? "0" + this.getDate() : this.getDate();
    var yy  = ((String) (this.getFullYear())).substr(2,2);
    return dd + " - " + mm + " - " + yy;
};

Date.prototype.getTimeFormated = function () {
    var hh = this.getHours() < 9 ? "0" + this.getHours() : this.getHours();
    var mm  = this.getMinutes() < 9 ? "0" + this.getMinutes() : this.getMinutes();
    return hh+":"+mm;
};

Date.prototype.addHours = function(h){
    this.setHours(this.getHours()+h);
    return this;
};

Date.prototype.utcDate = function(){
    let now_utc =  Date.UTC(this.getUTCFullYear(), this.getUTCMonth(), this.getUTCDate(),
        this.getUTCHours(), this.getUTCMinutes(), this.getUTCSeconds());

    return new Date(now_utc);
};

export function parseDate(dateString) {
    return moment(dateString, "YYYY-MM-DDTHH:mm").toDate();
}

function getBase64(file, callback) {
    var reader = new FileReader();
    reader.onload = function(event) {
        callback(event.target.result);
    };
    reader.readAsDataURL(file);
}

File.prototype.resizeImage = function(width, callback) {
    let img = document.createElement("img");

    getBase64(this, function(src) {
        img.src = src;
        img.onload = function () {
            console.log("afterload");
            let MAX_WIDTH = width;
            let imgwidth = this.width;
            let imgheight = this.height;
            console.log(imgheight, imgwidth);

            imgheight *= MAX_WIDTH / imgwidth;
            imgwidth = MAX_WIDTH;
            console.log(imgheight, imgwidth);

            let canvas = document.getElementById('canvas');
            let ctx = canvas.getContext("2d");
            ctx.drawImage(this, 0, 0);

            canvas.width = imgwidth;
            canvas.height = imgheight;

            ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, imgwidth, imgheight);

            callback(canvas.toDataURL("image/png"));
        };
    });
};

if(typeof(String.prototype.trim) === "undefined")
{
    String.prototype.trim = function()
    {
        return String(this).replace(/^\s+|\s+$/g, '');
    };
}

export function log(message) {
    console.log(message);
};
