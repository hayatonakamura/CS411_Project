
module.exports = function(obj){

    var joy_scale= {};
    var sorrow_scale ={};
    var Genres ={
        '-100':"classical",
        '-80':"sad",
        '-60':"sleep",
        '-40':"hiphop",
        '-20':"study",
        '0':"study",
        '20':"newage",
        '40':"dance",
        '60':"happy",
        '80':"party",
        '100':"party"

    }
    var scale = 0;
    var genre = ""
    console.log(obj.Joy,obj.Sorrow)
    joy_scale['VERY_LIKELY'] = 100;
    joy_scale['LIKELY'] = 80;
    joy_scale['POSSIBLE'] = 60;
    joy_scale['UNKNOWN'] = 40;
    joy_scale['UNLIKELY'] = 20;
    joy_scale['VERY_UNLIKELY'] = 0;
   
    sorrow_scale['VERY_LIKELY'] = -100;
    sorrow_scale['LIKELY'] = -80;
    sorrow_scale['POSSIBLE'] = -60;
    sorrow_scale['UNKNOWN'] = -40;
    sorrow_scale['UNLIKELY'] = -20;
    sorrow_scale['VERY_UNLIKELY'] = 0;
    


    scale = joy_scale[obj.Joy] + sorrow_scale[obj.Sorrow];
    console.log(scale)
    console.log(Genres[scale])

    return [Genres[scale],scale];
    
}