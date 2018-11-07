## Database
Choice of DB - mongoDB

Reasons
- Flexible Data structure
- Simple CRUD operations

## mongoDB Schema
```
    var ProductLabel = mongoose.model('LabelObject',{
        name: String, 
        mood: String, 
    });
```
The general structure for this mongoDB model is the following:

.-user
....-Day
.......-Moods
       

Example:

John Snow
....10-25-2018
........- Angry
........- Sad
........- Happy
........- Happy
........- Happy
........- Happy
....10-26-2018
........- Happy
........- Happy
........- Angry
........- Angry
........- Sad
........- Sad
........- Confused

## Cache Implementation


For the sequence diagram, please view mood_fixer_sequence1.png.
