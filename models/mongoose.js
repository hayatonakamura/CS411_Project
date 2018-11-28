var mongoose = require('mongoose')
mongoose.Promise = globsl.Promise

mongoose.connect('mongodb://cassie:cassie1004@ds155313.mlab.com:55313/mood_fixer');

module.export = {
    mongoose:mongoose 
}