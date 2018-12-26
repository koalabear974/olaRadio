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
    return this.getDate()+" - "+this.getMonth()+" - "+((String) (new Date().getFullYear())).substr(2,2);
};

export function log(message) {
    console.log(message);
};
