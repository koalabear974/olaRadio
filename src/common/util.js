Date.prototype.startOfDay = function () {
    return this.setHours(0,0,0,0);
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
    return dd+" - "+mm+" - "+((String) (new Date().getFullYear())).substr(2,2);
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

export function log(message) {
    console.log(message);
};
