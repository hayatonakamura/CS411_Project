var mongoose = require('mongoose')
mongoose.Promise = globsl.Promise

mongoose.connect('mongodb://hayaton:cs411password@ds153093.mlab.com:53093/moodfixer');

module.export = {
    mongoose:mongoose 
}